import { getTheme } from '../renderers/level-themes.js';

function repeatX(offset, spacing, canvasW, callback) {
    const start = -(offset % spacing) - spacing;
    for (let x = start; x < canvasW + spacing; x += spacing) {
        callback(x);
    }
}

export const livingRoomLayers = [
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
];
