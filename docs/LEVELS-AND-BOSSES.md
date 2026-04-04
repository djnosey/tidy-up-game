# Levels & Bosses

## Level Overview

| # | Name | Width | Screens | Ground Y | Background | Boss |
|---|------|-------|---------|----------|------------|------|
| 1 | Living Room | 3840px | 4 | 520 | Warm beige (#D4C4A8) | Mega Roomba |
| 2 | Kitchen | 4800px | 5 | 520 | Cream (#F0E8D8) | Fridge Beast |
| 3 | Bathroom | 3840px | 4 | 520 | Ice blue (#E8F0F0) | Washing Machine |
| 4 | Kids' Room | 3840px | 4 | 520 | Warm peach (#F5E8D0) | Toy Box Terror |
| 5 | Parents' Room | 3840px | 4 | 520 | Taupe (#E8E0D8) | Wardrobe Monster |
| 6 | Outdoor Terrace | 4800px | 5 | 520 | Sky blue (#87CEEB) | BBQ Dragon |

All levels share the same vertical layout: canvas is 960x600, ground at y=520, leaving 520px of vertical play space above the floor.

---

## Level 1: Living Room

### Story
> "Start with the living room! I can't even see the sofa under all this mess!" - Hara

### Layout (4 screens)
- **Screen 1 (0-960):** Easy intro. Sofa, coffee table, shelves. Simple horizontal platforming with low furniture. Teaches basic movement and collecting.
- **Screen 2 (960-1920):** Ramping up. Bookshelf tower (4 shelves stacked vertically), moving picture frames (3 frames oscillating horizontally at different speeds), TV unit, crumbling cushion.
- **Screen 3 (1920-2880):** Challenge zone. More shelf towers with crumbling shelves at the top, sofa, moving lamp platform, chair, armchair. Timed plug socket obstacle.
- **Screen 4 (2880-3840):** Boss arena. Three shelves for dodging. Doorway transition at x=2870.

### Platforms
- Sofas (wide, low), tables, shelves, bookshelves (stacking for vertical climbs)
- Moving frames (horizontal oscillation at varying speeds 0.8-1.4)
- Crumbling cushions and top shelves (0.5-0.7s delay, 2.5-3.0s respawn)

### Collectables (24 items)
Remote controls, mugs, magazines, glasses, books, socks, coasters, phone, keys, cushions, blankets, headphones + 1 health pickup

### Enemies
- **Roomba** (x2) - 40x30, patrol range 100
- **Dust Bunny** (x2) - 30x20, patrol range 60-80
- **RC Car** (x2) - 35x25, patrol range 80-120

### Obstacles
- Plug sockets (x2, one timed 1.8s on / 1.5s off)
- Candles (x2, one timed 2.0s on / 1.5s off)
- Cables (x2)
- Sharp corner (x1)

### Decorations
Ceiling lights, windows with brown curtains, rugs, family photos, potted plants, standing lamps, wall art, clocks, radiators, wall sockets, power strips, dust motes

---

## Level 2: Kitchen

### Story
> "The kitchen next! Something in the fridge is making noises!" - Hara

### Layout (5 screens)
- **Screen 1 (0-960):** Kitchen entrance. Counter, dining table, stool, shelf, chair. Gentle introduction.
- **Screen 2 (960-1920):** Fridge area. Drawer stepping stones (one crumbling), tall fridge platform, swinging hanging pots (3 pots oscillating), long counter, crumbling stool.
- **Screen 3 (1920-2880):** Upper cabinets. Counter, drawers, shelf towers up to 5 levels high, dining table, stool, chair, another counter.
- **Screen 4 (2880-3840):** Winding path. Drawer/shelf tower with crumbling drawer, swinging hanging pots, long counter, fridge.
- **Screen 5 (3840-4800):** Boss arena. Five shelves spread across arena for dodging tall Fridge Beast.

### Platforms
- Counters (wide, stable), drawers (stepping stones, some crumbling), fridges (tall), stools, chairs
- Hanging pots (3 sets of swinging platforms, horizontal oscillation)
- Crumbling drawers and stools

### Collectables (26 items)
Plates, cups, utensils, sponges, spices, tea towels, pans, pots + 1 health pickup

### Enemies
- **Cockroach** (x3) - 30x15, patrol range 80
- **Blender** (x2) - 30x30, patrol range 60
- **Ants** (x2) - 40x12, patrol range 100

### Obstacles
- Wet floor (x2)
- Plug sockets (x2)
- Knife (x2, one timed 1.5s on / 2.0s off)
- Cable
- Oven (timed 2.5s on / 2.0s off)
- Boiling pot (timed 2.0s on / 1.5s off)

### Decorations
Tiled backsplash, kitchen shelf items (jars, salt, olive oil, teapots), steam wisps, dripping tap

---

## Level 3: Bathroom

### Story
> "Now the bathroom! I'm afraid to look behind the shower curtain..." - Hara

### Layout (4 screens)
- **Screen 1 (0-960):** Bathtub and toilet area. Bathtub, toilet, towel racks for vertical climbing, shower shelf, high shelves. Strong vertical emphasis.
- **Screen 2 (960-1920):** Shower area. Sink, multiple towel racks at increasing heights, shower shelves, highest shelf near ceiling. Full vertical climbing section.
- **Screen 3 (1920-2880):** Laundry area. Laundry basket, moving towel rack (horizontal), static shelves, crumbling shelves, vertically-moving shower shelf (ride it up), high reward platforms.
- **Screen 4 (2880-3840):** Boss arena. Eight shelves at varying heights, with platforms accessible from both left and right sides of the arena for escaping rising water.

### Platforms
- Bathtub (wide, low), toilet, sink
- Towel racks (multiple heights, some moving horizontally)
- Shower shelves (some moving vertically)
- Laundry baskets
- Crumbling shelves (0.5-0.7s delay)

### Collectables (22 items)
Rubber ducks, bath toys, soap, towels, shampoo, toothbrushes + 3 health pickups (one per section)

### Enemies
- **Spider** (x3) - 30x25, patrol range 70-80
- **Rubber Duck** (x2) - 25x25, patrol range 90
- **Mould** (x3) - 35x20, patrol range 40-50 (slow, speed 25)

### Obstacles
- Hot taps (x3, one timed 2.0s on / 1.5s off)
- Wet floor (x3, one timed 1.8s on / 2.0s off)
- Razors
- Hair dryer
- Plug sockets (x2)

### Decorations
Tile patterns (full walls), frosted windows, mirrors, bath mats, toiletries emojis, pipes on walls, water puddles, steam wisps, floating bubbles, drain grate

---

## Level 4: Kids' Room

### Story
> "Derek! Juno! Your room is a WAR ZONE! Fix it — NOW!" - Hara

### Layout (4 screens)
- **Screen 1 (0-960):** Room entrance. Toy chest, desk, moving cushion, shelf, cushion.
- **Screen 2 (960-1920):** Bunk bed section. Board games step, lower bunk, stepping shelf, upper bunk (requires climbing), more board games, moving cushion (vertical), toy chest, moving shelf.
- **Screen 3 (1920-2880):** Pillow forts. Crumbling pillow forts (x2), cushions, moving shelf (vertical), desk, shelf. Tight platforming.
- **Screen 4 (2880-3840):** Boss arena. Three shelves.

### Platforms
- Toy chests, desks, bunk beds (two levels with stepping shelf between)
- Board game platforms, pillow forts (crumbling, 0.6-0.7s delay)
- Moving cushions (horizontal and vertical)
- Moving shelves

### Collectables (25 items)
Teddies, toy cars, pencils, crayons, blocks, action figures, stickers, puzzles + 2 health pickups

### Enemies
- **Toy Soldier** (x3) - 25x30, patrol range 70
- **Bouncing Ball** (x2) - 25x25, patrol range 100
- **RC Helicopter** (x2) - 30x20, patrol range 120

### Obstacles
- LEGO bricks (x4, some timed 1.5-2.0s on / 1.8-2.0s off)
- Plug sockets (x2, some timed)
- Blind cords (x2)
- Sharp corner

### Decorations
Colorful curtains (red/teal, yellow/orange, purple/teal), bright rugs, wall posters, glow-in-dark stars on ceiling, toy emojis, scattered crayons, paper airplanes

---

## Level 5: Parents' Room

### Story
> "Even OUR bedroom is a disaster! How did moths get into the wardrobe?!" - Hara

### Layout (4 screens)
- **Screen 1 (0-960):** Bedroom entrance. Bedside tables, BED (bouncy!), dresser, high shelf. The bed gives super-jumps.
- **Screen 2 (960-1920):** Wardrobe area. Wardrobe (large), moving shelves (horizontal), high shelf tower, laundry basket, chair, moving shelf, dresser, vertically-moving shelf.
- **Screen 3 (1920-2880):** Challenge zone. Bedside table, crumbling shelf sequence (x2), static shelf, laundry basket, chair, dresser with high shelf, wardrobe.
- **Screen 4 (2880-3840):** Boss arena. Shelf, dresser, shelf.

### Special Mechanic: Bed Bounce
When standing on a BED platform and pressing jump, the player gets vy = -900 (vs normal -720). This super-bounce allows reaching otherwise impossible heights.

### Platforms
- Bedside tables, BED (bouncy), dressers, wardrobes (large)
- Laundry baskets, chairs
- Moving shelves (horizontal and vertical)
- Crumbling shelves (0.5-0.6s delay)

### Collectables (25 items)
Phone, glasses, pillows, clothes, books, chargers, slippers, laundry + 1 health pickup

### Enemies
- **Moth** (x3) - 25x20, patrol range 80
- **Alarm Clock** (x2) - 25x25, patrol range 90
- **Laundry Monster** (x2) - 35x30, patrol range 60

### Obstacles
- Plug sockets (x2)
- Cables (x2)
- Iron (x2, timed 2.0s on / 1.5s off)
- Hair straightener (x2, one timed)
- Sharp corner

### Decorations
Elegant pendant lights, deep purple curtains, elegant rugs, standing lamps, family photos, flowers, clocks, radiators, dust bunnies, dust motes

---

## Level 6: Outdoor Terrace

### Story
> "Last room — the terrace! Watch out for that barbecue, Steve left it uncleaned ALL SUMMER!" - Hara

### Layout (5 screens)
- **Screen 1 (0-960):** Terrace entrance. Garden chair, table, plant pot, moving railing (vertical), chair. Lush Mediterranean setting.
- **Screen 2 (960-1920):** Clothesline section. Shelf, clotheslines (some swaying horizontally), railings (one crumbling), plant pots, garden chairs.
- **Screen 3 (1920-2880):** Upper terrace. Plant pots, railings, vertically-moving plant pot, shelf, garden table, crumbling railing, shelf.
- **Screen 4 (2880-3840):** BBQ area. BBQ shelves, railings, garden chairs, moving BBQ shelf, plant pots, garden table. Dense platforming.
- **Screen 5 (3840-4800):** Final boss arena. 7 platforms for reaching tall BBQ Dragon (plant pots, railings, shelves, BBQ shelves).

### Platforms
- Garden chairs, garden tables, plant pots
- Railings (some crumbling, some moving vertically)
- Clotheslines (swaying horizontally)
- BBQ shelves (some moving)

### Collectables (28 items)
Shoes, mugs, books, watering cans, keys, footballs, ropes, garden tools + 3 health pickups

### Enemies
- **Cat** (x3) - 35x25, patrol range 80, speed 40 (has sprite animation)
- **Wasp** (x2) - 25x20, patrol range 100, speed 60
- **Pigeon** (x2) - 30x25, patrol range 120, speed 45

### Obstacles
- Cactus (x3, one timed)
- Wet floor (x2)
- Plug sockets (x2)
- Hot Sun (x2, one timed 3.0s on / 2.0s off)
- BBQ Grill (x2, one timed 2.5s on / 2.0s off)

### Decorations
Sun, clouds, string lights, potted plants everywhere, flowers on railings, bougainvillea climbing walls, olive/lemon trees, hanging baskets, garden umbrellas, tile floors, butterflies, grass tufts, railing along terrace edge, charcoal bags. Boss arena has dark clouds.

---

## Boss Fights

All bosses share a common framework but each has unique mechanics. General rules:
- Boss arena is always the final screen (960px wide)
- Camera locks to the arena when player enters
- Player gets 2 seconds of invincibility on arena entry
- Bosses have 3 health phases (>66%, 33-66%, <33%) that modify attack patterns and timing
- Bosses cycle through attacks in a fixed sequence that changes per phase
- Health pips displayed above boss
- Boss takes damage from stomps (landing on top) — but only when in VULNERABLE or STUNNED state
- Projectiles interact with bosses in boss-specific ways
- When defeated, boss triggers score screen and SFX

### Shared Boss States

| State | Behavior | Stompable? | Damages Player? |
|-------|----------|------------|-----------------|
| ROAMING | Moves toward player at moderate speed | No | Yes |
| CHARGING | Fast horizontal dash, bounces off walls | No | Yes |
| SPINNING | Rotates, bounces off walls, fires spiral projectiles | No | Yes |
| SHOOTING | Stationary, fires aimed projectiles at player | No | Yes |
| VULNERABLE | Wobbles slowly, green pulsing glow, dizzy swirls | **YES** | No |
| STUNNED | Wobbles, stars orbit overhead, briefly invulnerable after stomp | No | No |

---

### Boss 1: Mega Roomba — "The Dust Devil"
**Level:** Living Room | **Health:** 3 | **Size:** 96x50 | **Color:** #555555

#### How to Make Vulnerable
Shoot it **3 times** to overload its motor. A blue meter below health pips shows progress. When full, it enters VULNERABLE state with spark particles.

#### Vulnerability Window
- Phase 1: 2.5 seconds
- Phase 2: 2.2 seconds  
- Phase 3: 1.8 seconds

#### Unique Mechanics
- **Dust Trail:** While roaming or charging, leaves dust patches on the ground every 0.15s that slow the player for 3 seconds
- **Suction Attack:** Stands still and pulls the player toward it (120-160 px/s force depending on phase) for 2 seconds

#### Attack Patterns
- **Phase 1:** charge → shoot → charge → suction
- **Phase 2:** charge → suction → spin → charge → shoot
- **Phase 3:** charge → suction → spin → charge → suction → shoot

#### How to Beat It
1. Shoot it 3 times (watch the blue meter fill up)
2. When it glows green with dizzy swirls, jump on its head
3. Avoid dust trails on the ground (they slow you)
4. During suction, run away or jump over it
5. Use the 3 shelves in the arena for elevation
6. After each stomp, it gets faster (+50 speed)

---

### Boss 2: Fridge Beast — "The Forgotten Leftovers"
**Level:** Kitchen | **Health:** 3 | **Size:** 130x90 | **Color:** #4477AA

#### How to Make Vulnerable
Shoot the fridge **2 times** to force its doors open. When doors are open (green pulsing glow), you can stomp it. Doors also open automatically after a SHOOTING attack.

#### Door Open Window
- Phase 1-2: 2.5 seconds
- Phase 3: 1.8 seconds

#### Unique Mechanics
- **Door Mechanic:** Must open the fridge doors before stomping. Doors indicated by green glow.
- **Freezer Mist (Phase 2+):** During SHOOTING state, emits freezer mist on the ground every 1.5s that slows the player for 3 seconds
- **Food Wave:** After shooting state ends, doors automatically open (window for stomping)

#### Projectile Emojis
🧊 🥬 🍖 🧀 🥚 (random selection)

#### Attack Patterns
- **Phase 1:** charge → shoot → charge → spin
- **Phase 2:** charge → shoot → spin → charge → shoot
- **Phase 3:** charge → shoot → spin → shoot → charge → spin

#### How to Beat It
1. Shoot it twice to open the doors (or wait for it to open after shooting attack)
2. Jump on top when doors are open (green glow visible)
3. In Phase 2+, watch for freezer mist on the ground during shooting phases
4. Use the 5 kitchen shelves in the arena for height
5. Avoid thrown food projectiles (ice cubes, lettuce, meat, cheese, eggs)

---

### Boss 3: Washing Machine — "The Spin Cycle of Doom"
**Level:** Bathroom | **Health:** 3 | **Size:** 120x85 | **Color:** #AAAACC

#### How to Make Vulnerable
Wait for the **drain cycle**. The boss enters a 'draining' state that lowers water, then becomes VULNERABLE.

#### Vulnerability Window
- Phase 1: 2.2 seconds
- Phase 2: 1.8 seconds
- Phase 3: 1.5 seconds
- Shooting the boss during VULNERABLE extends the window by 0.4 seconds per hit

#### Unique Mechanics
- **Rising Water:** Water level constantly rises (8/12/18 px/s per phase, max 120px). Water creates a floor hazard that slows the player.
- **Drain Cycle:** Custom attack where water level drops at 60 px/s, then boss becomes vulnerable
- **Spin Cycle Rings:** During SPINNING, fires expanding rings of 7-10 projectiles with 2 gap openings every 0.8 seconds

#### Projectile Emojis
💧 👕 🧦 👖 💦

#### Attack Patterns
- **Phase 1:** spin → shoot → drain → charge
- **Phase 2:** spin → shoot → spin → drain → charge
- **Phase 3:** spin → charge → spin → shoot → drain → spin

#### How to Beat It
1. Survive until the drain cycle (water drops, boss becomes vulnerable)
2. Jump on top during the green vulnerable window
3. Shoot it during vulnerability to extend the window
4. Use the 8 bathroom shelves (accessible from both sides) to escape rising water
5. During spin cycle, find the gaps in projectile rings
6. Watch the water level — stay above it to avoid slowing

---

### Boss 4: Toy Box Terror — "Playtime Is Over"
**Level:** Kids' Room | **Health:** 3 | **Size:** 100x50 | **Color:** #CD853F

#### How to Make Vulnerable (Two Methods)
1. **Shoot into open lid:** When the lid is open (during snapping or summon), shooting it makes it vulnerable (3.0s window, 2.5s in Phase 3)
2. **Stomp 3 minions quickly:** If you stomp 3 toy minions within 4 seconds, the boss has a tantrum and becomes vulnerable (2.2s window)

#### Unique Mechanics
- **Snapping Lid Attack:** The lid rapidly opens and closes like a mouth for 3 seconds, firing small upward projectile bursts (💥) on each snap. After snapping, the lid stays wide open for 8 seconds — the primary window to shoot into the open lid. This is the most frequent attack in all phases.
- **Toy Summoning:** Opens lid and spawns 1-2 toy minions (🧸, 🪖, 🤖) that patrol the arena. Max 3 minions active. Speed 80-120 depending on phase.
- **Lid Slam:** Opens lid, then slams it shut creating a shockwave projectile (💥) that travels horizontally. In Phase 3, sends shockwaves both directions. Also kills nearby minions.
- **Minion Tracking:** Game tracks how quickly you stomp minions for the tantrum mechanic

#### Projectile Emojis
🧸 🚂 🎲 🪀 🧩

#### Attack Patterns
- **Phase 1:** snapping → charge → snapping → summon
- **Phase 2:** snapping → charge → snapping → summon → shoot
- **Phase 3:** snapping → summon → snapping → charge → snapping → spin

#### How to Beat It
1. Wait for the snapping attack — after 3 seconds of snapping, the lid stays open for 8 seconds
2. Shoot a projectile into the open lid to make it vulnerable, then stomp it
3. OR stomp 3 of its toy minions within 4 seconds for a tantrum stun
4. Avoid the small upward projectile bursts during the snapping phase
5. During lid slam, jump over the shockwave (💥)
6. In Phase 3, shockwaves go both ways — use platforms to dodge
7. Watch for toy minions patrolling — stomp or avoid them

---

### Boss 5: Wardrobe Monster — "Fashion Nightmare"
**Level:** Parents' Room | **Health:** 3 | **Size:** 100x60 | **Color:** #654321

#### How to Make Vulnerable
After its **teleport attack** completes, it becomes vulnerable. In Phase 2+, it double-teleports before becoming vulnerable.

#### Vulnerability Window
- Phase 1-2: 2.0 seconds
- Phase 3: 1.5 seconds
- Shooting it during VULNERABLE extends the window by 0.5s (capped at 2.0s)

#### Unique Mechanics
- **Teleportation:** Fades out, teleports to a random position (must be 150+ pixels from current position), fades back in. In Phase 2+, teleports twice before becoming vulnerable.
- **Darkness Attack:** Screen gradually darkens (0.65-0.85 alpha depending on phase) while the boss fires projectiles at the player every 0.6 seconds. Lasts 3-4 seconds.
- **Teleport Fade:** Render alpha fades during teleport animation

#### Projectile Emojis
👟 👠 👗 🧥 👜

#### Attack Patterns
- **Phase 1:** shoot → charge → teleport → shoot
- **Phase 2:** shoot → charge → teleport → darkness → charge
- **Phase 3:** darkness → charge → teleport → shoot → darkness → teleport

#### How to Beat It
1. Survive its attacks until it teleports
2. After it re-appears post-teleport, it becomes vulnerable (green glow)
3. Quickly jump on its head
4. Shoot it during vulnerability to extend the window
5. During darkness attack, listen for projectile sounds and keep moving
6. In Phase 2+, it teleports twice — be patient, wait for vulnerability

---

### Boss 6: BBQ Dragon — "The Final Flame"
**Level:** Outdoor Terrace | **Health:** 5 | **Size:** 160x80 | **Color:** #8B2500

**This is the final boss — the hardest fight in the game with 5 health and the most complex mechanics.**

#### How to Make Vulnerable
**Cool its heat counter** by shooting it. The heat counter starts at 4/5/6 (Phase 1/2/3). Each shot reduces it by 1 and creates steam particles. When heat reaches 0, it becomes vulnerable and lands on the ground.

#### Vulnerability Window
- Phase 1-2: 2.5 seconds
- Phase 3: 3.0 seconds

#### Unique Mechanics
- **Flight:** Takes off and hovers 80px above ground. While flying, drops fire coals (🔥) every 0.6 seconds that create fire patches on the ground (2.5s damage hazards).
- **Fire Beam:** Fires a 300px-wide beam along the ground in the facing direction. In Phase 3, the beam sweeps back and forth (switches direction every 1.0 seconds).
- **Coal Rain:** Drops rocks (🪨) from above at random positions. Interval 0.4s (Phase 1) or 0.25s (Phase 2+). Rocks create fire patches on landing.
- **Fire Patches:** Coals that hit the ground create 30x10 fire damage hazards lasting 2.5 seconds
- **Heat Counter:** Displayed as a blue meter below health. Needs to be depleted with shots before stomping.

#### Projectile Emojis
🔥 🪨 💨

#### Attack Patterns
- **Phase 1:** charge → shoot → coalrain → charge → flight
- **Phase 2:** flight → shoot → coalrain → charge → firebeam → flight
- **Phase 3:** flight → firebeam → coalrain → charge → flight → shoot → firebeam

#### How to Beat It
1. Shoot it repeatedly to cool its heat counter (watch the blue meter)
2. When heat reaches 0, it lands and becomes vulnerable — stomp it!
3. During flight, dodge falling coals and use the 7 arena platforms for height
4. During fire beam, jump over it or get behind the dragon
5. During coal rain, keep moving — rocks land at random positions and leave fire
6. In Phase 3, the fire beam sweeps — time your jump carefully
7. The arena has many platforms (plant pots, railings, shelves, BBQ shelves) — use them all
8. With 5 health, this is a long fight — conserve your health early
9. Pick up the health pickup on the arena's first platform

---

## General Boss Tips

1. **Patience is key:** Don't try to rush — wait for vulnerability windows
2. **Learn the tells:** Each state change has visual cues (flash, color change, particles)
3. **Use platforms:** Every arena has elevated platforms for dodging ground attacks
4. **Projectiles matter:** Shooting bosses is often the trigger for vulnerability (Roomba, Fridge, BBQ Dragon) or extends vulnerability windows (Washing Machine, Wardrobe)
5. **Invincibility frames:** After getting hit, you have 2.5 seconds of invincibility from boss/hazard hits — use this time aggressively
6. **The boss speeds up:** After each stomp, the boss's base speed increases by 50
7. **Health management:** Collect +HEALTH items in the platforming section before the boss fight
8. **Camera is locked:** You can't scroll out of the boss arena — stay aware of the boundaries
