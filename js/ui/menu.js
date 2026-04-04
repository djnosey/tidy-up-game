import { CHARACTERS } from '../data/characters.js';

export class Menu {
    constructor() {
        this.selectedIndex = 0;
        this.state = 'title'; // 'title', 'select', 'hub'
        this.completedLevels = [];
        this.enterPressed = false;
        this.saveManager = null;
        this.selectedCharacterName = '';
        this.loadCodeMode = false;
        this.loadCodeInput = '';
        this.loadCodeStatus = ''; // '', 'loading', 'success', 'fail'
    }

    handleInput(input) {
        // Load-code mode: handled via raw keyboard listener (see enableLoadCodeInput)
        if (this.loadCodeMode) return null;

        if (input.wasPressed('Enter') || input.wasPressed(' ')) {
            if (this.state === 'title') {
                this.state = 'select';
                return null;
            }
            if (this.state === 'select') {
                return { action: 'start', character: CHARACTERS[this.selectedIndex] };
            }
            if (this.state === 'hub') {
                return { action: 'start', character: CHARACTERS[this.selectedIndex] };
            }
        }

        if (this.state === 'select' || this.state === 'hub') {
            if (input.wasPressed('ArrowLeft')) {
                this.selectedIndex = (this.selectedIndex - 1 + CHARACTERS.length) % CHARACTERS.length;
            }
            if (input.wasPressed('ArrowRight')) {
                this.selectedIndex = (this.selectedIndex + 1) % CHARACTERS.length;
            }
        }

        // "L" on title screen to enter a save code
        if (this.state === 'title' && input.wasPressed('l') && this.saveManager) {
            this.enableLoadCodeInput();
        }

        if (input.wasPressed('Escape') && this.state === 'select') {
            this.state = 'title';
        }

        return null;
    }

    enableLoadCodeInput() {
        this.loadCodeMode = true;
        this.loadCodeInput = '';
        this.loadCodeStatus = '';

        // Temporary raw keyboard handler for typing the code
        this._loadCodeHandler = (e) => {
            if (e.key === 'Escape') {
                this.disableLoadCodeInput();
            } else if (e.key === 'Enter' && this.loadCodeInput.length > 0) {
                this.loadCodeStatus = 'loading';
                this.saveManager.loadFromCode(this.loadCodeInput.trim()).then(ok => {
                    this.loadCodeStatus = ok ? 'success' : 'fail';
                    setTimeout(() => this.disableLoadCodeInput(), 1500);
                });
            } else if (e.key === 'Backspace') {
                this.loadCodeInput = this.loadCodeInput.slice(0, -1);
            } else if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
                // Allow paste
                navigator.clipboard.readText().then(text => {
                    this.loadCodeInput += text.trim();
                }).catch(() => {});
            } else if (e.key.length === 1 && /[a-zA-Z0-9-]/.test(e.key)) {
                this.loadCodeInput += e.key;
            }
            e.preventDefault();
        };
        window.addEventListener('keydown', this._loadCodeHandler);
    }

    disableLoadCodeInput() {
        this.loadCodeMode = false;
        if (this._loadCodeHandler) {
            window.removeEventListener('keydown', this._loadCodeHandler);
            this._loadCodeHandler = null;
        }
    }

    goToHub() {
        this.state = 'hub';
    }

    render(ctx, canvasWidth, canvasHeight) {
        ctx.save();

        if (this.state === 'title') {
            this.renderTitle(ctx, canvasWidth, canvasHeight);
        } else if (this.state === 'select') {
            this.renderSelect(ctx, canvasWidth, canvasHeight);
        } else if (this.state === 'hub') {
            this.renderHub(ctx, canvasWidth, canvasHeight);
        }

        ctx.restore();
    }

    renderTitle(ctx, w, h) {
        // Background — street scene placeholder
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, w, h * 0.6);
        ctx.fillStyle = '#D4A574';
        ctx.fillRect(0, h * 0.6, w, h * 0.4);

        // House facade
        ctx.fillStyle = '#F5DEB3';
        ctx.fillRect(w / 2 - 150, h * 0.2, 300, h * 0.4);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(w / 2 - 30, h * 0.4, 60, h * 0.2); // door
        // Windows
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(w / 2 - 110, h * 0.28, 50, 40);
        ctx.fillRect(w / 2 + 60, h * 0.28, 50, 40);
        // Roof
        ctx.fillStyle = '#CD853F';
        ctx.beginPath();
        ctx.moveTo(w / 2 - 170, h * 0.2);
        ctx.lineTo(w / 2, h * 0.05);
        ctx.lineTo(w / 2 + 170, h * 0.2);
        ctx.fill();

        // Title
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 4;
        ctx.font = 'bold 56px sans-serif';
        ctx.textAlign = 'center';
        ctx.strokeText('TIDY UP!', w / 2, h * 0.78);
        ctx.fillText('TIDY UP!', w / 2, h * 0.78);

        // Subtitle
        ctx.font = '18px monospace';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.strokeText('A Family Platformer', w / 2, h * 0.85);
        ctx.fillText('A Family Platformer', w / 2, h * 0.85);

        // Load code input overlay
        if (this.loadCodeMode) {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(w / 2 - 200, h * 0.55, 400, 80);
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.strokeRect(w / 2 - 200, h * 0.55, 400, 80);

            ctx.font = '14px monospace';
            ctx.fillStyle = '#FFD700';
            ctx.fillText('Enter Save Code:', w / 2, h * 0.55 + 20);

            // Input field
            ctx.font = '12px monospace';
            ctx.fillStyle = '#fff';
            const cursor = Math.sin(Date.now() / 300) > 0 ? '|' : '';
            ctx.fillText(this.loadCodeInput + cursor, w / 2, h * 0.55 + 45);

            // Status
            if (this.loadCodeStatus === 'loading') {
                ctx.fillStyle = '#aaa';
                ctx.fillText('Loading...', w / 2, h * 0.55 + 65);
            } else if (this.loadCodeStatus === 'success') {
                ctx.fillStyle = '#00FF00';
                ctx.fillText('Scores loaded!', w / 2, h * 0.55 + 65);
            } else if (this.loadCodeStatus === 'fail') {
                ctx.fillStyle = '#FF4444';
                ctx.fillText('Invalid code', w / 2, h * 0.55 + 65);
            } else {
                ctx.fillStyle = '#888';
                ctx.fillText('ENTER to load  •  ESC to cancel  •  Ctrl+V to paste', w / 2, h * 0.55 + 65);
            }
            ctx.restore();
            return;
        }

        // Prompt
        const blink = Math.sin(Date.now() / 400) > 0;
        if (blink) {
            ctx.font = '16px monospace';
            ctx.fillStyle = '#FFD700';
            ctx.fillText('Press ENTER to start', w / 2, h * 0.88);
        }

        ctx.font = '11px monospace';
        ctx.fillStyle = '#666';
        ctx.fillText('Press L to load a save code', w / 2, h * 0.95);
    }

    renderSelect(ctx, w, h) {
        ctx.fillStyle = '#2a2a3a';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('CHOOSE YOUR CHARACTER', w / 2, 70);

        const cardW = 140;
        const cardH = 200;
        const gap = 30;
        const totalW = CHARACTERS.length * cardW + (CHARACTERS.length - 1) * gap;
        const startX = (w - totalW) / 2;

        for (let i = 0; i < CHARACTERS.length; i++) {
            const ch = CHARACTERS[i];
            const cx = startX + i * (cardW + gap);
            const cy = 120;

            const selected = i === this.selectedIndex;

            // Card background
            ctx.fillStyle = selected ? '#444466' : '#333344';
            ctx.fillRect(cx, cy, cardW, cardH);

            // Selection border
            if (selected) {
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 3;
                ctx.strokeRect(cx - 2, cy - 2, cardW + 4, cardH + 4);
            }

            // Character placeholder
            ctx.fillStyle = ch.color;
            ctx.fillRect(cx + 30, cy + 20, 80, 100);

            // Name
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 18px monospace';
            ctx.fillText(ch.name, cx + cardW / 2, cy + 145);

            // Role
            ctx.font = '13px monospace';
            ctx.fillStyle = '#aaa';
            ctx.fillText(ch.role, cx + cardW / 2, cy + 165);

            // Projectile
            ctx.font = '11px monospace';
            ctx.fillStyle = ch.projectileColor;
            ctx.fillText(ch.projectileLabel, cx + cardW / 2, cy + 185);
        }

        // Instructions
        ctx.font = '14px monospace';
        ctx.fillStyle = '#888';
        ctx.fillText('← → to choose  •  ENTER to play', w / 2, h - 60);

        // Controls reminder
        ctx.font = '12px monospace';
        ctx.fillStyle = '#666';
        ctx.fillText('Controls: ← → Move  |  S Jump  |  ↓ Crouch  |  D Shoot', w / 2, h - 30);
    }

    renderHub(ctx, w, h) {
        // Street background
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, w, h * 0.55);
        ctx.fillStyle = '#D4A574';
        ctx.fillRect(0, h * 0.55, w, h * 0.45);

        // House
        ctx.fillStyle = '#F5DEB3';
        ctx.fillRect(w / 2 - 200, h * 0.15, 400, h * 0.4);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(w / 2 - 30, h * 0.35, 60, h * 0.2); // door

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
            ctx.fillStyle = completed ? '#FFFF88' : '#555577';
            ctx.fillRect(wp.x, wp.y, 50, 40);
            ctx.strokeStyle = '#8B4513';
            ctx.lineWidth = 2;
            ctx.strokeRect(wp.x, wp.y, 50, 40);

            if (completed) {
                // Show star rating from save data
                const lvData = this.saveManager && this.saveManager.getLevel(this.selectedCharacterName, i);
                const stars = lvData ? lvData.stars : 0;
                ctx.fillStyle = '#333';
                ctx.font = '10px monospace';
                ctx.textAlign = 'center';
                ctx.fillText('★'.repeat(stars) + '☆'.repeat(3 - stars), wp.x + 25, wp.y + 25);
            }
        }

        // Roof
        ctx.fillStyle = '#CD853F';
        ctx.beginPath();
        ctx.moveTo(w / 2 - 220, h * 0.15);
        ctx.lineTo(w / 2, h * 0.02);
        ctx.lineTo(w / 2 + 220, h * 0.15);
        ctx.fill();

        // Character at door
        const ch = CHARACTERS[this.selectedIndex];
        ctx.fillStyle = ch.color;
        ctx.fillRect(w / 2 - 20, h * 0.45, 40, 55);
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(ch.name, w / 2, h * 0.49);

        // Title
        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
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
            ctx.fillText('ALL ROOMS TIDY!', w / 2, h * 0.78);
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
        const blink = Math.sin(Date.now() / 400) > 0;
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
