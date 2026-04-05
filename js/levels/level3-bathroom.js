// Level 3: Bathroom
// 11 screen widths (~10560px at 960px canvas width)
// Signature: Heaviest on crumbling platforms (soap bars that dissolve), water theme
// 100 standard collectables + 3 +HEALTH + 1 +LIFE
// ~80 static + ~16 crumbling + ~10 moving platforms

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 11;

export const level3 = {
    name: 'Bathroom',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#E8F0F0',
    playerStart: { x: 100, y: 490 - 72 }, // On first Tier 1 bathtub

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

        // === SCREEN 6 (4800-5760): Challenge - crumbling soap tower ===
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
    // Tier 1 (Floor): y=460-490   Tier 2 (Low): y=360-400
    // Tier 3 (Mid): y=250-300     Tier 4 (High): y=140-200
    // ~80 static, ~16 crumbling (SOAP), ~10 moving = ~106 total
    platforms: [
        // Boss arena ground (solid, full collision)
        { x: CANVAS_W * 10, y: GROUND_Y, width: CANVAS_W, height: 80, label: '', color: '#B8D0D8' },

        // === SCREEN 1 (0-960): TEACH - Bathtub intro ===
        // Pattern: gentle zigzag, wide platforms, easy gaps (~100px)
        // Tier 1 - bathtub island (player spawn)
        { x: 60, y: 490, width: 200, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 1 - toilet stepping stone
        { x: 360, y: 480, width: 80, height: 20, label: 'TOILET', color: '#F0F0F0' },
        // Tier 2 - towel rack above bathtub
        { x: 140, y: 390, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 2 - shelf mid-screen
        { x: 500, y: 380, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 1 - sink near exit
        { x: 680, y: 470, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        // Tier 2 - cabinet right side
        { x: 830, y: 400, width: 100, height: 16, label: 'CABINET', color: '#B0C0C8' },
        // Tier 3 - high shelf for bonus
        { x: 300, y: 280, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 2 (960-1920): TEST - Towel rack zigzag climb ===
        // Pattern: zigzag climb up towel racks
        // Tier 1 - entry bathtub
        { x: 980, y: 480, width: 160, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 2 - towel rack left
        { x: 1020, y: 390, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 2 - towel rack right
        { x: 1240, y: 370, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 3 - towel rack left
        { x: 1060, y: 280, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 3 - towel rack right
        { x: 1300, y: 260, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 4 - shelf at top for reward
        { x: 1100, y: 170, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - transition shelf right
        { x: 1520, y: 380, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 1 - sink near exit
        { x: 1700, y: 470, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        // Crumbling soap 1 (alternative shortcut)
        { x: 1450, y: 280, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },

        // === SCREEN 3 (1920-2880): CRUMBLE SPRINT - Soap bar gauntlet ===
        // Pattern: horizontal gauntlet with heavy crumbling, static alternatives
        // Tier 1 - entry shelf
        { x: 1940, y: 480, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - static shelf
        { x: 2060, y: 390, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - crumbling soap 1
        { x: 2220, y: 380, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        // Tier 2 - crumbling soap 2
        { x: 2380, y: 370, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        // Tier 2 - static shelf (safe landing)
        { x: 2530, y: 390, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - crumbling soap 3
        { x: 2690, y: 380, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 1 - bathtub exit
        { x: 2800, y: 470, width: 120, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 3 - alternate high path
        { x: 2100, y: 270, width: 90, height: 16, label: 'CABINET', color: '#B0C0C8' },
        // Tier 3 - crumbling soap high
        { x: 2320, y: 260, width: 70, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.5 },
        // Tier 3 - static shelf high
        { x: 2520, y: 270, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 4 (2880-3840): REST - Sink rest area ===
        // Pattern: wide comfortable platforms, easy horizontal
        // Tier 1 - sink left
        { x: 2920, y: 470, width: 130, height: 20, label: 'SINK', color: '#E8ECF0' },
        // Tier 1 - bathtub center
        { x: 3140, y: 480, width: 180, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 1 - toilet right
        { x: 3420, y: 475, width: 80, height: 20, label: 'TOILET', color: '#F0F0F0' },
        // Tier 1 - sink right
        { x: 3590, y: 470, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        // Tier 2 - towel rack for mild vertical interest
        { x: 3050, y: 380, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 2 - shelf
        { x: 3350, y: 390, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 1 - exit platform
        { x: 3780, y: 470, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 - bonus cabinet
        { x: 3250, y: 270, width: 100, height: 16, label: 'CABINET', color: '#B0C0C8' },
        // Tier 2 - moving towel rack (gentle, rest area variety)
        { x: 3650, y: 390, width: 100, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 60, moveSpeed: 0.8 },

        // === SCREEN 5 (3840-4800): CHALLENGE - Moving towel gauntlet ===
        // Pattern: moving towel racks at Tier 3, static shelves at Tier 2
        // Tier 1 - entry bathtub
        { x: 3880, y: 480, width: 120, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 2 - static shelf
        { x: 4020, y: 390, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 - moving towel rack 1
        { x: 4150, y: 280, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 80, moveSpeed: 1.0 },
        // Tier 2 - static rest shelf
        { x: 4340, y: 380, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 - moving towel rack 2
        { x: 4450, y: 270, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 100, moveSpeed: 1.2 },
        // Tier 2 - static rest shelf
        { x: 4610, y: 390, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 - moving towel rack 3
        { x: 4720, y: 260, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 90, moveSpeed: 1.4 },
        // Tier 1 - exit bathtub
        { x: 4810, y: 470, width: 120, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 4 - bonus shelf (reachable from moving Tier 3)
        { x: 4400, y: 170, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 6 (4800-5760): CHALLENGE - Crumbling soap tower ===
        // Pattern: vertical tower with lots of crumbling, static alternatives
        // Tier 1 - base bathtub
        { x: 4860, y: 480, width: 130, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 2 - static shelf base
        { x: 5040, y: 390, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - crumbling soap
        { x: 5200, y: 380, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        // Tier 3 - crumbling soap
        { x: 5060, y: 280, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 3 - static shelf
        { x: 5240, y: 270, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 4 - crumbling soap (top of tower, +LIFE here)
        { x: 5100, y: 170, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.5 },
        // Tier 4 - static alternative
        { x: 5280, y: 180, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Side continuation
        // Tier 2 - towel rack
        { x: 5420, y: 380, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 1 - sink exit
        { x: 5600, y: 470, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },

        // === SCREEN 7 (5760-6720): REST -> RISK/REWARD ===
        // Pattern: safe Tier 1/2 path with optional vertical risk/reward
        // Tier 1 - bathtub left
        { x: 5800, y: 480, width: 140, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 1 - toilet
        { x: 6030, y: 475, width: 80, height: 20, label: 'TOILET', color: '#F0F0F0' },
        // Tier 2 - towel rack
        { x: 5880, y: 380, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 1 - sink center
        { x: 6200, y: 470, width: 110, height: 20, label: 'SINK', color: '#E8ECF0' },
        // Tier 1 - bathtub right
        { x: 6400, y: 480, width: 130, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 2 - shelf right
        { x: 6580, y: 390, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Risk/reward vertical path (from Tier 2 towel rack up)
        // Tier 3 - moving shelf (vertical)
        { x: 6100, y: 280, width: 100, height: 14, label: 'SHELF', color: '#C8D8E0',
          moveY: -80, moveSpeed: 1.0 },
        // Tier 4 - high bonus shelf (+HEALTH here)
        { x: 6200, y: 160, width: 100, height: 16, label: 'CABINET', color: '#B0C0C8' },
        // Tier 2 - crumbling soap shortcut
        { x: 6300, y: 380, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },

        // === SCREEN 8 (6720-7680): ESCALATE - Alternating crumble + static climb ===
        // Pattern: zigzag climb with alternating static/crumble
        // Tier 1 - entry shelf
        { x: 6760, y: 480, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - crumbling soap
        { x: 6920, y: 390, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 2 - static shelf (alternative)
        { x: 6790, y: 380, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 - static shelf
        { x: 7050, y: 280, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 - crumbling soap
        { x: 6880, y: 270, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 4 - static shelf
        { x: 7000, y: 180, width: 80, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 4 - crumbling soap
        { x: 7160, y: 170, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.5 },
        // Descent right side
        // Tier 3 - shelf
        { x: 7280, y: 260, width: 90, height: 16, label: 'CABINET', color: '#B0C0C8' },
        // Tier 2 - towel rack
        { x: 7420, y: 380, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 1 - exit bathtub
        { x: 7560, y: 470, width: 100, height: 24, label: 'BATHTUB', color: '#E0E8F0' },

        // === SCREEN 9 (7680-8640): ESCALATE - Moving + crumbling combo ===
        // Pattern: horizontal gauntlet mixing moving and crumbling
        // Tier 1 - entry shelf
        { x: 7720, y: 480, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - moving towel rack
        { x: 7860, y: 380, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 80, moveSpeed: 1.2 },
        // Tier 2 - crumbling soap
        { x: 8060, y: 390, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 2 - static towel rack (safe landing)
        { x: 8200, y: 380, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 3 - moving towel rack
        { x: 8340, y: 270, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 90, moveSpeed: 1.0 },
        // Tier 2 - crumbling soap
        { x: 8520, y: 390, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Tier 1 - exit bathtub
        { x: 8580, y: 470, width: 100, height: 24, label: 'BATHTUB', color: '#E0E8F0' },
        // Tier 3 - upper shelf for bonus items
        { x: 8100, y: 260, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },

        // === SCREEN 10 (8640-9600): GAUNTLET - Pre-boss everything combined ===
        // Pattern: mixed challenge, every mechanic
        // Tier 1 - entry shelf
        { x: 8680, y: 480, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 2 - moving towel rack
        { x: 8820, y: 380, width: 110, height: 14, label: 'TOWEL_RACK', color: '#C0A880',
          moveX: 80, moveSpeed: 1.3 },
        // Tier 2 - crumbling soap
        { x: 9000, y: 390, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Tier 2 - static towel rack
        { x: 9150, y: 370, width: 120, height: 14, label: 'TOWEL_RACK', color: '#C0A880' },
        // Tier 3 - moving shelf
        { x: 9300, y: 270, width: 110, height: 14, label: 'SHELF', color: '#C8D8E0',
          moveX: 70, moveSpeed: 1.4 },
        // Tier 2 - crumbling soap
        { x: 9440, y: 380, width: 80, height: 14, label: 'SHELF', color: '#C8E8C0',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 1 - landing before boss door
        { x: 9520, y: 470, width: 120, height: 16, label: 'SHELF', color: '#A8C0C8' },
        // Tier 3 - high shelf bonus
        { x: 9100, y: 260, width: 90, height: 16, label: 'CABINET', color: '#B0C0C8' },

        // === SCREEN 11 (9600-10560): BOSS ARENA ===
        // Shelves at varying heights for boss fight
        { x: CANVAS_W * 10 + 60, y: 390, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 200, y: 280, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 420, y: 370, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 600, y: 290, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 780, y: 390, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 430, y: 180, width: 100, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 150, y: 470, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
        { x: CANVAS_W * 10 + 700, y: 470, width: 90, height: 16, label: 'SHELF', color: '#A8C0C8' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard + 3 +HEALTH + 1 +LIFE = 104 total
    // Labels: TOWEL, SHAMPOO, TOOTHBRUSH, SOAP, DUCK, BATH_TOY
    collectables: [
        // === SCREEN 1 (0-960): 10 collectables ===
        // On bathtub (T1, y=490)
        { x: 100, y: 490 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 170, y: 490 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        { x: 300, y: 490 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On toilet (T1, y=480)
        { x: 385, y: 480 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On towel rack (T2, y=390)
        { x: 180, y: 390 - 32, label: 'TOWEL', color: '#F0D8C0' },
        // On shelf T2 (y=380)
        { x: 530, y: 380 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On sink (T1, y=470)
        { x: 720, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On cabinet (T2, y=400)
        { x: 860, y: 400 - 32, label: 'DUCK', color: '#FFE040' },
        // On high shelf (T3, y=280)
        { x: 330, y: 280 - 32, label: 'TOWEL', color: '#E8C8B0' },
        { x: 370, y: 280 - 32, label: 'BATH_TOY', color: '#FF80A0' },

        // === SCREEN 2 (960-1920): 10 collectables ===
        // On bathtub (T1, y=480)
        { x: 1110, y: 398, label: 'SOAP', color: '#C8E8C0' },
        // On towel rack ladder (one per rack)
        { x: 1060, y: 390 - 32, label: 'TOWEL', color: '#F0D8C0' },
        { x: 1280, y: 370 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        { x: 1100, y: 280 - 32, label: 'TOWEL', color: '#E8C8B0' },
        { x: 1340, y: 260 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On high shelf (T4, y=170)
        { x: 1130, y: 170 - 32, label: 'DUCK', color: '#FFE040' },
        // On transition shelf (T2, y=380)
        { x: 1550, y: 380 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On sink (T1, y=470)
        { x: 1800, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On crumbling (T3, y=280)
        { x: 1475, y: 280 - 32, label: 'DUCK', color: '#FFE040' },
        // On bathtub
        { x: 1150, y: 480 - 32, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 3 (1920-2880): 10 collectables ===
        // On entry shelf (T1, y=480)
        { x: 1970, y: 480 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On static shelf (T2, y=390)
        { x: 2160, y: 390 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On crumbling soaps (grab fast!)
        { x: 2250, y: 380 - 32, label: 'TOWEL', color: '#F0D8C0' },
        { x: 2410, y: 370 - 32, label: 'DUCK', color: '#FFE040' },
        // On safe landing (T2, y=390)
        { x: 2560, y: 390 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On crumbling soap 3
        { x: 2720, y: 380 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On exit bathtub (T1, y=470)
        { x: 2840, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // High path items
        { x: 2130, y: 270 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        { x: 2345, y: 260 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 2620, y: 270 - 32, label: 'TOWEL', color: '#E8C8B0' },

        // === SCREEN 4 (2880-3840): 10 collectables ===
        // On sink left (T1, y=470)
        { x: 2960, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On bathtub center (T1, y=480)
        { x: 3270, y: 398, label: 'TOWEL', color: '#F0D8C0' },
        { x: 3330, y: 480 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On toilet (T1, y=475)
        { x: 3445, y: 475 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On sink right (T1, y=470)
        { x: 3625, y: 470 - 32, label: 'DUCK', color: '#FFE040' },
        // On towel rack (T2, y=380)
        { x: 3090, y: 380 - 32, label: 'TOWEL', color: '#E8C8B0' },
        // On shelf (T2, y=390)
        { x: 3380, y: 390 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On exit shelf (T1, y=470)
        { x: 3810, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On bonus cabinet (T3, y=270)
        { x: 3280, y: 270 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 3320, y: 270 - 32, label: 'BATH_TOY', color: '#FF80A0' },

        // === SCREEN 5 (3840-4800): 10 collectables ===
        // On entry bathtub (T1, y=480)
        { x: 3920, y: 480 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On static shelf (T2, y=390)
        { x: 4120, y: 390 - 32, label: 'TOWEL', color: '#F0D8C0' },
        // On moving towel rack 1 (T3, y=280)
        { x: 4190, y: 280 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On static rest shelf (T2, y=380)
        { x: 4440, y: 380 - 32, label: 'DUCK', color: '#FFE040' },
        // On moving towel rack 2 (T3, y=270)
        { x: 4490, y: 270 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On static rest shelf (T2, y=390)
        { x: 4640, y: 390 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On moving towel rack 3 (T3, y=260)
        { x: 4760, y: 260 - 32, label: 'TOWEL', color: '#E8C8B0' },
        // On exit bathtub (T1, y=470)
        { x: 4850, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On bonus shelf (T4, y=170)
        { x: 4420, y: 170 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 4460, y: 170 - 32, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 6 (4800-5760): 10 collectables ===
        // On base bathtub (T1, y=480)
        { x: 4900, y: 480 - 32, label: 'TOWEL', color: '#F0D8C0' },
        // On static shelf (T2, y=390)
        { x: 5140, y: 390 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On crumbling soap T2
        { x: 5230, y: 380 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On crumbling soap T3
        { x: 5090, y: 280 - 32, label: 'DUCK', color: '#FFE040' },
        // On static shelf T3
        { x: 5340, y: 270 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On static T4 alternative
        { x: 5310, y: 180 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On towel rack side (T2, y=380)
        { x: 5455, y: 380 - 32, label: 'TOWEL', color: '#E8C8B0' },
        // On sink exit (T1, y=470)
        { x: 5640, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On bathtub
        { x: 4960, y: 480 - 32, label: 'DUCK', color: '#FFE040' },
        // On shelf T2
        { x: 5110, y: 390 - 32, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 7 (5760-6720): 10 collectables ===
        // Safe path items (lower tiers)
        // On bathtub left (T1, y=480)
        { x: 5840, y: 480 - 32, label: 'TOWEL', color: '#F0D8C0' },
        { x: 5900, y: 480 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On toilet (T1, y=475)
        { x: 6055, y: 475 - 32, label: 'DUCK', color: '#FFE040' },
        // On towel rack (T2, y=380)
        { x: 5920, y: 380 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On sink center (T1, y=470)
        { x: 6305, y: 470 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On bathtub right (T1, y=480)
        { x: 6440, y: 480 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On shelf right (T2, y=390)
        { x: 6610, y: 390 - 32, label: 'TOWEL', color: '#E8C8B0' },
        // High path bonus items (risk/reward)
        { x: 6220, y: 160 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 6260, y: 160 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        { x: 6300, y: 160 - 32, label: 'BATH_TOY', color: '#FF80A0' },

        // === SCREEN 8 (6720-7680): 10 collectables ===
        // On alternating platforms (zigzag climb)
        // On entry shelf (T1, y=480)
        { x: 6790, y: 480 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On crumbling T2 (y=390)
        { x: 6950, y: 390 - 32, label: 'TOWEL', color: '#F0D8C0' },
        // On static T3 (y=280)
        { x: 7150, y: 280 - 32, label: 'DUCK', color: '#FFE040' },
        // On crumbling T3 (y=270)
        { x: 6910, y: 270 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On static T4 (y=180)
        { x: 7030, y: 180 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // Descent items
        { x: 7380, y: 260 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        { x: 7455, y: 380 - 32, label: 'TOWEL', color: '#E8C8B0' },
        { x: 7590, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On T4 crumbling
        { x: 7190, y: 170 - 32, label: 'DUCK', color: '#FFE040' },
        // On static T2
        { x: 6820, y: 380 - 32, label: 'BATH_TOY', color: '#FF80A0' },

        // === SCREEN 9 (7680-8640): 10 collectables ===
        // On moving/crumbling platforms
        // On entry shelf (T1, y=480)
        { x: 7750, y: 480 - 32, label: 'DUCK', color: '#FFE040' },
        // On moving towel rack (T2, y=380)
        { x: 7900, y: 380 - 32, label: 'TOWEL', color: '#F0D8C0' },
        // On crumbling soap (T2, y=390)
        { x: 8090, y: 390 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On static towel rack (T2, y=380)
        { x: 8305, y: 380 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On moving towel rack (T3, y=270)
        { x: 8380, y: 270 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On crumbling soap (T2, y=390)
        { x: 8550, y: 390 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On exit bathtub (T1, y=470)
        { x: 8685, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // Upper shelf bonus (T3, y=260)
        { x: 8130, y: 260 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 8170, y: 260 - 32, label: 'TOWEL', color: '#E8C8B0' },
        // On entry
        { x: 7790, y: 480 - 32, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 10 (8640-9600): 10 collectables ===
        // On gauntlet platforms
        // On entry shelf (T1, y=480)
        { x: 8710, y: 480 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On moving towel rack (T2, y=380)
        { x: 8860, y: 380 - 32, label: 'DUCK', color: '#FFE040' },
        // On crumbling soap (T2, y=390)
        { x: 9030, y: 390 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // On static towel rack (T2, y=370)
        { x: 9260, y: 370 - 32, label: 'TOWEL', color: '#F0D8C0' },
        // On moving shelf (T3, y=270)
        { x: 9340, y: 270 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // On crumbling soap (T2, y=380)
        { x: 9470, y: 380 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        // On landing shelf (T1, y=470)
        { x: 9625, y: 470 - 32, label: 'SOAP', color: '#C8E8C0' },
        // On high bonus (T3, y=260)
        { x: 9200, y: 260 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 9170, y: 260 - 32, label: 'TOWEL', color: '#E8C8B0' },
        // On landing
        { x: 9665, y: 470 - 32, label: 'SHAMPOO', color: '#80C0E8' },

        // === SCREEN 11 (9600-10560): 0 standard collectables (boss arena) ===

        // === EXTRA COLLECTABLES (air trails, clusters on platforms, jump paths) ===

        // Screen 1: Air trail between bathtub and shelf
        { x: 350, y: 430 - 32, label: 'SOAP', color: '#C8E8C0' },
        { x: 400, y: 410 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 450, y: 390 - 32, label: 'TOWEL', color: '#F0D8C0' },

        // Screen 2: Cluster on high shelf (T4, y=170) jump path
        { x: 1170, y: 170 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        { x: 1210, y: 170 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // Air arc between towel racks
        { x: 1180, y: 330 - 32, label: 'BATH_TOY', color: '#FF80A0' },

        // Screen 3: Air trail over crumbling soaps
        { x: 2310, y: 340 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        { x: 2470, y: 330 - 32, label: 'SOAP', color: '#C8E8C0' },
        { x: 2630, y: 340 - 32, label: 'DUCK', color: '#FFE040' },

        // Screen 4: Cluster on bonus cabinet (T3, y=270)
        { x: 3240, y: 270 - 32, label: 'TOWEL', color: '#E8C8B0' },
        { x: 3360, y: 270 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        // Air trail between sink and bathtub
        { x: 3040, y: 440 - 32, label: 'SOAP', color: '#C8E8C0' },

        // Screen 5: Air arc between moving towel racks
        { x: 4340, y: 240 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 4580, y: 230 - 32, label: 'SHAMPOO', color: '#80C0E8' },
        // Cluster on bonus shelf (T4, y=170)
        { x: 4500, y: 170 - 32, label: 'BATH_TOY', color: '#FF80A0' },

        // Screen 6: Air trail over crumbling section
        { x: 5160, y: 340 - 32, label: 'TOWEL', color: '#F0D8C0' },
        { x: 5270, y: 330 - 32, label: 'DUCK', color: '#FFE040' },
        // Cluster near T4 alternative
        { x: 5350, y: 180 - 32, label: 'SOAP', color: '#C8E8C0' },

        // Screen 7: Air arc on high path (risk/reward)
        { x: 6180, y: 160 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        { x: 6340, y: 160 - 32, label: 'TOWEL', color: '#E8C8B0' },
        // Lower path cluster between toilet and sink
        { x: 6150, y: 440 - 32, label: 'SHAMPOO', color: '#80C0E8' },

        // Screen 8: Zigzag climb air items
        { x: 6880, y: 340 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 7080, y: 230 - 32, label: 'BATH_TOY', color: '#FF80A0' },
        { x: 7250, y: 220 - 32, label: 'SOAP', color: '#C8E8C0' },

        // Screen 9: Air trail between moving platforms
        { x: 7990, y: 340 - 32, label: 'TOWEL', color: '#F0D8C0' },
        { x: 8440, y: 330 - 32, label: 'SHAMPOO', color: '#80C0E8' },

        // Screen 10: Gauntlet air trail
        { x: 8950, y: 340 - 32, label: 'DUCK', color: '#FFE040' },
        { x: 9100, y: 320 - 32, label: 'TOOTHBRUSH', color: '#60D0A0' },
        { x: 9300, y: 330 - 32, label: 'BATH_TOY', color: '#FF80A0' },

        // === SPECIAL PICKUPS ===
        // +HEALTH in Screen 4 (rest area) - on towel rack (T2, y=380)
        { x: 3110, y: 380 - 32, label: '+HEALTH', color: '#FF6060' },
        // +HEALTH in Screen 7 (high path reward) - on cabinet (T4, y=160)
        { x: 6240, y: 160 - 32, label: '+HEALTH', color: '#FF6060' },
        // +HEALTH in Screen 9 (upper shelf T3, y=260)
        { x: 8150, y: 260 - 32, label: '+HEALTH', color: '#FF6060' },
        // +LIFE at top of crumbling tower in Screen 6 (T4, y=170)
        { x: 5130, y: 170 - 32, label: '+LIFE', color: '#FF1493' },
    ],

    // ========== OBSTACLES ==========
    // All on platform surfaces, not ground
    obstacles: [
        // === SCREEN 1 ===
        // Hot tap on bathtub edge
        { x: 240, y: 490 - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040' },

        // === SCREEN 2 ===
        // Wet floor on bathtub
        { x: 1050, y: 480 - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
        // Hair dryer on sink
        { x: 1720, y: 470 - 28, width: 30, height: 28, label: 'HAIR_DRYER', color: '#D0A0D0' },

        // === SCREEN 3 ===
        // Plug on static shelf (T2, y=390)
        { x: 2080, y: 390 - 22, width: 22, height: 22, label: 'PLUG', color: '#404040' },
        // Razor on high path (T3, y=270)
        { x: 2540, y: 270 - 24, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0' },

        // === SCREEN 4 ===
        // Wet floor on bathtub (mild hazard in rest area)
        { x: 3200, y: 480 - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },

        // === SCREEN 5 ===
        // Timed hot tap on static shelf (T2, y=390)
        { x: 4040, y: 390 - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        // Wet floor on rest shelf (T2, y=380)
        { x: 4360, y: 380 - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },

        // === SCREEN 6 ===
        // Timed razor on T3 static shelf (y=270)
        { x: 5260, y: 270 - 24, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },
        // Plug on T2 shelf (y=390)
        { x: 5060, y: 390 - 22, width: 22, height: 22, label: 'PLUG', color: '#404040',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.3 },

        // === SCREEN 7 ===
        // Wet floor on sink (T1, y=470)
        { x: 6220, y: 470 - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },

        // === SCREEN 8 ===
        // Timed hot tap on static T3 shelf (y=280)
        { x: 7070, y: 280 - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0 },
        // Razor on cabinet (T3, y=260)
        { x: 7300, y: 260 - 24, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.8 },

        // === SCREEN 9 ===
        // Wet floor timed on static towel rack (T2, y=380)
        { x: 8220, y: 380 - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0 },
        // Hot tap timed on exit bathtub (T1, y=470)
        { x: 8600, y: 470 - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },

        // === SCREEN 10 ===
        // Hot tap on static towel rack (T2, y=370)
        { x: 9170, y: 370 - 30, width: 30, height: 30, label: 'HOT_TAP', color: '#FF4040',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0 },
        // Wet floor on landing (T1, y=470)
        { x: 9540, y: 470 - 20, width: 60, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
        // Razor on high bonus (T3, y=260)
        { x: 9120, y: 260 - 24, width: 24, height: 24, label: 'RAZOR', color: '#C0C0C0',
          timerOn: 1.8, timerOff: 1.5, timerOffset: 0.3 },

        // === SCREEN 11 ===
        // Wet floor in boss arena on shelf
        { x: CANVAS_W * 10 + 440, y: 370 - 20, width: 70, height: 20, label: 'WET_FLOOR', color: '#80C8E8' },
    ],

    // ========== ENEMIES ==========
    // All on platforms, not ground
    enemies: [
        // === SCREEN 1 ===
        // Spider on shelf (T2, y=380) - charger rushes at player
        { x: 520, y: 380 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 140, speed: 40, behavior: 'charger' },

        // === SCREEN 2 ===
        // Rubber duck on bathtub (T1, y=480) - jumper hops around
        { x: 1060, y: 480 - 25, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 180, speed: 50, behavior: 'jumper' },
        // Mould on towel rack (T2, y=370) - shooter fires spores
        { x: 1260, y: 370 - 20, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 100, speed: 25, behavior: 'shooter' },

        // === SCREEN 3 ===
        // Spider on static shelf (T2, y=390) - charger
        { x: 2550, y: 390 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 140, speed: 40, behavior: 'charger' },

        // === SCREEN 4 ===
        // Rubber duck on bathtub (T1, y=480) - mild jumper in rest area
        { x: 3200, y: 480 - 25, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 180, speed: 50, behavior: 'jumper' },

        // === SCREEN 5 ===
        // Spider on static rest shelf (T2, y=380) - charger
        { x: 4360, y: 380 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 140, speed: 40, behavior: 'charger' },
        // Mould on shelf (T2, y=390) - shooter
        { x: 4630, y: 390 - 20, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 100, speed: 25, behavior: 'shooter' },

        // === SCREEN 6 ===
        // Spider on T2 static shelf (y=390) - charger
        { x: 5060, y: 390 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 140, speed: 40, behavior: 'charger' },

        // === SCREEN 7 ===
        // Rubber duck on bathtub (T1, y=480) - jumper
        { x: 6420, y: 480 - 25, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 180, speed: 50, behavior: 'jumper' },

        // === SCREEN 8 ===
        // Mould on towel rack (T2, y=380) - shooter
        { x: 7440, y: 380 - 20, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 100, speed: 25, behavior: 'shooter' },
        // Spider on cabinet (T3, y=260) - charger
        { x: 7300, y: 260 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 140, speed: 40, behavior: 'charger' },

        // === SCREEN 9 ===
        // Rubber duck on static towel rack (T2, y=380) - jumper
        { x: 8220, y: 380 - 25, width: 25, height: 25, label: 'RUBBER_DUCK', color: '#FFD030', patrolRange: 180, speed: 50, behavior: 'jumper' },
        // Spider on exit bathtub (T1, y=470) - charger
        { x: 8600, y: 470 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 140, speed: 40, behavior: 'charger' },

        // === SCREEN 10 ===
        // Spider x2 + mould on platforms - gauntlet
        { x: 8840, y: 380 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 140, speed: 40, behavior: 'charger' },
        { x: 9170, y: 370 - 25, width: 30, height: 25, label: 'SPIDER', color: '#3A3A3A', patrolRange: 120, speed: 40, behavior: 'charger' },
        { x: 9460, y: 380 - 20, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 100, speed: 25, behavior: 'shooter' },

        // === SCREEN 11 ===
        // Mould in boss room on shelf - shooter
        { x: CANVAS_W * 10 + 440, y: 370 - 20, width: 35, height: 20, label: 'MOULD', color: '#2A6030', patrolRange: 100, speed: 25, behavior: 'shooter' },
    ],
};
