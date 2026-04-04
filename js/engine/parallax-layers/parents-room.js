import { getTheme } from '../renderers/level-themes.js';

function repeatX(offset, spacing, canvasW, callback) {
    const start = -(offset % spacing) - spacing;
    for (let x = start; x < canvasW + spacing; x += spacing) {
        callback(x);
    }
}

export const parentsRoomLayers = [
    { speed: 0.05, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.08;
        repeatX(offset, 40, w, (x) => {
            ctx.fillStyle = theme.fabric.dark; ctx.fillRect(x + 8, 0, 8, h * 0.8);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 18, 0, 1.5, h * 0.8);
        });
        ctx.globalAlpha = 0.06; ctx.fillStyle = '#8A5A5A';
        repeatX(offset, 300, w, (x) => {
            for (let fy = 30; fy < h * 0.65; fy += 55) {
                ctx.beginPath(); ctx.arc(x + 150, fy, 9, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#5A7A5A';
                ctx.beginPath(); ctx.ellipse(x + 140, fy + 6, 6, 3, -0.5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 160, fy + 6, 6, 3, 0.5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#8A5A5A';
            }
        });
        ctx.globalAlpha = 0.22;
        repeatX(offset, 1800, w, (x) => {
            // Twilight window
            const wx = x + 380, wy = h * 0.06;
            ctx.fillStyle = theme.wood.base; ctx.fillRect(wx, wy, 100, 120);
            const skyGrad = ctx.createLinearGradient(0, wy + 5, 0, wy + 90);
            skyGrad.addColorStop(0, '#2A2A5A'); skyGrad.addColorStop(0.5, '#5A3A6A'); skyGrad.addColorStop(1, '#8A5A4A');
            ctx.fillStyle = skyGrad; ctx.fillRect(wx + 5, wy + 5, 90, 90);
            ctx.fillStyle = '#FFFFEE';
            for (let s = 0; s < 6; s++) { ctx.beginPath(); ctx.arc(wx + 12 + s * 14, wy + 10 + (s*7)%25, 1.2, 0, Math.PI * 2); ctx.fill(); }
            ctx.fillStyle = '#EEEEDD'; ctx.beginPath(); ctx.arc(wx + 75, wy + 15, 9, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#2A2A5A'; ctx.beginPath(); ctx.arc(wx + 78, wy + 13, 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.wood.base;
            ctx.fillRect(wx + 48, wy + 5, 3, 90); ctx.fillRect(wx + 5, wy + 47, 90, 3); ctx.fillRect(wx - 3, wy + 97, 106, 6);
            // Second window (x+1200)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1195, wy, 85, 100);
            ctx.fillStyle = skyGrad; ctx.fillRect(x + 1200, wy + 5, 75, 72);
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1236, wy + 5, 3, 72); ctx.fillRect(x + 1200, wy + 38, 75, 3);
            ctx.fillRect(x + 1192, wy + 79, 91, 5);
            // Shutter shadow
            ctx.globalAlpha = 0.04; ctx.fillStyle = '#3A3040';
            for (let s = 0; s < 6; s++) {
                ctx.save(); ctx.translate(x + 550 + s * 15, h * 0.15); ctx.rotate(0.5);
                ctx.fillRect(0, 0, 4, 120); ctx.restore();
            }
            ctx.globalAlpha = 0.22;
        });
        // Curtain + moth + glow (same as before)
        const t = Date.now() / 3000;
        ctx.globalAlpha = 0.08; ctx.fillStyle = theme.curtain.base;
        repeatX(offset, 1800, w, (x) => {
            ctx.beginPath(); ctx.moveTo(x + 377, h * 0.06);
            for (let cy = h * 0.06; cy < h * 0.06 + 125; cy += 5)
                ctx.lineTo(x + 374 + Math.sin(t + cy * 0.03) * 7, cy);
            ctx.lineTo(x + 377, h * 0.06 + 125); ctx.closePath(); ctx.fill();
        });
        ctx.globalAlpha = 0.14; ctx.fillStyle = '#AA9A7A';
        repeatX(offset, 1800, w, (x) => {
            const mx = x + 120 + Math.sin(t * 2.5) * 18, my = h * 0.28 + Math.cos(t * 3.1) * 12;
            const wing = Math.sin(t * 8) * 0.5;
            ctx.beginPath(); ctx.ellipse(mx - 3, my, 3.5, 2.5, -wing, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(mx + 3, my, 3.5, 2.5, wing, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 0.06;
        repeatX(offset, 1800, w, (x) => {
            const grad = ctx.createRadialGradient(x + 120, h * 0.35, 5, x + 120, h * 0.35, 70);
            grad.addColorStop(0, 'rgba(255, 220, 150, 0.25)'); grad.addColorStop(1, 'rgba(255, 220, 150, 0)');
            ctx.fillStyle = grad; ctx.fillRect(x + 50, h * 0.2, 140, 90);
        });
        ctx.globalAlpha = 1;
    }},
    { speed: 0.2, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.35;
        repeatX(offset, 1800, w, (x) => {
            // Wardrobe (x+20)
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 20, h * 0.06, 100, h * 0.66);
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 24, h * 0.08, 44, h * 0.61);
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 72, h * 0.08, 44, h * 0.61);
            ctx.fillStyle = theme.metal.base; ctx.beginPath(); ctx.arc(x + 65, h * 0.38, 3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 75, h * 0.38, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.wood.dark;
            ctx.beginPath(); ctx.moveTo(x + 20, h * 0.06); ctx.quadraticCurveTo(x + 70, h * 0.02, x + 120, h * 0.06);
            ctx.lineTo(x + 120, h * 0.08); ctx.lineTo(x + 20, h * 0.08); ctx.closePath(); ctx.fill();
            // Wedding photo (x+170)
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 167, h * 0.10, 62, 52);
            ctx.fillStyle = '#D8D0C8'; ctx.fillRect(x + 171, h * 0.11, 54, 44);
            ctx.fillStyle = '#5A5A6A'; ctx.beginPath(); ctx.arc(x + 190, h * 0.14, 5, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 186, h * 0.16, 8, 18);
            ctx.fillStyle = '#E8E0D8'; ctx.beginPath(); ctx.arc(x + 206, h * 0.14, 5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + 200, h * 0.16); ctx.lineTo(x + 197, h * 0.29); ctx.lineTo(x + 215, h * 0.29); ctx.lineTo(x + 212, h * 0.16); ctx.closePath(); ctx.fill();
            // Vanity mirror (x+280)
            ctx.fillStyle = theme.wood.grain; ctx.beginPath(); ctx.ellipse(x + 305, h * 0.18, 26, 34, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#C8D0D8'; ctx.beginPath(); ctx.ellipse(x + 305, h * 0.18, 22, 30, 0, 0, Math.PI * 2); ctx.fill();
            // Dresser (x+380)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 380, h * 0.44, 90, 50);
            ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 380, h * 0.44 + 16); ctx.lineTo(x + 470, h * 0.44 + 16); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + 380, h * 0.44 + 33); ctx.lineTo(x + 470, h * 0.44 + 33); ctx.stroke();
            ctx.fillStyle = theme.metal.base; for (let d = 0; d < 3; d++) ctx.fillRect(x + 420, h * 0.44 + 5 + d * 17, 12, 3);
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 388, h * 0.40, 9, 16);
            ctx.fillStyle = '#A0C8C0'; ctx.fillRect(x + 404, h * 0.41, 7, 12);
            ctx.fillStyle = '#6A2A2A'; ctx.fillRect(x + 445, h * 0.41, 18, 12);
            ctx.fillStyle = '#DDCC88'; ctx.strokeStyle = '#DDCC88'; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(x + 463, h * 0.44); ctx.quadraticCurveTo(x + 469, h * 0.46, x + 467, h * 0.50); ctx.stroke();
            // Lamp (x+520)
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 530, h * 0.28, 3, h * 0.24);
            ctx.fillStyle = '#E8D0A0';
            ctx.beginPath(); ctx.moveTo(x + 518, h * 0.28); ctx.lineTo(x + 514, h * 0.19);
            ctx.lineTo(x + 550, h * 0.19); ctx.lineTo(x + 546, h * 0.28); ctx.closePath(); ctx.fill();
            ctx.fillStyle = 'rgba(255, 220, 150, 0.12)';
            ctx.beginPath(); ctx.moveTo(x + 516, h * 0.28); ctx.lineTo(x + 500, h * 0.56);
            ctx.lineTo(x + 564, h * 0.56); ctx.lineTo(x + 548, h * 0.28); ctx.closePath(); ctx.fill();
            // Children's art (x+618)
            ctx.fillStyle = theme.wood.grain; ctx.fillRect(x + 618, h * 0.12, 38, 30);
            ctx.fillStyle = '#FFFDE8'; ctx.fillRect(x + 621, h * 0.13, 32, 24);
            ctx.lineWidth = 2;
            const rc = ['#FF0000','#FFAA00','#00CC00','#0000FF'];
            for (let r = 0; r < rc.length; r++) {
                ctx.strokeStyle = rc[r]; ctx.beginPath(); ctx.arc(x + 637, h * 0.13 + 24, 13 - r * 2.5, Math.PI, Math.PI * 2); ctx.stroke();
            }
            // Vacation photos (x+700)
            ctx.fillStyle = theme.wood.light; ctx.fillRect(x + 695, h * 0.10, 30, 24);
            ctx.fillStyle = '#88CCEE'; ctx.fillRect(x + 698, h * 0.11, 24, 10);
            ctx.fillStyle = '#EECC88'; ctx.fillRect(x + 698, h * 0.11 + 10, 24, 8);
            ctx.fillStyle = theme.wood.light; ctx.fillRect(x + 732, h * 0.09, 30, 26);
            ctx.fillStyle = '#AACCEE'; ctx.fillRect(x + 735, h * 0.10, 24, 18);
            ctx.fillStyle = '#7A9A6A';
            ctx.beginPath(); ctx.moveTo(x + 735, h * 0.10 + 18); ctx.lineTo(x + 747, h * 0.10 + 5); ctx.lineTo(x + 759, h * 0.10 + 18); ctx.closePath(); ctx.fill();
            // Clothes on chair (x+800)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 800, h * 0.35, 38, 4);
            ctx.fillRect(x + 802, h * 0.35 + 4, 4, 32); ctx.fillRect(x + 832, h * 0.35 + 4, 4, 32);
            ctx.fillRect(x + 800, h * 0.56, 38, 4);
            ctx.fillStyle = theme.fabric.base;
            ctx.beginPath(); ctx.moveTo(x + 800, h * 0.35); ctx.quadraticCurveTo(x + 819, h * 0.33, x + 838, h * 0.35);
            ctx.lineTo(x + 842, h * 0.50); ctx.lineTo(x + 796, h * 0.48); ctx.closePath(); ctx.fill();
            // Religious icon (x+880)
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 878, h * 0.14, 18, 22);
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 880, h * 0.15, 14, 18);
            ctx.fillStyle = theme.metal.base; ctx.beginPath(); ctx.arc(x + 887, h * 0.17, 3, 0, Math.PI * 2); ctx.fill();
            // Pressed flowers frame (x+930)
            ctx.fillStyle = theme.wood.grain; ctx.fillRect(x + 928, h * 0.12, 30, 38);
            ctx.fillStyle = '#F8F8F0'; ctx.fillRect(x + 931, h * 0.13, 24, 32);
            ctx.fillStyle = '#8A3A5A'; ctx.beginPath(); ctx.ellipse(x + 940, h * 0.18, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#5A8A3A'; ctx.fillRect(x + 939, h * 0.20, 2, 12);
            ctx.fillStyle = '#AA5A7A'; ctx.beginPath(); ctx.ellipse(x + 948, h * 0.22, 3, 5, 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#5A8A3A'; ctx.fillRect(x + 947, h * 0.24, 2, 10);
            // Full-length mirror (x+1000)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 998, h * 0.18, 28, h * 0.52);
            ctx.fillStyle = '#C8D0D8'; ctx.fillRect(x + 1001, h * 0.19, 22, h * 0.48);
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            ctx.beginPath(); ctx.ellipse(x + 1007, h * 0.28, 5, 30, -0.1, 0, Math.PI * 2); ctx.fill();
            // Alarm clock on nightstand (x+1060)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1055, h * 0.52, 30, 22);
            ctx.fillStyle = theme.metal.dark; ctx.fillRect(x + 1060, h * 0.49, 18, 12);
            ctx.fillStyle = '#4A8A4A'; ctx.fillRect(x + 1062, h * 0.50, 14, 6);
            // Novels stacked (x+1062)
            ctx.fillStyle = '#8A3A3A'; ctx.fillRect(x + 1088, h * 0.49, 22, 4);
            ctx.fillStyle = '#3A5A6A'; ctx.fillRect(x + 1086, h * 0.49 - 4, 24, 3);
            // Sewing basket (x+1140)
            ctx.fillStyle = theme.wood.light; ctx.beginPath(); ctx.ellipse(x + 1150, h * 0.56, 14, 8, 0, Math.PI, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 1136, h * 0.56, 28, 10);
            ctx.fillStyle = '#DD5555'; ctx.beginPath(); ctx.arc(x + 1143, h * 0.54, 4, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#DD5555'; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(x + 1143, h * 0.54); ctx.lineTo(x + 1135, h * 0.50); ctx.stroke();
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 1155, h * 0.52, 1, 12);
            // Orchid on windowsill (x+1200)
            ctx.fillStyle = theme.ceramic.dark; ctx.fillRect(x + 1205, h * 0.08, 12, 10);
            ctx.fillStyle = '#4A8A3A'; ctx.fillRect(x + 1210, h * 0.04, 2, 14);
            ctx.fillStyle = '#DDAADD';
            ctx.beginPath(); ctx.arc(x + 1208, h * 0.03, 4, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 1214, h * 0.05, 3, 0, Math.PI * 2); ctx.fill();
            // Throw pillow (x+1280)
            ctx.fillStyle = theme.fabric.base;
            ctx.beginPath(); ctx.ellipse(x + 1290, h * 0.54, 16, 12, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = theme.fabric.dark; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.ellipse(x + 1290, h * 0.54, 12, 8, 0.1, 0, Math.PI * 2); ctx.stroke();
            // Scented candle (x+1350)
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 1348, h * 0.41, 10, 12);
            ctx.fillStyle = theme.ceramic.dark; ctx.fillRect(x + 1346, h * 0.41, 14, 3);
            // Ironing board (x+1420)
            ctx.fillStyle = theme.metal.light; ctx.save(); ctx.translate(x + 1420, h * 0.20); ctx.rotate(0.15);
            ctx.fillRect(0, 0, 12, h * 0.45); ctx.restore();
            // Rosary on bedpost (x+1500)
            ctx.fillStyle = theme.metal.dark; ctx.beginPath(); ctx.arc(x + 1510, h * 0.35, 2, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#6A5040'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 1510, h * 0.35);
            ctx.quadraticCurveTo(x + 1520, h * 0.40, x + 1510, h * 0.46);
            ctx.quadraticCurveTo(x + 1500, h * 0.40, x + 1510, h * 0.35); ctx.stroke();
            ctx.fillStyle = '#6A5040';
            ctx.beginPath(); ctx.arc(x + 1510, h * 0.47, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 1509, h * 0.47, 2, 8);
            // Laundry pile on bed (x+1580)
            ctx.fillStyle = '#7A8AAA'; ctx.fillRect(x + 1575, h * 0.34, 30, 6);
            ctx.fillStyle = '#AADDAA'; ctx.fillRect(x + 1578, h * 0.34 - 5, 24, 5);
            ctx.fillStyle = '#DDAAAA'; ctx.fillRect(x + 1580, h * 0.34 - 9, 20, 4);
            // Second wardrobe section (x+1660)
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1660, h * 0.08, 80, h * 0.60);
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1664, h * 0.10, 34, h * 0.55);
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1702, h * 0.10, 34, h * 0.55);
            ctx.fillStyle = theme.metal.base; ctx.beginPath(); ctx.arc(x + 1695, h * 0.35, 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 1705, h * 0.35, 2.5, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
    }},
    { speed: 0.5, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.3;
        const gY = h - 85; const t = Date.now() / 2000;
        repeatX(offset, 1800, w, (x) => {
            // His slippers (x+30)
            ctx.fillStyle = theme.wood.light;
            ctx.beginPath(); ctx.ellipse(x + 35, gY + 3, 14, 7, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 58, gY + 4, 14, 7, -0.1, 0, Math.PI * 2); ctx.fill();
            // Her slippers (x+100)
            ctx.fillStyle = theme.fabric.light;
            ctx.beginPath(); ctx.ellipse(x + 102, gY + 3, 11, 6, 0.05, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 122, gY + 4, 11, 6, -0.05, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.fabric.accent;
            ctx.beginPath(); ctx.ellipse(x + 104, gY, 7, 3, 0.05, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 124, gY + 1, 7, 3, -0.05, 0, Math.PI * 2); ctx.fill();
            // Nightstand (x+200)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 195, gY - 35, 44, 38);
            ctx.fillRect(x + 197, gY + 3, 4, 6); ctx.fillRect(x + 233, gY + 3, 4, 6);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 212, gY - 22, 10, 3);
            ctx.fillStyle = 'rgba(180, 220, 240, 0.5)'; ctx.fillRect(x + 203, gY - 46, 11, 13);
            ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(x + 224, gY - 40, 5, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(x + 233, gY - 40, 5, 0, Math.PI * 2); ctx.stroke();
            // Phone cable
            ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 239, gY - 30); ctx.quadraticCurveTo(x + 247, gY - 15, x + 244, gY); ctx.stroke();
            // Rug (x+320)
            ctx.fillStyle = theme.fabric.dark; ctx.beginPath(); ctx.ellipse(x + 355, gY + 4, 38, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = theme.wood.base; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.ellipse(x + 355, gY + 4, 28, 4, 0, 0, Math.PI * 2); ctx.stroke();
            // Dust bunny (x+450)
            ctx.fillStyle = '#AAA098'; const wobble = Math.sin(t * 2) * 2;
            ctx.beginPath(); ctx.arc(x + 455 + wobble, gY + 4, 7, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 461 + wobble, gY + 2, 5, 0, Math.PI * 2); ctx.fill();
            // Newspaper (x+520)
            ctx.fillStyle = '#E0D8C8'; ctx.save(); ctx.translate(x + 520, gY - 2); ctx.rotate(0.15);
            ctx.fillRect(0, 0, 25, 4); ctx.fillRect(0, 4, 25, 4); ctx.restore();
            // Lavender pot (x+600)
            ctx.fillStyle = theme.ceramic.dark; ctx.fillRect(x + 598, gY - 12, 18, 16); ctx.fillRect(x + 596, gY - 14, 22, 4);
            ctx.strokeStyle = '#5A8A5A'; ctx.lineWidth = 1;
            for (let ls = 0; ls < 5; ls++) {
                ctx.beginPath(); ctx.moveTo(x + 603 + ls * 3, gY - 14);
                ctx.lineTo(x + 603 + ls * 3 + Math.sin(ls) * 2, gY - 34 - ls * 2); ctx.stroke();
                ctx.fillStyle = '#8A5AAA';
                ctx.beginPath(); ctx.ellipse(x + 603 + ls * 3 + Math.sin(ls) * 2, gY - 36 - ls * 2, 2, 4, 0, 0, Math.PI * 2); ctx.fill();
            }
            // Shoe boxes (x+700)
            ctx.fillStyle = theme.wood.grain; ctx.fillRect(x + 695, gY - 8, 30, 12);
            ctx.fillStyle = '#6A8A9A'; ctx.fillRect(x + 693, gY - 22, 32, 12);
            ctx.fillStyle = '#AA7A6A'; ctx.fillRect(x + 695, gY - 34, 30, 10);
            // Baby monitor (x+790)
            ctx.fillStyle = theme.ceramic.light; ctx.fillRect(x + 788, gY - 20, 16, 20);
            ctx.fillStyle = '#4A8A4A'; ctx.fillRect(x + 790, gY - 18, 12, 7);
            const blink = Math.sin(t * 3) > 0;
            ctx.fillStyle = blink ? '#44FF44' : '#448844';
            ctx.beginPath(); ctx.arc(x + 796, gY - 7, 2, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 802, gY - 26, 2, 8);
            // Clothes hanger on floor (x+870)
            ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(x + 870, gY + 2); ctx.lineTo(x + 880, gY - 5);
            ctx.lineTo(x + 890, gY + 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(x + 880, gY - 6, 2, 0, Math.PI * 2); ctx.stroke();
            // Single sock (x+940)
            ctx.fillStyle = '#DDDDDD';
            ctx.beginPath(); ctx.ellipse(x + 945, gY + 3, 8, 4, 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 940, gY - 2, 10, 6);
            // Hand cream (x+1000)
            ctx.fillStyle = theme.fabric.light; ctx.fillRect(x + 998, gY - 4, 14, 6);
            ctx.fillStyle = theme.fabric.accent; ctx.fillRect(x + 1012, gY - 3, 4, 4);
            // Tissue box (x+1060)
            ctx.fillStyle = '#88BBDD'; ctx.fillRect(x + 1055, gY - 10, 22, 12);
            ctx.fillStyle = '#EEEEEE'; ctx.fillRect(x + 1062, gY - 14, 8, 6);
            // Hot water bottle (x+1130)
            ctx.fillStyle = '#CC4444';
            ctx.beginPath(); ctx.ellipse(x + 1140, gY - 2, 12, 8, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 1136, gY - 12, 8, 6);
            // Laundry basket (x+1220)
            ctx.fillStyle = theme.wood.light; ctx.fillRect(x + 1215, gY - 28, 30, 30);
            ctx.strokeStyle = theme.wood.grain; ctx.lineWidth = 0.5;
            for (let ly = gY - 26; ly < gY; ly += 4) {
                ctx.beginPath(); ctx.moveTo(x + 1215, ly); ctx.lineTo(x + 1245, ly); ctx.stroke();
            }
            // Second rug (x+1360)
            ctx.fillStyle = theme.fabric.dark; ctx.beginPath(); ctx.ellipse(x + 1390, gY + 4, 32, 5, 0, 0, Math.PI * 2); ctx.fill();
            // Second nightstand (x+1480)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1475, gY - 32, 38, 34);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 1489, gY - 20, 10, 3);
            // Book with glasses (x+1478)
            ctx.fillStyle = '#3A5A3A'; ctx.fillRect(x + 1480, gY - 42, 20, 4);
            ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(x + 1486, gY - 46, 4, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(x + 1494, gY - 46, 4, 0, Math.PI * 2); ctx.stroke();
            // Second dust bunny (x+1580)
            ctx.fillStyle = '#AAA098'; const wb2 = Math.sin(t * 1.8 + 2) * 2;
            ctx.beginPath(); ctx.arc(x + 1585 + wb2, gY + 4, 5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 1590 + wb2, gY + 2, 4, 0, Math.PI * 2); ctx.fill();
            // Second plant (x+1670)
            ctx.fillStyle = theme.ceramic.dark; ctx.fillRect(x + 1668, gY - 10, 14, 12);
            ctx.fillStyle = '#3A7A28'; ctx.beginPath(); ctx.ellipse(x + 1675, gY - 16, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
    }},
];
