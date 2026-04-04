// Projectile drawing
import { roundRect, drawEmojiScaled } from './shared.js';

export function drawProjectile(ctx, x, y, w, h, character) {
    ctx.save();
    const cx = x + w / 2;
    const cy = y + h / 2;
    ctx.fillStyle = character.projectileColor;

    if (character.projectileLabel === 'SLIPPER') {
        drawEmojiScaled(ctx, '🩴', cx, cy, h * 1.2);
    } else if (character.projectileLabel === 'SPOON') {
        drawEmojiScaled(ctx, '🥄', cx, cy, h * 1.2);
    } else if (character.projectileLabel === 'NERF') {
        // Nerf dart drawn
        ctx.fillStyle = '#FF6600';
        roundRect(ctx, x, y + 1, w, h - 2, 3);
        ctx.fillStyle = '#FF8844';
        ctx.beginPath();
        ctx.arc(x + w - 3, cy, h / 2 - 1, 0, Math.PI * 2);
        ctx.fill();
    } else if (character.projectileLabel === 'CRAYON') {
        drawEmojiScaled(ctx, '🖍️', cx, cy, h * 1.2);
    }

    ctx.restore();
}
