import { CHARACTERS } from '../data/characters.js';
import { drawCharacter } from '../engine/renderers/character-renderer.js';

export class HubWorld {
    constructor() {
        this.completedLevels = [];
        this.selectedIndex = 0;
        this.selectedCharacterName = '';
        this.saveManager = null;
    }

    handleInput(input) {
        if (input.wasPressed('Enter') || input.wasPressed(' ')) {
            return { action: 'start', character: CHARACTERS[this.selectedIndex] };
        }

        if (input.wasPressed('ArrowLeft')) {
            this.selectedIndex = (this.selectedIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
        }
        if (input.wasPressed('ArrowRight')) {
            this.selectedIndex = (this.selectedIndex + 1) % CHARACTERS.length;
        }

        return null;
    }

    render(ctx, w, h) {
        const done = this.completedLevels.length; // 0-6
        const t = Date.now();

        // Sky — gets brighter/bluer as house cleans up
        const skyColors = ['#6B7B8E', '#7A8FA0', '#87A0B5', '#8BB5CC', '#87CEEB', '#87CEEB', '#87CEEB'];
        ctx.fillStyle = skyColors[done];
        ctx.fillRect(0, 0, w, h * 0.55);

        // Sun — grows and glows more as levels complete
        if (done >= 2) {
            const sunR = 20 + done * 6;
            const sunX = w * 0.82;
            const sunY = h * 0.12;
            ctx.fillStyle = `rgba(255, 240, 100, ${0.15 + done * 0.05})`;
            ctx.beginPath();
            ctx.arc(sunX, sunY, sunR + 15, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFE44D';
            ctx.beginPath();
            ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
            ctx.fill();
        }

        // Ground — dull dirt -> nice path/grass
        ctx.fillStyle = done >= 4 ? '#9DBF6E' : done >= 2 ? '#B8A87A' : '#9E8E6E';
        ctx.fillRect(0, h * 0.55, w, h * 0.45);
        // Path
        ctx.fillStyle = done >= 4 ? '#D4C4A4' : '#B8A090';
        ctx.fillRect(w / 2 - 40, h * 0.55, 80, h * 0.45);

        // Grass tufts when clean
        if (done >= 3) {
            ctx.fillStyle = '#6DAF4A';
            for (let i = 0; i < 8; i++) {
                const gx = w * 0.15 + i * w * 0.1;
                const gy = h * 0.57 + (i % 3) * 8;
                ctx.beginPath();
                ctx.moveTo(gx, gy + 8); ctx.lineTo(gx - 3, gy); ctx.lineTo(gx + 3, gy + 8);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(gx + 4, gy + 8); ctx.lineTo(gx + 6, gy + 2); ctx.lineTo(gx + 8, gy + 8);
                ctx.fill();
            }
        }

        // === HOUSE FACADE ===
        const houseX = w / 2 - 200;
        const houseY = h * 0.15;
        const houseW = 400;
        const houseH = h * 0.4;

        // Wall color — grimy beige -> clean warm white
        const wallColors = ['#C8B898', '#CCBC9C', '#D4C4A4', '#DDD0B0', '#E8DCBC', '#F0E8D0', '#F5F0E0'];
        ctx.fillStyle = wallColors[done];
        ctx.fillRect(houseX, houseY, houseW, houseH);

        // Wall cracks (disappear as levels complete)
        if (done < 5) {
            ctx.strokeStyle = `rgba(80, 60, 40, ${0.3 - done * 0.05})`;
            ctx.lineWidth = 1;
            // Crack 1
            if (done < 3) {
                ctx.beginPath();
                ctx.moveTo(houseX + 50, houseY + 20);
                ctx.lineTo(houseX + 65, houseY + 45);
                ctx.lineTo(houseX + 58, houseY + 70);
                ctx.stroke();
            }
            // Crack 2
            if (done < 4) {
                ctx.beginPath();
                ctx.moveTo(houseX + 320, houseY + 10);
                ctx.lineTo(houseX + 335, houseY + 35);
                ctx.lineTo(houseX + 325, houseY + 50);
                ctx.stroke();
            }
            // Crack 3
            if (done < 2) {
                ctx.beginPath();
                ctx.moveTo(houseX + 180, houseY + houseH - 30);
                ctx.lineTo(houseX + 195, houseY + houseH - 10);
                ctx.stroke();
            }
        }

        // Grime/stains on walls (fade with progress)
        if (done < 4) {
            ctx.fillStyle = `rgba(90, 70, 50, ${0.12 - done * 0.025})`;
            ctx.fillRect(houseX + 10, houseY + houseH - 40, 60, 30);
            ctx.fillRect(houseX + houseW - 80, houseY + houseH - 50, 70, 35);
            ctx.beginPath();
            ctx.arc(houseX + 200, houseY + 60, 25, 0, Math.PI * 2);
            ctx.fill();
        }

        // Water damage streaks
        if (done < 3) {
            ctx.strokeStyle = `rgba(100, 90, 70, ${0.15 - done * 0.04})`;
            ctx.lineWidth = 3;
            for (let i = 0; i < 3; i++) {
                const sx = houseX + 80 + i * 120;
                ctx.beginPath();
                ctx.moveTo(sx, houseY);
                ctx.lineTo(sx + 5, houseY + 30 + i * 10);
                ctx.stroke();
            }
        }

        // Door — old brown -> nice painted door
        const doorX = w / 2 - 30;
        const doorY = h * 0.35;
        ctx.fillStyle = done >= 4 ? '#6B3420' : done >= 2 ? '#7B4B30' : '#5A3A20';
        ctx.fillRect(doorX, doorY, 60, h * 0.2);
        // Door frame
        ctx.strokeStyle = done >= 3 ? '#8B6540' : '#5A4030';
        ctx.lineWidth = 2;
        ctx.strokeRect(doorX, doorY, 60, h * 0.2);
        // Door handle
        ctx.fillStyle = done >= 4 ? '#FFD700' : '#888';
        ctx.beginPath();
        ctx.arc(doorX + 48, doorY + h * 0.1, 3, 0, Math.PI * 2);
        ctx.fill();
        // Door panels
        if (done >= 3) {
            ctx.strokeStyle = 'rgba(139, 101, 64, 0.3)';
            ctx.strokeRect(doorX + 8, doorY + 8, 44, h * 0.06);
            ctx.strokeRect(doorX + 8, doorY + h * 0.08 + 12, 44, h * 0.06);
        }

        // Welcome mat (appears at 4+)
        if (done >= 4) {
            ctx.fillStyle = '#8B6540';
            ctx.fillRect(doorX - 5, doorY + h * 0.2, 70, 8);
            ctx.fillStyle = '#A0784C';
            ctx.font = '6px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('WELCOME', doorX + 30, doorY + h * 0.2 + 6);
        }

        // Cobwebs (disappear as levels complete)
        if (done < 4) {
            const cobwebAlpha = 0.35 - done * 0.07;
            ctx.strokeStyle = `rgba(200, 200, 200, ${cobwebAlpha})`;
            ctx.fillStyle = `rgba(200, 200, 200, ${cobwebAlpha * 0.4})`;
            ctx.lineWidth = 1;
            // Top-left cobweb
            if (done < 3) {
                ctx.beginPath();
                ctx.moveTo(houseX, houseY);
                ctx.lineTo(houseX + 40, houseY);
                ctx.lineTo(houseX, houseY + 40);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(houseX, houseY); ctx.lineTo(houseX + 25, houseY + 15); ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(houseX, houseY); ctx.lineTo(houseX + 15, houseY + 25); ctx.stroke();
            }
            // Top-right cobweb
            ctx.beginPath();
            ctx.moveTo(houseX + houseW, houseY);
            ctx.lineTo(houseX + houseW - 45, houseY);
            ctx.lineTo(houseX + houseW, houseY + 45);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(houseX + houseW, houseY); ctx.lineTo(houseX + houseW - 30, houseY + 18); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(houseX + houseW, houseY); ctx.lineTo(houseX + houseW - 18, houseY + 30); ctx.stroke();
        }

        // Trash/mess on ground (disappears with progress)
        if (done < 3) {
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            const messItems = ['🗑️', '📦', '🧦', '🥫', '📰'];
            for (let i = 0; i < 5 - done; i++) {
                ctx.fillText(messItems[i], houseX - 30 + i * 30, h * 0.54);
            }
            ctx.fillText('🗑️', houseX + houseW + 20, h * 0.54);
            if (done < 2) ctx.fillText('🧹', houseX + houseW + 45, h * 0.53);
        }

        // Boarded-up look on some windows when very messy
        // (drawn before windows so boards appear behind glass)

        // Windows — light up for completed levels
        const windowPositions = [
            { x: w / 2 - 160, y: h * 0.2 },
            { x: w / 2 - 80, y: h * 0.2 },
            { x: w / 2 + 40, y: h * 0.2 },
            { x: w / 2 + 120, y: h * 0.2 },
            { x: w / 2 - 120, y: h * 0.32 },
            { x: w / 2 + 80, y: h * 0.32 },
        ];
        const levelNames = ['Living Room', 'Kitchen', 'Bathroom', 'Kids Room', 'Parents Room', 'Terrace'];

        for (let i = 0; i < windowPositions.length; i++) {
            const wp = windowPositions[i];
            const completed = this.completedLevels.includes(i);

            // Dirty window grime (uncompleted windows look grimier when fewer levels done)
            if (!completed && done < 4) {
                ctx.fillStyle = `rgba(60, 50, 40, ${0.15 - done * 0.03})`;
                ctx.fillRect(wp.x - 2, wp.y - 2, 54, 44);
            }

            ctx.fillStyle = completed ? '#FFFF88' : (done < 2 ? '#3A3A55' : '#555577');
            ctx.fillRect(wp.x, wp.y, 50, 40);

            // Window cross frame
            ctx.strokeStyle = completed ? '#A08040' : '#8B4513';
            ctx.lineWidth = 2;
            ctx.strokeRect(wp.x, wp.y, 50, 40);
            ctx.beginPath();
            ctx.moveTo(wp.x + 25, wp.y); ctx.lineTo(wp.x + 25, wp.y + 40);
            ctx.moveTo(wp.x, wp.y + 20); ctx.lineTo(wp.x + 50, wp.y + 20);
            ctx.stroke();

            // Warm glow from completed windows
            if (completed) {
                ctx.fillStyle = 'rgba(255, 255, 136, 0.15)';
                ctx.fillRect(wp.x - 4, wp.y + 40, 58, 15);

                const lvData = this.saveManager && this.saveManager.getLevel(this.selectedCharacterName, i);
                const stars = lvData ? lvData.stars : 0;
                ctx.fillStyle = '#333';
                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('★'.repeat(stars) + '☆'.repeat(3 - stars), wp.x + 25, wp.y + 25);
            }

            // Cracked glass on uncompleted windows when messy
            if (!completed && done < 2) {
                ctx.strokeStyle = 'rgba(200, 200, 220, 0.3)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(wp.x + 10, wp.y + 5);
                ctx.lineTo(wp.x + 25, wp.y + 20);
                ctx.lineTo(wp.x + 35, wp.y + 15);
                ctx.stroke();
            }
        }

        // Roof — tiles look nicer over time
        ctx.fillStyle = done >= 4 ? '#CD853F' : done >= 2 ? '#B8734A' : '#A06038';
        ctx.beginPath();
        ctx.moveTo(w / 2 - 220, h * 0.15);
        ctx.lineTo(w / 2, h * 0.02);
        ctx.lineTo(w / 2 + 220, h * 0.15);
        ctx.fill();
        // Roof outline
        ctx.strokeStyle = done >= 3 ? '#8B6540' : '#704020';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w / 2 - 220, h * 0.15);
        ctx.lineTo(w / 2, h * 0.02);
        ctx.lineTo(w / 2 + 220, h * 0.15);
        ctx.stroke();

        // Missing/damaged roof tiles when messy
        if (done < 3) {
            ctx.fillStyle = wallColors[done];
            ctx.fillRect(w / 2 - 80, h * 0.08, 15, 8);
            if (done < 2) ctx.fillRect(w / 2 + 60, h * 0.09, 12, 7);
        }

        // Chimney (appears at 3+)
        if (done >= 3) {
            ctx.fillStyle = '#8B6540';
            ctx.fillRect(w / 2 + 100, h * 0.02, 30, h * 0.06);
            if (done >= 5) {
                // Cute smoke puffs
                ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
                const smokeY = h * 0.02 - 8 - Math.sin(t / 800) * 4;
                ctx.beginPath();
                ctx.arc(w / 2 + 115, smokeY, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(w / 2 + 120, smokeY - 12, 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Flowers & planters (grow with progress)
        if (done >= 2) {
            // Flower boxes under windows
            ctx.fillStyle = '#8B5E3C';
            ctx.fillRect(w / 2 - 158, h * 0.2 + 42, 46, 8);
            ctx.fillRect(w / 2 + 122, h * 0.2 + 42, 46, 8);
            // Flowers
            const flowerColors = ['#FF6B8A', '#FF8C42', '#FFD93D', '#6BCB77', '#9B59B6'];
            for (let i = 0; i < Math.min(done - 1, 4); i++) {
                ctx.fillStyle = flowerColors[i];
                const fx1 = w / 2 - 152 + i * 12;
                const fx2 = w / 2 + 128 + i * 12;
                ctx.beginPath(); ctx.arc(fx1, h * 0.2 + 40, 4, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(fx2, h * 0.2 + 40, 4, 0, Math.PI * 2); ctx.fill();
                // Stems
                ctx.strokeStyle = '#2D5A27';
                ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(fx1, h * 0.2 + 44); ctx.lineTo(fx1, h * 0.2 + 50); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(fx2, h * 0.2 + 44); ctx.lineTo(fx2, h * 0.2 + 50); ctx.stroke();
            }
        }

        // Ground flowers (appear at 5+)
        if (done >= 5) {
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('🌷', houseX - 20, h * 0.555);
            ctx.fillText('🌻', houseX + houseW + 25, h * 0.555);
            ctx.fillText('🌺', houseX + houseW + 50, h * 0.55);
        }

        // Bougainvillea climbing wall (appears at 4+)
        if (done >= 4) {
            ctx.fillStyle = '#2D5A27';
            // Vine on left side
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#2D5A27';
            ctx.beginPath();
            ctx.moveTo(houseX + 5, houseY + houseH);
            ctx.bezierCurveTo(houseX + 3, houseY + houseH * 0.5, houseX + 15, houseY + houseH * 0.3, houseX + 10, houseY + 20);
            ctx.stroke();
            // Pink flowers on vine
            const pinkFlowers = [[houseX + 8, houseY + houseH - 30], [houseX + 5, houseY + houseH - 60],
                                 [houseX + 10, houseY + houseH - 90], [houseX + 7, houseY + houseH - 120]];
            ctx.fillStyle = '#E84393';
            for (const [fx, fy] of pinkFlowers) {
                ctx.beginPath(); ctx.arc(fx, fy, 4, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(fx + 5, fy - 2, 3, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(fx - 3, fy - 3, 3, 0, Math.PI * 2); ctx.fill();
            }
        }

        // Sparkle particles when fully clean
        if (done >= 6) {
            ctx.fillStyle = '#FFD700';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'center';
            for (let i = 0; i < 5; i++) {
                const sparklePhase = t / 600 + i * 1.3;
                const alpha = 0.3 + 0.4 * Math.abs(Math.sin(sparklePhase));
                ctx.globalAlpha = alpha;
                const sx = houseX + 30 + i * 85;
                const sy = houseY + 20 + Math.sin(sparklePhase * 0.7) * 15;
                ctx.fillText('✨', sx, sy);
            }
            ctx.globalAlpha = 1;
        }

        // Character at door
        const ch = CHARACTERS[this.selectedIndex];
        drawCharacter(ctx, w / 2 - 20, h * 0.40, 40, 55, ch, 1, null);

        // Title
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.strokeText('TIDY UP!', w / 2, h * 0.7);
        ctx.fillText('TIDY UP!', w / 2, h * 0.7);

        // Next level info
        const nextLevel = this.completedLevels.length;
        if (nextLevel < 6) {
            ctx.font = '16px monospace';
            ctx.fillStyle = '#FFD700';
            ctx.fillText(`Next: ${levelNames[nextLevel]}`, w / 2, h * 0.78);
        } else {
            ctx.font = '16px monospace';
            ctx.fillStyle = '#00FF00';
            ctx.fillText('✨ ALL ROOMS TIDY! ✨', w / 2, h * 0.78);
        }

        // Overall tidy % for selected character
        if (this.saveManager) {
            const overall = this.saveManager.getOverallPercent(this.selectedCharacterName);
            ctx.font = '14px monospace';
            ctx.fillStyle = overall >= 90 ? '#00FF00' : overall >= 50 ? '#FFD700' : '#FF6644';
            ctx.fillText(`${ch.name}'s Tidiness: ${overall}%`, w / 2, h * 0.84);

            // Save code
            const code = this.saveManager.getSaveCode();
            if (code) {
                ctx.font = '9px monospace';
                ctx.fillStyle = '#666';
                ctx.fillText(`Save code: ${code}`, w / 2, h * 0.97);
            }
        }

        // Prompt
        const blink = Math.sin(t / 400) > 0;
        if (blink) {
            ctx.font = '14px monospace';
            ctx.fillStyle = '#FFD700';
            ctx.fillText('Press ENTER to go inside', w / 2, h * 0.88);
        }

        ctx.font = '12px monospace';
        ctx.fillStyle = '#888';
        ctx.fillText('← → to change character', w / 2, h * 0.94);
    }
}
