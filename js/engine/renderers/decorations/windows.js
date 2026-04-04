// Window and curtain decorations
import { darken } from '../shared.js';
import { getTheme } from '../level-themes.js';

export function drawWindow(ctx, dec, sx, y) {
    const theme = getTheme();
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(sx - 4, y - 4, dec.w + 8, dec.h + 8);
    const skyGrad = ctx.createLinearGradient(sx, y, sx, y + dec.h);
    skyGrad.addColorStop(0, '#A8D8EA');
    skyGrad.addColorStop(1, '#C8E8F8');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(sx, y, dec.w, dec.h);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(sx + dec.w * 0.3, y + dec.h * 0.3, 8, 0, Math.PI * 2);
    ctx.arc(sx + dec.w * 0.45, y + dec.h * 0.25, 10, 0, Math.PI * 2);
    ctx.arc(sx + dec.w * 0.6, y + dec.h * 0.3, 7, 0, Math.PI * 2);
    ctx.fill();
    // Frame — themed wood
    ctx.strokeStyle = theme.wood.base;
    ctx.lineWidth = 5;
    ctx.strokeRect(sx, y, dec.w, dec.h);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx + dec.w / 2, y);
    ctx.lineTo(sx + dec.w / 2, y + dec.h);
    ctx.moveTo(sx, y + dec.h / 2);
    ctx.lineTo(sx + dec.w, y + dec.h / 2);
    ctx.stroke();
    // Sill — themed ceramic
    ctx.fillStyle = theme.ceramic.base;
    ctx.fillRect(sx - 6, y + dec.h, dec.w + 12, 6);
}

export function drawCurtain(ctx, dec, sx, y) {
    const theme = getTheme();
    ctx.fillStyle = dec.color;
    ctx.fillRect(sx, y, dec.w, dec.h);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < dec.w; i += 7) {
        ctx.beginPath();
        ctx.moveTo(sx + i, y);
        ctx.bezierCurveTo(sx + i + 3, y + dec.h * 0.3, sx + i - 2, y + dec.h * 0.7, sx + i + 1, y + dec.h);
        ctx.stroke();
    }
    // Tieback — darker version of dec.color
    ctx.fillStyle = darken(dec.color, 30);
    ctx.fillRect(sx + 2, y + dec.h * 0.4, dec.w - 4, 4);
    // Rod — themed
    ctx.fillStyle = theme.curtain.rod;
    ctx.fillRect(sx - 5, y - 5, dec.w + 10, 5);
    ctx.beginPath(); ctx.arc(sx - 5, y - 2, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx + dec.w + 5, y - 2, 4, 0, Math.PI * 2); ctx.fill();
}
