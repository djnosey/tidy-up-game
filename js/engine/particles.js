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

// Per-level particle theme palettes — indexed by level number (0-5)
// Also keyed by name for backwards compatibility
export const PARTICLE_THEMES = {
    0: null, // assigned below
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    'Living Room': {
        jumpDust:    { colors: ['#D4C4A8', '#C4B498', '#B8A888'], speedX: 60, speedY: 40, gravity: 200, sizeMin: 2, sizeMax: 4, life: 0.4, count: 6 },
        landImpact:  { colors: ['#8B6914', '#A07828', '#C4A050'], speedX: 80, speedY: 60, gravity: 250, sizeMin: 2, sizeMax: 5, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#FFFFFF', '#F0F0F0', '#E8E8E8'], speedX: 100, speedY: 80, gravity: 150, sizeMin: 2, sizeMax: 4, life: 0.5, count: 8 },
        collect:     { colors: ['#FFD700', '#FFC800', '#FFE44D'], speedX: 80, speedY: 100, gravity: 80, sizeMin: 2, sizeMax: 4, life: 0.6, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    'Kitchen': {
        jumpDust:    { colors: ['#FFFFFF', '#F8F8F0', '#E8E0D0'], speedX: 50, speedY: 35, gravity: 180, sizeMin: 2, sizeMax: 4, life: 0.5, count: 6 },
        landImpact:  { colors: ['#B8D0D8', '#A0C0C8', '#90B0B8'], speedX: 70, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 4, life: 0.4, count: 8 },
        enemyHit:    { colors: ['#C8A050', '#D4B060', '#B09040'], speedX: 90, speedY: 70, gravity: 200, sizeMin: 2, sizeMax: 5, life: 0.5, count: 8 },
        collect:     { colors: ['#F0E0C0', '#E8D8B0', '#FFFFFF'], speedX: 60, speedY: 80, gravity: 40, sizeMin: 2, sizeMax: 4, life: 0.7, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FF8844'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    'Bathroom': {
        jumpDust:    { colors: ['#A0D0E0', '#80C0D0', '#B0E0F0'], speedX: 50, speedY: 30, gravity: 100, sizeMin: 2, sizeMax: 4, life: 0.6, count: 6 },
        landImpact:  { colors: ['#A0D0E0', '#90C8D8', '#80B8C8'], speedX: 80, speedY: 60, gravity: 150, sizeMin: 3, sizeMax: 5, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#FFFFFF', '#E0F0FF', '#D0E8FF'], speedX: 80, speedY: 70, gravity: 50, sizeMin: 3, sizeMax: 6, life: 0.6, count: 8 },
        collect:     { colors: ['#E0F0FF', '#C0E0F0', '#FFFFFF'], speedX: 60, speedY: 70, gravity: 30, sizeMin: 3, sizeMax: 5, life: 0.8, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FF8844'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    "Kids' Room": {
        jumpDust:    { colors: ['#FF88AA', '#88CCFF', '#AAFFAA', '#FFFF88', '#CC88FF'], speedX: 70, speedY: 50, gravity: 150, sizeMin: 2, sizeMax: 4, life: 0.5, count: 6 },
        landImpact:  { colors: ['#FF6688', '#6699FF', '#66CC66', '#FFCC33', '#CC66FF'], speedX: 90, speedY: 70, gravity: 200, sizeMin: 2, sizeMax: 5, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#FFB0C8', '#B0D8FF', '#B0FFB0', '#FFF0B0'], speedX: 100, speedY: 80, gravity: 120, sizeMin: 2, sizeMax: 5, life: 0.6, count: 8 },
        collect:     { colors: ['#FFD700', '#FF69B4', '#00CED1', '#7FFF00'], speedX: 90, speedY: 110, gravity: 60, sizeMin: 2, sizeMax: 4, life: 0.7, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF66AA', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    "Parents' Room": {
        jumpDust:    { colors: ['#E8D8C8', '#D8C8B8', '#F0E0D0'], speedX: 40, speedY: 30, gravity: 80, sizeMin: 2, sizeMax: 4, life: 0.6, count: 6 },
        landImpact:  { colors: ['#B0A090', '#A09080', '#C0B0A0'], speedX: 60, speedY: 40, gravity: 150, sizeMin: 2, sizeMax: 4, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#D0D0D0', '#C0C0C0', '#E0E0E0'], speedX: 70, speedY: 50, gravity: 60, sizeMin: 2, sizeMax: 4, life: 0.6, count: 8 },
        collect:     { colors: ['#FFD080', '#FFC060', '#FFE0A0'], speedX: 70, speedY: 90, gravity: 60, sizeMin: 2, sizeMax: 4, life: 0.7, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    'Terrace': {
        jumpDust:    { colors: ['#66AA44', '#88CC66', '#448833'], speedX: 60, speedY: 40, gravity: 120, sizeMin: 2, sizeMax: 4, life: 0.5, count: 6 },
        landImpact:  { colors: ['#8B7355', '#A08060', '#7A6248'], speedX: 80, speedY: 60, gravity: 250, sizeMin: 2, sizeMax: 5, life: 0.4, count: 8 },
        enemyHit:    { colors: ['#FFEE44', '#FFD700', '#DDCC22'], speedX: 90, speedY: 70, gravity: 100, sizeMin: 2, sizeMax: 4, life: 0.5, count: 8 },
        collect:     { colors: ['#FFFFAA', '#FFE888', '#FFF0CC'], speedX: 50, speedY: 60, gravity: 20, sizeMin: 2, sizeMax: 4, life: 0.9, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
};

// Index-based access (safer than string keys)
PARTICLE_THEMES[0] = PARTICLE_THEMES['Living Room'];
PARTICLE_THEMES[1] = PARTICLE_THEMES['Kitchen'];
PARTICLE_THEMES[2] = PARTICLE_THEMES['Bathroom'];
PARTICLE_THEMES[3] = PARTICLE_THEMES["Kids' Room"];
PARTICLE_THEMES[4] = PARTICLE_THEMES["Parents' Room"];
PARTICLE_THEMES[5] = PARTICLE_THEMES['Terrace'];
