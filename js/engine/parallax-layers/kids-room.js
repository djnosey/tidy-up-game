import { getTheme } from '../renderers/level-themes.js';

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

export const kidsRoomLayers = [
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
];
