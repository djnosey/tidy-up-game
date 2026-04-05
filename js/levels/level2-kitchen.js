// Level 2: Kitchen (redesigned)
// 12 screen widths (11,520px at 960px canvas width)

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 12;

export const level2 = {
    name: 'Kitchen',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#F0E8D8',
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 11 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 11,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 11 + 600,
        y: GROUND_Y - 90,
        label: 'FRIDGE BEAST',
        color: '#4477AA',
        width: 130,
        height: 90,
        health: 3,
        speed: 240,
        attacks: ['charge', 'shoot', 'charge', 'spin'],
    },

    // ========== DECORATIONS (non-interactive background) ==========
    decorations: [
        // === ARCHITECTURAL (spans full level) ===
        { x: 0, y: 8, type: 'cornice', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 250, type: 'dado_rail', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },

        // === SCREEN 1 (0-960): Counter intro ===
        { x: 350, y: 75, type: 'ceiling_light', size: 48, color: '#FFF8E0' },
        { x: 50, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },
        { x: 520, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 500, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 618, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 300, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#6B8E23' },
        { x: 40, y: GROUND_Y - 340, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 110, y: GROUND_Y - 320, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        { x: 20, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        { x: 700, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#E8D8C0' },
        { x: 870, y: GROUND_Y - 360, emoji: '🕰️', size: 28 },
        { x: 515, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 420, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 800, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 150, y: GROUND_Y - 180, type: 'wall_art', w: 240, h: 60, color: '#D0D8E0' },
        { x: 720, y: GROUND_Y - 280, type: 'wall_shelf_deco', w: 60, items: ['🫙', '🧂', '🫒'] },

        // === SCREEN 2 (960-1920): Stool stepping stones ===
        { x: 1400, y: 70, type: 'ceiling_light', size: 50, color: '#FFF8E0' },
        { x: 1200, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 1182, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 1293, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 1500, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#8B4513' },
        { x: 980, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 38, color: '#E8D8C0' },
        { x: 1350, y: GROUND_Y - 340, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 1395, y: GROUND_Y - 360, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 1800, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 960, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        { x: 1195, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 1880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 1100, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 1700, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 55, items: ['🍶', '🫖', '🪴'] },
        { x: 1050, y: GROUND_Y - 180, type: 'wall_art', w: 200, h: 50, color: '#D0D8E0' },
        { x: 1600, y: GROUND_Y - 200, type: 'steam_wisps' },

        // === SCREEN 3 (1920-2880): Fridge tower vertical climb ===
        { x: 2400, y: 68, type: 'ceiling_light', size: 45, color: '#FFF8E0' },
        { x: 2350, y: GROUND_Y - 385, type: 'window', w: 90, h: 80 },
        { x: 2332, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 2448, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 2550, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#6B8E23' },
        { x: 1960, y: GROUND_Y - 400, type: 'wall_art', w: 52, h: 40, color: '#E8D8C0' },
        { x: 2650, y: GROUND_Y - 340, type: 'wall_art', w: 46, h: 36, color: '#B8860B' },
        { x: 2150, y: GROUND_Y - 375, type: 'family_photo', w: 32, h: 26, color: '#B8860B' },
        { x: 2820, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },
        { x: 2860, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 1930, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        { x: 2345, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 2050, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2780, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2100, y: GROUND_Y - 160, type: 'wall_art', w: 220, h: 55, color: '#D0D8E0' },
        { x: 2700, y: GROUND_Y - 290, type: 'wall_shelf_deco', w: 50, items: ['🥫', '🫙', '🍯'] },

        // === SCREEN 4 (2880-3840): Hanging pot chain ===
        { x: 3350, y: 65, type: 'ceiling_light', size: 52, color: '#FFF8E0' },
        { x: 3100, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 3082, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 3193, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 3400, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#8B4513' },
        { x: 2920, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#B8860B' },
        { x: 3600, y: GROUND_Y - 360, type: 'wall_art', w: 48, h: 38, color: '#E8D8C0' },
        { x: 3250, y: GROUND_Y - 370, type: 'family_photo', w: 34, h: 28, color: '#B8860B' },
        { x: 3300, y: GROUND_Y - 390, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 2900, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 3800, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 3095, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 3000, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3750, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3500, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 55, items: ['🫙', '🍶', '🕯️'] },
        { x: 3780, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },
        { x: 3200, y: GROUND_Y - 200, type: 'steam_wisps' },

        // === SCREEN 5 (3840-4800): REST - Counter straightaway ===
        { x: 4300, y: 60, type: 'ceiling_light', size: 58, color: '#FFF8E0' },
        { x: 4150, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 4132, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 4248, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 4400, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#6B8E23' },
        { x: 3880, y: GROUND_Y - 340, type: 'wall_art', w: 55, h: 42, color: '#E8D8C0' },
        { x: 4600, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 4050, y: GROUND_Y - 370, type: 'family_photo', w: 34, h: 28, color: '#B8860B' },
        { x: 4100, y: GROUND_Y - 390, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 3850, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        { x: 4760, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 4145, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 3950, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4700, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4500, y: GROUND_Y - 280, type: 'wall_shelf_deco', w: 60, items: ['🫖', '🧂', '🫒'] },
        { x: 4650, y: GROUND_Y - 200, type: 'dripping_tap' },

        // === SCREEN 6 (4800-5760): Crumbling drawer sequence ===
        { x: 5280, y: 70, type: 'ceiling_light', size: 48, color: '#FFF8E0' },
        { x: 5100, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 5082, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 5193, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 5350, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#8B4513' },
        { x: 4830, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 38, color: '#B8860B' },
        { x: 5500, y: GROUND_Y - 340, type: 'wall_art', w: 52, h: 40, color: '#E8D8C0' },
        { x: 5200, y: GROUND_Y - 375, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        { x: 5250, y: GROUND_Y - 395, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 4810, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 5720, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 5095, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 4900, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 5650, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 5600, y: GROUND_Y - 290, type: 'wall_shelf_deco', w: 55, items: ['🍯', '🥫', '🪴'] },
        { x: 5000, y: GROUND_Y - 200, type: 'steam_wisps' },

        // === SCREEN 7 (5760-6720): Upper cabinet climb ===
        { x: 6200, y: 65, type: 'ceiling_light', size: 50, color: '#FFF8E0' },
        { x: 6050, y: GROUND_Y - 385, type: 'window', w: 90, h: 80 },
        { x: 6032, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 6148, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 6300, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#6B8E23' },
        { x: 5800, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#E8D8C0' },
        { x: 6500, y: GROUND_Y - 360, type: 'wall_art', w: 46, h: 36, color: '#B8860B' },
        { x: 6400, y: GROUND_Y - 375, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 5770, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 6700, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 6045, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 5850, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 6650, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 6600, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 55, items: ['🫙', '🍶', '🧂'] },
        { x: 6680, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },

        // === SCREEN 8 (6720-7680): Dual-path kitchen ===
        { x: 7150, y: 68, type: 'ceiling_light', size: 48, color: '#FFF8E0' },
        { x: 7000, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 6982, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 7093, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 7200, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#8B4513' },
        { x: 6750, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 38, color: '#E8D8C0' },
        { x: 7450, y: GROUND_Y - 340, type: 'wall_art', w: 52, h: 40, color: '#B8860B' },
        { x: 7300, y: GROUND_Y - 370, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        { x: 7350, y: GROUND_Y - 390, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 6730, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 7640, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 6995, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 6800, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 7600, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 7500, y: GROUND_Y - 290, type: 'wall_shelf_deco', w: 55, items: ['🫒', '🫖', '🪴'] },
        { x: 7100, y: GROUND_Y - 200, type: 'dripping_tap' },

        // === SCREEN 9 (7680-8640): Pot + crumble combo ===
        { x: 8100, y: 65, type: 'ceiling_light', size: 50, color: '#FFF8E0' },
        { x: 7950, y: GROUND_Y - 385, type: 'window', w: 90, h: 80 },
        { x: 7932, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 8048, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 8200, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#6B8E23' },
        { x: 7710, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#B8860B' },
        { x: 8450, y: GROUND_Y - 360, type: 'wall_art', w: 48, h: 38, color: '#E8D8C0' },
        { x: 8300, y: GROUND_Y - 375, type: 'family_photo', w: 32, h: 26, color: '#B8860B' },
        { x: 7700, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 8600, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 7945, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 7800, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 8550, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 8400, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 55, items: ['🥫', '🍯', '🫙'] },
        { x: 8000, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: 8580, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },

        // === SCREEN 10 (8640-9600): Speed run crumbles ===
        { x: 9100, y: 70, type: 'ceiling_light', size: 48, color: '#FFF8E0' },
        { x: 8950, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 8932, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 9043, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 9200, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#8B4513' },
        { x: 8670, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 38, color: '#E8D8C0' },
        { x: 9400, y: GROUND_Y - 340, type: 'wall_art', w: 50, h: 40, color: '#B8860B' },
        { x: 9050, y: GROUND_Y - 375, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 9100, y: GROUND_Y - 395, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 8650, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 9580, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 8945, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 8750, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 9500, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 9350, y: GROUND_Y - 290, type: 'wall_shelf_deco', w: 55, items: ['🫙', '🧂', '🍶'] },
        { x: 8800, y: GROUND_Y - 200, type: 'steam_wisps' },

        // === SCREEN 11 (9600-10560): Gauntlet pre-boss ===
        { x: 10050, y: 65, type: 'ceiling_light', size: 52, color: '#FFF8E0' },
        { x: 9900, y: GROUND_Y - 385, type: 'window', w: 90, h: 80 },
        { x: 9882, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 9998, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 10100, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#6B8E23' },
        { x: 9630, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#E8D8C0' },
        { x: 10350, y: GROUND_Y - 360, type: 'wall_art', w: 48, h: 38, color: '#B8860B' },
        { x: 10200, y: GROUND_Y - 375, type: 'family_photo', w: 34, h: 28, color: '#B8860B' },
        { x: 10250, y: GROUND_Y - 395, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 9620, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 10520, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 9895, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 9700, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 10450, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 10300, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 55, items: ['🫖', '🥫', '🍯'] },
        { x: 10500, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },
        { x: 10200, y: GROUND_Y - 200, type: 'steam_wisps' },
        // bossDoor decoration
        { x: CANVAS_W * 11 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SCREEN 12 (10560-11520): Boss arena ===
        { x: 11000, y: 60, type: 'ceiling_light', size: 58, color: '#FFE8C0' },
        { x: 11100, y: GROUND_Y - 5, type: 'rug', w: 400, h: 12, color: '#4A0808' },
        { x: 10680, y: GROUND_Y - 355, type: 'wall_art', w: 58, h: 44, color: '#B8860B' },
        { x: 11300, y: GROUND_Y - 345, type: 'wall_art', w: 52, h: 40, color: '#E8D8C0' },
        { x: 10800, y: GROUND_Y - 375, type: 'family_photo', w: 34, h: 30, color: '#B8860B' },
        { x: 11200, y: GROUND_Y - 380, type: 'family_photo', w: 30, h: 26, color: '#8B6914' },
        { x: 10580, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 11480, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 10680, y: GROUND_Y - 55, type: 'radiator', w: 85, h: 30 },
        { x: 11350, y: GROUND_Y - 55, type: 'radiator', w: 85, h: 30 },
        { x: 10700, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 11400, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 11000, y: GROUND_Y - 400, emoji: '🕰️', size: 32 },
        { x: 10900, y: GROUND_Y - 200, type: 'dripping_tap' },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#E8E0D0' },

        // === Screen 1 (0-960): TEACH - Counter intro ===
        // Wide counter - easy landing
        { x: 150, y: GROUND_Y - 55, width: 240, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Dining table - easy hop from counter (gap ~60px)
        { x: 450, y: GROUND_Y - 50, width: 130, height: 18, label: 'DINING_TABLE', color: '#A0522D' },
        // Stool - easy step from table (gap ~80px)
        { x: 660, y: GROUND_Y - 45, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        // Shelf - moderate hop from stool (gap ~75px, height diff ~45px)
        { x: 800, y: GROUND_Y - 90, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },

        // === Screen 2 (960-1920): TEST - Stool stepping stones ===
        // Stool chain with 100-120px gaps, slight height variations
        { x: 990, y: GROUND_Y - 50, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        { x: 1110, y: GROUND_Y - 80, width: 60, height: 16, label: 'CHAIR', color: '#8B4513' },
        { x: 1230, y: GROUND_Y - 60, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 1370, y: GROUND_Y - 90, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        { x: 1490, y: GROUND_Y - 70, width: 60, height: 16, label: 'CHAIR', color: '#8B4513' },
        { x: 1610, y: GROUND_Y - 100, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        // Landing counter
        { x: 1750, y: GROUND_Y - 55, width: 160, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 3 (1920-2880): VERTICAL CLIMB - Fridge tower ===
        // Start from ground, zigzag up
        { x: 1960, y: GROUND_Y - 55, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Right side - step up (70px vertical gap)
        { x: 2120, y: GROUND_Y - 125, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        // Left side - step up
        { x: 1980, y: GROUND_Y - 195, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        // Right side - step up
        { x: 2140, y: GROUND_Y - 265, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        // Fridge at top - reward platform
        { x: 2000, y: GROUND_Y - 335, width: 100, height: 20, label: 'FRIDGE', color: '#C0C8D0' },
        // Descent path right side
        { x: 2280, y: GROUND_Y - 250, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 2420, y: GROUND_Y - 180, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // Landing at end of screen
        { x: 2560, y: GROUND_Y - 60, width: 160, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Additional shelf for collectables
        { x: 2750, y: GROUND_Y - 120, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },

        // === Screen 4 (2880-3840): TEST - Hanging pot chain ===
        // Launch counter
        { x: 2900, y: GROUND_Y - 55, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // 4 hanging pots with moderate gaps (120-150px)
        { x: 3100, y: GROUND_Y - 120, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 60, moveSpeed: 0.8 },
        { x: 3260, y: GROUND_Y - 150, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -70, moveSpeed: 1.0 },
        { x: 3430, y: GROUND_Y - 130, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 80, moveSpeed: 1.2 },
        { x: 3600, y: GROUND_Y - 110, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -60, moveSpeed: 1.4 },
        // Landing counter
        { x: 3720, y: GROUND_Y - 55, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 5 (3840-4800): REST - Counter straightaway ===
        // Long easy path, mostly ground level
        { x: 3880, y: GROUND_Y - 55, width: 220, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 4180, y: GROUND_Y - 50, width: 130, height: 18, label: 'DINING_TABLE', color: '#A0522D' },
        { x: 4400, y: GROUND_Y - 55, width: 200, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 4680, y: GROUND_Y - 45, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },

        // === Screen 6 (4800-5760): CHALLENGE - Crumbling drawer sequence ===
        // Stable start counter
        { x: 4840, y: GROUND_Y - 55, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Crumbling drawer 1 (gap ~100px from counter)
        { x: 5040, y: GROUND_Y - 100, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Static counter in middle for safety
        { x: 5180, y: GROUND_Y - 55, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Crumbling drawer 2 (higher)
        { x: 5360, y: GROUND_Y - 110, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Crumbling drawer 3
        { x: 5510, y: GROUND_Y - 80, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Landing counter
        { x: 5650, y: GROUND_Y - 55, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 7 (5760-6720): CHALLENGE - Upper cabinet climb ===
        // 6-tier shelf tower
        { x: 5800, y: GROUND_Y - 55, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Tier 1
        { x: 5940, y: GROUND_Y - 120, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        // Tier 2
        { x: 5830, y: GROUND_Y - 190, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // Tier 3
        { x: 5960, y: GROUND_Y - 260, width: 60, height: 18, label: 'SHELF', color: '#8B6914' },
        // Tier 4
        { x: 5850, y: GROUND_Y - 330, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        // Tier 5
        { x: 5980, y: GROUND_Y - 395, width: 60, height: 18, label: 'SHELF', color: '#8B6914' },
        // Tier 6 - top (y~180 area) -- +LIFE platform
        { x: 5870, y: GROUND_Y - 450, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // Descent path - right side
        { x: 6120, y: GROUND_Y - 340, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 6260, y: GROUND_Y - 260, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 6400, y: GROUND_Y - 180, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // Landing
        { x: 6540, y: GROUND_Y - 55, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 8 (6720-7680): RISK/REWARD - Dual-path ===
        // Lower safe path (counters)
        { x: 6760, y: GROUND_Y - 55, width: 160, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 6990, y: GROUND_Y - 55, width: 130, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 7200, y: GROUND_Y - 55, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 7420, y: GROUND_Y - 55, width: 130, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Upper path (hanging pots - risk/reward)
        { x: 6850, y: GROUND_Y - 160, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 50, moveSpeed: 1.0 },
        { x: 7030, y: GROUND_Y - 190, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -60, moveSpeed: 1.2 },
        { x: 7210, y: GROUND_Y - 170, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 50, moveSpeed: 0.9 },
        { x: 7390, y: GROUND_Y - 200, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -70, moveSpeed: 1.1 },
        // Landing
        { x: 7560, y: GROUND_Y - 55, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 9 (7680-8640): ESCALATE - Pot + crumble combo ===
        { x: 7720, y: GROUND_Y - 55, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Crumbling drawer under pot path
        { x: 7910, y: GROUND_Y - 100, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Swinging pot over crumbles (170px gaps)
        { x: 8050, y: GROUND_Y - 160, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 70, moveSpeed: 1.2 },
        // Another crumbling drawer
        { x: 8200, y: GROUND_Y - 110, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Pot
        { x: 8350, y: GROUND_Y - 140, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -60, moveSpeed: 1.0 },
        // Safe counter
        { x: 8480, y: GROUND_Y - 55, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 10 (8640-9600): ESCALATE - Speed run crumbles ===
        { x: 8680, y: GROUND_Y - 55, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },
        // 5 crumbling platforms in a row, spaced ~130px apart
        { x: 8850, y: GROUND_Y - 90, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 9000, y: GROUND_Y - 110, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 9150, y: GROUND_Y - 90, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        { x: 9300, y: GROUND_Y - 110, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 9450, y: GROUND_Y - 80, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Landing
        { x: 9560, y: GROUND_Y - 55, width: 40, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 11 (9600-10560): GAUNTLET - Pre-boss ===
        // All mechanics combined
        { x: 9640, y: GROUND_Y - 55, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Moving pot
        { x: 9830, y: GROUND_Y - 130, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 60, moveSpeed: 1.3 },
        // Crumbling drawer
        { x: 9970, y: GROUND_Y - 100, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Static shelf
        { x: 10100, y: GROUND_Y - 140, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // Moving pot (190px gap)
        { x: 10240, y: GROUND_Y - 120, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -70, moveSpeed: 1.1 },
        // Static counter
        { x: 10360, y: GROUND_Y - 55, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 12 (10560-11520): BOSS ARENA ===
        { x: 10640, y: GROUND_Y - 100, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 10820, y: GROUND_Y - 160, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 11020, y: GROUND_Y - 120, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 11220, y: GROUND_Y - 170, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 11400, y: GROUND_Y - 110, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // === Screen 1 (10 collectables) ===
        // On the counter (y = GROUND_Y - 55, items ~30px above = GROUND_Y - 85)
        { x: 190, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 250, y: GROUND_Y - 88, label: 'CUP', color: '#87CEEB' },
        { x: 310, y: GROUND_Y - 88, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 370, y: GROUND_Y - 88, label: 'SPONGE', color: '#FFD700' },
        // On the dining table
        { x: 480, y: GROUND_Y - 82, label: 'PLATE', color: '#E8E8E8' },
        { x: 540, y: GROUND_Y - 82, label: 'CUP', color: '#F5F5DC' },
        // On ground between table and stool
        { x: 620, y: GROUND_Y - 34, label: 'SPICE', color: '#D2691E' },
        // On stool
        { x: 685, y: GROUND_Y - 78, label: 'TEA_TOWEL', color: '#FF6347' },
        // On shelf
        { x: 830, y: GROUND_Y - 122, label: 'SPICE', color: '#8B4513' },
        { x: 870, y: GROUND_Y - 122, label: 'PAN', color: '#696969' },

        // === Screen 2 (10 collectables) ===
        // On stepping stone platforms (~30px above each)
        { x: 1010, y: GROUND_Y - 82, label: 'PLATE', color: '#E8E8E8' },
        { x: 1130, y: GROUND_Y - 112, label: 'CUP', color: '#87CEEB' },
        { x: 1255, y: GROUND_Y - 92, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 1390, y: GROUND_Y - 122, label: 'POT', color: '#808080' },
        { x: 1510, y: GROUND_Y - 102, label: 'SPONGE', color: '#FFD700' },
        { x: 1635, y: GROUND_Y - 132, label: 'PAN', color: '#696969' },
        { x: 1665, y: GROUND_Y - 132, label: 'SPICE', color: '#D2691E' },
        // On landing counter
        { x: 1780, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 1840, y: GROUND_Y - 88, label: 'CUP', color: '#F5F5DC' },
        // Ground item
        { x: 1900, y: GROUND_Y - 34, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 3 (10 collectables) ===
        // On counter
        { x: 2000, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        // On zigzag drawers going up
        { x: 2145, y: GROUND_Y - 158, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 2005, y: GROUND_Y - 228, label: 'CUP', color: '#87CEEB' },
        { x: 2165, y: GROUND_Y - 298, label: 'SPICE', color: '#D2691E' },
        // On fridge top
        { x: 2030, y: GROUND_Y - 368, label: 'POT', color: '#808080' },
        { x: 2070, y: GROUND_Y - 368, label: 'PAN', color: '#696969' },
        // On descent shelves
        { x: 2305, y: GROUND_Y - 282, label: 'SPONGE', color: '#FFD700' },
        { x: 2445, y: GROUND_Y - 212, label: 'TEA_TOWEL', color: '#FF6347' },
        // On landing counter
        { x: 2600, y: GROUND_Y - 92, label: 'PLATE', color: '#E8E8E8' },
        // On end shelf
        { x: 2780, y: GROUND_Y - 152, label: 'SPICE', color: '#8B4513' },

        // === Screen 4 (9 collectables) ===
        // On launch counter
        { x: 2940, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 3000, y: GROUND_Y - 88, label: 'CUP', color: '#F5F5DC' },
        // On/near hanging pots (items float near pots)
        { x: 3120, y: GROUND_Y - 152, label: 'POT', color: '#808080' },
        { x: 3280, y: GROUND_Y - 182, label: 'PAN', color: '#696969' },
        { x: 3450, y: GROUND_Y - 162, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 3620, y: GROUND_Y - 142, label: 'SPONGE', color: '#FFD700' },
        // On landing counter
        { x: 3740, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 3800, y: GROUND_Y - 88, label: 'SPICE', color: '#D2691E' },
        // Ground
        { x: 3680, y: GROUND_Y - 34, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 5 (9 collectables) ===
        // Mostly ground level and on counters
        { x: 3920, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 3980, y: GROUND_Y - 88, label: 'CUP', color: '#87CEEB' },
        { x: 4050, y: GROUND_Y - 88, label: 'UTENSIL', color: '#C0C0C0' },
        // On dining table
        { x: 4220, y: GROUND_Y - 82, label: 'SPONGE', color: '#FFD700' },
        { x: 4280, y: GROUND_Y - 82, label: 'PAN', color: '#696969' },
        // On second counter
        { x: 4440, y: GROUND_Y - 88, label: 'POT', color: '#808080' },
        { x: 4520, y: GROUND_Y - 88, label: 'SPICE', color: '#D2691E' },
        // Ground items (easy pickup)
        { x: 4350, y: GROUND_Y - 34, label: 'TEA_TOWEL', color: '#FF6347' },
        { x: 4650, y: GROUND_Y - 34, label: 'CUP', color: '#F5F5DC' },

        // === Screen 6 (9 collectables) ===
        // On stable counter
        { x: 4880, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 4940, y: GROUND_Y - 88, label: 'UTENSIL', color: '#C0C0C0' },
        // On crumbling drawer 1
        { x: 5065, y: GROUND_Y - 132, label: 'POT', color: '#808080' },
        // On middle counter
        { x: 5220, y: GROUND_Y - 88, label: 'CUP', color: '#87CEEB' },
        // On crumbling drawer 2
        { x: 5385, y: GROUND_Y - 142, label: 'PAN', color: '#696969' },
        { x: 5405, y: GROUND_Y - 142, label: 'SPICE', color: '#D2691E' },
        // On crumbling drawer 3
        { x: 5535, y: GROUND_Y - 112, label: 'SPONGE', color: '#FFD700' },
        // On landing counter
        { x: 5680, y: GROUND_Y - 88, label: 'TEA_TOWEL', color: '#FF6347' },
        // Ground
        { x: 5160, y: GROUND_Y - 34, label: 'PLATE', color: '#E8E8E8' },

        // === Screen 7 (9 collectables) ===
        // Shelf tower climb
        { x: 5840, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        // Tier 1
        { x: 5965, y: GROUND_Y - 152, label: 'CUP', color: '#87CEEB' },
        // Tier 2
        { x: 5855, y: GROUND_Y - 222, label: 'UTENSIL', color: '#C0C0C0' },
        // Tier 3
        { x: 5980, y: GROUND_Y - 292, label: 'SPICE', color: '#D2691E' },
        // Tier 4
        { x: 5875, y: GROUND_Y - 362, label: 'POT', color: '#808080' },
        // Descent shelves
        { x: 6145, y: GROUND_Y - 372, label: 'PAN', color: '#696969' },
        { x: 6285, y: GROUND_Y - 292, label: 'SPONGE', color: '#FFD700' },
        { x: 6425, y: GROUND_Y - 212, label: 'TEA_TOWEL', color: '#FF6347' },
        // Landing
        { x: 6580, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },

        // === Screen 8 (9 collectables) ===
        // Lower safe path (5 items)
        { x: 6800, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 7030, y: GROUND_Y - 88, label: 'CUP', color: '#F5F5DC' },
        { x: 7240, y: GROUND_Y - 88, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 7460, y: GROUND_Y - 88, label: 'SPONGE', color: '#FFD700' },
        { x: 7590, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        // Upper path (4 extra items - risk/reward)
        { x: 6870, y: GROUND_Y - 192, label: 'POT', color: '#808080' },
        { x: 7050, y: GROUND_Y - 222, label: 'PAN', color: '#696969' },
        { x: 7230, y: GROUND_Y - 202, label: 'SPICE', color: '#D2691E' },
        { x: 7410, y: GROUND_Y - 232, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 9 (8 collectables) ===
        // On counter
        { x: 7760, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        // On crumbling drawer 1
        { x: 7935, y: GROUND_Y - 132, label: 'CUP', color: '#87CEEB' },
        // Near hanging pot 1
        { x: 8070, y: GROUND_Y - 192, label: 'POT', color: '#808080' },
        // On crumbling drawer 2
        { x: 8225, y: GROUND_Y - 142, label: 'PAN', color: '#696969' },
        // Near hanging pot 2
        { x: 8370, y: GROUND_Y - 172, label: 'UTENSIL', color: '#C0C0C0' },
        // On landing counter
        { x: 8510, y: GROUND_Y - 88, label: 'SPONGE', color: '#FFD700' },
        { x: 8570, y: GROUND_Y - 88, label: 'SPICE', color: '#D2691E' },
        // Ground
        { x: 8600, y: GROUND_Y - 34, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 10 (9 collectables) ===
        // On start counter
        { x: 8720, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        // On crumbling platforms (one per platform)
        { x: 8875, y: GROUND_Y - 122, label: 'CUP', color: '#87CEEB' },
        { x: 9025, y: GROUND_Y - 142, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 9175, y: GROUND_Y - 122, label: 'POT', color: '#808080' },
        { x: 9325, y: GROUND_Y - 142, label: 'PAN', color: '#696969' },
        { x: 9475, y: GROUND_Y - 112, label: 'SPONGE', color: '#FFD700' },
        // Ground items
        { x: 8780, y: GROUND_Y - 34, label: 'SPICE', color: '#D2691E' },
        { x: 9200, y: GROUND_Y - 34, label: 'TEA_TOWEL', color: '#FF6347' },
        // Landing
        { x: 9575, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },

        // === Screen 11 (8 collectables) ===
        // On counter
        { x: 9680, y: GROUND_Y - 88, label: 'PLATE', color: '#E8E8E8' },
        { x: 9730, y: GROUND_Y - 88, label: 'CUP', color: '#F5F5DC' },
        // Near hanging pot
        { x: 9850, y: GROUND_Y - 162, label: 'POT', color: '#808080' },
        // On crumbling drawer
        { x: 9995, y: GROUND_Y - 132, label: 'PAN', color: '#696969' },
        // On static shelf
        { x: 10125, y: GROUND_Y - 172, label: 'UTENSIL', color: '#C0C0C0' },
        // Near second pot
        { x: 10260, y: GROUND_Y - 152, label: 'SPICE', color: '#D2691E' },
        // On landing counter
        { x: 10400, y: GROUND_Y - 88, label: 'SPONGE', color: '#FFD700' },
        { x: 10460, y: GROUND_Y - 88, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 12 (0 standard collectables - boss arena) ===

        // === SPECIAL PICKUPS ===
        // +HEALTH on screen 5 rest area (easy to grab)
        { x: 4160, y: GROUND_Y - 34, label: '+HEALTH', color: '#00FF00' },
        // +HEALTH on screen 8 upper path (risk/reward)
        { x: 7130, y: GROUND_Y - 222, label: '+HEALTH', color: '#00FF00' },
        // +HEALTH on screen 10 (mid-crumble run)
        { x: 9100, y: GROUND_Y - 142, label: '+HEALTH', color: '#00FF00' },
        // +LIFE at the very top of screen 7 shelf tower
        { x: 5900, y: GROUND_Y - 482, label: '+LIFE', color: '#FF1493' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // === Screen 1 ===
        { x: 430, y: GROUND_Y - 25, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },

        // === Screen 2 ===
        { x: 1320, y: GROUND_Y - 30, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0 },

        // === Screen 3 ===
        { x: 2250, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // === Screen 4 ===
        { x: 3180, y: GROUND_Y - 30, width: 35, height: 30, label: 'BOILING_POT', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },

        // === Screen 5 ===
        { x: 4600, y: GROUND_Y - 25, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },

        // === Screen 6 ===
        { x: 5120, y: GROUND_Y - 30, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 1.8, timerOffset: 0 },
        { x: 5450, y: GROUND_Y - 30, width: 35, height: 30, label: 'BOILING_POT', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.8 },

        // === Screen 7 ===
        { x: 6180, y: GROUND_Y - 30, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0 },

        // === Screen 8 ===
        { x: 7150, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // === Screen 9 ===
        { x: 8130, y: GROUND_Y - 30, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0 },
        { x: 8400, y: GROUND_Y - 25, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },

        // === Screen 10 ===
        { x: 9100, y: GROUND_Y - 30, width: 40, height: 30, label: 'OVEN', color: '#333',
          timerOn: 2.5, timerOff: 2.0, timerOffset: 0 },

        // === Screen 11 ===
        { x: 9780, y: GROUND_Y - 25, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },
        { x: 10050, y: GROUND_Y - 30, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 1.8, timerOffset: 0.5 },
        { x: 10300, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // === Screen 1 ===
        { x: 550, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },

        // === Screen 2 ===
        { x: 1450, y: GROUND_Y - 30, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },

        // === Screen 3 ===
        { x: 2500, y: GROUND_Y - 12, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 100 },

        // === Screen 4 ===
        { x: 3350, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },

        // === Screen 5 ===
        { x: 4500, y: GROUND_Y - 30, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },

        // === Screen 6 ===
        { x: 4950, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },
        { x: 5600, y: GROUND_Y - 12, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 100 },

        // === Screen 7 ===
        { x: 6350, y: GROUND_Y - 30, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },

        // === Screen 8 ===
        { x: 7100, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },

        // === Screen 9 ===
        { x: 7850, y: GROUND_Y - 12, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 100 },
        { x: 8300, y: GROUND_Y - 30, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },

        // === Screen 10 ===
        { x: 9250, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },

        // === Screen 11 ===
        { x: 9750, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },
        { x: 10150, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },
        { x: 10400, y: GROUND_Y - 30, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },
    ],
};
