export class ScoreScreen {
    constructor() {
        this.visible = false;
        this.levelName = '';
        this.collected = 0;
        this.total = 0;
        this.stars = 0;
        this.tidyPercent = 0;
        this.animTimer = 0;
        this.saveCode = null;
    }

    show(levelName, collected, total) {
        this.visible = true;
        this.levelName = levelName;
        this.collected = collected;
        this.total = total;
        this.tidyPercent = total > 0 ? (collected / total) * 100 : 0;

        if (this.tidyPercent >= 90) this.stars = 3;
        else if (this.tidyPercent >= 50) this.stars = 2;
        else this.stars = 1;

        this.animTimer = 0;
    }

    hide() {
        this.visible = false;
    }

    handleInput(input) {
        if (!this.visible) return false;
        if (this.animTimer > 1 && (input.wasPressed('Enter') || input.wasPressed(' '))) {
            return true; // continue
        }
        return false;
    }

    update(dt) {
        if (this.visible) this.animTimer += dt;
    }

    render(ctx, w, h) {
        if (!this.visible) return;

        // Dim overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.textAlign = 'center';

        // "ROOM TIDIED!" header
        ctx.font = 'bold 40px sans-serif';
        ctx.fillStyle = '#00CC00';
        ctx.fillText('ROOM TIDIED!', w / 2, h * 0.2);

        // Level name
        ctx.font = '20px monospace';
        ctx.fillStyle = '#ccc';
        ctx.fillText(this.levelName, w / 2, h * 0.28);

        // Stars (animate in)
        const starSize = 50;
        const starGap = 20;
        const totalStarW = 3 * starSize + 2 * starGap;
        const starStartX = (w - totalStarW) / 2;

        for (let i = 0; i < 3; i++) {
            const delay = 0.3 + i * 0.3;
            const visible = this.animTimer > delay;
            const earned = i < this.stars;

            if (visible) {
                const sx = starStartX + i * (starSize + starGap) + starSize / 2;
                const sy = h * 0.42;
                this.drawStar(ctx, sx, sy, starSize / 2, earned ? '#FFD700' : '#444');
            }
        }

        // Stats
        if (this.animTimer > 1.2) {
            ctx.font = '18px monospace';
            ctx.fillStyle = '#fff';
            ctx.fillText(`Items collected: ${this.collected} / ${this.total}`, w / 2, h * 0.6);
            ctx.fillStyle = '#FFD700';
            ctx.fillText(`Tidiness: ${Math.floor(this.tidyPercent)}%`, w / 2, h * 0.67);
        }

        // Save code
        if (this.animTimer > 1.5 && this.saveCode) {
            ctx.font = '10px monospace';
            ctx.fillStyle = '#666';
            ctx.fillText(`Score saved! Code: ${this.saveCode}`, w / 2, h * 0.75);
        }

        // Continue prompt
        if (this.animTimer > 1.5) {
            const blink = Math.sin(Date.now() / 400) > 0;
            if (blink) {
                ctx.font = '14px monospace';
                ctx.fillStyle = '#aaa';
                ctx.fillText('Press ENTER to continue', w / 2, h * 0.85);
            }
        }

        ctx.restore();
    }

    drawStar(ctx, cx, cy, r, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = cx + r * Math.cos(angle);
            const y = cy + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}
