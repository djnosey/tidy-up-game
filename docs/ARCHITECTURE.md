# Architecture & Code Structure

## Overview

The game is a vanilla JavaScript application using ES modules. There is no build step, no framework, no bundler. The entry point is `index.html` which loads:
- `midi-player-js` (CDN) - MIDI file parsing and playback
- `soundfont-player` (CDN) - Soundfont instrument rendering
- `js/main.js` (ES module) - Game entry point

## Module Dependency Graph

```
main.js (Game class - orchestrator)
  |
  +-- engine/game-loop.js       (GameLoop - fixed timestep RAF loop)
  +-- engine/input.js            (Input - keyboard state)
  +-- engine/camera.js           (Camera - follow, lock, shake)
  +-- engine/physics.js          (GRAVITY, AABB, platform resolution)
  +-- engine/collision-manager.js (CollisionManager -> events)
  +-- engine/events.js           (EventBus - pub/sub)
  +-- engine/particles.js        (ParticleSystem - emission + rendering)
  +-- engine/parallax.js         (ParallaxRenderer - orchestrator)
  |   +-- engine/parallax-layers/living-room.js
  |   +-- engine/parallax-layers/kitchen.js
  |   +-- engine/parallax-layers/bathroom.js
  |   +-- engine/parallax-layers/kids-room.js
  |   +-- engine/parallax-layers/parents-room.js
  |   +-- engine/parallax-layers/terrace.js
  +-- engine/lighting.js         (LightingRenderer - vignette, tints, glows)
  +-- engine/audio.js            (AudioManager - MIDI music + SFX dispatch)
  +-- engine/sfx-recipes.js      (SFX synthesis recipes - Web Audio oscillators)
  +-- engine/cheat-manager.js    (CheatManager - cheat code panel)
  +-- engine/platform-physics.js (Moving platforms, crumbling, BED bounce)
  +-- engine/asset-loader.js     (Image cache + preloader)
  +-- engine/sprite-manifest.js  (Label -> file path mappings)
  +-- engine/sprites.js          (Barrel re-export of all renderers)
  |
  +-- engine/renderers/boss-renderer.js  (All boss drawing - per-boss visuals)
  +-- engine/renderers/platform-renderer.js (Router -> furniture/)
  |   +-- engine/renderers/furniture/seating.js
  |   +-- engine/renderers/furniture/tables.js
  |   +-- engine/renderers/furniture/storage.js
  |   +-- engine/renderers/furniture/beds.js
  |   +-- engine/renderers/furniture/misc.js
  +-- engine/renderers/decoration-renderer.js (Router -> decorations/)
  |   +-- engine/renderers/decorations/windows.js
  |   +-- engine/renderers/decorations/furnishings.js
  |   +-- engine/renderers/decorations/features.js
  +-- engine/renderers/level-themes.js (Color palettes + PARTICLE_THEMES)
  +-- engine/renderers/{character,enemy,collectable,obstacle,projectile,background}-renderer.js
  |
  +-- entities/player.js         (Player - movement, health, shooting)
  +-- entities/enemy.js          (Enemy - patrol, stomp/hit detection)
  +-- entities/collectable.js    (Collectable - bob, collect animation)
  +-- entities/obstacle.js       (Obstacle - timed hazards)
  +-- entities/projectile.js     (Projectile - player-fired)
  +-- entities/boss.js           (Boss - state machine, attacks, phases — no rendering)
  |   +-- entities/bosses/boss-states.js
  |   +-- entities/bosses/{mega-roomba,fridge-beast,washing-machine,toy-box-terror,wardrobe-monster,bbq-dragon}.js
  |
  +-- levels/level-loader.js     (Factory: data -> entity instances)
  +-- levels/level1-living.js through level6-terrace.js
  |
  +-- ui/menu.js                 (Menu - title screen, character select)
  +-- ui/hub-world.js            (HubWorld - room selection map)
  +-- ui/hud.js                  (HUD - hearts, tidy meter, items)
  +-- ui/transitions.js          (TransitionManager - animations, boss reveal)
  +-- ui/score-screen.js         (ScoreScreen - post-boss results)
  +-- ui/victory-screen.js       (VictoryScreen - credits scroll)
  |
  +-- data/characters.js         (CHARACTERS array)
  +-- data/story-data.js         (OPENING_STORY, LEVEL_INTROS, BOSS_INTROS)
  +-- data/credits-data.js       (CREDITS, MESS_ITEMS)
```

## Core Systems

### Game Loop (`engine/game-loop.js`)

Fixed-timestep game loop using `requestAnimationFrame`:

- **Fixed dt:** 1/60 second (60fps)
- **Accumulator pattern:** Elapsed time is accumulated and consumed in fixed-size steps. This ensures deterministic physics regardless of display refresh rate.
- **Frame cap:** Elapsed time capped at 100ms to prevent spiral of death after tab-away
- Calls `update(dt)` per fixed step, `render()` once per frame

### Game State Machine (`main.js`)

The Game class manages a top-level state machine:

```
STATE_MENU       -> Title / character select / hub
STATE_INTRO      -> Opening story (first time only)
STATE_LEVEL_INTRO -> Room intro screen
STATE_PLAYING    -> Platforming gameplay
STATE_BOSS_INTRO -> Boss name card
STATE_BOSS       -> Boss fight (arena locked)
STATE_SCORE      -> Post-boss score screen
STATE_GAMEOVER   -> Death screen (retry with Enter)
STATE_VICTORY    -> Credits scroll (after final boss)
```

The `update(dt)` method switches on state. Each state has its own update and render path. Platform physics (moving, crumbling, BED bounce) are delegated to `engine/platform-physics.js`. Cheat code handling is delegated to `engine/cheat-manager.js`.

### Input System (`engine/input.js`)

Keyboard-only input tracking:

- `keys{}` - Currently held keys (set on keydown, cleared on keyup)
- `justPressed{}` - Keys pressed this frame (cleared at end of frame via `endFrame()`)
- Convenience getters: `.left`, `.right`, `.down`, `.jump`, `.jumpPressed`, `.shoot`, `.mutePressed`
- Prevents default on arrow keys, S, and D to avoid page scrolling

### Camera (`engine/camera.js`)

Horizontal-follow camera with several modes:

- **Normal follow:** Player stays at ~1/3 of screen width (lerp 0.08). No vertical tracking (camera.y always 0).
- **No backtracking:** `minX` ratchets forward - player can never scroll the level backwards
- **Boss lock:** When boss fight starts, camera snaps to arena position and locks. Uses smooth lerp if transitioning.
- **Screen shake:** Random offset with decay over duration. Intensity and duration configurable per event.

### Physics (`engine/physics.js`)

Minimal but complete physics:

- **Constants:** GRAVITY = 1800 px/s^2, TERMINAL_VELOCITY = 900 px/s
- **`aabb(a, b)`** - Axis-aligned bounding box overlap test
- **`landingOn(a, b, prevAY)`** - Tests if entity `a` is landing on top of `b` from above (used for stomping)
- **`resolvePlatformCollision(entity, platform)`** - Resolves overlap by pushing entity out from the side with minimum overlap. Returns 'top', 'bottom', 'left', or 'right'. Sets `entity.onGround = true` on top collision.

### Collision Manager (`engine/collision-manager.js`)

Decouples collision detection from side effects via the event bus:

- `checkCollectables(player, collectables)` -> emits `item-collected`
- `checkObstacles(player, obstacles)` -> emits `obstacle-hit`
- `checkEnemies(player, enemies, projectiles)` -> emits `enemy-stomped`, `player-hit`, `enemy-killed`
- `checkBoss(player, boss, projectiles)` -> emits `boss-stomped`, `minion-stomped`, `player-hit`, `player-slowed`, `boss-projectile-hit`

Events are listened to in `Game.setupEventListeners()` which wires up particles, SFX, camera shakes, and gameplay effects.

### Event Bus (`engine/events.js`)

Simple pub/sub:
- `events.on(event, callback)` - Subscribe
- `events.emit(event, data)` - Publish
- `events.clear()` - Remove all listeners (called on level load)

Events used:
| Event | Data | Effect |
|-------|------|--------|
| `item-collected` | player, x, y, label | Increment counter, particles, SFX, heal if +HEALTH |
| `obstacle-hit` | obstacle, player | Damage player, particles, shake, SFX, electrocute if PLUG |
| `enemy-stomped` | enemy, player | Kill enemy, bounce player, particles, SFX |
| `enemy-killed` | enemy, projectile | Kill enemy, destroy projectile, particles, SFX |
| `player-hit` | source, player | Damage player with source-specific shake/invincibility |
| `boss-stomped` | boss, player | Stomp boss, big bounce, camera shake, SFX |
| `minion-stomped` | player | Bounce player, SFX |
| `player-slowed` | player | Set _slowed flag for friction effect |
| `boss-projectile-hit` | boss, projectile | Boss-specific projectile response |

### Particle System (`engine/particles.js` + `engine/renderers/level-themes.js`)

Pool-based particle system with configurable emission:

- **Max particles:** 300 (oldest recycled)
- **Emission params:** x, y, count, colors[], speedX, speedY, gravity, friction, sizeMin, sizeMax, life
- **Per-level themes:** `PARTICLE_THEMES` in `level-themes.js` — each level has themed palettes for jumpDust, landImpact, enemyHit, collect, obstacleHit

### Rendering Pipeline

Render order in `renderGameplay()`:
1. **Background** - Solid color fill
2. **Parallax layers** - Multi-layer procedural backgrounds (level-specific scenes)
3. **Decorations** - Non-interactive background elements (curtains, photos, rugs, emojis)
4. **Platforms** - Furniture sprites or procedural shapes (with crumble shake)
5. **Collectables** - Bobbing items
6. **Obstacles** - Hazards (with ghosted preview for timed ones)
7. **Enemies** - Patrol entities
8. **Boss** - When triggered (via `renderBoss()` from `boss-renderer.js` — includes hazards, projectiles, minions)
9. **Player projectiles**
10. **Player** - With squash/stretch and invincibility flash
11. **Particles** - On top of game world
12. **Lighting** - Vignette (multiply blend), mood tint (overlay blend), light source glows (screen blend)
13. **HUD** - Health, tidy meter, item counter (not affected by camera shake)

### Asset Loading (`engine/asset-loader.js` + `engine/sprite-manifest.js`)

Two-tier rendering system:

1. **Sprite manifest** maps entity labels to PNG file paths
2. **Asset loader** preloads all images on startup and caches them
3. **Renderers** check for loaded sprites first; if unavailable, fall back to procedural Canvas 2D drawing
4. This means the game works even if all image files are missing

### Level Data Format

Levels are plain JavaScript objects (not JSON) with this structure:

```javascript
{
    name: 'Room Name',
    width: CANVAS_W * N,        // Total level width in pixels
    groundY: 520,                // Y position of ground
    backgroundColor: '#hex',     // Background fill color
    playerStart: { x, y },       // Player spawn position
    bossDoor: { x, y },          // Doorway position that triggers boss
    bossArena: { x, y, width, height },  // Boss fight area bounds
    boss: {                      // Boss configuration
        x, y, label, color, width, height, health, speed,
        attacks: ['charge', 'spin', 'shoot', ...],
    },
    decorations: [...],          // Non-interactive visuals (type, position, size)
    platforms: [...],            // Collidable surfaces (x, y, width, height, label, color, moveX/Y, crumble)
    collectables: [...],         // Items to collect (x, y, label, color)
    obstacles: [...],            // Hazards (x, y, width, height, label, color, timerOn/Off/Offset)
    enemies: [...],              // Patrol enemies (x, y, width, height, label, color, patrolRange)
}
```

### Boss Architecture

Bosses use a **strategy pattern** with rendering separated:

- `Boss` class (`entities/boss.js`) handles state machine, movement, projectiles, particles, and collision detection
- `renderBoss()` function (`engine/renderers/boss-renderer.js`) handles all boss drawing: per-boss body shapes, eyes, hazard overlays, projectiles, minions, and effects (darkness, fire, frost)
- Per-boss behavior modules (`entities/bosses/*.js`) export objects with hooks:
  - `onUpdate(boss, dt, player)` - Custom per-frame logic
  - `onProjectileHit(boss)` - Response to player shots
  - `canStomp(boss)` - Additional stomp conditions
  - `customAttack(boss, name)` - Handle custom attack states (return true if handled)
  - `getPhaseAttacks(boss, phase)` - Return attack array for current health phase

Shared boss states: `ROAMING`, `CHARGING`, `STUNNED`, `SPINNING`, `SHOOTING`, `VULNERABLE`

Custom states per boss: `suction` (Roomba), `draining` (Washing Machine), `summon`/`lidslam`/`snapping` (Toy Box), `teleport`/`darkness` (Wardrobe), `flight`/`firebeam`/`coalrain` (BBQ Dragon)

### CSS Post-Processing

Per-level CSS filters applied to the canvas element:
- Living Room: saturate(1.05) contrast(1.02)
- Kitchen: saturate(1.08) brightness(1.02) sepia(0.03)
- Bathroom: saturate(0.9) brightness(1.05) hue-rotate(-5deg)
- Kids' Room: saturate(1.15) brightness(1.03)
- Parents' Room: saturate(0.95) brightness(0.97) sepia(0.05)
- Terrace: saturate(1.1) brightness(1.08)

### Level Theme System (`engine/renderers/level-themes.js`)

Each level has a comprehensive color palette with categories:
- `wood` - base, dark, light, grain colors for wooden furniture
- `fabric` - base, dark, light, accent for upholstery/curtains
- `metal` - base, dark, light, shine for metal surfaces
- `ceramic` - base, dark, light, glaze for tiles/ceramics
- `wall` - base, trim, accent for walls
- `floor` - base, tile, grout for floor rendering
- `upholstery` - sofa, cushion, armchair specific colors
- `curtain` - base, tieback, rod
- `glass` - base with alpha, shine

Material-drawing helpers use the active theme: `drawWoodGrain()`, `drawFabricTexture()`, `drawMetalSurface()`, `drawCeramicSurface()`, `drawTilePattern()`, `drawFurnitureShadow()`, `drawLegs()`

## Key Design Patterns

1. **Data-driven levels:** Level files are pure data; `level-loader.js` instantiates all entities
2. **Strategy pattern for bosses:** Behavior modules plugged into Boss class; rendering separated into `boss-renderer.js`
3. **Event-driven collision:** CollisionManager detects, EventBus delivers, Game responds
4. **Graceful degradation:** Sprite system falls back to procedural rendering if images fail
5. **Fixed timestep:** Deterministic physics decoupled from render rate
6. **Barrel exports:** `sprites.js` re-exports all renderer functions for a clean import API
7. **Router pattern for renderers:** `platform-renderer.js` and `decoration-renderer.js` dispatch to per-category sub-modules in `furniture/` and `decorations/`
8. **Data/logic separation:** Story text, credits, and character data are in `data/` files, separate from animation/rendering code
