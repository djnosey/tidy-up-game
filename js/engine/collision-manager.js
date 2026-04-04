// Collision manager — checks collisions and emits events
// Decouples collision detection from the game loop's side effects
import { events } from './events.js';

export class CollisionManager {
    checkCollectables(player, collectables) {
        for (const c of collectables) {
            if (c.checkCollect(player)) {
                events.emit('item-collected', { collectable: c, player, x: c.x, y: c.y, label: c.label });
            }
        }
    }

    checkObstacles(player, obstacles) {
        for (const o of obstacles) {
            if (o.checkHit(player)) {
                events.emit('obstacle-hit', { obstacle: o, player });
            }
        }
    }

    checkEnemies(player, enemies, projectiles) {
        for (const e of enemies) {
            // Player stomps enemy
            if (e.checkStomp(player)) {
                events.emit('enemy-stomped', { enemy: e, player });
            }
            // Enemy hits player
            else if (e.checkHit(player)) {
                events.emit('player-hit', { source: 'enemy', enemy: e, player });
            }

            // Projectile hits enemy
            for (const proj of projectiles) {
                if (proj.alive && e.checkProjectileHit(proj)) {
                    events.emit('enemy-killed', { enemy: e, projectile: proj });
                }
            }
        }
    }

    checkBoss(player, boss, projectiles) {
        // Player stomps boss
        if (boss.checkStomp(player)) {
            events.emit('boss-stomped', { boss, player });
        }
        // Player stomps minion
        else if (boss.checkMinionStomp(player)) {
            events.emit('minion-stomped', { boss, player });
        }
        // Boss body/projectiles hit player
        else if (boss.checkHitPlayer(player)) {
            events.emit('player-hit', { source: 'boss', boss, player });
        }
        // Minion hits player
        else if (boss.checkMinionHit(player)) {
            events.emit('player-hit', { source: 'minion', boss, player });
        }

        // Arena hazards
        const hazardEffect = boss.checkHazards(player);
        if (hazardEffect === 'damage') {
            events.emit('player-hit', { source: 'hazard', boss, player });
        } else if (hazardEffect === 'slow') {
            events.emit('player-slowed', { player });
        }

        // Projectiles hit boss
        for (const proj of projectiles) {
            if (proj.alive && boss.checkProjectileHit(proj)) {
                events.emit('boss-projectile-hit', { boss, projectile: proj });
            }
        }
    }
}
