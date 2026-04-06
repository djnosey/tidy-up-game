export class Input {
    constructor() {
        this.keys = {};
        this.justPressed = {};
        this._downHandler = (e) => {
            if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', 's', 'S', 'd', 'D'].includes(e.key)) {
                e.preventDefault();
            }
            if (!this.keys[e.key]) {
                this.justPressed[e.key] = true;
            }
            this.keys[e.key] = true;
        };
        this._upHandler = (e) => {
            this.keys[e.key] = false;
        };
        window.addEventListener('keydown', this._downHandler);
        window.addEventListener('keyup', this._upHandler);
    }

    isDown(key) {
        return !!this.keys[key];
    }

    wasPressed(key) {
        return !!this.justPressed[key];
    }

    get left() { return this.isDown('ArrowLeft'); }
    get right() { return this.isDown('ArrowRight'); }
    get down() { return this.isDown('ArrowDown'); }
    get downPressed() { return this.wasPressed('ArrowDown'); }
    get jump() { return this.isDown('s') || this.isDown('S'); }
    get jumpPressed() { return this.wasPressed('s') || this.wasPressed('S'); }
    get shoot() { return this.wasPressed('d') || this.wasPressed('D'); }
    get mutePressed() { return this.wasPressed('m') || this.wasPressed('M'); }

    endFrame() {
        this.justPressed = {};
    }

    destroy() {
        window.removeEventListener('keydown', this._downHandler);
        window.removeEventListener('keyup', this._upHandler);
    }
}
