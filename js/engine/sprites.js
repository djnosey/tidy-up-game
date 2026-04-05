// Barrel re-export — all rendering functions available from their original import path
// Each renderer can also be imported directly for more targeted dependencies

export { drawCharacter } from './renderers/character-renderer.js';
export { drawPlatform, drawPlatformSurface } from './renderers/platform-renderer.js';
export { drawEnemy } from './renderers/enemy-renderer.js';
export { drawCollectable } from './renderers/collectable-renderer.js';
export { drawObstacle } from './renderers/obstacle-renderer.js';
export { drawProjectile } from './renderers/projectile-renderer.js';
export { drawDecoration } from './renderers/decoration-renderer.js';
export { drawBackground, drawFloorHazard } from './renderers/background-renderer.js';
export { setActiveTheme, getTheme, LEVEL_THEMES } from './renderers/level-themes.js';
