// Room furnishing decorations: rug, wall art, family photo, standing lamp, ceiling light, wall shelf
import { roundRect, darken } from '../shared.js';
import { getTheme } from '../level-themes.js';

export function drawRug(ctx, dec, sx, y) {
    const theme = getTheme();
    ctx.fillStyle = dec.color;
    roundRect(ctx, sx - dec.w / 2, y, dec.w, dec.h, 3);
    // Border pattern — theme-tinted
    ctx.strokeStyle = theme.accent1;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(sx - dec.w / 2 + 4, y + 2, dec.w - 8, dec.h - 4);
    // Center pattern
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    const rcx = sx;
    const rcy = y + dec.h / 2;
    ctx.beginPath();
    ctx.moveTo(rcx, rcy - 3); ctx.lineTo(rcx + 15, rcy);
    ctx.lineTo(rcx, rcy + 3); ctx.lineTo(rcx - 15, rcy); ctx.closePath();
    ctx.stroke();
    // Fringe
    ctx.strokeStyle = darken(dec.color, 20);
    ctx.lineWidth = 1;
    for (let i = 0; i < dec.w; i += 5) {
        ctx.beginPath();
        ctx.moveTo(sx - dec.w / 2 + i, y + dec.h);
        ctx.lineTo(sx - dec.w / 2 + i, y + dec.h + 4);
        ctx.stroke();
    }
}

export function drawWallArt(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 50;
    const h = dec.h || 40;
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(sx + 3, y + 3, w, h);
    // Frame — themed wood
    ctx.fillStyle = theme.wood.base;
    ctx.fillRect(sx, y, w, h);
    ctx.fillStyle = '#F5F5DC';
    ctx.fillRect(sx + 4, y + 4, w - 8, h - 8);
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(sx + 6, y + 6, w - 12, (h - 12) * 0.55);
    ctx.fillStyle = '#228B22';
    ctx.fillRect(sx + 6, y + 6 + (h - 12) * 0.55, w - 12, (h - 12) * 0.45);
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(sx + w - 14, y + 12, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(sx, y, w, 2);
    ctx.fillRect(sx, y, 2, h);
}

export function drawFamilyPhoto(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 35;
    const h = dec.h || 30;
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(sx + 2, y + 2, w, h);
    // Frame — themed dark wood
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(sx, y, w, h);
    ctx.fillStyle = '#E8D8C8';
    ctx.fillRect(sx + 3, y + 3, w - 6, h - 6);
    const figH = h - 12;
    const figY = y + 6;
    const colors = ['#3366CC', '#CC3366', '#33CC66', '#CC9933'];
    for (let i = 0; i < 4; i++) {
        const fx = sx + 6 + i * ((w - 12) / 4);
        const fh = i >= 2 ? figH * 0.6 : figH;
        ctx.fillStyle = colors[i];
        ctx.fillRect(fx + 1, figY + (figH - fh), 4, fh * 0.5);
        ctx.fillStyle = '#FDCEB5';
        ctx.beginPath();
        ctx.arc(fx + 3, figY + (figH - fh) - 2, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

export function drawStandingLamp(ctx, dec, sx, y, cameraY) {
    const theme = getTheme();
    const cx = sx;
    const baseY = (dec.floorY || (dec.y + 120)) - cameraY;
    // Base — themed metal
    ctx.fillStyle = theme.metal.dark;
    ctx.beginPath();
    ctx.ellipse(cx, baseY, 14, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Pole — themed metal
    ctx.fillStyle = theme.metal.base;
    ctx.fillRect(cx - 2, y + 30, 4, baseY - y - 30);
    // Shade — themed fabric light
    const shadeColor = dec.color || theme.fabric.light;
    ctx.fillStyle = shadeColor;
    ctx.beginPath();
    ctx.moveTo(cx - 12, y);
    ctx.lineTo(cx + 12, y);
    ctx.lineTo(cx + 20, y + 28);
    ctx.lineTo(cx - 20, y + 28);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 230, 150, 0.05)';
    ctx.beginPath();
    ctx.moveTo(cx - 20, y + 28);
    ctx.lineTo(cx - 50, baseY);
    ctx.lineTo(cx + 50, baseY);
    ctx.lineTo(cx + 20, y + 28);
    ctx.closePath();
    ctx.fill();
}

export function drawCeilingLight(ctx, dec, sx, y) {
    const theme = getTheme();
    const cx = sx;
    // Cord — themed metal
    ctx.strokeStyle = theme.metal.dark;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, y - (dec.size || 20));
    ctx.stroke();
    // Fitting — themed metal
    ctx.fillStyle = theme.metal.base;
    ctx.beginPath();
    ctx.ellipse(cx, 4, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    const shadeW = dec.size || 40;
    const shadeH = shadeW * 0.5;
    ctx.fillStyle = dec.color || '#F5E6C8';
    ctx.beginPath();
    ctx.moveTo(cx - shadeW * 0.3, y - shadeH);
    ctx.lineTo(cx + shadeW * 0.3, y - shadeH);
    ctx.lineTo(cx + shadeW * 0.5, y);
    ctx.lineTo(cx - shadeW * 0.5, y);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255, 230, 150, 0.06)';
    ctx.beginPath();
    ctx.moveTo(cx - shadeW * 0.5, y);
    ctx.lineTo(cx - shadeW * 1.2, y + 300);
    ctx.lineTo(cx + shadeW * 1.2, y + 300);
    ctx.lineTo(cx + shadeW * 0.5, y);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 240, 180, 0.8)';
    ctx.beginPath();
    ctx.arc(cx, y - 2, 5, 0, Math.PI * 2);
    ctx.fill();
}

export function drawWallShelfDeco(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 50;
    // Shelf — themed wood
    ctx.fillStyle = theme.wood.base;
    ctx.fillRect(sx, y, w, 4);
    // Brackets — themed dark wood
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(sx + 5, y + 4, 3, 8);
    ctx.fillRect(sx + w - 8, y + 4, 3, 8);
    const items = dec.items || ['\ud83d\udcd5', '\ud83c\udfc6', '\ud83d\udd6f\ufe0f'];
    const gap = w / (items.length + 1);
    for (let i = 0; i < items.length; i++) {
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(items[i], sx + gap * (i + 1), y - 1);
    }
}

export function drawScatteredCrayons(ctx, dec, sx, y) {
    const colors = ['#DD3333', '#3366DD', '#33AA33', '#DDAA22', '#CC44CC'];
    for (let i = 0; i < 5; i++) {
        ctx.fillStyle = colors[i];
        ctx.save();
        ctx.translate(sx + i * 18, y);
        ctx.rotate((i * 0.7) - 1.2);
        roundRect(ctx, -12, -2, 24, 4, 1);
        ctx.fillStyle = darken(colors[i], 40);
        ctx.beginPath();
        ctx.moveTo(12, -2); ctx.lineTo(16, 0); ctx.lineTo(12, 2);
        ctx.fill();
        ctx.restore();
    }
}

export function drawPaperAirplane(ctx, dec, sx, y) {
    const t = Date.now() / 1000;
    const bob = Math.sin(t * 1.5 + (dec.x || 0)) * 3;
    ctx.fillStyle = 'rgba(240, 240, 250, 0.5)';
    ctx.strokeStyle = 'rgba(180, 180, 200, 0.4)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(sx, y + bob);
    ctx.lineTo(sx + 20, y + bob + 6);
    ctx.lineTo(sx + 5, y + bob + 4);
    ctx.lineTo(sx + 20, y + bob + 12);
    ctx.lineTo(sx, y + bob);
    ctx.fill();
    ctx.stroke();
}

export function drawDustBunny(ctx, dec, sx, y) {
    ctx.fillStyle = 'rgba(180, 170, 160, 0.25)';
    const t = Date.now() / 1000;
    const wobble = Math.sin(t * 0.8 + (dec.x || 0)) * 1;
    ctx.beginPath();
    ctx.arc(sx, y + wobble, 6, 0, Math.PI * 2);
    ctx.arc(sx + 5, y - 2 + wobble, 4, 0, Math.PI * 2);
    ctx.arc(sx - 4, y - 1 + wobble, 3, 0, Math.PI * 2);
    ctx.fill();
}
