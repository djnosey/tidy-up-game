import { ROAMING, CHARGING, STUNNED, SPINNING, SHOOTING, VULNERABLE } from '../../entities/bosses/boss-states.js';
import { BbqDragonBehavior } from '../../entities/bosses/bbq-dragon.js';

// ─── Boss Rendering ─────────────────────────────────────────────────
// All visual/drawing code for bosses lives here, separated from
// the Boss entity's state machine, physics, and collision logic.

export function renderBoss(ctx, boss, camera) {
    if (!boss.alive) return;

    let sx = boss.x - camera.x;
    let sy = boss.y - camera.y;

    ctx.save();

    // Render arena hazards behind boss
    renderHazards(ctx, boss, camera);

    if (boss.flashTimer > 0 && Math.floor(boss.flashTimer * 12) % 2 === 0) {
        ctx.globalAlpha = 0.4;
    }

    // Wardrobe teleport fade
    if (boss.state === 'teleport') {
        const fade = boss.teleportDone ? Math.min(1, (1.0 - boss.stateTimer) * 3) : Math.max(0, boss.stateTimer * 2);
        ctx.globalAlpha = fade;
    }

    const cx = sx + boss.width / 2;
    const cy = sy + boss.height / 2;
    const w = boss.width;
    const h = boss.height;

    if (boss.state === SPINNING) {
        ctx.translate(cx, cy);
        ctx.rotate(boss.spinAngle);
        ctx.translate(-cx, -cy);
    }

    const stateColor = boss.state === STUNNED ? '#AAAA44' :
                       boss.state === VULNERABLE ? '#44AA44' :
                       boss.state === CHARGING ? '#993333' :
                       boss.state === SPINNING ? '#885588' :
                       boss.state === SHOOTING ? '#448888' : boss.color;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(cx, sy + h + 4, w / 2 + 4, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw body based on boss type
    drawBossBody(ctx, boss, sx, sy, cx, cy, w, h, stateColor);

    // Eyes (shared across all bosses)
    drawBossEyes(ctx, boss, cx, cy, w, h);

    // State indicators — visual only, no hand-holding text
    ctx.textAlign = 'center';
    if (boss.state === STUNNED) {
        ctx.font = '14px sans-serif';
        for (let i = 0; i < 3; i++) {
            const a = Date.now() / 250 + i * Math.PI * 2 / 3;
            ctx.fillStyle = '#FFD700';
            ctx.fillText('⭐', cx + Math.cos(a) * (w/2 + 5), sy - 10 + Math.sin(a) * 8);
        }
    } else if (boss.state === VULNERABLE) {
        // Green pulsing glow — visual cue that boss is stompable
        const pulse = 0.4 + Math.sin(Date.now() / 100) * 0.3;
        ctx.fillStyle = `rgba(0, 255, 0, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, w / 2 + 8, h / 2 + 8, 0, 0, Math.PI * 2);
        ctx.fill();
        // Dizzy swirls
        ctx.font = '14px sans-serif';
        for (let i = 0; i < 3; i++) {
            const a = Date.now() / 200 + i * Math.PI * 2 / 3;
            ctx.fillText('💫', cx + Math.cos(a) * (w/2 + 10), sy - 8 + Math.sin(a) * 6);
        }
    }

    // Health pips — compact layout for higher health
    const pipR = boss.maxHealth > 6 ? 5 : 7;
    const pipGap = boss.maxHealth > 6 ? 14 : 18;
    const pipStartX = cx - ((boss.maxHealth - 1) * pipGap) / 2;
    for (let i = 0; i < boss.maxHealth; i++) {
        ctx.fillStyle = i < boss.health ? '#FF3333' : '#333';
        ctx.beginPath(); ctx.arc(pipStartX + i * pipGap, sy - 18, pipR, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.stroke();
    }

    // Projectile counter indicator (shows progress toward vulnerability)
    if (boss.label === 'MEGA ROOMBA' || boss.label === 'BBQ DRAGON') {
        const max = boss.label === 'MEGA ROOMBA' ? 3 :
                    BbqDragonBehavior.getHeatMax(boss);
        const current = boss.label === 'BBQ DRAGON' ?
            (boss.heatCounter ?? max) : (3 - boss.projectileCounter);
        // Small meter below health
        const meterW = 60, meterH = 5;
        const mx = cx - meterW / 2;
        const my = sy - 8;
        ctx.fillStyle = '#333';
        ctx.fillRect(mx, my, meterW, meterH);
        const fill = 1 - (current / max);
        ctx.fillStyle = fill >= 0.9 ? '#0F0' : '#0AF';
        ctx.fillRect(mx, my, meterW * fill, meterH);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.5;
        ctx.strokeRect(mx, my, meterW, meterH);
    }

    // Fridge door indicator
    if (boss.label === 'FRIDGE BEAST' && boss.doorsOpen) {
        const pulse = 0.5 + Math.sin(Date.now() / 100) * 0.3;
        ctx.fillStyle = `rgba(0, 255, 100, ${pulse})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, w / 2 + 5, h / 2 + 5, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Projectiles
    for (const p of boss.projectiles) {
        if (!p.alive) continue;
        const px = p.x - camera.x + p.width/2;
        const py = p.y - camera.y + p.height/2;
        if (p.emoji) {
            ctx.font = `${p.width + 4}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(p.emoji, px, py);
        } else {
            ctx.fillStyle = 'rgba(140,140,140,0.7)';
            ctx.beginPath(); ctx.arc(px, py, p.width/2 + 3, 0, Math.PI*2); ctx.fill();
        }
    }

    // Minions
    for (const m of boss.minions) {
        if (!m.alive) continue;
        const mx = m.x - camera.x + m.width / 2;
        const my = m.y - camera.y + m.height / 2;
        ctx.font = `${m.width}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(m.emoji || '🧸', mx, my);
    }

    // Particles
    for (const p of boss.particles) {
        ctx.globalAlpha = Math.max(0, p.life / 0.7);
        ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x - camera.x, p.y - camera.y, p.size, 0, Math.PI*2); ctx.fill();
    }

    // Phase transition flash — white burst that fades out
    if (boss.phaseFlashTimer > 0) {
        const alpha = Math.min(0.6, boss.phaseFlashTimer);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.ellipse(cx, cy, w + 30, h + 30, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();

    // Darkness overlay (wardrobe monster) — drawn AFTER restore so it covers everything
    if (boss.darknessAlpha > 0) {
        ctx.save();
        ctx.fillStyle = `rgba(0, 0, 0, ${boss.darknessAlpha})`;
        ctx.fillRect(0, 0, 960, 600);
        // Boss eyes glow through darkness
        if (boss.darknessAlpha > 0.4) {
            const ecx = boss.x - camera.x + boss.width / 2;
            const ecy = boss.y - camera.y + boss.height * 0.4;
            ctx.fillStyle = '#FF0000';
            ctx.beginPath(); ctx.arc(ecx - 10, ecy, 4, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(ecx + 10, ecy, 4, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
    }
}

// ─── Arena Hazards ───────────────────────────────��──────────────────

function renderHazards(ctx, boss, camera) {
    for (const h of boss.arenaHazards) {
        const hx = h.x - camera.x;
        const hy = h.y - camera.y;

        if (h.type === 'dust') {
            ctx.fillStyle = `rgba(180, 160, 120, ${Math.min(0.5, h.timer / 3)})`;
            ctx.fillRect(hx, hy, h.width, h.height);
        } else if (h.type === 'water') {
            const alpha = Math.min(0.4, h.height / 200);
            ctx.fillStyle = `rgba(80, 140, 220, ${alpha})`;
            ctx.fillRect(hx, hy, h.width, h.height);
            // Water surface line
            ctx.strokeStyle = `rgba(150, 200, 255, ${alpha + 0.1})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (let wx = 0; wx < h.width; wx += 20) {
                const waveY = hy + Math.sin(Date.now() / 300 + wx * 0.05) * 3;
                if (wx === 0) ctx.moveTo(hx + wx, waveY);
                else ctx.lineTo(hx + wx, waveY);
            }
            ctx.stroke();
        } else if (h.type === 'mist') {
            ctx.fillStyle = `rgba(180, 220, 255, ${Math.min(0.3, h.timer / 3)})`;
            ctx.fillRect(hx, hy, h.width, h.height);
        } else if (h.type === 'fire' || h.type === 'firebeam') {
            const alpha = Math.min(0.7, h.timer / 2);
            ctx.fillStyle = `rgba(255, 80, 0, ${alpha})`;
            ctx.fillRect(hx, hy, h.width, h.height);
            ctx.fillStyle = `rgba(255, 200, 0, ${alpha * 0.6})`;
            ctx.fillRect(hx + 3, hy + 2, h.width - 6, h.height - 4);
            // Flickering flames
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            for (let fx = 0; fx < h.width; fx += 25) {
                if (Math.random() > 0.5) {
                    ctx.fillText('🔥', hx + fx + 12, hy - 2);
                }
            }
        }
    }
}

// ─── Per-Boss Body Drawing ──────────────────────────────────────────

export function drawBossBody(ctx, boss, sx, sy, cx, cy, w, h, color) {
    const label = boss.label;

    if (label === 'MEGA ROOMBA') {
        drawMegaRoomba(ctx, boss, sx, sy, cx, cy, w, h, color);
    } else if (label === 'FRIDGE BEAST') {
        drawFridgeBeast(ctx, boss, sx, sy, cx, cy, w, h, color);
    } else if (label === 'WASHING MACHINE') {
        drawWashingMachine(ctx, boss, sx, sy, cx, cy, w, h, color);
    } else if (label === 'TOY BOX TERROR') {
        drawToyBoxTerror(ctx, boss, sx, sy, cx, cy, w, h, color);
    } else if (label === 'WARDROBE MONSTER') {
        drawWardrobeMonster(ctx, boss, sx, sy, cx, cy, w, h, color);
    } else if (label === 'BBQ DRAGON') {
        drawBbqDragon(ctx, boss, sx, sy, cx, cy, w, h, color);
    } else {
        // Generic fallback
        ctx.fillStyle = color;
        roundRect(ctx, sx, sy, w, h, 6);
        ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
        ctx.strokeRect(sx + 2, sy + 2, w - 4, h - 4);
    }
}

function drawMegaRoomba(ctx, boss, sx, sy, cx, cy, w, h, color) {
    // Disc shape
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.ellipse(cx, cy, w/2, h/2, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#333'; ctx.lineWidth = 3; ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.ellipse(cx, cy, w/3, h/3, 0, 0, Math.PI*2); ctx.stroke();
    // LED — changes color based on projectile hits
    const ledColor = boss.projectileCounter >= 2 ? '#FF0' : boss.projectileCounter >= 1 ? '#FA0' : '#0F0';
    ctx.fillStyle = ledColor; ctx.beginPath(); ctx.arc(cx, cy - h/4, 3, 0, Math.PI*2); ctx.fill();
    // Suction indicator
    if (boss.state === 'suction') {
        ctx.strokeStyle = 'rgba(100,150,255,0.3)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 4; i++) {
            const r = 30 + i * 25 + Math.sin(Date.now() / 200 + i) * 10;
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
        }
    }
}

function drawFridgeBeast(ctx, boss, sx, sy, cx, cy, w, h, color) {
    // Rectangular fridge body
    ctx.fillStyle = color;
    roundRect(ctx, sx + 5, sy, w - 10, h, 5);
    // Door split — wider if doors open
    const doorGap = boss.doorsOpen ? 12 : 0;
    ctx.strokeStyle = '#335'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - doorGap, sy + 5); ctx.lineTo(cx - doorGap, sy + h - 5); ctx.stroke();
    if (boss.doorsOpen) {
        ctx.beginPath(); ctx.moveTo(cx + doorGap, sy + 5); ctx.lineTo(cx + doorGap, sy + h - 5); ctx.stroke();
        // Interior glow when open
        ctx.fillStyle = 'rgba(200, 255, 200, 0.3)';
        ctx.fillRect(cx - doorGap + 2, sy + 5, doorGap * 2 - 4, h - 10);
    }
    // Handles
    ctx.fillStyle = '#AAA';
    ctx.fillRect(cx - 5 - doorGap, cy - 8, 3, 16);
    ctx.fillRect(cx + 2 + doorGap, cy - 8, 3, 16);
    // Magnets
    ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🧲', sx + 18, cy - 5);
    ctx.fillText('📝', sx + w - 18, cy - 5);
    // Frost effect
    ctx.fillStyle = 'rgba(200,220,255,0.2)';
    roundRect(ctx, sx + 8, sy + 3, w - 16, h - 6, 3);
}

function drawWashingMachine(ctx, boss, sx, sy, cx, cy, w, h, color) {
    // Boxy body
    ctx.fillStyle = color;
    roundRect(ctx, sx + 3, sy, w - 6, h, 6);
    // Door (circle window)
    ctx.fillStyle = '#889';
    ctx.beginPath(); ctx.arc(cx, cy + 2, h/3, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#667';
    ctx.beginPath(); ctx.arc(cx, cy + 2, h/3 - 4, 0, Math.PI*2); ctx.fill();
    // Spin indicator inside
    const spin = Date.now() / 200;
    ctx.strokeStyle = 'rgba(200,220,255,0.5)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy + 2, h/4, spin, spin + 2); ctx.stroke();
    // Control panel
    ctx.fillStyle = '#999';
    ctx.fillRect(sx + 10, sy + 3, w - 20, 8);
    ctx.fillStyle = '#0F0'; ctx.beginPath(); ctx.arc(sx + w - 18, sy + 7, 3, 0, Math.PI*2); ctx.fill();
    // Vibration effect when attacking
    if (boss.state === SPINNING || boss.state === CHARGING) {
        ctx.translate((Math.random()-0.5)*4, (Math.random()-0.5)*3);
    }
    // Draining indicator
    if (boss.state === 'draining') {
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('💧', cx + 20, sy + h + 10);
        ctx.fillText('💧', cx - 15, sy + h + 8);
    }
}

function drawToyBoxTerror(ctx, boss, sx, sy, cx, cy, w, h, color) {
    // Wooden box
    ctx.fillStyle = color;
    roundRect(ctx, sx + 2, sy + 5, w - 4, h - 5, 4);
    // Wood grain
    ctx.strokeStyle = 'rgba(0,0,0,0.1)'; ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 15) { ctx.beginPath(); ctx.moveTo(sx+2+i, sy+5); ctx.lineTo(sx+2+i, sy+h); ctx.stroke(); }
    // Lid (hinged) — opens wider during summon/lidslam
    const lidAngle = boss.lidOpen ? -25 : -12;
    ctx.fillStyle = '#D4A55A';
    ctx.beginPath();
    ctx.moveTo(sx, sy + 5); ctx.lineTo(sx + w, sy + 5);
    ctx.lineTo(sx + w - 5, sy + lidAngle); ctx.lineTo(sx + 5, sy + lidAngle);
    ctx.fill();
    ctx.strokeStyle = '#8B6914'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(sx, sy+5); ctx.lineTo(sx+w, sy+5); ctx.stroke();
    // Toys peeking out
    ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    if (boss.lidOpen) {
        ctx.fillText('🧸', cx - 15, sy - 5); ctx.fillText('🚂', cx + 15, sy - 5);
        ctx.fillText('🎲', cx, sy - 10);
    } else {
        ctx.fillText('🧸', cx - 15, sy); ctx.fillText('🚂', cx + 15, sy);
    }
    // Metal corners
    ctx.fillStyle = '#888';
    ctx.fillRect(sx + 2, sy + 5, 8, 8); ctx.fillRect(sx + w - 10, sy + 5, 8, 8);
}

function drawWardrobeMonster(ctx, boss, sx, sy, cx, cy, w, h, color) {
    // Tall wardrobe body
    ctx.fillStyle = color;
    roundRect(ctx, sx + 3, sy - 15, w - 6, h + 15, 4);
    // Doors
    ctx.strokeStyle = '#4a2a0a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx, sy - 12); ctx.lineTo(cx, sy + h - 3); ctx.stroke();
    // Door panels
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(sx + 8, sy - 8, w/2 - 10, h + 3);
    ctx.fillRect(cx + 4, sy - 8, w/2 - 10, h + 3);
    // Handles (look like teeth/fangs)
    ctx.fillStyle = '#DDD';
    ctx.beginPath(); ctx.moveTo(cx - 4, cy - 5); ctx.lineTo(cx - 2, cy + 8); ctx.lineTo(cx - 6, cy + 8); ctx.fill();
    ctx.beginPath(); ctx.moveTo(cx + 4, cy - 5); ctx.lineTo(cx + 2, cy + 8); ctx.lineTo(cx + 6, cy + 8); ctx.fill();
    // Crown molding
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(sx, sy - 18, w, 6);
}

function drawBbqDragon(ctx, boss, sx, sy, cx, cy, w, h, color) {
    const t = Date.now();

    // === HEAT SHIMMER around the boss ===
    if (boss.state !== STUNNED && boss.state !== VULNERABLE) {
        ctx.fillStyle = 'rgba(255, 100, 0, 0.04)';
        for (let i = 0; i < 5; i++) {
            const shimX = cx + Math.sin(t/200 + i*1.3) * (w/2 + 20);
            const shimY = cy + Math.cos(t/250 + i*1.7) * (h/2 + 10);
            ctx.beginPath(); ctx.arc(shimX, shimY, 15 + Math.sin(t/100+i)*5, 0, Math.PI*2); ctx.fill();
        }
    }

    // === LEGS ===
    ctx.fillStyle = '#333';
    ctx.fillRect(sx + 12, sy + h - 2, 6, 14);
    ctx.fillRect(sx + w - 18, sy + h - 2, 6, 14);
    // Wheels
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.arc(sx + 15, sy + h + 12, 6, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx + w - 15, sy + h + 12, 6, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#444';
    ctx.beginPath(); ctx.arc(sx + 15, sy + h + 12, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx + w - 15, sy + h + 12, 3, 0, Math.PI*2); ctx.fill();

    // === MAIN BODY — barrel grill ===
    const bodyGrad = ctx.createLinearGradient(sx, sy, sx, sy + h);
    bodyGrad.addColorStop(0, (boss.state === STUNNED || boss.state === VULNERABLE) ? '#888' : '#5A1500');
    bodyGrad.addColorStop(0.5, (boss.state === STUNNED || boss.state === VULNERABLE) ? '#777' : color);
    bodyGrad.addColorStop(1, (boss.state === STUNNED || boss.state === VULNERABLE) ? '#666' : '#4A0A00');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath(); ctx.ellipse(cx, cy, w/2, h/2, 0, 0, Math.PI*2); ctx.fill();

    // Metal rim
    ctx.strokeStyle = '#2A0A00'; ctx.lineWidth = 3; ctx.stroke();

    // Grill lines
    const grillGlow = (boss.state === CHARGING || boss.state === SHOOTING || boss.state === 'firebeam') ? '#FF6600' : '#555';
    ctx.strokeStyle = grillGlow; ctx.lineWidth = 2;
    for (let i = -3; i <= 3; i++) {
        ctx.beginPath(); ctx.moveTo(cx - w/3, cy + i * (h/8)); ctx.lineTo(cx + w/3, cy + i * (h/8)); ctx.stroke();
    }

    // Glowing coals inside
    if (boss.state !== STUNNED && boss.state !== VULNERABLE) {
        const coalGlow = 0.3 + Math.sin(t/200) * 0.15;
        ctx.fillStyle = `rgba(255, 80, 0, ${coalGlow})`;
        ctx.beginPath(); ctx.ellipse(cx, cy + 3, w/3, h/3, 0, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = `rgba(255, 200, 0, ${coalGlow * 0.5})`;
        ctx.beginPath(); ctx.ellipse(cx, cy + 3, w/5, h/5, 0, 0, Math.PI*2); ctx.fill();
    }

    // === DRAGON HEAD ===
    const headX = boss.direction === 1 ? sx + w - 5 : sx + 5;
    const headDir = boss.direction;
    ctx.fillStyle = (boss.state === STUNNED || boss.state === VULNERABLE) ? '#777' : '#6A1A00';
    ctx.beginPath();
    ctx.moveTo(headX, cy - 10);
    ctx.lineTo(headX + headDir * 25, cy - 20);
    ctx.lineTo(headX + headDir * 25, cy + 5);
    ctx.lineTo(headX, cy + 10);
    ctx.fill();
    ctx.fillStyle = (boss.state === STUNNED || boss.state === VULNERABLE) ? '#888' : '#7A2000';
    ctx.beginPath();
    ctx.arc(headX + headDir * 30, cy - 8, 16, 0, Math.PI * 2);
    ctx.fill();
    const jawOpen = (boss.state === SHOOTING || boss.state === 'firebeam') ? 8 : 3;
    ctx.fillStyle = (boss.state === STUNNED || boss.state === VULNERABLE) ? '#666' : '#5A1500';
    ctx.beginPath();
    ctx.moveTo(headX + headDir * 35, cy - 3);
    ctx.lineTo(headX + headDir * 50, cy - 1 + jawOpen);
    ctx.lineTo(headX + headDir * 35, cy + 5 + jawOpen);
    ctx.fill();
    // Teeth
    ctx.fillStyle = '#FFF';
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(headX + headDir * (38 + i*4), cy - 2);
        ctx.lineTo(headX + headDir * (40 + i*4), cy + 3);
        ctx.lineTo(headX + headDir * (36 + i*4), cy + 3);
        ctx.fill();
    }
    // Nostril smoke
    if (boss.state !== STUNNED && boss.state !== VULNERABLE) {
        ctx.fillStyle = 'rgba(150,150,150,0.4)';
        ctx.beginPath(); ctx.arc(headX + headDir * 42, cy - 14, 4 + Math.sin(t/100)*2, 0, Math.PI*2); ctx.fill();
    }

    // === FIRE BREATH ===
    if ((boss.state === SHOOTING || boss.state === CHARGING || boss.state === 'firebeam') &&
        boss.state !== STUNNED && boss.state !== VULNERABLE) {
        const fireX = headX + headDir * 48;
        const fireLen = (boss.state === SHOOTING || boss.state === 'firebeam') ? 60 : 35;
        ctx.fillStyle = '#FF2200';
        ctx.beginPath();
        ctx.moveTo(fireX, cy - 12);
        for (let i = 0; i < 6; i++) {
            const fx = fireX + headDir * (fireLen * (i/5));
            const fy = cy + Math.sin(t/30 + i*1.5) * (5 + i*3);
            ctx.lineTo(fx, fy - 8 - Math.random()*4);
        }
        for (let i = 5; i >= 0; i--) {
            const fx = fireX + headDir * (fireLen * (i/5));
            const fy = cy + Math.sin(t/40 + i*1.2) * (4 + i*2);
            ctx.lineTo(fx, fy + 8 + Math.random()*4);
        }
        ctx.fill();
        ctx.fillStyle = '#FFAA00';
        ctx.beginPath();
        ctx.moveTo(fireX, cy - 6);
        for (let i = 0; i < 4; i++) {
            const fx = fireX + headDir * (fireLen * 0.6 * (i/3));
            ctx.lineTo(fx, cy - 4 + Math.sin(t/25 + i)*3);
        }
        for (let i = 3; i >= 0; i--) {
            const fx = fireX + headDir * (fireLen * 0.6 * (i/3));
            ctx.lineTo(fx, cy + 4 + Math.sin(t/35 + i)*3);
        }
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,200,0.6)';
        ctx.beginPath(); ctx.ellipse(fireX + headDir * 5, cy, 8, 4, 0, 0, Math.PI*2); ctx.fill();
    }

    // === SMOKE ===
    const smokeCount = (boss.state === STUNNED || boss.state === VULNERABLE) ? 2 : 6;
    for (let i = 0; i < smokeCount; i++) {
        const smokeAlpha = (boss.state === STUNNED || boss.state === VULNERABLE) ? 0.1 : 0.2 + Math.sin(t/300+i)*0.1;
        ctx.fillStyle = `rgba(80,80,80,${smokeAlpha})`;
        const smokeX = cx + Math.sin(t/300 + i*2.1) * (w/3);
        const smokeY = sy - 15 - i * 12 - Math.sin(t/250 + i)*5;
        const smokeR = 6 + i * 3 + Math.sin(t/200+i)*2;
        ctx.beginPath(); ctx.arc(smokeX, smokeY, smokeR, 0, Math.PI*2); ctx.fill();
    }

    // === HORNS ===
    if (boss.state !== STUNNED && boss.state !== VULNERABLE) {
        ctx.fillStyle = '#4A0A00';
        ctx.beginPath();
        ctx.moveTo(headX + headDir * 22, cy - 20);
        ctx.lineTo(headX + headDir * 18, cy - 35);
        ctx.lineTo(headX + headDir * 28, cy - 18);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(headX + headDir * 32, cy - 22);
        ctx.lineTo(headX + headDir * 30, cy - 38);
        ctx.lineTo(headX + headDir * 38, cy - 20);
        ctx.fill();
    }

    // Handle on top
    ctx.fillStyle = '#333';
    ctx.fillRect(cx - 15, sy - 5, 30, 4);
    ctx.fillStyle = '#555';
    ctx.fillRect(cx - 12, sy - 8, 24, 5);

    // Heat counter visual — small flame icons
    if (boss.heatCounter !== undefined && boss.state !== VULNERABLE && boss.state !== STUNNED) {
        const max = BbqDragonBehavior.getHeatMax(boss);
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        for (let i = 0; i < max; i++) {
            ctx.globalAlpha = i < boss.heatCounter ? 1 : 0.2;
            ctx.fillText('🔥', cx - ((max-1) * 8) / 2 + i * 8, sy - 30);
        }
        ctx.globalAlpha = 1;
    }
}

// ─── Shared Drawing Helpers ─────────────────────────────────────────

export function drawBossEyes(ctx, boss, cx, cy, w, h) {
    const eyeSpread = w * 0.17;
    const eyeY = cy - h * 0.1;
    const eyeSize = boss.state === CHARGING ? 9 : 7;

    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(cx - eyeSpread, eyeY, eyeSize, eyeSize - 1, 0, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + eyeSpread, eyeY, eyeSize, eyeSize - 1, 0, 0, Math.PI*2); ctx.fill();

    if (boss.state === STUNNED || boss.state === VULNERABLE) {
        // X eyes for stunned, spiral eyes for vulnerable
        ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
        if (boss.state === STUNNED) {
            for (const ex of [cx - eyeSpread, cx + eyeSpread]) {
                ctx.beginPath(); ctx.moveTo(ex-3, eyeY-3); ctx.lineTo(ex+3, eyeY+3); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(ex+3, eyeY-3); ctx.lineTo(ex-3, eyeY+3); ctx.stroke();
            }
        } else {
            // Dizzy spiral eyes for vulnerable
            const t = Date.now() / 200;
            for (const ex of [cx - eyeSpread, cx + eyeSpread]) {
                ctx.beginPath();
                for (let a = 0; a < Math.PI * 4; a += 0.3) {
                    const r = a * 0.8;
                    ctx.lineTo(ex + Math.cos(a + t) * r, eyeY + Math.sin(a + t) * r);
                }
                ctx.stroke();
            }
        }
    } else {
        ctx.fillStyle = boss.state === CHARGING ? '#FF0000' : '#111';
        const pd = boss.direction * 2;
        ctx.beginPath(); ctx.arc(cx - eyeSpread + pd, eyeY, 3.5, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(cx + eyeSpread + pd, eyeY, 3.5, 0, Math.PI*2); ctx.fill();

        if (boss.state !== ROAMING) {
            ctx.strokeStyle = '#333'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(cx-eyeSpread-8, eyeY-9); ctx.lineTo(cx-eyeSpread+5, eyeY-5); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(cx+eyeSpread+8, eyeY-9); ctx.lineTo(cx+eyeSpread-5, eyeY-5); ctx.stroke();
        }
    }
}

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y); ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r); ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h); ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r); ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath(); ctx.fill();
}
