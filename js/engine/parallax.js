// Multi-layered parallax backgrounds — 3 procedural layers per level
// Each layer uses ONE wide repeat unit (~1800px = 2 screens) for maximum variety
// Vertical zones: FAR=full wall, MID=wall-mounted (y:3-72%), NEAR=floor (y:ground level)
import { getTheme } from './renderers/level-themes.js';

export class ParallaxRenderer {
    render(ctx, cameraX, canvasW, canvasH, levelName, levelColor) {
        const layers = PARALLAX_LAYERS[levelName];
        if (!layers) return;
        for (const layer of layers) {
            const offset = cameraX * layer.speed;
            ctx.save();
            layer.draw(ctx, offset, canvasW, canvasH, levelColor);
            ctx.restore();
        }
    }
}

function repeatX(offset, spacing, canvasW, callback) {
    const start = -(offset % spacing) - spacing;
    for (let x = start; x < canvasW + spacing; x += spacing) {
        callback(x);
    }
}

function drawStar(ctx, cx, cy, points, outerR, innerR) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const angle = (i * Math.PI) / points - Math.PI / 2;
        ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();
}

const PARALLAX_LAYERS = {

    // =====================================================
    // LEVEL 1: LIVING ROOM
    // =====================================================
    'Living Room': [
        // FAR — Wallpaper + windows + architectural details
        { speed: 0.05, draw(ctx, offset, w, h) {
            const theme = getTheme();
            // Damask wallpaper pattern
            ctx.globalAlpha = 0.12;
            ctx.strokeStyle = theme.wood.grain;
            ctx.lineWidth = 1;
            repeatX(offset, 60, w, (x) => {
                for (let y = 20; y < h - 100; y += 60) {
                    ctx.beginPath();
                    ctx.moveTo(x + 30, y); ctx.lineTo(x + 60, y + 30);
                    ctx.lineTo(x + 30, y + 60); ctx.lineTo(x, y + 30);
                    ctx.closePath(); ctx.stroke();
                    ctx.beginPath(); ctx.arc(x + 30, y + 30, 5, 0, Math.PI * 2); ctx.stroke();
                    for (let p = 0; p < 4; p++) {
                        const a = (p * Math.PI) / 2;
                        ctx.beginPath();
                        ctx.ellipse(x + 30 + Math.cos(a) * 10, y + 30 + Math.sin(a) * 10, 4, 2, a, 0, Math.PI * 2);
                        ctx.stroke();
                    }
                }
            });

            // Floral border at top
            ctx.globalAlpha = 0.08;
            ctx.fillStyle = theme.wood.grain;
            repeatX(offset, 40, w, (x) => {
                ctx.beginPath(); ctx.arc(x + 20, 12, 5, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 8, 10, 24, 2);
            });

            // Electrical conduit
            ctx.globalAlpha = 0.08;
            ctx.strokeStyle = '#9A9080'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(0, 22); ctx.lineTo(w, 22); ctx.stroke();

            // Two windows + details (wide repeat)
            ctx.globalAlpha = 0.25;
            repeatX(offset, 1800, w, (x) => {
                // WINDOW 1 — Barcelona street view
                const w1x = x + 200, w1y = h * 0.08;
                ctx.fillStyle = theme.wood.base;
                ctx.fillRect(w1x, w1y, 110, 140);
                ctx.fillStyle = '#B8D4E8';
                ctx.fillRect(w1x + 5, w1y + 5, 100, 90);
                ctx.fillStyle = '#C47A5A';
                ctx.beginPath();
                ctx.moveTo(w1x + 5, w1y + 70); ctx.lineTo(w1x + 25, w1y + 50);
                ctx.lineTo(w1x + 50, w1y + 62); ctx.lineTo(w1x + 70, w1y + 48);
                ctx.lineTo(w1x + 95, w1y + 58); ctx.lineTo(w1x + 105, w1y + 70);
                ctx.lineTo(w1x + 105, w1y + 95); ctx.lineTo(w1x + 5, w1y + 95);
                ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#9A8A7A';
                ctx.fillRect(w1x + 76, w1y + 22, 14, 35);
                ctx.beginPath(); ctx.moveTo(w1x + 76, w1y + 22); ctx.lineTo(w1x + 83, w1y + 10); ctx.lineTo(w1x + 90, w1y + 22); ctx.closePath(); ctx.fill();
                ctx.fillStyle = theme.wood.base;
                ctx.fillRect(w1x + 53, w1y + 5, 4, 90);
                ctx.fillRect(w1x + 5, w1y + 47, 100, 3);
                ctx.fillRect(w1x - 3, w1y + 97, 116, 7);
                ctx.fillStyle = '#6A8A6A';
                ctx.fillRect(w1x - 14, w1y + 5, 14, 92);
                ctx.fillRect(w1x + 110, w1y + 5, 14, 92);

                // Sunlight shaft from window 1
                ctx.globalAlpha = 0.06;
                ctx.fillStyle = '#FFD080';
                ctx.beginPath();
                ctx.moveTo(w1x + 10, w1y + 5); ctx.lineTo(w1x + 100, w1y + 5);
                ctx.lineTo(w1x + 180, h * 0.85); ctx.lineTo(w1x + 50, h * 0.85);
                ctx.closePath(); ctx.fill();
                ctx.globalAlpha = 0.25;

                // WINDOW 2 — balcony view
                const w2x = x + 1100, w2y = h * 0.10;
                ctx.fillStyle = theme.wood.base;
                ctx.fillRect(w2x, w2y, 95, 120);
                ctx.fillStyle = '#B8D4E8';
                ctx.fillRect(w2x + 5, w2y + 5, 85, 78);
                // Balcony railing
                ctx.fillStyle = '#5A5A5A';
                ctx.fillRect(w2x + 5, w2y + 60, 85, 2);
                ctx.fillRect(w2x + 5, w2y + 78, 85, 2);
                for (let br = 0; br < 7; br++) ctx.fillRect(w2x + 10 + br * 12, w2y + 60, 2, 20);
                // Sky
                ctx.fillStyle = theme.wood.base;
                ctx.fillRect(w2x + 45, w2y + 5, 3, 78);
                ctx.fillRect(w2x + 5, w2y + 40, 85, 3);
                ctx.fillRect(w2x - 3, w2y + 85, 101, 6);

                // Hairline crack
                ctx.globalAlpha = 0.06;
                ctx.strokeStyle = '#7A7060'; ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(x + 50, 0); ctx.lineTo(x + 52, 30); ctx.lineTo(x + 48, 65);
                ctx.lineTo(x + 53, 100); ctx.lineTo(x + 50, 140);
                ctx.stroke();

                // Wall discoloration (where picture used to hang)
                ctx.globalAlpha = 0.04;
                ctx.fillStyle = theme.ceramic.base;
                ctx.fillRect(x + 800, h * 0.15, 45, 55);
                ctx.fillRect(x + 1500, h * 0.20, 35, 40);

                ctx.globalAlpha = 0.25;
            });
            ctx.globalAlpha = 1;
        }},

        // MID — Wall decorations (y: 5%-70%)
        { speed: 0.2, draw(ctx, offset, w, h) {
            const theme = getTheme();
            ctx.globalAlpha = 0.35;
            repeatX(offset, 1800, w, (x) => {
                // === BOOKSHELF (x+20, y:12-68%) ===
                ctx.fillStyle = theme.wood.dark;
                ctx.fillRect(x + 20, h * 0.12, 90, h * 0.56);
                ctx.fillStyle = theme.wood.grain;
                for (let sy = h * 0.17; sy < h * 0.63; sy += 48) {
                    ctx.fillRect(x + 18, sy, 94, 3);
                    const colors = ['#8B2500', '#2B5B3C', '#3A4A8A', '#8B7355', '#5C3A6A', '#2A5A5A'];
                    let bx = x + 24;
                    for (let b = 0; b < 6; b++) {
                        const bw = 6 + (b * 3) % 5, bh = 25 + (b * 7) % 15;
                        ctx.fillStyle = colors[b]; ctx.fillRect(bx, sy - bh, bw, bh); bx += bw + 2;
                    }
                    ctx.fillStyle = theme.wood.grain;
                }

                // === MONTSERRAT PAINTING (x+160, y:14%) ===
                ctx.fillStyle = '#B8960B';
                ctx.fillRect(x + 155, h * 0.14, 72, 54);
                ctx.fillStyle = '#A8C8E0';
                ctx.fillRect(x + 159, h * 0.15, 64, 46);
                ctx.fillStyle = '#8A9A7A';
                ctx.beginPath();
                ctx.moveTo(x + 159, h * 0.15 + 46); ctx.lineTo(x + 172, h * 0.15 + 18);
                ctx.lineTo(x + 195, h * 0.15 + 12); ctx.lineTo(x + 218, h * 0.15 + 20);
                ctx.lineTo(x + 223, h * 0.15 + 46); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#5A7A3A'; ctx.fillRect(x + 159, h * 0.15 + 36, 64, 10);

                // === ANTIQUE CLOCK (x+280, y:12%) ===
                ctx.fillStyle = '#6A4A2A';
                ctx.beginPath(); ctx.arc(x + 300, h * 0.16, 30, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#E8DCC8';
                ctx.beginPath(); ctx.arc(x + 300, h * 0.16, 25, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#4A3A2A';
                for (let i = 0; i < 12; i++) {
                    const a = (i * Math.PI * 2) / 12 - Math.PI / 2;
                    ctx.fillRect(x + 300 + Math.cos(a) * 20 - 1, h * 0.16 + Math.sin(a) * 20 - 1, 2.5, 2.5);
                }
                ctx.strokeStyle = '#4A3A2A'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(x + 300, h * 0.16); ctx.lineTo(x + 300, h * 0.16 - 16); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + 300, h * 0.16); ctx.lineTo(x + 312, h * 0.16 + 5); ctx.stroke();
                ctx.fillStyle = '#6A4A2A'; ctx.fillRect(x + 293, h * 0.16 + 30, 14, 40);

                // === OVAL PORTRAIT (x+390, y:16%) ===
                ctx.fillStyle = '#A08040';
                ctx.beginPath(); ctx.ellipse(x + 410, h * 0.22, 24, 30, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#C8B090';
                ctx.beginPath(); ctx.ellipse(x + 410, h * 0.22, 20, 26, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#8A7050';
                ctx.beginPath(); ctx.arc(x + 404, h * 0.19, 5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 416, h * 0.19, 5, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 400, h * 0.21, 8, 14); ctx.fillRect(x + 412, h * 0.21, 8, 14);

                // === CRUCIFIX (x+490, y:8%) ===
                ctx.fillStyle = '#6A4A2A';
                ctx.fillRect(x + 488, h * 0.08, 4, 35);
                ctx.fillRect(x + 479, h * 0.12, 22, 4);

                // === BAROMETER (x+540, y:15%) ===
                ctx.fillStyle = '#8A7A50';
                ctx.beginPath(); ctx.ellipse(x + 555, h * 0.18, 12, 18, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#E8DCC8';
                ctx.beginPath(); ctx.ellipse(x + 555, h * 0.18, 9, 14, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#8A7A50'; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(x + 555, h * 0.18 - 6); ctx.lineTo(x + 555, h * 0.18 + 6); ctx.stroke();

                // === CRT TV ON STAND (x+600, y:36-72%) ===
                ctx.fillStyle = '#6A5030';
                ctx.fillRect(x + 600, h * 0.56, 75, 30);
                ctx.fillRect(x + 605, h * 0.56 + 30, 6, 20); ctx.fillRect(x + 663, h * 0.56 + 30, 6, 20);
                ctx.fillStyle = '#3A3A3A'; ctx.fillRect(x + 608, h * 0.38, 58, 48);
                ctx.fillStyle = '#4A6A7A'; ctx.fillRect(x + 612, h * 0.40, 46, 36);
                ctx.strokeStyle = '#5A5A5A'; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(x + 632, h * 0.38); ctx.lineTo(x + 620, h * 0.30);
                ctx.moveTo(x + 640, h * 0.38); ctx.lineTo(x + 654, h * 0.30); ctx.stroke();

                // === FC BARCELONA FRAME (x+160, y:44%) ===
                ctx.fillStyle = '#7A5A2A'; ctx.fillRect(x + 160, h * 0.44, 40, 32);
                ctx.fillStyle = '#A41428'; ctx.fillRect(x + 163, h * 0.45, 17, 26);
                ctx.fillStyle = '#004D98'; ctx.fillRect(x + 180, h * 0.45, 17, 26);

                // === CHILDREN'S DRAWING (x+280, y:44%) ===
                ctx.fillStyle = '#AA8855'; ctx.fillRect(x + 272, h * 0.44, 36, 30);
                ctx.fillStyle = '#FFFDE8'; ctx.fillRect(x + 275, h * 0.45, 30, 26);
                ctx.fillStyle = '#DD5555';
                ctx.beginPath(); ctx.arc(x + 283, h * 0.48, 3, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 282, h * 0.50, 2, 8);
                ctx.fillStyle = '#5555DD';
                ctx.beginPath(); ctx.arc(x + 293, h * 0.48, 3, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 292, h * 0.50, 2, 8);

                // === CERAMIC PLATE (x+420, y:45%) ===
                ctx.fillStyle = theme.ceramic.base;
                ctx.beginPath(); ctx.arc(x + 430, h * 0.48, 16, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#3A5A9A'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.arc(x + 430, h * 0.48, 12, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(x + 430, h * 0.48, 6, 0, Math.PI * 2); ctx.stroke();

                // === FIREPLACE (x+720, y:48-68%) ===
                ctx.fillStyle = '#7A6040'; ctx.fillRect(x + 720, h * 0.50, 90, 6);
                ctx.fillStyle = '#2A2020';
                ctx.beginPath();
                ctx.moveTo(x + 735, h * 0.50 + 6); ctx.quadraticCurveTo(x + 765, h * 0.48, x + 795, h * 0.50 + 6);
                ctx.lineTo(x + 795, h * 0.66); ctx.lineTo(x + 735, h * 0.66); ctx.closePath(); ctx.fill();
                ctx.fillStyle = theme.ceramic.base;
                ctx.fillRect(x + 726, h * 0.47, 5, 15); ctx.fillRect(x + 800, h * 0.47, 5, 15);
                ctx.fillStyle = '#FFAA30';
                ctx.beginPath(); ctx.ellipse(x + 728.5, h * 0.465, 2, 3, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 802.5, h * 0.465, 2, 3, 0, 0, Math.PI * 2); ctx.fill();

                // === COAT HOOKS (x+870, y:20%) ===
                ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 865, h * 0.20, 50, 4);
                ctx.fillStyle = theme.metal.dark;
                ctx.fillRect(x + 872, h * 0.20 + 4, 3, 8);
                ctx.fillRect(x + 892, h * 0.20 + 4, 3, 8);
                ctx.fillRect(x + 908, h * 0.20 + 4, 3, 8);
                // Hanging jacket
                ctx.fillStyle = '#4A5A6A';
                ctx.beginPath();
                ctx.moveTo(x + 886, h * 0.20 + 10); ctx.lineTo(x + 878, h * 0.36);
                ctx.lineTo(x + 906, h * 0.36); ctx.lineTo(x + 898, h * 0.20 + 10);
                ctx.closePath(); ctx.fill();
                // Scarf
                ctx.fillStyle = '#AA3333';
                ctx.fillRect(x + 908, h * 0.20 + 10, 6, 30);
                ctx.fillRect(x + 906, h * 0.20 + 10, 10, 4);

                // === MAP OF CATALUNYA (x+960, y:10%) ===
                ctx.fillStyle = '#7A5A2A'; ctx.fillRect(x + 955, h * 0.10, 50, 40);
                ctx.fillStyle = '#E8DCC0'; ctx.fillRect(x + 958, h * 0.11, 44, 34);
                ctx.fillStyle = '#8AAA8A';
                ctx.beginPath();
                ctx.moveTo(x + 965, h * 0.14); ctx.lineTo(x + 975, h * 0.12);
                ctx.lineTo(x + 990, h * 0.15); ctx.lineTo(x + 995, h * 0.20);
                ctx.lineTo(x + 988, h * 0.28); ctx.lineTo(x + 975, h * 0.30);
                ctx.lineTo(x + 965, h * 0.25); ctx.closePath(); ctx.fill();

                // === WALL CALENDAR (x+1040, y:14%) ===
                ctx.fillStyle = '#EEEEEE'; ctx.fillRect(x + 1035, h * 0.14, 35, 42);
                ctx.fillStyle = '#DD3333'; ctx.fillRect(x + 1035, h * 0.14, 35, 10);
                ctx.fillStyle = '#888';
                for (let cy = 0; cy < 4; cy++) for (let cx = 0; cx < 5; cx++)
                    ctx.fillRect(x + 1039 + cx * 6, h * 0.14 + 14 + cy * 6, 3, 3);

                // === TELEPHONE TABLE + ROTARY PHONE (x+1100, y:48-65%) ===
                ctx.fillStyle = '#6A5030';
                ctx.fillRect(x + 1095, h * 0.52, 45, 35);
                ctx.fillRect(x + 1100, h * 0.52 + 35, 5, 15); ctx.fillRect(x + 1130, h * 0.52 + 35, 5, 15);
                ctx.fillStyle = '#2A2A2A';
                ctx.beginPath(); ctx.ellipse(x + 1117, h * 0.49, 16, 10, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#3A3A3A';
                ctx.beginPath(); ctx.arc(x + 1117, h * 0.49, 7, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#4A4A4A';
                ctx.beginPath(); ctx.arc(x + 1117, h * 0.49, 4, 0, Math.PI * 2); ctx.fill();
                // Handset
                ctx.fillStyle = '#2A2A2A';
                ctx.fillRect(x + 1105, h * 0.47, 24, 4);

                // === MACRAMÉ / TAPESTRY (x+1200, y:12-38%) ===
                ctx.fillStyle = '#C8B898';
                ctx.fillRect(x + 1210, h * 0.12, 30, 4);
                for (let f = 0; f < 6; f++) {
                    ctx.fillRect(x + 1212 + f * 5, h * 0.12 + 4, 2, 55 + (f % 3) * 10);
                }
                for (let k = 0; k < 3; k++) {
                    ctx.beginPath(); ctx.arc(x + 1217 + k * 8, h * 0.12 + 25 + k * 8, 4, 0, Math.PI * 2); ctx.stroke();
                }

                // === WALL NICHE / HORNACINA (x+1300, y:18%) ===
                ctx.fillStyle = '#5A4A3A';
                ctx.beginPath();
                ctx.moveTo(x + 1295, h * 0.20); ctx.quadraticCurveTo(x + 1315, h * 0.14, x + 1335, h * 0.20);
                ctx.lineTo(x + 1335, h * 0.35); ctx.lineTo(x + 1295, h * 0.35); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#7A6A5A'; ctx.fillRect(x + 1298, h * 0.22, 34, h * 0.13);
                // Vase inside
                ctx.fillStyle = '#AA7744';
                ctx.beginPath(); ctx.ellipse(x + 1315, h * 0.30, 8, 12, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#3A8A3A';
                ctx.beginPath(); ctx.ellipse(x + 1315, h * 0.24, 10, 6, 0, 0, Math.PI * 2); ctx.fill();

                // === "BENVINGUTS" SIGN (x+1400, y:42%) ===
                ctx.fillStyle = '#E8E0C8'; ctx.fillRect(x + 1390, h * 0.42, 65, 22);
                ctx.strokeStyle = '#8A7A5A'; ctx.lineWidth = 1.5;
                ctx.strokeRect(x + 1390, h * 0.42, 65, 22);

                // === ROSARY BEADS ON NAIL (x+1500, y:14%) ===
                ctx.fillStyle = '#555'; ctx.beginPath(); ctx.arc(x + 1510, h * 0.14, 2, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#6A5040'; ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(x + 1510, h * 0.14);
                ctx.quadraticCurveTo(x + 1520, h * 0.20, x + 1510, h * 0.26);
                ctx.quadraticCurveTo(x + 1500, h * 0.20, x + 1510, h * 0.14);
                ctx.stroke();
                ctx.fillStyle = '#6A5040';
                ctx.beginPath(); ctx.arc(x + 1510, h * 0.27, 3, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 1509, h * 0.27, 2, 8);

                // === LIGHT SWITCH COVERS (x+550, y:42%) ===
                ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 548, h * 0.42, 14, 18);
                ctx.fillStyle = '#DDD'; ctx.fillRect(x + 552, h * 0.44, 6, 6);

                // === SECOND BOOKSHELF (x+1550, y:15-55%) ===
                ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1550, h * 0.15, 80, h * 0.40);
                ctx.fillStyle = theme.wood.grain;
                for (let sy = h * 0.20; sy < h * 0.50; sy += 42) {
                    ctx.fillRect(x + 1548, sy, 84, 3);
                    const colors = ['#7A3A3A', '#3A5A3A', '#3A3A7A', '#6A5A3A', '#5A3A5A'];
                    let bx = x + 1554;
                    for (let b = 0; b < 5; b++) {
                        const bw = 7 + (b * 4) % 5, bh = 22 + (b * 6) % 14;
                        ctx.fillStyle = colors[b]; ctx.fillRect(bx, sy - bh, bw, bh); bx += bw + 2;
                    }
                    ctx.fillStyle = theme.wood.grain;
                }

                // === SECOND PAINTING — Sitges coast (x+1680, y:15%) ===
                ctx.fillStyle = '#8A6A2A'; ctx.fillRect(x + 1675, h * 0.15, 65, 48);
                ctx.fillStyle = '#88BBDD'; ctx.fillRect(x + 1679, h * 0.16, 57, 38);
                ctx.fillStyle = '#4A8AAA'; ctx.fillRect(x + 1679, h * 0.16 + 22, 57, 16);
                ctx.fillStyle = '#DDCC88'; ctx.fillRect(x + 1679, h * 0.16 + 30, 57, 8);
            });
            ctx.globalAlpha = 1;
        }},

        // NEAR — Floor items
        { speed: 0.5, draw(ctx, offset, w, h) {
            const theme = getTheme();
            ctx.globalAlpha = 0.3;
            const gY = h - 85;
            repeatX(offset, 1800, w, (x) => {
                // === ASPIDISTRA (x+20) ===
                ctx.fillStyle = '#B86B3A';
                ctx.beginPath(); ctx.moveTo(x + 15, gY); ctx.lineTo(x + 50, gY);
                ctx.lineTo(x + 45, gY - 38); ctx.lineTo(x + 20, gY - 38); ctx.closePath(); ctx.fill();
                ctx.fillRect(x + 17, gY - 40, 31, 5);
                ctx.fillStyle = '#3A6A28';
                for (let i = 0; i < 5; i++) {
                    const a = -0.7 + i * 0.35;
                    ctx.beginPath(); ctx.ellipse(x + 32 + Math.sin(a) * 14, gY - 62 - i * 3, 7, 24, a, 0, Math.PI * 2); ctx.fill();
                }

                // === SLIPPERS (x+110) ===
                ctx.fillStyle = '#7A4A5A';
                ctx.beginPath(); ctx.ellipse(x + 112, gY + 2, 13, 6, -0.2, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 137, gY + 3, 13, 6, 0.15, 0, Math.PI * 2); ctx.fill();

                // === CAT ON CUSHION (x+210) ===
                ctx.fillStyle = '#A04040';
                ctx.beginPath(); ctx.ellipse(x + 230, gY, 30, 8, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#4A4040';
                ctx.beginPath(); ctx.ellipse(x + 230, gY - 10, 20, 10, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 248, gY - 12, 7, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(x + 244, gY - 18); ctx.lineTo(x + 247, gY - 26); ctx.lineTo(x + 250, gY - 18); ctx.fill();
                ctx.strokeStyle = '#4A4040'; ctx.lineWidth = 2.5;
                ctx.beginPath(); ctx.moveTo(x + 212, gY - 8); ctx.quadraticCurveTo(x + 204, gY - 20, x + 208, gY - 28); ctx.stroke();

                // === COFFEE TABLE + CUP (x+340) ===
                ctx.fillStyle = theme.wood.dark;
                ctx.fillRect(x + 330, gY - 25, 45, 4);
                ctx.fillRect(x + 335, gY - 21, 4, 22); ctx.fillRect(x + 366, gY - 21, 4, 22);
                ctx.fillStyle = theme.ceramic.base;
                ctx.beginPath(); ctx.ellipse(x + 352, gY - 25, 10, 3, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 347, gY - 35, 12, 10);

                // === REMOTE CONTROL (x+410) ===
                ctx.fillStyle = '#2A2A2A';
                ctx.save(); ctx.translate(x + 410, gY - 2); ctx.rotate(0.3);
                ctx.fillRect(0, 0, 22, 7);
                ctx.fillStyle = '#DD3333'; ctx.fillRect(3, 1, 3, 2);
                ctx.fillStyle = '#555'; ctx.fillRect(8, 1, 2, 2); ctx.fillRect(12, 1, 2, 2);
                ctx.fillRect(16, 1, 2, 2); ctx.fillRect(8, 4, 2, 2); ctx.fillRect(12, 4, 2, 2);
                ctx.restore();

                // === MAGAZINE RACK (x+480) ===
                ctx.fillStyle = theme.wood.dark;
                ctx.fillRect(x + 475, gY - 20, 5, 22); ctx.fillRect(x + 510, gY - 20, 5, 22);
                ctx.fillStyle = theme.ceramic.base;
                ctx.save(); ctx.translate(x + 485, gY - 22); ctx.rotate(-0.15); ctx.fillRect(0, 0, 20, 28); ctx.restore();
                ctx.fillStyle = '#D8D0C0';
                ctx.save(); ctx.translate(x + 492, gY - 25); ctx.rotate(0.1); ctx.fillRect(0, 0, 18, 26); ctx.restore();

                // === READING GLASSES ON BOOK (x+570) ===
                ctx.fillStyle = '#6A3A3A';
                ctx.save(); ctx.translate(x + 565, gY - 2); ctx.rotate(0.1);
                ctx.fillRect(0, 0, 28, 5); ctx.fillRect(0, 5, 28, 4); ctx.restore();
                ctx.strokeStyle = '#7A6040'; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.arc(x + 573, gY - 7, 5, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.arc(x + 583, gY - 7, 5, 0, Math.PI * 2); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(x + 578, gY - 7); ctx.lineTo(x + 578, gY - 7); ctx.stroke();

                // === WICKER BASKET (x+650) ===
                ctx.fillStyle = '#A08050';
                ctx.fillRect(x + 640, gY - 22, 44, 24);
                ctx.strokeStyle = theme.wood.grain; ctx.lineWidth = 0.5;
                for (let ly = gY - 20; ly < gY; ly += 4) {
                    ctx.beginPath(); ctx.moveTo(x + 640, ly); ctx.lineTo(x + 684, ly); ctx.stroke();
                }
                ctx.fillStyle = '#8B5A5A';
                ctx.beginPath(); ctx.moveTo(x + 645, gY - 22); ctx.quadraticCurveTo(x + 662, gY - 32, x + 680, gY - 22);
                ctx.lineTo(x + 684, gY - 16); ctx.lineTo(x + 640, gY - 16); ctx.closePath(); ctx.fill();

                // === BOWL OF NUTS (x+750) ===
                ctx.fillStyle = '#8A7050';
                ctx.beginPath(); ctx.ellipse(x + 765, gY, 14, 5, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#AA8855';
                ctx.beginPath(); ctx.arc(x + 760, gY - 4, 3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 767, gY - 5, 3.5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 773, gY - 3, 2.5, 0, Math.PI * 2); ctx.fill();

                // === ABANICO FAN (x+840) ===
                ctx.fillStyle = '#AA3030';
                ctx.beginPath();
                for (let f = 0; f < 8; f++) {
                    const a = -0.6 + f * 0.15;
                    ctx.lineTo(x + 850 + Math.cos(a) * 25, gY - 5 + Math.sin(a) * 25);
                }
                ctx.lineTo(x + 850, gY - 5); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#6A4020'; ctx.fillRect(x + 848, gY - 7, 4, 12);

                // === KNITTING BASKET (x+930) ===
                ctx.fillStyle = '#8A7A50';
                ctx.beginPath(); ctx.ellipse(x + 945, gY, 16, 8, 0, Math.PI, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 929, gY, 32, 10);
                ctx.fillStyle = '#CC4444';
                ctx.beginPath(); ctx.arc(x + 938, gY - 6, 7, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = theme.metal.light; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(x + 933, gY - 8); ctx.lineTo(x + 928, gY - 28); ctx.stroke();

                // === POTTED CACTUS (x+1050) ===
                ctx.fillStyle = '#B86B3A';
                ctx.fillRect(x + 1048, gY - 10, 14, 12);
                ctx.fillRect(x + 1046, gY - 12, 18, 3);
                ctx.fillStyle = '#3A8A3A';
                ctx.fillRect(x + 1052, gY - 28, 6, 18);
                ctx.beginPath(); ctx.arc(x + 1055, gY - 28, 4, 0, Math.PI * 2); ctx.fill();
                // Arm
                ctx.fillRect(x + 1058, gY - 24, 8, 4);
                ctx.fillRect(x + 1063, gY - 28, 4, 8);

                // === LACE DOILY + LAMP (x+1140) ===
                ctx.fillStyle = theme.ceramic.base;
                ctx.beginPath(); ctx.ellipse(x + 1155, gY - 18, 16, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#D8D0C0'; ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.ellipse(x + 1155, gY - 18, 12, 3, 0, 0, Math.PI * 2); ctx.stroke();
                // Small table lamp on doily
                ctx.fillStyle = '#AA8844'; ctx.fillRect(x + 1153, gY - 32, 4, 14);
                ctx.fillStyle = '#E8D0A0';
                ctx.beginPath(); ctx.moveTo(x + 1145, gY - 32); ctx.lineTo(x + 1148, gY - 42);
                ctx.lineTo(x + 1162, gY - 42); ctx.lineTo(x + 1165, gY - 32); ctx.closePath(); ctx.fill();

                // === BOARD GAMES STACK (x+1240) ===
                ctx.fillStyle = '#DD3333'; ctx.fillRect(x + 1235, gY - 8, 32, 6);
                ctx.fillStyle = '#3366AA'; ctx.fillRect(x + 1237, gY - 14, 30, 5);
                ctx.fillStyle = '#33AA33'; ctx.fillRect(x + 1236, gY - 19, 31, 4);

                // === CERAMIC ASHTRAY (x+1330) ===
                ctx.fillStyle = '#8A8A78';
                ctx.beginPath(); ctx.ellipse(x + 1340, gY + 1, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#7A7A68';
                ctx.beginPath(); ctx.ellipse(x + 1340, gY, 8, 3, 0, 0, Math.PI * 2); ctx.fill();

                // === TV GUIDE ON SOFA ARM (x+1420) ===
                ctx.fillStyle = '#D8D0B0';
                ctx.save(); ctx.translate(x + 1415, gY - 6); ctx.rotate(-0.2);
                ctx.fillRect(0, 0, 18, 24); ctx.restore();
                ctx.fillStyle = '#AA3333'; ctx.fillRect(x + 1416, gY - 5, 14, 3);

                // === SECOND PLANT (x+1530) ===
                ctx.fillStyle = '#B86B3A';
                ctx.fillRect(x + 1528, gY - 8, 14, 12);
                ctx.fillRect(x + 1526, gY - 10, 18, 3);
                ctx.fillStyle = '#3A7A28';
                ctx.beginPath(); ctx.ellipse(x + 1535, gY - 16, 10, 8, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 1530, gY - 22, 7, 6, -0.3, 0, Math.PI * 2); ctx.fill();

                // === SECOND PAIR OF SLIPPERS (x+1650) ===
                ctx.fillStyle = '#5A6A4A';
                ctx.beginPath(); ctx.ellipse(x + 1650, gY + 3, 12, 5, 0.1, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 1672, gY + 4, 12, 5, -0.1, 0, Math.PI * 2); ctx.fill();
            });

            // Dust motes (sparse, ambient)
            ctx.globalAlpha = 0.12;
            ctx.fillStyle = '#FFD080';
            const t = Date.now() / 2000;
            for (let d = 0; d < 5; d++) {
                const dx = (300 + d * 200 + Math.sin(t + d * 1.7) * 40 - offset * 0.5) % w;
                const dy = h * 0.15 + d * 55 + Math.cos(t * 0.7 + d * 2.1) * 15;
                ctx.beginPath(); ctx.arc(dx, dy, 2, 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 1;
        }},
    ],

    // =====================================================
    // LEVEL 2: KITCHEN
    // =====================================================
    'Kitchen': [
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
    ],

    // =====================================================
    // LEVEL 3: BATHROOM — using same wide-repeat pattern
    // =====================================================
    'Bathroom': [
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
    ],

    // =====================================================
    // LEVELS 4-6: Same pattern — wide repeat, all items
    // =====================================================

    "Kids' Room": [
        { speed: 0.05, draw(ctx, offset, w, h) {
            const theme = getTheme();
            // Stars
            ctx.globalAlpha = 0.2; ctx.fillStyle = '#CCDD44';
            repeatX(offset, 200, w, (x) => {
                drawStar(ctx, x + 30, 18, 5, 6, 3); drawStar(ctx, x + 90, 30, 5, 4, 2);
                drawStar(ctx, x + 150, 12, 5, 5, 2.5); drawStar(ctx, x + 60, 42, 5, 3, 1.5);
                drawStar(ctx, x + 170, 48, 5, 3.5, 1.5);
            });
            // Clouds
            ctx.fillStyle = '#DDEEFF'; ctx.globalAlpha = 0.15;
            repeatX(offset, 600, w, (x) => {
                ctx.beginPath(); ctx.arc(x + 80, h * 0.15, 20, 0, Math.PI * 2); ctx.arc(x + 105, h * 0.12, 26, 0, Math.PI * 2);
                ctx.arc(x + 130, h * 0.15, 18, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 400, h * 0.19, 16, 0, Math.PI * 2); ctx.arc(x + 420, h * 0.17, 20, 0, Math.PI * 2);
                ctx.arc(x + 440, h * 0.19, 14, 0, Math.PI * 2); ctx.fill();
            });
            // Rainbow
            ctx.globalAlpha = 0.1; ctx.lineWidth = 5;
            const rainbow = ['#FF0000','#FF8800','#FFFF00','#00CC00','#0000FF','#8800CC'];
            repeatX(offset, 1800, w, (x) => {
                for (let r = 0; r < rainbow.length; r++) {
                    ctx.strokeStyle = rainbow[r];
                    ctx.beginPath(); ctx.arc(x + 450, h * 0.42, 90 - r * 7, Math.PI * 1.05, Math.PI * 1.95); ctx.stroke();
                }
                // Scribbles
                ctx.globalAlpha = 0.1; ctx.lineWidth = 2.5;
                ctx.strokeStyle = '#DD4444'; ctx.beginPath();
                ctx.moveTo(x + 50, h * 0.5); ctx.bezierCurveTo(x + 65, h * 0.44, x + 85, h * 0.54, x + 100, h * 0.47); ctx.stroke();
                ctx.strokeStyle = '#4444DD'; ctx.beginPath();
                ctx.moveTo(x + 700, h * 0.56); ctx.lineTo(x + 700, h * 0.48); ctx.lineTo(x + 715, h * 0.42);
                ctx.lineTo(x + 730, h * 0.48); ctx.lineTo(x + 730, h * 0.56); ctx.stroke();
                ctx.strokeStyle = '#33AA33'; ctx.beginPath();
                ctx.moveTo(x + 1300, h * 0.52); ctx.bezierCurveTo(x + 1320, h * 0.46, x + 1340, h * 0.56, x + 1360, h * 0.50); ctx.stroke();
                // Rocket
                ctx.globalAlpha = 0.14;
                const rx = x + 1600, ry = h * 0.28;
                ctx.fillStyle = '#DD3333';
                ctx.beginPath(); ctx.moveTo(rx, ry - 32); ctx.lineTo(rx - 12, ry + 18); ctx.lineTo(rx + 12, ry + 18); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#88CCFF'; ctx.beginPath(); ctx.arc(rx, ry - 6, 6, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#FF8800';
                ctx.beginPath(); ctx.moveTo(rx - 12, ry + 12); ctx.lineTo(rx - 18, ry + 22); ctx.lineTo(rx - 9, ry + 18); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.moveTo(rx + 12, ry + 12); ctx.lineTo(rx + 18, ry + 22); ctx.lineTo(rx + 9, ry + 18); ctx.closePath(); ctx.fill();
                ctx.fillStyle = '#FFAA00';
                ctx.beginPath(); ctx.moveTo(rx - 6, ry + 18); ctx.lineTo(rx, ry + 28); ctx.lineTo(rx + 6, ry + 18); ctx.closePath(); ctx.fill();
                // Height chart
                ctx.globalAlpha = 0.12; ctx.fillStyle = '#FFE8B0'; ctx.fillRect(x + 200, h * 0.18, 16, h * 0.48);
                ctx.fillStyle = theme.wood.dark; for (let tk = 0; tk < 8; tk++) ctx.fillRect(x + 207, h * 0.20 + tk * h * 0.055, 8, 1.5);
                // Handprints
                ctx.globalAlpha = 0.08;
                const hc = ['#FF4444','#44AA44','#4444FF','#FFAA00'];
                for (let hp = 0; hp < 4; hp++) {
                    ctx.fillStyle = hc[hp]; const hx = x + 800 + hp * 60, hy = h * 0.55 + (hp%2) * 20;
                    ctx.beginPath(); ctx.ellipse(hx, hy, 7, 9, 0, 0, Math.PI * 2); ctx.fill();
                    for (let f = 0; f < 4; f++) { ctx.beginPath(); ctx.ellipse(hx - 5 + f * 3.5, hy - 11, 2, 5, 0, 0, Math.PI * 2); ctx.fill(); }
                }
                // Planets
                ctx.globalAlpha = 0.1;
                ctx.fillStyle = '#DDAA44'; ctx.beginPath(); ctx.arc(x + 1100, h * 0.10, 9, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = '#CCAA44'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x + 1100, h * 0.10, 15, 4, 0.2, 0, Math.PI * 2); ctx.stroke();
                ctx.fillStyle = '#DD6622'; ctx.beginPath(); ctx.arc(x + 1150, h * 0.14, 7, 0, Math.PI * 2); ctx.fill();
                // Constellation
                ctx.globalAlpha = 0.08; ctx.fillStyle = '#CCDD44';
                const stars = [[1400,20],[1420,28],[1440,22],[1455,30],[1465,20],[1480,32],[1490,25]];
                for (const s of stars) { drawStar(ctx, x + s[0], s[1], 5, 3, 1.5); }
                ctx.strokeStyle = '#CCDD44'; ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.moveTo(x + 1400, 20); ctx.lineTo(x + 1420, 28); ctx.lineTo(x + 1440, 22);
                ctx.lineTo(x + 1455, 30); ctx.stroke();
                // Superhero poster remnant
                ctx.globalAlpha = 0.06; ctx.fillStyle = '#DD4444'; ctx.fillRect(x + 1250, h * 0.20, 30, 25);
                ctx.fillStyle = '#FFDD44'; ctx.beginPath(); ctx.moveTo(x + 1265, h * 0.22); ctx.lineTo(x + 1270, h * 0.30);
                ctx.lineTo(x + 1260, h * 0.30); ctx.closePath(); ctx.fill();
            });
            ctx.globalAlpha = 1;
        }},
        { speed: 0.2, draw(ctx, offset, w, h) {
            const theme = getTheme();
            ctx.globalAlpha = 0.35;
            repeatX(offset, 1800, w, (x) => {
                // Dino poster (x+20)
                ctx.fillStyle = theme.wall.trim; ctx.fillRect(x + 18, h * 0.08, 62, 52);
                ctx.fillStyle = '#FFE8CC'; ctx.fillRect(x + 21, h * 0.09, 56, 44);
                ctx.fillStyle = '#44AA44';
                ctx.beginPath(); ctx.ellipse(x + 46, h * 0.09 + 28, 16, 11, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 63, h * 0.09 + 18, 9, 7, 0.3, 0, Math.PI * 2); ctx.fill();
                // Space poster (x+110)
                ctx.fillStyle = '#1E90FF'; ctx.fillRect(x + 108, h * 0.08, 56, 48);
                ctx.fillStyle = '#1A1A3A'; ctx.fillRect(x + 111, h * 0.09, 50, 40);
                ctx.fillStyle = '#CCCCAA'; ctx.beginPath(); ctx.arc(x + 136, h * 0.09 + 38, 22, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#EEEEEE'; ctx.beginPath(); ctx.arc(x + 136, h * 0.09 + 18, 5, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(x + 132, h * 0.09 + 22, 8, 10);
                // Toy shelf (x+210)
                ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 210, h * 0.32, 120, 6);
                ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 222, h * 0.27, 14, 16); // robot
                ctx.fillStyle = '#33AA33'; ctx.beginPath(); ctx.ellipse(x + 260, h * 0.30, 12, 7, 0, 0, Math.PI * 2); ctx.fill(); // dino
                ctx.fillStyle = '#C8944A'; ctx.beginPath(); ctx.arc(x + 295, h * 0.30, 8, 0, Math.PI * 2); ctx.fill(); // teddy
                ctx.fillStyle = '#DD2222'; ctx.fillRect(x + 312, h * 0.30, 16, 9); // lego
                // Pirate map (x+380)
                ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 375, h * 0.10, 52, 44);
                ctx.fillStyle = '#E8D8B0'; ctx.fillRect(x + 378, h * 0.11, 46, 38);
                ctx.strokeStyle = '#AA5500'; ctx.lineWidth = 1; ctx.setLineDash([2,2]);
                ctx.beginPath(); ctx.moveTo(x + 383, h * 0.11 + 32); ctx.lineTo(x + 418, h * 0.11 + 8); ctx.stroke();
                ctx.setLineDash([]); ctx.strokeStyle = '#DD2222'; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(x + 415, h * 0.11 + 5); ctx.lineTo(x + 421, h * 0.11 + 11);
                ctx.moveTo(x + 421, h * 0.11 + 5); ctx.lineTo(x + 415, h * 0.11 + 11); ctx.stroke();
                // Pennant banner (y:45%)
                const bc = ['#FF4444','#FFAA00','#44AA44','#4444FF','#FF44FF','#44DDDD'];
                ctx.strokeStyle = theme.metal.base; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(x + 20, h * 0.44); ctx.quadraticCurveTo(x + 900, h * 0.49, x + 1780, h * 0.44); ctx.stroke();
                for (let p = 0; p < 36; p++) {
                    const px = x + 30 + p * 50, sag = Math.sin((p/36) * Math.PI) * h * 0.05;
                    ctx.fillStyle = bc[p % bc.length];
                    ctx.beginPath(); ctx.moveTo(px - 9, h * 0.44 + sag); ctx.lineTo(px + 9, h * 0.44 + sag);
                    ctx.lineTo(px, h * 0.44 + sag + 20); ctx.closePath(); ctx.fill();
                }
                // Pirate flag (x+480)
                ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 485, h * 0.08, 3, h * 0.25);
                ctx.fillStyle = '#222'; ctx.fillRect(x + 488, h * 0.10, 36, 25);
                ctx.fillStyle = '#EEE'; ctx.beginPath(); ctx.arc(x + 506, h * 0.10 + 10, 6, 0, Math.PI * 2); ctx.fill();
                // Mobile (x+600)
                const mt = Date.now() / 3000;
                ctx.strokeStyle = theme.metal.light; ctx.lineWidth = 0.5;
                ctx.beginPath(); ctx.moveTo(x + 620, 0); ctx.lineTo(x + 620, h * 0.05); ctx.stroke();
                ctx.fillStyle = theme.metal.base; ctx.fillRect(x + 595, h * 0.05, 50, 2);
                const pl = [{dx:-20,r:4,c:'#FFAA00',l:16},{dx:-6,r:6,c:'#DD6622',l:24},{dx:8,r:5,c:'#4488FF',l:20},{dx:22,r:7,c:'#DDAA44',l:28}];
                for (const p of pl) {
                    const sw = Math.sin(mt + p.dx) * 4;
                    ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(x + 620 + p.dx + sw, h * 0.05 + p.l, p.r, 0, Math.PI * 2); ctx.fill();
                }
                // Cork board (x+700)
                ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 695, h * 0.10, 50, 40);
                ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 2; ctx.strokeRect(x + 695, h * 0.10, 50, 40);
                ctx.fillStyle = '#FFFDE8'; ctx.fillRect(x + 700, h * 0.11, 14, 16);
                ctx.fillStyle = '#FFE8E8'; ctx.fillRect(x + 720, h * 0.12, 16, 14);
                // Gold star chart
                ctx.fillStyle = '#FFD700';
                for (let s = 0; s < 3; s++) drawStar(ctx, x + 703 + s * 8, h * 0.14, 5, 3, 1.5);
                // Basketball hoop (x+790, y:22%)
                ctx.fillStyle = '#FF6600'; ctx.fillRect(x + 788, h * 0.22, 20, 14);
                ctx.fillStyle = '#444'; ctx.fillRect(x + 808, h * 0.22, 3, 14);
                ctx.strokeStyle = '#FF6600'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.ellipse(x + 798, h * 0.22 + 14, 10, 4, 0, 0, Math.PI * 2); ctx.stroke();
                // Whiteboard with HOLA (x+850, y:15%)
                ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 845, h * 0.15, 40, 30);
                ctx.strokeStyle = theme.metal.light; ctx.lineWidth = 1; ctx.strokeRect(x + 845, h * 0.15, 40, 30);
                ctx.fillStyle = '#DD3333'; ctx.font = 'bold 10px sans-serif';
                ctx.fillText('HOLA', x + 850, h * 0.15 + 20);
                // Barça scarf (x+920, y:28%)
                ctx.fillStyle = '#A41428'; ctx.fillRect(x + 918, h * 0.28, 8, 35);
                ctx.fillStyle = '#004D98'; ctx.fillRect(x + 918, h * 0.28 + 7, 8, 7);
                ctx.fillRect(x + 918, h * 0.28 + 21, 8, 7);
                // Superhero cape (x+960, y:18%)
                ctx.fillStyle = theme.metal.dark; ctx.fillRect(x + 965, h * 0.18, 4, 6);
                ctx.fillStyle = '#DD2222';
                ctx.beginPath(); ctx.moveTo(x + 960, h * 0.18 + 6); ctx.lineTo(x + 958, h * 0.36);
                ctx.lineTo(x + 976, h * 0.36); ctx.lineTo(x + 974, h * 0.18 + 6); ctx.closePath(); ctx.fill();
                // Toy clock (x+1020, y:10%)
                ctx.fillStyle = '#FFDD44'; ctx.beginPath(); ctx.arc(x + 1035, h * 0.14, 14, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = theme.ceramic.base; ctx.beginPath(); ctx.arc(x + 1035, h * 0.14, 11, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#333'; ctx.font = 'bold 6px sans-serif';
                ctx.fillText('12', x + 1031, h * 0.14 - 5); ctx.fillText('6', x + 1033, h * 0.14 + 9);
                ctx.fillText('3', x + 1042, h * 0.14 + 2); ctx.fillText('9', x + 1027, h * 0.14 + 2);
                // Growth chart (x+1080, y:20%)
                ctx.fillStyle = '#FFE8B0'; ctx.fillRect(x + 1080, h * 0.20, 14, h * 0.35);
                ctx.fillStyle = theme.wood.dark; for (let tk = 0; tk < 6; tk++) ctx.fillRect(x + 1087, h * 0.22 + tk * 16, 6, 1.5);
                // Giraffe marker
                ctx.fillStyle = '#DDAA33'; ctx.beginPath(); ctx.arc(x + 1093, h * 0.30, 3, 0, Math.PI * 2); ctx.fill();
                // Treasure chest (x+1130, y:52%)
                ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1125, h * 0.54, 40, 25);
                ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1125, h * 0.52, 40, 8);
                ctx.fillStyle = '#DDAA33'; ctx.fillRect(x + 1142, h * 0.52, 6, 4);
                // Toys spilling out
                ctx.fillStyle = theme.toy.red; ctx.fillRect(x + 1130, h * 0.52, 8, 4);
                ctx.fillStyle = theme.toy.green; ctx.beginPath(); ctx.arc(x + 1155, h * 0.53, 4, 0, Math.PI * 2); ctx.fill();
                // World map poster (x+1210, y:8%)
                ctx.fillStyle = '#5A7A9A'; ctx.fillRect(x + 1205, h * 0.08, 60, 42);
                ctx.fillStyle = '#3A8A3A';
                ctx.beginPath(); ctx.ellipse(x + 1225, h * 0.15, 8, 10, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 1248, h * 0.18, 12, 8, 0.3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 1240, h * 0.10, 6, 5, 0, 0, Math.PI * 2); ctx.fill();
                // Stickers on map
                ctx.fillStyle = '#FF4444'; ctx.beginPath(); ctx.arc(x + 1225, h * 0.15, 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#FFDD00'; ctx.beginPath(); ctx.arc(x + 1248, h * 0.18, 2, 0, Math.PI * 2); ctx.fill();
                // Night light (x+1310, y:58%)
                const lt = Date.now() / 2000;
                ctx.fillStyle = 'rgba(255, 240, 180, 0.25)';
                ctx.beginPath(); ctx.arc(x + 1320, h * 0.60, 14 + Math.sin(lt) * 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 1316, h * 0.59, 8, 10);
                ctx.fillStyle = '#FFEE88'; drawStar(ctx, x + 1320, h * 0.58, 5, 7, 3);
                // Bookshelf (x+1380, y:52-72%)
                ctx.fillStyle = theme.wood.dark; ctx.fillRect(x + 1375, h * 0.52, 105, 60);
                ctx.fillRect(x + 1373, h * 0.52, 109, 3); ctx.fillRect(x + 1373, h * 0.62, 109, 3);
                const cols = ['#DD3333','#3366CC','#33AA33','#FF8800','#8833AA','#DD6699','#228888'];
                for (let sh = 0; sh < 2; sh++) {
                    let bx = x + 1378; const sy = sh === 0 ? h * 0.52 + 3 : h * 0.62 + 3;
                    for (let b = 0; b < 8; b++) {
                        const bw = 5 + (b*3)%4, bh = 20 + (b*5)%10;
                        ctx.fillStyle = cols[(b+sh*3)%cols.length]; ctx.fillRect(bx, sy + (28-bh), bw, bh); bx += bw + 1.5;
                    }
                }
                // Family drawing (x+1530, y:10%)
                ctx.fillStyle = theme.wood.base; ctx.fillRect(x + 1525, h * 0.10, 46, 38);
                ctx.fillStyle = '#FFFDE8'; ctx.fillRect(x + 1528, h * 0.11, 40, 32);
                ctx.fillStyle = '#44DD44'; ctx.fillRect(x + 1528, h * 0.11 + 26, 40, 6);
                const fC = ['#3333DD','#DD3333','#33AA33','#FF8800'];
                for (let f = 0; f < 4; f++) {
                    const fx = x + 1535 + f * 9, fH = f < 2 ? 16 : 11, fy = h * 0.11 + 26 - fH;
                    ctx.fillStyle = fC[f]; ctx.beginPath(); ctx.arc(fx, fy, 2.5, 0, Math.PI * 2); ctx.fill();
                    ctx.fillRect(fx - 0.5, fy + 2, 1.5, fH - 5);
                }
                // Second dino poster (x+1640, y:8%)
                ctx.fillStyle = '#32CD32'; ctx.fillRect(x + 1635, h * 0.08, 55, 45);
                ctx.fillStyle = '#E8FFE8'; ctx.fillRect(x + 1638, h * 0.09, 49, 38);
                ctx.fillStyle = '#DD8833';
                ctx.beginPath(); ctx.ellipse(x + 1660, h * 0.09 + 24, 12, 16, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 1650, h * 0.09 + 12, 7, 0, Math.PI * 2); ctx.fill();
                // Triceratops horns
                ctx.beginPath(); ctx.moveTo(x + 1647, h * 0.09 + 8); ctx.lineTo(x + 1643, h * 0.09 + 3); ctx.lineTo(x + 1649, h * 0.09 + 6); ctx.closePath(); ctx.fill();
            });
            ctx.globalAlpha = 1;
        }},
        { speed: 0.5, draw(ctx, offset, w, h) {
            const theme = getTheme();
            ctx.globalAlpha = 0.3;
            const gY = h - 85;
            repeatX(offset, 1800, w, (x) => {
                // LEGOs (x+10-80)
                const lc = [theme.toy.red, theme.toy.green, theme.toy.blue, theme.toy.yellow, theme.toy.purple];
                const lp = [[10,0],[28,-5],[48,2],[65,-3],[80,1]];
                for (let l = 0; l < lp.length; l++) {
                    ctx.fillStyle = lc[l]; ctx.save(); ctx.translate(x + lp[l][0], gY + lp[l][1]);
                    ctx.rotate((l*0.8)%1.4-0.5); ctx.fillRect(0, 0, 11, 7);
                    ctx.fillRect(1, -2, 3.5, 2.5); ctx.fillRect(6, -2, 3.5, 2.5); ctx.restore();
                }
                // Toy car (x+140)
                ctx.fillStyle = theme.toy.red; ctx.fillRect(x + 135, gY - 2, 20, 8); ctx.fillRect(x + 140, gY - 7, 12, 5);
                ctx.fillStyle = '#333'; ctx.beginPath(); ctx.arc(x + 141, gY + 6, 3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 151, gY + 6, 3, 0, Math.PI * 2); ctx.fill();
                // Teddy (x+220)
                ctx.fillStyle = '#C8944A';
                ctx.beginPath(); ctx.ellipse(x + 225, gY, 12, 9, 0.3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 236, gY - 5, 7, 0, Math.PI * 2); ctx.fill();
                // Crayons (x+310)
                const cc = ['#DD2222','#22AA22','#2255DD','#FFAA00','#AA22AA'];
                for (let c = 0; c < 5; c++) {
                    ctx.fillStyle = cc[c]; ctx.save(); ctx.translate(x + 310 + c * 18, gY + (c*3)%5 - 2);
                    ctx.rotate(-0.4 + c * 0.3); ctx.fillRect(0, 0, 24, 3.5);
                    ctx.beginPath(); ctx.moveTo(24, 0); ctx.lineTo(28, 1.75); ctx.lineTo(24, 3.5); ctx.closePath(); ctx.fill();
                    ctx.restore();
                }
                // Dino plush (x+450)
                ctx.fillStyle = '#55BB55';
                ctx.beginPath(); ctx.ellipse(x + 460, gY - 2, 14, 9, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 474, gY - 4, 6, 0, Math.PI * 2); ctx.fill();
                // Backpack (x+540)
                ctx.fillStyle = '#DD5500'; ctx.fillRect(x + 535, gY - 22, 24, 28);
                ctx.fillStyle = '#CC4400'; ctx.fillRect(x + 535, gY - 27, 24, 8);
                // Block tower (x+640)
                const bcs = [theme.toy.red, theme.toy.blue, theme.toy.green, theme.toy.yellow];
                for (let b = 0; b < 4; b++) { ctx.fillStyle = bcs[b]; ctx.fillRect(x + 640 + (b%2) * 2, gY - b * 11, 16, 10); }
                // Drawing paper (x+720)
                ctx.fillStyle = '#FFFDE8'; ctx.save(); ctx.translate(x + 715, gY - 2); ctx.rotate(-0.1);
                ctx.fillRect(0, 0, 32, 24); ctx.strokeStyle = '#DD5555'; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(5, 6); ctx.bezierCurveTo(12, 2, 18, 14, 27, 9); ctx.stroke(); ctx.restore();
                // Action figures (x+810)
                ctx.fillStyle = theme.metal.base; // Soldier
                ctx.fillRect(x + 810, gY - 12, 6, 12); ctx.beginPath(); ctx.arc(x + 813, gY - 14, 3, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = theme.toy.red; // Superhero
                ctx.fillRect(x + 828, gY - 14, 6, 14); ctx.beginPath(); ctx.arc(x + 831, gY - 16, 3, 0, Math.PI * 2); ctx.fill();
                // Puzzle pieces (x+880)
                ctx.fillStyle = '#4488CC'; ctx.fillRect(x + 878, gY - 2, 10, 8);
                ctx.fillStyle = '#CC8844'; ctx.save(); ctx.translate(x + 895, gY); ctx.rotate(0.5); ctx.fillRect(0, 0, 10, 8); ctx.restore();
                ctx.fillStyle = '#44CC44'; ctx.save(); ctx.translate(x + 910, gY - 4); ctx.rotate(-0.3); ctx.fillRect(0, 0, 10, 8); ctx.restore();
                // Bouncy ball (x+960)
                ctx.fillStyle = '#FF4488'; ctx.beginPath(); ctx.arc(x + 965, gY - 2, 5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#FF88AA'; ctx.beginPath(); ctx.arc(x + 963, gY - 4, 2, 0, Math.PI * 2); ctx.fill();
                // Single shoe (x+1020)
                ctx.fillStyle = '#4A6AAA'; ctx.beginPath(); ctx.ellipse(x + 1025, gY + 2, 12, 5, 0.1, 0, Math.PI * 2); ctx.fill();
                // Toy sword (x+1080)
                ctx.fillStyle = theme.metal.light; ctx.save(); ctx.translate(x + 1080, gY + 2); ctx.rotate(-0.7);
                ctx.fillRect(0, 0, 35, 2.5); ctx.restore();
                ctx.fillStyle = theme.wood.dark; ctx.save(); ctx.translate(x + 1080, gY + 2); ctx.rotate(-0.7);
                ctx.fillRect(-8, -1, 8, 4.5); ctx.fillStyle = '#CCAA00'; ctx.fillRect(-1, -3, 3, 8); ctx.restore();
                // Sticker sheets (x+1150)
                ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 1148, gY - 2, 16, 20);
                ctx.fillStyle = '#FF4444'; ctx.beginPath(); ctx.arc(x + 1152, gY + 2, 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#44FF44'; ctx.beginPath(); ctx.arc(x + 1158, gY + 6, 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#4444FF'; drawStar(ctx, x + 1155, gY + 12, 5, 2.5, 1);
                // Superhero mask (x+1220)
                ctx.fillStyle = theme.toy.red; ctx.beginPath(); ctx.ellipse(x + 1230, gY + 1, 10, 5, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#1A1A1A'; ctx.beginPath(); ctx.ellipse(x + 1225, gY, 3, 2.5, 0, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 1235, gY, 3, 2.5, 0, 0, Math.PI * 2); ctx.fill();
                // Slime container (x+1290)
                ctx.fillStyle = '#33DD33'; ctx.beginPath(); ctx.ellipse(x + 1300, gY + 2, 10, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#22CC22'; ctx.fillRect(x + 1293, gY - 4, 14, 6);
                // Nerf dart (x+1360)
                ctx.fillStyle = '#FF8800'; ctx.fillRect(x + 1358, gY, 18, 3);
                ctx.fillStyle = '#FF6600'; ctx.beginPath(); ctx.arc(x + 1358, gY + 1.5, 3, 0, Math.PI * 2); ctx.fill();
                // Children's book open (x+1420)
                ctx.fillStyle = theme.toy.red; ctx.fillRect(x + 1415, gY - 2, 28, 18);
                ctx.fillStyle = '#FFFDE8'; ctx.fillRect(x + 1418, gY, 22, 14);
                ctx.fillStyle = '#EEEEEE'; ctx.fillRect(x + 1428, gY, 2, 14);
                // Blue toy car tipped (x+1500)
                ctx.fillStyle = theme.toy.blue; ctx.save(); ctx.translate(x + 1505, gY - 2); ctx.rotate(0.8);
                ctx.fillRect(0, 0, 16, 6); ctx.fillRect(3, -4, 8, 4); ctx.restore();
                // Marble run pieces (x+1570)
                ctx.fillStyle = theme.metal.light; ctx.fillRect(x + 1568, gY - 8, 18, 3); ctx.fillRect(x + 1574, gY - 5, 3, 8);
                ctx.fillStyle = theme.toy.blue; ctx.beginPath(); ctx.arc(x + 1590, gY + 2, 3, 0, Math.PI * 2); ctx.fill();
                // Dice (x+1640)
                ctx.fillStyle = theme.ceramic.base; ctx.fillRect(x + 1638, gY - 2, 8, 8);
                ctx.fillStyle = '#333'; ctx.beginPath(); ctx.arc(x + 1640, gY, 1, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 1644, gY + 4, 1, 0, Math.PI * 2); ctx.fill();
                // Bunny plush (x+1700)
                ctx.fillStyle = theme.fabric.light;
                ctx.beginPath(); ctx.arc(x + 1710, gY - 2, 8, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(x + 1710, gY - 10, 6, 0, Math.PI * 2); ctx.fill();
                // Ears
                ctx.beginPath(); ctx.ellipse(x + 1706, gY - 18, 2, 7, -0.2, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(x + 1714, gY - 18, 2, 7, 0.2, 0, Math.PI * 2); ctx.fill();
            });
            ctx.globalAlpha = 1;
        }},
    ],

    "Parents' Room": [
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
    ],

    'Terrace': [
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
    ],
};
