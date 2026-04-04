// Enemy drawing — uses unified theme system for visual coherence
import { roundRect } from './shared.js';
import { getTheme } from './level-themes.js';
import { getImage } from '../asset-loader.js';
import { ENEMY_SPRITES } from '../sprite-manifest.js';

// Helper: blend two hex colors by a ratio (0 = colorA, 1 = colorB)
function blendHex(hexA, hexB, ratio) {
    const parse = (h) => {
        h = h.replace('#', '');
        if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
        return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
    };
    const a = parse(hexA), b = parse(hexB);
    const r = Math.round(a[0]+(b[0]-a[0])*ratio);
    const g = Math.round(a[1]+(b[1]-a[1])*ratio);
    const bl = Math.round(a[2]+(b[2]-a[2])*ratio);
    return `rgb(${r},${g},${bl})`;
}

// Consistent eyes: white sclera + dark pupils that follow direction
function drawEyes(ctx, cx, cy, direction, eyeSpacing, eyeRadius, pupilRadius) {
    eyeSpacing = eyeSpacing || 5;
    eyeRadius = eyeRadius || 3;
    pupilRadius = pupilRadius || 1.5;
    const pupilShift = direction * (eyeRadius * 0.4);
    // Left eye
    ctx.fillStyle = '#FFF';
    ctx.beginPath(); ctx.arc(cx - eyeSpacing, cy, eyeRadius, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(cx - eyeSpacing + pupilShift, cy, pupilRadius, 0, Math.PI * 2); ctx.fill();
    // Right eye
    ctx.fillStyle = '#FFF';
    ctx.beginPath(); ctx.arc(cx + eyeSpacing, cy, eyeRadius, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(cx + eyeSpacing + pupilShift, cy, pupilRadius, 0, Math.PI * 2); ctx.fill();
}

// Themed grounding shadow under enemy
function drawGroundingShadow(ctx, cx, floorY, radiusX) {
    const theme = getTheme();
    // Use wall base to tint the shadow slightly toward the room color
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(cx, floorY + 2, radiusX, 4, 0, 0, Math.PI * 2);
    ctx.fill();
}

export function drawEnemy(ctx, x, y, w, h, label, color, direction, alive, deathTimer) {
    ctx.save();
    const cx = x + w / 2;
    const cy = y + h / 2;
    const theme = getTheme();

    if (!alive) {
        ctx.globalAlpha = deathTimer * 2;
        ctx.translate(cx, y + h);
        ctx.scale(1.3, 0.3);
        ctx.translate(-cx, -(y + h));
    }

    // Grounding shadow for all enemies
    drawGroundingShadow(ctx, cx, y + h, w / 2);

    // Try sprite image first for supported enemy types
    const spriteData = ENEMY_SPRITES[label];
    if (spriteData && alive) {
        let img = null;
        if (spriteData.frames) {
            // Animated frames — pick frame based on time
            const frameIdx = Math.floor(Date.now() / (1000 / spriteData.frameRate)) % spriteData.frames.length;
            img = getImage(spriteData.frames[frameIdx]);
        } else if (spriteData.idle) {
            img = getImage(spriteData.idle);
        } else if (spriteData.spritesheet) {
            // Draw a single frame from spritesheet
            const sheet = getImage(spriteData.spritesheet);
            if (sheet) {
                const fw = sheet.width / spriteData.frameCount;
                const fh = sheet.height;
                const frameIdx = Math.floor(Date.now() / (1000 / spriteData.frameRate)) % spriteData.frameCount;
                ctx.save();
                if (direction === -1) {
                    ctx.translate(cx, 0);
                    ctx.scale(-1, 1);
                    ctx.translate(-cx, 0);
                }
                ctx.drawImage(sheet, frameIdx * fw, 0, fw, fh, x, y, w, h);
                ctx.restore();
                ctx.restore();
                return;
            }
        }
        if (img) {
            ctx.save();
            if (direction === -1) {
                ctx.translate(cx, 0);
                ctx.scale(-1, 1);
                ctx.translate(-cx, 0);
            }
            ctx.drawImage(img, x, y, w, h);
            ctx.restore();
            ctx.restore();
            return;
        }
    }

    if (label === 'ROOMBA' || label === 'MEGA ROOMBA') {
        ctx.fillStyle = theme.metal.base;
        ctx.beginPath();
        ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = theme.metal.dark;
        ctx.lineWidth = 2;
        ctx.stroke();
        // Inner ring
        ctx.strokeStyle = theme.metal.shine;
        ctx.beginPath();
        ctx.ellipse(cx, cy, w / 3, h / 3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = alive ? '#00FF00' : '#FF0000';
        ctx.beginPath();
        ctx.arc(cx, cy - h / 4, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = theme.metal.dark;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, w / 2 - 2, -0.5, 0.5);
        ctx.stroke();
    } else if (label === 'DUST') {
        // Dust matches the room walls
        const dustColor = blendHex(theme.wall.base, '#C8C0B0', 0.4);
        ctx.fillStyle = dustColor;
        for (let i = 0; i < 5; i++) {
            const bx = cx + Math.cos(i * 1.3) * (w * 0.2);
            const by = cy + Math.sin(i * 1.3) * (h * 0.2);
            ctx.beginPath();
            ctx.arc(bx, by, w / 3, 0, Math.PI * 2);
            ctx.fill();
        }
        drawEyes(ctx, cx, cy - 2, direction, 4, 2, 1);
    } else if (label === 'RC CAR') {
        ctx.fillStyle = color;
        roundRect(ctx, x + 2, y + 4, w - 4, h - 8, 4);
        // Wheels use themed metal dark
        ctx.fillStyle = theme.metal.dark;
        ctx.beginPath(); ctx.arc(x + 7, y + h - 2, 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(x + w - 7, y + h - 2, 4, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = theme.metal.dark;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, y + 4);
        ctx.lineTo(cx + direction * 8, y - 8);
        ctx.stroke();
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(cx + direction * 8, y - 8, 2.5, 0, Math.PI * 2);
        ctx.fill();
        const front = direction === 1 ? x + w - 4 : x + 2;
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(front, y + 6, 3, 3);
        ctx.fillRect(front, y + h - 10, 3, 3);
    } else if (label === 'COCKROACH') {
        // Blends with kitchen wood
        ctx.fillStyle = theme.wood.dark;
        ctx.beginPath(); ctx.ellipse(cx, cy, w/2, h/2, 0, 0, Math.PI*2); ctx.fill();
        // Legs
        ctx.strokeStyle = blendHex(theme.wood.dark, '#000000', 0.3); ctx.lineWidth = 1;
        for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.moveTo(cx+i*5, cy); ctx.lineTo(cx+i*5+direction*6, cy+h/2+3); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx+i*5, cy); ctx.lineTo(cx+i*5-direction*4, cy+h/2+2); ctx.stroke(); }
        // Antennae
        ctx.beginPath(); ctx.moveTo(cx+direction*w/3, cy-h/3); ctx.lineTo(cx+direction*w/2+4, cy-h); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx+direction*w/3, cy-h/3); ctx.lineTo(cx+direction*w/2-2, cy-h-2); ctx.stroke();
    } else if (label === 'BLENDER') {
        // Kitchen appliance — metal themed
        ctx.fillStyle = theme.metal.light; roundRect(ctx, cx-w/3, cy-h/3, w*2/3, h*2/3, 3);
        ctx.fillStyle = theme.metal.base; ctx.beginPath(); ctx.ellipse(cx, cy-h/3, w/3, 4, 0, 0, Math.PI*2); ctx.fill();
        // Blade (spinning)
        ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 2;
        const ba = Date.now()/100;
        ctx.beginPath(); ctx.moveTo(cx+Math.cos(ba)*8, cy+Math.sin(ba)*8); ctx.lineTo(cx-Math.cos(ba)*8, cy-Math.sin(ba)*8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx+Math.cos(ba+1.57)*8, cy+Math.sin(ba+1.57)*8); ctx.lineTo(cx-Math.cos(ba+1.57)*8, cy-Math.sin(ba+1.57)*8); ctx.stroke();
    } else if (label === 'ANTS') {
        ctx.fillStyle = '#222';
        for (let i = 0; i < 5; i++) { ctx.beginPath(); ctx.arc(cx - w/2 + i*(w/5), cy, 2, 0, Math.PI*2); ctx.fill(); }
    } else if (label === 'SPIDER') {
        // Dark with subtle theme tint
        const spiderColor = blendHex('#222222', theme.wood.dark, 0.15);
        ctx.fillStyle = spiderColor; ctx.beginPath(); ctx.arc(cx, cy, w/3, 0, Math.PI*2); ctx.fill();
        ctx.strokeStyle = spiderColor; ctx.lineWidth = 1.5;
        for (let i = 0; i < 4; i++) { const a = i*0.8-1.2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx+Math.cos(a)*w/2, cy+Math.sin(a)*h/2+4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx-Math.cos(a)*w/2, cy+Math.sin(a)*h/2+4); ctx.stroke(); }
        // Red eyes
        ctx.fillStyle = '#F00'; ctx.beginPath(); ctx.arc(cx-3, cy-3, 1.5, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(cx+3, cy-3, 1.5, 0, Math.PI*2); ctx.fill();
    } else if (label === 'RUBBER_DUCK') {
        // Keep yellow — iconic
        ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.ellipse(cx, cy+2, w/2, h/2-2, 0, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx-w/5, cy-h/4, w/4, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#FF6600'; ctx.beginPath(); ctx.moveTo(cx-w/3, cy-h/4); ctx.lineTo(cx-w/2, cy-h/4+2); ctx.lineTo(cx-w/3, cy-h/4+4); ctx.fill();
        drawEyes(ctx, cx - w/5, cy - h/4 - 2, direction, 3, 2, 1);
    } else if (label === 'MOULD') {
        // accent2 tint mixed with green
        const mouldColor = blendHex('#4A6A4A', theme.accent2, 0.35);
        ctx.fillStyle = mouldColor;
        for (let i = 0; i < 4; i++) { ctx.beginPath(); ctx.arc(cx+(Math.cos(i*1.7))*w/4, cy+(Math.sin(i*1.7))*h/4, w/4, 0, Math.PI*2); ctx.fill(); }
        drawEyes(ctx, cx, cy - 2, direction, 3, 1.5, 0.8);
    } else if (label === 'TOY_SOLDIER') {
        // Red uniform kept, hat uses wood.base
        ctx.fillStyle = '#CC0000'; roundRect(ctx, cx-w/4, cy-h/3, w/2, h*2/3, 2);
        ctx.fillStyle = '#FDCEB5'; ctx.beginPath(); ctx.arc(cx, cy-h/3-3, w/5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = theme.wood.base; roundRect(ctx, cx-w/4, cy-h/3-w/5-3, w/2, 5, 2); // Hat
        drawEyes(ctx, cx, cy - h/3 - 4, direction, 3, 1.5, 0.8);
    } else if (label === 'BOUNCING_BALL') {
        // Keep hue-shifting — it's fun
        const hueShift = (Date.now()/20) % 360;
        ctx.fillStyle = `hsl(${hueShift}, 70%, 55%)`; ctx.beginPath(); ctx.arc(cx, cy, w/2, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.beginPath(); ctx.arc(cx-w/5, cy-h/5, w/5, 0, Math.PI*2); ctx.fill();
    } else if (label === 'RC_HELICOPTER') {
        // Metal themed body
        ctx.fillStyle = theme.metal.base; roundRect(ctx, cx-w/3, cy, w*2/3, h/3, 3);
        ctx.fillStyle = theme.metal.dark; ctx.fillRect(cx-1, cy-h/3, 2, h/3); // Mast
        ctx.strokeStyle = theme.metal.light; ctx.lineWidth = 2;
        const blade = Math.sin(Date.now()/30) * w/2;
        ctx.beginPath(); ctx.moveTo(cx-blade, cy-h/3); ctx.lineTo(cx+blade, cy-h/3); ctx.stroke();
    } else if (label === 'MOTH') {
        // Fabric tones — they eat fabric
        const wingFlap = Math.sin(Date.now()/60) * 0.4;
        ctx.fillStyle = theme.fabric.light || blendHex(theme.fabric.base, '#E0D0C0', 0.3);
        ctx.beginPath(); ctx.ellipse(cx-6, cy, w/3, h/3+wingFlap*5, wingFlap, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx+6, cy, w/3, h/3+wingFlap*5, -wingFlap, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = theme.fabric.dark || blendHex(theme.fabric.base, '#333', 0.4);
        ctx.beginPath(); ctx.ellipse(cx, cy, 3, h/3, 0, 0, Math.PI*2); ctx.fill();
    } else if (label === 'ALARM_CLOCK') {
        // accent1 instead of hardcoded red
        ctx.fillStyle = theme.accent1; ctx.beginPath(); ctx.arc(cx, cy, w/2-2, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#FFF'; ctx.beginPath(); ctx.arc(cx, cy, w/2-5, 0, Math.PI*2); ctx.fill();
        // Clock hands
        ctx.strokeStyle = '#000'; ctx.lineWidth = 1.5;
        const t = Date.now()/200;
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx+Math.cos(t)*6, cy+Math.sin(t)*6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx+Math.cos(t/12)*5, cy+Math.sin(t/12)*5); ctx.stroke();
        // Bells on top
        ctx.fillStyle = theme.metal.base; ctx.beginPath(); ctx.arc(cx-5, cy-w/2, 3, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(cx+5, cy-w/2, 3, 0, Math.PI*2); ctx.fill();
        // Legs
        ctx.fillStyle = theme.metal.dark;
        ctx.fillRect(cx-w/3, cy+h/2-3, 3, 4); ctx.fillRect(cx+w/3-3, cy+h/2-3, 3, 4);
    } else if (label === 'LAUNDRY_MONSTER') {
        // Themed clothing colors from fabric and upholstery
        const colors = [theme.fabric.base, theme.fabric.dark, theme.upholstery.sofa, theme.upholstery.cushion];
        for (let i = 0; i < 4; i++) { ctx.fillStyle = colors[i]; ctx.beginPath(); ctx.arc(cx+(Math.cos(i*1.5))*w/4, cy+(Math.sin(i*1.5))*h/4+3, w/3, 0, Math.PI*2); ctx.fill(); }
        drawEyes(ctx, cx, cy - 4, direction, 5, 4, 2);
    } else if (label === 'WASP') {
        // Keep yellow/black — iconic
        ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.ellipse(cx, cy, w/2-2, h/2-2, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#000'; ctx.fillRect(cx-w/3, cy-2, w*2/3, 3); ctx.fillRect(cx-w/3, cy+3, w*2/3, 2);
        // Wings
        ctx.fillStyle = 'rgba(200,220,255,0.5)';
        const wf = Math.sin(Date.now()/40)*0.3;
        ctx.beginPath(); ctx.ellipse(cx-2, cy-h/2+2, 6, 4+wf*3, -0.3, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx+2, cy-h/2+2, 6, 4+wf*3, 0.3, 0, Math.PI*2); ctx.fill();
        // Stinger
        ctx.fillStyle = '#000'; ctx.beginPath(); ctx.moveTo(cx+w/2-2, cy); ctx.lineTo(cx+w/2+3, cy+1); ctx.lineTo(cx+w/2-2, cy+2); ctx.fill();
    } else if (label === 'PIGEON') {
        // Keep gray — iconic
        ctx.fillStyle = '#888'; ctx.beginPath(); ctx.ellipse(cx, cy+2, w/2, h/3, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#777'; ctx.beginPath(); ctx.arc(cx-w/3, cy-h/4, w/5, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#FF8800'; ctx.beginPath(); ctx.moveTo(cx-w/2, cy-h/4); ctx.lineTo(cx-w/2-5, cy-h/4+2); ctx.lineTo(cx-w/2, cy-h/4+4); ctx.fill();
        ctx.fillStyle = '#FF4400'; ctx.beginPath(); ctx.arc(cx-w/3, cy-h/4-1, 1.5, 0, Math.PI*2); ctx.fill();
    } else if (label === 'CAT') {
        // Keep color param — already themed per level data
        ctx.fillStyle = color || '#FF8800';
        ctx.beginPath(); ctx.ellipse(cx, cy+3, w/2, h/3, 0, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx-w/3, cy-h/5, w/4, 0, Math.PI*2); ctx.fill();
        // Ears
        ctx.beginPath(); ctx.moveTo(cx-w/3-5, cy-h/3); ctx.lineTo(cx-w/3-1, cy-h/2-2); ctx.lineTo(cx-w/3+3, cy-h/3); ctx.fill();
        ctx.beginPath(); ctx.moveTo(cx-w/3+2, cy-h/3); ctx.lineTo(cx-w/3+6, cy-h/2-2); ctx.lineTo(cx-w/3+10, cy-h/3); ctx.fill();
        // Eyes
        ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(cx-w/3-2, cy-h/5-1, 2, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(cx-w/3+5, cy-h/5-1, 2, 0, Math.PI*2); ctx.fill();
        // Tail
        ctx.strokeStyle = color || '#FF8800'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(cx+w/2-3, cy); ctx.quadraticCurveTo(cx+w/2+10, cy-15, cx+w/2+5, cy-20); ctx.stroke();
    } else {
        // Generic enemy with themed eyes
        ctx.fillStyle = color;
        roundRect(ctx, x, y, w, h, 4);
        drawEyes(ctx, cx, cy - 2, direction);
    }

    ctx.restore();
}
