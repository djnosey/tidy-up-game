export class HUD {
    constructor() {
        this.heartSize = 28;
        this.padding = 16;

        // Cached gradients (created once, reused every frame)
        this._tidyGradient = null;
        this._lowHealthGrad = null;
        this._nearFullGrad = null;
        this._gradientBarW = 0; // track bar width for cache invalidation

        // Animated tidy meter state
        this._displayPercent = 0;
        this._shakeTimer = 0;
        this._shakeIntensity = 0;
        this._sparkles = [];
        this._lastTidyPercent = 0;

        // Combo burst state
        this._comboBurst = 0;
        this._lastComboCount = 0;
    }

    update(dt, tidyPercent, comboCount) {
        // Smooth lerp toward target percent
        const diff = tidyPercent - this._displayPercent;
        if (Math.abs(diff) > 0.1) {
            this._displayPercent += diff * Math.min(1, 6 * dt);
        } else {
            this._displayPercent = tidyPercent;
        }

        // Shake on increase
        if (tidyPercent > this._lastTidyPercent + 0.5) {
            const increase = tidyPercent - this._lastTidyPercent;
            this._shakeTimer = 0.15;
            this._shakeIntensity = Math.min(increase * 0.3, 3);
            // Spawn sparkles at fill edge
            const sparkleCount = Math.min(3, Math.ceil(increase * 0.3));
            for (let i = 0; i < sparkleCount; i++) {
                this._sparkles.push({
                    x: 0, y: 0, // positioned relative to fill edge in render
                    vx: (Math.random() - 0.5) * 30,
                    vy: -Math.random() * 40 - 10,
                    life: 0.4,
                    maxLife: 0.4,
                    size: 2 + Math.random() * 2,
                });
            }
        }
        this._lastTidyPercent = tidyPercent;

        // Decay shake
        if (this._shakeTimer > 0) this._shakeTimer -= dt;

        // Update sparkles
        for (let i = this._sparkles.length - 1; i >= 0; i--) {
            const s = this._sparkles[i];
            s.x += s.vx * dt;
            s.y += s.vy * dt;
            s.vy += 80 * dt;
            s.life -= dt;
            if (s.life <= 0) this._sparkles.splice(i, 1);
        }

        // Combo burst decay
        if (comboCount > this._lastComboCount && comboCount >= 2) {
            this._comboBurst = 1.0;
        }
        this._lastComboCount = comboCount;
        if (this._comboBurst > 0) {
            this._comboBurst = Math.max(0, this._comboBurst - 5 * dt);
        }
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
        let barX = (canvasWidth - barW) / 2;
        let barY = this.padding + 8;

        // Apply shake offset
        if (this._shakeTimer > 0) {
            const decay = this._shakeTimer / 0.15;
            barX += (Math.random() - 0.5) * 2 * this._shakeIntensity * decay;
            barY += (Math.random() - 0.5) * 2 * this._shakeIntensity * decay;
        }

        // Label
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('TIDY', barX + barW / 2, barY - 2);

        // Near-full glow (pulsing behind bar when >= 90%)
        if (tidyPercent >= 90) {
            const glowAlpha = 0.15 + Math.sin(Date.now() * 0.004) * 0.1;
            ctx.save();
            ctx.globalAlpha = glowAlpha;
            ctx.fillStyle = '#00CC00';
            ctx.fillRect(barX - 4, barY - 2, barW + 8, barH + 8);
            ctx.restore();
        }

        // Background
        ctx.fillStyle = '#333';
        ctx.fillRect(barX, barY + 2, barW, barH);

        // Fill (using animated _displayPercent)
        const fillW = barW * (this._displayPercent / 100);
        // Cache the gradient (only recreate if bar width changes)
        if (!this._tidyGradient || this._gradientBarW !== barW) {
            this._gradientBarW = barW;
            this._tidyGradient = ctx.createLinearGradient(0, 0, barW, 0);
            this._tidyGradient.addColorStop(0, '#FF6600');
            this._tidyGradient.addColorStop(0.5, '#FFCC00');
            this._tidyGradient.addColorStop(1, '#00CC00');
        }
        ctx.save();
        ctx.translate(barX, barY + 2);
        ctx.fillStyle = this._tidyGradient;
        ctx.fillRect(0, 0, fillW, barH);
        ctx.restore();

        // Sparkles at fill edge
        if (this._sparkles.length > 0) {
            const edgeX = barX + fillW;
            const edgeY = barY + 2 + barH / 2;
            ctx.fillStyle = '#FFFFCC';
            for (const s of this._sparkles) {
                const alpha = s.life / s.maxLife;
                ctx.globalAlpha = alpha;
                ctx.beginPath();
                ctx.arc(edgeX + s.x, edgeY + s.y, s.size * alpha, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
        }

        // Border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(barX, barY + 2, barW, barH);

        // Percentage text
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`${Math.floor(tidyPercent)}%`, barX + barW / 2, barY + barH - 3);

        // === Top Right: Collectable count ===
        ctx.textAlign = 'right';
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#FFD700';
        ctx.fillText(`${collected} / ${total}`, canvasWidth - this.padding, this.padding + 26);
        ctx.font = '10px monospace';
        ctx.fillStyle = '#ccc';
        ctx.fillText('ITEMS', canvasWidth - this.padding, this.padding + 12);

        // Collect combo indicator with burst animation
        if (comboCount >= 2) {
            ctx.textAlign = 'right';
            ctx.font = `bold ${14 + Math.min(comboCount, 6)}px monospace`;
            const pulse = 1 + Math.sin(Date.now() / 100) * 0.1;
            const burst = 1 + this._comboBurst * 0.4;
            ctx.save();
            const comboX = canvasWidth - this.padding;
            const comboY = this.padding + 44;
            ctx.translate(comboX, comboY);
            ctx.scale(pulse * burst, pulse * burst);
            ctx.translate(-comboX, -comboY);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 3;
            ctx.strokeText(`x${comboCount}`, comboX, comboY);
            ctx.fillStyle = comboCount >= 5 ? '#FF4444' : '#FFD700';
            ctx.fillText(`x${comboCount}`, comboX, comboY);
            ctx.restore();
        }

        // Low-health red vignette warning (cached gradient)
        if (lowHealth) {
            const pulse = 0.08 + Math.sin(Date.now() / 300) * 0.06;
            if (!this._lowHealthGrad) {
                this._lowHealthGrad = ctx.createRadialGradient(
                    canvasWidth / 2, 300, canvasWidth * 0.3,
                    canvasWidth / 2, 300, canvasWidth * 0.7
                );
                this._lowHealthGrad.addColorStop(0, 'rgba(255, 0, 0, 0)');
                this._lowHealthGrad.addColorStop(1, 'rgba(255, 0, 0, 1)');
            }
            ctx.globalAlpha = pulse;
            ctx.fillStyle = this._lowHealthGrad;
            ctx.fillRect(0, 0, canvasWidth, 600);
            ctx.globalAlpha = 1;
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
