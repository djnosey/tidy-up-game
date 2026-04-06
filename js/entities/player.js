import { GRAVITY, TERMINAL_VELOCITY, resolvePlatformCollision, resolveOneWayPlatform } from '../engine/physics.js';
import { drawCharacter } from '../engine/renderers/character-renderer.js';
import { Projectile } from './projectile.js';

const MOVE_SPEED = 280;
const JUMP_VELOCITY = -720;
const SHORT_JUMP_VELOCITY = -430;
const CROUCH_HEIGHT_RATIO = 0.6;
const INVINCIBILITY_DURATION = 1.5;
const SHOOT_COOLDOWN = 0.25;

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

        // Coyote time & jump buffering
        this.coyoteTimer = 0;
        this.jumpBufferTimer = 0;

        // Idle animation
        this.idleTimer = 0;
        this.isIdle = false;

        // Animation state — passed to renderer each frame
        this.animState = {
            walkPhase: 0,
            isWalking: false,
            isJumping: false,
            isFalling: false,
            isCrouching: false,
            isLanding: false,
            isShooting: false,
            landTimer: 0,
            shootTimer: 0,
            blinkTimer: 2 + Math.random() * 3,
            blinkDuration: 0,
            breathPhase: 0,
            expression: 'neutral',
            velocityX: 0,
            velocityY: 0,
            idleTime: 0,
        };

        // Knockback
        this.knockbackVx = 0;

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

        // Coyote time — track how long since we left the ground
        if (this.onGround) {
            this.coyoteTimer = 0.08; // 80ms grace period
        } else {
            this.coyoteTimer -= dt;
        }

        // Jump buffer — remember jump press for a short window
        if (input.jumpPressed) {
            this.jumpBufferTimer = 0.1; // 100ms buffer
        } else {
            this.jumpBufferTimer -= dt;
        }

        // Decay knockback
        this.knockbackVx *= Math.max(0, 1 - 8 * dt);

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

        // Update animation state
        const anim = this.animState;
        anim.velocityX = this.vx;
        anim.velocityY = this.vy;
        anim.breathPhase += dt * 2;
        anim.idleTime = this.isIdle ? this.idleTimer : 0;

        // Blink cycle
        if (anim.blinkDuration > 0) {
            anim.blinkDuration -= dt;
        } else {
            anim.blinkTimer -= dt;
            if (anim.blinkTimer <= 0) {
                anim.blinkDuration = 0.1;
                anim.blinkTimer = 2 + Math.random() * 4;
            }
        }

        // Land/shoot timers
        if (anim.landTimer > 0) anim.landTimer -= dt;
        if (anim.shootTimer > 0) anim.shootTimer -= dt;

        // Horizontal movement
        this.vx = 0;
        if (input.left) { this.vx = -MOVE_SPEED; this.facing = -1; }
        if (input.right) { this.vx = MOVE_SPEED; this.facing = 1; }

        // Crouching — use wasOnGround to avoid flicker from collision reset order
        if (input.down && (this.onGround || this.wasOnGround || this.crouching)) {
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

        // Jump (with coyote time + jump buffering)
        const canCoyoteJump = this.coyoteTimer > 0 && !this.crouching;
        const wantsJump = input.jumpPressed || this.jumpBufferTimer > 0;
        if (wantsJump && canCoyoteJump) {
            this.vy = JUMP_VELOCITY;
            this.onGround = false;
            this.coyoteTimer = 0;     // consume coyote time — prevents double-jump
            this.jumpBufferTimer = 0; // consume buffer
            this.scaleX = 0.8;
            this.scaleY = 1.3;
        }
        if (!input.jump && this.vy < SHORT_JUMP_VELOCITY) {
            this.vy = SHORT_JUMP_VELOCITY;
        }

        // Gravity
        this.vy += GRAVITY * dt;
        if (this.vy > TERMINAL_VELOCITY) this.vy = TERMINAL_VELOCITY;

        // Apply movement + knockback
        this.x += (this.vx + this.knockbackVx) * dt;
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
                if (input.downPressed && this._standingOnPlatform === plat) continue;
                resolveOneWayPlatform(this, plat);
            }
        }
        // Track which one-way platform we're standing on (for drop-through next frame)
        this._standingOnPlatform = this._onOneWayPlatform;

        // Land squash
        if (this.onGround && !this.wasOnGround) {
            this.scaleX = 1.3;
            this.scaleY = 0.7;
            anim.landTimer = 0.2;
        }

        // Finalize animation state booleans
        anim.isWalking = this.onGround && this.vx !== 0;
        anim.isJumping = !this.onGround && this.vy < 0;
        anim.isFalling = !this.onGround && this.vy >= 0;
        anim.isCrouching = this.crouching;
        anim.isLanding = anim.landTimer > 0;
        anim.isShooting = anim.shootTimer > 0;

        // Walk cycle phase
        if (anim.isWalking) {
            anim.walkPhase += (Math.abs(this.vx) / MOVE_SPEED) * dt * 12;
        } else {
            anim.walkPhase = 0;
        }

        // Expression
        if (anim.isShooting) {
            anim.expression = 'determined';
        } else if (anim.isJumping) {
            anim.expression = 'surprised';
        } else if (anim.isLanding) {
            anim.expression = 'neutral';
        } else {
            anim.expression = 'neutral';
        }

        // Update velocity for renderer eye tracking
        anim.velocityX = this.vx;
        anim.velocityY = this.vy;
    }

    takeDamage(duration) {
        if (this.cheatInvincible) return false;
        if (this.invincibleTimer > 0 || !this.alive) return false;
        this.health--;
        this.invincibleTimer = duration || INVINCIBILITY_DURATION;
        if (this.health <= 0) this.alive = false;
        return true;
    }

    knockback(sourceX) {
        const dir = this.x + this.width / 2 > sourceX ? 1 : -1;
        this.knockbackVx = dir * 400;
        this.vy = Math.min(this.vy, -200); // small upward pop
    }

    heal() {
        if (this.health < this.maxHealth) this.health++;
    }

    addLife() {
        this.maxHealth++;
        this.health++;
    }

    canShoot() {
        return this.shootCooldown <= 0 && this.alive;
    }

    shoot() {
        this.shootCooldown = SHOOT_COOLDOWN;
        this.animState.shootTimer = 0.3;
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
        drawCharacter(ctx, 0, 0, this.width, this.height, this.character, this.facing, this.animState);
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
