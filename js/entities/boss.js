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
        this.phaseChanged = false;
        this.phaseFlashTimer = 0;
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
        if (this.phaseFlashTimer > 0) this.phaseFlashTimer -= dt;
        // Track previous state so we can give grace period after vulnerable ends
        this._prevState = this.state;
        this.stateTimer -= dt;
        this.updateProjectiles(dt);
        this.updateParticles(dt);
        this.updateHazards(dt);

        // Check phase change
        const newPhase = this.getPhase();
        if (newPhase !== this.phase) {
            const oldPhase = this.phase;
            this.phase = newPhase;
            this.phaseChanged = true; // signal for main.js to trigger effects
            this.phaseFlashTimer = 0.6; // white flash duration

            // Big particle burst for phase transition
            for (let i = 0; i < 20; i++) {
                this.particles.push({
                    x: this.x + this.width / 2,
                    y: this.y + this.height / 2,
                    vx: (Math.random() - 0.5) * 400,
                    vy: -Math.random() * 300 - 50,
                    life: 0.8,
                    color: newPhase === 3 ? '#FF2222' : '#FFAA00',
                    size: 4 + Math.random() * 6,
                });
            }

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
        let pw = 0;
        for (let i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles[i].alive) this.projectiles[pw++] = this.projectiles[i];
        }
        this.projectiles.length = pw;
    }

    updateParticles(dt) {
        for (const p of this.particles) {
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
        }
        let ppw = 0;
        for (let i = 0; i < this.particles.length; i++) {
            if (this.particles[i].life > 0) this.particles[ppw++] = this.particles[i];
        }
        this.particles.length = ppw;
    }

    updateHazards(dt) {
        for (const h of this.arenaHazards) {
            h.timer -= dt;
        }
        let hw = 0;
        for (let i = 0; i < this.arenaHazards.length; i++) {
            if (this.arenaHazards[i].timer > 0) this.arenaHazards[hw++] = this.arenaHazards[i];
        }
        this.arenaHazards.length = hw;
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
}

