import { CHARACTERS } from '../data/characters.js';
import { drawCharacter } from '../engine/renderers/character-renderer.js';
import { HubWorld } from './hub-world.js';

export class Menu {
    constructor() {
        this.selectedIndex = 0;
        this.state = 'title'; // 'title', 'select', 'hub'
        this.enterPressed = false;
        this.loadCodeMode = false;
        this.loadCodeInput = '';
        this.loadCodeStatus = ''; // '', 'loading', 'success', 'fail'
        // HubWorld must be created before setting proxied properties
        this.hubWorld = new HubWorld();
        this.saveManager = null;
        this.selectedCharacterName = '';
    }

    // Proxy shared properties to hubWorld so external code (main.js) can
    // continue to read/write them on the Menu instance transparently.
    get completedLevels() {
        return this.hubWorld.completedLevels;
    }
    set completedLevels(val) {
        this.hubWorld.completedLevels = val;
    }

    get saveManager() {
        return this._saveManager;
    }
    set saveManager(val) {
        this._saveManager = val;
        this.hubWorld.saveManager = val;
    }

    get selectedCharacterName() {
        return this._selectedCharacterName;
    }
    set selectedCharacterName(val) {
        this._selectedCharacterName = val;
        this.hubWorld.selectedCharacterName = val;
    }

    handleInput(input) {
        // Load-code mode: handled via raw keyboard listener (see enableLoadCodeInput)
        if (this.loadCodeMode) return null;

        if (this.state === 'hub') {
            const result = this.hubWorld.handleInput(input);
            // Sync selectedIndex back so main.js sees character changes
            this.selectedIndex = this.hubWorld.selectedIndex;
            return result;
        }

        if (input.wasPressed('Enter') || input.wasPressed(' ')) {
            if (this.state === 'title') {
                this.state = 'select';
                return null;
            }
            if (this.state === 'select') {
                return { action: 'start', character: CHARACTERS[this.selectedIndex] };
            }
        }

        if (this.state === 'select') {
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
        this.hubWorld.selectedIndex = this.selectedIndex;
    }

    render(ctx, canvasWidth, canvasHeight) {
        ctx.save();

        if (this.state === 'title') {
            this.renderTitle(ctx, canvasWidth, canvasHeight);
        } else if (this.state === 'select') {
            this.renderSelect(ctx, canvasWidth, canvasHeight);
        } else if (this.state === 'hub') {
            this.hubWorld.render(ctx, canvasWidth, canvasHeight);
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
        const cardH = 240;
        const gap = 30;
        const totalW = CHARACTERS.length * cardW + (CHARACTERS.length - 1) * gap;
        const startX = (w - totalW) / 2;

        for (let i = 0; i < CHARACTERS.length; i++) {
            const ch = CHARACTERS[i];
            const cx = startX + i * (cardW + gap);
            const cy = 100;

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

            // Character preview
            drawCharacter(ctx, cx + 30, cy + 15, 80, 110, ch, 1, null);

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

            // Best score from save data
            if (this.saveManager) {
                const overall = this.saveManager.getOverallPercent(ch.name);
                const completed = this.saveManager.getCompletedLevels(ch.name);
                if (completed.length > 0) {
                    // Tidy %
                    ctx.font = 'bold 14px monospace';
                    ctx.fillStyle = overall >= 90 ? '#00FF00' : overall >= 50 ? '#FFD700' : '#FF6644';
                    ctx.fillText(`${overall}% tidy`, cx + cardW / 2, cy + 210);

                    // Stars for each level (compact row)
                    ctx.font = '10px monospace';
                    ctx.fillStyle = '#888';
                    let starLine = '';
                    for (let lv = 0; lv < 6; lv++) {
                        const lvData = this.saveManager.getLevel(ch.name, lv);
                        starLine += lvData ? '★'.repeat(lvData.stars) + ' ' : '· ';
                    }
                    ctx.fillText(starLine.trim(), cx + cardW / 2, cy + 228);
                } else {
                    ctx.font = '11px monospace';
                    ctx.fillStyle = '#555';
                    ctx.fillText('No scores yet', cx + cardW / 2, cy + 215);
                }
            }
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

}
