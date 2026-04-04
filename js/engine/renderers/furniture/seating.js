// Seating furniture: sofa, armchair, cushion, chair, stool
import { roundRect, lighten, darken } from '../shared.js';
import { getTheme, drawWoodGrain, drawFabricTexture, drawFurnitureShadow, drawLegs } from '../level-themes.js';

export function drawSofa(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const sofaColor = color || theme.upholstery.sofa;
    const legH = floorY - (y + h);
    const seatTop = y;

    // Shadow on floor
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 5, 5);

    // Legs
    drawLegs(ctx, x, w, y + h, floorY, w > 150 ? 3 : 2);

    // Back rest
    ctx.fillStyle = darken(sofaColor, 15);
    roundRect(ctx, x + 6, seatTop - 28, w - 12, 30, 6);

    // Seat body
    drawFabricTexture(ctx, x, seatTop, w, h, sofaColor);
    roundRect(ctx, x, seatTop, w, h, 5);

    // Cushion divisions
    const cushions = Math.max(2, Math.floor(w / 65));
    const cw = (w - 10) / cushions;
    for (let i = 0; i < cushions; i++) {
        ctx.fillStyle = i % 2 === 0 ? lighten(sofaColor, 15) : darken(sofaColor, 5);
        roundRect(ctx, x + 5 + i * cw, seatTop + 3, cw - 2, h - 6, 4);
    }

    // Armrests
    ctx.fillStyle = darken(sofaColor, 25);
    const armH = h + 12;
    roundRect(ctx, x - 8, seatTop - 10, 14, armH, 5);
    roundRect(ctx, x + w - 6, seatTop - 10, 14, armH, 5);

    // Highlight on seat
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(x + 10, seatTop + 2, w - 20, 2);
}

export function drawArmchair(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const chairColor = color || theme.upholstery.armchair;
    const legH = floorY - (y + h);

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 3, 4);

    drawLegs(ctx, x, w, y + h, floorY, 2);

    ctx.fillStyle = darken(chairColor, 15);
    roundRect(ctx, x + 14, y - 30, w - 28, 34, 6);
    drawFabricTexture(ctx, x, y, w, h, chairColor);
    roundRect(ctx, x, y, w, h, 5);
    ctx.fillStyle = lighten(chairColor, 14);
    roundRect(ctx, x + 12, y + 3, w - 24, h - 6, 5);
    ctx.fillStyle = darken(chairColor, 25);
    const armH = h + 15;
    roundRect(ctx, x - 6, y - 14, 18, armH, 6);
    roundRect(ctx, x + w - 12, y - 14, 18, armH, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(x + 16, y + 2, w - 32, 2);
}

export function drawCushionPlatform(ctx, x, y, w, h, color) {
    const theme = getTheme();
    const cushionColor = color || theme.upholstery.cushion;
    drawFabricTexture(ctx, x, y, w, h, cushionColor);
    roundRect(ctx, x, y, w, h, 8);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(x + 5, y + 3, w - 10, h - 6);
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    roundRect(ctx, x + 4, y + 2, w - 8, h * 0.4, 4);
}

export function drawChair(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const chairColor = color || theme.wood.base;
    const legH = floorY - (y + h);

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 3);

    ctx.fillStyle = theme.wood.dark;
    const backTopY = y - 28;
    ctx.fillRect(x + 4, backTopY, 4, (y + h) - backTopY + legH);
    ctx.fillRect(x + w - 8, backTopY, 4, (y + h) - backTopY + legH);

    ctx.fillRect(x + 1, y + h, 4, legH);
    ctx.fillRect(x + w - 5, y + h, 4, legH);

    ctx.fillStyle = darken(chairColor, 10);
    roundRect(ctx, x + 2, backTopY, w - 4, 8, 3);
    ctx.fillStyle = darken(chairColor, 18);
    const slats = Math.max(2, Math.floor(w / 20));
    for (let i = 1; i < slats; i++) {
        const sx = x + (w / slats) * i - 1.5;
        ctx.fillRect(sx, backTopY + 8, 3, y - backTopY - 8);
    }

    // Seat with wood grain
    drawWoodGrain(ctx, x - 3, y, w + 6, h);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(x - 1, y, w + 2, 2);
}

export function drawStool(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const stoolColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(x + 4, y + h, 3, legH); ctx.fillRect(x + w - 7, y + h, 3, legH);
    if (legH > 15) ctx.fillRect(x + 7, y + h + legH * 0.6, w - 14, 3);
    ctx.fillStyle = stoolColor; roundRect(ctx, x - 2, y, w + 4, h, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(x, y, w, 2);
}
