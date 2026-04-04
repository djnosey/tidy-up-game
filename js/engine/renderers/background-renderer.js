// Background drawing — wall and floor
import { darken } from './shared.js';

export function drawBackground(ctx, w, h, cameraX, levelColor) {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.3);
    skyGrad.addColorStop(0, '#E8D8C8');
    skyGrad.addColorStop(1, levelColor);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Wall texture
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    const offsetX = -(cameraX * 0.1) % 40;
    for (let row = 0; row < h; row += 20) {
        const stagger = (Math.floor(row / 20) % 2) * 20;
        for (let col = -40; col < w + 40; col += 40) {
            ctx.fillRect(col + offsetX + stagger, row, 38, 18);
        }
    }

    // Skirting board
    ctx.fillStyle = '#8B6914';
    ctx.fillRect(0, h - 82, w, 5);
    ctx.fillStyle = darken('#8B6914', 20);
    ctx.fillRect(0, h - 77, w, 2);

    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, w, 30);
}
