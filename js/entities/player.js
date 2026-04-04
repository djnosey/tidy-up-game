import { GRAVITY, TERMINAL_VELOCITY, resolvePlatformCollision, resolveOneWayPlatform } from '../engine/physics.js';
import { drawCharacter } from '../engine/renderers/character-renderer.js';
import { Projectile } from './projectile.js';

const MOVE_SPEED = 280;
const JUMP_VELOCITY = -720;
const SHORT_JUMP_VELOCITY = -430;
const CROUCH_HEIGHT_RATIO = 0.6;
const INVINCIBILITY_DURATION = 1.5;
const SHOOT_COOLDOWN = 0.5;

export class Player {
    constructor(x, y, character) {
        this.x = x;
        this.y = y;
        this.width = 48;
        this.height = 72;
        this.standingHeight = 72;
        this.crouchHeight = Math.floor(72 * CROUCH_HEIGHT_RATIO);

        this.vx = 0;
        this.vy = 0;
        this.onGround = false;
        this.facing = 1;
        this.crouching = false;

        this.character = character;
        this.health = 3;
        this.maxHealth = 3;
        this.invincibleTimer = 0;
        this.shootCooldown = 0;
        this.alive = true;
        this.prevY = y;
        this.wasOnGround = false;

        // Squash & stretch
        this.scaleX = 1;
        this.scaleY = 1;

        // Electrocution effect
        this.electrocuteTimer = 0;

        // Idle animation
        this.idleTimer = 0;
        this.isIdle = false;

        // Debug invincibility (cheat mode)
        this.cheatInvincible = false;
    }

    update(dt, input, platforms) {
        if (!this.alive) return;
        this.prevY = this.y;
        this.wasOnGround = this.onGround;

        if (this.invincibleTimer > 0) this.invincibleTimer -= dt;
        if (this.shootCooldown > 0) this.shootCooldown -= dt;
        if (this.electrocuteTimer > 0) this.electrocuteTimer -= dt;

        // Lerp squash/stretch back to normal
        this.scaleX += (1 - this.scaleX) * Math.min(1, 8 * dt);
        this.scaleY += (1 - this.scaleY) * Math.min(1, 8 * dt);

        // Idle animation tracking
        const hasInput = input.left || input.right || input.down || input.jump || input.jumpPressed || input.shoot;
        if (hasInput || !this.onGround) {
            this.idleTimer = 0;
            this.isIdle = false;
        } else {
            this.idleTimer += dt;
            this.isIdle = this.idleTimer >= 5;
        }

        // Horizontal movement
        this.vx = 0;
        if (input.left) { this.vx = -MOVE_SPEED; this.facing = -1; }
        if (input.right) { this.vx = MOVE_SPEED; this.facing = 1; }

        // Crouching
        if (input.down && this.onGround) {
            if (!this.crouching) {
                this.crouching = true;
                const diff = this.standingHeight - this.crouchHeight;
                this.y += diff;
                this.height = this.crouchHeight;
            }
            this.vx *= 0.3;
        } else if (this.crouching) {
            this.crouching = false;
            const diff = this.standingHeight - this.crouchHeight;
            this.y -= diff;
            this.height = this.standingHeight;
        }

        // Jump
        if (input.jumpPressed && this.onGround && !this.crouching) {
            this.vy = JUMP_VELOCITY;
            this.onGround = false;
            this.scaleX = 0.8;
            this.scaleY = 1.3;
        }
        if (!input.jump && this.vy < SHORT_JUMP_VELOCITY) {
            this.vy = SHORT_JUMP_VELOCITY;
        }

        // Gravity
        this.vy += GRAVITY * dt;
        if (this.vy > TERMINAL_VELOCITY) this.vy = TERMINAL_VELOCITY;

        // Apply
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        if (this.x < 0) this.x = 0;

        // Platform collisions
        this.onGround = false;
        this._onOneWayPlatform = null;
        for (const plat of platforms) {
            if (plat._disabled) continue;
            // Ground (no label) and solid-flagged platforms use full collision
            // Everything else is one-way: jump through from below, land on top
            if (!plat.label && plat.label !== undefined || plat.solid) {
                resolvePlatformCollision(this, plat);
            } else {
                // Drop through if pressing down while standing on this platform
                if (input.down && this._standingOnPlatform === plat) continue;
                resolveOneWayPlatform(this, plat);
            }
        }
        // Track which one-way platform we're standing on (for drop-through next frame)
        this._standingOnPlatform = this._onOneWayPlatform;

        // Land squash
        if (this.onGround && !this.wasOnGround) {
            this.scaleX = 1.3;
            this.scaleY = 0.7;
        }
    }

    takeDamage(duration) {
        if (this.cheatInvincible) return false;
        if (this.invincibleTimer > 0 || !this.alive) return false;
        this.health--;
        this.invincibleTimer = duration || INVINCIBILITY_DURATION;
        if (this.health <= 0) this.alive = false;
        return true;
    }

    heal() {
        if (this.health < this.maxHealth) this.health++;
    }

    canShoot() {
        return this.shootCooldown <= 0 && this.alive;
    }

    shoot() {
        this.shootCooldown = SHOOT_COOLDOWN;
    }

    tryShoot(input) {
        if (!input.shoot || !this.canShoot()) return null;
        this.shoot();
        const px = this.facing === 1 ? this.x + this.width : this.x - 20;
        const py = this.y + this.height / 2 - 6;
        return new Projectile(px, py, this.facing, this.character);
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    render(ctx, camera) {
        const sx = this.x - camera.x;
        const sy = this.y - camera.y;

        if (this.invincibleTimer > 0 && Math.floor(this.invincibleTimer * 10) % 2 === 0) {
            return;
        }

        ctx.save();
        // Squash & stretch: pivot at feet center
        const cx = sx + this.width / 2;
        const fy = sy + this.height;
        ctx.translate(cx, fy);
        ctx.scale(this.scaleX * (this.facing === -1 ? -1 : 1), this.scaleY);
        ctx.translate(-this.width / 2, -this.height);
        drawCharacter(ctx, 0, 0, this.width, this.height, this.character, this.facing, this.crouching, this.isIdle ? this.idleTimer : 0);
        ctx.restore();

        // Electrocution effect — skeleton flash with zap bolts
        if (this.electrocuteTimer > 0) {
            const flash = Math.floor(this.electrocuteTimer * 15) % 3;
            ctx.save();
            if (flash === 0) {
                // Yellow flash frame — skeleton silhouette
                ctx.fillStyle = 'rgba(255, 255, 0, 0.6)';
                ctx.fillRect(sx, sy, this.width, this.height);
                // Draw bone lines
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                const midX = sx + this.width / 2;
                // Spine
                ctx.beginPath();
                ctx.moveTo(midX, sy + 10);
                ctx.lineTo(midX, sy + this.height - 15);
                ctx.stroke();
                // Ribs
                for (let r = 0; r < 3; r++) {
                    const ry = sy + 20 + r * 10;
                    ctx.beginPath();
                    ctx.moveTo(midX - 10, ry);
                    ctx.lineTo(midX + 10, ry);
                    ctx.stroke();
                }
            }
            // Lightning bolts around player
            ctx.font = `${12 + Math.random() * 8}px sans-serif`;
            ctx.textAlign = 'center';
            const boltCount = flash === 1 ? 4 : 2;
            for (let i = 0; i < boltCount; i++) {
                const bx = sx + (Math.random()) * this.width;
                const by = sy + (Math.random()) * this.height;
                ctx.fillText('⚡', bx, by);
            }
            ctx.restore();
        }
    }
}
