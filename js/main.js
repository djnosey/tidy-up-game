import { GameLoop } from './engine/game-loop.js';
import { Input } from './engine/input.js';
import { Camera } from './engine/camera.js';
import { renderBoss } from './engine/renderers/boss-renderer.js';
import { drawPlatform, drawPlatformSurface, drawBackground, drawDecoration } from './engine/sprites.js';
import { Player } from './entities/player.js';
import { loadLevel } from './levels/level-loader.js';
import { setActiveTheme } from './engine/renderers/level-themes.js';
import { preloadAll } from './engine/asset-loader.js';
import { getAllSpritePaths } from './engine/sprite-manifest.js';
import { level1 } from './levels/level1-living.js';
import { level2 } from './levels/level2-kitchen.js';
import { level3 } from './levels/level3-bathroom.js';
import { level4 } from './levels/level4-kids.js';
import { level5 } from './levels/level5-parents.js';
import { level6 } from './levels/level6-terrace.js';
import { HUD } from './ui/hud.js';
import { AudioManager } from './engine/audio.js';
import { ParticleSystem } from './engine/particles.js';
import { PARTICLE_THEMES } from './engine/renderers/level-themes.js';
import { ParallaxRenderer } from './engine/parallax.js';
import { LightingRenderer } from './engine/lighting.js';
import { events } from './engine/events.js';
import { CollisionManager } from './engine/collision-manager.js';
import { SaveManager } from './engine/save-manager.js';
import { CheatManager } from './engine/cheat-manager.js';
import { updateMovingPlatforms, carryPlayerOnPlatforms, updateCrumblingPlatforms, checkBedBounce } from './engine/platform-physics.js';
import { CHARACTERS } from './data/characters.js';

const ALL_LEVELS = [level1, level2, level3, level4, level5, level6];
import { Menu } from './ui/menu.js';
import { ScoreScreen } from './ui/score-screen.js';
import { VictoryScreen } from './ui/victory-screen.js';
import { TransitionManager } from './ui/transitions.js';

// CSS class per level for post-processing filters
const LEVEL_CSS = ['level-living', 'level-kitchen', 'level-bathroom', 'level-kids', 'level-parents', 'level-terrace'];

// Game states
const STATE_MENU = 'menu';
const STATE_INTRO = 'intro';
const STATE_LEVEL_INTRO = 'level_intro';
const STATE_PLAYING = 'playing';
const STATE_BOSS_INTRO = 'boss_intro';
const STATE_BOSS = 'boss';
const STATE_SCORE = 'score';
const STATE_GAMEOVER = 'gameover';
const STATE_LOADING = 'loading';
const STATE_VICTORY = 'victory';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.input = new Input();
        this.camera = new Camera(this.canvas.width, this.canvas.height);
        this.hud = new HUD();
        this.menu = new Menu();
        this.scoreScreen = new ScoreScreen();
        this.victoryScreen = new VictoryScreen();
        this.transitions = new TransitionManager();

        this.state = STATE_MENU;
        this.hasSeenOpening = false;
        this.player = null;
        this.level = null;
        this.projectiles = [];
        this.collected = 0;
        this.bossTriggered = false;
        this.currentLevelIndex = 0;
        this.particles = new ParticleSystem();
        this.particleTheme = null;
        this.parallax = new ParallaxRenderer();
        this.lighting = new LightingRenderer();
        this.audio = new AudioManager();
        this.collisionManager = new CollisionManager();
        this.saveManager = new SaveManager();
        this._heartbeatTimer = 0;
        this.cheats = new CheatManager();

        // Preload all sprite assets — track completion
        this._spritesReady = false;
        this._spritesPromise = preloadAll(getAllSpritePaths()).then(() => {
            this._spritesReady = true;
            console.log('Sprite assets loaded');
        });

        this.gameLoop = new GameLoop(
            (dt) => this.update(dt),
            () => this.render()
        );
        this.gameLoop.start();
    }

    resize() {
        // Fixed game resolution, scaled to fit
        this.canvas.width = 960;
        this.canvas.height = 600;
    }

    startLevel(character, levelIndex) {
        this._startLevelData(character, levelIndex);
        this._buildDecoCache();
        this._buildFurnitureCache();
        this._buildSurfaceCache();
        this.audio.playMusic(this.currentLevelIndex);
        this.state = STATE_PLAYING;
    }

    // Lightweight level init — entities, player, events (no rendering)
    _startLevelData(character, levelIndex) {
        if (levelIndex !== undefined) this.currentLevelIndex = levelIndex;
        const levelData = ALL_LEVELS[this.currentLevelIndex];
        this.level = loadLevel(levelData);
        this.player = new Player(
            this.level.playerStart.x,
            this.level.playerStart.y,
            character
        );
        this.projectiles = [];
        this.collected = 0;
        this.bossTriggered = false;
        this.cheats.reset();
        this.cheats.syncPlayer(this.player);
        this.camera.reset();
        this.particles = new ParticleSystem();
        this.particleTheme = PARTICLE_THEMES[this.currentLevelIndex] || PARTICLE_THEMES[0];
        this.canvas.className = LEVEL_CSS[this.currentLevelIndex] || '';
        setActiveTheme(this.currentLevelIndex + 1); // themes are 1-indexed
        this.setupEventListeners();

        // Compute shared level width for caches
        let maxX = 0;
        for (const p of this.level.platforms) {
            const right = p.x + p.width;
            if (right > maxX) maxX = right;
        }
        if (this.level.bossArena) maxX = Math.max(maxX, this.level.bossArena.x + this.level.bossArena.width);
        this._cacheLevelW = maxX + 100;
    }

    // Stage 1: decoration cache
    _buildDecoCache() {
        const ANIMATED_TYPES = new Set([
            'paper_airplane', 'dust_bunny', 'dust_motes', 'steam_wisps',
            'water_puddle', 'floating_bubbles', 'grass_tuft', 'butterfly', 'dripping_tap'
        ]);
        this._animatedDecos = [];
        const decCanvas = document.createElement('canvas');
        decCanvas.width = this._cacheLevelW;
        decCanvas.height = this.canvas.height;
        const decCtx = decCanvas.getContext('2d');
        for (const dec of this.level.decorations) {
            if (dec.type && ANIMATED_TYPES.has(dec.type)) {
                this._animatedDecos.push(dec);
            } else {
                drawDecoration(decCtx, dec, 0, 0);
            }
        }
        this._decoCache = decCanvas;
    }

    // Stage 2: furniture backdrop cache
    _buildFurnitureCache() {
        const furCanvas = document.createElement('canvas');
        furCanvas.width = this._cacheLevelW;
        furCanvas.height = this.canvas.height;
        const furCtx = furCanvas.getContext('2d');
        const groundY = this.level.groundY;
        for (const plat of this.level.platforms) {
            if (plat._disabled || plat.moveX || plat.moveY || plat.crumble) continue;
            drawPlatform(furCtx, plat.x, plat.y, plat.width, plat.height, plat.label, plat.color, groundY);
        }
        this._furnitureCache = furCanvas;
    }

    // Stage 3: platform surface cache
    _buildSurfaceCache() {
        const surfCanvas = document.createElement('canvas');
        surfCanvas.width = this._cacheLevelW;
        surfCanvas.height = this.canvas.height;
        const surfCtx = surfCanvas.getContext('2d');
        for (const plat of this.level.platforms) {
            if (plat._disabled || plat.moveX || plat.moveY || plat.crumble) continue;
            drawPlatformSurface(surfCtx, plat.x, plat.y, plat.width, plat.height, plat.label, plat.color);
        }
        this._surfaceCache = surfCanvas;
        this._surfaceCacheCtx = surfCtx;
    }

    setupEventListeners() {
        events.clear();
        const { particles, particleTheme, audio, camera } = this;

        events.on('item-collected', ({ player, x, y, label }) => {
            this.collected++;
            particles.emit({ x, y, ...particleTheme.collect });
            audio.playSFX('collect');
            if (label === '+HEALTH') player.heal();
            if (label === '+LIFE') player.addLife();
        });

        events.on('obstacle-hit', ({ obstacle, player }) => {
            if (player.takeDamage()) {
                particles.emit({ x: player.x + player.width / 2, y: player.y + player.height / 2, ...particleTheme.obstacleHit });
                camera.shake(6, 0.3);
                audio.playSFX('takeDamage');
                // Knockback away from obstacle
                if (obstacle) player.knockback(obstacle.x + (obstacle.width || 0) / 2);
                // Electrocution effect for plug sockets
                if (obstacle && obstacle.label === 'PLUG') {
                    player.electrocuteTimer = 0.8;
                }
            }
        });

        events.on('enemy-stomped', ({ enemy, player }) => {
            particles.emit({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, ...particleTheme.enemyHit });
            enemy.die();
            player.vy = -350;
            audio.playSFX('giveDamage');
        });

        events.on('enemy-killed', ({ enemy, projectile }) => {
            particles.emit({ x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2, ...particleTheme.enemyHit });
            enemy.die();
            projectile.alive = false;
            audio.playSFX('giveDamage');
        });

        events.on('player-hit', ({ source, player, sourceX }) => {
            const shakeAmt = source === 'minion' ? 4 : 6;
            const shakeDur = source === 'minion' ? 0.2 : 0.3;
            // Longer invincibility after boss/hazard hits (2.5s vs 1.5s default)
            const invDuration = (source === 'boss' || source === 'hazard') ? 2.5 : undefined;
            if (player.takeDamage(invDuration)) {
                camera.shake(shakeAmt, shakeDur);
                audio.playSFX('takeDamage');
                // Knockback away from source
                if (sourceX !== undefined) {
                    player.knockback(sourceX);
                }
            }
        });

        events.on('boss-stomped', ({ boss, player }) => {
            boss.stomp();
            player.vy = -500;
            camera.shake(8, 0.4);
            audio.playSFX('giveDamage');
        });

        events.on('minion-stomped', ({ player }) => {
            player.vy = -350;
            audio.playSFX('giveDamage');
        });

        events.on('player-slowed', ({ player }) => {
            // Slow player movement for this frame
            player._slowed = true;
        });

        events.on('boss-projectile-hit', ({ boss, projectile }) => {
            boss.projectileHit();
            projectile.alive = false;
        });
    }

    update(dt) {
        switch (this.state) {
            case STATE_MENU:
                this.updateMenu();
                break;
            case STATE_INTRO:
                this.updateIntro(dt);
                break;
            case STATE_LEVEL_INTRO:
                this.updateLevelIntro(dt);
                break;
            case STATE_LOADING:
                this.updateLoading();
                break;
            case STATE_BOSS_INTRO:
                this.updateBossIntro(dt);
                break;
            case STATE_PLAYING:
            case STATE_BOSS:
                this.updateGameplay(dt);
                break;
            case STATE_SCORE:
                this.updateScore(dt);
                break;
            case STATE_GAMEOVER:
                this.updateGameOver();
                break;
            case STATE_VICTORY:
                this.updateVictory(dt);
                break;
        }
        this.cheats.update(dt);
        this.input.endFrame();
    }

    updateMenu() {
        // Keep completed levels in sync with selected character's save
        const selectedChar = CHARACTERS[this.menu.selectedIndex];
        const saved = this.saveManager.getCompletedLevels(selectedChar.name);
        this.menu.completedLevels = saved;
        this.menu.saveManager = this.saveManager;
        this.menu.selectedCharacterName = selectedChar.name;

        const result = this.menu.handleInput(this.input);
        if (result && (result.action === 'start' || result.action === 'new_game' || result.action === 'start_level')) {
            this.audio.init();
            this._pendingCharacter = result.character;

            if (result.action === 'new_game') {
                // Reset completed levels for this character's session and start from level 0
                this.menu.completedLevels = [];
                this._pendingLevelIndex = 0;
            } else if (result.action === 'start_level') {
                this._pendingLevelIndex = result.levelIndex;
            } else {
                // 'start' = continue from next uncompleted level
                const nextLevel = this.menu.completedLevels.length;
                this._pendingLevelIndex = Math.min(nextLevel, ALL_LEVELS.length - 1);
            }

            if (!this.hasSeenOpening) {
                // First time: show opening story, then level intro
                this.hasSeenOpening = true;
                this.transitions.startOpening();
                this.state = STATE_INTRO;
            } else {
                // Returning from hub: show level intro
                this.transitions.startLevelIntro(this._pendingLevelIndex);
                this.state = STATE_LEVEL_INTRO;
            }
        }
    }

    updateIntro(dt) {
        const done = this.transitions.update(dt, this.input);
        if (done) {
            // Opening done — now show level intro
            this.transitions.startLevelIntro(this._pendingLevelIndex);
            this.state = STATE_LEVEL_INTRO;
        }
    }

    updateLevelIntro(dt) {
        const done = this.transitions.update(dt, this.input);
        if (done) {
            // Go to loading screen — heavy cache build happens after it paints
            this.state = STATE_LOADING;
            this._loadingFrames = 0;
            this._loadingStage = 0;
        }
    }

    updateLoading() {
        // Staged loading: each frame does one chunk of work so the bar fills visibly.
        // Stages that build caches wait for sprites to be loaded first.
        this._loadingFrames++;
        const assetsReady = this._spritesReady && this.audio.isReady();

        switch (this._loadingStage || 0) {
            case 0:
                // Stage 0: paint loading screen, wait for assets
                if (this._loadingFrames >= 2 && assetsReady) {
                    this._loadingStage = 1;
                }
                break;
            case 1:
                // Stage 1: init level data, player, events (lightweight)
                this._startLevelData(this._pendingCharacter, this._pendingLevelIndex);
                this._loadingStage = 2;
                break;
            case 2:
                // Stage 2: build decoration cache
                this._buildDecoCache();
                this._loadingStage = 3;
                break;
            case 3:
                // Stage 3: build furniture backdrop cache
                this._buildFurnitureCache();
                this._loadingStage = 4;
                break;
            case 4:
                // Stage 4: build surface cache
                this._buildSurfaceCache();
                this._loadingStage = 5;
                break;
            case 5:
                // Stage 5: start music + go
                this.audio.playMusic(this.currentLevelIndex);
                this._loadingStage = 0;
                this.state = STATE_PLAYING;
                break;
        }
        // Progress: stage 0 shows asset loading, stages 1-5 fill the bar
        const stage = this._loadingStage || 0;
        this._loadingProgress = stage === 0
            ? Math.min(0.2, this._loadingFrames * 0.01)  // slow pulse while waiting
            : Math.min(1, (stage + 1) / 6);
    }

    updateBossIntro(dt) {
        this.camera.updateShake(dt); // keep zoom lerping during intro
        const done = this.transitions.update(dt, this.input);
        if (done) {
            // Zoom back out for gameplay
            this.camera.targetZoom = 1;
            this.state = STATE_BOSS;
        }
    }

    updateGameplay(dt) {
        const { player, level, camera, input, particles, particleTheme, audio } = this;
        const wasOnGround = player.wasOnGround;

        // Mute toggle
        if (input.mutePressed) this.audio.toggleMute();

        // Update moving platforms before player (so collision uses current positions)
        updateMovingPlatforms(level.platforms, dt);

        // Update player
        player.update(dt, input, level.platforms);

        // Particle: jump dust
        if (!player.onGround && wasOnGround && player.vy < 0) {
            particles.emit({ x: player.x + player.width / 2, y: player.y + player.height, ...particleTheme.jumpDust });
            this.audio.playSFX('jump');
        }
        // Particle: land impact
        if (player.onGround && !wasOnGround) {
            particles.emit({ x: player.x + player.width / 2, y: player.y + player.height, ...particleTheme.landImpact });
        }

        // Carry player on moving platforms
        carryPlayerOnPlatforms(player, level.platforms, dt);

        // Update crumbling platforms
        updateCrumblingPlatforms(level.platforms, player, particles, dt);

        // BED bouncy mechanic (Parents' Room)
        checkBedBounce(player, level.platforms, input);

        // Enforce camera boundary on player (can't go left of camera)
        if (player.x < camera.x) {
            player.x = camera.x;
        }

        // Shooting
        const proj = player.tryShoot(input);
        if (proj) {
            this.projectiles.push(proj);
            this.audio.playSFX('shoot');
        }

        // Update projectiles (swap-and-pop to avoid per-frame allocation)
        let projWrite = 0;
        for (let i = 0; i < this.projectiles.length; i++) {
            const proj = this.projectiles[i];
            proj.update(dt);
            if (proj.alive) this.projectiles[projWrite++] = proj;
        }
        this.projectiles.length = projWrite;

        // Update collectables
        for (const c of level.collectables) c.update(dt);
        this.collisionManager.checkCollectables(player, level.collectables);

        // Update obstacles — check hits
        for (const o of level.obstacles) o.update(dt);
        this.collisionManager.checkObstacles(player, level.obstacles);

        // Update enemies
        for (const e of level.enemies) e.update(dt);
        this.collisionManager.checkEnemies(player, level.enemies, this.projectiles);
        // Swap-and-pop dead enemies
        let enemyWrite = 0;
        for (let i = 0; i < level.enemies.length; i++) {
            if (!level.enemies[i].shouldRemove) level.enemies[enemyWrite++] = level.enemies[i];
        }
        level.enemies.length = enemyWrite;

        // Boss trigger — player touches the door near the boss arena
        if (!this.bossTriggered) {
            const doorX = level.bossDoor ? level.bossDoor.x : level.bossArena.x - 80;
            const doorW = 70;
            if (player.x + player.width > doorX && player.x < doorX + doorW) {
                this.bossTriggered = true;

                // Teleport player into the boss arena (left side, on ground)
                player.x = level.bossArena.x + 60;
                player.y = level.groundY - player.height;
                player.vx = 0;
                player.vy = 0;
                player.invTimer = 2.0; // brief invincibility after transition
                // Snap camera directly to arena (no lerp — clean transition)
                camera.x = level.bossArena.x;
                camera.y = 0;
                camera.locked = true;
                camera.lockTargetX = level.bossArena.x;
                camera.lockTargetY = 0;
                camera.lockLerping = false;
                // Clear leftover projectiles from platforming section
                this.projectiles = [];
                this.audio.playBossMusic();

                // Zoom camera in for dramatic boss reveal
                camera.targetZoom = 1.15;

                // Show boss intro screen before the fight
                this.transitions.startBossIntro(this.currentLevelIndex);
                this.state = STATE_BOSS_INTRO;
            }
        }

        // Boss logic
        if (this.state === STATE_BOSS) {
            // Keep player inside the boss arena
            const arenaLeft = level.bossArena.x;
            const arenaRight = level.bossArena.x + level.bossArena.width - player.width;
            if (player.x < arenaLeft) player.x = arenaLeft;
            if (player.x > arenaRight) player.x = arenaRight;

            const boss = level.boss;
            boss.update(dt, player, level.bossArena.x);

            // Boss phase transition effects
            if (boss.phaseChanged) {
                boss.phaseChanged = false;
                camera.shake(12, 0.5);
                audio.playSFX('phaseTransition');
            }

            // All boss collision checks via collision manager + events
            player._slowed = false;
            this.collisionManager.checkBoss(player, boss, this.projectiles);
            if (player._slowed) {
                player.x -= player.vx * dt * 0.4;
            }

            // Boss defeated — celebration!
            if (boss.defeated) {
                // Confetti particle burst
                const bx = boss.x + boss.width / 2;
                const by = boss.y + boss.height / 2;
                const confettiColors = ['#FFD700', '#FF4444', '#44FF44', '#4488FF', '#FF44FF', '#FFAA00', '#00FFCC'];
                for (let i = 0; i < 40; i++) {
                    particles.emit({
                        x: bx + (Math.random() - 0.5) * 100,
                        y: by + (Math.random() - 0.5) * 60,
                        count: 1,
                        colors: confettiColors,
                        speedX: 200, speedY: 250,
                        gravity: 150, life: 1.2,
                        sizeMin: 3, sizeMax: 7,
                    });
                }
                camera.shake(10, 0.6);

                this.scoreScreen.show(level.name, this.collected, level.totalCollectables);
                this.saveManager.saveLevel(
                    this.player.character.name,
                    this.currentLevelIndex,
                    this.collected,
                    level.totalCollectables
                );
                this.scoreScreen.saveCode = this.saveManager.getSaveCode();
                this.state = STATE_SCORE;
                this.audio.playSFX('bossDefeated');
                this.audio.stopMusic(true);
            }
        }

        // Player death
        if (!player.alive) {
            this.state = STATE_GAMEOVER;
            this.audio.playSFX('playerDeath');
            this.audio.stopMusic();
        }

        // Player fell off screen
        if (player.y > level.groundY + 200) {
            player.alive = false;
            this.state = STATE_GAMEOVER;
        }

        // Low-health heartbeat SFX
        if (player.alive && player.health === 1) {
            this._heartbeatTimer -= dt;
            if (this._heartbeatTimer <= 0) {
                this.audio.playSFX('heartbeat');
                this._heartbeatTimer = 1.0; // every 1 second
            }
        } else {
            this._heartbeatTimer = 0;
        }

        // Camera
        if (this.state === STATE_PLAYING) {
            camera.follow(player, level.width);
        }

        // Update particles and camera shake
        particles.update(dt);
        camera.updateShake(dt);
    }

    updateScore(dt) {
        this.scoreScreen.update(dt);
        if (this.scoreScreen.handleInput(this.input)) {
            this.scoreScreen.hide();
            if (!this.menu.completedLevels.includes(this.currentLevelIndex)) {
                this.menu.completedLevels.push(this.currentLevelIndex);
            }

            // Final level beaten — show victory credits!
            if (this.currentLevelIndex === ALL_LEVELS.length - 1) {
                this.victoryScreen.start();
                this.state = STATE_VICTORY;
                this.canvas.className = '';
                return;
            }

            this.menu.goToHub();
            this.state = STATE_MENU;
            this.audio.stopMusic();
        }
    }

    updateVictory(dt) {
        this.victoryScreen.update(dt);
        if (this.victoryScreen.handleInput(this.input)) {
            this.victoryScreen.stop();
            this.menu.goToHub();
            this.state = STATE_MENU;
            this.audio.stopMusic();
        }
    }

    updateGameOver() {
        // Press Enter to retry
        if (this.input.wasPressed('Enter') || this.input.wasPressed(' ')) {
            this._pendingCharacter = this.player.character;
            this._pendingLevelIndex = this.currentLevelIndex;
            this.state = STATE_LOADING;
            this._loadingFrames = 0;
            this._loadingStage = 0;
        }
    }

    render() {
        const { ctx, canvas, camera } = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        switch (this.state) {
            case STATE_MENU:
                this.menu.render(ctx, canvas.width, canvas.height);
                break;
            case STATE_INTRO:
            case STATE_LEVEL_INTRO:
            case STATE_BOSS_INTRO:
                this.transitions.render(ctx, canvas.width, canvas.height);
                break;
            case STATE_LOADING:
                this.renderLoading();
                break;
            case STATE_PLAYING:
            case STATE_BOSS:
                this.renderGameplay();
                break;
            case STATE_SCORE:
                this.renderGameplay();
                this.scoreScreen.render(ctx, canvas.width, canvas.height);
                break;
            case STATE_GAMEOVER:
                this.renderGameplay();
                this.renderGameOver();
                break;
            case STATE_VICTORY:
                this.victoryScreen.render(ctx, canvas.width, canvas.height);
                break;
        }

        // Cheat code panel overlay
        this.cheats.render(ctx, canvas.width, canvas.height);
    }

    renderLoading() {
        const { ctx, canvas } = this;
        const w = canvas.width;
        const h = canvas.height;
        const levelNames = ['Living Room', 'Kitchen', 'Bathroom', "Kids' Room", "Parents' Room", 'Terrace'];
        const name = levelNames[this._pendingLevelIndex] || 'Level';

        // Dark background
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, w, h);

        // Room name
        ctx.fillStyle = '#e0d8c8';
        ctx.font = 'bold 28px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(name, w / 2, h / 2 - 30);

        // Loading text with animated dots
        const dots = '.'.repeat((Math.floor(this._loadingFrames / 10) % 3) + 1);
        ctx.font = '18px monospace';
        ctx.fillStyle = '#888';
        const stage = this._loadingStage || 0;
        const msg = stage === 0 ? 'Loading assets' + dots : 'Creating mess' + dots;
        ctx.fillText(msg, w / 2, h / 2 + 15);

        // Progress bar frame
        const barW = 200;
        const barH = 8;
        const barX = (w - barW) / 2;
        const barY = h / 2 + 45;
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 1;
        ctx.strokeRect(barX, barY, barW, barH);

        // Animated fill
        const fill = this._loadingProgress || 0;
        ctx.fillStyle = '#e0d8c8';
        ctx.fillRect(barX + 1, barY + 1, (barW - 2) * fill, barH - 2);
    }

    renderGameplay() {
        const { ctx, canvas, camera, level, player } = this;

        // Apply screen shake offset + zoom
        ctx.save();
        if (camera.zoom !== 1) {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            ctx.translate(cx, cy);
            ctx.scale(camera.zoom, camera.zoom);
            ctx.translate(-cx, -cy);
        }
        ctx.translate(camera.shakeOffsetX, camera.shakeOffsetY);

        // Background
        drawBackground(ctx, canvas.width, canvas.height, camera.x, level.backgroundColor);

        // Parallax layers
        this.parallax.render(ctx, camera.x, canvas.width, canvas.height, level.name, level.backgroundColor);

        // Decorations — static from cache, animated drawn live
        const camX = Math.floor(camera.x);
        const camY = Math.floor(camera.y);
        const cw = canvas.width;
        const ch = canvas.height;
        if (this._decoCache) {
            ctx.drawImage(this._decoCache, camX, camY, cw, ch, 0, 0, cw, ch);
        }
        for (let i = 0; i < this._animatedDecos.length; i++) {
            const dec = this._animatedDecos[i];
            const dx = dec.x - camera.x;
            if (dx < -200 || dx > cw + 200) continue;
            drawDecoration(ctx, dec, camera.x, camera.y);
        }

        // Static furniture backdrops — blit from pre-rendered cache
        const screenGroundY = level.groundY - camY;
        if (this._furnitureCache) {
            ctx.drawImage(this._furnitureCache, camX, camY, cw, ch, 0, 0, cw, ch);
        }

        // Platform surfaces: static from cache, dynamic drawn live
        if (this._surfaceCache) {
            ctx.drawImage(this._surfaceCache, camX, camY, cw, ch, 0, 0, cw, ch);
        }
        // Dynamic platforms only (moving, crumbling)
        for (let i = 0; i < level.platforms.length; i++) {
            const plat = level.platforms[i];
            if (plat._disabled) continue;
            if (!plat.moveX && !plat.moveY && !plat.crumble) continue;
            let sx = plat.x - camera.x;
            if (sx + plat.width < -50 || sx > cw + 50) continue;
            const sy = plat.y - camera.y;
            if (plat._crumbleState === 'shaking') {
                sx += (Math.random() - 0.5) * 4;
            }
            drawPlatform(ctx, sx, sy, plat.width, plat.height, plat.label, plat.color, screenGroundY);
        }

        // Collectables
        for (const c of level.collectables) {
            c.render(ctx, camera);
        }

        // Obstacles
        for (const o of level.obstacles) {
            o.render(ctx, camera);
        }

        // Enemies
        for (const e of level.enemies) {
            e.render(ctx, camera);
        }

        // Boss
        if (this.bossTriggered) {
            renderBoss(ctx, level.boss, camera);
        }

        // Projectiles
        for (const proj of this.projectiles) {
            proj.render(ctx, camera);
        }

        // Player
        player.render(ctx, camera);

        // Particles (on top of game world)
        this.particles.render(ctx, camera);

        // Lighting & atmosphere (on top of world, before HUD)
        const isBoss = this.state === STATE_BOSS;
        this.lighting.render(ctx, canvas.width, canvas.height, level.name, level.decorations, camera.x, camera.y, isBoss);

        // End screen shake transform before HUD
        ctx.restore();

        // HUD
        const tidyPercent = level.totalCollectables > 0
            ? (this.collected / level.totalCollectables) * 100
            : 0;
        this.hud.render(ctx, player, tidyPercent, this.collected, level.totalCollectables, canvas.width);
    }

    renderGameOver() {
        const { ctx, canvas } = this;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.textAlign = 'center';

        ctx.font = 'bold 48px sans-serif';
        ctx.fillStyle = '#FF4444';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height * 0.4);

        ctx.font = '18px monospace';
        ctx.fillStyle = '#ccc';
        ctx.fillText('The mess wins... this time!', canvas.width / 2, canvas.height * 0.5);

        const blink = Math.sin(Date.now() / 400) > 0;
        if (blink) {
            ctx.font = '14px monospace';
            ctx.fillStyle = '#FFD700';
            ctx.fillText('Press ENTER to try again', canvas.width / 2, canvas.height * 0.65);
        }

        ctx.restore();
    }
}

// Start the game
window._game = new Game(); // exposed for debug
