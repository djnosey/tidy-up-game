import { ROAMING, CHARGING } from './boss-states.js';

export const MegaRoombaBehavior = {
    hitsToVulnerable: 3,
    onProjectileHit(boss) {
        boss.projectileCounter++;
        if (boss.projectileCounter >= this.hitsToVulnerable) {
            boss.projectileCounter = 0;
            boss.enterVulnerable(boss.getPhase() === 3 ? 1.8 : boss.getPhase() === 2 ? 2.2 : 2.5);
            // Spark particles
            for (let i = 0; i < 8; i++) {
                boss.particles.push({
                    x: boss.x + boss.width / 2, y: boss.y,
                    vx: (Math.random() - 0.5) * 250, vy: -Math.random() * 200 - 50,
                    life: 0.6, color: '#FFD700', size: 3 + Math.random() * 4,
                });
            }
        }
    },
    onUpdate(boss, dt, player) {
        // Dust trail while roaming/charging
        if (boss.state === ROAMING || boss.state === CHARGING) {
            boss.dustTrailTimer = (boss.dustTrailTimer || 0) + dt;
            if (boss.dustTrailTimer >= 0.15) {
                boss.dustTrailTimer = 0;
                boss.arenaHazards.push({
                    type: 'dust', x: boss.x + boss.width / 2 - 20, y: boss.groundY - 8,
                    width: 40, height: 8, timer: 3.0, effect: 'slow',
                });
            }
        }
        // Suction attack
        if (boss.state === 'suction') {
            boss.vx = 0;
            const pull = boss.getPhase() >= 2 ? 160 : 120;
            const dx = boss.x + boss.width / 2 - player.x;
            if (Math.abs(dx) > 10) {
                player.x += Math.sign(dx) * pull * dt;
            }
            if (boss.stateTimer <= 0) {
                boss.enterRoaming();
            }
        }
    },
    getPhaseAttacks(boss, phase) {
        if (phase === 1) return ['charge', 'shoot', 'charge', 'suction'];
        if (phase === 2) return ['charge', 'suction', 'spin', 'charge', 'shoot'];
        return ['charge', 'suction', 'spin', 'charge', 'suction', 'shoot'];
    },
    customAttack(boss, name) {
        if (name === 'suction') {
            boss.state = 'suction';
            boss.stateTimer = 2.0;
            boss.vx = 0;
            boss.flashTimer = 0.3;
            return true;
        }
        return false;
    },
};
