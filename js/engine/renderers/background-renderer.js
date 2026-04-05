// Background drawing — wall, floor hazard
import { darken } from './shared.js';
import { getTheme } from './level-themes.js';

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

// Per-level hazard colors: [base gradient top, base gradient bottom, accent]
const HAZARD_THEMES = {
    'Living Room':    { top: '#8B2500', bot: '#4A0A00', accent: '#FF4444', pattern: 'spikes' },
    'Kitchen':        { top: '#8B3A00', bot: '#4A1A00', accent: '#FF6600', pattern: 'lava' },
    'Bathroom':       { top: '#003855', bot: '#001A2A', accent: '#00AAFF', pattern: 'water' },
    "Kids' Room":     { top: '#8B2500', bot: '#4A0A00', accent: '#FFDD00', pattern: 'spikes' },
    "Parents' Room":  { top: '#3A0A2A', bot: '#1A0015', accent: '#AA44AA', pattern: 'spikes' },
    'Terrace':        { top: '#5A3A00', bot: '#2A1A00', accent: '#FF8800', pattern: 'lava' },
};

export function drawFloorHazard(ctx, groundY, canvasWidth, levelName, time) {
    const hazard = HAZARD_THEMES[levelName] || HAZARD_THEMES['Living Room'];
    const h = 80; // same height as old ground platform

    ctx.save();

    // Base gradient
    const grad = ctx.createLinearGradient(0, groundY, 0, groundY + h);
    grad.addColorStop(0, hazard.top);
    grad.addColorStop(1, hazard.bot);
    ctx.fillStyle = grad;
    ctx.fillRect(0, groundY, canvasWidth, h);

    // Pulsing glow at top edge
    const glowAlpha = 0.3 + Math.sin(time * 4) * 0.15;
    const glow = ctx.createLinearGradient(0, groundY - 8, 0, groundY + 12);
    glow.addColorStop(0, 'rgba(0,0,0,0)');
    glow.addColorStop(0.3, `${hazard.accent}${Math.round(glowAlpha * 255).toString(16).padStart(2, '0')}`);
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, groundY - 8, canvasWidth, 20);

    // Hazard pattern
    if (hazard.pattern === 'spikes') {
        // Repeating triangle spikes along the top edge
        ctx.fillStyle = hazard.accent;
        ctx.globalAlpha = 0.6 + Math.sin(time * 3) * 0.1;
        const spikeW = 16, spikeH = 12;
        for (let sx = 0; sx < canvasWidth; sx += spikeW) {
            ctx.beginPath();
            ctx.moveTo(sx, groundY + spikeH);
            ctx.lineTo(sx + spikeW / 2, groundY);
            ctx.lineTo(sx + spikeW, groundY + spikeH);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    } else if (hazard.pattern === 'lava') {
        // Bubbling lava surface with animated blobs
        ctx.fillStyle = hazard.accent;
        ctx.globalAlpha = 0.4;
        for (let bx = 0; bx < canvasWidth; bx += 40) {
            const bobY = Math.sin(time * 2 + bx * 0.1) * 4;
            const r = 6 + Math.sin(time * 3 + bx * 0.2) * 2;
            ctx.beginPath();
            ctx.arc(bx + 20, groundY + 8 + bobY, r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    } else if (hazard.pattern === 'water') {
        // Animated wave line + sparks
        ctx.strokeStyle = hazard.accent;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        for (let wx = 0; wx <= canvasWidth; wx += 4) {
            const wy = groundY + 3 + Math.sin(time * 3 + wx * 0.05) * 3;
            if (wx === 0) ctx.moveTo(wx, wy);
            else ctx.lineTo(wx, wy);
        }
        ctx.stroke();
        // Occasional spark
        ctx.fillStyle = '#FFDD00';
        ctx.globalAlpha = Math.sin(time * 6) > 0.5 ? 0.7 : 0;
        for (let zx = 80; zx < canvasWidth; zx += 160) {
            const zy = groundY + 4 + Math.sin(time * 5 + zx) * 3;
            ctx.font = '10px sans-serif';
            ctx.fillText('⚡', zx + Math.sin(time * 2 + zx) * 10, zy);
        }
        ctx.globalAlpha = 1;
    }

    // Warning text at bottom (subtle)
    ctx.globalAlpha = 0.15 + Math.sin(time * 2) * 0.05;
    ctx.fillStyle = hazard.accent;
    ctx.font = 'bold 14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('⚠ DANGER ⚠', canvasWidth / 2, groundY + h - 15);
    ctx.globalAlpha = 1;

    ctx.restore();
}
