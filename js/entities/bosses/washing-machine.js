import { STUNNED, VULNERABLE, SPINNING } from './boss-states.js';

export const WashingMachineBehavior = {
    onProjectileHit(boss) {
        // Shooting during drain extends vulnerability
        if (boss.state === VULNERABLE) {
            boss.stateTimer += 0.4;
        }
    },
    onUpdate(boss, dt, player) {
        // Rising water
        if (boss.state !== STUNNED && boss.state !== VULNERABLE) {
            const riseRate = boss.getPhase() === 3 ? 18 : boss.getPhase() === 2 ? 12 : 8;
            boss.waterLevel = Math.min((boss.waterLevel || 0) + riseRate * dt, 120);
        }
        // Drain state
        if (boss.state === 'draining') {
            boss.vx = 0;
            boss.waterLevel = Math.max((boss.waterLevel || 0) - 60 * dt, 0);
            if (boss.stateTimer <= 0) {
                const vulnDur = boss.getPhase() === 3 ? 1.5 : boss.getPhase() === 2 ? 1.8 : 2.2;
                boss.enterVulnerable(vulnDur);
            }
        }
        // Update water hazard
        if ((boss.waterLevel || 0) > 5) {
            boss.arenaHazards = boss.arenaHazards.filter(h => h.type !== 'water');
            boss.arenaHazards.push({
                type: 'water', x: boss.arenaLeft, y: boss.groundY - boss.waterLevel,
                width: boss.arenaRight - boss.arenaLeft + boss.width, height: boss.waterLevel,
                timer: 999, effect: 'slow',
            });
        }
        // Spin cycle — expanding ring
        if (boss.state === SPINNING) {
            boss.ringTimer = (boss.ringTimer || 0) + dt;
            if (boss.ringTimer >= 0.8) {
                boss.ringTimer = 0;
                const count = boss.getPhase() >= 2 ? 10 : 7;
                const gapIndex = Math.floor(Math.random() * count);
                const gapIndex2 = (gapIndex + Math.floor(count / 2)) % count;
                for (let i = 0; i < count; i++) {
                    if (i === gapIndex || i === gapIndex2) continue;
                    const angle = (i / count) * Math.PI * 2;
                    boss.projectiles.push({
                        x: boss.x + boss.width / 2, y: boss.y + boss.height / 2,
                        width: 14, height: 14,
                        vx: Math.cos(angle) * 130, vy: Math.sin(angle) * 130,
                        alive: true, timer: 2.0, emoji: boss.getProjectileEmoji(),
                    });
                }
            }
        }
    },
    getPhaseAttacks(boss, phase) {
        if (phase === 1) return ['spin', 'shoot', 'drain', 'charge'];
        if (phase === 2) return ['spin', 'shoot', 'spin', 'drain', 'charge'];
        return ['spin', 'charge', 'spin', 'shoot', 'drain', 'spin'];
    },
    customAttack(boss, name) {
        if (name === 'drain') {
            boss.state = 'draining';
            boss.stateTimer = 1.0;
            boss.vx = 0;
            return true;
        }
        return false;
    },
};
