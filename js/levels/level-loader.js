import { Collectable } from '../entities/collectable.js';
import { Obstacle } from '../entities/obstacle.js';
import { Enemy } from '../entities/enemy.js';
import { Boss } from '../entities/boss.js';

export function loadLevel(levelData) {
    const collectables = levelData.collectables.map(c =>
        new Collectable(c.x, c.y, c.label, c.color)
    );

    const obstacles = levelData.obstacles.map(o =>
        new Obstacle(o.x, o.y, o.width, o.height, o.label, o.color, o.timerOn, o.timerOff, o.timerOffset)
    );

    const enemies = levelData.enemies.map(e =>
        new Enemy(e.x, e.y, e.width, e.height, e.label, e.color, e.patrolRange)
    );

    const boss = new Boss(
        levelData.boss.x,
        levelData.boss.y,
        levelData.boss
    );

    return {
        name: levelData.name,
        width: levelData.width,
        groundY: levelData.groundY,
        backgroundColor: levelData.backgroundColor,
        playerStart: levelData.playerStart,
        platforms: levelData.platforms,
        decorations: levelData.decorations || [],
        collectables,
        obstacles,
        enemies,
        boss,
        bossDoor: levelData.bossDoor || null,
        bossArena: levelData.bossArena,
        totalCollectables: collectables.length,
        theme: levelData.theme || null,
    };
}
