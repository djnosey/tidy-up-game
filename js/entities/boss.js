import { aabb, landingOn } from '../engine/physics.js';
import { MegaRoombaBehavior } from './bosses/mega-roomba.js';
import { FridgeBeastBehavior } from './bosses/fridge-beast.js';
import { WashingMachineBehavior } from './bosses/washing-machine.js';
import { ToyBoxTerrorBehavior } from './bosses/toy-box-terror.js';
import { WardrobeMonsterBehavior } from './bosses/wardrobe-monster.js';
import { BbqDragonBehavior } from './bosses/bbq-dragon.js';
import { ROAMING, CHARGING, STUNNED, SPINNING, SHOOTING, VULNERABLE } from './bosses/boss-states.js';

// ─── Per-boss behavior definitions (see ./bosses/ for each) ─────────
const BOSS_BEHAVIORS = {
    'MEGA ROOMBA': MegaRoombaBehavior,
    'FRIDGE BEAST': FridgeBeastBehavior,
    'WASHING MACHINE': WashingMachineBehavior,
    'TOY BOX TERROR': ToyBoxTerrorBehavior,
    'WARDROBE MONSTER': WardrobeMonsterBehavior,
    'BBQ DRAGON': BbqDragonBehavior,
};

export class Boss {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.width = config.width || 96;
        this.height = config.height || 50;
        this.label = config.label || 'BOSS';
        this.color = config.color || '#555';

        this.maxHealth = config.health || 3;
        this.health = this.maxHealth;
        this.alive = true;
        this.defeated = false;

        this.state = ROAMING;
        this.stateTimer = 1.5;
        this.stunTimer = 0;
        this.flashTimer = 0;

        // Arena bounds
        this.arenaLeft = 0;
        this.arenaRight = 960;
        this.groundY = y + this.height; // ground level (boss starts on ground)

        // Movement
        this.vx = 0;
        this.speed = config.speed || 250;
        this.direction = -1;
        this.spinAngle = 0;

        // Attack cycle
        this.attackIndex = 0;
        this.attacks = config.attacks || ['charge', 'spin', 'charge', 'shoot', 'charge', 'spin'];

        // Projectiles & particles
        this.projectiles = [];
        this.particles = [];
        this.shootTimer = 0;

        // New: phase & per-boss state
        this.phase = 1;
        this.projectileCounter = 0;
        this.arenaHazards = [];
        this.minions = [];

        // Per-boss custom state
        this.doorsOpen = false;
        this.doorTimer = 0;
        this.lidOpen = false;
        this.waterLevel = 0;
        this.darknessAlpha = 0;
        this.heatCounter = undefined; // initialized by behavior
        this.isFlying = false;
        this.toyStompCount = 0;
        this.toyStompTimer = 0;
        this.prevState = null;
    }

    getPhase() {
        const pct = this.health / this.maxHealth;
        if (pct > 0.66) return 1;
        if (pct > 0.33) return 2;
        return 3;
    }

    getBehavior() {
        return BOSS_BEHAVIORS[this.label] || null;
    }

    enterVulnerable(duration) {
        this.state = VULNERABLE;
        this.stateTimer = duration || 1.2;
        this.vx = 0;
        this.projectiles = [];
        this.flashTimer = 0.2;
    }

    update(dt, player, arenaX) {
        if (!this.alive) return;

        if (arenaX !== undefined) {
            this.arenaLeft = arenaX + 10;
            this.arenaRight = arenaX + 960 - this.width - 10;
        }
        if (this.flashTimer > 0) this.flashTimer -= dt;
        // Track previous state so we can give grace period after vulnerable ends
        this._prevState = this.state;
        this.stateTimer -= dt;
        this.updateProjectiles(dt);
        this.updateParticles(dt);
        this.updateHazards(dt);

        // Check phase change
        const newPhase = this.getPhase();
        if (newPhase !== this.phase) {
            this.phase = newPhase;
            // Update attack pattern for new phase
            const behavior = this.getBehavior();
            if (behavior && behavior.getPhaseAttacks) {
                this.attacks = behavior.getPhaseAttacks(this, this.phase);
                this.attackIndex = 0;
            }
        }

        // Per-boss custom update
        const behavior = this.getBehavior();
        if (behavior && behavior.onUpdate) {
            behavior.onUpdate(this, dt, player);
        }

        switch (this.state) {
            case ROAMING: {
                // Move toward player — faster than before but NOT vulnerable
                const toPlayer = player.x - this.x;
                this.direction = Math.sign(toPlayer) || 1;
                const roamSpeed = this.phase === 3 ? 120 : this.phase === 2 ? 100 : 80;
                this.vx = this.direction * roamSpeed;

                if (this.stateTimer <= 0) {
                    this.startAttack();
                }
                break;
            }

            case CHARGING:
                // Bounce off walls
                if (this.x <= this.arenaLeft || this.x >= this.arenaRight) {
                    this.vx = -this.vx;
                    this.direction = -this.direction;
                    this.spawnImpactParticles();
                }
                if (this.stateTimer <= 0) {
                    this.enterRoaming();
                }
                break;

            case SPINNING:
                this.spinAngle += dt * 10;
                // Bounce off walls
                if (this.x <= this.arenaLeft || this.x >= this.arenaRight) {
                    this.vx = -this.vx;
                    this.direction = -this.direction;
                }
                // Spray projectiles
                this.shootTimer += dt;
                if (this.shootTimer >= 0.3) {
                    this.shootTimer = 0;
                    this.fireSpinProjectile();
                }
                if (this.stateTimer <= 0) {
                    this.spinAngle = 0;
                    this.enterRoaming();
                }
                break;

            case SHOOTING:
                this.vx = 0;
                this.shootTimer += dt;
                const shootInterval = this.label === 'BBQ DRAGON' ? 0.25 : 0.4;
                if (this.shootTimer >= shootInterval) {
                    this.shootTimer = 0;
                    this.fireAtPlayer(player);
                    if (this.label === 'BBQ DRAGON' && Math.random() > 0.5) {
                        this.fireSpinProjectile();
                    }
                }
                if (this.stateTimer <= 0) {
                    this.enterRoaming();
                }
                break;

            case VULNERABLE:
                // Wobble — stompable!
                this.vx = Math.sin(Date.now() / 120) * 20;
                if (this.stateTimer <= 0) {
                    this.enterRoaming();
                }
                break;

            case STUNNED:
                this.vx = Math.sin(Date.now() / 100) * 15; // wobble
                if (this.stateTimer <= 0) {
                    this.speed += 50;
                    this.enterRoaming();
                }
                break;

            default:
                // Custom states handled by behavior.onUpdate above
                break;
        }

        this.x += this.vx * dt;
        this.x = Math.max(this.arenaLeft, Math.min(this.arenaRight, this.x));
    }

    enterRoaming() {
        this.state = ROAMING;
        this.vx = 0;
        // Shorter window than before — roaming is NOT the vulnerability window anymore
        this.stateTimer = this.phase === 3 ? 1.0 : this.phase === 2 ? 1.5 : 2.0;
    }

    startAttack() {
        const attack = this.attacks[this.attackIndex % this.attacks.length];
        this.attackIndex++;

        // Check for custom attack first
        const behavior = this.getBehavior();
        if (behavior && behavior.customAttack && behavior.customAttack(this, attack)) {
            return;
        }

        if (attack === 'charge') {
            this.state = CHARGING;
            this.stateTimer = 2.0;
            this.vx = this.speed * this.direction * 1.3;
            this.flashTimer = 0.3;
        } else if (attack === 'spin') {
            this.state = SPINNING;
            this.stateTimer = 2.5;
            this.vx = this.speed * this.direction * 0.8;
            this.shootTimer = 0;
        } else if (attack === 'shoot') {
            this.state = SHOOTING;
            this.stateTimer = 2.0;
            this.vx = 0;
            this.shootTimer = 0;
        }
    }

    getProjectileEmoji() {
        switch (this.label) {
            case 'FRIDGE BEAST': return ['🧊', '🥬', '🍖', '🧀', '🥚'][Math.floor(Math.random() * 5)];
            case 'WASHING MACHINE': return ['💧', '👕', '🧦', '👖', '💦'][Math.floor(Math.random() * 5)];
            case 'TOY BOX TERROR': return ['🧸', '🚂', '🎲', '🪀', '🧩'][Math.floor(Math.random() * 5)];
            case 'WARDROBE MONSTER': return ['👟', '👠', '👗', '🧥', '👜'][Math.floor(Math.random() * 5)];
            case 'BBQ DRAGON': return ['🔥', '🪨', '💨', '🔥', '🪨'][Math.floor(Math.random() * 5)];
            default: return '💨';
        }
    }

    fireAtPlayer(player) {
        const dir = player.x < this.x ? -1 : 1;
        this.projectiles.push({
            x: this.x + (dir === 1 ? this.width : -16),
            y: this.y + this.height / 2 - 8,
            width: 18, height: 14,
            vx: 220 * dir, vy: 0,
            alive: true, timer: 2.5,
            emoji: this.getProjectileEmoji(),
        });
    }

    fireSpinProjectile() {
        const angle = this.spinAngle + Math.random() * 1.5;
        this.projectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            width: 14, height: 14,
            vx: Math.cos(angle) * 150,
            vy: Math.sin(angle) * 100,
            alive: true, timer: 1.8,
            emoji: this.getProjectileEmoji(),
        });
    }

    // Called when player lands on boss from above
    stomp() {
        if (!this.alive || this.state === STUNNED) return false;
        this.health--;
        this.state = STUNNED;
        this.stateTimer = 0.8; // shorter stun than before
        this.vx = 0;
        this.flashTimer = 0.5;
        this.projectiles = [];
        this.projectileCounter = 0; // reset projectile counter

        // Impact particles
        for (let i = 0; i < 10; i++) {
            this.particles.push({
                x: this.x + this.width / 2,
                y: this.y,
                vx: (Math.random() - 0.5) * 200,
                vy: -Math.random() * 150 - 30,
                life: 0.7,
                color: '#FFD700',
                size: 4 + Math.random() * 5,
            });
        }

        if (this.health <= 0) {
            this.alive = false;
            this.defeated = true;
        }
        return true;
    }

    // Called when projectile hits boss
    projectileHit() {
        this.flashTimer = 0.2;
        this.particles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            vx: (Math.random() - 0.5) * 100,
            vy: -Math.random() * 80,
            life: 0.4,
            color: '#ff0',
            size: 4,
        });
        // Small knockback
        this.vx *= -0.3;

        // Per-boss projectile response
        const behavior = this.getBehavior();
        if (behavior && behavior.onProjectileHit) {
            behavior.onProjectileHit(this);
        }
    }

    checkStomp(player) {
        if (!this.alive) return false;
        // Can only stomp during VULNERABLE or STUNNED — not during attacks or roaming
        const canStompState = this.state === VULNERABLE || this.state === STUNNED;
        // Per-boss additional stomp condition (e.g. Fridge doors must be open)
        const behavior = this.getBehavior();
        const behaviorAllows = behavior && behavior.canStomp ? behavior.canStomp(this) : canStompState;
        if (!canStompState && !behaviorAllows) return false;
        return landingOn(player, this, player.prevY);
    }

    checkHitPlayer(player) {
        // No damage during vulnerable/stunned, or on the frame the boss just left those states
        const harmless = this.state === STUNNED || this.state === VULNERABLE ||
            this._prevState === STUNNED || this._prevState === VULNERABLE;
        if (!this.alive || harmless) return false;
        if (aabb(this.getBounds(), player.getBounds())) return true;
        for (const p of this.projectiles) {
            if (p.alive && aabb(p, player.getBounds())) {
                p.alive = false;
                return true;
            }
        }
        return false;
    }

    checkProjectileHit(projectile) {
        if (!this.alive) return false;
        return aabb(this.getBounds(), projectile.getBounds());
    }

    // Check if player collides with arena hazards
    checkHazards(player) {
        // No hazard damage while boss is vulnerable or stunned (incl. grace frame)
        const harmless = this.state === VULNERABLE || this.state === STUNNED ||
            this._prevState === VULNERABLE || this._prevState === STUNNED;
        if (harmless) return null;
        for (const h of this.arenaHazards) {
            if (aabb({ x: h.x, y: h.y, width: h.width, height: h.height }, player.getBounds())) {
                if (h.effect === 'damage') return 'damage';
                if (h.effect === 'slow') return 'slow';
            }
        }
        return null;
    }

    // Check if player stomps a minion
    checkMinionStomp(player) {
        for (const m of this.minions) {
            if (!m.alive) continue;
            if (landingOn(player, m, player.prevY)) {
                m.alive = false;
                // Track toy stomps for TOY BOX TERROR
                if (this.label === 'TOY BOX TERROR') {
                    this.toyStompCount = (this.toyStompCount || 0) + 1;
                    this.toyStompTimer = 4.0;
                }
                return true;
            }
        }
        return false;
    }

    // Check if minion hits player
    checkMinionHit(player) {
        // No minion damage while boss is vulnerable or stunned (incl. grace frame)
        const harmless = this.state === VULNERABLE || this.state === STUNNED ||
            this._prevState === VULNERABLE || this._prevState === STUNNED;
        if (harmless) return false;
        for (const m of this.minions) {
            if (!m.alive) continue;
            if (aabb(m, player.getBounds())) return true;
        }
        return false;
    }

    spawnImpactParticles() {
        const wallX = this.vx > 0 ? this.x + this.width : this.x;
        for (let i = 0; i < 6; i++) {
            this.particles.push({
                x: wallX,
                y: this.y + Math.random() * this.height,
                vx: (this.vx > 0 ? -1 : 1) * (Math.random() * 80 + 30),
                vy: (Math.random() - 0.5) * 80,
                life: 0.4,
                color: '#FFD700',
                size: 3 + Math.random() * 4,
            });
        }
    }

    updateProjectiles(dt) {
        for (const p of this.projectiles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.timer -= dt;
            if (p.timer <= 0 || p.x < this.arenaLeft - 100 || p.x > this.arenaRight + 100) {
                p.alive = false;
            }
        }
        this.projectiles = this.projectiles.filter(p => p.alive);
    }

    updateParticles(dt) {
        for (const p of this.particles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
        }
        this.particles = this.particles.filter(p => p.life > 0);
    }

    updateHazards(dt) {
        for (const h of this.arenaHazards) {
            h.timer -= dt;
        }
        this.arenaHazards = this.arenaHazards.filter(h => h.timer > 0);
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    render(ctx, camera) {
        if (!this.alive) return;

        let sx = this.x - camera.x;
        let sy = this.y - camera.y;

        ctx.save();

        // Render arena hazards behind boss
        this.renderHazards(ctx, camera);

        if (this.flashTimer > 0 && Math.floor(this.flashTimer * 12) % 2 === 0) {
            ctx.globalAlpha = 0.4;
        }

        // Wardrobe teleport fade
        if (this.state === 'teleport') {
            const fade = this.teleportDone ? Math.min(1, (1.0 - this.stateTimer) * 3) : Math.max(0, this.stateTimer * 2);
            ctx.globalAlpha = fade;
        }

        const cx = sx + this.width / 2;
        const cy = sy + this.height / 2;
        const w = this.width;
        const h = this.height;

        if (this.state === SPINNING) {
            ctx.translate(cx, cy);
            ctx.rotate(this.spinAngle);
            ctx.translate(-cx, -cy);
        }

        const stateColor = this.state === STUNNED ? '#AAAA44' :
                           this.state === VULNERABLE ? '#44AA44' :
                           this.state === CHARGING ? '#993333' :
                           this.state === SPINNING ? '#885588' :
                           this.state === SHOOTING ? '#448888' : this.color;

        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.ellipse(cx, sy + h + 4, w / 2 + 4, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Draw body based on boss type
        this.drawBody(ctx, sx, sy, cx, cy, w, h, stateColor);

        // Eyes (shared across all bosses)
        this.drawEyes(ctx, cx, cy, w, h);

        // State indicators — visual only, no hand-holding text
        ctx.textAlign = 'center';
        if (this.state === STUNNED) {
            ctx.font = '14px sans-serif';
            for (let i = 0; i < 3; i++) {
                const a = Date.now() / 250 + i * Math.PI * 2 / 3;
                ctx.fillStyle = '#FFD700';
                ctx.fillText('⭐', cx + Math.cos(a) * (w/2 + 5), sy - 10 + Math.sin(a) * 8);
            }
        } else if (this.state === VULNERABLE) {
            // Green pulsing glow — visual cue that boss is stompable
            const pulse = 0.4 + Math.sin(Date.now() / 100) * 0.3;
            ctx.fillStyle = `rgba(0, 255, 0, ${pulse})`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, w / 2 + 8, h / 2 + 8, 0, 0, Math.PI * 2);
            ctx.fill();
            // Dizzy swirls
            ctx.font = '14px sans-serif';
            for (let i = 0; i < 3; i++) {
                const a = Date.now() / 200 + i * Math.PI * 2 / 3;
                ctx.fillText('💫', cx + Math.cos(a) * (w/2 + 10), sy - 8 + Math.sin(a) * 6);
            }
        }

        // Health pips — compact layout for higher health
        const pipR = this.maxHealth > 6 ? 5 : 7;
        const pipGap = this.maxHealth > 6 ? 14 : 18;
        const pipStartX = cx - ((this.maxHealth - 1) * pipGap) / 2;
        for (let i = 0; i < this.maxHealth; i++) {
            ctx.fillStyle = i < this.health ? '#FF3333' : '#333';
            ctx.beginPath(); ctx.arc(pipStartX + i * pipGap, sy - 18, pipR, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
        }

        // Projectile counter indicator (shows progress toward vulnerability)
        const behavior = this.getBehavior();
        if (behavior && (this.label === 'MEGA ROOMBA' || this.label === 'BBQ DRAGON')) {
            const max = this.label === 'MEGA ROOMBA' ? behavior.hitsToVulnerable :
                        behavior.getHeatMax(this);
            const current = this.label === 'BBQ DRAGON' ?
                (this.heatCounter ?? max) : (behavior.hitsToVulnerable - this.projectileCounter);
            // Small meter below health
            const meterW = 60, meterH = 5;
            const mx = cx - meterW / 2;
            const my = sy - 8;
            ctx.fillStyle = '#333';
            ctx.fillRect(mx, my, meterW, meterH);
            const fill = 1 - (current / max);
            ctx.fillStyle = fill >= 0.9 ? '#0F0' : '#0AF';
            ctx.fillRect(mx, my, meterW * fill, meterH);
            ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.5;
            ctx.strokeRect(mx, my, meterW, meterH);
        }

        // Fridge door indicator
        if (this.label === 'FRIDGE BEAST' && this.doorsOpen) {
            const pulse = 0.5 + Math.sin(Date.now() / 100) * 0.3;
            ctx.fillStyle = `rgba(0, 255, 100, ${pulse})`;
            ctx.beginPath();
            ctx.ellipse(cx, cy, w / 2 + 5, h / 2 + 5, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Projectiles
        for (const p of this.projectiles) {
            if (!p.alive) continue;
            const px = p.x - camera.x + p.width/2;
            const py = p.y - camera.y + p.height/2;
            if (p.emoji) {
                ctx.font = `${p.width + 4}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.emoji, px, py);
            } else {
                ctx.fillStyle = 'rgba(140,140,140,0.7)';
                ctx.beginPath(); ctx.arc(px, py, p.width/2 + 3, 0, Math.PI*2); ctx.fill();
            }
        }

        // Minions
        for (const m of this.minions) {
            if (!m.alive) continue;
            const mx = m.x - camera.x + m.width / 2;
            const my = m.y - camera.y + m.height / 2;
            ctx.font = `${m.width}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(m.emoji || '🧸', mx, my);
        }

        // Particles
        for (const p of this.particles) {
            ctx.globalAlpha = Math.max(0, p.life / 0.7);
            ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(p.x - camera.x, p.y - camera.y, p.size, 0, Math.PI*2); ctx.fill();
        }

        ctx.restore();

        // Darkness overlay (wardrobe monster) — drawn AFTER restore so it covers everything
        if (this.darknessAlpha > 0) {
            ctx.save();
            ctx.fillStyle = `rgba(0, 0, 0, ${this.darknessAlpha})`;
            ctx.fillRect(0, 0, 960, 600);
            // Boss eyes glow through darkness
            if (this.darknessAlpha > 0.4) {
                const ecx = this.x - camera.x + this.width / 2;
                const ecy = this.y - camera.y + this.height * 0.4;
                ctx.fillStyle = '#FF0000';
                ctx.beginPath(); ctx.arc(ecx - 10, ecy, 4, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(ecx + 10, ecy, 4, 0, Math.PI * 2); ctx.fill();
            }
            ctx.restore();
        }
    }

    renderHazards(ctx, camera) {
        for (const h of this.arenaHazards) {
            const hx = h.x - camera.x;
            const hy = h.y - camera.y;

            if (h.type === 'dust') {
                ctx.fillStyle = `rgba(180, 160, 120, ${Math.min(0.5, h.timer / 3)})`;
                ctx.fillRect(hx, hy, h.width, h.height);
            } else if (h.type === 'water') {
                const alpha = Math.min(0.4, h.height / 200);
                ctx.fillStyle = `rgba(80, 140, 220, ${alpha})`;
                ctx.fillRect(hx, hy, h.width, h.height);
                // Water surface line
                ctx.strokeStyle = `rgba(150, 200, 255, ${alpha + 0.1})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                for (let wx = 0; wx < h.width; wx += 20) {
                    const waveY = hy + Math.sin(Date.now() / 300 + wx * 0.05) * 3;
                    if (wx === 0) ctx.moveTo(hx + wx, waveY);
                    else ctx.lineTo(hx + wx, waveY);
                }
                ctx.stroke();
            } else if (h.type === 'mist') {
                ctx.fillStyle = `rgba(180, 220, 255, ${Math.min(0.3, h.timer / 3)})`;
                ctx.fillRect(hx, hy, h.width, h.height);
            } else if (h.type === 'fire' || h.type === 'firebeam') {
                const alpha = Math.min(0.7, h.timer / 2);
                ctx.fillStyle = `rgba(255, 80, 0, ${alpha})`;
                ctx.fillRect(hx, hy, h.width, h.height);
                ctx.fillStyle = `rgba(255, 200, 0, ${alpha * 0.6})`;
                ctx.fillRect(hx + 3, hy + 2, h.width - 6, h.height - 4);
                // Flickering flames
                ctx.font = '14px sans-serif';
                ctx.textAlign = 'center';
                for (let fx = 0; fx < h.width; fx += 25) {
                    if (Math.random() > 0.5) {
                        ctx.fillText('🔥', hx + fx + 12, hy - 2);
                    }
                }
            }
        }
    }

    drawBody(ctx, sx, sy, cx, cy, w, h, color) {
        const label = this.label;

        if (label === 'MEGA ROOMBA') {
            // Disc shape
            ctx.fillStyle = color;
            ctx.beginPath(); ctx.ellipse(cx, cy, w/2, h/2, 0, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.stroke();
            ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.ellipse(cx, cy, w/3, h/3, 0, 0, Math.PI*2); ctx.stroke();
            // LED — changes color based on projectile hits
            const ledColor = this.projectileCounter >= 2 ? '#FF0' : this.projectileCounter >= 1 ? '#FA0' : '#0F0';
            ctx.fillStyle = ledColor; ctx.beginPath(); ctx.arc(cx, cy - h/4, 3, 0, Math.PI*2); ctx.fill();
            // Suction indicator
            if (this.state === 'suction') {
                ctx.strokeStyle = 'rgba(100,150,255,0.3)';
                ctx.lineWidth = 2;
                for (let i = 0; i < 4; i++) {
                    const r = 30 + i * 25 + Math.sin(Date.now() / 200 + i) * 10;
                    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
                }
            }

        } else if (label === 'FRIDGE BEAST') {
            // Rectangular fridge body
            ctx.fillStyle = color;
            this._roundRect(ctx, sx + 5, sy, w - 10, h, 5);
            // Door split — wider if doors open
            const doorGap = this.doorsOpen ? 12 : 0;
            ctx.strokeStyle = '#335'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx - doorGap, sy + 5); ctx.lineTo(cx - doorGap, sy + h - 5); ctx.stroke();
            if (this.doorsOpen) {
                ctx.beginPath(); ctx.moveTo(cx + doorGap, sy + 5); ctx.lineTo(cx + doorGap, sy + h - 5); ctx.stroke();
                // Interior glow when open
                ctx.fillStyle = 'rgba(200, 255, 200, 0.3)';
                ctx.fillRect(cx - doorGap + 2, sy + 5, doorGap * 2 - 4, h - 10);
            }
            // Handles
            ctx.fillStyle = '#AAA';
            ctx.fillRect(cx - 5 - doorGap, cy - 8, 3, 16);
            ctx.fillRect(cx + 2 + doorGap, cy - 8, 3, 16);
            // Magnets
            ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('🧲', sx + 18, cy - 5);
            ctx.fillText('📝', sx + w - 18, cy - 5);
            // Frost effect
            ctx.fillStyle = 'rgba(200,220,255,0.2)';
            this._roundRect(ctx, sx + 8, sy + 3, w - 16, h - 6, 3);

        } else if (label === 'WASHING MACHINE') {
            // Boxy body
            ctx.fillStyle = color;
            this._roundRect(ctx, sx + 3, sy, w - 6, h, 6);
            // Door (circle window)
            ctx.fillStyle = '#889';
            ctx.beginPath(); ctx.arc(cx, cy + 2, h/3, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#667';
            ctx.beginPath(); ctx.arc(cx, cy + 2, h/3 - 4, 0, Math.PI*2); ctx.fill();
            // Spin indicator inside
            const spin = Date.now() / 200;
            ctx.strokeStyle = 'rgba(200,220,255,0.5)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(cx, cy + 2, h/4, spin, spin + 2); ctx.stroke();
            // Control panel
            ctx.fillStyle = '#999';
            ctx.fillRect(sx + 10, sy + 3, w - 20, 8);
            ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(sx + w - 18, sy + 7, 3, 0, Math.PI*2); ctx.fill();
            // Vibration effect when attacking
            if (this.state === SPINNING || this.state === CHARGING) {
                ctx.translate((Math.random()-0.5)*4, (Math.random()-0.5)*3);
            }
            // Draining indicator
            if (this.state === 'draining') {
                ctx.font = '12px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText('💧', cx + 20, sy + h + 10);
                ctx.fillText('💧', cx - 15, sy + h + 8);
            }

        } else if (label === 'TOY BOX TERROR') {
            // Wooden box
            ctx.fillStyle = color;
            this._roundRect(ctx, sx + 2, sy + 5, w - 4, h - 5, 4);
            // Wood grain
            ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 1;
            for (let i = 0; i < w; i += 15) { ctx.beginPath(); ctx.moveTo(sx+2+i, sy+5); ctx.lineTo(sx+2+i, sy+h); ctx.stroke(); }
            // Lid (hinged) — opens wider during summon/lidslam
            const lidAngle = this.lidOpen ? -25 : -12;
            ctx.fillStyle = '#D4A55A';
            ctx.beginPath();
            ctx.moveTo(sx, sy + 5); ctx.lineTo(sx + w, sy + 5);
            ctx.lineTo(sx + w - 5, sy + lidAngle); ctx.lineTo(sx + 5, sy + lidAngle);
            ctx.fill();
            ctx.strokeStyle = '#8B6914'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(sx, sy+5); ctx.lineTo(sx+w, sy+5); ctx.stroke();
            // Toys peeking out
            ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
            if (this.lidOpen) {
                ctx.fillText('🧸', cx - 15, sy - 5); ctx.fillText('🚂', cx + 15, sy - 5);
                ctx.fillText('🎲', cx, sy - 10);
            } else {
                ctx.fillText('🧸', cx - 15, sy); ctx.fillText('🚂', cx + 15, sy);
            }
            // Metal corners
            ctx.fillStyle = '#888';
            ctx.fillRect(sx + 2, sy + 5, 8, 8); ctx.fillRect(sx + w - 10, sy + 5, 8, 8);

        } else if (label === 'WARDROBE MONSTER') {
            // Tall wardrobe body
            ctx.fillStyle = color;
            this._roundRect(ctx, sx + 3, sy - 15, w - 6, h + 15, 4);
            // Doors
            ctx.strokeStyle = '#4a2a0a'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx, sy - 12); ctx.lineTo(cx, sy + h - 3); ctx.stroke();
            // Door panels
            ctx.fillStyle = 'rgba(0,0,0,0.05)';
            ctx.fillRect(sx + 8, sy - 8, w/2 - 10, h + 3);
            ctx.fillRect(cx + 4, sy - 8, w/2 - 10, h + 3);
            // Handles (look like teeth/fangs)
            ctx.fillStyle = '#DDD';
            ctx.beginPath(); ctx.moveTo(cx - 4, cy - 5); ctx.lineTo(cx - 2, cy + 8); ctx.lineTo(cx - 6, cy + 8); ctx.fill();
            ctx.beginPath(); ctx.moveTo(cx + 4, cy - 5); ctx.lineTo(cx + 2, cy + 8); ctx.lineTo(cx + 6, cy + 8); ctx.fill();
            // Crown molding
            ctx.fillStyle = '#5a3a1a';
            ctx.fillRect(sx, sy - 18, w, 6);

        } else if (label === 'BBQ DRAGON') {
            const t = Date.now();

            // === HEAT SHIMMER around the boss ===
            if (this.state !== STUNNED && this.state !== VULNERABLE) {
                ctx.fillStyle = 'rgba(255, 100, 0, 0.04)';
                for (let i = 0; i < 5; i++) {
                    const shimX = cx + Math.sin(t/200 + i*1.3) * (w/2 + 20);
                    const shimY = cy + Math.cos(t/250 + i*1.7) * (h/2 + 10);
                    ctx.beginPath(); ctx.arc(shimX, shimY, 15 + Math.sin(t/100+i)*5, 0, Math.PI*2); ctx.fill();
                }
            }

            // === LEGS ===
            ctx.fillStyle = '#333';
            ctx.fillRect(sx + 12, sy + h - 2, 6, 14);
            ctx.fillRect(sx + w - 18, sy + h - 2, 6, 14);
            // Wheels
            ctx.fillStyle = '#222';
            ctx.beginPath(); ctx.arc(sx + 15, sy + h + 12, 6, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(sx + w - 15, sy + h + 12, 6, 0, Math.PI*2); ctx.fill();
            ctx.fillStyle = '#444';
            ctx.beginPath(); ctx.arc(sx + 15, sy + h + 12, 3, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(sx + w - 15, sy + h + 12, 3, 0, Math.PI*2); ctx.fill();

            // === MAIN BODY — barrel grill ===
            const bodyGrad = ctx.createLinearGradient(sx, sy, sx, sy + h);
            bodyGrad.addColorStop(0, (this.state === STUNNED || this.state === VULNERABLE) ? '#888' : '#5A1500');
            bodyGrad.addColorStop(0.5, (this.state === STUNNED || this.state === VULNERABLE) ? '#777' : color);
            bodyGrad.addColorStop(1, (this.state === STUNNED || this.state === VULNERABLE) ? '#666' : '#4A0A00');
            ctx.fillStyle = bodyGrad;
            ctx.beginPath(); ctx.ellipse(cx, cy, w/2, h/2, 0, 0, Math.PI*2); ctx.fill();

            // Metal rim
            ctx.strokeStyle = '#2A0A00'; ctx.lineWidth = 3; ctx.stroke();

            // Grill lines
            const grillGlow = (this.state === CHARGING || this.state === SHOOTING || this.state === 'firebeam') ? '#FF6600' : '#555';
            ctx.strokeStyle = grillGlow; ctx.lineWidth = 2;
            for (let i = -3; i <= 3; i++) {
                ctx.beginPath(); ctx.moveTo(cx - w/3, cy + i * (h/8)); ctx.lineTo(cx + w/3, cy + i * (h/8)); ctx.stroke();
            }

            // Glowing coals inside
            if (this.state !== STUNNED && this.state !== VULNERABLE) {
                const coalGlow = 0.3 + Math.sin(t/200) * 0.15;
                ctx.fillStyle = `rgba(255, 80, 0, ${coalGlow})`;
                ctx.beginPath(); ctx.ellipse(cx, cy + 3, w/3, h/3, 0, 0, Math.PI*2); ctx.fill();
                ctx.fillStyle = `rgba(255, 200, 0, ${coalGlow * 0.5})`;
                ctx.beginPath(); ctx.ellipse(cx, cy + 3, w/5, h/5, 0, 0, Math.PI*2); ctx.fill();
            }

            // === DRAGON HEAD ===
            const headX = this.direction === 1 ? sx + w - 5 : sx + 5;
            const headDir = this.direction;
            ctx.fillStyle = (this.state === STUNNED || this.state === VULNERABLE) ? '#777' : '#6A1A00';
            ctx.beginPath();
            ctx.moveTo(headX, cy - 10);
            ctx.lineTo(headX + headDir * 25, cy - 20);
            ctx.lineTo(headX + headDir * 25, cy + 5);
            ctx.lineTo(headX, cy + 10);
            ctx.fill();
            ctx.fillStyle = (this.state === STUNNED || this.state === VULNERABLE) ? '#888' : '#7A2000';
            ctx.beginPath();
            ctx.arc(headX + headDir * 30, cy - 8, 16, 0, Math.PI * 2);
            ctx.fill();
            const jawOpen = (this.state === SHOOTING || this.state === 'firebeam') ? 8 : 3;
            ctx.fillStyle = (this.state === STUNNED || this.state === VULNERABLE) ? '#666' : '#5A1500';
            ctx.beginPath();
            ctx.moveTo(headX + headDir * 35, cy - 3);
            ctx.lineTo(headX + headDir * 50, cy - 1 + jawOpen);
            ctx.lineTo(headX + headDir * 35, cy + 5 + jawOpen);
            ctx.fill();
            // Teeth
            ctx.fillStyle = '#FFF';
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(headX + headDir * (38 + i*4), cy - 2);
                ctx.lineTo(headX + headDir * (40 + i*4), cy + 3);
                ctx.lineTo(headX + headDir * (36 + i*4), cy + 3);
                ctx.fill();
            }
            // Nostril smoke
            if (this.state !== STUNNED && this.state !== VULNERABLE) {
                ctx.fillStyle = 'rgba(150,150,150,0.4)';
                ctx.beginPath(); ctx.arc(headX + headDir * 42, cy - 14, 4 + Math.sin(t/100)*2, 0, Math.PI*2); ctx.fill();
            }

            // === FIRE BREATH ===
            if ((this.state === SHOOTING || this.state === CHARGING || this.state === 'firebeam') &&
                this.state !== STUNNED && this.state !== VULNERABLE) {
                const fireX = headX + headDir * 48;
                const fireLen = (this.state === SHOOTING || this.state === 'firebeam') ? 60 : 35;
                ctx.fillStyle = '#FF2200';
                ctx.beginPath();
                ctx.moveTo(fireX, cy - 12);
                for (let i = 0; i < 6; i++) {
                    const fx = fireX + headDir * (fireLen * (i/5));
                    const fy = cy + Math.sin(t/30 + i*1.5) * (5 + i*3);
                    ctx.lineTo(fx, fy - 8 - Math.random()*4);
                }
                for (let i = 5; i >= 0; i--) {
                    const fx = fireX + headDir * (fireLen * (i/5));
                    const fy = cy + Math.sin(t/40 + i*1.2) * (4 + i*2);
                    ctx.lineTo(fx, fy + 8 + Math.random()*4);
                }
                ctx.fill();
                ctx.fillStyle = '#FFAA00';
                ctx.beginPath();
                ctx.moveTo(fireX, cy - 6);
                for (let i = 0; i < 4; i++) {
                    const fx = fireX + headDir * (fireLen * 0.6 * (i/3));
                    ctx.lineTo(fx, cy - 4 + Math.sin(t/25 + i)*3);
                }
                for (let i = 3; i >= 0; i--) {
                    const fx = fireX + headDir * (fireLen * 0.6 * (i/3));
                    ctx.lineTo(fx, cy + 4 + Math.sin(t/35 + i)*3);
                }
                ctx.fill();
                ctx.fillStyle = 'rgba(255,255,200,0.6)';
                ctx.beginPath(); ctx.ellipse(fireX + headDir * 5, cy, 8, 4, 0, 0, Math.PI*2); ctx.fill();
            }

            // === SMOKE ===
            const smokeCount = (this.state === STUNNED || this.state === VULNERABLE) ? 2 : 6;
            for (let i = 0; i < smokeCount; i++) {
                const smokeAlpha = (this.state === STUNNED || this.state === VULNERABLE) ? 0.1 : 0.2 + Math.sin(t/300+i)*0.1;
                ctx.fillStyle = `rgba(80,80,80,${smokeAlpha})`;
                const smokeX = cx + Math.sin(t/300 + i*2.1) * (w/3);
                const smokeY = sy - 15 - i * 12 - Math.sin(t/250 + i)*5;
                const smokeR = 6 + i * 3 + Math.sin(t/200+i)*2;
                ctx.beginPath(); ctx.arc(smokeX, smokeY, smokeR, 0, Math.PI*2); ctx.fill();
            }

            // === HORNS ===
            if (this.state !== STUNNED && this.state !== VULNERABLE) {
                ctx.fillStyle = '#4A0A00';
                ctx.beginPath();
                ctx.moveTo(headX + headDir * 22, cy - 20);
                ctx.lineTo(headX + headDir * 18, cy - 35);
                ctx.lineTo(headX + headDir * 28, cy - 18);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(headX + headDir * 32, cy - 22);
                ctx.lineTo(headX + headDir * 30, cy - 38);
                ctx.lineTo(headX + headDir * 38, cy - 20);
                ctx.fill();
            }

            // Handle on top
            ctx.fillStyle = '#333';
            ctx.fillRect(cx - 15, sy - 5, 30, 4);
            ctx.fillStyle = '#555';
            ctx.fillRect(cx - 12, sy - 8, 24, 5);

            // Heat counter visual — small flame icons
            if (this.heatCounter !== undefined && this.state !== VULNERABLE && this.state !== STUNNED) {
                const max = BOSS_BEHAVIORS['BBQ DRAGON'].getHeatMax(this);
                ctx.font = '10px sans-serif';
                ctx.textAlign = 'center';
                for (let i = 0; i < max; i++) {
                    ctx.globalAlpha = i < this.heatCounter ? 1 : 0.2;
                    ctx.fillText('🔥', cx - ((max-1) * 8) / 2 + i * 8, sy - 30);
                }
                ctx.globalAlpha = 1;
            }

        } else {
            // Generic fallback
            ctx.fillStyle = color;
            this._roundRect(ctx, sx, sy, w, h, 6);
            ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
            ctx.strokeRect(sx + 2, sy + 2, w - 4, h - 4);
        }
    }

    drawEyes(ctx, cx, cy, w, h) {
        const eyeSpread = w * 0.17;
        const eyeY = cy - h * 0.1;
        const eyeSize = this.state === CHARGING ? 9 : 7;

        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.ellipse(cx - eyeSpread, eyeY, eyeSize, eyeSize - 1, 0, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx + eyeSpread, eyeY, eyeSize, eyeSize - 1, 0, 0, Math.PI*2); ctx.fill();

        if (this.state === STUNNED || this.state === VULNERABLE) {
            // X eyes for stunned, spiral eyes for vulnerable
            ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
            if (this.state === STUNNED) {
                for (const ex of [cx - eyeSpread, cx + eyeSpread]) {
                    ctx.beginPath(); ctx.moveTo(ex-3, eyeY-3); ctx.lineTo(ex+3, eyeY+3); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(ex+3, eyeY-3); ctx.lineTo(ex-3, eyeY+3); ctx.stroke();
                }
            } else {
                // Dizzy spiral eyes for vulnerable
                const t = Date.now() / 200;
                for (const ex of [cx - eyeSpread, cx + eyeSpread]) {
                    ctx.beginPath();
                    for (let a = 0; a < Math.PI * 4; a += 0.3) {
                        const r = a * 0.8;
                        ctx.lineTo(ex + Math.cos(a + t) * r, eyeY + Math.sin(a + t) * r);
                    }
                    ctx.stroke();
                }
            }
        } else {
            ctx.fillStyle = this.state === CHARGING ? '#FF0000' : '#111';
            const pd = this.direction * 2;
            ctx.beginPath(); ctx.arc(cx - eyeSpread + pd, eyeY, 3.5, 0, Math.PI*2); ctx.fill();
            ctx.beginPath(); ctx.arc(cx + eyeSpread + pd, eyeY, 3.5, 0, Math.PI*2); ctx.fill();

            if (this.state !== ROAMING) {
                ctx.strokeStyle = '#333'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(cx-eyeSpread-8, eyeY-9); ctx.lineTo(cx-eyeSpread+5, eyeY-5); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(cx+eyeSpread+8, eyeY-9); ctx.lineTo(cx+eyeSpread-5, eyeY-5); ctx.stroke();
            }
        }
    }

    _roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y);
        ctx.quadraticCurveTo(x+w, y, x+w, y+r); ctx.lineTo(x+w, y+h-r);
        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h); ctx.lineTo(x+r, y+h);
        ctx.quadraticCurveTo(x, y+h, x, y+h-r); ctx.lineTo(x, y+r);
        ctx.quadraticCurveTo(x, y, x+r, y);
        ctx.closePath(); ctx.fill();
    }
}
