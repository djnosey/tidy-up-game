// Obstacle/hazard drawing
import { roundRect, drawEmojiScaled } from './shared.js';
import { getTheme } from './level-themes.js';

const OBSTACLE_EMOJI = {
    'PLUG': '🔌', 'CANDLE': '🕯️', 'OVEN': '🔥', 'KNIFE': '🔪',
    'BOILING_POT': '♨️', 'WET_FLOOR': '💧', 'HOT_TAP': '🚿',
    'RAZOR': '🪒', 'HAIR_DRYER': '💨', 'LEGO': '🧱', 'IRON': '♨️',
    'CACTUS': '🌵', 'BBQ_GRILL': '🔥',
};

export function drawObstacle(ctx, x, y, w, h, label, color, animTimer) {
    ctx.save();
    const cx = x + w / 2;
    const cy = y + h / 2;
    const pulse = Math.sin(animTimer * 5) * 0.15;
    const theme = getTheme();

    if (label === 'PLUG') {
        // Socket plate — themed ceramic color
        ctx.fillStyle = theme.ceramic.base;
        roundRect(ctx, x - 2, y - 2, w + 4, h + 4, 4);
        // Plug emoji
        drawEmojiScaled(ctx, '🔌', cx, cy, Math.min(w, h) * 0.7);
        // Spark effect — more frequent and varied, themed accent tint
        const sparkPhase = Math.sin(animTimer * 8);
        if (sparkPhase > 0.3) {
            const sparkCount = sparkPhase > 0.7 ? 3 : 1;
            for (let s = 0; s < sparkCount; s++) {
                ctx.fillStyle = s % 2 === 0 ? theme.accent1 : '#00BFFF';
                ctx.font = `${8 + Math.random() * 8}px sans-serif`;
                ctx.textAlign = 'center';
                const sparkX = cx + (Math.random() - 0.5) * 24;
                const sparkY = cy - 10 + (Math.random() - 0.5) * 16;
                ctx.fillText('⚡', sparkX, sparkY);
            }
        }
    } else if (label === 'CANDLE') {
        // Candle emoji
        drawEmojiScaled(ctx, '🕯️', cx, cy, Math.min(w, h) * 0.9);
        // Extra animated flame glow
        const flicker = Math.sin(animTimer * 12) * 2;
        ctx.fillStyle = `rgba(255, 100, 0, ${0.2 + pulse})`;
        ctx.beginPath();
        ctx.arc(cx + flicker, y - 4, 8, 0, Math.PI * 2);
        ctx.fill();
    } else if (label === 'CABLE') {
        // Trailing cable drawn as wavy line — themed metal dark
        ctx.strokeStyle = theme.metal.dark;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, cy);
        for (let i = 0; i <= w; i += 3) {
            ctx.lineTo(x + i, cy + Math.sin(i * 0.3 + animTimer) * 4);
        }
        ctx.stroke();
        // Plug at end
        ctx.fillStyle = '#555';
        roundRect(ctx, x + w - 6, cy - 4, 8, 8, 2);
    } else if (label === 'CORNER') {
        // Corner — themed wood dark
        ctx.fillStyle = theme.wood.dark;
        ctx.beginPath(); ctx.moveTo(x, y+h); ctx.lineTo(cx, y); ctx.lineTo(x+w, y+h); ctx.fill();
        ctx.fillStyle = `rgba(255,0,0,${0.3+pulse})`;
        ctx.beginPath(); ctx.moveTo(x, y+h); ctx.lineTo(cx, y); ctx.lineTo(x+w, y+h); ctx.fill();
    } else if (label === 'BLIND_CORD') {
        // Cord — themed metal base
        ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(cx, y); ctx.lineTo(cx, y+h); ctx.stroke();
        ctx.fillStyle = theme.metal.light; ctx.beginPath(); ctx.arc(cx, y+h, 4, 0, Math.PI*2); ctx.fill();
    } else if (label === 'HAIR_STRAIGHTENER') {
        drawEmojiScaled(ctx, '♨️', cx, cy, Math.min(w,h)*0.8);
        if (Math.sin(animTimer*6) > 0.3) { ctx.fillStyle = 'rgba(255,100,0,0.15)'; ctx.beginPath(); ctx.ellipse(cx, cy-8, 12, 6, 0, 0, Math.PI*2); ctx.fill(); }
    } else if (label === 'HOT_SUN') {
        ctx.fillStyle = `rgba(255,200,0,${0.1+pulse*0.5})`; ctx.beginPath(); ctx.ellipse(cx, cy, w, h, 0, 0, Math.PI*2); ctx.fill();
        drawEmojiScaled(ctx, '☀️', cx, cy-h/2, 20);
    } else if (OBSTACLE_EMOJI[label]) {
        // Generic emoji obstacle with danger pulse — themed accent tint
        const emoji = OBSTACLE_EMOJI[label];
        drawEmojiScaled(ctx, emoji, cx, cy, Math.min(w,h)*0.8);
        ctx.fillStyle = `rgba(255,0,0,${0.1+pulse})`; ctx.beginPath(); ctx.arc(cx, cy, Math.max(w,h)/2+3, 0, Math.PI*2); ctx.fill();
    } else {
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.7 + pulse;
        roundRect(ctx, x, y, w, h, 2);
    }

    // Warning icon — themed accent color
    ctx.globalAlpha = 0.5 + pulse;
    ctx.fillStyle = theme.accent1;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚠️', cx, y - 6);

    ctx.restore();
}
