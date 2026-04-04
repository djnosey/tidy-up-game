# TIDY UP! — Complete Game Specification

## What This Is
A 2D side-scrolling platformer (Mario-style) built with HTML5 Canvas + vanilla JS. A family of 4 tidies their casa de pueblo in Molins de Rei (near Barcelona) by collecting items scattered around each room, dodging household hazards, defeating household enemies, and beating a room-themed boss at the end of each level.

---

## Tech Stack & Architecture

### Stack
- **HTML5 Canvas** for all rendering (960x600 fixed resolution)
- **Vanilla JavaScript** with ES modules (`type="module"`)
- **No npm packages** — two CDN-loaded libraries for MIDI music (midi-player-js, soundfont-player)
- Requires a local server to run (`python3 -m http.server 8080`)

### File Structure
```
dereks/
├── index.html                    # Entry point, single <canvas> element
├── css/style.css                 # Fullscreen canvas, responsive scaling, per-level CSS filters
├── js/
│   ├── main.js                   # Game init, state machine, game loop, level progression,
│   │                               particle emission triggers, camera shake triggers
│   ├── data/characters.js        # 4 playable character configs
│   ├── engine/
│   │   ├── game-loop.js          # requestAnimationFrame with fixed timestep (60fps)
│   │   ├── input.js              # Keyboard input (arrow keys, S, D, down, M for mute)
│   │   ├── camera.js             # Lerp-based smooth camera, screen shake, boss arena lock
│   │   ├── physics.js            # Gravity, AABB collision, platform resolution, landingOn
│   │   ├── asset-loader.js       # Image preloader with placeholder fallback
│   │   ├── audio.js              # AudioManager: SFX synthesis (Web Audio API oscillators)
│   │   │                           + MIDI music playback (midi-player-js + soundfont-player)
│   │   ├── sprites.js            # ALL canvas drawing: characters, platforms, collectables,
│   │   │                           obstacles, enemies, projectiles, decorations, backgrounds
│   │   ├── particles.js          # Centralized particle system with per-level themed palettes
│   │   ├── parallax.js           # Multi-layered parallax backgrounds (3 layers per level)
│   │   └── lighting.js           # Vignette, per-level mood tint, light source glows
│   ├── entities/
│   │   ├── player.js             # Movement, jump, crouch, shoot, health, squash & stretch
│   │   ├── projectile.js         # Per-character projectile (slipper/spoon/nerf/crayon)
│   │   ├── collectable.js        # Bobbing items, collect-on-touch, +1 animation
│   │   ├── obstacle.js           # Static hazards, animated effects
│   │   ├── enemy.js              # Patrol AI, stomp-to-kill, projectile-killable
│   │   └── boss.js               # State machine boss with per-boss unique mechanics, phase system, arena hazards
│   ├── levels/
│   │   ├── level-loader.js       # Converts level data into entity instances (incl. theme data)
│   │   ├── level1-living.js      # Living Room (4 screens)
│   │   ├── level2-kitchen.js     # Kitchen (5 screens)
│   │   ├── level3-bathroom.js    # Bathroom (3 screens, more vertical)
│   │   ├── level4-kids.js        # Kids' Room (4 screens)
│   │   ├── level5-parents.js     # Parents' Room (4 screens)
│   │   └── level6-terrace.js     # Outdoor Terrace (5 screens)
│   └── ui/
│       ├── hud.js                # Hearts, tidy meter, collectable count
│       ├── menu.js               # Title screen, character select, hub with lit windows
│       └── score-screen.js       # Star rating (1-3 stars) after beating boss
├── assets/
│   └── music/                    # MIDI background music files
│       ├── level1.mid            # No Batidão (Brazilian phonk)
│       ├── level2.mid            # Tribute — Tenacious D
│       ├── level3.mid            # Never Ending Story — Limahl
│       ├── level4.mid            # Popular — Wicked musical
│       ├── level5.mid            # Rat Dance
│       ├── level6.mid            # Gangnam Style — PSY
│       └── boss.mid              # Steve's Lava Chicken — Minecraft Movie (Jack Black)
└── (other asset folders)         # Empty folders ready for real photos (not yet used)
```

---

## Controls
| Key | Action |
|-----|--------|
| ← → Arrow keys | Move left/right |
| S | Jump (hold for higher, tap for short hop) |
| ↓ Down arrow | Crouch (reduces hitbox, slows movement) |
| D | Shoot projectile (character-specific) |
| Enter / Space | Menu selection, continue after score screen |
| M | Toggle mute (all audio on/off) |

---

## Game States & Flow

### State Machine (in main.js)
1. **MENU** — Title screen → character select → hub screen
2. **PLAYING** — Side-scrolling gameplay until player reaches the boss door
3. **BOSS** — Player touches the door → teleported into a dedicated boss arena screen, camera snaps, 2s invincibility
4. **SCORE** — Star rating screen after boss defeated
5. **GAMEOVER** — "The mess wins..." screen, Enter to retry

### Progression
- Levels unlock sequentially (1→2→3→4→5→6)
- Hub screen shows the house facade — windows light up for completed levels
- Character can be switched between levels from the hub
- After all 6 levels: final score screen with total stars

### Title / Hub Screen
- **Title screen:** Casa de pueblo facade with "TIDY UP!" title and "A Family Platformer" subtitle
- **Character select:** 4 cards showing Steve/Hara/Derek/Juno with colors and projectile type
- **Hub screen:** House exterior, character standing at door, next level name shown, lit windows for completed levels

---

## Characters (Playable)

| Character | Role | Color | Hair | Projectile | Projectile Emoji |
|-----------|------|-------|------|------------|-----------------|
| Steve | Dad | #3366CC (blue) | Short brown | Slipper | 🩴 |
| Hara | Mum | #CC3366 (pink) | Long black | Wooden spoon | 🥄 |
| Derek | Kid | #33CC66 (green) | Messy spiky | NERF dart | canvas-drawn (orange) |
| Juno | Kid | #CC9933 (gold) | Messy spiky | Crayon | 🖍️ |

### Character Rendering
- Canvas-drawn humans: skin-colored head with eyes/mouth, colored shirt body, darker pants, shoes, arms with hands
- Hair differs: Hara has long hair with side strands, Steve has short hair, kids have spiky messy hair
- Name tag drawn above head
- Facing direction flips the sprite via `ctx.scale(-1, 1)` combined with squash/stretch scale
- Invincibility = flashing (skip every other frame for 1.5s)

### Squash & Stretch (player.js)
Adds "juice" to the player character by deforming the sprite on jump and land:
- **Properties:** `scaleX` and `scaleY` (default 1.0)
- **On jump:** `scaleX = 0.8, scaleY = 1.3` (stretch tall, narrow)
- **On land:** `scaleX = 1.3, scaleY = 0.7` (squash wide, short)
- **Recovery:** Both lerp back toward 1.0 each frame at rate `8 * dt` — `scale += (1 - scale) * min(1, 8 * dt)`
- **Pivot point:** Feet center — transform sequence in render():
  1. `ctx.translate(centerX, feetY)` — move origin to feet
  2. `ctx.scale(scaleX * facingFlip, scaleY)` — apply deformation + facing
  3. `ctx.translate(-width/2, -height)` — offset back to draw position
  4. `drawCharacter(ctx, 0, 0, ...)` — draw at local origin
- This ensures squash expands downward from feet, not from center

### Player Physics
| Constant | Value |
|----------|-------|
| MOVE_SPEED | 280 px/s |
| JUMP_VELOCITY | -720 px/s (max jump ~144px) |
| SHORT_JUMP_VELOCITY | -430 px/s |
| GRAVITY | 1800 px/s² |
| TERMINAL_VELOCITY | 900 px/s |
| Player width | 48px |
| Player height | 72px (standing), 43px (crouching) |
| Shoot cooldown | 0.5s |
| Projectile speed | 500 px/s, max distance 500px |

---

## Level Data Format

Every level file exports an object with this structure:
```javascript
{
    name: string,               // Display name (also keys into PARTICLE_THEMES and parallax)
    width: number,              // Total level width in pixels
    groundY: 520,               // Y position of ground surface (constant)
    backgroundColor: string,    // Hex color for wall/sky
    playerStart: { x, y },      // Spawn position

    bossDoor: { x, y },            // Door that triggers boss arena transition
    bossArena: { x, y, width: 960, height: 600 },  // Camera lock zone (last screen)
    boss: {                     // Boss configuration
        x, y, label, color, width, height,
        health,                 // Stomps to kill (6 for most, 9 for BBQ Dragon)
        speed,                  // Base movement speed
        attacks: [],            // Array of attack names (incl. custom per-boss attacks)
    },

    decorations: [],            // Non-interactive background objects (incl. animated ambient types)
    platforms: [],              // Surfaces the player stands on
    collectables: [],           // Items to pick up (tidying)
    obstacles: [],              // Static hazards that damage on contact
    enemies: [],                // Moving enemies that patrol
    theme: {},                  // Optional: overrides for particle/parallax/lighting configs
}
```

**Note:** The level `name` field is used as a key to look up the particle theme (`PARTICLE_THEMES[name]` in particles.js), parallax layers (`PARALLAX_LAYERS[name]` in parallax.js), lighting tint (`LEVEL_TINTS[name]` in lighting.js), and CSS filter class (`LEVEL_CSS[index]` in main.js). Adding a new level requires adding entries in all four systems.

### Platform Data: `{ x, y, width, height, label, color }`
- **Hitbox is the thin surface** (14-24px height). Visual furniture extends above/below via canvas drawing.
- Drawing functions receive `floorY` (ground Y) and draw legs down to the floor.
- All furniture casts elliptical floor shadow.
- Must be wider than player (48px).

### Collectable Data: `{ x, y, label, color }`
- 34px circles with colored border, white ring, emoji inside
- Bob gently up/down. On collect: "+1" floats up and fades.
- `+HEALTH` label restores 1 heart (renders as 🍪)

### Obstacle Data: `{ x, y, width, height, label, color }`
- Static hazards. ⚠️ warning icon above each.
- Type-specific rendering: sparks for PLUG, flame for CANDLE, wavy line for CABLE, etc.

### Enemy Data: `{ x, y, width, height, label, color, patrolRange }`
- Patrol left/right within `patrolRange` pixels of spawn.
- Killed by jumping on head (stomp) or projectile hit.
- Squish animation on death (0.5s).

### Decoration Data: `{ type, x, y, ... }`
- Non-interactive, drawn behind platforms.
- **Static types:** `window`, `curtain`, `ceiling_light`, `standing_lamp`, `rug`, `wall_art`, `family_photo`, `radiator`, `wall_socket`, `power_strip`, `wall_shelf_deco`, `dado_rail`, `cornice`, `skirting`, `doorway`, or `emoji` (with `emoji` and `size` fields).
- **Animated ambient types** (use `Date.now()` for animation):

| Type | Visual | Animation | Used In |
|------|--------|-----------|---------|
| `dust_motes` | 6 tiny warm-yellow dots floating in area | Sine/cosine drift on x/y, size pulses | Living Room, Parents' Room |
| `steam_wisps` | 4 white-gray circles rising upward | Rise + sway + fade over 3s cycle | Kitchen, Bathroom |
| `water_puddle` | Cyan transparent ellipse on floor | Subtle shimmer (alpha oscillates) + white highlight | Bathroom |
| `floating_bubbles` | 5 translucent circles rising with highlight dot | Rise + sway + fade over 4s cycle, stroke-only circles | Bathroom |
| `scattered_crayons` | 5 colored rectangles with tips, rotated randomly | Static (rotated at draw time) | Kids' Room |
| `paper_airplane` | White triangle folded shape | Gentle sine bob up/down | Kids' Room |
| `dust_bunny` | Cluster of 3 gray overlapping circles | Subtle wobble | Parents' Room |
| `grass_tuft` | 5 curved green strokes growing from ground | Wind sway via sine | Terrace |
| `butterfly` | Two ellipse wings + thin body, configurable color | Wing flap (scale y oscillation) + floating drift on sine x/y paths | Terrace |
| `dripping_tap` | Single cyan droplet falling, then splash ring | 2s cycle: drop falls 30px → splash ring expands + fades | Kitchen, Bathroom |

---

## Rendering System (sprites.js)

### Collectable Emoji Map
| Label | Emoji | Level |
|-------|-------|-------|
| REMOTE | 📱 | Living Room |
| CUSHION | 🟫 | Living Room |
| MAGAZINE | 📰 | Living Room |
| BOOK | 📕 | Living Room, Parents |
| GLASS | 🥃 | Living Room, Parents |
| BLANKET | 🧣 | Living Room |
| COASTER | 🟤 | Living Room |
| MUG | ☕ | Living Room, Terrace |
| KEYS | 🔑 | Living Room, Terrace |
| GLASSES | 👓 | Living Room |
| PHONE | 📱 | Living Room, Parents |
| SOCKS | 🧦 | Living Room |
| HEADPHONES | 🎧 | Living Room |
| PLATE | 🍽️ | Kitchen |
| CUP | ☕ | Kitchen |
| UTENSIL | 🍴 | Kitchen |
| POT | 🫕 | Kitchen |
| PAN | 🍳 | Kitchen |
| SPONGE | 🧽 | Kitchen |
| TEA_TOWEL | 🧻 | Kitchen |
| SPICE | 🧂 | Kitchen |
| TOWEL | 🧖 | Bathroom |
| SHAMPOO | 🧴 | Bathroom |
| TOOTHBRUSH | 🪥 | Bathroom |
| SOAP | 🧼 | Bathroom |
| DUCK | 🦆 | Bathroom |
| BATH_TOY | 🛁 | Bathroom |
| TEDDY | 🧸 | Kids' Room |
| PENCIL | ✏️ | Kids' Room |
| TOY_CAR | 🚗 | Kids' Room |
| BLOCK | 🧱 | Kids' Room |
| CRAYON | 🖍️ | Kids' Room |
| STICKER | ⭐ | Kids' Room |
| ACTION_FIG | 🦸 | Kids' Room |
| PUZZLE | 🧩 | Kids' Room |
| CLOTHES | 👔 | Parents' Room |
| PILLOW | 🛏️ | Parents' Room |
| CHARGER | 🔋 | Parents' Room |
| SLIPPER | 🩴 | Parents' Room |
| LAUNDRY | 🧺 | Parents' Room |
| WATERING_CAN | 🚿 | Terrace |
| FOOTBALL | ⚽ | Terrace |
| ROPE | 🪢 | Terrace |
| GARDEN_TOOL | 🔧 | Terrace |
| SHOE | 👟 | Terrace |
| +HEALTH | 🍪 | All levels |

### Platform Types (canvas-drawn furniture)

**Living Room:** SOFA (cushions, armrests, legs), TABLE (legs, wood grain, cross bar), TV UNIT (cabinet, drawers, 📺 on top), SHELF (brackets, wood grain), BOOKS (colored spines), FRAME (landscape picture), CUSHION (soft rounded), CHAIR (slats, 4 legs), ARMCHAIR (padded, arms), LAMP (shade, glow, stem)

**Kitchen:** COUNTER (tiled front, overhang), DRAWER (open, handle), FRIDGE (door, handle, magnets), HANGING_POT (chain from ceiling), STOOL (round seat, legs), DINING_TABLE (same as TABLE)

**Bathroom:** BATHTUB (porcelain, claw feet, taps), TOILET (lid, tank, flush handle), SINK (wall-mounted, taps, brackets), TOWEL_RACK (bar, draped towel), SHOWER_SHELF (same as SHELF)

**Kids' Room:** BUNK_BED (posts, safety rail, mattress, pillow), TOY_CHEST (wooden box, open lid, toys peeking out), DESK (same as TABLE), BOARD_GAMES (stacked colored boxes), PILLOW_FORT (same as CUSHION)

**Parents' Room:** BED (headboard, footboard, duvet, pillow, "BOUNCY" label — special: landing on it and pressing jump gives super bounce vy=-900), BEDSIDE_TABLE (same as TABLE), DRESSER (drawers, handles, mirror on top), LAUNDRY_BASKET (woven, clothes peeking out), WARDROBE (tall, double doors, handles, crown molding)

**Terrace:** PLANT_POT (terracotta trapezoid, 🌿 plant on top), GARDEN_CHAIR (same as CHAIR), RAILING (iron, balusters), CLOTHESLINE (sagging rope, pegged clothes 👕🩳🧦👔), GARDEN_TABLE (same as TABLE), BBQ_SHELF (same as SHELF)

### Enemy Types (canvas-drawn)

| Label | Visual | Levels |
|-------|--------|--------|
| ROOMBA | Gray disc, LED light, bumper | Living Room |
| DUST | Fluffy tan blob cluster, tiny eyes | Living Room |
| RC CAR | Red rectangle, wheels, antenna, headlights | Living Room |
| COCKROACH | Brown oval, 6 legs, antennae | Kitchen |
| BLENDER | Cylinder, spinning blade on top | Kitchen |
| ANTS | Line of 5 small dots | Kitchen |
| SPIDER | Round body, 8 legs, red eyes | Bathroom |
| RUBBER_DUCK | Yellow duck shape, orange beak | Bathroom |
| MOULD | Green blob cluster, eyes | Bathroom |
| TOY_SOLDIER | Red uniform, hat | Kids' Room |
| BOUNCING_BALL | Rainbow hue-shifting circle | Kids' Room |
| RC_HELICOPTER | Body + spinning blade | Kids' Room |
| MOTH | Flapping wings (animated), brown body | Parents' Room |
| ALARM_CLOCK | Red circle, white face, clock hands (animated), bells, legs | Parents' Room |
| LAUNDRY_MONSTER | Pile of colored clothes with eyes | Parents' Room |
| WASP | Yellow/black stripes, flapping wings, stinger | Terrace |
| PIGEON | Gray bird, orange beak, red eye | Terrace |
| CAT | Orange cat with ears, green eyes, curved tail | Terrace |

### Obstacle Types

| Label | Rendering | Levels |
|-------|-----------|--------|
| PLUG | 🔌 + animated ⚡ sparks | Living, Kitchen, Kids, Parents |
| CANDLE | 🕯️ + flickering flame glow | Living Room |
| CABLE | Animated wavy black line + plug end | Living, Parents |
| CORNER | Triangle shape + red danger pulse | Living, Kids, Parents |
| OVEN | 🔥 + danger pulse | Kitchen |
| KNIFE | 🔪 + danger pulse | Kitchen |
| BOILING_POT | ♨️ + danger pulse | Kitchen |
| WET_FLOOR | 💧 + danger pulse | Kitchen, Bathroom, Terrace |
| HOT_TAP | 🚿 + danger pulse | Bathroom |
| RAZOR | 🪒 + danger pulse | Bathroom |
| HAIR_DRYER | 💨 + danger pulse | Bathroom |
| LEGO | 🧱 + danger pulse | Kids' Room |
| BLIND_CORD | Hanging line + ball end | Kids' Room |
| IRON | ♨️ + heat shimmer | Parents' Room |
| HAIR_STRAIGHTENER | ♨️ + heat shimmer | Parents' Room |
| CACTUS | 🌵 + danger pulse | Terrace |
| HOT_SUN | ☀️ + large heat zone | Terrace |
| BBQ_GRILL | 🔥 + danger pulse | Terrace |

---

## Particle System (particles.js)

### Architecture
- `ParticleSystem` class manages a flat array of particles, capped at 300 (oldest recycled when full)
- Each particle: `{ x, y, vx, vy, life, maxLife, color, size, gravity, friction }`
- `emit(config)` — burst N particles from a point with spread, velocity range, color palette, gravity, friction
- `update(dt)` — apply gravity, friction, velocity; decrement life; remove dead particles
- `render(ctx, camera)` — draw as filled circles with alpha fading as `life / maxLife`; skip off-screen particles
- Rendered in `renderGameplay()` after player, before lighting overlay

### Emission Triggers (centralized in main.js)
All particle emissions happen in `updateGameplay()` at the moment events occur:

| Event | Particle Type | Count | Emit Position |
|-------|--------------|-------|---------------|
| Player jumps (vy goes negative from ground) | jumpDust | 6 | Player feet center |
| Player lands (onGround transitions false→true) | landImpact | 8 | Player feet center |
| Collectable picked up | collect | 10 | Collectable x,y |
| Enemy stomped | enemyHit | 8 | Enemy center |
| Enemy killed by projectile | enemyHit | 8 | Enemy center |
| Player hit by obstacle | obstacleHit | 4 | Player center |

### Per-Level Themed Palettes (PARTICLE_THEMES)
Stored in `particles.js` as a map keyed by level name. Each theme defines 5 particle configs (jumpDust, landImpact, enemyHit, collect, obstacleHit) with level-appropriate colors, speeds, gravity, and lifetimes:

| Level | Jump Dust | Land Impact | Enemy Hit | Collectable | Character |
|-------|-----------|-------------|-----------|-------------|-----------|
| **Living Room** | Beige dust puffs (#D4C4A8, #C4B498) | Carpet fibers (#8B6914, #A07828) | White fluff (#FFF, #F0F0F0) | Gold sparkles (#FFD700, #FFC800) | Warm, grounded |
| **Kitchen** | White flour (#FFF, #F8F8F0) | Tile sparks (#B8D0D8, #A0C0C8) | Grease splatter (#C8A050, #D4B060) | Steam wisps (#F0E0C0, #FFF) | Clean, culinary |
| **Bathroom** | Cyan water droplets (#A0D0E0, #80C0D0) | Splash rings (#A0D0E0, #90C8D8) | Bubble pops (#FFF, #E0F0FF) | Soap bubbles (#E0F0FF, #C0E0F0) | Wet, bubbly, low gravity |
| **Kids' Room** | Rainbow confetti (5 bright colors) | Crayon marks (multicolor) | Pastel foam (#FFB0C8, #B0D8FF) | Star sparkles (#FFD700, #FF69B4, #00CED1) | Colorful, playful |
| **Parents' Room** | Feather wisps (#E8D8C8, #D8C8B8) | Grey fabric dust (#B0A090) | Light lint (#D0D0D0, #C0C0C0) | Warm gold (#FFD080, #FFC060) | Soft, muted, floaty |
| **Terrace** | Green leaf bits (#66AA44, #88CC66) | Dirt/pebble spray (#8B7355, #A08060) | Yellow pollen burst (#FFEE44, #FFD700) | Sunbeam motes (#FFFFAA, #FFE888) | Natural, earthy, long-lived |

Each config also specifies: `speedX`, `speedY` (velocity spread), `gravity` (downward pull), `sizeMin`/`sizeMax` (particle radius), `life` (seconds), `count` (particles per burst).

---

## Parallax Backgrounds (parallax.js)

### Architecture
- `ParallaxRenderer` class with a single `render(ctx, cameraX, canvasW, canvasH, levelName)` method
- 3 procedural layers per level, each drawn as repeating canvas shapes (no image assets)
- Each layer: `{ speed, draw(ctx, offset, canvasW, canvasH) }` where `offset = cameraX * speed`
- Helper `repeatX(offset, spacing, canvasW, callback)` handles seamless horizontal tiling
- Rendered in `renderGameplay()` after the base background gradient, before decorations
- All layers use low `globalAlpha` (0.03–0.06) so they don't compete with gameplay elements

### Per-Level Parallax Layers

| Level | Far Layer (0.05x speed) | Mid Layer (0.2–0.3x speed) | Near Layer (0.5–0.6x speed) |
|-------|------------------------|---------------------------|----------------------------|
| **Living Room** | Diamond wallpaper pattern (brown strokes) | Bookshelf silhouettes + wall clock circles | Potted plant outlines (brown pot + green leaves) |
| **Kitchen** | Square tile backsplash grid (blue-gray strokes) | Upper cabinet rectangles + hanging pot arcs | Fruit bowl (ellipse + colored circles for fruit) |
| **Bathroom** | Small tile grid (cyan strokes) + fog gradient at top | Mirror rectangles with highlight + vertical pipe lines | Shelf with 3 colored bottle rectangles |
| **Kids' Room** | Star shapes + cloud clusters (gold + blue) | Toy shelf with colored shapes on it + poster rectangle | Scattered building block squares (red/green/blue) |
| **Parents' Room** | Vertical striped wallpaper lines | Wardrobe silhouette (double rectangle) + lamp glow circle | Stacked book rectangles + photo frame stroke |
| **Terrace** | Rolling hills (quadratic curves) + building skyline rectangles | Tree trunks + canopy circles + cloud clusters + fence posts | Flower pot (terracotta rect + pink circle + green stem) + watering can |

### Drawing Style
- All shapes are simple Canvas 2D primitives: `fillRect`, `arc`, `ellipse`, `beginPath`/`lineTo`
- Very subtle opacity (0.03–0.06) — parallax adds depth without distracting
- Far layers use thin strokes/lines; near layers use filled shapes
- Each layer tiles seamlessly via modulo offset

---

## Lighting & Atmosphere (lighting.js)

### Architecture
- `LightingRenderer` class with `render(ctx, canvasW, canvasH, levelName, decorations, cameraX, cameraY, isBoss)` method
- Drawn after all game objects and particles, before HUD (still inside screen shake transform)
- Uses Canvas composite operations for blending

### Three Lighting Layers

#### 1. Light Source Glows
- Drawn with `globalCompositeOperation = 'screen'`
- Iterates level decorations, finds `ceiling_light` and `standing_lamp` types
- Draws radial gradient at each light position: warm center (`rgba(255,240,200,0.08)`) fading to transparent
- Ceiling lights: radius 120px; standing lamps: radius 80px
- Culled when off-screen (> 150px outside viewport)

#### 2. Vignette
- Drawn with `globalCompositeOperation = 'multiply'`
- Radial gradient from screen center outward: white center → dark edges
- Normal gameplay: edges darken to `rgba(180, 175, 170, 1)`, inner radius at 40% of diagonal
- Boss fight: edges darken more to `rgba(140, 120, 120, 1)`, inner radius tighter at 35%
- Gradients are cached and only regenerated on canvas resize

#### 3. Per-Level Mood Tint
- Drawn with `globalCompositeOperation = 'overlay'`
- Full-screen color fill at very low alpha:

| Level | Tint Color | Alpha | Mood |
|-------|-----------|-------|------|
| Living Room | `rgb(255, 200, 150)` | 0.06 | Warm orange — cozy afternoon |
| Kitchen | `rgb(255, 240, 200)` | 0.05 | Warm yellow — sunlit kitchen |
| Bathroom | `rgb(150, 200, 220)` | 0.08 | Cool blue-green — tiled, clinical |
| Kids' Room | `rgb(255, 230, 180)` | 0.04 | Bright warm — playful, airy |
| Parents' Room | `rgb(200, 180, 150)` | 0.07 | Dim amber — evening, intimate |
| Terrace | `rgb(255, 250, 220)` | 0.05 | Golden — outdoor sunlight |
| **Boss Fight** | `rgb(200, 50, 30)` | 0.06 | Red shift — danger, intensity |

---

## CSS Post-Processing (style.css)

Per-level CSS `filter` classes applied to the `<canvas>` element. These are GPU-accelerated and add zero JavaScript overhead.

Set via `this.canvas.className = LEVEL_CSS[levelIndex]` in `startLevel()`.

| CSS Class | Filter | Effect |
|-----------|--------|--------|
| `.level-living` | `saturate(1.05) contrast(1.02)` | Slightly richer colors |
| `.level-kitchen` | `saturate(1.08) brightness(1.02) sepia(0.03)` | Warm, bright, hint of sepia |
| `.level-bathroom` | `saturate(0.9) brightness(1.05) hue-rotate(-5deg)` | Desaturated, bright, cool shift |
| `.level-kids` | `saturate(1.15) brightness(1.03)` | Vivid, bright — colorful room |
| `.level-parents` | `saturate(0.95) brightness(0.97) sepia(0.05)` | Slightly muted, dim, warm sepia |
| `.level-terrace` | `saturate(1.1) brightness(1.08)` | Bright outdoor sunlight |

---

## Render Pipeline (renderGameplay in main.js)

The full draw order each frame, with screen shake wrapping all world-space elements:

```
1.  ctx.save() + ctx.translate(shakeOffsetX, shakeOffsetY)   ← screen shake
2.  drawBackground()           — gradient + brick wall texture (0.1x parallax)
3.  parallax.render()          — 3 procedural depth layers (0.05x / 0.2x / 0.5x)
4.  decorations                — non-interactive scenery (windows, lights, animated ambients)
5.  platforms                  — furniture with legs, shadows, details
6.  collectables               — bobbing emoji circles
7.  obstacles                  — pulsing hazards with warning icons
8.  enemies                    — canvas-drawn creatures
9.  boss                       — if boss triggered
10. projectiles                — character-specific thrown items
11. player                     — stick figure with squash/stretch transform
12. particles.render()         — all active particles (dust, sparks, splatter)
13. lighting.render()          — light source glows → vignette → mood tint
14. ctx.restore()              ← end screen shake
15. HUD                        — hearts, tidy meter, item count (unaffected by shake)
```

---

## Boss System (boss.js)

### Core Design
Each boss has a **unique vulnerability mechanic** — the player must figure out how to create a stomp window. ROAMING is no longer a free stomp opportunity. No hand-holding text ("JUMP!", "DANGER!") — only visual cues (green glow for vulnerable, dizzy spiral eyes, pulsing aura).

### Phase System
Bosses have 3 phases based on health percentage:
- **Phase 1** (health > 66%): Longer vulnerability windows, simpler attack patterns
- **Phase 2** (health 33–66%): New attacks unlock, shorter windows, arena hazards activate
- **Phase 3** (health < 33%): Fastest patterns, tightest windows, most dangerous

### State Machine

```
ROAMING (NOT stompable) → attack → ROAMING → attack → ...
Vulnerability triggered per-boss → VULNERABLE (stompable!) → STUNNED → ROAMING (faster)
```

| State | Behaviour | Can Stomp? | Visual |
|-------|-----------|-----------|--------|
| ROAMING | Follows player (80–120px/s depending on phase), shorter windows (1–2s) | NO | Normal color |
| CHARGING | Bounces off arena walls at high speed | NO | Red-tinted |
| SPINNING | Rotates, bounces, sprays projectiles | NO | Purple-tinted, spinning |
| SHOOTING | Stationary, fires aimed projectiles | NO | Teal-tinted |
| VULNERABLE | Wobbles, dizzy spiral eyes, green pulsing glow + 💫 swirls | YES | Green-tinted |
| STUNNED | Wobbles, X eyes, stars orbiting (0.8s duration) | YES | Yellow-tinted |

### Per-Boss Unique Mechanics

| Boss | How to Make Vulnerable | Unique Attacks | Arena Hazards |
|------|----------------------|----------------|---------------|
| **Mega Roomba** | Shoot 3 times during ROAMING to overload motor | **Suction** — pulls player toward it (120–160px/s for 2s) | **Dust trail** — slows player to 50% (fades after 3s) |
| **Fridge Beast** | Doors act as shield. Shoot 2x to force doors open, OR stomp after SHOOTING attack (doors open for 1–1.5s) | **Food Wave** — arc of 3–5 food projectiles. **Freezer Mist** (Phase 2+) — slow zone on ground | Slippery food patches |
| **Washing Machine** | Every 2 attacks: **Drain cycle** — machine stops to pump water, door pops open → VULNERABLE (0.8–1.2s). Shooting during drain extends window. | **Spin Cycle** — expanding ring of projectiles with gaps to jump through | **Rising water level** — slows player ground movement by 30%, drains during Drain state |
| **Toy Box Terror** | Shoot a projectile into the **open lid** during summon/lidslam, OR stomp 3 summoned mini-toys within 4 seconds | **Toy Summons** — spawns 1–3 mini-toy enemies (🧸🪖🤖, 1HP, patrol arena). **Lid Slam** — ground shockwave 💥 (jump to dodge) | Ground shockwaves; minion toys patrolling |
| **Wardrobe Monster** | Closes doors, **teleports** to new position — stomp during 1.0s re-opening flash. Shooting extends window by 0.5s. Phase 2+: teleports twice before becoming vulnerable. | **Clothes Barrage** — dense fan of clothing projectiles. **Darkness** (Phase 2+) — arena dims heavily, only boss's glowing red eyes visible | **Darkness overlay** — reduced visibility (0.65–0.85 alpha) |
| **BBQ Dragon** | **Heat counter** (4/5/6 by phase) — each projectile hit reduces by 1. When heat = 0, fire goes out → VULNERABLE (1.5–2.0s) | **Flight** — hovers above ground (3–4s), drops 🔥 coals. **Fire Beam** — sweeps arena floor (2s). **Coal Rain** — 🪨 rains from above, creates fire patches | **Fire patches** on ground (2.5s, deal damage). **Fire beam** hazard zone |

### Projectile Strategy
Player projectiles are now **essential** for creating vulnerability windows:

| Boss | Projectile Role |
|------|----------------|
| Mega Roomba | 3 shots → overload motor → VULNERABLE |
| Fridge Beast | 2 shots → force doors open → stompable |
| Washing Machine | Shooting during drain extends vulnerability by 0.4s |
| Toy Box Terror | 1 shot into open lid → stuns boss → stompable |
| Wardrobe Monster | Shooting during re-opening → extends window by 0.5s |
| BBQ Dragon | 4–6 shots → deplete heat counter → VULNERABLE |

### Boss Projectiles (themed per boss)

| Boss | Projectiles |
|------|------------|
| Mega Roomba | 💨 dust clouds (gray circles) |
| Fridge Beast | 🧊 ice, 🥬 lettuce, 🍖 meat, 🧀 cheese, 🥚 eggs |
| Washing Machine | 💧 water, 👕 shirts, 🧦 socks, 👖 pants, 💦 splashes |
| Toy Box Terror | 🧸 teddies, 🚂 trains, 🎲 dice, 🪀 yo-yos, 🧩 puzzles |
| Wardrobe Monster | 👟 shoes, 👠 heels, 👗 dresses, 🧥 coats, 👜 bags |
| BBQ Dragon | 🔥 fire, 🪨 coals, 💨 smoke |

### Per-Boss Visuals

| Boss | Size | Health | Visual |
|------|------|--------|--------|
| **Mega Roomba** | 96x50 | **6** | Gray disc with LED (changes color with projectile hits: green→orange→yellow), inner ring, bumper. Suction shown as expanding blue concentric circles |
| **Fridge Beast** | 130x90 | **6** | White rectangular fridge, split doors (gap widens when open, interior green glow), handles, magnets 🧲📝, frost effect |
| **Washing Machine** | 120x85 | **6** | Boxy, circular door window with spinning drum, control panel, green LED, vibrates when attacking. Draining shown with 💧 dripping. Water level renders as blue overlay with animated wave surface |
| **Toy Box Terror** | 100x50 | **6** | Wooden box with hinged lid (opens wider during summon/lidslam), toys peeking out 🧸🚂🎲, metal corners, wood grain. Summoned mini-toys rendered as emoji sprites |
| **Wardrobe Monster** | 100x60 | **6** | Tall wardrobe, double doors, fang-like handles, crown molding. Fades in/out during teleport. Darkness attack renders as full-screen black overlay with glowing red eye dots |
| **BBQ Dragon** | 160x80 | **9** | Full dragon-BBQ hybrid: barrel grill body with glowing coals visible through grill lines, dragon head with neck/jaw/teeth/horns/nostrils, fire breath (animated red→yellow→white flames), rising smoke plumes (6 clouds), heat shimmer aura, BBQ wheels and handle. Heat counter shown as row of 🔥 icons above boss. Shoots faster (0.25s interval), sometimes double-fires. **The final boss.** |

---

## Level Details

### Constants (shared)
```
GROUND_Y = 520      // Floor surface Y
CANVAS_W = 960      // One screen width
```

### Level 1: Living Room
- **Width:** 3840px (4 screens), **Background:** #D4C4A8 (warm beige), **Floor:** #8B7355
- **Boss:** Mega Roomba (6HP) at screen 4 — shoot 3x to overload, suction attack, dust trails
- **Sections:** Sofa area → Bookshelf/TV corner → Challenge shelves → Boss arena
- **Platforms:** Sofa (220px wide), coffee table, shelves, bookshelves with colored spines, picture frames, TV unit with 📺, cushions, armchair, lamp, chair
- **Collectables (24):** Remote, mug, magazine, glasses, book, glass, socks, coaster, phone, keys, cushion, blanket, headphones, +health
- **Obstacles (7):** Plug sockets ×2, candles ×2, cables ×2, sharp corner
- **Enemies (6):** Roomba ×2, dust bunny ×2, RC car ×2
- **Decorations:** Cornice + dado rail + skirting (full width), 3 windows with curtains, 3 ceiling lights, standing lamps, family photos (with tiny stick figures), wall art (framed landscapes), rugs with patterns/fringe, plants 🪴, wall clocks 🕰️, radiators, wall sockets, power strips, doorway to next room, **3 animated dust mote clusters** floating in light beam areas

### Level 2: Kitchen
- **Width:** 4800px (5 screens), **Background:** #F0E8D8 (warm cream), **Floor:** #E8E0D0
- **Boss:** Fridge Beast (130x90, 6HP) at screen 5 — door shield, shoot 2x to open, freezer mist
- **Sections:** Counter/dining → Fridge/drawers → Upper cabinets → Winding path → Boss arena (5 shelves for height)
- **Platforms:** Counter, drawers (stepping stones), fridge, hanging pots (from ceiling chains), dining table, stool, shelves, chairs
- **Collectables (~27):** Plate, cup, utensil, pot, pan, sponge, tea towel, spice, +health
- **Obstacles (~10):** Oven, knife, boiling pot, wet floor, plug, cable
- **Enemies (~7):** Cockroach, blender, ants
- **Ambient Decorations:** 2 steam wisps (above stove areas), 1 dripping tap

### Level 3: Bathroom
- **Width:** 2880px (3 screens, shorter but more vertical), **Background:** #E8F0F0 (cool blue), **Floor:** #B8D0D8
- **Boss:** Washing Machine (120x85, 6HP) at screen 3 — drain cycle vulnerability, rising water level
- **Sections:** Bathtub/toilet → Shower/sink (vertical climbing) → Boss arena (extra shelves for height)
- **Platforms:** Bathtub edge (claw feet, taps), toilet lid (tank behind), sink (wall-mounted), towel rack (bar + draped towel), shower shelf, shelves
- **Collectables (~21):** Towel, shampoo, toothbrush, soap, duck, bath toy, +health
- **Obstacles (~7):** Hot tap, razor, wet floor, hair dryer, plug
- **Enemies (~6):** Spider, rubber duck, mould
- **Ambient Decorations:** 2 water puddles on floor, 2 steam wisps (shower areas), 2 floating bubble clusters

### Level 4: Kids' Room
- **Width:** 3840px (4 screens), **Background:** #F5E8D0 (warm peach), **Floor:** #C4A882 (carpet)
- **Boss:** Toy Box Terror (6HP) at screen 4 — shoot open lid or stomp 3 summoned toys, lid slam shockwave
- **Sections:** Desk/toy chest → Bunk beds (vertical: step→lower bunk→shelf→upper bunk) → Pillow forts/challenge → Boss arena
- **Platforms:** Bunk beds (lower at -60, step at -120, upper at -180), toy chests (open lid, toys peeking), desk, board games (stacked colored boxes), pillow forts, cushions, shelves
- **Collectables (~25):** Teddy, pencil, toy car, block, crayon, sticker, action figure, puzzle, +health
- **Obstacles (~9):** LEGO bricks, blind cord, plug, corner
- **Enemies (~7):** Toy soldier, bouncing ball (rainbow), RC helicopter
- **Decorations:** Colorful! Bright curtain colors (red, teal, gold), colorful rugs (pink, purple), toy emoji on walls 🧸🚂⭐, **2 scattered crayon clusters** on floor, **2 paper airplanes** floating

### Level 5: Parents' Room
- **Width:** 3840px (4 screens), **Background:** #E8E0D8 (warm gray), **Floor:** #A0886B (wood)
- **Boss:** Wardrobe Monster (100x60, 6HP) at screen 4 — teleport + catch re-opening, darkness attack
- **Sections:** Bed area (wide bouncy bed) → Wardrobe/laundry climbing → Challenge zone → Boss arena
- **Platforms:** BED (260px wide, purple #6B4470 duvet — **BOUNCY**: pressing jump while on it gives super bounce vy=-900), bedside tables, dresser (drawers, mirror on top), laundry basket (woven, clothes peeking), wardrobe (tall, double doors), shelves, chair
- **Collectables (~26):** Clothes, pillow, book, charger, glass, slipper, laundry, phone, +health
- **Obstacles (~9):** Iron, hair straightener, plug, cable, corner
- **Enemies (~7):** Moth (flapping wings), alarm clock (running, spinning hands), laundry monster (colorful pile with eyes)
- **Decorations:** Elegant tones — deep purple/plum curtains, standing lamps, flowers 💐, **3 dust bunnies** under furniture (wobbling), **1 dust mote cluster** floating

### Level 6: Outdoor Terrace
- **Width:** 4800px (5 screens), **Background:** #87CEEB (sky blue — OUTDOOR), **Floor:** #C4A070 (stone)
- **Boss:** BBQ Dragon (160x80, **9HP**) at screen 5 — heat counter (shoot 4–6x to cool), flight, fire beam, coal rain
- **Sections:** Garden entrance → Clothesline → Upper terrace → BBQ area → FINAL BOSS ARENA (7 platforms for height)
- **Platforms:** Plant pots (terracotta), garden chairs, railing (iron balusters), clothesline (sagging rope with pegged clothes), garden table, BBQ shelf, shelves
- **Collectables (~28):** Watering can, football, shoe, rope, garden tool, book, mug, keys, +health ×3
- **Obstacles (~11):** Cactus, hot sun, BBQ grill, wet floor, plug
- **Enemies (~9):** Wasp ×3, pigeon ×2, cat ×4
- **Decorations:** NO walls/dado/cornice (outdoor). Instead: sun ☀️ and clouds ☁️ in sky, string lights �� across every section, dense Mediterranean plants — olive trees 🌳, bougainvillea climbing walls 🌺🌸, flower boxes on railings 🌻, hanging baskets 🌿, garden umbrellas ⛱️, lemon trees 🍋, iron railing spanning the level, terracotta floor tiles. Boss arena has dark dramatic clouds. **4 grass tufts** swaying in wind from planter cracks, **3 butterflies** drifting (pink, blue, gold) with flapping wings

---

## HUD
- **Top left:** Character portrait (colored square + name) + 3 hearts (canvas-drawn heart shapes, red=alive, gray=lost)
- **Top center:** "TIDY" label + progress bar (gradient orange→yellow→green) with percentage
- **Top right:** "ITEMS" label + "collected / total" count in gold

---

## Scoring
- 1 star = level completed (boss beaten)
- 2 stars = 50%+ collectables
- 3 stars = 90%+ collectables
- Score screen: animated stars appearing one by one, stats fade in, "Press ENTER to continue"

---

## Camera (camera.js)

### Smooth Following (Lerp-Based)
- Horizontal: follows player at 1/3 screen offset, using linear interpolation (`lerpX = 0.08`)
- Vertical: gentle tracking when jumping, using separate lerp rate (`lerpY = 0.06`)
- Creates an organic "lag" feel rather than hard-locking to player position
- **No backtracking** — camera.minX only increases (classic Mario)

### Screen Shake
- Triggered on impact events: damage taken, boss stomps, boss wall bounces
- Properties: `shakeIntensity`, `shakeDuration`, `shakeTimer`
- Offset calculated as random x/y displacement with linear decay: `randomOffset * intensity * (timer / duration)`
- Applied via `ctx.translate(shakeOffsetX, shakeOffsetY)` wrapping all world-space drawing, removed before HUD
- `updateShake(dt)` decrements timer each frame, zeroes offset when done

| Event | Intensity | Duration |
|-------|-----------|----------|
| Player takes damage (obstacle/enemy/boss) | 6 | 0.3s |
| Player stomps boss | 8 | 0.4s |

### Boss Arena Transition
- Each level has a **doorway decoration** near the end that acts as a portal to the boss arena
- When the player overlaps the door (`bossDoor.x`), the game transitions to the boss fight:
  1. Player is teleported to the left side of the arena (arenaX + 60, on ground)
  2. Camera snaps instantly to the arena (no lerp — clean screen transition)
  3. Player gets 2 seconds of invincibility after the transition
  4. All leftover projectiles from the platforming section are cleared
  5. Boss music starts
- The boss arena is the last screen of the level (960px wide), rendered as a separate room
- Camera remains locked to the arena for the entire boss fight

---

## Key Technical Rules

### Platform Sizing
- Hitbox = thin surface (14-24px height)
- Visual extends above (backrests, headboards) and below (legs to floor)
- All furniture receives `floorY` and draws legs to ground
- All furniture has elliptical floor shadow
- Minimum width: 48px (player width)

### Jump Physics
- Max jump: 144px (JUMP_VELOCITY=-720, GRAVITY=1800)
- Never place platforms >130px apart vertically
- Variable jump: hold S = full jump, tap = short hop
- BED platforms give super bounce (vy=-900) when jumping from them

### Collision
- AABB (axis-aligned bounding box) for all collisions
- `resolvePlatformCollision()` pushes player out of platforms (top/bottom/left/right)
- `landingOn()` checks if entity A is falling onto top of entity B (for stomping)

### Enemy Behaviour
- Patrol back and forth within `patrolRange` of spawn position at 60px/s
- Die when stomped (squish animation) or hit by projectile
- Contact with player during non-stomp = player takes damage

### Boss Behaviour
- Can ONLY be stomped during VULNERABLE or STUNNED states — NOT during ROAMING or attacks
- Each boss has a unique mechanic to trigger the VULNERABLE state (see Boss System section)
- Player projectiles are strategically important — they trigger vulnerability (e.g. overload motor, open fridge doors, deplete heat counter)
- Projectiles also knock boss back slightly on hit
- Boss gets +50 speed after each stomp
- 3-phase system: attacks escalate and vulnerability windows shrink as health drops
- Roaming window: 1.0–2.0s (phase-dependent), boss moves at 80–120px/s (faster than before, not free stomp window)
- Arena hazards (dust trails, rising water, fire patches, darkness) affect player during boss fights
- Some bosses spawn minions (Toy Box Terror's toys) that patrol and can be stomped/shot
- BBQ Dragon: shoots 2x faster (0.25s vs 0.4s), sometimes double-fires, can fly and breathe fire beams

### Decoration Rendering
- All decorations receive `cameraX` AND `cameraY` to scroll correctly
- Standing lamps need `floorY` for pole length
- Architectural elements (cornice, dado rail, skirting) span full level width
- Indoor levels: cornice at top, dado rail at mid-wall, skirting at floor
- Outdoor level (terrace): no wall elements, sky background, string lights instead

---

## Audio System

### Dependencies (CDN)
- **midi-player-js** (v2.0.16) — MIDI file parser and sequencer
- **soundfont-player** (v0.12.0) — Web Audio API instrument synthesizer (MusyngKite soundfont)

### Sound Effects (synthesized via Web Audio API oscillators)
| SFX | Trigger | Description |
|-----|---------|-------------|
| `jump` | Player leaves ground with upward velocity | Rising square wave sweep (250→600Hz, 150ms) |
| `shoot` | Player fires projectile | Descending square wave "pew" (900→200Hz, 120ms) |
| `takeDamage` | Player hit by obstacle, enemy, or boss | Low sawtooth buzz with LFO wobble (150→80Hz, 300ms) |
| `giveDamage` | Player stomps enemy/boss or projectile kills enemy | Descending triangle impact + noise burst crunch |
| `collect` | Player picks up collectable item | Ascending C5-E5-G5 arpeggio (square wave, 180ms) |
| `bossDefeated` | Boss health reaches zero | Ascending C5-E5-G5-C6 fanfare (triangle wave, 600ms) |
| `playerDeath` | Player health reaches zero | Sad descending sawtooth (300→50Hz, 700ms) |

### Background Music (MIDI files)
Each level plays a different song. When the player enters the boss arena, music switches to the boss theme. Music loops continuously.

| Level | Song | Artist/Source |
|-------|------|---------------|
| 1 — Living Room | No Batidão | Brazilian phonk (ZXKAI & SLXUGHTER) |
| 2 — Kitchen | Tribute | Tenacious D |
| 3 — Bathroom | Never Ending Story | Limahl (1984 film) |
| 4 — Kids' Room | Popular | Wicked musical (Stephen Schwartz) |
| 5 — Parents' Room | Rat Dance | Internet meme |
| 6 — Outdoor Terrace | Gangnam Style | PSY |
| All boss fights | Steve's Lava Chicken | Minecraft Movie (Jack Black) |

### Multi-Instrument Routing
MIDI tracks are routed to distinct soundfont instruments based on GM program numbers rather than all playing as piano. 19 instruments are loaded on init:
- Piano, electric piano, vibraphone, koto
- Acoustic/overdriven/distortion guitar
- Electric bass, slap bass, synth bass
- Trumpet, brass section, synth brass
- Lead square, lead sawtooth, warm pad
- Choir, string ensemble, synth drum

Drums (MIDI channel 10) are always routed to synth_drum regardless of program changes.

### Per-Track Melody Boost
Each MIDI file has a per-track gain configuration that boosts melody tracks (2.0–2.5×) and reduces accompaniment (0.4–0.8×) so the main tune cuts through clearly.

### Audio Architecture
```
SFX oscillators → sfxGain (0.15) ──┐
                                    ├─→ masterGain → destination
MIDI instruments → musicGain (1.0) ─┘
```
- **AudioContext** created lazily on first user interaction (browser autoplay policy)
- **Mute toggle** via M key sets masterGain to 0
- **Music transitions**: boss arena entry stops level music, starts boss.mid; boss defeat fades music out over 0.5s

---

## What's NOT Yet Implemented (Future Work)
- Real photo sprites (placeholder system ready — asset-loader.js)
- Sprite sheet animations for player walk/run/jump cycles (currently procedural stick figure)
- Unique level mechanics (stovetop flames, rising water, LEGO floor damage, wind gusts)
- Entry/exit door transitions between levels
- Messy→tidy background transition (two background layers with opacity crossfade)
- Mobile touch controls
- Final "all rooms tidy" celebration screen
- WebGL shaders for advanced effects (neon glows, liquid lava, chromatic aberration)
- Auto-tiling for ground blocks (edge/corner sprite selection based on neighbors)
