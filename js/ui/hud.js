export class HUD {
    constructor() {
        this.heartSize = 28;
        this.padding = 16;
    }

    render(ctx, player, tidyPercent, collected, total, canvasWidth, comboCount) {
        ctx.save();

        // === Top Left: Character portrait + Hearts ===
        // Portrait box
        ctx.fillStyle = player.character.color;
        ctx.fillRect(this.padding, this.padding, 36, 36);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(this.padding, this.padding, 36, 36);
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(player.character.name, this.padding + 18, this.padding + 22);

        // Hearts
        const heartStartX = this.padding + 44;
        const lowHealth = player.health === 1 && player.alive;
        for (let i = 0; i < player.maxHealth; i++) {
            const hx = heartStartX + i * (this.heartSize + 4);
            const hy = this.padding + 4;
            if (i < player.health) {
                // Pulse the last heart when at 1 HP
                if (lowHealth && i === 0) {
                    const pulse = 1 + Math.sin(Date.now() / 150) * 0.15;
                    ctx.save();
                    const phx = hx + this.heartSize / 2;
                    const phy = hy + this.heartSize / 2;
                    ctx.translate(phx, phy);
                    ctx.scale(pulse, pulse);
                    ctx.translate(-phx, -phy);
                    this.drawHeart(ctx, hx, hy, this.heartSize, '#FF2222');
                    ctx.restore();
                } else {
                    this.drawHeart(ctx, hx, hy, this.heartSize, '#FF2222');
                }
            } else {
                this.drawHeart(ctx, hx, hy, this.heartSize, '#444');
            }
        }

        // === Top Centre: Tidy Meter ===
        const barW = 200;
        const barH = 20;
        const barX = (canvasWidth - barW) / 2;
        const barY = this.padding + 8;

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('TIDY', barX + barW / 2, barY - 2);

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY + 2, barW, barH);

        // Fill
        const fillW = barW * (tidyPercent / 100);
        const gradient = ctx.createLinearGradient(barX, barY, barX + barW, barY);
        gradient.addColorStop(0, '#FF6600');
        gradient.addColorStop(0.5, '#FFCC00');
        gradient.addColorStop(1, '#00CC00');
        ctx.fillStyle = gradient;
        ctx.fillRect(barX, barY + 2, fillW, barH);

        // Border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY + 2, barW, barH);

        // Percentage text
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px monospace';
        ctx.fillText(`${Math.floor(tidyPercent)}%`, barX + barW / 2, barY + barH - 3);

        // === Top Right: Collectable count ===
        ctx.textAlign = 'right';
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#FFD700';
        ctx.fillText(`${collected} / ${total}`, canvasWidth - this.padding, this.padding + 26);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#ccc';
        ctx.fillText('ITEMS', canvasWidth - this.padding, this.padding + 12);

        // Collect combo indicator
        if (comboCount >= 2) {
            ctx.textAlign = 'right';
            ctx.font = `bold ${14 + Math.min(comboCount, 6)}px monospace`;
            const pulse = 1 + Math.sin(Date.now() / 100) * 0.1;
            ctx.save();
            const comboX = canvasWidth - this.padding;
            const comboY = this.padding + 44;
            ctx.translate(comboX, comboY);
            ctx.scale(pulse, pulse);
            ctx.translate(-comboX, -comboY);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeText(`x${comboCount}`, comboX, comboY);
            ctx.fillStyle = comboCount >= 5 ? '#FF4444' : '#FFD700';
            ctx.fillText(`x${comboCount}`, comboX, comboY);
            ctx.restore();
        }

        // Low-health red vignette warning
        if (lowHealth) {
            const pulse = 0.08 + Math.sin(Date.now() / 300) * 0.06;
            const gradient = ctx.createRadialGradient(
                canvasWidth / 2, 300, canvasWidth * 0.3,
                canvasWidth / 2, 300, canvasWidth * 0.7
            );
            gradient.addColorStop(0, 'rgba(255, 0, 0, 0)');
            gradient.addColorStop(1, `rgba(255, 0, 0, ${pulse})`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvasWidth, 600);
        }

        ctx.restore();
    }

    drawHeart(ctx, x, y, size, color) {
        const s = size / 28;
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(s, s);
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(14, 26);
        ctx.bezierCurveTo(14, 26, 0, 18, 0, 9);
        ctx.bezierCurveTo(0, 3, 5, 0, 9, 0);
        ctx.bezierCurveTo(12, 0, 14, 2, 14, 5);
        ctx.bezierCurveTo(14, 2, 16, 0, 19, 0);
        ctx.bezierCurveTo(23, 0, 28, 3, 28, 9);
        ctx.bezierCurveTo(28, 18, 14, 26, 14, 26);
        ctx.fill();
        ctx.restore();
    }
}
