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
        this._lightGlowCanvas = null; // offscreen canvas for light glows
        this._lightGlowCtx = null;
        this._lightGlowLastCamX = -Infinity;
        this._lightGlowLastTime = 0; // time-based invalidation for animation
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
        const now = Date.now();
        const nowSec = now * 0.001;
        // Re-render offscreen glow canvas when camera moves >2px or every ~80ms for animation
        const camDelta = Math.abs(cameraX - this._lightGlowLastCamX);
        const timeDelta = now - this._lightGlowLastTime;
        if (!this._lightGlowCanvas || camDelta > 2 || timeDelta > 80) {
            if (!this._lightGlowCanvas) {
                try {
                    this._lightGlowCanvas = document.createElement('canvas');
                    this._lightGlowCanvas.width = canvasW;
                    this._lightGlowCanvas.height = canvasH;
                    this._lightGlowCtx = this._lightGlowCanvas.getContext('2d');
                } catch (_) {
                    this._lightGlowCtx = null;
                }
                if (!this._lightGlowCtx) {
                    this._lightGlowCanvas = null;
                    this._lightGlowFailed = true;
                }
            }
            if (this._lightGlowFailed) {
                // Fallback: draw light glows directly to main canvas
                ctx.save();
                ctx.globalCompositeOperation = 'screen';
                for (const dec of decorations) {
                    if (!LIGHT_TYPES.has(dec.type)) continue;
                    const sx = dec.x - cameraX;
                    const sy = (dec.y || 0) - cameraY;
                    if (sx < -150 || sx > canvasW + 150) continue;
                    const isCeiling = dec.type === 'ceiling_light';
                    const baseRadius = isCeiling ? 120 : 80;
                    const pulse = isCeiling ? 1 + Math.sin(nowSec * 1.5 + dec.x * 0.01) * 0.08 : 1;
                    const flicker = !isCeiling ? 0.9 + Math.sin(nowSec * 4 + dec.x * 0.02) * 0.1 : 1;
                    const radius = baseRadius * pulse;
                    const centerAlpha = 0.18 * flicker;
                    const midAlpha = 0.08 * flicker;
                    const glow = ctx.createRadialGradient(sx, sy + 10, 0, sx, sy + 10, radius);
                    glow.addColorStop(0, `rgba(255, 240, 200, ${centerAlpha.toFixed(3)})`);
                    glow.addColorStop(0.5, `rgba(255, 220, 160, ${midAlpha.toFixed(3)})`);
                    glow.addColorStop(1, 'rgba(255, 220, 160, 0)');
                    ctx.fillStyle = glow;
                    ctx.fillRect(sx - radius, sy + 10 - radius, radius * 2, radius * 2);
                }
                ctx.restore();
                this._lightGlowLastCamX = cameraX;
                this._lightGlowLastTime = now;
                return;
            }
            const offCtx = this._lightGlowCtx;
            offCtx.clearRect(0, 0, canvasW, canvasH);
            offCtx.globalCompositeOperation = 'screen';
            for (const dec of decorations) {
                if (!LIGHT_TYPES.has(dec.type)) continue;
                const sx = dec.x - cameraX;
                const sy = (dec.y || 0) - cameraY;
                if (sx < -150 || sx > canvasW + 150) continue;

                const isCeiling = dec.type === 'ceiling_light';
                const baseRadius = isCeiling ? 120 : 80;

                // Subtle pulse for ceiling lights, flicker for lamps
                const pulse = isCeiling
                    ? 1 + Math.sin(nowSec * 1.5 + dec.x * 0.01) * 0.08
                    : 1;
                const flicker = !isCeiling
                    ? 0.9 + Math.sin(nowSec * 4 + dec.x * 0.02) * 0.1
                    : 1;

                const radius = baseRadius * pulse;
                const centerAlpha = 0.18 * flicker;
                const midAlpha = 0.08 * flicker;

                const glow = offCtx.createRadialGradient(sx, sy + 10, 0, sx, sy + 10, radius);
                glow.addColorStop(0, `rgba(255, 240, 200, ${centerAlpha.toFixed(3)})`);
                glow.addColorStop(0.5, `rgba(255, 220, 160, ${midAlpha.toFixed(3)})`);
                glow.addColorStop(1, 'rgba(255, 220, 160, 0)');
                offCtx.fillStyle = glow;
                offCtx.fillRect(sx - radius, sy + 10 - radius, radius * 2, radius * 2);
            }
            this._lightGlowLastCamX = cameraX;
            this._lightGlowLastTime = now;
        }
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(this._lightGlowCanvas, 0, 0);
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
