# Assets

## Directory Structure

```
assets/
  CREDITS.md                    # Attribution for all external assets
  music/                        # MIDI music files
    level1.mid                  # Living Room theme
    level2.mid                  # Kitchen theme
    level3.mid                  # Bathroom theme
    level4.mid                  # Kids' Room theme
    level5.mid                  # Parents' Room theme
    level6.mid                  # Terrace theme
    boss.mid                    # Boss battle theme (shared across all bosses)
  platforms/                    # Furniture/platform PNG sprites
    living/                     # Living Room furniture
    kitchen/                    # Kitchen furniture
    bathroom/                   # Bathroom fixtures
    kids/                       # Kids' Room furniture
    parents/                    # Parents' Room furniture
    terrace/                    # Outdoor terrace items
    shared/                     # Cross-room furniture
  enemies/                      # Enemy sprite sheets and frames
    cat/                        # Cat walk cycle (10 frames + idle)
    shared/                     # Spider, bat, bird, pigeon, wasp sprites
```

## Platform Sprites

All platform sprites are PNGs rendered as furniture pieces. They're mapped in `js/engine/sprite-manifest.js` via the `PLATFORM_SPRITES` object, keyed by the platform's `label` property.

### Living Room (`assets/platforms/living/`)
| File | Label | Description |
|------|-------|-------------|
| `sofa-front.png` | SOFA | Front-facing sofa |
| `sofa.png` | SOFA ARM | Sofa arm rest |
| `sofa-long.png` | - | Long sofa variant (unused in manifest) |
| `sofa2-front.png` | - | Alternate sofa front (unused in manifest) |
| `armchair-front.png` | ARMCHAIR | Front-facing armchair |
| `armchair.png` | - | Side armchair (unused in manifest) |
| `table-front.png` | TABLE | Coffee/side table |
| `tvstand-front.png` | TV UNIT | TV stand |
| `bookshelf.png` | BOOKS | Bookshelf |
| `coffee-table.png` | - | Coffee table variant (unused in manifest) |
| `entertainment-front.png` | - | Entertainment center (unused in manifest) |
| `standing-lamp.png` | - | Standing lamp (decoration only) |
| `tv-unit.png` | - | TV unit variant (unused in manifest) |
| `rug.png` | - | Used as decoration sprite |

### Kitchen (`assets/platforms/kitchen/`)
| File | Label | Description |
|------|-------|-------------|
| `counter.png` | COUNTER | Kitchen counter/worktop |
| `drawer.png` | DRAWER | Kitchen drawer unit |
| `fridge.png` | FRIDGE | Refrigerator |
| `stool.png` | STOOL | Bar stool |
| `blender.png` | - | Blender (unused in manifest) |
| `sink.png` | - | Kitchen sink (unused in manifest) |
| `stove.png` | - | Stove/cooker (unused in manifest) |

### Bathroom (`assets/platforms/bathroom/`)
| File | Label | Description |
|------|-------|-------------|
| `bathtub.png` | BATHTUB | Bathtub |
| `toilet.png` | TOILET | Toilet |
| `sink.png` | SINK | Bathroom sink |
| `metal-shelf.png` | SHOWER_SHELF | Metal shower shelf |
| `cabinet.png` | - | Bathroom cabinet (unused in manifest) |
| `shower.png` | - | Shower (unused in manifest) |
| `washing-machine.png` | - | Washing machine (unused in manifest) |

### Kids' Room (`assets/platforms/kids/`)
| File | Label | Description |
|------|-------|-------------|
| `bunk-bed.png` | BUNK_BED | Bunk bed |
| `toy-chest.png` | TOY_CHEST | Toy chest/box |
| `desk-front.png` | DESK | Front-facing desk |
| `desk.png` | - | Side desk (unused in manifest) |
| `teddy.png` | - | Teddy bear (unused in manifest) |

### Parents' Room (`assets/platforms/parents/`)
| File | Label | Description |
|------|-------|-------------|
| `bed.png` | BED | Double bed |
| `bed-front.png` | - | Front-facing bed (unused in manifest) |
| `bedside-table.png` | BEDSIDE_TABLE | Bedside table |
| `wardrobe.png` | WARDROBE | Wardrobe |
| `dresser.png` | DRESSER | Dresser/chest of drawers |
| `chair.png` | - | Chair (unused in manifest) |
| `pillow.png` | - | Pillow (unused in manifest) |

### Terrace (`assets/platforms/terrace/`)
| File | Label | Description |
|------|-------|-------------|
| `garden-chair.png` | GARDEN_CHAIR | Outdoor garden chair |
| `garden-table.png` | GARDEN_TABLE | Outdoor garden table |
| `plant-pot.png` | PLANT_POT | Terracotta plant pot |

### Shared (`assets/platforms/shared/`)
| File | Label | Description |
|------|-------|-------------|
| `chair-front.png` | CHAIR | Generic front-facing chair |
| `chair.png` | - | Side chair (unused in manifest) |
| `shelf-front.png` | SHELF / TOP SHELF | Wall shelf |
| `bookshelf-front.png` | - | Bookshelf front (unused in manifest) |
| `endtable-front.png` | - | End table (unused in manifest) |
| `lamp-floor.png` | LAMP | Floor standing lamp |
| `lamp-table.png` | - | Table lamp (unused in manifest) |
| `side-table.png` | - | Side table (unused in manifest) |
| `doorway.png` | - | Used as decoration sprite for room doorways |
| `trashcan.png` | - | Trash can (unused in manifest) |

## Enemy Sprites

Enemy sprites are mapped in `js/engine/sprite-manifest.js` via the `ENEMY_SPRITES` object.

### Cat (`assets/enemies/cat/`)
- **Type:** Individual frame files
- **Frames:** `walk-1.png` through `walk-10.png` (10-frame walk cycle)
- **Idle:** `idle.png`
- **Frame rate:** 8 fps
- **Used for:** CAT enemy on the Terrace level

### Shared Enemies (`assets/enemies/shared/`)
| File | Enemy | Type | Details |
|------|-------|------|---------|
| `spider-sheet.png` | SPIDER | Spritesheet | 6 frames at 8fps |
| `bat-sheet.png` | - | Spritesheet | Bat enemy (not currently placed in levels) |
| `bird-sheet.png` | - | Spritesheet | Bird enemy (not currently placed) |
| `pigeon-1.png`, `pigeon-2.png` | PIGEON | Frame files | 2-frame animation at 4fps |
| `wasp.gif`, `wasp2.gif` | WASP | GIF | Wasp enemy animation (note: GIF format, not PNG) |

## Decoration Sprites

Mapped in `DECORATION_SPRITES` in `sprite-manifest.js`:

| File | Type Key | Description |
|------|----------|-------------|
| `assets/platforms/shared/doorway.png` | `doorway` | Room transition doorway |
| `assets/platforms/living/rug.png` | `rug` | Floor rug |

## Music Files

All music is in MIDI format (`.mid`), played via `midi-player-js` and rendered with `soundfont-player` using the MusyngKite soundfont.

| File | Usage | Instruments (overrides) |
|------|-------|------------------------|
| `level1.mid` | Living Room | lead_1_square, synth_bass_2, pad_3_polysynth |
| `level2.mid` | Kitchen | lead_1_square, synth_bass_2, electric_piano_1, synth_drum |
| `level3.mid` | Bathroom | xylophone |
| `level4.mid` | Kids' Room | lead_1_square, orchestral_harp, acoustic_grand_piano, synth_bass_2 |
| `level5.mid` | Parents' Room | acoustic_grand_piano, synth_brass_1, synth_drum |
| `level6.mid` | Terrace | acoustic_grand_piano |
| `boss.mid` | All boss fights | acoustic_guitar_nylon, synth_drum, lead_1_square, synth_bass_2 |

### Track Volume Overrides

Per-file track gains are configured in `AudioManager.trackGains`. These were tuned using the `midi-mixer.html` tool. Each entry maps track numbers to volume multipliers (1.0 = default, >1 = louder, <1 = quieter).

### Instrument Overrides

Per-file instrument overrides are in `AudioManager.instrumentOverrides`. These override the default General MIDI program-to-instrument mapping for specific tracks, allowing fine-grained control over which soundfont instrument plays each MIDI track.

### Soundfont Instruments Loaded

The following soundfont instruments are preloaded on audio init:
- acoustic_grand_piano, electric_piano_1
- electric_bass_finger, slap_bass_1, synth_bass_1, synth_bass_2
- overdriven_guitar, distortion_guitar, acoustic_guitar_nylon
- synth_brass_1, brass_section, trumpet
- lead_1_square, lead_2_sawtooth
- pad_2_warm, pad_3_polysynth
- choir_aahs, string_ensemble_1
- vibraphone, xylophone, orchestral_harp, koto
- synth_drum

## MIDI Mixer Tool

`midi-mixer.html` is a standalone HTML tool for tweaking MIDI playback. It allows:
- Loading any of the game's MIDI files
- Per-track volume adjustment
- Per-track instrument override selection
- Exporting the configuration as JS objects to paste into `audio.js`

## Procedural Rendering Fallback

If any sprite fails to load (or hasn't been created yet), the game gracefully falls back to procedural Canvas 2D rendering. Every renderer checks for a loaded image first, then draws shapes/colors/text if no image exists. This means:

- The game is fully playable with zero image files
- New platform types can be added with just a label and color before any art is created
- The procedural renderers use the level theme color palettes for visual coherence

## Asset Credits & Licensing

All external assets are documented in `assets/CREDITS.md`:

- **Kenney Furniture Kit** (CC0 Public Domain) - Isometric furniture renders
- **2D Furniture Pack by Philipp Nueckel** (CC-BY 4.0) - Side-view furniture
- **Cat & Dog Free Sprites** (CC0) - Cat walk cycle
- **2D Platformer Enemies** (CC0) - Spider and bat spritesheets
- **Animated Birds 32x32** (CC0) - Bird/pigeon sprites
- **Flying Bird Character by Bevouliin** (CC0) - Pigeon frames
- **Wasp Sprite by Spring & Puffolotti** (CC0) - Wasp animation

All music (MIDI) is original to the project.
