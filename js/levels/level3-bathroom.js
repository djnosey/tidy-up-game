// Level 3: Bathroom
// 4 screen widths (~3840px at 960px canvas width)
// Vertical stacking + new laundry area with moving/crumbling platforms

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 4; // 4 screens

export const level3 = {
    name: 'Bathroom',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#E8F0F0',
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 3 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 3,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 3 + 600,
        y: GROUND_Y - 85,
        label: 'WASHING MACHINE',
        color: '#AAAACC',
        width: 120,
        height: 85,
        health: 3,
        speed: 240,
        attacks: ['spin', 'shoot', 'drain', 'charge'],
    },

    // ========== DECORATIONS (non-interactive background) ==========
    decorations: [
        // === ARCHITECTURAL (spans full level) ===
        // Tile pattern along walls
        { x: 0, y: 0, type: 'tiles', w: LEVEL_W, h: GROUND_Y, color: '#D8E8E8' },
        // Skirting / baseboard
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },
        // Tile grout line (decorative horizontal)
        { x: 0, y: GROUND_Y - 200, type: 'dado_rail', w: LEVEL_W },

        // === SECTION 1 (0–960): Bathroom entrance, bathtub, toilet ===
        // Ceiling light
        { x: 300, y: 60, type: 'ceiling_light', size: 40, color: '#FFFDE0' },
        // Window with frosted glass
        { x: 500, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: 480, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        { x: 585, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        // Bath mat / rug
        { x: 200, y: GROUND_Y - 5, type: 'rug', w: 180, h: 8, color: '#7EC8C8' },
        // Mirror above toilet area
        { x: 720, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 60, color: '#C0D8E0' },
        // Toiletries on shelf
        { x: 50, y: GROUND_Y - 40, emoji: '🧴', size: 28 },
        { x: 850, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        // Wall socket
        { x: 900, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        // Tile accent strip
        { x: 0, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },

        // === SECTION 2 (960–1920): Shower area, towel racks, sink ===
        // Ceiling light
        { x: CANVAS_W + 450, y: 55, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        // Shower head (decorative)
        { x: CANVAS_W + 80, y: GROUND_Y - 420, type: 'wall_art', w: 30, h: 20, color: '#B0B0B0' },
        // Mirror above sink
        { x: CANVAS_W + 600, y: GROUND_Y - 370, type: 'wall_art', w: 70, h: 80, color: '#D0E4EC' },
        // Sink basin area (decorative)
        { x: CANVAS_W + 570, y: GROUND_Y - 50, type: 'wall_art', w: 100, h: 40, color: '#E0ECF0' },
        // Bath rug
        { x: CANVAS_W + 350, y: GROUND_Y - 5, type: 'rug', w: 160, h: 8, color: '#A0D0A0' },
        // Toiletries emoji
        { x: CANVAS_W + 200, y: GROUND_Y - 42, emoji: '🧴', size: 26 },
        { x: CANVAS_W + 750, y: GROUND_Y - 280, emoji: '🪞', size: 30 },
        // Wall socket
        { x: CANVAS_W + 680, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        // Tile accent strip
        { x: CANVAS_W, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        // Window
        { x: CANVAS_W + 820, y: GROUND_Y - 400, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W + 805, y: GROUND_Y - 405, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },

        // === SECTION 3 (1920–2880): Laundry area — new platforming section ===
        // Ceiling light
        { x: CANVAS_W * 2 + 480, y: 55, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        // Pipe running up wall
        { x: CANVAS_W * 2 + 50, y: GROUND_Y - 440, type: 'wall_art', w: 12, h: 440, color: '#909898' },
        // Window
        { x: CANVAS_W * 2 + 700, y: GROUND_Y - 380, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W * 2 + 685, y: GROUND_Y - 385, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },
        // Tile accent strip
        { x: CANVAS_W * 2, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        // Water puddles and steam
        { x: CANVAS_W * 2 + 200, y: GROUND_Y - 5, type: 'water_puddle', w: 22, h: 5 },
        { x: CANVAS_W * 2 + 600, y: GROUND_Y - 5, type: 'water_puddle', w: 18, h: 4 },
        { x: CANVAS_W * 2 + 350, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: CANVAS_W * 2 + 800, y: GROUND_Y - 180, type: 'floating_bubbles' },
        // Wall socket
        { x: CANVAS_W * 2 + 880, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        // Detergent bottle
        { x: CANVAS_W * 2 + 100, y: GROUND_Y - 42, emoji: '🧴', size: 28 },
        // Doorway to boss
        { x: CANVAS_W * 3 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SECTION 4 (2880–3840): Boss arena ===
        // Ceiling light
        { x: CANVAS_W * 3 + 480, y: 50, type: 'ceiling_light', size: 50, color: '#FFFDE0' },
        // Laundry area backdrop
        { x: CANVAS_W * 3 + 600, y: GROUND_Y - 100, type: 'wall_art', w: 120, h: 80, color: '#C0C0D8' },
        // Drain grate on floor
        { x: CANVAS_W * 3 + 300, y: GROUND_Y - 5, type: 'rug', w: 60, h: 8, color: '#808890' },
        // Pipe running up wall
        { x: CANVAS_W * 3 + 50, y: GROUND_Y - 440, type: 'wall_art', w: 12, h: 440, color: '#909898' },
        // Wall socket
        { x: CANVAS_W * 3 + 850, y: GROUND_Y - 180, type: 'wall_socket', w: 16, h: 16 },
        // Detergent bottle
        { x: CANVAS_W * 3 + 880, y: GROUND_Y - 42, emoji: '🧴', size: 28 },
        // Tile accent strip
        { x: CANVAS_W * 3, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        // Water puddles, steam, and floating bubbles
        { x: 600, y: GROUND_Y - 5, type: 'water_puddle', w: 25, h: 6 },
        { x: 1400, y: GROUND_Y - 5, type: 'water_puddle', w: 18, h: 4 },
        { x: 800, y: GROUND_Y - 220, type: 'steam_wisps' },
        { x: 1800, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: 1100, y: GROUND_Y - 150, type: 'floating_bubbles' },
        { x: 2100, y: GROUND_Y - 180, type: 'floating_bubbles' },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#B8D0D8' },

        // === SECTION 1 (0–960): Bathtub area, toilet, easy platforming ===
        // Bathtub — wide, low platform
        { x: 160, y: GROUND_Y - 60, width: 220, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Toilet — medium platform beside bathtub
        { x: 680, y: GROUND_Y - 55, width: 70, height: 20, label: 'TOILET', color: '#F0F0F0' },
        // Towel rack above bathtub (first vertical step)
        { x: 200, y: GROUND_Y - 170, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Shelf high above entrance (second vertical step)
        { x: 60, y: GROUND_Y - 290, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shower shelf — high right side of section 1
        { x: 500, y: GROUND_Y - 180, width: 90, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        // Another towel rack — stacked above shower shelf
        { x: 460, y: GROUND_Y - 300, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // High shelf near ceiling
        { x: 740, y: GROUND_Y - 190, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SECTION 2 (960–1920): Shower, towel racks, sink, vertical climbing ===
        // Sink — low platform
        { x: CANVAS_W + 550, y: GROUND_Y - 55, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        // Towel rack — step up from ground
        { x: CANVAS_W + 100, y: GROUND_Y - 100, width: 130, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Shower shelf
        { x: CANVAS_W + 300, y: GROUND_Y - 160, width: 100, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        // Towel rack — mid height
        { x: CANVAS_W + 80, y: GROUND_Y - 240, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Shelf — high left
        { x: CANVAS_W + 260, y: GROUND_Y - 290, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shower shelf — high right
        { x: CANVAS_W + 520, y: GROUND_Y - 220, width: 100, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        // Shelf — highest point in section 2
        { x: CANVAS_W + 140, y: GROUND_Y - 370, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Towel rack — upper right
        { x: CANVAS_W + 700, y: GROUND_Y - 170, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Shelf — high right
        { x: CANVAS_W + 680, y: GROUND_Y - 310, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SECTION 3 (1920–2880): Laundry area — moving & crumbling platforms ===
        // Laundry basket — low, wide platform
        { x: CANVAS_W * 2 + 80, y: GROUND_Y - 65, width: 130, height: 24, label: 'LAUNDRY_BASKET', color: '#C8B898' },
        // Towel rack — moves horizontally (timing challenge)
        { x: CANVAS_W * 2 + 280, y: GROUND_Y - 140, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 100, moveSpeed: 1.2 },
        // Shelf — static stepping stone
        { x: CANVAS_W * 2 + 500, y: GROUND_Y - 100, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — crumbles! Quick, grab the collectable and jump off
        { x: CANVAS_W * 2 + 450, y: GROUND_Y - 220, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Shower shelf — moves vertically (ride it up to high area)
        { x: CANVAS_W * 2 + 680, y: GROUND_Y - 180, width: 90, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0',
          moveY: -80, moveSpeed: 1.0 },
        // Towel rack — high left, static
        { x: CANVAS_W * 2 + 150, y: GROUND_Y - 280, width: 100, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Shelf — high right, crumbles
        { x: CANVAS_W * 2 + 750, y: GROUND_Y - 310, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.5 },
        // Shelf — highest point, reward platform
        { x: CANVAS_W * 2 + 400, y: GROUND_Y - 370, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SECTION 4 (2880–3840): Boss arena with escape shelves ===
        // Shelf — low left
        { x: CANVAS_W * 3 + 60, y: GROUND_Y - 100, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — mid left
        { x: CANVAS_W * 3 + 180, y: GROUND_Y - 170, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — low right (stepping stone from right side)
        { x: CANVAS_W * 3 + 780, y: GROUND_Y - 100, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — mid right
        { x: CANVAS_W * 3 + 600, y: GROUND_Y - 150, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — high left
        { x: CANVAS_W * 3 + 200, y: GROUND_Y - 240, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — high right (reachable from right side platforms)
        { x: CANVAS_W * 3 + 700, y: GROUND_Y - 250, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — high center
        { x: CANVAS_W * 3 + 420, y: GROUND_Y - 340, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf — mid right
        { x: CANVAS_W * 3 + 650, y: GROUND_Y - 180, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // === SECTION 1 ===
        // Ground level / bathtub area
        { x: 180, y: GROUND_Y - 90, label: 'DUCK', color: '#FFE040' },
        { x: 320, y: GROUND_Y - 90, label: 'BATH_TOY', color: '#FF80A0' },
        { x: 700, y: GROUND_Y - 85, label: 'SOAP', color: '#C8E8C0' },
        // On towel rack above bathtub
        { x: 240, y: GROUND_Y - 200, label: 'TOWEL', color: '#F0D8C0' },
        // On shelf high up
        { x: 90, y: GROUND_Y - 318, label: 'SHAMPOO', color: '#80C0E8' },
        // On shower shelf
        { x: 530, y: GROUND_Y - 208, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // High on towel rack
        { x: 500, y: GROUND_Y - 328, label: 'TOWEL', color: '#F0D8C0' },
        // On high shelf
        { x: 760, y: GROUND_Y - 218, label: '+HEALTH', color: '#FF6060' },

        // === SECTION 2 ===
        // Near sink
        { x: CANVAS_W + 590, y: GROUND_Y - 85, label: 'SOAP', color: '#C8E8C0' },
        // On towel rack step
        { x: CANVAS_W + 140, y: GROUND_Y - 128, label: 'TOWEL', color: '#E8C8B0' },
        // On shower shelf
        { x: CANVAS_W + 330, y: GROUND_Y - 188, label: 'SHAMPOO', color: '#80C0E8' },
        // Mid towel rack
        { x: CANVAS_W + 110, y: GROUND_Y - 268, label: 'TOWEL', color: '#F0D8C0' },
        // On shelf
        { x: CANVAS_W + 290, y: GROUND_Y - 318, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On shower shelf right
        { x: CANVAS_W + 550, y: GROUND_Y - 248, label: 'DUCK', color: '#FFE040' },
        // Highest shelf
        { x: CANVAS_W + 160, y: GROUND_Y - 398, label: 'BATH_TOY', color: '#FF80A0' },
        // Upper right towel rack
        { x: CANVAS_W + 740, y: GROUND_Y - 198, label: 'TOWEL', color: '#E8C8B0' },
        // High right shelf
        { x: CANVAS_W + 710, y: GROUND_Y - 338, label: '+HEALTH', color: '#FF6060' },

        // === SECTION 3 (Laundry area) ===
        // On laundry basket
        { x: CANVAS_W * 2 + 120, y: GROUND_Y - 95, label: 'TOWEL', color: '#F0D8C0' },
        // On moving towel rack — requires timing!
        { x: CANVAS_W * 2 + 310, y: GROUND_Y - 168, label: 'SOAP', color: '#C8E8C0' },
        // On crumbling shelf — grab it fast!
        { x: CANVAS_W * 2 + 480, y: GROUND_Y - 248, label: 'DUCK', color: '#FFE040' },
        // On vertical moving shelf — ride it up
        { x: CANVAS_W * 2 + 710, y: GROUND_Y - 208, label: 'SHAMPOO', color: '#80C0E8' },
        // High reward — on highest shelf
        { x: CANVAS_W * 2 + 420, y: GROUND_Y - 398, label: '+HEALTH', color: '#FF6060' },

        // === SECTION 4 (Boss arena) ===
        // On escape shelves
        { x: CANVAS_W * 3 + 110, y: GROUND_Y - 138, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 3 + 230, y: GROUND_Y - 268, label: 'SHAMPOO', color: '#80C0E8' },
        { x: CANVAS_W * 3 + 450, y: GROUND_Y - 368, label: 'DUCK', color: '#FFE040' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // === SECTION 1 ===
        // Hot tap near bathtub
        { x: 350, y: GROUND_Y - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040' },
        // Razor on shelf
        { x: 520, y: GROUND_Y - 210, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0' },

        // === SECTION 2 ===
        // Wet floor by shower
        { x: CANVAS_W + 160, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
        // Hair dryer near sink
        { x: CANVAS_W + 660, y: GROUND_Y - 30, width: 30, height: 28, label: 'HAIR_DRYER', color: '#D0A0D0' },
        // Plug on high shelf
        { x: CANVAS_W + 300, y: GROUND_Y - 318, width: 22, height: 22, label: 'PLUG', color: '#404040' },
        // Hot tap near sink
        { x: CANVAS_W + 570, y: GROUND_Y - 85, width: 28, height: 28, label: 'HOT_TAP', color: '#FF4040' },

        // === SECTION 3 (Laundry area) ===
        // Hot tap — cycles on/off, blocks path near laundry basket
        { x: CANVAS_W * 2 + 220, y: GROUND_Y - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        // Wet floor — timed, near vertical moving shelf
        { x: CANVAS_W * 2 + 600, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.8 },
        // Plug on high shelf
        { x: CANVAS_W * 2 + 770, y: GROUND_Y - 338, width: 22, height: 22, label: 'PLUG', color: '#404040' },

        // === SECTION 4 (Boss arena) ===
        // Wet floor in boss arena
        { x: CANVAS_W * 3 + 400, y: GROUND_Y - 20, width: 70, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // === SECTION 1 ===
        // Spider near toilet
        { x: 750, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },
        // Rubber duck patrolling bathtub
        { x: 220, y: GROUND_Y - 90, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 90, speed: 50 },

        // === SECTION 2 ===
        // Mould near shower
        { x: CANVAS_W + 200, y: GROUND_Y - 30, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 50, speed: 25 },
        // Spider on high shelf
        { x: CANVAS_W + 700, y: GROUND_Y - 340, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },
        // Rubber duck near sink
        { x: CANVAS_W + 500, y: GROUND_Y - 30, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 90, speed: 50 },

        // === SECTION 3 (Laundry area) ===
        // Spider patrolling near laundry basket
        { x: CANVAS_W * 2 + 350, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 80, speed: 40 },
        // Mould on high platform
        { x: CANVAS_W * 2 + 550, y: GROUND_Y - 130, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 40, speed: 25 },

        // === SECTION 4 (Boss arena) ===
        // Mould lurking in boss room
        { x: CANVAS_W * 3 + 300, y: GROUND_Y - 30, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 50, speed: 25 },
    ],
};
