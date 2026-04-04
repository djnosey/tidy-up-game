// Table furniture: table, TV unit, counter, desk (uses drawTable)
import { roundRect, lighten, darken } from '../shared.js';
import { getTheme, drawWoodGrain, drawMetalSurface, drawCeramicSurface, drawFurnitureShadow } from '../level-themes.js';

export function drawTable(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const tableColor = color || theme.wood.base;
    const legH = floorY - (y + h);

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);

    ctx.fillStyle = theme.wood.dark;
    if (legH > 2) {
        ctx.fillRect(x + 6, y + h, 4, legH);
        ctx.fillRect(x + w - 10, y + h, 4, legH);
        const barY = y + h + legH * 0.6;
        ctx.fillRect(x + 10, barY, w - 20, 3);
    }

    // Table top with wood grain
    drawWoodGrain(ctx, x - 5, y, w + 10, h);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(x - 3, y, w + 6, 2);
}

export function drawTVUnit(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    const cabinetH = 35;

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);

    ctx.fillStyle = theme.wood.dark;
    if (legH > 2) {
        ctx.fillRect(x + 8, y + h, 5, legH);
        ctx.fillRect(x + w - 13, y + h, 5, legH);
    }

    ctx.fillStyle = '#2F2F2F';
    const cabTop = y;
    roundRect(ctx, x, cabTop, w, Math.min(cabinetH, legH + h), 3);

    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    if (cabinetH > 15) {
        ctx.beginPath();
        ctx.moveTo(x + 5, cabTop + 15);
        ctx.lineTo(x + w - 5, cabTop + 15);
        ctx.stroke();
    }
    drawMetalSurface(ctx, x + w / 2 - 10, cabTop + 6, 20, 3);
    if (cabinetH > 20) drawMetalSurface(ctx, x + w / 2 - 10, cabTop + 22, 20, 3);

    ctx.font = `${Math.min(w * 0.35, 55)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('📺', x + w / 2, y - 3);

    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(x + 2, y, w - 4, 2);
}

export function drawCounter(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const counterColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    ctx.fillStyle = darken(counterColor, 10);
    if (legH > 0) roundRect(ctx, x + 2, y + h, w - 4, Math.min(legH, 40), 2);
    // Countertop surface — ceramic/stone
    drawCeramicSurface(ctx, x - 4, y, w + 8, h);
    ctx.strokeStyle = theme.floor.grout;
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 20) { ctx.beginPath(); ctx.moveTo(x+2+i, y+h); ctx.lineTo(x+2+i, y+h+40); ctx.stroke(); }
}
