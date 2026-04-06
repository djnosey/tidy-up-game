// Shared canvas utility functions used by all renderers

export function drawEmoji(ctx, emoji, x, y, w, h) {
    // Render emoji at the size of the object
    const fontSize = Math.min(w, h) * 0.85;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, x + w / 2, y + h / 2 + 1);
}

export function drawEmojiScaled(ctx, emoji, cx, cy, size) {
    ctx.font = `${size}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, cx, cy + 1);
}

export function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
}

export function lighten(hex, amount) {
    const rgb = hexToRgb(hex);
    return `rgb(${Math.min(255, rgb.r + amount)}, ${Math.min(255, rgb.g + amount)}, ${Math.min(255, rgb.b + amount)})`;
}

export function darken(hex, amount) {
    const rgb = hexToRgb(hex);
    return `rgb(${Math.max(0, rgb.r - amount)}, ${Math.max(0, rgb.g - amount)}, ${Math.max(0, rgb.b - amount)})`;
}

// --- Drop shadow utilities ---

// Gradient-based soft shadow — use in cached/offscreen contexts (furniture, character sprites)
export function drawDropShadow(ctx, cx, floorY, radiusX, radiusY = 4, alpha = 0.18) {
    const grad = ctx.createRadialGradient(cx, floorY, 0, cx, floorY, radiusX);
    grad.addColorStop(0, `rgba(0,0,0,${alpha})`);
    grad.addColorStop(0.6, `rgba(0,0,0,${alpha * 0.5})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(cx, floorY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Pre-baked shadow bitmap — use drawDropShadowFast() in per-frame contexts (enemies, boss, etc.)
let _shadowBitmap = null;
function getShadowBitmap() {
    if (!_shadowBitmap) {
        _shadowBitmap = document.createElement('canvas');
        _shadowBitmap.width = 64;
        _shadowBitmap.height = 16;
        const sctx = _shadowBitmap.getContext('2d');
        const grad = sctx.createRadialGradient(32, 8, 0, 32, 8, 32);
        grad.addColorStop(0, 'rgba(0,0,0,0.22)');
        grad.addColorStop(0.6, 'rgba(0,0,0,0.10)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        sctx.fillStyle = grad;
        sctx.beginPath();
        sctx.ellipse(32, 8, 32, 8, 0, 0, Math.PI * 2);
        sctx.fill();
    }
    return _shadowBitmap;
}

// Bitmap-blit shadow — zero gradient creation per frame
export function drawDropShadowFast(ctx, cx, floorY, radiusX, radiusY = 4) {
    const bmp = getShadowBitmap();
    ctx.drawImage(bmp, cx - radiusX, floorY - radiusY, radiusX * 2, radiusY * 2);
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    } : { r: 128, g: 128, b: 128 };
}
