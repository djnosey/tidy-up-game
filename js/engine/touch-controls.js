// --- Button layouts per mode ---

const GAMEPLAY_BUTTONS = [
    { name: 'left',  x: 30,  y: 440, w: 80, h: 80, key: 'ArrowLeft',  icon: 'arrow', angle: Math.PI },
    { name: 'right', x: 130, y: 440, w: 80, h: 80, key: 'ArrowRight', icon: 'arrow', angle: 0 },
    { name: 'down',  x: 80,  y: 510, w: 80, h: 80, key: 'ArrowDown',  icon: 'arrow', angle: Math.PI / 2 },
    { name: 'jump',  x: 770, y: 430, w: 90, h: 90, key: 's',          icon: 'label', label: 'J' },
    { name: 'shoot', x: 860, y: 510, w: 80, h: 80, key: 'd',          icon: 'label', label: 'S' },
];

// Title screen: just tap to start
const TITLE_BUTTONS = [
    { name: 'start', x: 330, y: 500, w: 300, h: 70, key: 'Enter', icon: 'label', label: 'TAP TO START' },
];

// Character select: left/right arrows + confirm + back
const SELECT_BUTTONS = [
    { name: 'prev',    x: 30,  y: 250, w: 70, h: 80, key: 'ArrowLeft',  icon: 'arrow', angle: Math.PI },
    { name: 'next',    x: 860, y: 250, w: 70, h: 80, key: 'ArrowRight', icon: 'arrow', angle: 0 },
    { name: 'confirm', x: 355, y: 510, w: 250, h: 60, key: 'Enter',     icon: 'label', label: 'SELECT' },
    { name: 'back',    x: 20,  y: 15,  w: 70, h: 40, key: 'Escape',     icon: 'label', label: 'BACK' },
];

// Mode select (Continue / New Game / Level Select): up/down + confirm + back
const MODE_SELECT_BUTTONS = [
    { name: 'up',      x: 440, y: 190, w: 80, h: 50, key: 'ArrowUp',   icon: 'arrow', angle: -Math.PI / 2 },
    { name: 'down',    x: 440, y: 400, w: 80, h: 50, key: 'ArrowDown', icon: 'arrow', angle: Math.PI / 2 },
    { name: 'confirm', x: 355, y: 470, w: 250, h: 60, key: 'Enter',    icon: 'label', label: 'SELECT' },
    { name: 'back',    x: 20,  y: 15,  w: 70, h: 40, key: 'Escape',    icon: 'label', label: 'BACK' },
];

// Level select: arrows + confirm + back
const LEVEL_SELECT_BUTTONS = [
    { name: 'left',    x: 30,  y: 200, w: 60, h: 70, key: 'ArrowLeft',  icon: 'arrow', angle: Math.PI },
    { name: 'right',   x: 870, y: 200, w: 60, h: 70, key: 'ArrowRight', icon: 'arrow', angle: 0 },
    { name: 'up',      x: 440, y: 60,  w: 80, h: 50, key: 'ArrowUp',    icon: 'arrow', angle: -Math.PI / 2 },
    { name: 'down',    x: 440, y: 380, w: 80, h: 50, key: 'ArrowDown',  icon: 'arrow', angle: Math.PI / 2 },
    { name: 'confirm', x: 355, y: 470, w: 250, h: 60, key: 'Enter',     icon: 'label', label: 'PLAY' },
    { name: 'back',    x: 20,  y: 15,  w: 70, h: 40, key: 'Escape',     icon: 'label', label: 'BACK' },
];

// Hub world: confirm + left/right character change
const HUB_BUTTONS = [
    { name: 'prev',    x: 30,  y: 220, w: 70, h: 80, key: 'ArrowLeft',  icon: 'arrow', angle: Math.PI },
    { name: 'next',    x: 860, y: 220, w: 70, h: 80, key: 'ArrowRight', icon: 'arrow', angle: 0 },
    { name: 'enter',   x: 330, y: 500, w: 300, h: 60, key: 'Enter',     icon: 'label', label: 'GO INSIDE' },
];

// Tap to continue (transitions, score, victory, normal game over)
const CONTINUE_BUTTONS = [
    { name: 'continue', x: 330, y: 510, w: 300, h: 60, key: 'Enter', icon: 'label', label: 'CONTINUE' },
];

// Boss game over: two options
const BOSS_GAMEOVER_BUTTONS = [
    { name: 'retry',   x: 280, y: 320, w: 400, h: 50, key: '1',     icon: 'label', label: 'RETRY BOSS' },
    { name: 'restart', x: 280, y: 380, w: 400, h: 50, key: '2',     icon: 'label', label: 'RESTART LEVEL' },
];

const MODE_MAP = {
    gameplay:       GAMEPLAY_BUTTONS,
    title:          TITLE_BUTTONS,
    select:         SELECT_BUTTONS,
    mode_select:    MODE_SELECT_BUTTONS,
    level_select:   LEVEL_SELECT_BUTTONS,
    hub:            HUB_BUTTONS,
    continue:       CONTINUE_BUTTONS,
    boss_gameover:  BOSS_GAMEOVER_BUTTONS,
};

function detectTablet() {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!hasTouch) return false;
    const ua = navigator.userAgent;
    if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return true;
    return /iPad|Android(?!.*Mobile)|tablet/i.test(ua);
}

export class TouchControls {
    constructor(canvas, input) {
        this.canvas = canvas;
        this.input = input;
        this.enabled = detectTablet();
        this._mode = 'gameplay';
        this.activeTouches = new Map(); // touchId -> button name or null

        this._onStart = this._handleStart.bind(this);
        this._onMove = this._handleMove.bind(this);
        this._onEnd = this._handleEnd.bind(this);

        canvas.addEventListener('touchstart', this._onStart, { passive: false });
        canvas.addEventListener('touchmove', this._onMove, { passive: false });
        canvas.addEventListener('touchend', this._onEnd, { passive: false });
        canvas.addEventListener('touchcancel', this._onEnd, { passive: false });
    }

    get mode() { return this._mode; }
    set mode(newMode) {
        if (this._mode === newMode) return;
        // Release all active buttons using the OLD layout before switching
        for (const [id, btnName] of this.activeTouches) {
            if (btnName) {
                const btn = this.buttons.find(b => b.name === btnName);
                if (btn) this.input.keys[btn.key] = false;
            }
        }
        this.activeTouches.clear();
        this._mode = newMode;
    }

    get buttons() {
        return MODE_MAP[this._mode] || GAMEPLAY_BUTTONS;
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled) {
            for (const [, btnName] of this.activeTouches) {
                if (btnName) this._releaseButton(btnName);
            }
            this.activeTouches.clear();
        }
    }

    // --- Touch event handlers ---

    _handleStart(e) {
        if (!this.enabled) return;
        e.preventDefault();
        const buttons = this.buttons;
        for (const touch of e.changedTouches) {
            const pos = this._canvasCoords(touch);
            const btn = this._hitTest(pos.x, pos.y, buttons);
            this.activeTouches.set(touch.identifier, btn ? btn.name : null);
            if (btn) {
                this.input.keys[btn.key] = true;
                this.input.justPressed[btn.key] = true;
            }
        }
    }

    _handleMove(e) {
        if (!this.enabled) return;
        e.preventDefault();
        const buttons = this.buttons;
        for (const touch of e.changedTouches) {
            const prevName = this.activeTouches.get(touch.identifier);
            const pos = this._canvasCoords(touch);
            const btn = this._hitTest(pos.x, pos.y, buttons);
            const curName = btn ? btn.name : null;

            if (prevName === curName) continue;

            if (prevName) this._releaseButton(prevName);
            if (btn) {
                this.input.keys[btn.key] = true;
                this.input.justPressed[btn.key] = true;
            }
            this.activeTouches.set(touch.identifier, curName);
        }
    }

    _handleEnd(e) {
        if (!this.enabled) return;
        e.preventDefault();
        for (const touch of e.changedTouches) {
            const btnName = this.activeTouches.get(touch.identifier);
            this.activeTouches.delete(touch.identifier);
            if (btnName) this._releaseButton(btnName);
        }
    }

    _releaseButton(btnName) {
        const btn = this.buttons.find(b => b.name === btnName);
        if (!btn) return;
        for (const [, name] of this.activeTouches) {
            if (name === btnName) return;
        }
        this.input.keys[btn.key] = false;
    }

    _canvasCoords(touch) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x: (touch.clientX - rect.left) * (960 / rect.width),
            y: (touch.clientY - rect.top) * (600 / rect.height),
        };
    }

    _hitTest(cx, cy, buttons) {
        for (const btn of buttons) {
            if (cx >= btn.x && cx <= btn.x + btn.w && cy >= btn.y && cy <= btn.y + btn.h) {
                return btn;
            }
        }
        return null;
    }

    // --- Rendering ---

    render(ctx) {
        if (!this.enabled) return;
        ctx.save();
        const buttons = this.buttons;
        for (const btn of buttons) {
            const pressed = !!this.input.keys[btn.key];
            const alpha = pressed ? 0.5 : 0.25;

            // Button background
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            this._roundRect(ctx, btn.x, btn.y, btn.w, btn.h, 12);
            ctx.fill();

            // Button border
            ctx.globalAlpha = alpha + 0.15;
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            this._roundRect(ctx, btn.x, btn.y, btn.w, btn.h, 12);
            ctx.stroke();

            // Icon
            ctx.globalAlpha = pressed ? 0.9 : 0.6;
            ctx.fillStyle = '#000';
            this._drawIcon(ctx, btn);
        }
        ctx.restore();
    }

    _drawIcon(ctx, btn) {
        const cx = btn.x + btn.w / 2;
        const cy = btn.y + btn.h / 2;

        if (btn.icon === 'arrow') {
            const s = Math.min(btn.w, btn.h) * 0.3;
            this._drawTriangle(ctx, cx, cy, s, btn.angle);
        } else {
            // Text label
            const fontSize = Math.min(btn.h * 0.45, 22);
            ctx.font = `bold ${Math.round(fontSize)}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(btn.label, cx, cy);
        }
    }

    _drawTriangle(ctx, cx, cy, size, angle) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(size, 0);
        ctx.lineTo(-size * 0.6, -size * 0.7);
        ctx.lineTo(-size * 0.6, size * 0.7);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    _roundRect(ctx, x, y, w, h, r) {
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
    }

    destroy() {
        this.canvas.removeEventListener('touchstart', this._onStart);
        this.canvas.removeEventListener('touchmove', this._onMove);
        this.canvas.removeEventListener('touchend', this._onEnd);
        this.canvas.removeEventListener('touchcancel', this._onEnd);
    }
}
