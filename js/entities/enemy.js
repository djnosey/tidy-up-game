import { aabb, landingOn } from '../engine/physics.js';
import { drawEnemy } from '../engine/renderers/enemy-renderer.js';

export class Enemy {
    constructor(x, y, width, height, label, color = '#AA44AA', patrolRange = 120) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.color = color;

        this.startX = x;
        this.patrolRange = patrolRange;
        this.speed = 60;
        this.direction = 1;
        this.alive = true;
        this.deathTimer = 0;
    }

    update(dt) {
        if (!this.alive) {
            this.deathTimer -= dt;
            return;
        }

        this.x += this.speed * this.direction * dt;
        if (this.x > this.startX + this.patrolRange) {
            this.direction = -1;
        } else if (this.x < this.startX - this.patrolRange) {
            this.direction = 1;
        }
    }

    checkStomp(player) {
        if (!this.alive) return false;
        return landingOn(player, this, player.prevY);
    }

    checkHit(player) {
        if (!this.alive) return false;
        return aabb(this.getBounds(), player.getBounds());
    }

    checkProjectileHit(projectile) {
        if (!this.alive) return false;
        return aabb(this.getBounds(), projectile.getBounds());
    }

    die() {
        this.alive = false;
        this.deathTimer = 0.5;
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
    }
}
