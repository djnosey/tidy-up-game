import { aabb, landingOn } from '../engine/physics.js';
import { drawEnemy } from '../engine/renderers/enemy-renderer.js';

// Behavior types:
// 'patrol'  — default, walks back and forth (original behavior but faster)
// 'charger' — patrols until player is nearby, then charges at double speed
// 'jumper'  — patrols and periodically jumps
// 'shooter' — patrols and periodically fires a projectile toward player

const BASE_SPEED = 120;

export class Enemy {
    constructor(x, y, width, height, label, color = '#AA44AA', patrolRange = 200, behavior = 'patrol') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.color = color;

        this.startX = x;
        this.patrolRange = patrolRange;
        this.speed = BASE_SPEED;
        this.direction = 1;
        this.alive = true;
        this.deathTimer = 0;

        // Behavior system
        this.behavior = behavior;
        this.baseSpeed = BASE_SPEED;
        this.vy = 0;
        this.onGround = true;
        this.baseY = y;

        // Charger state
        this.charging = false;
        this.chargeSpeed = BASE_SPEED * 2.5;

        // Jumper state
        this.jumpTimer = 1.5 + Math.random() * 2;

        // Shooter state
        this.shootTimer = 2 + Math.random() * 1.5;
        this.projectiles = [];
    }

    update(dt, player) {
        if (!this.alive) {
            this.deathTimer -= dt;
            return;
        }

        // Update enemy projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) this.projectiles.splice(i, 1);
        }

        switch (this.behavior) {
            case 'charger':
                this._updateCharger(dt, player);
                break;
            case 'jumper':
                this._updateJumper(dt, player);
                break;
            case 'shooter':
                this._updateShooter(dt, player);
                break;
            default:
                this._updatePatrol(dt);
                break;
        }
    }

    _updatePatrol(dt) {
        this.x += this.speed * this.direction * dt;
        if (this.x > this.startX + this.patrolRange) {
            this.direction = -1;
        } else if (this.x < this.startX - this.patrolRange) {
            this.direction = 1;
        }
    }

    _updateCharger(dt, player) {
        if (player && player.alive) {
            const dx = player.x - this.x;
            const dist = Math.abs(dx);
            if (dist < 300 && !this.charging) {
                this.charging = true;
                this.direction = dx > 0 ? 1 : -1;
            }
        }

        if (this.charging) {
            this.x += this.chargeSpeed * this.direction * dt;
            // Stop charging if we've gone way past patrol range
            if (Math.abs(this.x - this.startX) > this.patrolRange * 2) {
                this.charging = false;
                this.direction = this.x > this.startX ? -1 : 1;
            }
        } else {
            this._updatePatrol(dt);
        }
    }

    _updateJumper(dt, player) {
        this._updatePatrol(dt);

        // Gravity
        if (!this.onGround) {
            this.vy += 1200 * dt;
            this.y += this.vy * dt;
            if (this.y >= this.baseY) {
                this.y = this.baseY;
                this.vy = 0;
                this.onGround = true;
            }
        }

        // Jump periodically
        this.jumpTimer -= dt;
        if (this.jumpTimer <= 0 && this.onGround) {
            this.vy = -450;
            this.onGround = false;
            this.jumpTimer = 1.5 + Math.random() * 2;
        }
    }

    _updateShooter(dt, player) {
        this._updatePatrol(dt);

        this.shootTimer -= dt;
        if (this.shootTimer <= 0 && player && player.alive) {
            const dx = player.x - this.x;
            const dy = player.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 500) {
                const speed = 200;
                this.projectiles.push({
                    x: this.x + this.width / 2,
                    y: this.y + this.height / 2,
                    vx: (dx / dist) * speed,
                    vy: (dy / dist) * speed,
                    life: 2.5,
                    width: 8,
                    height: 8,
                });
            }
            this.shootTimer = 2 + Math.random() * 1.5;
        }
    }

    checkStomp(player) {
        if (!this.alive) return false;
        return landingOn(player, this, player.prevY);
    }

    checkHit(player) {
        if (!this.alive) return false;
        // Check body collision
        if (aabb(this.getBounds(), player.getBounds())) return true;
        // Check enemy projectiles hitting player
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const p = this.projectiles[i];
            if (aabb({ x: p.x, y: p.y, width: p.width, height: p.height }, player.getBounds())) {
                this.projectiles.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    checkProjectileHit(projectile) {
        if (!this.alive) return false;
        return aabb(this.getBounds(), projectile.getBounds());
    }

    die() {
        this.alive = false;
        this.deathTimer = 0.5;
        this.projectiles = [];
    }

    get shouldRemove() {
        return !this.alive && this.deathTimer <= 0;
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    render(ctx, camera) {
        if (!this.alive && this.deathTimer <= 0) return;
        const sx = this.x - camera.x;
        const sy = this.y - camera.y;
        drawEnemy(ctx, sx, sy, this.width, this.height, this.label, this.color, this.direction, this.alive, this.deathTimer);

        // Render enemy projectiles
        if (this.alive) {
            ctx.fillStyle = '#FF4444';
            for (const p of this.projectiles) {
                const px = p.x - camera.x;
                const py = p.y - camera.y;
                ctx.beginPath();
                ctx.arc(px, py, 4, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }
}
