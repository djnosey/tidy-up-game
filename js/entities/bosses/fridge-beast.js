import { VULNERABLE, STUNNED, SHOOTING } from './boss-states.js';

export const FridgeBeastBehavior = {
    hitsToOpen: 2,
    onProjectileHit(boss) {
        boss.projectileCounter++;
        if (boss.projectileCounter >= this.hitsToOpen) {
            boss.projectileCounter = 0;
            boss.doorsOpen = true;
            boss.doorTimer = boss.getPhase() === 3 ? 1.8 : 2.5;
        }
    },
    onUpdate(boss, dt, player) {
        // Door timer — doors close after time
        if (boss.doorsOpen && boss.state !== VULNERABLE && boss.state !== STUNNED) {
            boss.doorTimer = (boss.doorTimer || 0) - dt;
            if (boss.doorTimer <= 0) {
                boss.doorsOpen = false;
            }
        }
        // Freezer mist (phase 2+)
        if (boss.getPhase() >= 2 && boss.state === SHOOTING) {
            boss.mistTimer = (boss.mistTimer || 0) + dt;
            if (boss.mistTimer >= 1.5) {
                boss.mistTimer = 0;
                boss.arenaHazards.push({
                    type: 'mist', x: boss.x - 40, y: boss.groundY - 12,
                    width: boss.width + 80, height: 12, timer: 3.0, effect: 'slow',
                });
            }
        }
        // Food wave — doors open after shooting state ends
        if (boss.state === SHOOTING && boss.prevState !== SHOOTING) {
            boss.doorsOpen = true;
            boss.doorTimer = boss.getPhase() === 3 ? 1.8 : 2.5;
        }
        boss.prevState = boss.state;
    },
    canStomp(boss) {
        return boss.doorsOpen;
    },
    getPhaseAttacks(boss, phase) {
        if (phase === 1) return ['charge', 'shoot', 'charge', 'spin'];
        if (phase === 2) return ['charge', 'shoot', 'spin', 'charge', 'shoot'];
        return ['charge', 'shoot', 'spin', 'shoot', 'charge', 'spin'];
    },
};
