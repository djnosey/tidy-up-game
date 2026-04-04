export class Camera {
    constructor(canvasWidth, canvasHeight) {
        this.x = 0;
        this.y = 0;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.minX = 0; // no backtracking
        this.locked = false;

        // Lerp-based smooth following
        this.lerpX = 0.08;
        this.lerpY = 0.06;

        // Screen shake
        this.shakeIntensity = 0;
        this.shakeDuration = 0;
        this.shakeTimer = 0;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;

        // Smooth boss lock transition
        this.lockTargetX = 0;
        this.lockTargetY = 0;
        this.lockLerping = false;
    }

    follow(player, levelWidth) {
        if (this.locked) {
            // Smooth transition to lock position
            if (this.lockLerping) {
                this.x += (this.lockTargetX - this.x) * 0.12;
                this.y += (this.lockTargetY - this.y) * 0.12;
                if (Math.abs(this.x - this.lockTargetX) < 1 && Math.abs(this.y - this.lockTargetY) < 1) {
                    this.x = this.lockTargetX;
                    this.y = this.lockTargetY;
                    this.lockLerping = false;
                }
            }
            return;
        }

        // Horizontal: player stays at ~1/3 of screen (lerp)
        const targetX = player.x - this.width / 3;
        const clampedTargetX = Math.max(this.minX, Math.min(targetX, levelWidth - this.width));
        this.x += (clampedTargetX - this.x) * this.lerpX;

        // No backtracking
        if (this.x > this.minX) {
            this.minX = this.x;
        }

        // Vertical: keep camera fixed at ground level (no vertical tracking)
        // Prevents the floor line from moving up/down with the player
        this.y = 0;
    }

    shake(intensity, duration) {
        this.shakeIntensity = intensity;
        this.shakeDuration = duration;
        this.shakeTimer = duration;
    }

    updateShake(dt) {
        if (this.shakeTimer > 0) {
            this.shakeTimer -= dt;
            const decay = this.shakeTimer / this.shakeDuration;
            this.shakeOffsetX = (Math.random() - 0.5) * 2 * this.shakeIntensity * decay;
            this.shakeOffsetY = (Math.random() - 0.5) * 2 * this.shakeIntensity * decay;
            if (this.shakeTimer <= 0) {
                this.shakeOffsetX = 0;
                this.shakeOffsetY = 0;
            }
        }
    }

    lockTo(x, y) {
        this.locked = true;
        this.lockTargetX = x;
        this.lockTargetY = y;
        this.lockLerping = true;
    }

    unlock() {
        this.locked = false;
        this.minX = this.x;
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.minX = 0;
        this.locked = false;
        this.lockLerping = false;
        this.shakeTimer = 0;
        this.shakeOffsetX = 0;
        this.shakeOffsetY = 0;
    }

    resize(w, h) {
        this.width = w;
        this.height = h;
    }
}
