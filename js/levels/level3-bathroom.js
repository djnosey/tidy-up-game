// Level 3: Bathroom
// 11 screen widths (~10560px at 960px canvas width)
// Signature: Heavy VERTICAL platforming, narrow towel racks, water theme
// Difficulty: 15% easy, 40% moderate, 45% challenging

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 11;

export const level3 = {
    name: 'Bathroom',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#E8F0F0',
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 10 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 10,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 10 + 600,
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

        // === SCREEN 1 (0-960): Bathtub intro ===
        { x: 300, y: 60, type: 'ceiling_light', size: 40, color: '#FFFDE0' },
        { x: 500, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: 480, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        { x: 585, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        { x: 200, y: GROUND_Y - 5, type: 'rug', w: 180, h: 8, color: '#7EC8C8' },
        { x: 720, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 60, color: '#C0D8E0' },
        { x: 50, y: GROUND_Y - 40, emoji: '🧴', size: 28 },
        { x: 850, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 900, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: 0, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },

        // === SCREEN 2 (960-1920): Towel rack ladder ===
        { x: CANVAS_W + 450, y: 55, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        { x: CANVAS_W + 80, y: GROUND_Y - 420, type: 'wall_art', w: 30, h: 20, color: '#B0B0B0' },
        { x: CANVAS_W + 600, y: GROUND_Y - 370, type: 'wall_art', w: 70, h: 80, color: '#D0E4EC' },
        { x: CANVAS_W + 350, y: GROUND_Y - 5, type: 'rug', w: 160, h: 8, color: '#A0D0A0' },
        { x: CANVAS_W + 200, y: GROUND_Y - 42, emoji: '🧴', size: 26 },
        { x: CANVAS_W + 750, y: GROUND_Y - 280, emoji: '🪞', size: 30 },
        { x: CANVAS_W + 680, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W + 820, y: GROUND_Y - 400, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W + 805, y: GROUND_Y - 405, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },

        // === SCREEN 3 (1920-2880): Vertical climb - shower shelf climb ===
        { x: CANVAS_W * 2 + 480, y: 55, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        { x: CANVAS_W * 2 + 50, y: GROUND_Y - 440, type: 'wall_art', w: 12, h: 440, color: '#909898' },
        { x: CANVAS_W * 2 + 700, y: GROUND_Y - 380, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W * 2 + 685, y: GROUND_Y - 385, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },
        { x: CANVAS_W * 2, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 2 + 200, y: GROUND_Y - 5, type: 'water_puddle', w: 22, h: 5 },
        { x: CANVAS_W * 2 + 350, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: CANVAS_W * 2 + 880, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W * 2 + 100, y: GROUND_Y - 42, emoji: '🧴', size: 28 },

        // === SCREEN 4 (2880-3840): Rest - sink rest area ===
        { x: CANVAS_W * 3 + 300, y: 60, type: 'ceiling_light', size: 44, color: '#FFFDE0' },
        { x: CANVAS_W * 3 + 500, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: CANVAS_W * 3 + 480, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        { x: CANVAS_W * 3 + 585, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        { x: CANVAS_W * 3 + 200, y: GROUND_Y - 5, type: 'rug', w: 200, h: 8, color: '#7EC8C8' },
        { x: CANVAS_W * 3 + 800, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 60, color: '#C0D8E0' },
        { x: CANVAS_W * 3, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 3 + 850, y: GROUND_Y - 42, emoji: '🧴', size: 26 },
        { x: CANVAS_W * 3 + 100, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W * 3 + 600, y: GROUND_Y - 5, type: 'water_puddle', w: 18, h: 4 },

        // === SCREEN 5 (3840-4800): Challenge - moving towel gauntlet ===
        { x: CANVAS_W * 4 + 450, y: 55, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        { x: CANVAS_W * 4 + 200, y: GROUND_Y - 400, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W * 4 + 185, y: GROUND_Y - 405, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },
        { x: CANVAS_W * 4, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 4 + 350, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: CANVAS_W * 4 + 800, y: GROUND_Y - 180, type: 'floating_bubbles' },
        { x: CANVAS_W * 4 + 700, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W * 4 + 500, y: GROUND_Y - 5, type: 'water_puddle', w: 20, h: 5 },

        // === SCREEN 6 (4800-5760): Challenge - crumbling shelf tower ===
        { x: CANVAS_W * 5 + 480, y: 55, type: 'ceiling_light', size: 44, color: '#FFFDE0' },
        { x: CANVAS_W * 5 + 700, y: GROUND_Y - 380, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W * 5 + 685, y: GROUND_Y - 385, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },
        { x: CANVAS_W * 5, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 5 + 200, y: GROUND_Y - 5, type: 'water_puddle', w: 24, h: 5 },
        { x: CANVAS_W * 5 + 400, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: CANVAS_W * 5 + 100, y: GROUND_Y - 42, emoji: '🧴', size: 26 },
        { x: CANVAS_W * 5 + 850, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },

        // === SCREEN 7 (5760-6720): Rest / risk-reward - laundry basket section ===
        { x: CANVAS_W * 6 + 300, y: 60, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        { x: CANVAS_W * 6 + 500, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: CANVAS_W * 6 + 480, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        { x: CANVAS_W * 6 + 585, y: GROUND_Y - 385, type: 'curtain', w: 25, h: 220, color: '#C8DFE8' },
        { x: CANVAS_W * 6 + 100, y: GROUND_Y - 5, type: 'rug', w: 180, h: 8, color: '#A0D0A0' },
        { x: CANVAS_W * 6, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 6 + 800, y: GROUND_Y - 280, emoji: '🪞', size: 30 },
        { x: CANVAS_W * 6 + 700, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W * 6 + 400, y: GROUND_Y - 5, type: 'water_puddle', w: 20, h: 5 },

        // === SCREEN 8 (6720-7680): Escalate - pipe climb + crumble ===
        { x: CANVAS_W * 7 + 450, y: 55, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        { x: CANVAS_W * 7 + 50, y: GROUND_Y - 440, type: 'wall_art', w: 12, h: 440, color: '#909898' },
        { x: CANVAS_W * 7 + 820, y: GROUND_Y - 400, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W * 7 + 805, y: GROUND_Y - 405, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },
        { x: CANVAS_W * 7, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 7 + 300, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: CANVAS_W * 7 + 600, y: GROUND_Y - 180, type: 'floating_bubbles' },
        { x: CANVAS_W * 7 + 880, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W * 7 + 200, y: GROUND_Y - 5, type: 'water_puddle', w: 22, h: 5 },
        { x: CANVAS_W * 7 + 700, y: GROUND_Y - 5, type: 'water_puddle', w: 18, h: 4 },

        // === SCREEN 9 (7680-8640): Escalate - moving + crumbling ===
        { x: CANVAS_W * 8 + 480, y: 55, type: 'ceiling_light', size: 42, color: '#FFFDE0' },
        { x: CANVAS_W * 8 + 200, y: GROUND_Y - 380, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W * 8 + 185, y: GROUND_Y - 385, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },
        { x: CANVAS_W * 8, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 8 + 500, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: CANVAS_W * 8 + 800, y: GROUND_Y - 150, type: 'floating_bubbles' },
        { x: CANVAS_W * 8 + 100, y: GROUND_Y - 42, emoji: '🧴', size: 28 },
        { x: CANVAS_W * 8 + 700, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W * 8 + 400, y: GROUND_Y - 5, type: 'water_puddle', w: 24, h: 5 },

        // === SCREEN 10 (8640-9600): Gauntlet - pre-boss ===
        { x: CANVAS_W * 9 + 450, y: 55, type: 'ceiling_light', size: 44, color: '#FFFDE0' },
        { x: CANVAS_W * 9 + 700, y: GROUND_Y - 380, type: 'window', w: 70, h: 60 },
        { x: CANVAS_W * 9 + 685, y: GROUND_Y - 385, type: 'curtain', w: 22, h: 200, color: '#C8DFE8' },
        { x: CANVAS_W * 9, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },
        { x: CANVAS_W * 9 + 300, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: CANVAS_W * 9 + 600, y: GROUND_Y - 180, type: 'floating_bubbles' },
        { x: CANVAS_W * 9 + 200, y: GROUND_Y - 5, type: 'water_puddle', w: 22, h: 5 },
        { x: CANVAS_W * 9 + 500, y: GROUND_Y - 5, type: 'water_puddle', w: 18, h: 4 },
        { x: CANVAS_W * 9 + 800, y: GROUND_Y - 5, type: 'water_puddle', w: 20, h: 5 },
        { x: CANVAS_W * 9 + 880, y: GROUND_Y - 160, type: 'wall_socket', w: 16, h: 16 },
        // Doorway to boss
        { x: CANVAS_W * 10 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SCREEN 11 (9600-10560): Boss arena ===
        { x: CANVAS_W * 10 + 480, y: 50, type: 'ceiling_light', size: 50, color: '#FFFDE0' },
        { x: CANVAS_W * 10 + 600, y: GROUND_Y - 100, type: 'wall_art', w: 120, h: 80, color: '#C0C0D8' },
        { x: CANVAS_W * 10 + 300, y: GROUND_Y - 5, type: 'rug', w: 60, h: 8, color: '#808890' },
        { x: CANVAS_W * 10 + 50, y: GROUND_Y - 440, type: 'wall_art', w: 12, h: 440, color: '#909898' },
        { x: CANVAS_W * 10 + 850, y: GROUND_Y - 180, type: 'wall_socket', w: 16, h: 16 },
        { x: CANVAS_W * 10 + 880, y: GROUND_Y - 42, emoji: '🧴', size: 28 },
        { x: CANVAS_W * 10, y: GROUND_Y - 300, type: 'tiles', w: CANVAS_W, h: 12, color: '#A0C8D0' },

        // === AMBIENT (scattered across level) ===
        { x: 600, y: GROUND_Y - 5, type: 'water_puddle', w: 25, h: 6 },
        { x: 1400, y: GROUND_Y - 5, type: 'water_puddle', w: 18, h: 4 },
        { x: 800, y: GROUND_Y - 220, type: 'steam_wisps' },
        { x: 1800, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: 3400, y: GROUND_Y - 180, type: 'steam_wisps' },
        { x: 5200, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: 1100, y: GROUND_Y - 150, type: 'floating_bubbles' },
        { x: 2600, y: GROUND_Y - 180, type: 'floating_bubbles' },
        { x: 4200, y: GROUND_Y - 160, type: 'floating_bubbles' },
        { x: 6200, y: GROUND_Y - 170, type: 'floating_bubbles' },
        { x: 8200, y: GROUND_Y - 190, type: 'floating_bubbles' },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#B8D0D8' },

        // === SCREEN 1 (0-960): TEACH - Bathtub intro ===
        // Bathtub - wide, low platform for easy intro
        { x: 160, y: GROUND_Y - 60, width: 220, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Toilet - small platform to the right
        { x: 600, y: GROUND_Y - 55, width: 70, height: 20, label: 'TOILET', color: '#F0F0F0' },
        // Towel rack - first vertical step above bathtub
        { x: 250, y: GROUND_Y - 170, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Shelf - higher up left side
        { x: 80, y: GROUND_Y - 280, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shower shelf - mid-height right side
        { x: 500, y: GROUND_Y - 160, width: 100, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        // Shelf near exit
        { x: 780, y: GROUND_Y - 100, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 2 (960-1920): TEST - Towel rack ladder ===
        // Sink at ground level
        { x: CANVAS_W + 600, y: GROUND_Y - 55, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        // 4 towel racks stacking up in zigzag: left, right, left, right
        { x: CANVAS_W + 100, y: GROUND_Y - 100, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        { x: CANVAS_W + 350, y: GROUND_Y - 170, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        { x: CANVAS_W + 120, y: GROUND_Y - 240, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        { x: CANVAS_W + 380, y: GROUND_Y - 310, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Shelf at top for reward
        { x: CANVAS_W + 150, y: GROUND_Y - 380, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf right side mid-height for transition
        { x: CANVAS_W + 750, y: GROUND_Y - 140, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 3 (1920-2880): VERTICAL CLIMB - Shower shelf climb ===
        // Ground level entry shelf
        { x: CANVAS_W * 2 + 80, y: GROUND_Y - 60, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Zigzag climb up to y~150
        { x: CANVAS_W * 2 + 280, y: GROUND_Y - 130, width: 100, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        { x: CANVAS_W * 2 + 100, y: GROUND_Y - 210, width: 90, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        { x: CANVAS_W * 2 + 340, y: GROUND_Y - 280, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 2 + 140, y: GROUND_Y - 340, width: 90, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        { x: CANVAS_W * 2 + 380, y: GROUND_Y - 390, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Shelf to the right for descent / continuation
        { x: CANVAS_W * 2 + 600, y: GROUND_Y - 280, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 2 + 780, y: GROUND_Y - 160, width: 100, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },

        // === SCREEN 4 (2880-3840): REST - Sink rest area ===
        // Low, comfortable platforms - easy horizontal progression
        { x: CANVAS_W * 3 + 60, y: GROUND_Y - 55, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        { x: CANVAS_W * 3 + 250, y: GROUND_Y - 65, width: 130, height: 24, label: 'LAUNDRY_BASKET', color: '#C8B898' },
        { x: CANVAS_W * 3 + 480, y: GROUND_Y - 55, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 3 + 680, y: GROUND_Y - 60, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        // One slightly raised platform for mild interest
        { x: CANVAS_W * 3 + 350, y: GROUND_Y - 140, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        { x: CANVAS_W * 3 + 860, y: GROUND_Y - 55, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 5 (3840-4800): CHALLENGE - Moving towel gauntlet ===
        // Static landing zone at start
        { x: CANVAS_W * 4 + 40, y: GROUND_Y - 80, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Moving towel rack 1
        { x: CANVAS_W * 4 + 200, y: GROUND_Y - 160, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 80, moveSpeed: 1.0 },
        // Static rest shelf
        { x: CANVAS_W * 4 + 450, y: GROUND_Y - 100, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Moving towel rack 2
        { x: CANVAS_W * 4 + 540, y: GROUND_Y - 200, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 100, moveSpeed: 1.2 },
        // Static rest shelf
        { x: CANVAS_W * 4 + 700, y: GROUND_Y - 120, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Moving towel rack 3
        { x: CANVAS_W * 4 + 780, y: GROUND_Y - 240, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 90, moveSpeed: 1.4 },
        // Landing shelf at end
        { x: CANVAS_W * 4 + 860, y: GROUND_Y - 60, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 6 (4800-5760): CHALLENGE - Crumbling shelf tower ===
        // 5-tier tower: bottom 2 static, top 3 crumble
        // Tier 1 (static) - base
        { x: CANVAS_W * 5 + 300, y: GROUND_Y - 80, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 (static)
        { x: CANVAS_W * 5 + 450, y: GROUND_Y - 170, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 (crumble)
        { x: CANVAS_W * 5 + 280, y: GROUND_Y - 260, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        // Tier 4 (crumble)
        { x: CANVAS_W * 5 + 460, y: GROUND_Y - 320, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 5 (crumble) - top of tower, +LIFE here
        { x: CANVAS_W * 5 + 320, y: GROUND_Y - 390, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.5 },
        // Side platforms for continuation rightward
        { x: CANVAS_W * 5 + 650, y: GROUND_Y - 140, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        { x: CANVAS_W * 5 + 830, y: GROUND_Y - 60, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Ground level laundry basket
        { x: CANVAS_W * 5 + 80, y: GROUND_Y - 65, width: 130, height: 24, label: 'LAUNDRY_BASKET', color: '#C8B898' },

        // === SCREEN 7 (5760-6720): REST -> RISK/REWARD - Laundry basket section ===
        // Safe ground path
        { x: CANVAS_W * 6 + 60, y: GROUND_Y - 65, width: 130, height: 24, label: 'LAUNDRY_BASKET', color: '#C8B898' },
        { x: CANVAS_W * 6 + 280, y: GROUND_Y - 80, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        { x: CANVAS_W * 6 + 500, y: GROUND_Y - 55, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        { x: CANVAS_W * 6 + 720, y: GROUND_Y - 65, width: 130, height: 24, label: 'LAUNDRY_BASKET', color: '#C8B898' },
        // Vertical moving shower shelf for high path (risk/reward)
        { x: CANVAS_W * 6 + 350, y: GROUND_Y - 180, width: 100, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0',
          moveY: -80, moveSpeed: 1.0 },
        // High platform with bonus items + health
        { x: CANVAS_W * 6 + 550, y: GROUND_Y - 300, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Exit shelf
        { x: CANVAS_W * 6 + 860, y: GROUND_Y - 55, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 8 (6720-7680): ESCALATE - Pipe climb + crumble ===
        // Alternating static and crumbling narrow shelves
        // Static 1
        { x: CANVAS_W * 7 + 80, y: GROUND_Y - 80, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Crumble 1
        { x: CANVAS_W * 7 + 260, y: GROUND_Y - 160, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Static 2
        { x: CANVAS_W * 7 + 100, y: GROUND_Y - 240, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Crumble 2
        { x: CANVAS_W * 7 + 300, y: GROUND_Y - 310, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Static 3
        { x: CANVAS_W * 7 + 120, y: GROUND_Y - 380, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Crumble 3
        { x: CANVAS_W * 7 + 340, y: GROUND_Y - 420, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.5 },
        // Descent platforms on right side
        { x: CANVAS_W * 7 + 550, y: GROUND_Y - 300, width: 90, height: 14, label: 'SHOWER_SHELF', color: '#C8D8E0' },
        { x: CANVAS_W * 7 + 720, y: GROUND_Y - 180, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        { x: CANVAS_W * 7 + 850, y: GROUND_Y - 70, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 9 (7680-8640): ESCALATE - Moving + crumbling ===
        // Moving towel rack leading to crumbling shelves
        { x: CANVAS_W * 8 + 60, y: GROUND_Y - 100, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 80, moveSpeed: 1.2 },
        // Crumbling shelf 1 (180px gap manageable)
        { x: CANVAS_W * 8 + 320, y: GROUND_Y - 160, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Static towel rack
        { x: CANVAS_W * 8 + 500, y: GROUND_Y - 100, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Moving towel rack 2
        { x: CANVAS_W * 8 + 620, y: GROUND_Y - 200, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 90, moveSpeed: 1.0 },
        // Crumbling shelf 2
        { x: CANVAS_W * 8 + 820, y: GROUND_Y - 140, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Upper shelf for items
        { x: CANVAS_W * 8 + 350, y: GROUND_Y - 300, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 10 (8640-9600): GAUNTLET - Pre-boss ===
        // Everything combined: moving, crumbling, tight gaps
        // Moving towel rack
        { x: CANVAS_W * 9 + 60, y: GROUND_Y - 120, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 80, moveSpeed: 1.3 },
        // Crumbling shelf
        { x: CANVAS_W * 9 + 250, y: GROUND_Y - 200, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Static towel rack
        { x: CANVAS_W * 9 + 400, y: GROUND_Y - 130, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Moving towel rack
        { x: CANVAS_W * 9 + 550, y: GROUND_Y - 220, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 70, moveSpeed: 1.4 },
        // Crumbling shelf
        { x: CANVAS_W * 9 + 700, y: GROUND_Y - 150, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Landing shelf before boss door
        { x: CANVAS_W * 9 + 830, y: GROUND_Y - 60, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 11 (9600-10560): BOSS ARENA ===
        // 8 shelves at varying heights for the boss fight
        { x: CANVAS_W * 10 + 60, y: GROUND_Y - 100, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 180, y: GROUND_Y - 170, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 780, y: GROUND_Y - 100, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 600, y: GROUND_Y - 150, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 200, y: GROUND_Y - 240, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 700, y: GROUND_Y - 250, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 420, y: GROUND_Y - 340, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 450, y: GROUND_Y - 120, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // === SCREEN 1 (0-960): 10 collectables ===
        // Ground level / bathtub area
        { x: 180, y: GROUND_Y - 90, label: 'DUCK', color: '#FFE040' },
        { x: 280, y: GROUND_Y - 90, label: 'BATH_TOY', color: '#FF80A0' },
        { x: 350, y: GROUND_Y - 90, label: 'SOAP', color: '#C8E8C0' },
        { x: 620, y: GROUND_Y - 85, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On towel rack
        { x: 290, y: GROUND_Y - 200, label: 'TOWEL', color: '#F0D8C0' },
        // On shelf high up
        { x: 110, y: GROUND_Y - 310, label: 'SHAMPOO', color: '#80C0E8' },
        // On shower shelf
        { x: 530, y: GROUND_Y - 190, label: 'SOAP', color: '#C8E8C0' },
        // On shelf near exit
        { x: 800, y: GROUND_Y - 130, label: 'DUCK', color: '#FFE040' },
        // Ground collectables
        { x: 450, y: GROUND_Y - 30, label: 'BATH_TOY', color: '#FF80A0' },
        { x: 700, y: GROUND_Y - 30, label: 'TOWEL', color: '#E8C8B0' },

        // === SCREEN 2 (960-1920): 10 collectables ===
        // Near sink
        { x: CANVAS_W + 630, y: GROUND_Y - 85, label: 'SOAP', color: '#C8E8C0' },
        // On towel rack ladder (one per rack)
        { x: CANVAS_W + 140, y: GROUND_Y - 130, label: 'TOWEL', color: '#F0D8C0' },
        { x: CANVAS_W + 390, y: GROUND_Y - 200, label: 'SHAMPOO', color: '#80C0E8' },
        { x: CANVAS_W + 155, y: GROUND_Y - 270, label: 'TOWEL', color: '#E8C8B0' },
        { x: CANVAS_W + 420, y: GROUND_Y - 340, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On high shelf at top
        { x: CANVAS_W + 175, y: GROUND_Y - 410, label: 'DUCK', color: '#FFE040' },
        // Right side shelf
        { x: CANVAS_W + 775, y: GROUND_Y - 170, label: 'BATH_TOY', color: '#FF80A0' },
        // Ground level
        { x: CANVAS_W + 450, y: GROUND_Y - 30, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W + 550, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W + 850, y: GROUND_Y - 30, label: 'TOWEL', color: '#F0D8C0' },

        // === SCREEN 3 (1920-2880): 10 collectables ===
        // On entry shelf
        { x: CANVAS_W * 2 + 110, y: GROUND_Y - 90, label: 'SHAMPOO', color: '#80C0E8' },
        // Zigzag climb items (one per platform)
        { x: CANVAS_W * 2 + 310, y: GROUND_Y - 160, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 2 + 125, y: GROUND_Y - 240, label: 'TOWEL', color: '#F0D8C0' },
        { x: CANVAS_W * 2 + 370, y: GROUND_Y - 310, label: 'TOOTHBRUSH', color: '#60D0A0' },
        { x: CANVAS_W * 2 + 165, y: GROUND_Y - 370, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 2 + 410, y: GROUND_Y - 420, label: 'BATH_TOY', color: '#FF80A0' },
        // Descent items
        { x: CANVAS_W * 2 + 625, y: GROUND_Y - 310, label: 'SHAMPOO', color: '#80C0E8' },
        { x: CANVAS_W * 2 + 810, y: GROUND_Y - 190, label: 'TOWEL', color: '#E8C8B0' },
        // Ground level
        { x: CANVAS_W * 2 + 500, y: GROUND_Y - 30, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 2 + 700, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },

        // === SCREEN 4 (2880-3840): 10 collectables ===
        // On sink
        { x: CANVAS_W * 3 + 95, y: GROUND_Y - 85, label: 'SOAP', color: '#C8E8C0' },
        // On laundry basket
        { x: CANVAS_W * 3 + 290, y: GROUND_Y - 95, label: 'TOWEL', color: '#F0D8C0' },
        // On shelf
        { x: CANVAS_W * 3 + 510, y: GROUND_Y - 85, label: 'SHAMPOO', color: '#80C0E8' },
        // On right sink
        { x: CANVAS_W * 3 + 715, y: GROUND_Y - 90, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On towel rack
        { x: CANVAS_W * 3 + 390, y: GROUND_Y - 170, label: 'TOWEL', color: '#E8C8B0' },
        // On exit shelf
        { x: CANVAS_W * 3 + 885, y: GROUND_Y - 85, label: 'BATH_TOY', color: '#FF80A0' },
        // Ground level
        { x: CANVAS_W * 3 + 150, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 3 + 430, y: GROUND_Y - 30, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 3 + 600, y: GROUND_Y - 30, label: 'BATH_TOY', color: '#FF80A0' },
        { x: CANVAS_W * 3 + 800, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },

        // === SCREEN 5 (3840-4800): 10 collectables ===
        // On starting shelf
        { x: CANVAS_W * 4 + 70, y: GROUND_Y - 110, label: 'SOAP', color: '#C8E8C0' },
        // On/near moving towel rack 1
        { x: CANVAS_W * 4 + 240, y: GROUND_Y - 190, label: 'TOWEL', color: '#F0D8C0' },
        // On rest shelf 1
        { x: CANVAS_W * 4 + 475, y: GROUND_Y - 130, label: 'SHAMPOO', color: '#80C0E8' },
        // On/near moving towel rack 2
        { x: CANVAS_W * 4 + 575, y: GROUND_Y - 230, label: 'DUCK', color: '#FFE040' },
        // On rest shelf 2
        { x: CANVAS_W * 4 + 725, y: GROUND_Y - 150, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On/near moving towel rack 3
        { x: CANVAS_W * 4 + 820, y: GROUND_Y - 270, label: 'BATH_TOY', color: '#FF80A0' },
        // Landing shelf
        { x: CANVAS_W * 4 + 885, y: GROUND_Y - 90, label: 'TOWEL', color: '#E8C8B0' },
        // Ground level
        { x: CANVAS_W * 4 + 150, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 4 + 400, y: GROUND_Y - 30, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 4 + 650, y: GROUND_Y - 30, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 6 (4800-5760): 10 collectables ===
        // On laundry basket
        { x: CANVAS_W * 5 + 120, y: GROUND_Y - 95, label: 'TOWEL', color: '#F0D8C0' },
        // On tower tier 1
        { x: CANVAS_W * 5 + 330, y: GROUND_Y - 110, label: 'SOAP', color: '#C8E8C0' },
        // On tower tier 2
        { x: CANVAS_W * 5 + 480, y: GROUND_Y - 200, label: 'SHAMPOO', color: '#80C0E8' },
        // On crumbling tier 3 (grab fast!)
        { x: CANVAS_W * 5 + 305, y: GROUND_Y - 290, label: 'DUCK', color: '#FFE040' },
        // On crumbling tier 4
        { x: CANVAS_W * 5 + 485, y: GROUND_Y - 350, label: 'BATH_TOY', color: '#FF80A0' },
        // On towel rack side
        { x: CANVAS_W * 5 + 685, y: GROUND_Y - 170, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On exit shelf
        { x: CANVAS_W * 5 + 855, y: GROUND_Y - 90, label: 'TOWEL', color: '#E8C8B0' },
        // Ground
        { x: CANVAS_W * 5 + 550, y: GROUND_Y - 30, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 5 + 750, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 5 + 160, y: GROUND_Y - 95, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 7 (5760-6720): 10 collectables ===
        // Safe ground path (5 items)
        { x: CANVAS_W * 6 + 100, y: GROUND_Y - 95, label: 'TOWEL', color: '#F0D8C0' },
        { x: CANVAS_W * 6 + 320, y: GROUND_Y - 110, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 6 + 530, y: GROUND_Y - 85, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 6 + 755, y: GROUND_Y - 95, label: 'SHAMPOO', color: '#80C0E8' },
        { x: CANVAS_W * 6 + 885, y: GROUND_Y - 85, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // High path bonus items (5 items, risk/reward)
        { x: CANVAS_W * 6 + 380, y: GROUND_Y - 210, label: 'BATH_TOY', color: '#FF80A0' },
        { x: CANVAS_W * 6 + 540, y: GROUND_Y - 330, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 6 + 580, y: GROUND_Y - 330, label: 'TOWEL', color: '#E8C8B0' },
        { x: CANVAS_W * 6 + 620, y: GROUND_Y - 330, label: 'SHAMPOO', color: '#80C0E8' },
        // Ground
        { x: CANVAS_W * 6 + 450, y: GROUND_Y - 30, label: 'BATH_TOY', color: '#FF80A0' },

        // === SCREEN 8 (6720-7680): 10 collectables ===
        // On alternating platforms
        { x: CANVAS_W * 7 + 105, y: GROUND_Y - 110, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 7 + 285, y: GROUND_Y - 190, label: 'TOWEL', color: '#F0D8C0' },
        { x: CANVAS_W * 7 + 125, y: GROUND_Y - 270, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 7 + 325, y: GROUND_Y - 340, label: 'SHAMPOO', color: '#80C0E8' },
        { x: CANVAS_W * 7 + 145, y: GROUND_Y - 410, label: 'BATH_TOY', color: '#FF80A0' },
        // Descent items
        { x: CANVAS_W * 7 + 575, y: GROUND_Y - 330, label: 'TOOTHBRUSH', color: '#60D0A0' },
        { x: CANVAS_W * 7 + 750, y: GROUND_Y - 210, label: 'TOWEL', color: '#E8C8B0' },
        { x: CANVAS_W * 7 + 875, y: GROUND_Y - 100, label: 'SOAP', color: '#C8E8C0' },
        // Ground
        { x: CANVAS_W * 7 + 450, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 7 + 650, y: GROUND_Y - 30, label: 'BATH_TOY', color: '#FF80A0' },

        // === SCREEN 9 (7680-8640): 10 collectables ===
        // On moving/crumbling platforms
        { x: CANVAS_W * 8 + 100, y: GROUND_Y - 130, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 8 + 345, y: GROUND_Y - 190, label: 'TOWEL', color: '#F0D8C0' },
        { x: CANVAS_W * 8 + 535, y: GROUND_Y - 130, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 8 + 660, y: GROUND_Y - 230, label: 'SHAMPOO', color: '#80C0E8' },
        { x: CANVAS_W * 8 + 845, y: GROUND_Y - 170, label: 'BATH_TOY', color: '#FF80A0' },
        // Upper shelf
        { x: CANVAS_W * 8 + 375, y: GROUND_Y - 330, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // Ground
        { x: CANVAS_W * 8 + 200, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 8 + 700, y: GROUND_Y - 30, label: 'TOWEL', color: '#E8C8B0' },
        { x: CANVAS_W * 8 + 450, y: GROUND_Y - 30, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 8 + 900, y: GROUND_Y - 30, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 10 (8640-9600): 10 collectables ===
        // On gauntlet platforms
        { x: CANVAS_W * 9 + 100, y: GROUND_Y - 150, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 9 + 275, y: GROUND_Y - 230, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 9 + 440, y: GROUND_Y - 160, label: 'SHAMPOO', color: '#80C0E8' },
        { x: CANVAS_W * 9 + 590, y: GROUND_Y - 250, label: 'TOWEL', color: '#F0D8C0' },
        { x: CANVAS_W * 9 + 725, y: GROUND_Y - 180, label: 'TOOTHBRUSH', color: '#60D0A0' },
        { x: CANVAS_W * 9 + 855, y: GROUND_Y - 90, label: 'BATH_TOY', color: '#FF80A0' },
        // Ground level
        { x: CANVAS_W * 9 + 300, y: GROUND_Y - 30, label: 'TOWEL', color: '#E8C8B0' },
        { x: CANVAS_W * 9 + 500, y: GROUND_Y - 30, label: 'DUCK', color: '#FFE040' },
        { x: CANVAS_W * 9 + 650, y: GROUND_Y - 30, label: 'SOAP', color: '#C8E8C0' },
        { x: CANVAS_W * 9 + 800, y: GROUND_Y - 30, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 11 (9600-10560): 0 standard collectables (boss arena) ===

        // === SPECIAL PICKUPS ===
        // +HEALTH in Screen 4 (rest area) - on towel rack
        { x: CANVAS_W * 3 + 370, y: GROUND_Y - 170, label: '+HEALTH', color: '#FF6060' },
        // +HEALTH in Screen 7 (high path reward)
        { x: CANVAS_W * 6 + 560, y: GROUND_Y - 330, label: '+HEALTH', color: '#FF6060' },
        // +HEALTH in Screen 9 (escalate)
        { x: CANVAS_W * 8 + 395, y: GROUND_Y - 330, label: '+HEALTH', color: '#FF6060' },
        // +LIFE at the very top of crumbling tower in Screen 6 (y~130)
        { x: CANVAS_W * 5 + 345, y: GROUND_Y - 420, label: '+LIFE', color: '#FF1493' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // === SCREEN 1 ===
        // Hot tap near bathtub
        { x: 400, y: GROUND_Y - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040' },

        // === SCREEN 2 ===
        // Wet floor by entrance
        { x: CANVAS_W + 300, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
        // Hair dryer near sink
        { x: CANVAS_W + 720, y: GROUND_Y - 30, width: 30, height: 28, label: 'HAIR_DRYER', color: '#D0A0D0' },

        // === SCREEN 3 ===
        // Plug on mid-height shelf
        { x: CANVAS_W * 2 + 355, y: GROUND_Y - 308, width: 22, height: 22, label: 'PLUG', color: '#404040' },
        // Razor near top
        { x: CANVAS_W * 2 + 395, y: GROUND_Y - 418, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0' },

        // === SCREEN 4 ===
        // Wet floor in rest area (mild hazard)
        { x: CANVAS_W * 3 + 550, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },

        // === SCREEN 5 ===
        // Timed hot tap (cycles on/off)
        { x: CANVAS_W * 4 + 350, y: GROUND_Y - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        // Wet floor between moving racks
        { x: CANVAS_W * 4 + 600, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },

        // === SCREEN 6 ===
        // Timed razor on crumbling tower
        { x: CANVAS_W * 5 + 465, y: GROUND_Y - 348, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },
        // Plug near base
        { x: CANVAS_W * 5 + 200, y: GROUND_Y - 30, width: 22, height: 22, label: 'PLUG', color: '#404040',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.3 },

        // === SCREEN 7 ===
        // Wet floor on safe path
        { x: CANVAS_W * 6 + 400, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },

        // === SCREEN 8 ===
        // Timed hot tap near pipe
        { x: CANVAS_W * 7 + 200, y: GROUND_Y - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0 },
        // Razor on upper platform
        { x: CANVAS_W * 7 + 555, y: GROUND_Y - 328, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.8 },

        // === SCREEN 9 ===
        // Wet floor timed
        { x: CANVAS_W * 8 + 400, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0 },
        // Hot tap timed
        { x: CANVAS_W * 8 + 750, y: GROUND_Y - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },

        // === SCREEN 10 ===
        // Hot tap
        { x: CANVAS_W * 9 + 150, y: GROUND_Y - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0 },
        // Wet floor
        { x: CANVAS_W * 9 + 350, y: GROUND_Y - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
        // Razor
        { x: CANVAS_W * 9 + 600, y: GROUND_Y - 248, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0',
          timerOn: 1.8, timerOff: 1.5, timerOffset: 0.3 },

        // === SCREEN 11 ===
        // Wet floor in boss arena
        { x: CANVAS_W * 10 + 400, y: GROUND_Y - 20, width: 70, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // === SCREEN 1 ===
        // Spider near toilet
        { x: 650, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },

        // === SCREEN 2 ===
        // Rubber duck patrolling ground
        { x: CANVAS_W + 500, y: GROUND_Y - 30, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 90, speed: 50 },
        // Mould on ground
        { x: CANVAS_W + 250, y: GROUND_Y - 30, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 50, speed: 25 },

        // === SCREEN 3 ===
        // Spider on mid-level platform
        { x: CANVAS_W * 2 + 300, y: GROUND_Y - 160, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },

        // === SCREEN 4 ===
        // Rubber duck (mild threat in rest area)
        { x: CANVAS_W * 3 + 400, y: GROUND_Y - 30, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 90, speed: 50 },

        // === SCREEN 5 ===
        // Spider between moving platforms
        { x: CANVAS_W * 4 + 300, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },
        // Mould
        { x: CANVAS_W * 4 + 550, y: GROUND_Y - 30, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 50, speed: 25 },

        // === SCREEN 6 ===
        // Spider near tower base
        { x: CANVAS_W * 5 + 400, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },

        // === SCREEN 7 ===
        // Rubber duck on safe path
        { x: CANVAS_W * 6 + 600, y: GROUND_Y - 30, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 90, speed: 50 },

        // === SCREEN 8 ===
        // Mould near pipes
        { x: CANVAS_W * 7 + 400, y: GROUND_Y - 30, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 50, speed: 25 },
        // Spider at height
        { x: CANVAS_W * 7 + 560, y: GROUND_Y - 330, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },

        // === SCREEN 9 ===
        // Rubber duck
        { x: CANVAS_W * 8 + 450, y: GROUND_Y - 30, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 90, speed: 50 },
        // Spider
        { x: CANVAS_W * 8 + 800, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },

        // === SCREEN 10 ===
        // Spider x2 + mould
        { x: CANVAS_W * 9 + 200, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },
        { x: CANVAS_W * 9 + 500, y: GROUND_Y - 30, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 70, speed: 40 },
        { x: CANVAS_W * 9 + 700, y: GROUND_Y - 30, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 50, speed: 25 },

        // === SCREEN 11 ===
        // Boss room - mould lurking
        { x: CANVAS_W * 10 + 300, y: GROUND_Y - 30, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 50, speed: 25 },
    ],
};
