// Centralized particle system with per-level themed palettes

const MAX_PARTICLES = 300;
const TWO_PI = Math.PI * 2;

export class ParticleSystem {
    constructor() {
        this.particles = [];
        this._alive = 0; // track live count for swap-and-pop
        this._overwriteIdx = 0; // rotating index for overflow overwrites
    }

    emit({ x, y, count = 6, colors = ['#FFD700'], speedX = 100, speedY = 100,
           gravity = 300, friction = 0.98, sizeMin = 2, sizeMax = 5, life = 0.6,
           trail = 0, shape = 'circle', fadeEase = 'linear' }) {
        for (let i = 0; i < count; i++) {
            const p = {
                x,
                y,
                vx: (Math.random() - 0.5) * 2 * speedX,
                vy: -Math.random() * speedY - speedY * 0.2,
                life,
                maxLife: life,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: sizeMin + Math.random() * (sizeMax - sizeMin),
                gravity,
                friction,
                trail,
                shape,
                fadeEase,
                _trailBuf: trail > 0 ? new Float32Array(trail * 2) : null,
                _trailLen: 0,
                _trailHead: 0,
            };
            if (this._alive >= MAX_PARTICLES) {
                // Overwrite at rotating index — O(1) instead of O(n) shift
                const slot = this.particles[this._overwriteIdx];
                Object.assign(slot, p);
                this._overwriteIdx = (this._overwriteIdx + 1) % MAX_PARTICLES;
            } else {
                this.particles.push(p);
                this._alive++;
            }
        }
    }

    update(dt) {
        // Swap-and-pop dead particles instead of splice
        let writeIdx = 0;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Store position in trail ring buffer before moving
            if (p._trailBuf) {
                const idx = p._trailHead * 2;
                p._trailBuf[idx] = p.x;
                p._trailBuf[idx + 1] = p.y;
                p._trailHead = (p._trailHead + 1) % p.trail;
                if (p._trailLen < p.trail) p._trailLen++;
            }

            p.vy += p.gravity * dt;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life > 0) {
                this.particles[writeIdx++] = p;
            }
        }
        this.particles.length = writeIdx;
        this._alive = writeIdx;
        this._overwriteIdx = 0; // compaction reorders, so reset
    }

    render(ctx, camera) {
        const camX = camera.x;
        const camY = camera.y;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            const sx = p.x - camX;
            const sy = p.y - camY;
            if (sx < -10 || sx > 970 || sy < -10 || sy > 610) continue;

            // Fade curve
            const t = p.life / p.maxLife;
            const alpha = p.fadeEase === 'easeOut' ? t * t : t;

            ctx.fillStyle = p.color;

            // Draw trail (older positions at decreasing alpha/size)
            if (p._trailBuf && p._trailLen > 0) {
                for (let j = 0; j < p._trailLen; j++) {
                    // Read from ring buffer: oldest first
                    const readIdx = ((p._trailHead - p._trailLen + j + p.trail) % p.trail) * 2;
                    const tx = p._trailBuf[readIdx] - camX;
                    const ty = p._trailBuf[readIdx + 1] - camY;
                    const frac = (j + 1) / (p._trailLen + 1);
                    ctx.globalAlpha = alpha * frac * 0.5;
                    ctx.beginPath();
                    ctx.arc(tx, ty, p.size * frac * 0.7, 0, TWO_PI);
                    ctx.fill();
                }
            }

            ctx.globalAlpha = alpha;

            // Shape: streak (velocity-aligned) or circle
            if (p.shape === 'streak') {
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 20) {
                    const angle = Math.atan2(p.vy, p.vx);
                    ctx.save();
                    ctx.translate(sx, sy);
                    ctx.rotate(angle);
                    ctx.fillRect(-p.size * 1.5, -p.size * 0.4, p.size * 3, p.size * 0.8);
                    ctx.restore();
                } else {
                    ctx.beginPath();
                    ctx.arc(sx, sy, p.size, 0, TWO_PI);
                    ctx.fill();
                }
            } else {
                ctx.beginPath();
                ctx.arc(sx, sy, p.size, 0, TWO_PI);
                ctx.fill();
            }
        }
        ctx.globalAlpha = 1;
    }
}
