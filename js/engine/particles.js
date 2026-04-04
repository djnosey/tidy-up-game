// Centralized particle system with per-level themed palettes

const MAX_PARTICLES = 300;

export class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    emit({ x, y, count = 6, colors = ['#FFD700'], speedX = 100, speedY = 100,
           gravity = 300, friction = 0.98, sizeMin = 2, sizeMax = 5, life = 0.6 }) {
        for (let i = 0; i < count; i++) {
            if (this.particles.length >= MAX_PARTICLES) {
                this.particles.shift(); // recycle oldest
            }
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
        }
    }

    update(dt) {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.vy += p.gravity * dt;
            p.vx *= p.friction;
            p.vy *= p.friction;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    render(ctx, camera) {
        for (const p of this.particles) {
            const sx = p.x - camera.x;
            const sy = p.y - camera.y;
            if (sx < -10 || sx > 970 || sy < -10 || sy > 610) continue;
            ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(sx, sy, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
    }
}

