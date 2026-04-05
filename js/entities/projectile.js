import { drawProjectile } from '../engine/renderers/projectile-renderer.js';

const PROJECTILE_SPEED = 850;
const MAX_DISTANCE = 700;

export class Projectile {
    constructor(x, y, direction, character) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 12;
        this.vx = PROJECTILE_SPEED * direction;
        this.startX = x;
        this.alive = true;
        this.character = character;
        this.direction = direction;
    }

    update(dt) {
        this.x += this.vx * dt;
        if (Math.abs(this.x - this.startX) > MAX_DISTANCE) {
            this.alive = false;
        }
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    render(ctx, camera) {
        const sx = this.x - camera.x;
        const sy = this.y - camera.y;
        ctx.save();
        if (this.direction === -1) {
            ctx.translate(sx + this.width, sy);
            ctx.scale(-1, 1);
            drawProjectile(ctx, 0, 0, this.width, this.height, this.character);
        } else {
            drawProjectile(ctx, sx, sy, this.width, this.height, this.character);
        }
        ctx.restore();
    }
}
