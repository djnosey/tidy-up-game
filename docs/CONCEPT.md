# Concept & Gameplay

## The Idea

**"Tidy Up! - A Family Platformer"** is a 2D side-scrolling platformer where you play as a member of the Jarvis-Payne-Pozo family. The family has just returned from a week-long holiday in Barcelona to discover their house (a "casa de pueblo" in Molins de Rei) is an absolute disaster - dust everywhere, pests have moved in, and the household appliances have gone rogue.

Your mission: room by room, tidy the house by collecting scattered mess items, avoiding household hazards, defeating pest enemies, and taking down a boss appliance/object in each room.

## Story

The opening cutscene plays as a typewriter-style dialogue sequence:

1. The family arrives home from Barcelona
2. Steve unlocks the door - a wave of dust rolls out
3. Hara (Mum) is horrified: ants in the kitchen, moths in the wardrobe, a pigeon on the terrace
4. Derek thinks it's cool his toys are everywhere
5. Juno notices something growing in the fridge
6. Hara declares: "Nobody is sleeping until this house is SPOTLESS!"

Each level has its own intro where Hara comments on the state of the room, and a boss intro that gives the boss a dramatic name card and a gameplay tip.

## Characters

There are 4 playable characters. Each has a unique color, name, and projectile weapon:

| Character | Role | Color | Projectile | Projectile Color |
|-----------|------|-------|------------|------------------|
| **Steve** | Dad | Blue (#3366CC) | Slipper | Brown (#8B4513) |
| **Hara** | Mum | Pink (#CC3366) | Spoon | Tan (#DEB887) |
| **Derek** | Kid | Green (#33CC66) | Nerf dart | Orange (#FF6600) |
| **Juno** | Kid | Gold (#CC9933) | Crayon | Pink (#FF69B4) |

Characters are functionally identical - the choice is purely cosmetic and affects the player sprite color, name tag, and projectile appearance.

## Player Mechanics

### Movement
- **Walk speed:** 280 pixels/second
- **Facing:** Tracks left/right input for sprite direction

### Jumping
- **Full jump velocity:** -720 (hold S)
- **Short hop velocity:** -430 (tap S and release early)
- **Gravity:** 1800 px/s^2
- **Terminal velocity:** 900 px/s
- **Squash & stretch:** Player squashes on landing (scaleX=1.3, scaleY=0.7) and stretches on jump (scaleX=0.8, scaleY=1.3), lerping back to normal

### Crouching
- Press Down while on ground
- Reduces height to 60% of normal (72px -> ~43px)
- Reduces movement speed to 30% while crouching
- Cannot jump while crouching

### Shooting
- Press D to fire a projectile in the facing direction
- **Cooldown:** 0.5 seconds between shots
- **Projectile speed:** 500 px/s
- **Max range:** 500 pixels from fire point
- Projectiles can kill enemies and interact with bosses

### Health
- **3 hearts** (max health)
- **Invincibility after hit:** 1.5 seconds (default), 2.5 seconds after boss/hazard hits
- Player blinks during invincibility (every 100ms)
- Health pickups ("+HEALTH" collectables) restore 1 heart
- At 0 health, player dies -> Game Over screen

### Special Effects
- **Electrocution:** When hitting a PLUG obstacle, player gets an electrocution effect for 0.8 seconds - yellow flash, skeleton silhouette with bone lines, and lightning bolt emojis around the player
- **Bed bounce:** In the Parents' Room, jumping while on a BED platform gives a super-bounce (vy = -900)

## Collectables

Each level has scattered collectables themed to the room (mugs, books, socks, toys, plates, towels, etc.). Collecting them:
- Increases the item count shown in the HUD
- Fills the "Tidy" percentage meter
- Triggers a collect particle burst and SFX
- Shows a "+1" float-up animation

Special collectables labeled "+HEALTH" restore one heart.

After beating the boss, the score screen shows:
- Items collected / total
- Tidiness percentage
- Stars (1 star for any completion, 2 for 50%+, 3 for 90%+)

## Enemies

Enemies patrol back and forth within a set range. They can be defeated by:
- **Stomping** (landing on them from above) - bounces the player up
- **Shooting** them with a projectile

Enemy types per room:

| Room | Enemies |
|------|---------|
| Living Room | Roomba, Dust Bunny, RC Car |
| Kitchen | Cockroach, Blender, Ants |
| Bathroom | Spider, Rubber Duck, Mould |
| Kids' Room | Toy Soldier, Bouncing Ball, RC Helicopter |
| Parents' Room | Moth, Alarm Clock, Laundry Monster |
| Terrace | Cat, Wasp, Pigeon |

## Obstacles

Static or timed hazards that damage the player on contact:
- **Plug sockets** - Electrical shock + electrocution visual effect
- **Candles** - Fire hazard
- **Cables** - Trip hazard
- **Wet floor** - Slip hazard
- **Sharp objects** (Knives, Razors, LEGOs) - Ouch
- **Hot taps** - Burn hazard
- **Cactus, BBQ Grill, Hot Sun** (terrace)
- **Corners** - Sharp furniture corners
- **Iron, Hair Straightener** (parents' room)

Many obstacles cycle on/off with configurable timers (timerOn, timerOff, timerOffset), requiring the player to time their passage.

## Platform Types

Platforms are themed furniture for each room:
- **Static:** Sofas, tables, shelves, counters, bathtubs, beds, etc.
- **Moving:** Platforms that oscillate horizontally or vertically (e.g., picture frames on wall tracks, hanging pots swinging, cushions, clotheslines)
- **Crumbling:** Stand on them too long and they shake, then collapse. They respawn after a few seconds. (e.g., old cushions, pillow forts, unstable shelves)
- **Bouncy:** The BED platform in Parents' Room gives a super-jump

## Game Flow

1. **Title Screen** - House facade with "TIDY UP!" title, press Enter
2. **Character Select** - Choose Steve/Hara/Derek/Juno with arrow keys
3. **Opening Story** (first time only) - 8-line typewriter dialogue sequence
4. **Level Intro** - Room name slides in, Hara comments on the mess
5. **Platforming Section** - Traverse 3-4 screens of platforms, collect items, avoid hazards
6. **Boss Door** - Reaching the doorway at the end triggers the boss arena
7. **Boss Intro** - Dramatic boss name card with subtitle and gameplay tip
8. **Boss Fight** - Defeat the boss in a locked arena
9. **Score Screen** - Stars awarded based on tidiness percentage
10. **Hub World** - Return to house exterior, windows light up for completed rooms
11. **Repeat** for all 6 rooms
12. **Victory Credits** - After beating BBQ Dragon (final boss), scrolling credits where every role is credited to "Derek Jarvis Payne Pozo", with falling mess emoji items raining down

## Hub World

Between levels, the player returns to a hub screen showing the house exterior:
- 6 windows correspond to the 6 rooms
- Completed rooms have lit windows with a checkmark
- The selected character stands at the door
- Shows which room is next
- Can change character with arrow keys
