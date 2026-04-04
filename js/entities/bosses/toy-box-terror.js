export const ToyBoxTerrorBehavior = {
    onProjectileHit(boss) {
        if (boss.lidOpen) {
            boss.lidOpen = false;
            boss.enterVulnerable(boss.getPhase() === 3 ? 2.5 : 3.0);
        }
    },
    onUpdate(boss, dt, player) {
        // Update minions
        for (const m of boss.minions) {
            m.x += m.vx * dt;
            if (m.x <= boss.arenaLeft || m.x + m.width >= boss.arenaRight + boss.width) {
                m.vx = -m.vx;
            }
            m.timer -= dt;
            if (m.timer <= 0) m.alive = false;
        }
        boss.minions = boss.minions.filter(m => m.alive);

        // Check if all toys stomped quickly -> tantrum stun
        if (boss.toyStompCount >= 3 && boss.toyStompTimer > 0) {
            boss.toyStompCount = 0;
            boss.toyStompTimer = 0;
            boss.enterVulnerable(2.2);
        }
        if (boss.toyStompTimer > 0) {
            boss.toyStompTimer -= dt;
            if (boss.toyStompTimer <= 0) boss.toyStompCount = 0;
        }

        // Snapping lid attack — lid opens and closes like a mouth, then stays open
        if (boss.state === 'snapping') {
            boss.vx = 0;
            boss.snapTimer = (boss.snapTimer || 0) + dt;
            // Snap open/closed every 0.4 seconds for the first 3 seconds
            if (boss.snapTimer < 3.0) {
                const snapCycle = boss.snapTimer % 0.4;
                boss.lidOpen = snapCycle < 0.2;
                // Damage player if lid closes on them (they're above the boss)
                if (snapCycle >= 0.19 && snapCycle < 0.22) {
                    // Create small shockwave on each snap
                    if (!boss.lastSnapTime || boss.snapTimer - boss.lastSnapTime > 0.35) {
                        boss.lastSnapTime = boss.snapTimer;
                        boss.projectiles.push({
                            x: boss.x + boss.width / 2 - 15, y: boss.y - 10,
                            width: 30, height: 10, vx: 0, vy: -80,
                            alive: true, timer: 0.5, emoji: '💥',
                        });
                    }
                }
            } else {
                // After snapping, lid stays wide open — vulnerable!
                boss.lidOpen = true;
            }
            if (boss.stateTimer <= 0) {
                boss.lidOpen = false;
                boss.enterRoaming();
            }
        }

        // Lid slam shockwave
        if (boss.state === 'lidslam') {
            boss.vx = 0;
            if (!boss.slamDone && boss.stateTimer <= 1.0) {
                boss.slamDone = true;
                boss.lidOpen = false;
                const dirs = boss.getPhase() >= 3 ? [-1, 1] : [boss.direction];
                for (const dir of dirs) {
                    boss.projectiles.push({
                        x: boss.x + boss.width / 2, y: boss.groundY - 16,
                        width: 30, height: 16, vx: 200 * dir, vy: 0,
                        alive: true, timer: 2.5, emoji: '💥', isShockwave: true,
                    });
                }
                for (const m of boss.minions) {
                    if (Math.abs(m.x - boss.x) < 100) m.alive = false;
                }
            }
            if (boss.stateTimer <= 0) boss.enterRoaming();
        }

        // Toy summon state
        if (boss.state === 'summon') {
            boss.vx = 0;
            boss.lidOpen = true;
            if (!boss.summonDone && boss.stateTimer <= 0.8) {
                boss.summonDone = true;
                const count = boss.getPhase() >= 3 ? 2 : 1;
                const toySpeed = boss.getPhase() >= 2 ? 120 : 80;
                for (let i = 0; i < count; i++) {
                    if (boss.minions.length < 3) {
                        boss.minions.push({
                            x: boss.x + boss.width / 2 + (i * 40 - 20),
                            y: boss.groundY - 24,
                            width: 24, height: 24,
                            vx: (Math.random() > 0.5 ? 1 : -1) * toySpeed,
                            alive: true, timer: 15,
                            emoji: ['🧸', '🪖', '🤖'][Math.floor(Math.random() * 3)],
                        });
                    }
                }
            }
            if (boss.stateTimer <= 0) {
                boss.lidOpen = false;
                boss.enterRoaming();
            }
        }
    },
    getPhaseAttacks(boss, phase) {
        if (phase === 1) return ['summon', 'charge', 'snapping', 'shoot'];
        if (phase === 2) return ['summon', 'charge', 'snapping', 'spin', 'shoot'];
        return ['summon', 'snapping', 'charge', 'summon', 'spin', 'snapping'];
    },
    customAttack(boss, name) {
        if (name === 'summon') {
            boss.state = 'summon';
            boss.stateTimer = 1.5;
            boss.vx = 0;
            boss.summonDone = false;
            boss.lidOpen = true;
            return true;
        }
        if (name === 'lidslam') {
            boss.state = 'lidslam';
            boss.stateTimer = 1.5;
            boss.vx = 0;
            boss.slamDone = false;
            boss.lidOpen = true;
            return true;
        }
        if (name === 'snapping') {
            boss.state = 'snapping';
            boss.stateTimer = 11.0; // 3s snapping + 8s open
            boss.vx = 0;
            boss.snapTimer = 0;
            boss.lastSnapTime = 0;
            boss.lidOpen = false;
            return true;
        }
        return false;
    },
};
