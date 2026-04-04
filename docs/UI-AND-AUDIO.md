# UI & Audio

## Menu System (`js/ui/menu.js` + `js/ui/hub-world.js`)

### Menu States

The menu has three states:

#### 1. Title Screen (`state: 'title'`)
- **Background:** Sky blue top half, sandy beige bottom half
- **House facade:** Centered on screen with wheat-colored walls, brown door, two blue windows, triangular brown roof
- **Title:** "TIDY UP!" in bold 56px white with black stroke
- **Subtitle:** "A Family Platformer" in 18px monospace
- **Prompt:** "Press ENTER to start" (blinks on/off at 400ms interval)
- **Controls:** Enter/Space advances to character select

#### 2. Character Select (`state: 'select'`)
- **Background:** Dark blue-grey (#2a2a3a)
- **Header:** "CHOOSE YOUR CHARACTER" in bold 32px
- **Character cards:** 4 cards (140x200px each, 30px gap) showing:
  - Character color swatch (80x100px)
  - Name in bold 18px monospace
  - Role (Dad/Mum/Kid/Kid) in 13px grey
  - Projectile name in 11px colored text
- **Selected card:** Gold (#FFD700) border, lighter background (#444466)
- **Instructions:** Arrow keys to choose, Enter to play, Escape to go back
- **Controls reminder:** Shows all game controls at bottom

#### 3. Hub World (`state: 'hub'`) — rendered by `js/ui/hub-world.js`
- **Background:** Same street scene as title but larger house
- **House:** 6 windows representing rooms (2 rows: 4 upper, 2 lower)
  - Completed rooms: Yellow lit windows with checkmark
  - Incomplete rooms: Dark grey windows
- **Character:** Selected character shown at the door (color swatch + name)
- **Info:** Shows "Next: [Room Name]" or "ALL ROOMS TIDY!" in gold/green
- **Prompt:** "Press ENTER to go inside" (blinking)
- **Controls:** Arrow keys to change character, Enter to start next level

### Navigation Flow
```
Title --[Enter]--> Character Select --[Enter]--> Opening Story (first time)
                                                   |
                                              Level Intro --> Gameplay
                                                   ^
Hub World --[Enter]--> Level Intro ----------------+
  ^                                                |
  +---- Score Screen <---- Boss Defeated ----------+
  +---- Victory Screen <-- Final Boss Defeated
```

## HUD (`js/ui/hud.js`)

Rendered on top of gameplay, unaffected by camera shake.

### Layout
```
+-----------------------------------------------+
| [portrait] ♥♥♥    ===TIDY====    ITEMS         |
| [  name  ]         42%          12 / 24        |
+-----------------------------------------------+
```

### Top Left: Character Portrait + Hearts
- **Portrait:** 36x36 colored square with white border and character name
- **Hearts:** Up to 3 heart shapes (28px each, 4px gap)
  - Full hearts: Red (#FF2222)
  - Empty hearts: Dark grey (#444)
  - Hearts drawn using bezier curves (custom `drawHeart` method)

### Top Center: Tidy Meter
- **Label:** "TIDY" above bar in bold 12px monospace
- **Bar:** 200x20px with dark background
- **Fill:** Gradient from orange (#FF6600) through yellow (#FFCC00) to green (#00CC00)
- **Border:** White 2px stroke
- **Text:** Percentage in bold 13px monospace centered in bar

### Top Right: Item Counter
- **Label:** "ITEMS" in 10px grey monospace
- **Count:** "12 / 24" in bold 14px gold monospace

## Transition Screens (`js/ui/transitions.js` + `js/data/story-data.js`)

Three types of transition screens, all managed by `TransitionManager`. Story text data (OPENING_STORY, LEVEL_INTROS, BOSS_INTROS) is in `js/data/story-data.js`; animation/rendering logic stays in `transitions.js`.

### Opening Story (first play only)

An 8-line dialogue sequence shown before the first level:

1. "The family has just arrived home from a week in Barcelona..."
2. "Steve unlocks the front door. A wave of dust rolls out."
3. Hara: "Dios mio! What happened to our house?!"
4. Steve: "I... may have forgotten to close the windows before we left."
5. Hara: "There are ANTS in the kitchen. MOTHS in the wardrobe..."
6. Derek: "Cool! My toys are everywhere!"
7. Juno: "There's something growing in the fridge..."
8. Hara: "Nobody is sleeping until this house is SPOTLESS. Vamos!"

**Visual Design:**
- Dark background (#0a0a12) with animated stars (20 twinkling points)
- Messy house silhouette: dark house with dirty windows (grime streaks), ajar door with dust clouds coming out, cobwebs on corners
- Dialogue box: Dark semi-transparent box (95% opacity) with rounded corners at bottom 38% of screen
- Speaker tags: Colored rounded rectangles (Hara=pink, Steve=blue, Derek=green, Juno=gold)
- Typewriter text: 40 characters/second, monospace 18px, warm color (#E8E0D0)
- Blinking cursor during typing
- Progress dots at bottom showing current line
- "Press ENTER to continue" prompt after text completes

**Navigation:**
- Enter/Space: Skip to end of current line, or advance to next line
- Skip cooldown: 0.4s initial, 0.15s between lines

### Level Intro

Shown before each level starts.

**3 Phases:**
1. **Room name slide** (0.8s): Title slides in from left with cubic ease-out, displayed on a dark banner
2. **Hara's speech** (typewriter at 45 chars/sec): Speech bubble with white background, pink border (#CC3366), "Hara" speaker tag
3. **Detail text** (fade in): Italic description in darker text, centered

**Visual Design:**
- Background: Room's color palette (wall color top, floor color bottom)
- Subtle diagonal stripe pattern (4% opacity)
- Room name: Bold 48px with text stroke on dark banner
- Speech bubble: White with pink border, rounded corners
- Detail text: 14px monospace, centered, 60% opacity black
- "Press ENTER to start" prompt after all text shown

### Boss Intro

Dramatic boss introduction screen.

**3 Phases:**
1. **Boss name slam** (0.8s): Name scales from 2.5x to 1x with cubic ease-out, glow effect
2. **Story text** (typewriter at 50 chars/sec): Boss backstory in warm grey
3. **Tip appears** (fade in): Gameplay hint in gold text on subtle gold box

**Visual Design:**
- Dark background (#0a0a08) with boss-colored gradient from bottom
- Animated pulsing glow behind boss name (radial gradient, 200-240px radius)
- Boss name: Bold 54px white with colored shadow glow (20px blur)
- Subtitle: Italic 20px in boss glow color (e.g., "— The Dust Devil —")
- Decorative horizontal line (fades in)
- Story text: 16px monospace, warm grey (#C8C0B0), centered with word wrap
- Tip box: Rounded rectangle with gold border and text, light bulb emoji prefix
- "Press ENTER to fight" prompt in boss glow color

**Boss Intro Data:**

| Boss | Subtitle | Glow Color | Tip |
|------|----------|------------|-----|
| MEGA ROOMBA | The Dust Devil | #00FF00 | "Shoot it 3 times to overload its motor!" |
| FRIDGE BEAST | The Forgotten Leftovers | #00FFAA | "Shoot the doors open, then stomp!" |
| WASHING MACHINE | The Spin Cycle of Doom | #4488FF | "Wait for the drain cycle!" |
| TOY BOX TERROR | Playtime Is Over | #FFAA00 | "Shoot into the open lid, or stomp its minions!" |
| WARDROBE MONSTER | Fashion Nightmare | #FF4444 | "Catch it during re-opening!" |
| BBQ DRAGON | The Final Flame | #FF6600 | "Cool its heat counter with your shots!" |

## Score Screen (`js/ui/score-screen.js`)

Shown after defeating a boss.

### Display
- **Overlay:** 75% opacity black over the frozen gameplay
- **Header:** "ROOM TIDIED!" in bold 40px green (#00CC00)
- **Level name:** 20px grey monospace
- **Stars:** 3 stars animated in sequence (0.3s delay each)
  - Earned stars: Gold (#FFD700)
  - Unearned stars: Dark grey (#444)
  - Stars drawn as 5-pointed shapes with white stroke
- **Stats** (after 1.2s):
  - "Items collected: X / Y" in white
  - "Tidiness: Z%" in gold
- **Prompt** (after 1.5s): "Press ENTER to continue" (blinking)

### Star Rating
| Stars | Requirement |
|-------|-------------|
| 1 | Any completion (0%+) |
| 2 | 50%+ items collected |
| 3 | 90%+ items collected |

## Game Over Screen

Simple overlay rendered in `Game.renderGameOver()`:

- **Overlay:** 70% opacity black
- **Title:** "GAME OVER" in bold 48px red (#FF4444)
- **Subtitle:** "The mess wins... this time!" in 18px grey
- **Prompt:** "Press ENTER to try again" in 14px gold (blinking at 400ms)

Player can retry the current level with Enter or Space.

## Victory / Credits Screen (`js/ui/victory-screen.js` + `js/data/credits-data.js`)

Shown after defeating the BBQ Dragon (final boss).

### Visual Design
- Black background with 92% opacity fade-in over 2 seconds
- **Falling mess items:** Emojis rain down continuously (60+ different items: socks, shoes, toys, tools, food, plants, etc.)
  - Spawn every 0.15-0.35s
  - Random size (16-32px), rotation, speed, opacity (0.3-0.6)
  - Fall speed: 40-100 px/s with slight horizontal drift

### Credits Scroll
Begins scrolling 2 seconds after start at 35 px/s.

**Every single role is credited to "Derek Jarvis Payne Pozo"** - over 100 roles across categories:

- **Story & Narrative** (6 roles): Story & Concept, Lead Narrative Designer, Screenplay, Dialogue Writer, Lore Master, World Building Director, Character Backstory Author
- **Game Design** (10 roles): Creative Director, Lead Game Designer, Level Designer, Systems Designer, Combat Designer, Boss Encounter Designer, etc.
- **Art & Visual** (18 roles): Art Director, Character Designer, Environment Artist, VFX Artist, Particle Effects Designer, UI/UX Designer, etc.
- **Animation** (6 roles)
- **Engineering** (19 roles): Lead Engine Programmer, Physics Engineer, Camera Systems Engineer, Boss AI Programmer, etc.
- **Audio & Music** (7 roles)
- **Production** (7 roles)
- **Quality Assurance** (7 roles)
- **Localisation & Cultural** (5 roles): Catalan Cultural Consultant, Barcelona Architecture Advisor, Mediterranean Interior Design Consultant, etc.
- **Marketing & Community** (6 roles)
- **Special Roles** (12 roles): Chief Tidying Officer, Roomba Wrangler, Cola Cao Consultant, Paella Pan Authenticity Inspector, LEGO Brick Scattering Specialist, etc.
- **Infrastructure** (5 roles)
- **Legal & Business** (5 roles)
- **Office & Facilities** (5 roles): Including "Studio Janitor" and "Ergonomic Chair Tester"
- **Special Thanks** (5 roles): Emotional Support, Rubber Duck Debugger, etc.

### Dedication
> Dedicated to the Jarvis-Payne-Pozo family and their beautiful casa de pueblo in Molins de Rei, Barcelona

### Ending
- "THE HOUSE IS TIDY!" in gold
- "...for now." in grey italic
- "Thanks for playing!"
- "Press ENTER to return to menu" (blinking gold)
- Can continue after scrolling completes or after 15 seconds

---

## Audio System (`js/engine/audio.js` + `js/engine/sfx-recipes.js`)

### Architecture

```
AudioContext
  └── masterGain (toggle mute)
        ├── sfxGain (volume: 0.15)
        │     └── SFX oscillators (per-effect)
        └── musicGain (volume: 1.0)
              └── Soundfont instruments (per-track)
```

### Initialization
- AudioContext created on first user interaction (Enter on menu)
- Handles autoplay policy by resuming suspended context
- Preloads 23 soundfont instruments in parallel

### Sound Effects (SFX)

All SFX are synthesized in real-time using Web Audio API oscillators. No audio files needed. SFX recipe functions are in `js/engine/sfx-recipes.js`; `audio.js` dispatches to them via `SFX_RECIPES[name]`.

| SFX | Waveform | Technique | Duration |
|-----|----------|-----------|----------|
| **jump** | Square | Rising frequency sweep 250→600Hz | 150ms |
| **shoot** | Square | Descending sweep 900→200Hz | 120ms |
| **takeDamage** | Sawtooth + LFO | Low tone 150→80Hz with 20Hz wobble | 300ms |
| **giveDamage** | Triangle + Noise | Descending thud 400→80Hz + white noise burst | 150ms |
| **collect** | Square | Ascending arpeggio C5→E5→G5 (3 notes, 60ms apart) | 280ms |
| **bossDefeated** | Triangle | Triumphant fanfare C5→E5→G5→C6 (4 notes, 150ms apart) | 1s |
| **playerDeath** | Sawtooth | Sad descending tone 300→50Hz | 700ms |

### Music System (MIDI)

Music uses MIDI files played through `midi-player-js` with `soundfont-player` rendering instruments:

1. **MIDI Loading:** Files fetched and cached as ArrayBuffers
2. **Playback:** MidiPlayer parses events, routes Note On/Off to soundfont instruments
3. **Channel mapping:** Program Change events tracked per channel; GM program numbers mapped to soundfont instrument names
4. **Channel 9:** Always mapped to synth_drum (GM percussion convention)
5. **Looping:** On end-of-file, restarts after 200ms delay
6. **Per-track overrides:** Volume multipliers and instrument overrides configurable per MIDI file (tuned via midi-mixer.html)

### GM Program to Instrument Mapping

Key mappings from General MIDI program numbers:
- 0-1: acoustic_grand_piano
- 2-5: electric_piano_1
- 10-11: vibraphone
- 24-28: acoustic_guitar_nylon
- 29-30: overdriven/distortion_guitar
- 32-37: bass instruments
- 48-51: string_ensemble_1
- 52-54: choir_aahs
- 56-57: trumpet
- 60-63: brass_section / synth_brass_1
- 80-83: lead_1_square / lead_2_sawtooth
- 88-91: pad_2_warm
- 107: koto
- 118: synth_drum

### Muting
- Press M to toggle mute
- Sets masterGain to 0 (muted) or 1 (unmuted)
- Affects both SFX and music

### Music Transitions
- `playMusic(levelIndex)` - Stops current music, starts level theme
- `playBossMusic()` - Stops current, starts boss.mid
- `stopMusic(fadeOut)` - Stops all active notes, optionally fades musicGain over 500ms

## Lighting System (`js/engine/lighting.js`)

### Per-Level Mood Tints
Applied as overlay blend mode:

| Level | Tint RGB | Alpha |
|-------|----------|-------|
| Living Room | 255, 200, 150 (warm) | 0.06 |
| Kitchen | 255, 240, 200 (bright) | 0.05 |
| Bathroom | 150, 200, 220 (cool) | 0.08 |
| Kids' Room | 255, 230, 180 (warm) | 0.04 |
| Parents' Room | 200, 180, 150 (muted) | 0.07 |
| Terrace | 255, 250, 220 (sunny) | 0.05 |
| Boss (any) | 200, 50, 30 (red) | 0.06 |

### Vignette
Radial gradient in multiply blend mode:
- Normal: White center → grey (180,175,170) at edges, inner radius 40%
- Boss: Tighter vignette, darker edges (140,120,120), inner radius 35%
- Gradients cached for performance

### Light Source Glows
Decoration types `ceiling_light` and `standing_lamp` emit soft screen-blend glows:
- Ceiling lights: 120px radius
- Standing lamps: 80px radius
- Color: warm yellow-orange with 3-stop radial gradient

## Particle Themes (`js/engine/particles.js`)

Each level has 5 particle effect presets:

| Effect | Trigger | Typical Count |
|--------|---------|---------------|
| `jumpDust` | Player jumps | 6 particles |
| `landImpact` | Player lands | 8 particles |
| `enemyHit` | Enemy stomped/killed | 8 particles |
| `collect` | Item collected | 10 particles |
| `obstacleHit` | Hit by obstacle | 4 particles |

Particle colors are themed per level:
- **Living Room:** Earth tones (beige, gold, white)
- **Kitchen:** White and blue-grey tones
- **Bathroom:** Light blue, water-like, bubble-inspired
- **Kids' Room:** Rainbow / multi-colored (pink, blue, green, yellow, purple)
- **Parents' Room:** Muted, elegant tones (cream, grey, soft gold)
- **Terrace:** Nature tones (green, brown, yellow, sunshine)

## CSS Post-Processing Filters

Applied to the canvas element per level for subtle mood enhancement:

```css
.level-living   { filter: saturate(1.05) contrast(1.02); }
.level-kitchen  { filter: saturate(1.08) brightness(1.02) sepia(0.03); }
.level-bathroom { filter: saturate(0.9) brightness(1.05) hue-rotate(-5deg); }
.level-kids     { filter: saturate(1.15) brightness(1.03); }
.level-parents  { filter: saturate(0.95) brightness(0.97) sepia(0.05); }
.level-terrace  { filter: saturate(1.1) brightness(1.08); }
```
