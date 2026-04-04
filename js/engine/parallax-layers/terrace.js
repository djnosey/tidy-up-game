import { getTheme } from '../renderers/level-themes.js';

function repeatX(offset, spacing, canvasW, callback) {
    const start = -(offset % spacing) - spacing;
    for (let x = start; x < canvasW + spacing; x += spacing) {
        callback(x);
    }
}

export const terraceLayers = [
    { speed: 0.05, draw(ctx, offset, w, h) {
        const theme = getTheme();
        // Mountains
        ctx.globalAlpha = 0.15; ctx.fillStyle = '#7A8A9A';
        repeatX(offset, 500, w, (x) => {
            ctx.beginPath(); ctx.moveTo(x, h * 0.55);
            ctx.quadraticCurveTo(x + 80, h * 0.28, x + 160, h * 0.42);
            ctx.quadraticCurveTo(x + 250, h * 0.22, x + 340, h * 0.38);
            ctx.quadraticCurveTo(x + 430, h * 0.30, x + 500, h * 0.55);
            ctx.lineTo(x + 500, h); ctx.lineTo(x, h); ctx.closePath(); ctx.fill();
        });
        // Skyline
        ctx.globalAlpha = 0.18; ctx.fillStyle = '#6A7A8A';
        repeatX(offset, 1800, w, (x) => {
            ctx.fillRect(x + 30, h * 0.32, 22, h * 0.23);
            ctx.fillRect(x + 60, h * 0.28, 28, h * 0.27);
            ctx.fillRect(x + 96, h * 0.34, 16, h * 0.21);
            // Sagrada Familia
            ctx.fillStyle = '#7A8898'; ctx.fillRect(x + 160, h * 0.20, 45, h * 0.35);
            ctx.beginPath(); ctx.moveTo(x + 179, h * 0.20); ctx.lineTo(x + 182, h * 0.06); ctx.lineTo(x + 185, h * 0.20); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + 166, h * 0.20); ctx.lineTo(x + 169, h * 0.10); ctx.lineTo(x + 172, h * 0.20); ctx.closePath(); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + 192, h * 0.20); ctx.lineTo(x + 195, h * 0.10); ctx.lineTo(x + 198, h * 0.20); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#6A7A8A'; ctx.fillRect(x + 230, h * 0.30, 20, h * 0.25);
            // Torre Glories
            ctx.beginPath(); ctx.moveTo(x + 275, h * 0.35); ctx.lineTo(x + 280, h * 0.16);
            ctx.quadraticCurveTo(x + 288, h * 0.11, x + 296, h * 0.16); ctx.lineTo(x + 301, h * 0.35); ctx.closePath(); ctx.fill();
            ctx.fillRect(x + 330, h * 0.30, 24, h * 0.25); ctx.fillRect(x + 362, h * 0.34, 18, h * 0.21);
            ctx.fillRect(x + 390, h * 0.28, 22, h * 0.27);
            // Tibidabo
            ctx.fillStyle = '#7A8898';
            ctx.beginPath(); ctx.moveTo(x + 430, h * 0.42); ctx.quadraticCurveTo(x + 470, h * 0.16, x + 510, h * 0.42); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#8A9AA8'; ctx.fillRect(x + 462, h * 0.19, 18, 16);
            ctx.beginPath(); ctx.moveTo(x + 462, h * 0.19); ctx.lineTo(x + 471, h * 0.13); ctx.lineTo(x + 480, h * 0.19); ctx.closePath(); ctx.fill();
            ctx.fillRect(x + 470, h * 0.10, 2, 8); ctx.fillRect(x + 467, h * 0.11, 8, 1.5);
            ctx.fillStyle = '#6A7A8A';
            ctx.fillRect(x + 540, h * 0.32, 20, h * 0.23); ctx.fillRect(x + 568, h * 0.28, 24, h * 0.27);
            ctx.fillRect(x + 600, h * 0.35, 16, h * 0.20);
            // Montjuïc
            ctx.fillStyle = '#7A8898';
            ctx.beginPath(); ctx.moveTo(x + 640, h * 0.45); ctx.quadraticCurveTo(x + 680, h * 0.30, x + 720, h * 0.45); ctx.closePath(); ctx.fill();
            // Church tower of Molins de Rei
            ctx.fillStyle = '#8A8A9A'; ctx.fillRect(x + 780, h * 0.28, 14, h * 0.27);
            ctx.beginPath(); ctx.moveTo(x + 780, h * 0.28); ctx.lineTo(x + 787, h * 0.22); ctx.lineTo(x + 794, h * 0.28); ctx.closePath(); ctx.fill();
            // More buildings
            ctx.fillStyle = '#6A7A8A';
            ctx.fillRect(x + 830, h * 0.32, 18, h * 0.23); ctx.fillRect(x + 860, h * 0.30, 22, h * 0.25);
            // TV antennas
            ctx.strokeStyle = '#5A6A7A'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 45, h * 0.32); ctx.lineTo(x + 45, h * 0.24);
            ctx.moveTo(x + 40, h * 0.26); ctx.lineTo(x + 50, h * 0.26); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + 575, h * 0.28); ctx.lineTo(x + 575, h * 0.20);
            ctx.moveTo(x + 570, h * 0.22); ctx.lineTo(x + 580, h * 0.22); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + 840, h * 0.32); ctx.lineTo(x + 840, h * 0.25);
            ctx.moveTo(x + 836, h * 0.27); ctx.lineTo(x + 844, h * 0.27); ctx.stroke();
            // Llobregat valley hint (distant green)
            ctx.fillStyle = '#7A9A7A'; ctx.globalAlpha = 0.06;
            ctx.fillRect(x + 900, h * 0.42, 200, h * 0.13);
            ctx.globalAlpha = 0.18;
            // Distant train crossing bridge
            ctx.fillStyle = '#6A6A7A';
            ctx.fillRect(x + 950, h * 0.44, 80, 3); // bridge
            for (let p = 0; p < 5; p++) ctx.fillRect(x + 955 + p * 15, h * 0.44, 2, 8); // pillars
            ctx.fillStyle = '#5A5A6A'; ctx.fillRect(x + 970, h * 0.43, 25, 5); // train
        });
        // Clouds
        ctx.globalAlpha = 0.12;
        repeatX(offset * 1.5, 400, w, (x) => {
            ctx.fillStyle = '#DDAAAA';
            ctx.beginPath(); ctx.arc(x + 100, h * 0.06, 20, 0, Math.PI * 2);
            ctx.arc(x + 125, h * 0.04, 26, 0, Math.PI * 2); ctx.arc(x + 152, h * 0.06, 17, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#CCBB99';
            ctx.beginPath(); ctx.arc(x + 300, h * 0.08, 16, 0, Math.PI * 2);
            ctx.arc(x + 320, h * 0.06, 22, 0, Math.PI * 2); ctx.arc(x + 342, h * 0.08, 14, 0, Math.PI * 2); ctx.fill();
        });
        // Birds
        ctx.globalAlpha = 0.12; ctx.strokeStyle = '#4A4A5A'; ctx.lineWidth = 1;
        const t = Date.now() / 2000;
        for (let b = 0; b < 5; b++) {
            const bx = (100 + b * 180 + Math.sin(t + b * 1.5) * 25 - offset * 0.05) % (w + 50);
            const by = h * 0.07 + b * 8 + Math.cos(t * 0.8 + b * 2) * 8;
            const wing = Math.sin(t * 4 + b * 2) * 2.5;
            ctx.beginPath(); ctx.moveTo(bx - 7, by + wing); ctx.quadraticCurveTo(bx - 2, by - 3, bx, by);
            ctx.quadraticCurveTo(bx + 2, by - 3, bx + 7, by + wing); ctx.stroke();
        }
        // Airplane contrail
        ctx.globalAlpha = 0.05; ctx.strokeStyle = '#FFF'; ctx.lineWidth = 1.5;
        const planeX = (Date.now() / 80 + offset) % (w + 200) - 100;
        ctx.beginPath(); ctx.moveTo(planeX, h * 0.03); ctx.lineTo(planeX - 150, h * 0.06); ctx.stroke();
        // Crescent moon
        ctx.globalAlpha = 0.08; ctx.fillStyle = '#EEEEDD';
        ctx.beginPath(); ctx.arc(50 - offset * 0.02, h * 0.05, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#87CEEB'; ctx.beginPath(); ctx.arc(53 - offset * 0.02, h * 0.04, 9, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 1;
    }},
    { speed: 0.3, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.35;
        const railY = h * 0.58;
        // Pergola
        ctx.fillStyle = theme.wood.dark; ctx.fillRect(0, h * 0.01, w, 5);
        ctx.fillStyle = theme.wood.grain;
        repeatX(offset, 220, w, (x) => { ctx.fillRect(x + 30, h * 0.01, 14, 7); ctx.fillRect(x + 150, h * 0.01, 14, 7); });
        ctx.fillStyle = theme.plant.dark; ctx.globalAlpha = 0.2;
        repeatX(offset, 90, w, (x) => {
            ctx.beginPath(); ctx.ellipse(x + 25, h * 0.03, 14, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 60, h * 0.02, 12, 6, 0.3, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 0.35;
        // String lights
        repeatX(offset, 280, w, (x) => {
            ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x, h * 0.06); ctx.quadraticCurveTo(x + 140, h * 0.09, x + 280, h * 0.06); ctx.stroke();
            const lt = Date.now() / 2000;
            for (let bulb = 0; bulb < 8; bulb++) {
                const bx = x + 18 + bulb * 33, sag = Math.sin((bulb/7) * Math.PI) * h * 0.03;
                ctx.fillStyle = 'rgba(255, 240, 180, 0.2)';
                ctx.beginPath(); ctx.arc(bx, h * 0.06 + sag, 6 + Math.sin(lt + bulb) * 0.5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#FFE888'; ctx.beginPath(); ctx.arc(bx, h * 0.06 + sag, 3, 0, Math.PI * 2); ctx.fill();
            }
        });
        // Railing
        ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, railY); ctx.lineTo(w, railY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, railY + 38); ctx.lineTo(w, railY + 38); ctx.stroke();
        repeatX(offset, 50, w, (x) => {
            ctx.fillStyle = theme.metal.dark; ctx.fillRect(x + 22, railY, 2.5, 38);
            ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.arc(x + 23, railY + 16, 6, 0, Math.PI * 1.5); ctx.stroke();
        });
        // Main scene
        repeatX(offset, 1800, w, (x) => {
            // Bougainvillea pillar (x+20)
            ctx.fillStyle = theme.wall.trim; ctx.fillRect(x + 25, h * 0.04, 18, railY - h * 0.04);
            ctx.fillStyle = theme.plant.dark;
            for (let v = 0; v < 12; v++) {
                const vy = h * 0.08 + v * (railY - h * 0.08) / 12;
                ctx.beginPath(); ctx.ellipse(x + 30 + Math.sin(v) * 5, vy, 5, 3, v * 0.2, 0, Math.PI * 2); ctx.fill();
            }
            ctx.fillStyle = '#CC3388';
            for (let f = 0; f < 8; f++) {
                const fy = h * 0.1 + f * (railY - h * 0.1) / 8;
                ctx.beginPath(); ctx.arc(x + 28 + (f%2) * 8, fy, 3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 31 + (f%2) * 5, fy + 3, 2.5, 0, Math.PI * 2); ctx.fill();
            }
            // Clothesline (x+100-400)
            ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 100, h * 0.12); ctx.quadraticCurveTo(x + 250, h * 0.15, x + 400, h * 0.12); ctx.stroke();
            const ct = Date.now() / 4000;
            ctx.fillStyle = '#E8E0D8';
            ctx.beginPath(); ctx.moveTo(x + 130, h * 0.12); ctx.lineTo(x + 175, h * 0.12 + 1);
            ctx.lineTo(x + 173 + Math.sin(ct) * 2, h * 0.12 + 42);
            ctx.lineTo(x + 132 + Math.sin(ct + 0.5) * 2, h * 0.12 + 40); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#5A8AAA'; ctx.fillRect(x + 210, h * 0.13, 22, 24);
            ctx.fillRect(x + 204, h * 0.13, 7, 12); ctx.fillRect(x + 231, h * 0.13, 7, 12);
            ctx.fillStyle = '#DD5555'; ctx.fillRect(x + 270, h * 0.13, 16, 14);
            ctx.fillStyle = '#EEE'; ctx.fillRect(x + 320, h * 0.13, 6, 14); ctx.fillRect(x + 332, h * 0.13, 6, 14);
            ctx.fillStyle = theme.wood.base;
            for (const cp of [130,175,210,232,270,320,332]) ctx.fillRect(x + cp - 1, h * 0.12 - 2, 3, 6);
            // Olive tree (x+450)
            ctx.fillStyle = theme.plant.pot;
            ctx.beginPath(); ctx.moveTo(x + 445, railY - 5); ctx.lineTo(x + 485, railY - 5);
            ctx.lineTo(x + 480, railY - 50); ctx.lineTo(x + 450, railY - 50); ctx.closePath(); ctx.fill();
            ctx.fillRect(x + 442, railY - 52, 46, 5);
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 462, railY - 80, 7, 32);
            ctx.fillStyle = theme.plant.leaf;
            ctx.beginPath(); ctx.ellipse(x + 465, railY - 95, 30, 24, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 448, railY - 85, 20, 16, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 482, railY - 88, 22, 18, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.plant.dark;
            ctx.beginPath(); ctx.arc(x + 455, railY - 80, 2, 0, Math.PI * 2);
            ctx.arc(x + 478, railY - 92, 2, 0, Math.PI * 2); ctx.fill();
            // Lemon tree (x+580)
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 595, railY - 70, 6, 32);
            ctx.fillStyle = theme.plant.leaf;
            ctx.beginPath(); ctx.ellipse(x + 598, railY - 82, 24, 20, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 583, railY - 75, 16, 14, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 612, railY - 78, 18, 15, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#EECC33';
            ctx.beginPath(); ctx.ellipse(x + 588, railY - 76, 4, 3, 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 605, railY - 90, 4, 3, -0.2, 0, Math.PI * 2); ctx.fill();
            // Cat on railing (x+700)
            const catT = Date.now() / 1500;
            ctx.fillStyle = '#5A4A3A';
            ctx.beginPath(); ctx.ellipse(x + 710, railY - 12, 11, 9, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 720, railY - 20, 8, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + 715, railY - 27); ctx.lineTo(x + 718, railY - 33); ctx.lineTo(x + 721, railY - 27); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + 721, railY - 27); ctx.lineTo(x + 724, railY - 32); ctx.lineTo(x + 727, railY - 26); ctx.fill();
            ctx.strokeStyle = '#5A4A3A'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(x + 699, railY - 10);
            ctx.quadraticCurveTo(x + 690, railY - 26, x + 695 + Math.sin(catT) * 14, railY - 36); ctx.stroke();
            ctx.fillStyle = '#CCAA33';
            ctx.beginPath(); ctx.arc(x + 717, railY - 22, 2, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 723, railY - 22, 2, 0, Math.PI * 2); ctx.fill();
            // Mosaic table + chairs (x+800)
            ctx.fillStyle = theme.wood.base; ctx.beginPath(); ctx.ellipse(x + 830, railY - 15, 32, 8, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#3A6A9A'; ctx.beginPath(); ctx.arc(x + 830, railY - 15, 5, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#AA5533'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(x + 830, railY - 15, 13, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 820, railY - 8, 2, 22); ctx.fillRect(x + 838, railY - 8, 2, 22);
            ctx.fillStyle = theme.wood.grain;
            ctx.fillRect(x + 805, railY - 5, 3, 22); ctx.fillRect(x + 805, railY - 26, 3, 22); ctx.fillRect(x + 805, railY - 8, 16, 3);
            ctx.fillRect(x + 850, railY - 5, 3, 22); ctx.fillRect(x + 850, railY - 26, 3, 22); ctx.fillRect(x + 850, railY - 8, 16, 3);
            // BBQ grill (x+930)
            ctx.fillStyle = theme.metal.dark; ctx.fillRect(x + 925, railY - 35, 35, 22);
            ctx.fillRect(x + 928, railY - 13, 4, 18); ctx.fillRect(x + 952, railY - 13, 4, 18);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 922, railY - 37, 41, 4);
            // Grill lines
            ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1;
            for (let g = 0; g < 5; g++) { ctx.beginPath(); ctx.moveTo(x + 928, railY - 32 + g * 4); ctx.lineTo(x + 957, railY - 32 + g * 4); ctx.stroke(); }
            // Ceramic fountain (x+1010)
            ctx.fillStyle = theme.ceramic.base;
            ctx.beginPath(); ctx.arc(x + 1025, railY - 30, 18, Math.PI, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 1010, railY - 30, 30, 8);
            ctx.fillStyle = theme.ceramic.dark; ctx.beginPath(); ctx.arc(x + 1025, railY - 28, 8, 0, Math.PI * 2); ctx.fill();
            // Terracotta pot collection (x+1080)
            const potSizes = [14, 10, 16, 8, 12];
            for (let p = 0; p < potSizes.length; p++) {
                ctx.fillStyle = theme.plant.pot;
                const ps = potSizes[p], px = x + 1080 + p * 22;
                ctx.fillRect(px, railY - ps, ps, ps);
                ctx.fillRect(px - 2, railY - ps - 2, ps + 4, 3);
                ctx.fillStyle = theme.plant.dark;
                ctx.beginPath(); ctx.ellipse(px + ps/2, railY - ps - 6, ps/2 + 2, ps/3, 0, 0, Math.PI * 2); ctx.fill();
            }
            // Jasmine trellis (x+1220)
            ctx.strokeStyle = theme.wood.grain; ctx.lineWidth = 1;
            for (let tv = 0; tv < 4; tv++) { ctx.beginPath(); ctx.moveTo(x + 1220 + tv * 8, h * 0.2); ctx.lineTo(x + 1220 + tv * 8, railY); ctx.stroke(); }
            for (let th = 0; th < 5; th++) { ctx.beginPath(); ctx.moveTo(x + 1220, h * 0.2 + th * 20); ctx.lineTo(x + 1244, h * 0.2 + th * 20); ctx.stroke(); }
            ctx.fillStyle = '#FFFFEE';
            for (let j = 0; j < 8; j++) { ctx.beginPath(); ctx.arc(x + 1220 + (j*5)%22, h * 0.22 + j * 12, 2.5, 0, Math.PI * 2); ctx.fill(); }
            // Wisteria hanging from pergola (x+1300)
            ctx.fillStyle = '#9A7ACC';
            for (let w2 = 0; w2 < 4; w2++) {
                const wx = x + 1300 + w2 * 18;
                for (let wy = 0; wy < 5; wy++) {
                    ctx.beginPath(); ctx.arc(wx + Math.sin(wy) * 3, h * 0.04 + wy * 6, 3 - wy * 0.4, 0, Math.PI * 2); ctx.fill();
                }
            }
            // Stone wall section (x+1400)
            ctx.fillStyle = theme.wall.trim; ctx.fillRect(x + 1400, h * 0.25, 60, railY - h * 0.25);
            ctx.strokeStyle = theme.wall.accent; ctx.lineWidth = 0.5;
            for (let sy = h * 0.27; sy < railY; sy += 12) {
                const off = ((sy * 3) % 30);
                ctx.beginPath(); ctx.moveTo(x + 1400, sy); ctx.lineTo(x + 1460, sy); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + 1400 + off, sy); ctx.lineTo(x + 1400 + off, sy + 12); ctx.stroke();
            }
            // Hanging bird cage (x+1420)
            ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 1430, h * 0.20); ctx.lineTo(x + 1430, h * 0.24); ctx.stroke();
            ctx.beginPath(); ctx.ellipse(x + 1430, h * 0.30, 10, 14, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + 1420, h * 0.30); ctx.lineTo(x + 1440, h * 0.30); ctx.stroke();
            // House number tile (x+1480)
            ctx.fillStyle = '#EEEEF8'; ctx.fillRect(x + 1478, h * 0.32, 20, 22);
            ctx.strokeStyle = '#3A5A9A'; ctx.lineWidth = 1.5; ctx.strokeRect(x + 1478, h * 0.32, 20, 22);
            ctx.fillStyle = '#3A5A9A'; ctx.font = 'bold 12px serif'; ctx.fillText('14', x + 1481, h * 0.32 + 16);
            // Neighbor's terrace hint (x+1540)
            ctx.fillStyle = theme.wall.trim; ctx.fillRect(x + 1540, h * 0.30, 50, railY - h * 0.30);
            ctx.fillStyle = theme.plant.leaf;
            ctx.beginPath(); ctx.ellipse(x + 1555, h * 0.34, 8, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 1575, h * 0.36, 6, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#E8E0D0'; ctx.fillRect(x + 1548, h * 0.40, 8, 14); // their laundry
            // Second bougainvillea pillar (x+1620)
            ctx.fillStyle = theme.wall.trim; ctx.fillRect(x + 1625, h * 0.04, 16, railY - h * 0.04);
            ctx.fillStyle = '#CC3388';
            for (let f = 0; f < 6; f++) {
                ctx.beginPath(); ctx.arc(x + 1630 + (f%2) * 6, h * 0.12 + f * 22, 3, 0, Math.PI * 2); ctx.fill();
            }
            // Hydraulic tile floor pattern hint
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = theme.floor.tile;
            repeatX(offset * 0.3, 40, 200, (tx) => {
                ctx.fillRect(x + 1680 + tx, railY + 40, 18, 18);
            });
            ctx.globalAlpha = 0.35;
        });
        ctx.globalAlpha = 1;
    }},
    { speed: 0.6, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.3;
        const gY = h - 85;
        const t = Date.now() / 2000;
        repeatX(offset, 1800, w, (x) => {
            // Geranium pots (x+20-80)
            const pots = [{px:20,c:'#DD4444',s:17},{px:48,c:'#FF8888',s:15},{px:72,c:'#EEEEEE',s:13}];
            for (const pot of pots) {
                ctx.fillStyle = theme.plant.pot;
                ctx.fillRect(x + pot.px, gY - 2, pot.s, pot.s - 2); ctx.fillRect(x + pot.px - 2, gY - 4, pot.s + 4, 3);
                ctx.fillStyle = pot.c;
                ctx.beginPath(); ctx.arc(x + pot.px + pot.s/2, gY - 10, 7, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + pot.px + pot.s/2 - 6, gY - 7, 5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + pot.px + pot.s/2 + 6, gY - 8, 5.5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = theme.plant.dark;
                ctx.beginPath(); ctx.ellipse(x + pot.px + pot.s/2 - 9, gY - 4, 5, 3, -0.5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + pot.px + pot.s/2 + 9, gY - 5, 5, 3, 0.5, 0, Math.PI * 2); ctx.fill();
            }
            // Esparto mat (x+140)
            ctx.fillStyle = theme.fabric.base; ctx.beginPath(); ctx.ellipse(x + 165, gY + 4, 28, 5, 0, 0, Math.PI * 2); ctx.fill();
            // Sangria pitcher (x+240)
            ctx.fillStyle = '#880022';
            ctx.beginPath(); ctx.ellipse(x + 255, gY - 10, 13, 18, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#880022'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(x + 270, gY - 10, 9, -Math.PI/2, Math.PI/2); ctx.stroke();
            ctx.fillStyle = '#DD8800'; ctx.beginPath(); ctx.arc(x + 252, gY - 26, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#DDCC00'; ctx.beginPath(); ctx.arc(x + 258, gY - 28, 2.5, 0, Math.PI * 2); ctx.fill();
            // Beer glass (x+310)
            ctx.fillStyle = 'rgba(200, 160, 40, 0.5)'; ctx.fillRect(x + 310, gY - 18, 12, 18);
            ctx.fillStyle = 'rgba(255, 255, 240, 0.5)'; ctx.fillRect(x + 310, gY - 22, 12, 6);
            // Bowl of olives (x+350)
            ctx.fillStyle = '#D8D0B0'; ctx.beginPath(); ctx.ellipse(x + 360, gY - 2, 10, 4, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#4A6A2A';
            ctx.beginPath(); ctx.arc(x + 356, gY - 4, 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 362, gY - 5, 2, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 359, gY - 3, 2.5, 0, Math.PI * 2); ctx.fill();
            // Herb pots (x+420)
            ctx.fillStyle = theme.plant.pot; ctx.fillRect(x + 415, gY - 2, 16, 14);
            ctx.fillStyle = theme.plant.dark;
            for (let l = 0; l < 4; l++) { ctx.beginPath(); ctx.ellipse(x + 423 + (l-2)*4, gY - 12 - l * 2, 4, 3, 0, 0, Math.PI * 2); ctx.fill(); }
            ctx.fillStyle = theme.plant.pot; ctx.fillRect(x + 440, gY - 2, 16, 14);
            ctx.fillStyle = theme.wood.grain; ctx.fillRect(x + 447, gY - 34, 2, 24);
            ctx.fillStyle = theme.plant.leaf;
            ctx.beginPath(); ctx.ellipse(x + 444, gY - 18, 7, 4, -0.3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#DD3322'; ctx.beginPath(); ctx.arc(x + 451, gY - 14, 3, 0, Math.PI * 2); ctx.fill();
            // Lizard (x+510)
            ctx.fillStyle = theme.plant.leaf;
            const lx = x + 515 + Math.sin(t * 1.5) * 2;
            ctx.beginPath(); ctx.ellipse(lx, gY - 18, 9, 3, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(lx + 10, gY - 19, 4, 2.5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = theme.plant.leaf; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(lx - 9, gY - 18);
            ctx.quadraticCurveTo(lx - 15, gY - 18 + Math.sin(t * 3) * 3, lx - 20, gY - 19); ctx.stroke();
            // Garden tools (x+580)
            ctx.fillStyle = theme.wood.grain; ctx.save(); ctx.translate(x + 580, gY);
            ctx.rotate(-0.15); ctx.fillRect(0, -62, 3.5, 62);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(-7, -65, 16, 3);
            for (let t2 = 0; t2 < 5; t2++) ctx.fillRect(-5 + t2 * 3.5, -72, 1.5, 9); ctx.restore();
            // Watering can (x+640)
            ctx.fillStyle = '#3A7A4A';
            ctx.fillRect(x + 635, gY - 16, 22, 18); ctx.fillRect(x + 633, gY - 18, 26, 3);
            ctx.beginPath(); ctx.moveTo(x + 657, gY - 14); ctx.lineTo(x + 667, gY - 22);
            ctx.lineTo(x + 669, gY - 20); ctx.lineTo(x + 659, gY - 12); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#3A7A4A'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(x + 646, gY - 22, 9, Math.PI, Math.PI * 2); ctx.stroke();
            // Chanclas (x+720)
            ctx.fillStyle = '#DD5500'; ctx.beginPath(); ctx.ellipse(x + 722, gY + 4, 9, 4, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#CC4400'; ctx.beginPath(); ctx.ellipse(x + 738, gY + 5, 9, 4, -0.15, 0, Math.PI * 2); ctx.fill();
            // Garden hose (x+800)
            ctx.strokeStyle = '#3AAA3A'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(x + 815, gY + 2, 12, 0, Math.PI * 1.5); ctx.stroke();
            ctx.beginPath(); ctx.arc(x + 815, gY + 2, 8, 0, Math.PI * 1.5); ctx.stroke();
            // Outdoor ashtray (x+880)
            ctx.fillStyle = theme.metal.base; ctx.beginPath(); ctx.ellipse(x + 890, gY + 2, 8, 3, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 885, gY - 2, 10, 4);
            // Citronella candle (x+940)
            ctx.fillStyle = '#DDCC88'; ctx.fillRect(x + 935, gY - 8, 12, 10);
            ctx.fillStyle = '#FFAA30'; const flicker = Math.sin(t * 5) * 1.5;
            ctx.beginPath(); ctx.ellipse(x + 941 + flicker * 0.3, gY - 11, 2 + flicker * 0.2, 4, 0, 0, Math.PI * 2); ctx.fill();
            // Snail (x+1010)
            ctx.fillStyle = '#AA8855';
            ctx.beginPath(); ctx.arc(x + 1015, gY + 1, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#887744';
            ctx.beginPath(); ctx.ellipse(x + 1020, gY + 2, 5, 2, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#887744'; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(x + 1024, gY + 1); ctx.lineTo(x + 1027, gY - 2);
            ctx.moveTo(x + 1025, gY + 1); ctx.lineTo(x + 1028, gY - 1); ctx.stroke();
            // Bubble wand (x+1080)
            ctx.fillStyle = '#DD55DD'; ctx.fillRect(x + 1082, gY - 15, 2, 18);
            ctx.strokeStyle = '#DD55DD'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(x + 1083, gY - 18, 5, 0, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = '#88CCDD'; ctx.fillRect(x + 1078, gY, 10, 8);
            // Folded beach towels (x+1150)
            ctx.fillStyle = '#DDAA33'; ctx.fillRect(x + 1145, gY - 8, 26, 4);
            ctx.fillStyle = '#33AADD'; ctx.fillRect(x + 1147, gY - 12, 22, 4);
            ctx.fillStyle = '#DD5555'; ctx.fillRect(x + 1146, gY - 15, 24, 3);
            // Charcoal bag (x+1230)
            ctx.fillStyle = theme.metal.dark; ctx.fillRect(x + 1225, gY - 16, 20, 18);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 1225, gY - 18, 20, 4);
            // Abanico fan (x+1310)
            ctx.fillStyle = '#DD5555';
            ctx.beginPath();
            for (let f = 0; f < 8; f++) {
                const a = -0.6 + f * 0.15;
                ctx.lineTo(x + 1320 + Math.cos(a) * 22, gY - 4 + Math.sin(a) * 22);
            }
            ctx.lineTo(x + 1320, gY - 4); ctx.closePath(); ctx.fill();
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1318, gY - 6, 4, 10);
            // Small radio (x+1390)
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1385, gY - 14, 22, 16);
            ctx.fillStyle = '#DDDDCC'; ctx.fillRect(x + 1388, gY - 12, 10, 8);
            ctx.fillStyle = theme.metal.dark; ctx.beginPath(); ctx.arc(x + 1402, gY - 10, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 1393, gY - 18, 2, 6);
            // Music notes (animated)
            ctx.fillStyle = theme.metal.base; ctx.globalAlpha = 0.15;
            const noteY = gY - 20 + Math.sin(t * 2) * 6;
            ctx.beginPath(); ctx.arc(x + 1410, noteY, 2, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 1412, noteY - 8, 1, 8);
            ctx.beginPath(); ctx.arc(x + 1418, noteY - 4 + Math.sin(t * 2.5) * 4, 2, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 1420, noteY - 12 + Math.sin(t * 2.5) * 4, 1, 8);
            ctx.globalAlpha = 0.3;
            // More flower pots (x+1480)
            ctx.fillStyle = theme.plant.pot; ctx.fillRect(x + 1478, gY - 2, 14, 12);
            ctx.fillRect(x + 1476, gY - 4, 18, 3);
            ctx.fillStyle = '#FF8888';
            ctx.beginPath(); ctx.arc(x + 1485, gY - 10, 6, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.plant.dark;
            ctx.beginPath(); ctx.ellipse(x + 1479, gY - 6, 4, 3, -0.3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 1491, gY - 7, 4, 3, 0.3, 0, Math.PI * 2); ctx.fill();
            // Third herb pot (x+1540)
            ctx.fillStyle = theme.plant.pot; ctx.fillRect(x + 1538, gY - 2, 14, 12);
            ctx.fillStyle = theme.plant.leaf;
            ctx.beginPath(); ctx.arc(x + 1545, gY - 10, 8, 0, Math.PI * 2); ctx.fill();
            // More pots (x+1610)
            ctx.fillStyle = theme.plant.pot; ctx.fillRect(x + 1608, gY - 2, 12, 10);
            ctx.fillStyle = theme.plant.leaf; ctx.beginPath(); ctx.arc(x + 1614, gY - 8, 7, 0, Math.PI * 2); ctx.fill();
            // Second pair of chanclas (x+1690)
            ctx.fillStyle = '#33AADD';
            ctx.beginPath(); ctx.ellipse(x + 1692, gY + 4, 8, 4, 0.1, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 1706, gY + 5, 8, 4, -0.1, 0, Math.PI * 2); ctx.fill();
        });
        // Fallen petals (separate sparse repeat)
        ctx.fillStyle = '#CC3388'; ctx.globalAlpha = 0.2;
        repeatX(offset * 0.6, 250, w, (x2) => {
            ctx.beginPath(); ctx.ellipse(x2 + 40, gY + 6, 3, 2, 0.5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x2 + 120, gY + 4, 2.5, 1.5, -0.3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x2 + 190, gY + 7, 3, 2, 0.8, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
    }},
];
