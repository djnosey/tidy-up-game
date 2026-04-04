// Decoration drawing — non-interactive visual elements
import { roundRect, lighten, darken, drawEmojiScaled } from './shared.js';
import { getTheme, drawWoodGrain, drawMetalSurface } from './level-themes.js';

export function drawDecoration(ctx, dec, cameraX, cameraY = 0) {
    ctx.save();
    const sx = dec.x - cameraX;
    const y = dec.y - cameraY;

    if (dec.emoji) {
        drawEmojiScaled(ctx, dec.emoji, sx, y, dec.size);

    } else if (dec.type === 'rug') {
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

    } else if (dec.type === 'curtain') {
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

    } else if (dec.type === 'window') {
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

    } else if (dec.type === 'ceiling_light') {
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

    } else if (dec.type === 'wall_art') {
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

    } else if (dec.type === 'family_photo') {
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

    } else if (dec.type === 'standing_lamp') {
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

    } else if (dec.type === 'radiator') {
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

    } else if (dec.type === 'power_strip') {
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

    } else if (dec.type === 'wall_shelf_deco') {
        const theme = getTheme();
        const w = dec.w || 50;
        // Shelf — themed wood
        ctx.fillStyle = theme.wood.base;
        ctx.fillRect(sx, y, w, 4);
        // Brackets — themed dark wood
        ctx.fillStyle = theme.wood.dark;
        ctx.fillRect(sx + 5, y + 4, 3, 8);
        ctx.fillRect(sx + w - 8, y + 4, 3, 8);
        const items = dec.items || ['📕', '🏆', '🕯️'];
        const gap = w / (items.length + 1);
        for (let i = 0; i < items.length; i++) {
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(items[i], sx + gap * (i + 1), y - 1);
        }

    } else if (dec.type === 'dado_rail') {
        const theme = getTheme();
        const w = dec.w || 960;
        ctx.fillStyle = theme.wall.trim;
        ctx.fillRect(sx, y, w, 4);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(sx, y, w, 1);
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(sx, y + 3, w, 1);

    } else if (dec.type === 'cornice') {
        const theme = getTheme();
        const w = dec.w || 960;
        ctx.fillStyle = theme.wall.trim;
        ctx.fillRect(sx, y, w, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.fillRect(sx, y, w, 2);
        ctx.fillStyle = 'rgba(0,0,0,0.05)';
        ctx.fillRect(sx, y + 5, w, 1);

    } else if (dec.type === 'skirting') {
        const theme = getTheme();
        const w = dec.w || 960;
        ctx.fillStyle = theme.wall.trim;
        ctx.fillRect(sx, y, w, 6);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(sx, y, w, 1);

    } else if (dec.type === 'wall_socket') {
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

    } else if (dec.type === 'doorway') {
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

    } else if (dec.type === 'dust_motes') {
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

    } else if (dec.type === 'steam_wisps') {
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

    } else if (dec.type === 'water_puddle') {
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

    } else if (dec.type === 'floating_bubbles') {
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

    } else if (dec.type === 'scattered_crayons') {
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

    } else if (dec.type === 'paper_airplane') {
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

    } else if (dec.type === 'dust_bunny') {
        ctx.fillStyle = 'rgba(180, 170, 160, 0.25)';
        const t = Date.now() / 1000;
        const wobble = Math.sin(t * 0.8 + (dec.x || 0)) * 1;
        ctx.beginPath();
        ctx.arc(sx, y + wobble, 6, 0, Math.PI * 2);
        ctx.arc(sx + 5, y - 2 + wobble, 4, 0, Math.PI * 2);
        ctx.arc(sx - 4, y - 1 + wobble, 3, 0, Math.PI * 2);
        ctx.fill();

    } else if (dec.type === 'grass_tuft') {
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

    } else if (dec.type === 'butterfly') {
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

    } else if (dec.type === 'dripping_tap') {
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

    ctx.restore();
}
