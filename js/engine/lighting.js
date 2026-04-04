// Lighting and atmosphere — vignette, per-level mood tint, light source glows

const LEVEL_TINTS = {
    'Living Room':   { color: [255, 200, 150], alpha: 0.06 },
    'Kitchen':       { color: [255, 240, 200], alpha: 0.05 },
    'Bathroom':      { color: [150, 200, 220], alpha: 0.08 },
    "Kids' Room":    { color: [255, 230, 180], alpha: 0.04 },
    "Parents' Room": { color: [200, 180, 150], alpha: 0.07 },
    'Terrace':       { color: [255, 250, 220], alpha: 0.05 },
};

const BOSS_TINT = { color: [200, 50, 30], alpha: 0.06 };

// Decoration types that emit light
const LIGHT_TYPES = new Set(['ceiling_light', 'standing_lamp']);

export class LightingRenderer {
    constructor() {
        this._vignetteGrad = null;
        this._bossVignetteGrad = null;
        this._cachedW = 0;
        this._cachedH = 0;
    }

    render(ctx, canvasW, canvasH, levelName, decorations, cameraX, cameraY, isBoss) {
        // 1. Light source glows (drawn in screen composite mode)
        this._drawLightSources(ctx, canvasW, canvasH, decorations, cameraX, cameraY);

        // 2. Vignette
        this._drawVignette(ctx, canvasW, canvasH, isBoss);

        // 3. Per-level mood tint
        this._drawTint(ctx, canvasW, canvasH, levelName, isBoss);
    }

    _drawLightSources(ctx, canvasW, canvasH, decorations, cameraX, cameraY) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        for (const dec of decorations) {
            if (!LIGHT_TYPES.has(dec.type)) continue;
            const sx = dec.x - cameraX;
            const sy = (dec.y || 0) - cameraY;
            if (sx < -150 || sx > canvasW + 150) continue;

            const radius = dec.type === 'ceiling_light' ? 120 : 80;
            const glow = ctx.createRadialGradient(sx, sy + 10, 0, sx, sy + 10, radius);
            glow.addColorStop(0, 'rgba(255, 240, 200, 0.08)');
            glow.addColorStop(0.5, 'rgba(255, 220, 160, 0.03)');
            glow.addColorStop(1, 'rgba(255, 220, 160, 0)');
            ctx.fillStyle = glow;
            ctx.fillRect(sx - radius, sy + 10 - radius, radius * 2, radius * 2);
        }
        ctx.restore();
    }

    _drawVignette(ctx, w, h, isBoss) {
        // Cache the gradient dimensions
        if (this._cachedW !== w || this._cachedH !== h) {
            this._cachedW = w;
            this._cachedH = h;
            this._vignetteGrad = null;
            this._bossVignetteGrad = null;
        }

        ctx.save();
        ctx.globalCompositeOperation = 'multiply';

        const cx = w / 2;
        const cy = h / 2;
        const outerR = Math.sqrt(cx * cx + cy * cy);

        if (isBoss) {
            if (!this._bossVignetteGrad) {
                this._bossVignetteGrad = ctx.createRadialGradient(cx, cy, outerR * 0.35, cx, cy, outerR);
                this._bossVignetteGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
                this._bossVignetteGrad.addColorStop(1, 'rgba(140, 120, 120, 1)');
            }
            ctx.fillStyle = this._bossVignetteGrad;
        } else {
            if (!this._vignetteGrad) {
                this._vignetteGrad = ctx.createRadialGradient(cx, cy, outerR * 0.4, cx, cy, outerR);
                this._vignetteGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
                this._vignetteGrad.addColorStop(1, 'rgba(180, 175, 170, 1)');
            }
            ctx.fillStyle = this._vignetteGrad;
        }

        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }

    _drawTint(ctx, w, h, levelName, isBoss) {
        const tint = isBoss ? BOSS_TINT : LEVEL_TINTS[levelName];
        if (!tint) return;

        ctx.save();
        ctx.globalCompositeOperation = 'overlay';
        ctx.fillStyle = `rgba(${tint.color[0]}, ${tint.color[1]}, ${tint.color[2]}, ${tint.alpha})`;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }
}
