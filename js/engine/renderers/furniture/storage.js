// Storage furniture: shelf, bookshelf, drawer, fridge, toy chest, dresser, wardrobe, laundry basket
import { roundRect, lighten, darken } from '../shared.js';
import { getTheme, drawWoodGrain, drawMetalSurface, drawFabricTexture, drawFurnitureShadow, drawLegs } from '../level-themes.js';

export function drawShelf(ctx, x, y, w, h, color) {
    const theme = getTheme();
    // Use wood grain for shelf surface
    drawWoodGrain(ctx, x, y, w, h);
    // Brackets
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(x + 5, y + h, 4, 10);
    ctx.fillRect(x + w - 9, y + h, 4, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(x, y, w, 2);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(x, y + h - 1, w, 1);
}

export function drawBookShelf(ctx, x, y, w, h) {
    const theme = getTheme();
    // Shelf board in themed wood
    drawWoodGrain(ctx, x, y, w, h);
    const bookColors = ['#8B0000', '#006400', '#00008B', '#8B8000', '#4B0082', '#8B4513'];
    const bookW = 8;
    let bx = x + 3;
    let colorIdx = 0;
    while (bx + bookW < x + w - 3) {
        const bh = 12 + Math.sin(colorIdx * 2.3) * 4;
        ctx.fillStyle = bookColors[colorIdx % bookColors.length];
        ctx.fillRect(bx, y - bh, bookW - 1, bh);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(bx + bookW / 2 - 0.5, y - bh + 2, 1, bh - 4);
        bx += bookW;
        colorIdx++;
    }
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(x, y, w, 2);
}

export function drawDrawer(ctx, x, y, w, h, color) {
    const theme = getTheme();
    const drawerColor = color || theme.wood.base;
    ctx.fillStyle = drawerColor; roundRect(ctx, x, y, w, h + 15, 2);
    ctx.fillStyle = lighten(drawerColor, 15); ctx.fillRect(x + 2, y + 2, w - 4, h - 2);
    // Metal handle
    drawMetalSurface(ctx, x + w/2 - 8, y + h + 4, 16, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(x + 2, y, w - 4, 2);
}

export function drawFridge(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    // Fridge body — metal surface
    drawMetalSurface(ctx, x, y, w, Math.min(h + legH, 80));
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + w/2, y + 3); ctx.lineTo(x + w/2, y + 60); ctx.stroke();
    // Metal handle
    drawMetalSurface(ctx, x + w/2 + 4, y + 12, 3, 20);
    ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🧲', x + 15, y + 25); ctx.fillText('📝', x + w - 15, y + 20);
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(x + 2, y, w - 4, 2);
}

export function drawToyChest(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const chestColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 3);
    // Chest body — wood
    drawWoodGrain(ctx, x, y, w, h + Math.min(legH, 25));
    // Lid
    ctx.fillStyle = lighten(chestColor, 15);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w - 5, y - 15); ctx.lineTo(x + 5, y - 15); ctx.fill();
    ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🧸', x + 12, y - 2); ctx.fillText('🚗', x + w - 12, y - 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(x + 2, y, w - 4, 2);
}

export function drawDresser(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const dresserColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    // Legs
    drawLegs(ctx, x, w, y + h, floorY, 2);
    // Dresser body — wood grain
    drawWoodGrain(ctx, x, y, w, h + Math.min(legH-5, 35));
    ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 1;
    const drawers = 3; const dh = Math.min(legH-5, 35) + h;
    for (let i = 1; i < drawers; i++) { ctx.beginPath(); ctx.moveTo(x+3, y + (dh/drawers)*i); ctx.lineTo(x+w-3, y + (dh/drawers)*i); ctx.stroke(); }
    // Drawer handles — metal
    for (let i = 0; i < drawers; i++) drawMetalSurface(ctx, x+w/2-6, y + (dh/drawers)*i + dh/drawers/2 - 2, 12, 3);
    // Mirror
    ctx.fillStyle = '#C0D0E0'; roundRect(ctx, x + w/2 - 12, y - 20, 24, 18, 3);
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1; ctx.strokeRect(x + w/2 - 12, y - 20, 24, 18);
}

export function drawLaundryBasket(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 3);
    ctx.fillStyle = theme.fabric.base; roundRect(ctx, x, y, w, h + Math.min(legH, 30), 4);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 6) { ctx.beginPath(); ctx.moveTo(x+i, y); ctx.lineTo(x+i, y+h+20); ctx.stroke(); }
    ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('👔', x + w/2, y - 2);
}

export function drawWardrobe(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 3, 4);
    // Wardrobe body — wood
    drawWoodGrain(ctx, x, y - 40, w, h + legH + 40);
    // Center divider
    ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x + w/2, y - 37); ctx.lineTo(x + w/2, y + h + legH - 3); ctx.stroke();
    // Door handles — metal
    ctx.fillStyle = theme.metal.base;
    ctx.beginPath(); ctx.arc(x + w/2 - 8, y + 10, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w/2 + 8, y + 10, 3, 0, Math.PI*2); ctx.fill();
    // Crown molding — wood dark
    ctx.fillStyle = theme.wood.dark; ctx.fillRect(x - 3, y - 43, w + 6, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(x, y - 43, w, 2);
}
