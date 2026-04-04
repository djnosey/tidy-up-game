import { SPINNING } from './boss-states.js';

export const BbqDragonBehavior = {
    getHeatMax(boss) {
        const phase = boss.getPhase();
        return phase === 3 ? 6 : phase === 2 ? 5 : 4;
    },
    onProjectileHit(boss) {
        boss.heatCounter = Math.max(0, (boss.heatCounter ?? this.getHeatMax(boss)) - 1);
        // Hiss/steam particle
        for (let i = 0; i < 4; i++) {
            boss.particles.push({
                x: boss.x + boss.width / 2, y: boss.y,
                vx: (Math.random() - 0.5) * 80, vy: -Math.random() * 100 - 40,
                life: 0.5, color: '#AAF', size: 5 + Math.random() * 4,
            });
        }
        if (boss.heatCounter <= 0) {
            boss.heatCounter = this.getHeatMax(boss);
            const vulnDur = boss.getPhase() === 3 ? 3.0 : 2.5;
            boss.isFlying = false;
            boss.enterVulnerable(vulnDur);
        }
    },
    onUpdate(boss, dt, player) {
        if (boss.heatCounter === undefined) boss.heatCounter = this.getHeatMax(boss);

        // Flight state
        if (boss.state === 'flight') {
            boss.vx = boss.direction * boss.speed * 0.6;
            const hoverY = boss.groundY - boss.height - 80;
            if (boss.y > hoverY) boss.y -= 150 * dt;
            boss.isFlying = true;
            if (boss.x <= boss.arenaLeft || boss.x >= boss.arenaRight) {
                boss.vx = -boss.vx;
                boss.direction = -boss.direction;
            }
            boss.coalTimer = (boss.coalTimer || 0) + dt;
            if (boss.coalTimer >= 0.6) {
                boss.coalTimer = 0;
                boss.projectiles.push({
                    x: boss.x + Math.random() * boss.width,
                    y: boss.y + boss.height,
                    width: 16, height: 16,
                    vx: (Math.random() - 0.5) * 60, vy: 120,
                    alive: true, timer: 3.0, emoji: '🔥', isCoal: true,
                });
            }
            if (boss.stateTimer <= 0) {
                boss.enterRoaming();
            }
        }

        // Fire beam state
        if (boss.state === 'firebeam') {
            boss.vx = 0;
            const beamDir = boss.direction;
            const beamX = boss.x + (beamDir === 1 ? boss.width : -300);
            boss.arenaHazards = boss.arenaHazards.filter(h => h.type !== 'firebeam');
            boss.arenaHazards.push({
                type: 'firebeam', x: beamX, y: boss.groundY - 20,
                width: 300, height: 20, timer: 0.1, effect: 'damage',
            });
            if (boss.getPhase() >= 3) {
                boss.beamSweep = (boss.beamSweep || 0) + dt;
                if (boss.beamSweep >= 1.0) {
                    boss.direction = -boss.direction;
                    boss.beamSweep = 0;
                }
            }
            if (boss.stateTimer <= 0) {
                boss.arenaHazards = boss.arenaHazards.filter(h => h.type !== 'firebeam');
                boss.enterRoaming();
            }
        }

        // Coal rain state
        if (boss.state === 'coalrain') {
            boss.vx = 0;
            boss.coalTimer = (boss.coalTimer || 0) + dt;
            const interval = boss.getPhase() >= 2 ? 0.25 : 0.4;
            if (boss.coalTimer >= interval) {
                boss.coalTimer = 0;
                const rx = boss.arenaLeft + Math.random() * (boss.arenaRight - boss.arenaLeft);
                boss.projectiles.push({
                    x: rx, y: boss.y - 60,
                    width: 16, height: 16,
                    vx: 0, vy: 200,
                    alive: true, timer: 3.0, emoji: '🪨', isCoal: true,
                });
            }
            if (boss.stateTimer <= 0) {
                boss.enterRoaming();
            }
        }

        // Settle back to ground when not flying
        if (!boss.isFlying && boss.state !== 'flight' && boss.y < boss.groundY - boss.height) {
            boss.y += 200 * dt;
            if (boss.y >= boss.groundY - boss.height) boss.y = boss.groundY - boss.height;
        }

        // Fire patches from coals landing
        for (const p of boss.projectiles) {
            if (p.isCoal && p.alive && p.y >= boss.groundY - 10) {
                p.alive = false;
                boss.arenaHazards.push({
                    type: 'fire', x: p.x - 15, y: boss.groundY - 10,
                    width: 30, height: 10, timer: 2.5, effect: 'damage',
                });
            }
        }
    },
    getPhaseAttacks(boss, phase) {
        if (phase === 1) return ['charge', 'shoot', 'coalrain', 'charge', 'flight'];
        if (phase === 2) return ['flight', 'shoot', 'coalrain', 'charge', 'firebeam', 'flight'];
        return ['flight', 'firebeam', 'coalrain', 'charge', 'flight', 'shoot', 'firebeam'];
    },
    customAttack(boss, name) {
        if (name === 'flight') {
            boss.state = 'flight';
            boss.stateTimer = boss.getPhase() >= 2 ? 4.0 : 3.0;
            boss.vx = boss.direction * boss.speed * 0.6;
            boss.coalTimer = 0;
            return true;
        }
        if (name === 'firebeam') {
            boss.state = 'firebeam';
            boss.stateTimer = 2.0;
            boss.vx = 0;
            boss.beamSweep = 0;
            return true;
        }
        if (name === 'coalrain') {
            boss.state = 'coalrain';
            boss.stateTimer = 2.5;
            boss.vx = 0;
            boss.coalTimer = 0;
            return true;
        }
        return false;
    },
};
