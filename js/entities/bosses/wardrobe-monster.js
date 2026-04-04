import { VULNERABLE } from './boss-states.js';

export const WardrobeMonsterBehavior = {
    onProjectileHit(boss) {
        // Shooting during re-opening extends vulnerability
        if (boss.state === VULNERABLE) {
            boss.stateTimer = Math.min(boss.stateTimer + 0.5, 2.0);
        }
    },
    onUpdate(boss, dt, player) {
        // Teleport state
        if (boss.state === 'teleport') {
            boss.vx = 0;
            if (boss.stateTimer <= 0.5 && !boss.teleportDone) {
                boss.teleportDone = true;
                const positions = [
                    boss.arenaLeft + 50,
                    boss.arenaLeft + (boss.arenaRight - boss.arenaLeft) * 0.3,
                    boss.arenaLeft + (boss.arenaRight - boss.arenaLeft) * 0.5,
                    boss.arenaLeft + (boss.arenaRight - boss.arenaLeft) * 0.7,
                    boss.arenaRight - 50,
                ];
                let newX = boss.x;
                while (Math.abs(newX - boss.x) < 150) {
                    newX = positions[Math.floor(Math.random() * positions.length)];
                }
                boss.x = newX;
            }
            if (boss.stateTimer <= 0) {
                boss.teleportCount = (boss.teleportCount || 0) + 1;
                const needDouble = boss.getPhase() >= 2 && boss.teleportCount < 2;
                if (needDouble) {
                    boss.state = 'teleport';
                    boss.stateTimer = 1.0;
                    boss.teleportDone = false;
                } else {
                    boss.teleportCount = 0;
                    boss.enterVulnerable(boss.getPhase() === 3 ? 1.5 : 2.0);
                }
            }
        }
        // Darkness attack
        if (boss.state === 'darkness') {
            boss.vx = 0;
            boss.darknessAlpha = Math.min((boss.darknessAlpha || 0) + dt * 1.5, boss.getPhase() === 3 ? 0.85 : 0.65);
            boss.shootTimer = (boss.shootTimer || 0) + dt;
            if (boss.shootTimer >= 0.6) {
                boss.shootTimer = 0;
                boss.fireAtPlayer(player);
            }
            if (boss.stateTimer <= 0) {
                boss.darknessAlpha = 0;
                boss.enterRoaming();
            }
        } else {
            if (boss.darknessAlpha > 0) {
                boss.darknessAlpha = Math.max(0, (boss.darknessAlpha || 0) - dt * 2);
            }
        }
    },
    getPhaseAttacks(boss, phase) {
        if (phase === 1) return ['shoot', 'charge', 'teleport', 'shoot'];
        if (phase === 2) return ['shoot', 'charge', 'teleport', 'darkness', 'charge'];
        return ['darkness', 'charge', 'teleport', 'shoot', 'darkness', 'teleport'];
    },
    customAttack(boss, name) {
        if (name === 'teleport') {
            boss.state = 'teleport';
            boss.stateTimer = 1.0;
            boss.vx = 0;
            boss.teleportDone = false;
            boss.teleportCount = 0;
            boss.flashTimer = 0.3;
            return true;
        }
        if (name === 'darkness') {
            boss.state = 'darkness';
            boss.stateTimer = boss.getPhase() === 3 ? 4.0 : 3.0;
            boss.vx = 0;
            boss.darknessAlpha = 0;
            boss.shootTimer = 0;
            return true;
        }
        return false;
    },
};
