// Collectable item drawing
import { lighten, drawDropShadowFast } from './shared.js';
import { getTheme } from './level-themes.js';

const COLLECTABLE_EMOJI = {
    // Living Room
    'REMOTE': '📱', 'CUSHION': '🟫', 'MAGAZINE': '📰', 'BOOK': '📕',
    'GLASS': '🥃', 'BLANKET': '🧣', 'COASTER': '🟤', '+HEALTH': '🍪', '+LIFE': '❤️',
    'MUG': '☕', 'KEYS': '🔑', 'GLASSES': '👓', 'PHONE': '📱',
    'SOCKS': '🧦', 'HEADPHONES': '🎧',
    // Kitchen
    'PLATE': '🍽️', 'CUP': '☕', 'UTENSIL': '🍴', 'POT': '🫕',
    'PAN': '🍳', 'SPONGE': '🧽', 'TEA_TOWEL': '🧻', 'SPICE': '🧂',
    // Bathroom
    'TOWEL': '🧖', 'SHAMPOO': '🧴', 'TOOTHBRUSH': '🪥', 'SOAP': '🧼',
    'DUCK': '🦆', 'BATH_TOY': '🛁',
    // Kids' Room
    'TEDDY': '🧸', 'PENCIL': '✏️', 'TOY_CAR': '🚗', 'BLOCK': '🧱',
    'CRAYON': '🖍️', 'STICKER': '⭐', 'ACTION_FIG': '🦸', 'PUZZLE': '🧩',
    // Parents' Room
    'CLOTHES': '👔', 'PILLOW': '🛏️', 'CHARGER': '🔋', 'SLIPPER': '🩴', 'LAUNDRY': '🧺',
    // Terrace
    'WATERING_CAN': '🚿', 'FOOTBALL': '⚽', 'ROPE': '🪢',
    'GARDEN_TOOL': '🔧', 'SHOE': '👟',
};

export function drawCollectable(ctx, x, y, w, h, label, color, bobTimer) {
    ctx.save();
    const cx = x + w / 2;
    const cy = y + h / 2;
    const r = w / 2 + 4; // slightly larger than hitbox
    const theme = getTheme();

    // Drop shadow behind the circle (bitmap blit)
    drawDropShadowFast(ctx, cx + 2, cy + 3, r + 1, r * 0.4);

    // Outer glow ring using theme accent
    ctx.strokeStyle = theme.accent1;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.35 + Math.sin(bobTimer * 3) * 0.15;
    ctx.beginPath();
    ctx.arc(cx, cy, r + 3, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Solid colored circle background — always visible
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    // White inner circle
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx, cy, r - 3, 0, Math.PI * 2);
    ctx.fill();

    // Inner colored fill
    ctx.fillStyle = lighten(color, 40);
    ctx.beginPath();
    ctx.arc(cx, cy, r - 4, 0, Math.PI * 2);
    ctx.fill();

    // Icon — emoji or text label, rendered BIG
    const emoji = COLLECTABLE_EMOJI[label];
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (emoji) {
        ctx.font = `${r * 1.3}px sans-serif`;
        ctx.fillText(emoji, cx, cy + 1);
    } else {
        ctx.fillStyle = '#333';
        ctx.font = `bold ${Math.min(11, r * 0.7)}px monospace`;
        ctx.fillText(label, cx, cy);
    }

    // Sparkle — more visible, using theme accent color
    const sparklePhase = Math.sin(bobTimer * 4);
    if (sparklePhase > 0.4) {
        ctx.fillStyle = theme.accent1;
        ctx.globalAlpha = 0.6 + sparklePhase * 0.4;
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('✦', cx + r + 2, cy - r);
        if (sparklePhase > 0.7) {
            ctx.font = '9px sans-serif';
            ctx.fillText('✦', cx - r - 3, cy - r + 6);
        }
        ctx.globalAlpha = 1;
    }

    ctx.restore();
}
