// Architectural features and ambient effects
import { roundRect } from '../shared.js';
import { getTheme } from '../level-themes.js';

export function drawRadiator(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 80;
    const h = dec.h || 40;
    // Body — themed metal
    ctx.fillStyle = theme.metal.light;
    ctx.fillRect(sx, y, w, h);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 8) {
        ctx.beginPath();
        ctx.moveTo(sx + i, y + 3);
        ctx.lineTo(sx + i, y + h - 3);
        ctx.stroke();
    }
    // Feet and pipes — themed metal
    ctx.fillStyle = theme.metal.dark;
    ctx.beginPath();
    ctx.arc(sx + 8, y + h + 6, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = theme.metal.dark;
    ctx.fillRect(sx + 10, y - 5, 4, 8);
    ctx.fillRect(sx + w - 14, y - 5, 4, 8);
    ctx.fillStyle = theme.metal.shine;
    ctx.fillRect(sx + 2, y, w - 4, 2);
}

export function drawPowerStrip(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 40;
    // Body — themed ceramic
    ctx.fillStyle = theme.ceramic.base;
    roundRect(ctx, sx, y, w, 8, 3);
    for (let i = 0; i < 4; i++) {
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(sx + 6 + i * 9, y + 4, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(sx + w, y + 4);
    ctx.quadraticCurveTo(sx + w + 15, y + 2, sx + w + 25, y + 8);
    ctx.stroke();
}

export function drawDadoRail(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 960;
    ctx.fillStyle = theme.wall.trim;
    ctx.fillRect(sx, y, w, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(sx, y, w, 1);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(sx, y + 3, w, 1);
}

export function drawCornice(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 960;
    ctx.fillStyle = theme.wall.trim;
    ctx.fillRect(sx, y, w, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(sx, y, w, 2);
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(sx, y + 5, w, 1);
}

export function drawSkirting(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 960;
    ctx.fillStyle = theme.wall.trim;
    ctx.fillRect(sx, y, w, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(sx, y, w, 1);
}

export function drawWallSocket(ctx, dec, sx, y) {
    const theme = getTheme();
    ctx.fillStyle = theme.ceramic.base;
    roundRect(ctx, sx - 8, y - 10, 16, 20, 3);
    ctx.fillStyle = '#ccc';
    ctx.beginPath();
    ctx.arc(sx - 3, y - 2, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.arc(sx + 3, y - 2, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath();
    ctx.arc(sx, y + 4, 2, 0, Math.PI * 2); ctx.fill();
}

export function drawDoorway(ctx, dec, sx, y) {
    const theme = getTheme();
    const w = dec.w || 50;
    const h = dec.h || 80;
    // Frame — themed wood
    ctx.fillStyle = theme.wood.base;
    ctx.fillRect(sx, y, 5, h);
    ctx.fillRect(sx + w - 5, y, 5, h);
    ctx.fillRect(sx, y, w, 5);
    // Interior — themed dark wood
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(sx + 5, y + 5, w - 10, h - 5);
}

export function drawDustMotes(ctx, dec, sx, y) {
    const theme = getTheme();
    const t = Date.now() / 1000;
    // Tint based on room warmth from wall base color
    const wallBase = theme.wall.base;
    ctx.fillStyle = `rgba(255, 240, 200, 0.3)`;
    // Extract warmth hint from wall color for tinting
    const isWarm = wallBase && (wallBase.includes('D4') || wallBase.includes('F0') || wallBase.includes('F5') || wallBase.includes('E8'));
    if (!isWarm) {
        ctx.fillStyle = 'rgba(230, 240, 255, 0.25)';
    }
    for (let i = 0; i < 6; i++) {
        const dx = Math.sin(t * 0.5 + i * 1.8) * 20;
        const dy = Math.cos(t * 0.3 + i * 2.1) * 30;
        const sz = 1.5 + Math.sin(t + i) * 0.5;
        ctx.beginPath();
        ctx.arc(sx + dx + i * 8, y + dy + i * 12, sz, 0, Math.PI * 2);
        ctx.fill();
    }
}

export function drawSteamWisps(ctx, dec, sx, y) {
    const t = Date.now() / 1000;
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#E0E8F0';
    for (let i = 0; i < 4; i++) {
        const phase = t * 0.8 + i * 1.5;
        const rise = (phase % 3) * 20;
        const sway = Math.sin(phase * 2) * 8;
        const alpha = Math.max(0, 1 - (phase % 3) / 3);
        ctx.globalAlpha = alpha * 0.15;
        ctx.beginPath();
        ctx.arc(sx + sway + i * 10, y - rise, 5 + rise * 0.15, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
}

export function drawWaterPuddle(ctx, dec, sx, y) {
    const theme = getTheme();
    const t = Date.now() / 1000;
    const shimmer = Math.sin(t * 2) * 0.03;
    // Use themed glass color if available, otherwise default
    const puddleColor = theme.glass ? theme.glass.base : `rgba(160, 210, 230, ${0.2 + shimmer})`;
    ctx.fillStyle = puddleColor;
    ctx.beginPath();
    ctx.ellipse(sx, y, dec.w || 20, dec.h || 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.ellipse(sx - 5, y - 1, 6, 2, -0.2, 0, Math.PI * 2);
    ctx.fill();
}

export function drawFloatingBubbles(ctx, dec, sx, y) {
    const t = Date.now() / 1000;
    for (let i = 0; i < 5; i++) {
        const phase = t * 0.4 + i * 1.2;
        const rise = (phase % 4) * 25;
        const sway = Math.sin(phase * 1.5) * 12;
        const alpha = Math.max(0, 1 - (phase % 4) / 4) * 0.3;
        const r = 3 + i * 0.8;
        ctx.strokeStyle = `rgba(200, 230, 255, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(sx + sway + i * 15, y - rise, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.arc(sx + sway + i * 15 - 1, y - rise - 1, r * 0.3, 0, Math.PI * 2);
        ctx.fill();
    }
}

export function drawGrassTuft(ctx, dec, sx, y) {
    ctx.strokeStyle = 'rgba(80, 140, 60, 0.4)';
    ctx.lineWidth = 1.5;
    const t = Date.now() / 1000;
    const sway = Math.sin(t * 1.2 + (dec.x || 0)) * 2;
    for (let i = -2; i <= 2; i++) {
        ctx.beginPath();
        ctx.moveTo(sx + i * 3, y);
        ctx.quadraticCurveTo(sx + i * 3 + sway, y - 10, sx + i * 4 + sway * 1.5, y - 16 - Math.abs(i) * 2);
        ctx.stroke();
    }
}

export function drawButterfly(ctx, dec, sx, y) {
    const t = Date.now() / 1000;
    const flap = Math.sin(t * 8) * 0.4;
    const floatX = Math.sin(t * 0.5 + (dec.x || 0) * 0.01) * 30;
    const floatY = Math.cos(t * 0.7 + (dec.x || 0) * 0.01) * 15;
    const bx = sx + floatX;
    const by = y + floatY;
    ctx.fillStyle = dec.color || 'rgba(200, 100, 180, 0.4)';
    ctx.save();
    ctx.translate(bx, by);
    ctx.save();
    ctx.scale(1, Math.cos(flap));
    ctx.beginPath();
    ctx.ellipse(-3, 0, 5, 8, -0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.scale(1, Math.cos(flap + 0.5));
    ctx.beginPath();
    ctx.ellipse(3, 0, 5, 8, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = 'rgba(60, 40, 30, 0.4)';
    ctx.fillRect(-0.5, -4, 1, 8);
    ctx.restore();
}

export function drawDrippingTap(ctx, dec, sx, y) {
    const t = Date.now() / 1000;
    const dropPhase = (t * 1.2) % 2;
    if (dropPhase < 1.5) {
        const dropY = dropPhase * 30;
        const alpha = Math.max(0, 1 - dropPhase / 1.5);
        ctx.fillStyle = `rgba(140, 200, 220, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(sx, y + dropY, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    if (dropPhase > 1.3 && dropPhase < 1.8) {
        const splash = (dropPhase - 1.3) * 6;
        ctx.strokeStyle = `rgba(140, 200, 220, ${Math.max(0, 0.4 - splash * 0.4)})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.ellipse(sx, y + 45, splash * 5, splash * 2, 0, 0, Math.PI * 2);
        ctx.stroke();
    }
}
