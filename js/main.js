import { GameLoop } from './engine/game-loop.js';
import { Input } from './engine/input.js';
import { Camera } from './engine/camera.js';
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
import { ParticleSystem, PARTICLE_THEMES } from './engine/particles.js';
import { ParallaxRenderer } from './engine/parallax.js';
import { LightingRenderer } from './engine/lighting.js';
import { events } from './engine/events.js';
import { CollisionManager } from './engine/collision-manager.js';
import { SaveManager } from './engine/save-manager.js';
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

        // Cheat code panel
        this._cheatPanelOpen = false;
        this._cheatInput = '';
        this._cheatActive = false;
        this._cheatFeedbackTimer = 0;
        this._cheatFeedbackMsg = '';
        this._cheatKeyHandler = (e) => {
            if (e.key === 'i' || e.key === 'I') {
                if (!this._cheatPanelOpen) {
                    this._cheatPanelOpen = true;
                    this._cheatInput = '';
                    e.preventDefault();
                    return;
                }
            }
            if (!this._cheatPanelOpen) return;
            e.preventDefault();
            e.stopPropagation();
            if (e.key === 'Escape') {
                this._cheatPanelOpen = false;
                return;
            }
            if (e.key === 'Backspace') {
                this._cheatInput = this._cheatInput.slice(0, -1);
                return;
            }
            if (e.key === 'Enter') {
                if (this._cheatInput === '1015') {
                    this._cheatActive = !this._cheatActive;
                    if (this.player) this.player.cheatInvincible = this._cheatActive;
                    this._cheatFeedbackMsg = this._cheatActive ? 'ON' : 'OFF';
                } else {
                    this._cheatFeedbackMsg = 'INVALID';
                }
                this._cheatFeedbackTimer = 1.0;
                this._cheatPanelOpen = false;
                return;
            }
            if (e.key.length === 1 && this._cheatInput.length < 8) {
                this._cheatInput += e.key;
            }
        };
        window.addEventListener('keydown', this._cheatKeyHandler, true);

        // Preload all sprite assets in the background (non-blocking)
        preloadAll(getAllSpritePaths()).then(() => {
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
        this._cheatActive = false;
        this._cheatPanelOpen = false;
        this._cheatInput = '';
        this._cheatFeedbackTimer = 0;
        this.camera.reset();
        this.particles = new ParticleSystem();
        this.particleTheme = PARTICLE_THEMES[this.currentLevelIndex] || PARTICLE_THEMES[0];
        this.canvas.className = LEVEL_CSS[this.currentLevelIndex] || '';
        setActiveTheme(this.currentLevelIndex + 1); // themes are 1-indexed
        this.state = STATE_PLAYING;
        this.audio.playMusic(this.currentLevelIndex);
        this.setupEventListeners();
    }

    setupEventListeners() {
        events.clear();
        const { particles, particleTheme, audio, camera } = this;

        events.on('item-collected', ({ player, x, y, label }) => {
            this.collected++;
            particles.emit({ x, y, ...particleTheme.collect });
            audio.playSFX('collect');
            if (label === '+HEALTH') player.heal();
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
        if (this._cheatFeedbackTimer > 0) this._cheatFeedbackTimer -= dt;
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
        if (result && result.action === 'start') {
            this.audio.init();
            const nextLevel = this.menu.completedLevels.length;
            this._pendingCharacter = result.character;
            this._pendingLevelIndex = Math.min(nextLevel, ALL_LEVELS.length - 1);

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
            this.startLevel(this._pendingCharacter, this._pendingLevelIndex);
        }
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

    updateMovingPlatforms(dt) {
        for (const plat of this.level.platforms) {
            if (!plat.moveX && !plat.moveY) continue;
            // Initialize runtime state on first tick
            if (plat._originX === undefined) {
                plat._originX = plat.x;
                plat._originY = plat.y;
                plat._moveTimer = 0;
            }
            plat._prevX = plat.x;
            plat._prevY = plat.y;
            plat._moveTimer += dt;
            const t = Math.sin(plat._moveTimer * (plat.moveSpeed || 1.0));
            if (plat.moveX) plat.x = plat._originX + t * plat.moveX;
            if (plat.moveY) plat.y = plat._originY + t * plat.moveY;
        }
    }

    updateCrumblingPlatforms(dt) {
        const { player, particles, particleTheme } = this;
        for (const plat of this.level.platforms) {
            if (!plat.crumble) continue;
            if (plat._crumbleState === undefined) plat._crumbleState = 'solid';

            if (plat._crumbleState === 'solid') {
                // Check if player is standing on it
                if (player.onGround &&
                    player.x + player.width > plat.x && player.x < plat.x + plat.width &&
                    Math.abs((player.y + player.height) - plat.y) < 4) {
                    plat._crumbleState = 'shaking';
                    plat._crumbleTimer = plat.crumbleDelay || 0.6;
                }
            } else if (plat._crumbleState === 'shaking') {
                plat._crumbleTimer -= dt;
                if (plat._crumbleTimer <= 0) {
                    plat._crumbleState = 'gone';
                    plat._crumbleTimer = plat.crumbleRespawn || 3.0;
                    plat._disabled = true;
                    // Crumble particles
                    particles.emit({
                        x: plat.x + plat.width / 2, y: plat.y,
                        count: 8, speedX: 60, speedY: 40, life: 0.6,
                        colors: [plat.color, '#AAA', '#888'],
                    });
                }
            } else if (plat._crumbleState === 'gone') {
                plat._crumbleTimer -= dt;
                if (plat._crumbleTimer <= 0) {
                    plat._crumbleState = 'solid';
                    plat._disabled = false;
                }
            }
        }
    }

    updateGameplay(dt) {
        const { player, level, camera, input, particles, particleTheme } = this;
        const wasOnGround = player.wasOnGround;

        // Mute toggle
        if (input.mutePressed) this.audio.toggleMute();

        // Update moving platforms before player (so collision uses current positions)
        this.updateMovingPlatforms(dt);

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
        if (player.onGround) {
            for (const plat of level.platforms) {
                if ((plat.moveX || plat.moveY) && plat._prevX !== undefined &&
                    player.x + player.width > plat.x && player.x < plat.x + plat.width &&
                    Math.abs((player.y + player.height) - plat.y) < 4) {
                    player.x += plat.x - plat._prevX;
                    player.y += plat.y - plat._prevY;
                    break;
                }
            }
        }

        // Update crumbling platforms
        this.updateCrumblingPlatforms(dt);

        // BED bouncy mechanic (Parents' Room) — if player lands on a BED platform, boost jump
        if (player.onGround) {
            for (const plat of level.platforms) {
                if (plat.label === 'BED' &&
                    player.x + player.width > plat.x && player.x < plat.x + plat.width &&
                    Math.abs((player.y + player.height) - plat.y) < 4) {
                    // Player just landed on bed — if they jump, boost it
                    if (input.jumpPressed) {
                        player.vy = -900; // super bounce!
                        player.onGround = false;
                    }
                }
            }
        }

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

        // Update projectiles
        for (const proj of this.projectiles) {
            proj.update(dt);
        }
        this.projectiles = this.projectiles.filter(p => p.alive);

        // Update collectables
        for (const c of level.collectables) c.update(dt);
        this.collisionManager.checkCollectables(player, level.collectables);

        // Update obstacles — check hits
        for (const o of level.obstacles) o.update(dt);
        this.collisionManager.checkObstacles(player, level.obstacles);

        // Update enemies
        for (const e of level.enemies) e.update(dt);
        this.collisionManager.checkEnemies(player, level.enemies, this.projectiles);
        level.enemies = level.enemies.filter(e => !e.shouldRemove);

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
                audio.playSFX('heartbeat');
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
            this.startLevel(this.player.character);
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
        if (this._cheatPanelOpen) {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            const pw = 200, ph = 60;
            const px = (canvas.width - pw) / 2, py = (canvas.height - ph) / 2;
            ctx.fillRect(px, py, pw, ph);
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, py, pw, ph);
            ctx.fillStyle = '#888';
            ctx.font = '12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('ENTER CODE', canvas.width / 2, py + 18);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px monospace';
            const masked = '*'.repeat(this._cheatInput.length);
            ctx.fillText(masked + '_', canvas.width / 2, py + 44);
            ctx.restore();
        }

        // Cheat feedback flash
        if (this._cheatFeedbackTimer > 0) {
            ctx.save();
            const alpha = Math.min(1, this._cheatFeedbackTimer * 2);
            ctx.globalAlpha = alpha;
            ctx.font = 'bold 14px monospace';
            ctx.textAlign = 'right';
            ctx.fillStyle = this._cheatFeedbackMsg === 'INVALID' ? '#FF4444' : '#44FF44';
            ctx.fillText(this._cheatFeedbackMsg, canvas.width - 10, canvas.height - 10);
            ctx.restore();
        }
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

        // Decorations (behind platforms)
        for (const dec of level.decorations) {
            const dx = dec.x - camera.x;
            if (dx < -200 || dx > canvas.width + 200) continue;
            drawDecoration(ctx, dec, camera.x, camera.y);
        }

        // Furniture backdrop — full furniture art for static platforms (behind gameplay layer)
        const screenGroundY = level.groundY - camera.y;
        for (const plat of level.platforms) {
            if (plat._disabled) continue;
            if (plat.moveX || plat.moveY || plat.crumble) continue; // dynamic — drawn on gameplay layer
            const sx = plat.x - camera.x;
            const sy = plat.y - camera.y;
            if (sx + plat.width < -50 || sx > canvas.width + 50) continue;
            drawPlatform(ctx, sx, sy, plat.width, plat.height, plat.label, plat.color, screenGroundY);
        }

        // Platforms — gameplay layer: thin surfaces for static, full art for dynamic
        for (const plat of level.platforms) {
            if (plat._disabled) continue;
            let sx = plat.x - camera.x;
            const sy = plat.y - camera.y;
            if (sx + plat.width < -50 || sx > canvas.width + 50) continue;
            const isDynamic = plat.moveX || plat.moveY || plat.crumble;
            if (isDynamic) {
                // Shake effect for crumbling platforms
                if (plat._crumbleState === 'shaking') {
                    sx += (Math.random() - 0.5) * 4;
                }
                drawPlatform(ctx, sx, sy, plat.width, plat.height, plat.label, plat.color, screenGroundY);
            } else {
                // Static furniture: just the walkable surface ledge
                drawPlatformSurface(ctx, sx, sy, plat.width, plat.height, plat.label, plat.color);
            }
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
            level.boss.render(ctx, camera);
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
