import { aabb } from '../engine/physics.js';
import { drawObstacle } from '../engine/renderers/obstacle-renderer.js';

export class Obstacle {
    constructor(x, y, width, height, label, color = '#FF4444', timerOn, timerOff, timerOffset) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.label = label;
        this.color = color;
        this.animTimer = 0;
        this.active = true;
        // Timed obstacle cycling
        this.timerOn = timerOn;
        this.timerOff = timerOff;
        this.cycleTimer = timerOffset || 0;
    }

    update(dt) {
        this.animTimer += dt;
        if (this.timerOn !== undefined) {
            this.cycleTimer += dt;
            const phase = this.cycleTimer % (this.timerOn + this.timerOff);
            this.active = phase < this.timerOn;
        }
    }

    checkHit(player) {
        if (!this.active) return false;
        return aabb(this.getBounds(), player.getBounds());
    }

    getBounds() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }

    render(ctx, camera) {
        if (!this.active && this.timerOn === undefined) return;
        const sx = this.x - camera.x;
        const sy = this.y - camera.y;
        if (!this.active) {
            // Ghosted timed obstacle — show where it will reappear
            ctx.save();
            ctx.globalAlpha = 0.25;
            drawObstacle(ctx, sx, sy, this.width, this.height, this.label, this.color, this.animTimer);
            ctx.restore();
            return;
        }
        drawObstacle(ctx, sx, sy, this.width, this.height, this.label, this.color, this.animTimer);
    }
}
