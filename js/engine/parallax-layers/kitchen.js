import { getTheme } from '../renderers/level-themes.js';

function repeatX(offset, spacing, canvasW, callback) {
    const start = -(offset % spacing) - spacing;
    for (let x = start; x < canvasW + spacing; x += spacing) {
        callback(x);
    }
}

export const kitchenLayers = [
    // FAR — Tiles + window + vine border + Virgin Mary
    { speed: 0.05, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = theme.accent1; ctx.lineWidth = 0.5;
        repeatX(offset, 30, w, (x) => {
            for (let y = 10; y < h * 0.55; y += 30) {
                ctx.strokeRect(x, y, 28, 28);
                ctx.beginPath();
                ctx.moveTo(x + 14, y + 4); ctx.lineTo(x + 14, y + 24);
                ctx.moveTo(x + 4, y + 14); ctx.lineTo(x + 24, y + 14); ctx.stroke();
                ctx.fillStyle = theme.accent1;
                ctx.beginPath();
                ctx.arc(x + 6, y + 6, 1.5, 0, Math.PI * 2); ctx.arc(x + 22, y + 6, 1.5, 0, Math.PI * 2);
                ctx.arc(x + 6, y + 22, 1.5, 0, Math.PI * 2); ctx.arc(x + 22, y + 22, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        });
        ctx.globalAlpha = 0.14;
        ctx.fillStyle = '#5A7A3A';
        repeatX(offset, 80, w, (x) => {
            const bY = h * 0.33;
            ctx.fillRect(x, bY, 80, 2);
            ctx.beginPath(); ctx.ellipse(x + 20, bY - 5, 6, 4, -0.3, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(x + 55, bY + 5, 5, 3.5, 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#6A3A6A';
            ctx.beginPath(); ctx.arc(x + 38, bY - 4, 3, 0, Math.PI * 2);
            ctx.arc(x + 42, bY - 2, 3, 0, Math.PI * 2); ctx.arc(x + 40, bY + 2, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#5A7A3A';
        });

        ctx.globalAlpha = 0.25;
        repeatX(offset, 1800, w, (x) => {
            // Window 1 — clothesline
            const wx = x + 350, wy = h * 0.06;
            ctx.fillStyle = theme.wood.base; ctx.fillRect(wx, wy, 85, 100);
            ctx.fillStyle = '#B8D8E8'; ctx.fillRect(wx + 5, wy + 5, 75, 75);
            ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(wx + 8, wy + 28); ctx.lineTo(wx + 77, wy + 26); ctx.stroke();
            ctx.fillStyle = '#E8E0D0'; ctx.fillRect(wx + 14, wy + 28, 12, 18);
            ctx.fillStyle = '#5A8AAA'; ctx.fillRect(wx + 32, wy + 27, 10, 14);
            ctx.fillStyle = '#AA5A5A'; ctx.fillRect(wx + 50, wy + 27, 7, 16); ctx.fillRect(wx + 61, wy + 27, 7, 16);
            ctx.fillStyle = '#4A8A3A';
            ctx.beginPath(); ctx.ellipse(wx + 25, wy + 65, 10, 7, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.wood.base;
            ctx.fillRect(wx + 40, wy + 5, 3, 75); ctx.fillRect(wx + 5, wy + 40, 75, 3);
            ctx.fillRect(wx - 2, wy + 82, 89, 6);

            // Virgin Mary mural
            ctx.globalAlpha = 0.12;
            ctx.fillStyle = '#7A9AB0'; ctx.fillRect(x + 120, h * 0.08, 50, 60);
            ctx.strokeStyle = '#5A7A9A'; ctx.lineWidth = 2; ctx.strokeRect(x + 120, h * 0.08, 50, 60);
            ctx.fillStyle = '#5A8AAA';
            ctx.beginPath(); ctx.arc(x + 145, h * 0.08 + 18, 9, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + 136, h * 0.08 + 26); ctx.lineTo(x + 145, h * 0.08 + 55);
            ctx.lineTo(x + 154, h * 0.08 + 26); ctx.closePath(); ctx.fill();

            // Ventilation grate
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = '#8A8878'; ctx.fillRect(x + 700, 14, 32, 24);
            ctx.strokeStyle = '#6A6858'; ctx.lineWidth = 1;
            for (let gy = 18; gy < 36; gy += 4) {
                ctx.beginPath(); ctx.moveTo(x + 703, gy); ctx.lineTo(x + 729, gy); ctx.stroke();
            }

            // Window 2 — frosted (small, ventilation)
            ctx.globalAlpha = 0.18;
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1200, h * 0.05, 50, 40);
            ctx.fillStyle = '#D8E8D8'; ctx.fillRect(x + 1204, h * 0.06, 42, 32);
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1223, h * 0.06, 3, 32);

            // Grease stain shadow above stove area
            ctx.globalAlpha = 0.04;
            ctx.fillStyle = '#9A9080';
            ctx.beginPath(); ctx.ellipse(x + 900, h * 0.18, 40, 25, 0, 0, Math.PI * 2); ctx.fill();

            ctx.globalAlpha = 0.25;
        });

        // Steam haze
        ctx.globalAlpha = 0.06;
        ctx.fillStyle = '#D8D0C0';
        const t = Date.now() / 2000;
        repeatX(offset, 800, w, (x) => {
            for (let s = 0; s < 3; s++) {
                const sx = x + 200 + s * 30 + Math.sin(t + s * 1.5) * 8;
                const sy = h * 0.12 + Math.sin(t * 0.8 + s) * 10;
                ctx.beginPath(); ctx.arc(sx, sy, 10 + s * 2, 0, Math.PI * 2); ctx.fill();
            }
        });
        ctx.globalAlpha = 1;
    }},

    // MID — Cabinets, pots, garlic, peppers, paella, corkboard, radio, knife strip, etc.
    { speed: 0.2, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.35;
        repeatX(offset, 1800, w, (x) => {
            // === UPPER CABINETS (x+20, y:3-25%) ===
            ctx.fillStyle = theme.wood.dark;
            ctx.fillRect(x + 20, h * 0.03, 105, h * 0.22);
            ctx.fillStyle = theme.accent2;
            ctx.fillRect(x + 25, h * 0.05, 45, h * 0.08); ctx.fillRect(x + 25, h * 0.15, 45, h * 0.08);
            ctx.fillRect(x + 75, h * 0.05, 45, h * 0.08);
            ctx.fillStyle = theme.metal.light;
            ctx.beginPath(); ctx.arc(x + 48, h * 0.09, 8, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 98, h * 0.09, 8, 0, Math.PI * 2); ctx.fill();
            // Second cabinet
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 150, h * 0.03, 80, h * 0.22);
            ctx.fillStyle = theme.accent2; ctx.fillRect(x + 155, h * 0.05, 70, h * 0.18);
            ctx.fillStyle = theme.metal.light;
            for (let c = 0; c < 4; c++) ctx.fillRect(x + 163 + c * 15, h * 0.1, 8, 10);

            // === HANGING COPPER POTS (x+270, y:3-15%) ===
            ctx.fillStyle = theme.metal.dark; ctx.fillRect(x + 270, h * 0.03, 110, 3);
            const pots = [{dx:285,r:14,c:'#AA7A4A'},{dx:315,r:10,c:'#B8884A'},{dx:340,r:16,c:'#9A6A3A'},{dx:362,r:9,c:'#AA7A4A'}];
            for (const p of pots) {
                ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(x + p.dx, h * 0.03 + 3); ctx.lineTo(x + p.dx, h * 0.03 + 12); ctx.stroke();
                ctx.fillStyle = p.c;
                ctx.beginPath(); ctx.arc(x + p.dx, h * 0.03 + 14, p.r, 0, Math.PI); ctx.fill();
                ctx.fillRect(x + p.dx - p.r - 4, h * 0.03 + 12, 4, 3);
                ctx.fillRect(x + p.dx + p.r, h * 0.03 + 12, 4, 3);
            }

            // === GARLIC STRING (x+420, y:3-18%) ===
            ctx.strokeStyle = '#8A7A5A'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 425, h * 0.03); ctx.lineTo(x + 425, h * 0.03 + 65); ctx.stroke();
            for (let g = 0; g < 4; g++) {
                ctx.fillStyle = theme.ceramic.base;
                ctx.beginPath(); ctx.arc(x + 425, h * 0.03 + 15 + g * 14, 6, 0, Math.PI * 2); ctx.fill();
            }

            // === DRIED PEPPERS (x+450, y:3-16%) ===
            ctx.strokeStyle = '#8A7A5A'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 455, h * 0.03); ctx.lineTo(x + 455, h * 0.03 + 55); ctx.stroke();
            for (let p = 0; p < 4; p++) {
                ctx.fillStyle = '#AA2020';
                ctx.beginPath(); ctx.ellipse(x + 455 + (p%2?5:-5), h * 0.03 + 12 + p * 12, 5, 7, (p%2?0.2:-0.2), 0, Math.PI * 2); ctx.fill();
            }

            // === BRAIDED ONION STRING (x+480, y:3-16%) ===
            ctx.strokeStyle = '#8A7A5A'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 485, h * 0.03); ctx.lineTo(x + 485, h * 0.03 + 58); ctx.stroke();
            for (let o = 0; o < 3; o++) {
                ctx.fillStyle = '#C8A050';
                ctx.beginPath(); ctx.arc(x + 485, h * 0.03 + 18 + o * 16, 7, 0, Math.PI * 2); ctx.fill();
            }

            // === MAGNETIC KNIFE STRIP (x+540, y:22%) ===
            ctx.fillStyle = theme.metal.dark; ctx.fillRect(x + 530, h * 0.22, 55, 3);
            ctx.fillStyle = theme.metal.light;
            const knives = [4, 18, 30, 42];
            for (const k of knives) {
                ctx.fillRect(x + 533 + k, h * 0.22 + 3, 2, 15 + (k % 8));
            }

            // === PAELLA PAN (x+640, y:28-38%) ===
            ctx.fillStyle = '#3A3A3A';
            ctx.beginPath(); ctx.arc(x + 660, h * 0.33, 30, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#5A5A5A';
            ctx.beginPath(); ctx.arc(x + 660, h * 0.33, 25, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#3A3A3A';
            ctx.fillRect(x + 624, h * 0.33 - 3, 12, 6); ctx.fillRect(x + 684, h * 0.33 - 3, 12, 6);

            // === CORKBOARD (x+740, y:30-42%) ===
            ctx.fillStyle = theme.wood.light; ctx.fillRect(x + 740, h * 0.30, 60, 48);
            ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 2; ctx.strokeRect(x + 740, h * 0.30, 60, 48);
            ctx.fillStyle = '#FFFDE8'; ctx.fillRect(x + 748, h * 0.31, 18, 20);
            ctx.fillStyle = '#E8E8FF'; ctx.fillRect(x + 772, h * 0.32, 16, 16);
            ctx.fillStyle = '#FFE8E8'; ctx.fillRect(x + 752, h * 0.36 + 14, 20, 14);
            ctx.fillStyle = '#DD3333'; ctx.beginPath(); ctx.arc(x + 757, h * 0.31, 2, 0, Math.PI * 2); ctx.fill();

            // === CERAMIC ROOSTER (x+850, y:24%) ===
            ctx.fillStyle = '#AA4444';
            ctx.beginPath(); ctx.ellipse(x + 860, h * 0.28, 10, 12, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 868, h * 0.24, 6, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#DD3333';
            ctx.beginPath(); ctx.moveTo(x + 868, h * 0.22); ctx.lineTo(x + 870, h * 0.19);
            ctx.lineTo(x + 866, h * 0.21); ctx.closePath(); ctx.fill();
            ctx.fillStyle = '#DDAA00';
            ctx.beginPath(); ctx.moveTo(x + 873, h * 0.24); ctx.lineTo(x + 878, h * 0.25);
            ctx.lineTo(x + 873, h * 0.26); ctx.closePath(); ctx.fill();
            // Tail
            ctx.fillStyle = '#227744';
            ctx.beginPath(); ctx.moveTo(x + 850, h * 0.28); ctx.quadraticCurveTo(x + 840, h * 0.22, x + 845, h * 0.18); ctx.lineTo(x + 850, h * 0.25); ctx.closePath(); ctx.fill();

            // === CUTTING BOARD (x+920, y:38%) ===
            ctx.fillStyle = '#AA8844';
            ctx.save(); ctx.translate(x + 920, h * 0.38); ctx.rotate(-0.15);
            ctx.beginPath();
            ctx.ellipse(0, 0, 8, 18, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(-4, -22, 8, 6);
            ctx.restore();

            // === KITCHEN CLOCK — fruit shaped (x+970, y:10%) ===
            ctx.fillStyle = '#DD3333';
            ctx.beginPath(); ctx.arc(x + 985, h * 0.14, 16, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#33AA33';
            ctx.beginPath(); ctx.ellipse(x + 985, h * 0.10, 4, 6, 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.ceramic.base;
            ctx.beginPath(); ctx.arc(x + 985, h * 0.14, 12, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 985, h * 0.14); ctx.lineTo(x + 985, h * 0.14 - 8); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + 985, h * 0.14); ctx.lineTo(x + 991, h * 0.14 + 3); ctx.stroke();

            // === HANGING COLANDER (x+1040, y:5%) ===
            ctx.fillStyle = theme.metal.light;
            ctx.beginPath(); ctx.arc(x + 1050, h * 0.08, 14, 0, Math.PI); ctx.fill();
            ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(x + 1050, h * 0.03); ctx.lineTo(x + 1050, h * 0.06); ctx.stroke();
            ctx.fillStyle = '#3A6A8A';
            ctx.beginPath(); ctx.ellipse(x + 1050, h * 0.06, 15, 4, 0, 0, Math.PI * 2); ctx.fill();
            // Dots for holes
            ctx.fillStyle = theme.metal.base;
            for (let d = 0; d < 5; d++) ctx.beginPath(), ctx.arc(x + 1042 + d * 4, h * 0.08 + 4, 1, 0, Math.PI * 2), ctx.fill();

            // === MORTAR & PESTLE (x+1110, y:36%) ===
            ctx.fillStyle = '#8A8A78';
            ctx.beginPath(); ctx.moveTo(x + 1100, h * 0.40); ctx.quadraticCurveTo(x + 1100, h * 0.36, x + 1110, h * 0.36);
            ctx.lineTo(x + 1130, h * 0.36); ctx.quadraticCurveTo(x + 1140, h * 0.36, x + 1140, h * 0.40);
            ctx.lineTo(x + 1100, h * 0.40); ctx.closePath(); ctx.fill();
            // Pestle
            ctx.fillStyle = '#7A7A68';
            ctx.save(); ctx.translate(x + 1120, h * 0.36); ctx.rotate(-0.4);
            ctx.fillRect(-2, -18, 4, 22); ctx.restore();

            // === SHELF RADIO (x+1180, y:28%) ===
            ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1175, h * 0.28, 30, 20);
            ctx.fillStyle = '#DDDDCC'; ctx.fillRect(x + 1178, h * 0.29, 14, 10);
            ctx.fillStyle = '#333';
            ctx.beginPath(); ctx.arc(x + 1198, h * 0.30, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 1188, h * 0.26, 2, 8);

            // === WINE RACK (x+1260, y:42-56%) ===
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1255, h * 0.42, 35, 48);
            ctx.fillStyle = '#2A4A2A';
            for (let wb = 0; wb < 3; wb++) {
                ctx.save(); ctx.translate(x + 1263, h * 0.44 + wb * 14); ctx.rotate(0.1);
                ctx.fillRect(0, 0, 20, 6); ctx.restore();
            }

            // === "CUINA" TILE (x+1340, y:20%) ===
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 1335, h * 0.20, 52, 22);
            ctx.strokeStyle = theme.accent1; ctx.lineWidth = 1.5; ctx.strokeRect(x + 1335, h * 0.20, 52, 22);

            // === PORRÓ (x+1420, y:30%) ===
            ctx.fillStyle = 'rgba(120, 180, 120, 0.7)';
            ctx.beginPath(); ctx.ellipse(x + 1430, h * 0.33, 10, 14, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = 'rgba(120, 180, 120, 0.7)'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(x + 1440, h * 0.33 - 5); ctx.quadraticCurveTo(x + 1450, h * 0.33 - 18, x + 1447, h * 0.33 - 22); ctx.stroke();

            // === PAPER TOWEL HOLDER (x+1500, y:24%) ===
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 1510, h * 0.24, 3, 16);
            ctx.fillStyle = theme.ceramic.base;
            ctx.beginPath(); ctx.ellipse(x + 1511, h * 0.24 + 8, 10, 14, 0, 0, Math.PI * 2); ctx.fill();

            // === SPICE JARS (x+1570, y:26%) ===
            ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1560, h * 0.28, 80, 4);
            const spiceColors = ['#AA3333', '#33AA33', '#AAAA33', '#AA6633'];
            for (let s = 0; s < 4; s++) {
                ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 1565 + s * 18, h * 0.24, 12, 16);
                ctx.fillStyle = spiceColors[s]; ctx.fillRect(x + 1567 + s * 18, h * 0.25, 8, 5);
            }

            // === HERB BUNDLES (x+1680, y:3-14%) ===
            const herbs = [{dx:1680,c:'#4A7A3A'},{dx:1700,c:'#3A6A2A'},{dx:1718,c:'#5A8A4A'}];
            for (const hb of herbs) {
                ctx.strokeStyle = '#8A7A5A'; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(x + hb.dx, h * 0.03); ctx.lineTo(x + hb.dx, h * 0.03 + 10); ctx.stroke();
                ctx.fillStyle = hb.c;
                for (let l = 0; l < 4; l++) {
                    ctx.beginPath();
                    ctx.ellipse(x + hb.dx + (l-2)*3, h * 0.03 + 12 + l * 4, 3, 6, (l-2)*0.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // === BUTCHER CALENDAR (x+1760, y:14%) ===
            ctx.fillStyle = '#EEEEEE'; ctx.fillRect(x + 1755, h * 0.14, 32, 38);
            ctx.fillStyle = '#883333'; ctx.fillRect(x + 1755, h * 0.14, 32, 10);
            ctx.fillStyle = '#888';
            for (let cy = 0; cy < 3; cy++) for (let cx = 0; cx < 4; cx++)
                ctx.fillRect(x + 1760 + cx * 6, h * 0.14 + 14 + cy * 6, 3, 3);
        });
        ctx.globalAlpha = 1;
    }},

    // NEAR — Counter/floor items
    { speed: 0.5, draw(ctx, offset, w, h) {
        const theme = getTheme();
        ctx.globalAlpha = 0.3;
        const gY = h - 85;
        repeatX(offset, 1800, w, (x) => {
            // === FRUIT BOWL (x+30) ===
            ctx.fillStyle = '#8A7A5A';
            ctx.beginPath(); ctx.ellipse(x + 50, gY, 32, 10, 0, 0, Math.PI); ctx.fill();
            ctx.fillStyle = '#DD8830';
            ctx.beginPath(); ctx.arc(x + 38, gY - 12, 9, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 58, gY - 14, 8, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#DDCC44';
            ctx.beginPath(); ctx.ellipse(x + 48, gY - 20, 9, 6, 0.3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#DDC844'; ctx.lineWidth = 4; ctx.strokeStyle = '#DDC844';
            ctx.beginPath(); ctx.arc(x + 65, gY - 18, 12, Math.PI * 0.8, Math.PI * 1.5); ctx.stroke();

            // === MOKA POT (x+140) ===
            ctx.fillStyle = theme.metal.base;
            ctx.fillRect(x + 138, gY - 22, 18, 14); ctx.fillRect(x + 140, gY - 36, 14, 14);
            ctx.beginPath(); ctx.arc(x + 147, gY - 38, 3, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#3A3A3A'; ctx.fillRect(x + 156, gY - 34, 4, 18);

            // === BREAD BASKET (x+220) ===
            ctx.fillStyle = '#A08050';
            ctx.beginPath(); ctx.ellipse(x + 240, gY - 4, 24, 8, 0, Math.PI, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 216, gY - 4, 48, 12);
            ctx.fillStyle = '#D4AA60';
            ctx.save(); ctx.translate(x + 232, gY - 10); ctx.rotate(-0.2);
            ctx.beginPath(); ctx.ellipse(0, 0, 26, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();

            // === COLA CAO (x+330) ===
            ctx.fillStyle = '#8B2500'; ctx.fillRect(x + 325, gY - 30, 20, 28);
            ctx.fillStyle = '#FFD700'; ctx.fillRect(x + 327, gY - 22, 16, 12);
            ctx.fillStyle = '#6A1800'; ctx.fillRect(x + 324, gY - 32, 22, 4);

            // === GALLETAS MARÍA (x+395) ===
            ctx.fillStyle = '#AA8844'; ctx.fillRect(x + 390, gY - 18, 26, 16);
            ctx.fillStyle = '#C8A855'; ctx.fillRect(x + 393, gY - 16, 20, 5);

            // === OLIVE OIL TIN (x+460) ===
            ctx.fillStyle = '#5A8A3A'; ctx.fillRect(x + 455, gY - 26, 18, 26);
            ctx.fillStyle = '#DDCC88'; ctx.fillRect(x + 457, gY - 20, 14, 10);

            // === HERB POTS (x+530) ===
            ctx.fillStyle = '#B86B3A'; ctx.fillRect(x + 525, gY - 16, 16, 14);
            ctx.fillStyle = '#3A8A28'; ctx.beginPath(); ctx.arc(x + 533, gY - 22, 9, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#B86B3A'; ctx.fillRect(x + 548, gY - 16, 16, 14);
            ctx.fillStyle = '#2A7A1A'; ctx.beginPath(); ctx.arc(x + 556, gY - 24, 10, 0, Math.PI * 2); ctx.fill();

            // === BOTIJO (x+620) ===
            ctx.fillStyle = '#C4956A';
            ctx.beginPath(); ctx.ellipse(x + 635, gY - 14, 16, 18, 0, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.moveTo(x + 651, gY - 22); ctx.lineTo(x + 660, gY - 26);
            ctx.lineTo(x + 651, gY - 16); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#C4956A'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.arc(x + 635, gY - 34, 9, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke();

            // === STACK OF PLATES (x+720) ===
            ctx.fillStyle = theme.ceramic.base;
            for (let pl = 0; pl < 4; pl++) {
                ctx.beginPath(); ctx.ellipse(x + 735, gY - 4 - pl * 3, 14, 4, 0, 0, Math.PI * 2); ctx.fill();
            }

            // === CHECKERED TOWEL (x+800) ===
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 795, gY - 24, 22, 28);
            ctx.fillStyle = '#DD5555';
            for (let ty = 0; ty < 4; ty++) for (let tx = 0; tx < 3; tx++) {
                if ((ty + tx) % 2 === 0) ctx.fillRect(x + 797 + tx * 6, gY - 22 + ty * 6, 5, 5);
            }

            // === TOASTER (x+880) ===
            ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 875, gY - 18, 22, 16);
            ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 878, gY - 22, 6, 5); ctx.fillRect(x + 888, gY - 22, 6, 5);

            // === SUGAR BOWL (x+950) ===
            ctx.fillStyle = theme.ceramic.base;
            ctx.beginPath(); ctx.ellipse(x + 960, gY - 4, 10, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(x + 953, gY - 10, 14, 8);
            ctx.fillStyle = theme.ceramic.dark;
            ctx.beginPath(); ctx.ellipse(x + 960, gY - 10, 7, 3, 0, 0, Math.PI * 2); ctx.fill();

            // === CAT FOOD BOWL (x+1040) ===
            ctx.fillStyle = '#6A6A8A';
            ctx.beginPath(); ctx.ellipse(x + 1050, gY + 2, 14, 5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#8A6A3A';
            ctx.beginPath(); ctx.ellipse(x + 1050, gY + 1, 10, 3, 0, 0, Math.PI * 2); ctx.fill();

            // === WOODEN FRUIT CRATE (x+1120) ===
            ctx.fillStyle = '#AA8844'; ctx.fillRect(x + 1115, gY - 14, 36, 16);
            ctx.strokeStyle = '#8A6A34'; ctx.lineWidth = 0.5;
            ctx.strokeRect(x + 1115, gY - 14, 36, 16);
            ctx.beginPath(); ctx.moveTo(x + 1115, gY - 6); ctx.lineTo(x + 1151, gY - 6); ctx.stroke();

            // === MOP & BUCKET (x+1210) ===
            ctx.fillStyle = '#4A6A8A';
            ctx.fillRect(x + 1205, gY - 18, 24, 20); ctx.fillRect(x + 1202, gY - 20, 30, 3);
            ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(x + 1217, gY - 24, 9, Math.PI, Math.PI * 2); ctx.stroke();
            ctx.fillStyle = '#AA8844'; ctx.fillRect(x + 1232, gY - 70, 4, 70);

            // === RECYCLING BAGS (x+1310) ===
            ctx.fillStyle = '#CCAA22';
            ctx.beginPath(); ctx.ellipse(x + 1315, gY - 4, 11, 13, -0.1, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#3A8A3A';
            ctx.beginPath(); ctx.ellipse(x + 1335, gY - 3, 10, 12, 0.1, 0, Math.PI * 2); ctx.fill();

            // === STEP STOOL (x+1410) ===
            ctx.fillStyle = '#AA8844';
            ctx.fillRect(x + 1405, gY - 12, 24, 4);
            ctx.fillRect(x + 1408, gY - 8, 4, 10); ctx.fillRect(x + 1422, gY - 8, 4, 10);

            // === ESPRESSO CUP (x+1490) ===
            ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 1488, gY - 10, 9, 8);
            ctx.strokeStyle = theme.ceramic.base; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(x + 1499, gY - 6, 3, -Math.PI/2, Math.PI/2); ctx.stroke();

            // === THIRD HERB (x+1560) ===
            ctx.fillStyle = '#B86B3A'; ctx.fillRect(x + 1558, gY - 16, 14, 14);
            ctx.fillStyle = '#5A8A3A';
            ctx.beginPath(); ctx.ellipse(x + 1565, gY - 22, 8, 6, 0, 0, Math.PI * 2); ctx.fill();

            // === SECOND FRUIT CRATE (x+1660) ===
            ctx.fillStyle = '#AA8844'; ctx.fillRect(x + 1655, gY - 16, 38, 18);
            ctx.strokeStyle = '#8A6A34'; ctx.lineWidth = 0.5; ctx.strokeRect(x + 1655, gY - 16, 38, 18);
            // Oranges inside
            ctx.fillStyle = '#DD8830';
            ctx.beginPath(); ctx.arc(x + 1665, gY - 10, 5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + 1678, gY - 8, 5, 0, Math.PI * 2); ctx.fill();
        });
        ctx.globalAlpha = 1;
    }},
];
