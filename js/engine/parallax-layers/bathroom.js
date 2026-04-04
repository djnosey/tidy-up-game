import { getTheme } from '../renderers/level-themes.js';

function repeatX(offset, spacing, canvasW, callback) {
    const start = -(offset % spacing) - spacing;
    for (let x = start; x < canvasW + spacing; x += spacing) {
        callback(x);
    }
}

export const bathroomLayers = [
    { speed: 0.05, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = '#8AB0C0'; ctx.lineWidth = 0.5;
        repeatX(offset, 25, w, (x) => { for (let y = 0; y < h * 0.7; y += 25) ctx.strokeRect(x, y, 24, 24); });
        ctx.globalAlpha = 0.14;
        ctx.strokeStyle = '#3A7A9A'; ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x2 = -20; x2 < w + 20; x2 += 20) {
            const sx = x2 - (offset % 20);
            ctx.moveTo(sx, h * 0.4); ctx.quadraticCurveTo(sx + 5, h * 0.4 - 7, sx + 10, h * 0.4);
            ctx.quadraticCurveTo(sx + 15, h * 0.4 + 7, sx + 20, h * 0.4);
        }
        ctx.stroke();
        ctx.globalAlpha = 0.22;
        repeatX(offset, 1800, w, (x) => {
            // Frosted window
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 380, h * 0.06, 70, 60);
            ctx.fillStyle = theme.glass.base; ctx.fillRect(x + 384, h * 0.08, 62, 52);
            ctx.fillStyle = '#7AAA6A'; ctx.globalAlpha = 0.12;
            ctx.beginPath(); ctx.arc(x + 400, h * 0.15, 14, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 425, h * 0.12, 16, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.22;
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 413, h * 0.08, 3, 52); ctx.fillRect(x + 384, h * 0.08 + 25, 62, 3);
            // Second smaller window
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1200, h * 0.08, 50, 45);
            ctx.fillStyle = theme.glass.base; ctx.fillRect(x + 1204, h * 0.10, 42, 36);
            // Chipped tiles
            ctx.globalAlpha = 0.08;
            ctx.fillStyle = theme.floor.tile;
            ctx.fillRect(x + 80, h * 0.25, 8, 6); ctx.fillRect(x + 900, h * 0.15, 6, 9);
            // Mold spot
            ctx.fillStyle = '#7A8A6A';
            ctx.beginPath(); ctx.arc(x + 50, 20, 6, 0, Math.PI * 2); ctx.fill();
            // Vent fan
            ctx.globalAlpha = 0.12;
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 700, 12, 28, 28);
            ctx.fillStyle = theme.metal.base; ctx.beginPath(); ctx.arc(x + 714, 26, 10, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.metal.light; ctx.beginPath(); ctx.arc(x + 714, 26, 6, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.22;
        });
        const fogGrad = ctx.createLinearGradient(0, 0, 0, h * 0.35);
        fogGrad.addColorStop(0, 'rgba(200, 220, 230, 0.2)'); fogGrad.addColorStop(0.6, 'rgba(200, 220, 230, 0.08)');
        fogGrad.addColorStop(1, 'rgba(200, 220, 230, 0)');
        ctx.globalAlpha = 1; ctx.fillStyle = fogGrad; ctx.fillRect(0, 0, w, h * 0.35);
        ctx.globalAlpha = 1;
    }},
    { speed: 0.2, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.35;
        repeatX(offset, 1800, w, (x) => {
            // Mirror (x+30)
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 30, h * 0.08, 85, 110);
            ctx.fillStyle = '#C8D8E0'; ctx.fillRect(x + 35, h * 0.09, 75, 100);
            const t = Date.now() / 5000;
            ctx.fillStyle = 'rgba(200, 220, 230, 0.35)';
            ctx.beginPath(); ctx.ellipse(x + 65, h * 0.12, 28 + Math.sin(t) * 5, 14, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.beginPath(); ctx.ellipse(x + 48, h * 0.14, 8, 22, -0.2, 0, 0, Math.PI * 2); ctx.fill();
            // Medicine cabinet (x+160)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 160, h * 0.10, 55, 65);
            ctx.fillStyle = theme.ceramic.dark; ctx.fillRect(x + 163, h * 0.14, 49, 2); ctx.fillRect(x + 163, h * 0.21, 49, 2); ctx.fillRect(x + 163, h * 0.28, 49, 2);
            ctx.fillStyle = '#AA3030'; ctx.fillRect(x + 168, h * 0.15, 7, 12);
            ctx.fillStyle = '#3A7A3A'; ctx.fillRect(x + 180, h * 0.15, 6, 10);
            ctx.fillStyle = '#DDA070'; ctx.fillRect(x + 168, h * 0.22, 14, 9);
            // Towel rack (x+270)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 270, h * 0.24, 65, 3);
            ctx.fillStyle = theme.fabric.base; ctx.fillRect(x + 278, h * 0.24 + 3, 24, 45);
            ctx.fillStyle = theme.fabric.light; for (let ts = 0; ts < 4; ts++) ctx.fillRect(x + 278, h * 0.24 + 7 + ts * 11, 24, 3);
            ctx.fillStyle = theme.fabric.accent; ctx.fillRect(x + 308, h * 0.24 + 3, 22, 40);
            // Shower curtain (x+390)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 385, h * 0.03, 100, 3);
            ctx.fillStyle = theme.fabric.light; ctx.fillRect(x + 390, h * 0.04, 90, h * 0.54);
            ctx.fillStyle = '#7AAABA';
            for (let fy = 0; fy < 4; fy++) for (let fx = 0; fx < 3; fx++) {
                const fishX = x + 402 + fx * 25, fishY = h * 0.1 + fy * 38;
                ctx.beginPath(); ctx.ellipse(fishX, fishY, 7, 4, 0, 0, Math.PI * 2); ctx.fill();
            }
            // Toothbrush holder (x+270, y:50%)
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 270, h * 0.50, 20, 14);
            const tbC = ['#DD3333','#3333DD','#33AA33','#DD33DD'];
            for (let tb = 0; tb < 4; tb++) { ctx.fillStyle = tbC[tb]; ctx.fillRect(x + 273 + tb * 4, h * 0.45, 2.5, 20); }
            // Pipes (x+530)
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 530, h * 0.18, 5, h * 0.50);
            ctx.fillRect(x + 528, h * 0.32, 9, 7); ctx.fillRect(x + 530, h * 0.48, 50, 4);
            // Toilet (x+600)
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 610, h * 0.22, 18, 22);
            ctx.strokeStyle = theme.metal.light; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 619, h * 0.22 + 22); ctx.lineTo(x + 619, h * 0.22 + 48); ctx.stroke();
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 607, h * 0.56, 24, 22);
            ctx.beginPath(); ctx.ellipse(x + 619, h * 0.64, 16, 12, 0, 0, Math.PI * 2); ctx.fill();
            // Rubber duck (x+520)
            ctx.fillStyle = '#FFDD00';
            ctx.beginPath(); ctx.ellipse(x + 520, h * 0.58, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 528, h * 0.56, 6, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#FF8800';
            ctx.beginPath(); ctx.moveTo(x + 533, h * 0.56); ctx.lineTo(x + 538, h * 0.558); ctx.lineTo(x + 533, h * 0.564); ctx.closePath(); ctx.fill();
            // Bathrobe (x+660)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 670, h * 0.25, 4, 8);
            ctx.fillStyle = '#4A6A8A';
            ctx.beginPath(); ctx.moveTo(x + 664, h * 0.25 + 8); ctx.lineTo(x + 660, h * 0.48);
            ctx.lineTo(x + 682, h * 0.48); ctx.lineTo(x + 678, h * 0.25 + 8); ctx.closePath(); ctx.fill();
            // TP holder (x+650, y:36%)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 648, h * 0.36, 3, 10);
            ctx.fillStyle = theme.ceramic.light; ctx.beginPath(); ctx.ellipse(x + 657, h * 0.38, 8, 8, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#DDD'; ctx.beginPath(); ctx.arc(x + 657, h * 0.38, 3, 0, Math.PI * 2); ctx.fill();
            // Soap dispenser (x+165, y:36%)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 165, h * 0.36, 10, 14);
            ctx.fillRect(x + 167, h * 0.35, 6, 3); ctx.fillRect(x + 173, h * 0.34, 6, 2);
            // Bathroom scale (x+590, y:68%)
            ctx.fillStyle = theme.ceramic.base; ctx.beginPath(); ctx.ellipse(x + 600, h * 0.70, 16, 5, 0, 0, Math.PI * 2); ctx.fill();
            // Laundry basket (x+700, y:50%)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 695, h * 0.50, 30, 40);
            ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 0.5;
            for (let ly = h * 0.52; ly < h * 0.50 + 38; ly += 4) { ctx.beginPath(); ctx.moveTo(x + 695, ly); ctx.lineTo(x + 725, ly); ctx.stroke(); }
            ctx.fillStyle = '#7A8AAA'; ctx.fillRect(x + 698, h * 0.49, 12, 6);
            ctx.fillStyle = '#AA5555'; ctx.fillRect(x + 714, h * 0.48, 8, 8);
            // Bidet (x+760, y:58%)
            ctx.fillStyle = theme.ceramic.base;
            ctx.beginPath(); ctx.ellipse(x + 775, h * 0.62, 14, 10, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 765, h * 0.56, 20, 18);
            // Small crucifix (x+500, y:6%)
            ctx.fillStyle = '#6A4A2A'; ctx.fillRect(x + 498, h * 0.06, 3, 20); ctx.fillRect(x + 492, h * 0.09, 15, 3);
            // Shelf with candle + freshener (x+830, y:28%)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 825, h * 0.30, 40, 3);
            ctx.fillStyle = '#E8D8C0'; ctx.fillRect(x + 830, h * 0.27, 6, 12);
            ctx.fillStyle = '#FFAA30'; ctx.beginPath(); ctx.ellipse(x + 833, h * 0.265, 1.5, 2.5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#88CCAA'; ctx.fillRect(x + 848, h * 0.27, 8, 12);
            // Hair dryer holder (x+900, y:32%)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 898, h * 0.32, 4, 12);
            ctx.fillStyle = '#333'; ctx.fillRect(x + 895, h * 0.32 + 12, 14, 8);
            ctx.fillRect(x + 909, h * 0.32 + 14, 8, 4);
            // Second mirror (x+1000, y:10%)
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 995, h * 0.10, 60, 50);
            ctx.fillStyle = '#C8D8E0'; ctx.fillRect(x + 999, h * 0.11, 52, 42);
            // Second towel rack (x+1100, y:26%)
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 1095, h * 0.26, 50, 3);
            ctx.fillStyle = theme.fabric.light; ctx.fillRect(x + 1100, h * 0.26 + 3, 20, 38);
            ctx.fillStyle = theme.fabric.accent; ctx.fillRect(x + 1125, h * 0.26 + 3, 18, 35);
            // Second pipe run (x+1200, y:20-65%)
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 1210, h * 0.20, 4, h * 0.45);
            ctx.fillRect(x + 1208, h * 0.40, 8, 6);
        });
        ctx.globalAlpha = 1;
    }},
    { speed: 0.5, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.3;
        const gY = h - 85;
        const t = Date.now() / 3000;
        repeatX(offset, 1800, w, (x) => {
            // Bath mat (x+30)
            ctx.fillStyle = theme.fabric.base; ctx.beginPath(); ctx.ellipse(x + 60, gY + 2, 32, 7, 0, 0, Math.PI * 2); ctx.fill();
            // Chanclas (x+140)
            ctx.fillStyle = '#3AAA8A';
            ctx.beginPath(); ctx.ellipse(x + 140, gY + 3, 11, 5, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 162, gY + 4, 11, 5, -0.1, 0, Math.PI * 2); ctx.fill();
            // Water puddle (x+230)
            ctx.globalAlpha = 0.18 + Math.sin(t * 2) * 0.05;
            ctx.fillStyle = theme.water.base; ctx.beginPath(); ctx.ellipse(x + 240, gY + 4, 22, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.3;
            // Shampoo bottles (x+320)
            ctx.fillStyle = '#3A8A3A'; ctx.fillRect(x + 315, gY - 18, 12, 18); ctx.fillRect(x + 317, gY - 23, 8, 6);
            ctx.fillStyle = '#8A3A8A'; ctx.save(); ctx.translate(x + 338, gY); ctx.rotate(1.3); ctx.fillRect(0, 0, 9, 16); ctx.restore();
            // Step stool (x+420)
            ctx.fillStyle = '#5AAA5A'; ctx.fillRect(x + 415, gY - 10, 28, 5); ctx.fillRect(x + 418, gY - 5, 4, 8); ctx.fillRect(x + 437, gY - 5, 4, 8);
            // Wet footprints (x+510)
            ctx.globalAlpha = 0.12 + Math.sin(t) * 0.03;
            ctx.fillStyle = '#8AB0C0';
            ctx.beginPath(); ctx.ellipse(x + 510, gY + 2, 5, 9, -0.1, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 528, gY, 5, 9, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.3;
            // Spray bottle (x+600)
            ctx.fillStyle = '#3A6AAA'; ctx.fillRect(x + 595, gY - 22, 16, 22);
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 599, gY - 30, 8, 10); ctx.fillRect(x + 607, gY - 26, 10, 3);
            // Toilet brush (x+680)
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 682, gY - 2, 12, 8);
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 686, gY - 28, 3, 26);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 683, gY - 30, 10, 4);
            // Rubber duck on floor (x+760)
            ctx.fillStyle = '#FFDD00';
            ctx.beginPath(); ctx.ellipse(x + 765, gY + 1, 7, 5, 0.2, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 771, gY - 2, 4, 0, Math.PI * 2); ctx.fill();
            // Squeegee (x+830)
            ctx.fillStyle = '#3A8AAA'; ctx.fillRect(x + 832, gY - 30, 10, 3);
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 836, gY - 27, 2, 28);
            // Folded towels on stool (x+900)
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 895, gY - 8, 22, 4); ctx.fillRect(x + 898, gY - 4, 4, 6); ctx.fillRect(x + 912, gY - 4, 4, 6);
            ctx.fillStyle = theme.fabric.base; ctx.fillRect(x + 897, gY - 16, 18, 3);
            ctx.fillStyle = theme.fabric.light; ctx.fillRect(x + 897, gY - 13, 18, 3);
            ctx.fillStyle = theme.fabric.accent; ctx.fillRect(x + 897, gY - 10, 18, 3);
            // Wet towel on floor (x+990)
            ctx.fillStyle = theme.fabric.dark;
            ctx.beginPath(); ctx.ellipse(x + 1000, gY + 3, 18, 5, 0.2, 0, Math.PI * 2); ctx.fill();
            // Bath toy boat (x+1080)
            ctx.fillStyle = '#DD3333'; ctx.fillRect(x + 1075, gY, 18, 5);
            ctx.beginPath(); ctx.moveTo(x + 1093, gY); ctx.lineTo(x + 1098, gY + 2); ctx.lineTo(x + 1093, gY + 5); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#EEEEEE'; ctx.fillRect(x + 1082, gY - 8, 2, 8);
            ctx.beginPath(); ctx.moveTo(x + 1084, gY - 8); ctx.lineTo(x + 1084, gY - 3); ctx.lineTo(x + 1090, gY - 5); ctx.closePath(); ctx.fill();
            // Second puddle (x+1180)
            ctx.globalAlpha = 0.15; ctx.fillStyle = theme.water.base;
            ctx.beginPath(); ctx.ellipse(x + 1190, gY + 5, 16, 4, 0, 0, Math.PI * 2); ctx.fill();
            ctx.globalAlpha = 0.3;
            // Second bath mat (x+1300)
            ctx.fillStyle = theme.fabric.light; ctx.beginPath(); ctx.ellipse(x + 1320, gY + 2, 28, 6, 0, 0, Math.PI * 2); ctx.fill();
        });
        // Bubbles
        ctx.globalAlpha = 0.15;
        for (let b = 0; b < 4; b++) {
            const bx = (200 + b * 230 + Math.sin(t * 1.3 + b * 2) * 30 - offset * 0.5) % w;
            const by = h * 0.35 - b * 25 + Math.cos(t + b * 1.7) * 12;
            ctx.strokeStyle = theme.water.base; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.arc(bx, by, 5 + b * 1.5, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }},
];
