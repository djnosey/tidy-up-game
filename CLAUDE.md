# CLAUDE.md - Tidy Up! Game Project

## What Is This Project?

**"Tidy Up!"** is a 2D side-scrolling platformer built entirely in vanilla JavaScript with HTML5 Canvas. The game is a personal/family project themed around a family (the Jarvis-Payne-Pozo family) returning from a holiday in Barcelona to find their house overrun with mess, pests, and rogue appliances.

The player traverses 6 rooms of the house, collecting mess items and defeating a boss in each room. It's a love letter to classic platformers with a domestic comedy twist.

## Quick Start

Open `index.html` in a browser. No build step, no bundler, no dependencies to install. The only external deps are two CDN scripts loaded in the HTML (midi-player-js and soundfont-player for MIDI music playback).

## Project Structure

```
dereks/
  index.html              # Entry point - 960x600 canvas, loads CDN scripts + main.js
  css/style.css            # Canvas styling + per-level CSS post-processing filters
  midi-mixer.html          # Standalone tool for tweaking MIDI track volumes/instruments
  game-ideas.md            # Original design notes (historical)
  docs/                    # Comprehensive documentation (see below)
  assets/
    music/                 # MIDI files: level1-6.mid + boss.mid
    platforms/             # PNG sprites for furniture (organized by room)
    enemies/               # Sprite sheets and frames for enemies (cat, spider, pigeon, wasp)
    CREDITS.md             # Asset attribution (CC0 and CC-BY sources)
  js/
    main.js                # Game class - state machine, game loop, event wiring
    data/                  # Pure data (no logic)
      characters.js        # 4 playable characters: Steve, Hara, Derek, Juno
      story-data.js        # Opening story dialogue, level intros, boss intros
      credits-data.js      # End credits text and sequence data
    engine/                # Core engine systems
      game-loop.js         # Fixed timestep (60fps) with requestAnimationFrame
      input.js             # Keyboard input (arrows, S=jump, D=shoot, M=mute)
      camera.js            # Horizontal follow, no-backtrack, boss lock, screen shake
      physics.js           # AABB collision, platform resolution, gravity constants
      collision-manager.js # Decoupled collision checks -> event bus
      events.js            # Simple pub/sub EventBus
      particles.js         # Particle system (emission + rendering)
      parallax.js          # Parallax orchestrator (delegates to per-level layers)
      parallax-layers/     # Per-level procedural background art
        living-room.js     # Living Room parallax layers
        kitchen.js         # Kitchen parallax layers
        bathroom.js        # Bathroom parallax layers
        kids-room.js       # Kids' Room parallax layers
        parents-room.js    # Parents' Room parallax layers
        terrace.js         # Terrace parallax layers
      lighting.js          # Vignette, mood tints, light source glows
      audio.js             # MIDI music playback + SFX dispatch via soundfont-player
      sfx-recipes.js       # Web Audio API SFX synthesis recipes (chiptune oscillators)
      cheat-manager.js     # Cheat code panel (press I to open)
      platform-physics.js  # Moving platforms, crumbling platforms, BED bounce
      asset-loader.js      # Image preloader with fallback to procedural rendering
      sprite-manifest.js   # Maps labels -> sprite file paths (platforms, enemies, decorations)
      sprites.js           # Barrel re-export of all renderers
      renderers/           # Individual procedural renderers
        shared.js          # Utility: roundRect, darken/lighten, emoji drawing
        level-themes.js    # Per-level color palettes + PARTICLE_THEMES
        character-renderer.js
        boss-renderer.js   # All boss drawing (per-boss body, eyes, hazards, projectiles)
        platform-renderer.js  # Router -> furniture/ subfolder
        enemy-renderer.js
        collectable-renderer.js
        obstacle-renderer.js
        projectile-renderer.js
        decoration-renderer.js  # Router -> decorations/ subfolder
        background-renderer.js
        furniture/         # Per-category furniture drawing
          seating.js       # Sofa, armchair, cushion, chair, stool
          tables.js        # Table, TV unit, counter
          storage.js       # Shelf, bookshelf, drawer, fridge, wardrobe, etc.
          beds.js          # Bed, bunk bed
          misc.js          # Frame, lamp, bathtub, toilet, sink, railing, etc.
        decorations/       # Per-category decoration drawing
          windows.js       # Window, curtain
          furnishings.js   # Rug, wall art, photos, lamps, crayons, etc.
          features.js      # Radiator, skirting, cornice, doorway, puddles, etc.
    entities/              # Game objects
      player.js            # Movement, jumping, crouching, shooting, health, squash/stretch
      enemy.js             # Patrol AI, stomp/projectile/hit detection
      collectable.js       # Bobbing items with collect animation
      obstacle.js          # Hazards with optional timer cycling
      projectile.js        # Player-fired projectiles (slipper/spoon/nerf/crayon)
      boss.js              # Boss state machine, attacks, phases, collision (no rendering)
      bosses/              # Per-boss behavior modules
        boss-states.js     # Shared state constants
        mega-roomba.js     # Level 1 boss - suction attack, dust trails
        fridge-beast.js    # Level 2 boss - door mechanic, freezer mist
        washing-machine.js # Level 3 boss - rising water, drain cycle, ring projectiles
        toy-box-terror.js  # Level 4 boss - minion summoning, snapping lid attack, lid slam shockwave
        wardrobe-monster.js# Level 5 boss - teleportation, darkness attack
        bbq-dragon.js      # Level 6 boss - flight, fire beam, coal rain
    levels/                # Level data definitions
      level-loader.js      # Instantiates entities from level data objects
      level1-living.js     # Living Room (4 screens wide)
      level2-kitchen.js    # Kitchen (5 screens wide)
      level3-bathroom.js   # Bathroom (4 screens wide)
      level4-kids.js       # Kids' Room (4 screens wide)
      level5-parents.js    # Parents' Room (4 screens wide)
      level6-terrace.js    # Outdoor Terrace (5 screens wide)
    ui/                    # User interface
      menu.js              # Title screen + character select
      hub-world.js         # Hub world (room selection map, level navigation)
      hud.js               # Health hearts, tidy meter, item counter
      transitions.js       # Transition animations (typewriter text, boss reveal)
      score-screen.js      # Post-boss score with stars
      victory-screen.js    # Credits scroll with falling emoji mess items
```

## Key Technical Details

- **Canvas resolution:** Fixed 960x600, CSS-scaled to fit viewport
- **Game loop:** Fixed timestep at 60fps with accumulator pattern
- **Physics:** Custom AABB with platform resolution (top/bottom/left/right), gravity=1800, terminal velocity=900
- **Rendering:** Hybrid system - PNG sprites loaded where available, procedural Canvas 2D drawing as fallback. All rendering goes through themed renderers using per-level color palettes.
- **Audio:** Chiptune SFX via Web Audio API oscillators. Music via MIDI files played through midi-player-js + soundfont-player. Per-track volume/instrument overrides configurable in AudioManager.
- **No-backtrack camera:** Player cannot scroll left past the camera's furthest right position
- **Boss system:** Each boss has a base class with shared state machine (roaming/charging/spinning/shooting/vulnerable/stunned) plus per-boss behavior modules that add custom states and attacks. Bosses have 3 health phases that modify attack patterns and timing.

## Controls

- Arrow keys: Move left/right, crouch (down)
- S: Jump (hold for higher, tap for short hop)
- D: Shoot (character-specific projectile)
- M: Toggle mute
- Enter/Space: Menu navigation, advance dialogue

## Documentation

See the `docs/` folder for comprehensive documentation:
- `docs/CONCEPT.md` - Game idea, story, characters, gameplay mechanics
- `docs/ARCHITECTURE.md` - Code structure, engine systems, module relationships
- `docs/ASSETS.md` - All sprites, music, asset pipeline
- `docs/LEVELS-AND-BOSSES.md` - Every level layout, boss mechanics, strategies
- `docs/UI-AND-AUDIO.md` - Menu system, HUD, transitions, audio engine

## Important Conventions

- Level data is purely declarative (plain objects in level files) and instantiated by `level-loader.js`
- Boss behaviors are separate modules (strategy pattern) imported by `boss.js`
- The event bus (`events.js`) decouples collision detection from side effects
- Renderers pull colors from `level-themes.js` for visual coherence
- All sprite paths are declared in `sprite-manifest.js` and preloaded on startup
- The game is exposed as `window._game` for debug access in the browser console
