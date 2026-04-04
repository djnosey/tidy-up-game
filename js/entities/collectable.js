import { aabb } from '../engine/physics.js';
import { drawCollectable } from '../engine/renderers/collectable-renderer.js';

export class Collectable {
    constructor(x, y, label, color = '#FFD700') {
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.width = 34;
        this.height = 34;
        this.label = label;
        this.color = color;
        this.collected = false;
        this.bobTimer = Math.random() * Math.PI * 2;
        // Collect animation
        this.collectAnim = 0;
    }

    update(dt) {
        if (this.collected) {
            this.collectAnim += dt;
            return;
        }
        this.bobTimer += dt * 3;
        this.y = this.baseY + Math.sin(this.bobTimer) * 4;
    }

    checkCollect(player) {
        if (this.collected) return false;
        if (aabb(this.getBounds(), player.getBounds())) {
            this.collected = true;
            this.collectAnim = 0;
            return true;
        }
        return false;
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    render(ctx, camera) {
        if (this.collected) {
            // Float-up-and-fade animation
            if (this.collectAnim < 0.5) {
                const sx = this.x - camera.x;
                const sy = this.y - camera.y - this.collectAnim * 60;
                ctx.save();
                ctx.globalAlpha = 1 - this.collectAnim * 2;
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('+1', sx + this.width / 2, sy);
                ctx.restore();
            }
            return;
        }
        const sx = this.x - camera.x;
        const sy = this.y - camera.y;
        drawCollectable(ctx, sx, sy, this.width, this.height, this.label, this.color, this.bobTimer);
    }
}
