// Centralized particle system with per-level themed palettes

const MAX_PARTICLES = 300;
const TWO_PI = Math.PI * 2;

export class ParticleSystem {
    constructor() {
        this.particles = [];
        this._alive = 0; // track live count for swap-and-pop
    }

    emit({ x, y, count = 6, colors = ['#FFD700'], speedX = 100, speedY = 100,
           gravity = 300, friction = 0.98, sizeMin = 2, sizeMax = 5, life = 0.6 }) {
        for (let i = 0; i < count; i++) {
            if (this._alive >= MAX_PARTICLES) {
                // Overwrite oldest live particle instead of shifting
                const oldest = this.particles[0];
                oldest.x = x;
                oldest.y = y;
                oldest.vx = (Math.random() - 0.5) * 2 * speedX;
                oldest.vy = -Math.random() * speedY - speedY * 0.2;
                oldest.life = life;
                oldest.maxLife = life;
                oldest.color = colors[Math.floor(Math.random() * colors.length)];
                oldest.size = sizeMin + Math.random() * (sizeMax - sizeMin);
                oldest.gravity = gravity;
                oldest.friction = friction;
                // Move to end so it's "newest"
                this.particles.push(this.particles.shift());
            } else {
                this.particles.push({
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
                });
                this._alive++;
            }
        }
    }

    update(dt) {
        // Swap-and-pop dead particles instead of splice
        let writeIdx = 0;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
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
    }

    render(ctx, camera) {
        const camX = camera.x;
        const camY = camera.y;
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            const sx = p.x - camX;
            const sy = p.y - camY;
            if (sx < -10 || sx > 970 || sy < -10 || sy > 610) continue;
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(sx, sy, p.size, 0, TWO_PI);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}

