// ─── Cheat Code Panel ───────────────────────────────────────────────
// Press 'I' to open, type code, Enter to submit, Esc to cancel.

export class CheatManager {
    constructor() {
        this.panelOpen = false;
        this.input = '';
        this.active = false;
        this.feedbackTimer = 0;
        this.feedbackMsg = '';

        this._keyHandler = (e) => {
            if (e.key === 'i' || e.key === 'I') {
                if (!this.panelOpen) {
                    this.panelOpen = true;
                    this.input = '';
                    e.preventDefault();
                    return;
                }
            }
            if (!this.panelOpen) return;
            e.preventDefault();
            e.stopPropagation();
            if (e.key === 'Escape') {
                this.panelOpen = false;
                return;
            }
            if (e.key === 'Backspace') {
                this.input = this.input.slice(0, -1);
                return;
            }
            if (e.key === 'Enter') {
                this._submitCode();
                return;
            }
            if (e.key.length === 1 && this.input.length < 8) {
                this.input += e.key;
            }
        };
        window.addEventListener('keydown', this._keyHandler, true);
    }

    _submitCode() {
        if (this.input === '1015') {
            this.active = !this.active;
            this.feedbackMsg = this.active ? 'ON' : 'OFF';
            if (this._playerRef) this._playerRef.cheatInvincible = this.active;
        } else {
            this.feedbackMsg = 'INVALID';
        }
        this.feedbackTimer = 1.0;
        this.panelOpen = false;
    }

    /** Call when a player is set/changed so the cheat flag syncs */
    syncPlayer(player) {
        this._playerRef = player;
        if (player) player.cheatInvincible = this.active;
    }

    reset() {
        this.active = false;
        this.panelOpen = false;
        this.input = '';
        this.feedbackTimer = 0;
    }

    update(dt) {
        if (this.feedbackTimer > 0) this.feedbackTimer -= dt;
    }

    render(ctx, canvasW, canvasH) {
        if (this.panelOpen) {
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
            const pw = 200, ph = 60;
            const px = (canvasW - pw) / 2, py = (canvasH - ph) / 2;
            ctx.fillRect(px, py, pw, ph);
            ctx.strokeStyle = '#444';
            ctx.lineWidth = 1;
            ctx.strokeRect(px, py, pw, ph);
            ctx.fillStyle = '#888';
            ctx.font = '12px monospace';
            ctx.textAlign = 'center';
            ctx.fillText('ENTER CODE', canvasW / 2, py + 18);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px monospace';
            const masked = '*'.repeat(this.input.length);
            ctx.fillText(masked + '_', canvasW / 2, py + 44);
            ctx.restore();
        }

        if (this.feedbackTimer > 0) {
            ctx.save();
            const alpha = Math.min(1, this.feedbackTimer * 2);
            ctx.globalAlpha = alpha;
            ctx.font = 'bold 14px monospace';
            ctx.textAlign = 'right';
            ctx.fillStyle = this.feedbackMsg === 'INVALID' ? '#FF4444' : '#44FF44';
            ctx.fillText(this.feedbackMsg, canvasW - 10, canvasH - 10);
            ctx.restore();
        }
    }
}
