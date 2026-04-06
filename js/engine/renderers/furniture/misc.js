// Miscellaneous furniture: picture frame, lamp, hanging pot, board games,
// bathtub, toilet, sink, towel rack, plant pot, railing, clothesline
import { roundRect, lighten, darken } from '../shared.js';
import { getTheme, drawWoodGrain, drawMetalSurface, drawCeramicSurface, drawFabricTexture, drawFurnitureShadow, drawAmbientOcclusion, drawSideShading, drawTopHighlight } from '../level-themes.js';

export function drawPictureFrame(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.fillStyle = theme.wood.light;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(x + 3, y + 3, w - 6, (h - 6) * 0.5);
    ctx.fillStyle = '#228B22';
    ctx.fillRect(x + 3, y + 3 + (h - 6) * 0.5, w - 6, (h - 6) * 0.5);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x, y, w, 2);
    ctx.fillRect(x, y, 2, h);
}

export function drawLampPlatform(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.fillStyle = '#DAA520';
    ctx.beginPath();
    ctx.moveTo(x + 5, y);
    ctx.lineTo(x + w - 5, y);
    ctx.lineTo(x + w + 5, y + h * 0.6);
    ctx.lineTo(x - 5, y + h * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 220, 100, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h * 0.7, w * 0.8, h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Metal pole
    drawMetalSurface(ctx, x + w / 2 - 2, y + h * 0.6, 4, h * 0.4);
}

export function drawHangingPot(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x + w/2, 0); ctx.lineTo(x + w/2, y); ctx.stroke();
    ctx.fillStyle = theme.metal.base; ctx.beginPath();
    ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = theme.metal.light; ctx.beginPath();
    ctx.ellipse(x + w/2, y + 2, w/2, h/4, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x + w/2, y - 4, w/3, Math.PI, 0); ctx.stroke();
}

export function drawBoardGames(ctx, x, y, w, h) {
    const colors = ['#CC3333', '#3333CC', '#33CC33', '#CCCC33'];
    const boxH = h / 3;
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i]; roundRect(ctx, x + i*2, y + i*boxH, w - i*4, boxH + 1, 2);
        ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(x + i*2 + 2, y + i*boxH, w - i*4 - 4, 2);
    }
}

export function drawBathtub(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 5, 4);
    // Ceramic feet
    ctx.fillStyle = theme.metal.base;
    if (legH > 4) { ctx.beginPath(); ctx.arc(x+8, floorY-2, 5, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(x+w-8, floorY-2, 5, 0, Math.PI*2); ctx.fill(); }
    // Tub body — ceramic
    drawCeramicSurface(ctx, x, y, w, h + Math.min(legH, 30));
    // Inner basin
    ctx.fillStyle = '#E8F4F8'; roundRect(ctx, x + 4, y + 4, w - 8, h - 2, 4);
    ctx.fillStyle = theme.ceramic.light; ctx.fillRect(x + 2, y, w - 4, 3);
    // Faucet knobs — metal
    drawMetalSurface(ctx, x + 10, y - 10, 10, 10);
    drawMetalSurface(ctx, x + 25, y - 10, 10, 10);
    drawSideShading(ctx, x, y, w, h + Math.min(floorY - (y+h), 30));
    drawAmbientOcclusion(ctx, x, floorY, w);
}

export function drawToilet(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    // Pedestal — ceramic
    if (legH > 0) drawCeramicSurface(ctx, x + 5, y + h, w - 10, Math.min(legH, 25));
    // Bowl — ceramic
    drawCeramicSurface(ctx, x, y, w, h);
    ctx.fillStyle = theme.ceramic.dark; roundRect(ctx, x + 3, y + 2, w - 6, h - 4, 6);
    // Tank — ceramic
    drawCeramicSurface(ctx, x + w*0.15, y - 18, w*0.7, 20);
    // Flush handle — metal
    drawMetalSurface(ctx, x + w*0.7, y - 14, 8, 3);
    drawAmbientOcclusion(ctx, x, floorY, w);
}

export function drawSink(ctx, x, y, w, h) {
    const theme = getTheme();
    // Basin — ceramic
    drawCeramicSurface(ctx, x, y, w, h + 10);
    ctx.fillStyle = '#E0E8F0'; roundRect(ctx, x + 4, y + 3, w - 8, h, 3);
    // Drain pipes — metal
    drawMetalSurface(ctx, x + 5, y + h + 10, 4, 8);
    drawMetalSurface(ctx, x + w - 9, y + h + 10, 4, 8);
    // Faucet knobs — metal
    ctx.fillStyle = theme.metal.base;
    ctx.beginPath(); ctx.arc(x + w/2 - 8, y - 3, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w/2 + 8, y - 3, 4, 0, Math.PI*2); ctx.fill();
}

export function drawTowelRack(ctx, x, y, w, h) {
    const theme = getTheme();
    // Rack bar — metal
    drawMetalSurface(ctx, x, y + h/2 - 2, w, 4);
    ctx.fillStyle = theme.metal.base;
    ctx.fillRect(x + 3, y, 4, h/2); ctx.fillRect(x + w - 7, y, 4, h/2);
    // Towel — fabric
    drawFabricTexture(ctx, x + 8, y + h/2 + 2, w - 16, h/2 - 2, theme.fabric.base);
}

export function drawPlantPot(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const potColor = color || (theme.plant ? theme.plant.pot : theme.ceramic.dark);
    const legH = floorY - (y + h);
    ctx.fillStyle = potColor;
    ctx.beginPath();
    ctx.moveTo(x + 4, y); ctx.lineTo(x + w - 4, y);
    ctx.lineTo(x + w + 2, y + h + Math.min(legH, 20));
    ctx.lineTo(x - 2, y + h + Math.min(legH, 20));
    ctx.fill();
    ctx.fillStyle = darken(potColor, 15); ctx.fillRect(x + 2, y, w - 4, 4);
    ctx.font = `${Math.min(w, 24)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('🌿', x + w/2, y - 1);
}

export function drawRailing(ctx, x, y, w, h) {
    const theme = getTheme();
    // Rail bar — metal
    drawMetalSurface(ctx, x, y, w, 4);
    ctx.fillStyle = theme.metal.dark;
    for (let i = 0; i < w; i += 12) { ctx.fillRect(x + i + 4, y + 4, 3, 40); }
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(x, y, w, 2);
}

export function drawClothesline(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.strokeStyle = theme.fabric.dark; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x, y + h/2);
    ctx.quadraticCurveTo(x + w/2, y + h/2 + 6, x + w, y + h/2);
    ctx.stroke();
    const items = ['👕', '🩳', '🧦', '👔'];
    const gap = w / (items.length + 1);
    ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    for (let i = 0; i < items.length; i++) {
        const ix = x + gap * (i + 1);
        ctx.fillText(items[i], ix, y + h/2 + 16);
        ctx.fillStyle = theme.fabric.accent; ctx.fillRect(ix - 2, y + h/2 - 2, 4, 6);
    }
}
