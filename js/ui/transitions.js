// ─── Transition screens: Opening intro, Level intros, Boss intros ───

import { Boss } from '../entities/boss.js';

// ─── Story Data ────────────────────────────────────────────────────

const OPENING_STORY = [
    { speaker: null, text: "The family has just arrived home from a week in Barcelona..." },
    { speaker: null, text: "Steve unlocks the front door. A wave of dust rolls out." },
    { speaker: 'Hara', text: "¡Dios mío! What happened to our house?!" },
    { speaker: 'Steve', text: "I... may have forgotten to close the windows before we left." },
    { speaker: 'Hara', text: "There are ANTS in the kitchen. MOTHS in the wardrobe. Is that a PIGEON on the terrace?!" },
    { speaker: 'Derek', text: "Cool! My toys are everywhere!" },
    { speaker: 'Juno', text: "There's something growing in the fridge..." },
    { speaker: 'Hara', text: "Nobody is sleeping until this house is SPOTLESS. ¡Vamos!" },
];

const LEVEL_INTROS = [
    {
        room: 'THE LIVING ROOM',
        color: '#D4C4A8',
        floorColor: '#8B7355',
        speaker: 'Hara',
        line: "Start with the living room! I can't even see the sofa under all this mess!",
        detail: "Cushions everywhere, remote controls lost, and is that Roomba... still running?",
    },
    {
        room: 'THE KITCHEN',
        color: '#F0E8D8',
        floorColor: '#E8E0D0',
        speaker: 'Hara',
        line: "The kitchen next! Something in the fridge is making noises!",
        detail: "Dirty plates stacked high, ants marching across the counter, and a suspicious green glow from the fridge...",
    },
    {
        room: 'THE BATHROOM',
        color: '#E8F0F0',
        floorColor: '#B8D0D8',
        speaker: 'Hara',
        line: "Now the bathroom! I'm afraid to look behind the shower curtain...",
        detail: "Wet towels on the floor, rubber ducks multiplying, and the washing machine sounds... angry.",
    },
    {
        room: "THE KIDS' ROOM",
        color: '#F5E8D0',
        floorColor: '#C4A882',
        speaker: 'Hara',
        line: "Derek! Juno! Your room is a WAR ZONE! Fix it — NOW!",
        detail: "LEGO landmines, rogue toy soldiers, and the toy box is overflowing with attitude.",
    },
    {
        room: "THE PARENTS' ROOM",
        color: '#E8E0D8',
        floorColor: '#A0886B',
        speaker: 'Hara',
        line: "Even OUR bedroom is a disaster! How did moths get into the wardrobe?!",
        detail: "Laundry mountains, alarm clocks with a mind of their own, and something shifting inside the wardrobe...",
    },
    {
        room: 'THE TERRACE',
        color: '#87CEEB',
        floorColor: '#C4A070',
        speaker: 'Hara',
        line: "Last room — the terrace! Watch out for that barbecue, Steve left it uncleaned ALL SUMMER!",
        detail: "Wasps everywhere, pigeons nesting in the plants, and the BBQ is... smoking on its own?!",
    },
];

const BOSS_INTROS = [
    {
        name: 'MEGA ROOMBA',
        subtitle: 'The Dust Devil',
        color: '#555555',
        glowColor: '#00FF00',
        text: "You've tidied most of the living room — but the Roomba has gone ROGUE. It's sucking up everything in sight, including the stuff you just cleaned!",
        tip: "Shoot it 3 times to overload its motor!",
        bossConfig: { label: 'MEGA ROOMBA', color: '#555555', width: 96, height: 50 },
    },
    {
        name: 'FRIDGE BEAST',
        subtitle: 'The Forgotten Leftovers',
        color: '#4477AA',
        glowColor: '#00FFAA',
        text: "The kitchen's looking better... but nobody's opened this fridge since before the holiday. Whatever's inside has evolved. It has DOORS now. And it's not happy about the cleaning.",
        tip: "Shoot the doors open, then stomp!",
        bossConfig: { label: 'FRIDGE BEAST', color: '#4477AA', width: 130, height: 90 },
    },
    {
        name: 'WASHING MACHINE',
        subtitle: 'The Spin Cycle of Doom',
        color: '#AAAACC',
        glowColor: '#4488FF',
        text: "The bathroom's nearly done — but someone overloaded the washing machine with every sock in the house. It's shaking, rattling, and flooding the floor. And it's looking at you funny.",
        tip: "Wait for the drain cycle!",
        bossConfig: { label: 'WASHING MACHINE', color: '#AAAACC', width: 120, height: 85 },
    },
    {
        name: 'TOY BOX TERROR',
        subtitle: 'Playtime Is Over',
        color: '#CD853F',
        glowColor: '#FFAA00',
        text: "The room's almost clean... but the Toy Box has had ENOUGH. Years of being stuffed full have given it sentience — and an army. It's calling in reinforcements from under the bed.",
        tip: "Shoot into the open lid, or stomp its minions!",
        bossConfig: { label: 'TOY BOX TERROR', color: '#CD853F', width: 100, height: 50 },
    },
    {
        name: 'WARDROBE MONSTER',
        subtitle: 'Fashion Nightmare',
        color: '#654321',
        glowColor: '#FF4444',
        text: "The bedroom's looking great — but the wardrobe has been sealed shut for months. Something inside has been feeding on forgotten scarves and odd socks. It TELEPORTS. It has TEETH.",
        tip: "Catch it during re-opening!",
        bossConfig: { label: 'WARDROBE MONSTER', color: '#654321', width: 100, height: 60 },
    },
    {
        name: 'BBQ DRAGON',
        subtitle: 'The Final Flame',
        color: '#8B2500',
        glowColor: '#FF6600',
        text: "The terrace is nearly spotless — but Steve's beloved barbecue hasn't been cleaned since last summer. Grease, coal, and rage have fused together into something ancient. Something that breathes FIRE.",
        tip: "Cool its heat counter with your shots!",
        bossConfig: { label: 'BBQ DRAGON', color: '#8B2500', width: 160, height: 80 },
    },
];

// ─── Character colors for speech bubbles ───────────────────────────
const SPEAKER_COLORS = {
    'Hara':  { bg: '#CC3366', text: '#fff' },
    'Steve': { bg: '#3366CC', text: '#fff' },
    'Derek': { bg: '#33CC66', text: '#fff' },
    'Juno':  { bg: '#CC9933', text: '#fff' },
};

// ─── Transition Manager ────────────────────────────────────────────

export class TransitionManager {
    constructor() {
        this.active = false;
        this.type = null;     // 'opening', 'level', 'boss'
        this.timer = 0;
        this.phase = 0;       // sub-phase within transition
        this.data = null;
        this.charIndex = 0;   // typewriter character index
        this.charTimer = 0;
        this.done = false;    // user can advance
        this.canSkip = false;
        this.skipCooldown = 0;
    }

    // ── Start transitions ──────────────────────────────────────────

    startOpening() {
        this.active = true;
        this.type = 'opening';
        this.timer = 0;
        this.phase = 0;
        this.data = OPENING_STORY;
        this.charIndex = 0;
        this.charTimer = 0;
        this.done = false;
        this.canSkip = false;
        this.skipCooldown = 0.4;
    }

    startLevelIntro(levelIndex) {
        this.active = true;
        this.type = 'level';
        this.timer = 0;
        this.phase = 0;
        this.data = LEVEL_INTROS[levelIndex];
        this.charIndex = 0;
        this.charTimer = 0;
        this.done = false;
        this.canSkip = false;
        this.skipCooldown = 0.3;
    }

    startBossIntro(levelIndex) {
        this.active = true;
        this.type = 'boss';
        this.timer = 0;
        this.phase = 0;
        this.data = BOSS_INTROS[levelIndex];
        this._previewBoss = null;
        this.charIndex = 0;
        this.charTimer = 0;
        this.done = false;
        this.canSkip = false;
        this.skipCooldown = 0.3;
    }

    // ── Update ─────────────────────────────────────────────────────

    update(dt, input) {
        if (!this.active) return false;

        this.timer += dt;
        this.skipCooldown -= dt;

        if (this.type === 'opening') return this._updateOpening(dt, input);
        if (this.type === 'level') return this._updateLevel(dt, input);
        if (this.type === 'boss') return this._updateBoss(dt, input);
        return false;
    }

    _updateOpening(dt, input) {
        const line = this.data[this.phase];
        const fullText = line.text;

        // Typewriter
        this.charTimer += dt;
        const charsPerSec = 40;
        this.charIndex = Math.min(fullText.length, Math.floor(this.charTimer * charsPerSec));

        const textDone = this.charIndex >= fullText.length;
        this.canSkip = this.skipCooldown <= 0;

        const advance = this.canSkip && (input.wasPressed('Enter') || input.wasPressed(' '));

        if (advance) {
            if (!textDone) {
                // Skip to end of current line
                this.charIndex = fullText.length;
                this.charTimer = fullText.length / charsPerSec;
                return false;
            }
            // Next line
            this.phase++;
            this.charIndex = 0;
            this.charTimer = 0;
            this.skipCooldown = 0.15;
            if (this.phase >= this.data.length) {
                this.active = false;
                return true; // done
            }
        }
        return false;
    }

    _updateLevel(dt, input) {
        // Phase 0: room name slides in (0.8s)
        // Phase 1: Hara's line typewriters in
        // Phase 2: detail text fades in, wait for input
        const advance = this.canSkip && (input.wasPressed('Enter') || input.wasPressed(' '));
        this.canSkip = this.skipCooldown <= 0;

        if (this.phase === 0) {
            if (this.timer > 0.8) {
                this.phase = 1;
                this.charIndex = 0;
                this.charTimer = 0;
            }
            // Allow skip to end
            if (advance) {
                this.phase = 2;
                this.charIndex = 999;
                this.timer = 10;
            }
        } else if (this.phase === 1) {
            this.charTimer += dt;
            const text = this.data.line;
            this.charIndex = Math.min(text.length, Math.floor(this.charTimer * 45));
            if (this.charIndex >= text.length) {
                this.phase = 2;
                this.timer = 0;
            }
            if (advance) {
                this.charIndex = text.length;
                this.phase = 2;
                this.timer = 0;
            }
        } else if (this.phase === 2) {
            if (advance) {
                this.active = false;
                return true;
            }
        }
        return false;
    }

    _updateBoss(dt, input) {
        // Phase 0: screen darkens, boss name slams in (0.6s)
        // Phase 1: subtitle + text typewriter
        // Phase 2: tip appears, wait for input
        const advance = this.canSkip && (input.wasPressed('Enter') || input.wasPressed(' '));
        this.canSkip = this.skipCooldown <= 0;

        if (this.phase === 0) {
            if (this.timer > 0.8) {
                this.phase = 1;
                this.charIndex = 0;
                this.charTimer = 0;
            }
            if (advance) {
                this.phase = 2;
                this.charIndex = 999;
                this.timer = 10;
            }
        } else if (this.phase === 1) {
            this.charTimer += dt;
            const text = this.data.text;
            this.charIndex = Math.min(text.length, Math.floor(this.charTimer * 50));
            if (this.charIndex >= text.length) {
                this.phase = 2;
                this.timer = 0;
            }
            if (advance) {
                this.charIndex = text.length;
                this.phase = 2;
                this.timer = 0;
            }
        } else if (this.phase === 2) {
            if (advance) {
                this.active = false;
                return true;
            }
        }
        return false;
    }

    // ── Render ─────────────────────────────────────────────────────

    render(ctx, w, h) {
        if (!this.active) return;

        if (this.type === 'opening') this._renderOpening(ctx, w, h);
        if (this.type === 'level') this._renderLevel(ctx, w, h);
        if (this.type === 'boss') this._renderBoss(ctx, w, h);
    }

    // ── Opening Story ──────────────────────────────────────────────

    _renderOpening(ctx, w, h) {
        // Dark background with slight vignette
        ctx.fillStyle = '#0a0a12';
        ctx.fillRect(0, 0, w, h);

        // Draw a messy house silhouette at top
        this._drawMessyHouse(ctx, w, h);

        // Current dialogue
        const line = this.data[this.phase];
        const displayText = line.text.substring(0, this.charIndex);
        const speaker = line.speaker;

        const boxY = h * 0.62;
        const boxH = h * 0.32;
        const boxPad = 60;

        // Dialogue box background
        ctx.fillStyle = 'rgba(20, 20, 35, 0.95)';
        roundRect(ctx, boxPad - 10, boxY, w - boxPad * 2 + 20, boxH, 12);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        roundRect(ctx, boxPad - 10, boxY, w - boxPad * 2 + 20, boxH, 12);
        ctx.stroke();

        // Speaker tag
        if (speaker) {
            const sc = SPEAKER_COLORS[speaker] || { bg: '#666', text: '#fff' };
            ctx.font = 'bold 16px monospace';
            const tagW = ctx.measureText(speaker).width + 24;
            ctx.fillStyle = sc.bg;
            roundRect(ctx, boxPad + 10, boxY - 14, tagW, 28, 6);
            ctx.fill();
            ctx.fillStyle = sc.text;
            ctx.textAlign = 'left';
            ctx.fillText(speaker, boxPad + 22, boxY + 5);
        }

        // Dialogue text
        ctx.font = '18px monospace';
        ctx.fillStyle = '#E8E0D0';
        ctx.textAlign = 'left';
        wrapText(ctx, displayText, boxPad + 16, boxY + 40, w - boxPad * 2 - 20, 26);

        // Blinking cursor
        if (this.charIndex < line.text.length) {
            const blink = Math.sin(Date.now() / 200) > 0;
            if (blink) {
                ctx.fillStyle = '#FFD700';
                ctx.fillText('▌', boxPad + 16 + getTextEndX(ctx, displayText, w - boxPad * 2 - 20), getTextEndY(ctx, displayText, boxY + 40, w - boxPad * 2 - 20, 26));
            }
        }

        // Continue prompt
        if (this.charIndex >= line.text.length) {
            const blink = Math.sin(Date.now() / 400) > 0;
            if (blink) {
                ctx.font = '13px monospace';
                ctx.fillStyle = '#FFD700';
                ctx.textAlign = 'center';
                if (this.phase < this.data.length - 1) {
                    ctx.fillText('Press ENTER to continue ▸', w / 2, boxY + boxH - 12);
                } else {
                    ctx.fillText("Press ENTER — let's get tidying! ▸", w / 2, boxY + boxH - 12);
                }
            }
        }

        // Progress dots
        ctx.textAlign = 'center';
        for (let i = 0; i < this.data.length; i++) {
            ctx.fillStyle = i <= this.phase ? '#FFD700' : 'rgba(255,255,255,0.2)';
            ctx.beginPath();
            ctx.arc(w / 2 + (i - this.data.length / 2) * 18 + 9, h - 16, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    _drawMessyHouse(ctx, w, h) {
        const cx = w / 2;
        const houseY = h * 0.12;
        const houseW = 340;
        const houseH = 200;

        // Night sky with stars
        for (let i = 0; i < 20; i++) {
            const sx = ((i * 137 + 50) % w);
            const sy = ((i * 73 + 20) % (h * 0.5));
            const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(Date.now() / 800 + i));
            ctx.fillStyle = `rgba(255, 255, 220, ${twinkle * 0.5})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // House body
        ctx.fillStyle = '#3a3028';
        ctx.fillRect(cx - houseW / 2, houseY, houseW, houseH);

        // Roof
        ctx.fillStyle = '#2a1a10';
        ctx.beginPath();
        ctx.moveTo(cx - houseW / 2 - 20, houseY);
        ctx.lineTo(cx, houseY - 60);
        ctx.lineTo(cx + houseW / 2 + 20, houseY);
        ctx.fill();

        // Windows — dim and messy
        const wins = [
            { x: cx - 120, y: houseY + 30 },
            { x: cx - 40, y: houseY + 30 },
            { x: cx + 50, y: houseY + 30 },
            { x: cx - 120, y: houseY + 100 },
            { x: cx + 50, y: houseY + 100 },
        ];
        for (const win of wins) {
            // Dirty window
            ctx.fillStyle = 'rgba(60, 50, 30, 0.9)';
            ctx.fillRect(win.x, win.y, 55, 45);
            // Grime streaks
            ctx.strokeStyle = 'rgba(80, 70, 40, 0.5)';
            ctx.lineWidth = 1;
            for (let s = 0; s < 3; s++) {
                ctx.beginPath();
                ctx.moveTo(win.x + 10 + s * 15, win.y + 5);
                ctx.lineTo(win.x + 5 + s * 15, win.y + 40);
                ctx.stroke();
            }
            // Window frame
            ctx.strokeStyle = '#1a1208';
            ctx.lineWidth = 2;
            ctx.strokeRect(win.x, win.y, 55, 45);
        }

        // Door — ajar with dust coming out
        ctx.fillStyle = '#1a1208';
        ctx.fillRect(cx - 20, houseY + 90, 40, houseH - 90);
        // Door slightly open
        ctx.fillStyle = '#2a2018';
        ctx.fillRect(cx - 18, houseY + 92, 12, houseH - 94);

        // Dust clouds coming out of door
        const t = Date.now() / 1000;
        for (let d = 0; d < 4; d++) {
            const dx = cx - 5 + Math.sin(t * 1.5 + d) * 20 - d * 8;
            const dy = houseY + 160 + Math.cos(t + d * 0.7) * 5 - d * 15;
            const size = 8 + d * 3;
            const alpha = 0.15 - d * 0.03;
            ctx.fillStyle = `rgba(180, 170, 140, ${alpha})`;
            ctx.beginPath();
            ctx.arc(dx, dy, size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Cobwebs on corners
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.15)';
        ctx.lineWidth = 1;
        // Top-left corner
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(cx - houseW / 2, houseY + i * 8);
            ctx.quadraticCurveTo(cx - houseW / 2 + 15, houseY + 15, cx - houseW / 2 + i * 8, houseY);
            ctx.stroke();
        }
    }

    // ── Level Intro ────────────────────────────────────────────────

    _renderLevel(ctx, w, h) {
        const d = this.data;

        // Background — room color with gradient
        ctx.fillStyle = d.color;
        ctx.fillRect(0, 0, w, h);

        // Floor
        ctx.fillStyle = d.floorColor;
        ctx.fillRect(0, h * 0.75, w, h * 0.25);

        // Subtle diagonal stripes pattern
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        for (let i = -h; i < w + h; i += 30) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + h, h);
            ctx.stroke();
        }
        ctx.restore();

        // Room name — slide in from left
        const slideT = Math.min(1, this.timer / 0.6);
        const eased = 1 - Math.pow(1 - slideT, 3); // ease-out cubic
        const nameX = -400 + (w / 2 + 400) * eased;

        // Title banner
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, h * 0.2 - 10, w, 80);

        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        ctx.lineWidth = 4;
        ctx.strokeText(d.room, nameX, h * 0.2 + 45);
        ctx.fillStyle = '#fff';
        ctx.fillText(d.room, nameX, h * 0.2 + 45);

        // Hara's speech bubble (phase 1+)
        if (this.phase >= 1) {
            const bubbleY = h * 0.42;
            const bubbleW = w - 180;
            const bubbleH = 90;
            const bubbleX = (w - bubbleW) / 2;

            // Bubble bg
            ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
            roundRect(ctx, bubbleX, bubbleY, bubbleW, bubbleH, 14);
            ctx.fill();
            ctx.strokeStyle = '#CC3366';
            ctx.lineWidth = 3;
            roundRect(ctx, bubbleX, bubbleY, bubbleW, bubbleH, 14);
            ctx.stroke();

            // Speaker tag
            ctx.fillStyle = '#CC3366';
            roundRect(ctx, bubbleX + 16, bubbleY - 12, 60, 24, 6);
            ctx.fill();
            ctx.font = 'bold 13px monospace';
            ctx.fillStyle = '#fff';
            ctx.textAlign = 'left';
            ctx.fillText('Hara', bubbleX + 26, bubbleY + 4);

            // Speech text (typewriter)
            const displayLine = d.line.substring(0, Math.min(d.line.length, this.charIndex));
            ctx.font = '17px monospace';
            ctx.fillStyle = '#222';
            ctx.textAlign = 'left';
            wrapText(ctx, displayLine, bubbleX + 20, bubbleY + 36, bubbleW - 40, 24);
        }

        // Detail text (phase 2)
        if (this.phase >= 2) {
            const fadeT = Math.min(1, this.timer / 0.5);
            ctx.save();
            ctx.globalAlpha = fadeT;
            ctx.font = '14px monospace';
            ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
            ctx.textAlign = 'center';
            wrapText(ctx, d.detail, w / 2, h * 0.68, w - 160, 20, true);
            ctx.restore();

            // Continue prompt
            const blink = Math.sin(Date.now() / 400) > 0;
            if (blink) {
                ctx.font = '14px monospace';
                ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
                ctx.textAlign = 'center';
                ctx.fillText('Press ENTER to start ▸', w / 2, h * 0.92);
            }
        }
    }

    // ── Boss Intro ─────────────────────────────────────────────────

    _renderBoss(ctx, w, h) {
        const d = this.data;

        // Dramatic dark background
        ctx.fillStyle = '#0a0508';
        ctx.fillRect(0, 0, w, h);

        // Red/glow gradient from bottom
        const grd = ctx.createLinearGradient(0, h, 0, h * 0.4);
        grd.addColorStop(0, d.glowColor + '30');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);

        // Animated glow pulse behind boss preview area
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() / 300);
        const glowRad = 180 + pulse * 40;
        const glowGrd = ctx.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, glowRad);
        glowGrd.addColorStop(0, d.glowColor + '20');
        glowGrd.addColorStop(1, 'transparent');
        ctx.fillStyle = glowGrd;
        ctx.fillRect(0, 0, w, h);

        // Boss name — slam in effect
        const slamT = Math.min(1, this.timer / 0.4);
        const slamScale = slamT < 1 ? 2.5 - 1.5 * (1 - Math.pow(1 - slamT, 3)) : 1.0;
        const slamAlpha = Math.min(1, this.timer / 0.3);

        ctx.save();
        ctx.globalAlpha = slamAlpha;
        ctx.translate(w / 2, h * 0.10);
        ctx.scale(slamScale, slamScale);

        // Boss name with glow
        ctx.font = 'bold 48px sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = d.glowColor;
        ctx.shadowBlur = 20;
        ctx.fillStyle = '#fff';
        ctx.fillText(d.name, 0, 0);
        ctx.shadowBlur = 0;
        ctx.restore();

        // Subtitle (fades in after name)
        if (this.timer > 0.5) {
            const subT = Math.min(1, (this.timer - 0.5) / 0.4);
            ctx.save();
            ctx.globalAlpha = subT;
            ctx.font = 'italic 18px sans-serif';
            ctx.fillStyle = d.glowColor;
            ctx.textAlign = 'center';
            ctx.fillText(`— ${d.subtitle} —`, w / 2, h * 0.17);
            ctx.restore();
        }

        // ── Boss Preview Rendering ─────────────────────────────────
        if (this.timer > 0.3 && d.bossConfig) {
            const previewT = Math.min(1, (this.timer - 0.3) / 0.5);
            const eased = 1 - Math.pow(1 - previewT, 3);

            ctx.save();
            ctx.globalAlpha = eased;

            // Scale boss up for dramatic presentation
            const scale = 2.2;
            const bossW = d.bossConfig.width;
            const bossH = d.bossConfig.height;
            const previewCx = w / 2;
            const previewCy = h * 0.40;

            // Entrance: slight rise from below
            const riseOffset = (1 - eased) * 30;

            // Glow circle behind boss
            const glowPulse = 0.15 + 0.1 * Math.sin(Date.now() / 400);
            ctx.fillStyle = d.glowColor.slice(0, 7) + Math.round(glowPulse * 255).toString(16).padStart(2, '0');
            ctx.beginPath();
            ctx.ellipse(previewCx, previewCy + riseOffset, bossW * scale * 0.6, bossH * scale * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();

            // Create temporary boss for rendering
            if (!this._previewBoss || this._previewBoss.label !== d.bossConfig.label) {
                this._previewBoss = new Boss(0, 0, {
                    label: d.bossConfig.label,
                    color: d.bossConfig.color,
                    width: d.bossConfig.width,
                    height: d.bossConfig.height,
                });
                this._previewBoss.direction = 1;
            }

            // Position the preview boss so drawBody renders at center of screen
            const boss = this._previewBoss;

            // Idle animation — subtle breathing/hovering
            const breathe = Math.sin(Date.now() / 600) * 3;

            ctx.translate(previewCx, previewCy + riseOffset + breathe);
            ctx.scale(scale, scale);

            // drawBody expects sx, sy relative to canvas — center the boss
            const sx = -bossW / 2;
            const sy = -bossH / 2;
            const cx = 0;
            const cy = 0;

            // Shadow under boss
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.beginPath();
            ctx.ellipse(0, bossH / 2 + 6, bossW / 2 + 6, 10, 0, 0, Math.PI * 2);
            ctx.fill();

            // Draw the boss body and eyes using the Boss class methods
            boss.drawBody(ctx, sx, sy, cx, cy, bossW, bossH, d.bossConfig.color);
            boss.drawEyes(ctx, cx, cy, bossW, bossH);

            ctx.restore();
        }

        // Decorative line below boss
        if (this.timer > 0.6) {
            const lineT = Math.min(1, (this.timer - 0.6) / 0.3);
            const lineW = 300 * lineT;
            ctx.strokeStyle = d.glowColor + '60';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(w / 2 - lineW / 2, h * 0.58);
            ctx.lineTo(w / 2 + lineW / 2, h * 0.58);
            ctx.stroke();
        }

        // Story text (phase 1+)
        if (this.phase >= 1) {
            const displayText = d.text.substring(0, Math.min(d.text.length, this.charIndex));
            ctx.font = '15px monospace';
            ctx.fillStyle = '#C8C0B0';
            ctx.textAlign = 'center';
            wrapText(ctx, displayText, w / 2, h * 0.62, w - 160, 22, true);
        }

        // Tip + continue (phase 2)
        if (this.phase >= 2) {
            const fadeT = Math.min(1, this.timer / 0.5);
            ctx.save();
            ctx.globalAlpha = fadeT;

            // Tip box
            ctx.font = 'bold 15px monospace';
            const measuredW = ctx.measureText('💡 ' + d.tip).width + 50;
            ctx.fillStyle = 'rgba(255, 215, 0, 0.12)';
            roundRect(ctx, (w - measuredW) / 2, h * 0.82, measuredW, 36, 8);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.lineWidth = 1;
            roundRect(ctx, (w - measuredW) / 2, h * 0.82, measuredW, 36, 8);
            ctx.stroke();

            ctx.fillStyle = '#FFD700';
            ctx.textAlign = 'center';
            ctx.fillText('💡 ' + d.tip, w / 2, h * 0.82 + 24);

            ctx.restore();

            // Continue prompt
            const blink = Math.sin(Date.now() / 400) > 0;
            if (blink) {
                ctx.font = '14px monospace';
                ctx.fillStyle = d.glowColor;
                ctx.textAlign = 'center';
                ctx.fillText('Press ENTER to fight ▸', w / 2, h * 0.93);
            }
        }
    }
}

// ─── Utility: rounded rectangle path ──────────────────────────────

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// ─── Utility: word-wrap text ──────────────────────────────────────

function wrapText(ctx, text, x, y, maxWidth, lineHeight, centered) {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (const word of words) {
        const testLine = line + (line ? ' ' : '') + word;
        if (ctx.measureText(testLine).width > maxWidth && line) {
            if (centered) {
                ctx.fillText(line, x, curY);
            } else {
                ctx.fillText(line, x, curY);
            }
            line = word;
            curY += lineHeight;
        } else {
            line = testLine;
        }
    }
    if (line) {
        ctx.fillText(line, x, curY);
    }
}

// ─── Utility: get cursor position for typewriter ──────────────────

function getTextEndX(ctx, text, maxWidth) {
    const words = text.split(' ');
    let line = '';
    let lastLineWidth = 0;

    for (const word of words) {
        const testLine = line + (line ? ' ' : '') + word;
        if (ctx.measureText(testLine).width > maxWidth && line) {
            line = word;
        } else {
            line = testLine;
        }
    }
    return ctx.measureText(line).width;
}

function getTextEndY(ctx, text, startY, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = startY;

    for (const word of words) {
        const testLine = line + (line ? ' ' : '') + word;
        if (ctx.measureText(testLine).width > maxWidth && line) {
            line = word;
            curY += lineHeight;
        } else {
            line = testLine;
        }
    }
    return curY;
}
