// Level 2: Kitchen (redesigned)
// 12 screen widths (11,520px at 960px canvas width)
// 100 standard collectables + 3 +HEALTH + 1 +LIFE
// DEADLY FLOOR — no full-width ground platform

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 12;

export const level2 = {
    name: 'Kitchen',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#F0E8D8',
    playerStart: { x: 80, y: 460 - 72 },

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

        // === SCREEN 6 (4800-5760): Crumbling plate stack sequence ===
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
    // ~85 static + ~14 moving + ~12 crumbling
    // Four-tier system: T1=460-490, T2=360-400, T3=250-300, T4=140-200
    platforms: [
        // Boss arena ground only (label '' = solid full collision)
        { x: CANVAS_W * 11, y: GROUND_Y, width: CANVAS_W, height: 80, label: '', color: '#E8E0D0' },

        // === Screen 1 (0-960): TEACH — Counter intro, wide T1 islands ===
        // Wide spawn counter
        { x: 40, y: 460, width: 240, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Dining table hop (~80px gap)
        { x: 360, y: 470, width: 160, height: 18, label: 'DINING_TABLE', color: '#A0522D' },
        // Stool stepping stone (~80px gap)
        { x: 600, y: 475, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        // Shelf — moderate hop up
        { x: 740, y: 400, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // Counter landing
        { x: 870, y: 465, width: 90, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T2 optional shelf for bonus
        { x: 400, y: 380, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },

        // === Screen 2 (960-1920): TEST — Stool stepping stones, vertical variety ===
        // T1 counter entry
        { x: 970, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Stool chain with height variations
        { x: 1160, y: 475, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        { x: 1290, y: 400, width: 70, height: 16, label: 'CHAIR', color: '#8B4513' },
        { x: 1420, y: 470, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 1560, y: 390, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        { x: 1690, y: 470, width: 70, height: 16, label: 'CHAIR', color: '#8B4513' },
        // Counter landing
        { x: 1810, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T3 shelf above (optional climb)
        { x: 1300, y: 290, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T2 shelf for T3 access
        { x: 1160, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },

        // === Screen 3 (1920-2880): VERTICAL CLIMB — Fridge tower ===
        // T1 counter start
        { x: 1940, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Zigzag drawer climb
        { x: 2120, y: 390, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 1970, y: 300, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 2140, y: 260, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        // Fridge top — T4 reward
        { x: 1990, y: 180, width: 100, height: 20, label: 'FRIDGE', color: '#C0C8D0' },
        // Descent shelves
        { x: 2280, y: 280, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 2420, y: 370, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T1 landing counter
        { x: 2560, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Additional shelf for collectables
        { x: 2740, y: 390, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // Crumbling plate stack shortcut (skip zigzag)
        { x: 2060, y: 380, width: 70, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },

        // === Screen 4 (2880-3840): TEST — Hanging pot chain ===
        // T1 launch counter
        { x: 2900, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T2 shelf — launch pad for pots
        { x: 3070, y: 390, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // 4 hanging pots at T3 (moving)
        { x: 3200, y: 290, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 60, moveSpeed: 0.8 },
        { x: 3360, y: 270, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -70, moveSpeed: 1.0 },
        { x: 3520, y: 280, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 80, moveSpeed: 1.2 },
        { x: 3680, y: 290, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -60, moveSpeed: 1.0 },
        // T2 shelf — safe alternative lower path
        { x: 3240, y: 390, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 3440, y: 400, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 3620, y: 390, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T1 landing counter
        { x: 3770, y: 465, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 5 (3840-4800): REST — Counter straightaway ===
        // Wide easy path — mostly T1/T2
        { x: 3870, y: 465, width: 200, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 4140, y: 470, width: 140, height: 18, label: 'DINING_TABLE', color: '#A0522D' },
        { x: 4350, y: 465, width: 200, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 4620, y: 475, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        { x: 4740, y: 465, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T2 shelves for optional higher route
        { x: 4000, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 4450, y: 370, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },

        // === Screen 6 (4800-5760): CHALLENGE — Crumbling plate stacks ===
        // T1 stable counter start
        { x: 4830, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Crumbling plate stack 1 at T2
        { x: 5020, y: 390, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Static counter safety
        { x: 5150, y: 465, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Crumbling plate stack 2 at T2 (higher)
        { x: 5310, y: 380, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Crumbling plate stack 3 at T3
        { x: 5450, y: 290, width: 70, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Static shelf alternative to crumble 3
        { x: 5430, y: 390, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T2 landing shelf
        { x: 5590, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T1 landing counter
        { x: 5700, y: 465, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Moving pot bridging gap at T3
        { x: 5150, y: 280, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 70, moveSpeed: 1.0 },

        // === Screen 7 (5760-6720): CHALLENGE — Upper cabinet climb ===
        // T1 counter start
        { x: 5780, y: 465, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T2 shelf — start climb
        { x: 5940, y: 390, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T3 zigzag
        { x: 5810, y: 300, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 5960, y: 270, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        // T4 top — +LIFE platform
        { x: 5830, y: 180, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T4 alternate (slightly different position)
        { x: 5980, y: 160, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        // Descent — crumbling drawers for speed descent
        { x: 6100, y: 280, width: 70, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Static descent alternative
        { x: 6130, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 6290, y: 300, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 6420, y: 390, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T1 landing
        { x: 6560, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 8 (6720-7680): RISK/REWARD — Dual-path ===
        // Lower safe path — T1/T2 counters
        { x: 6740, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 6950, y: 465, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 7140, y: 465, width: 130, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 7340, y: 465, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 7530, y: 465, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },
        // Upper path — hanging pots at T3 (risk/reward with bonus collectibles)
        { x: 6820, y: 280, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 50, moveSpeed: 1.0 },
        { x: 7000, y: 260, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -60, moveSpeed: 1.2 },
        { x: 7180, y: 270, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 50, moveSpeed: 0.9 },
        { x: 7360, y: 250, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -70, moveSpeed: 1.1 },
        // T2 launch shelf for upper path
        { x: 6780, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T2 landing from upper path
        { x: 7480, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },

        // === Screen 9 (7680-8640): ESCALATE — Pot + crumble combo ===
        // T1 counter start
        { x: 7700, y: 465, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T2 crumbling plate stack
        { x: 7890, y: 390, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T3 swinging pot over crumbles
        { x: 8030, y: 270, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 70, moveSpeed: 1.2 },
        // T2 another crumble
        { x: 8180, y: 380, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T3 pot
        { x: 8330, y: 280, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -60, moveSpeed: 1.0 },
        // Static shelves as alternatives
        { x: 7920, y: 300, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 8200, y: 290, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        // T1 safe counter landing
        { x: 8440, y: 465, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T2 extra shelf
        { x: 8060, y: 400, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },

        // === Screen 10 (8640-9600): ESCALATE — Speed run crumbles ===
        // T1 counter start
        { x: 8660, y: 465, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },
        // 5 crumbling plate stacks at T2, spaced for sprint
        { x: 8830, y: 390, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        { x: 8980, y: 380, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        { x: 9130, y: 390, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        { x: 9280, y: 380, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        { x: 9430, y: 390, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Static shelf mid-run for safety
        { x: 9060, y: 400, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        // T1 counter landing
        { x: 9540, y: 465, width: 100, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T3 bonus route above crumbles
        { x: 8900, y: 280, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 9100, y: 270, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 9300, y: 280, width: 70, height: 18, label: 'SHELF', color: '#8B6914' },

        // === Screen 11 (9600-10560): GAUNTLET — All mechanics combined ===
        // T1 counter start
        { x: 9620, y: 465, width: 120, height: 22, label: 'COUNTER', color: '#A0896C' },
        // T2 shelf
        { x: 9800, y: 390, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T3 moving pot
        { x: 9940, y: 270, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 60, moveSpeed: 1.3 },
        // T2 crumbling plate stack
        { x: 10060, y: 385, width: 80, height: 18, label: 'PLATE_STACK', color: '#E8E8E8',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T3 static shelf
        { x: 10180, y: 290, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T3 moving pot (gap ~170px)
        { x: 10320, y: 270, width: 64, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -70, moveSpeed: 1.1 },
        // T2 static shelf
        { x: 10140, y: 400, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        // T1 pre-boss counter
        { x: 10380, y: 465, width: 160, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Screen 12 (10560-11520): BOSS ARENA ===
        // Shelves for dodging boss
        { x: 10640, y: 390, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 10820, y: 300, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 11020, y: 380, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 11220, y: 290, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 11400, y: 380, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard + 3 +HEALTH + 1 +LIFE = 104 total
    collectables: [
        // === Screen 1 (10 collectables) ===
        // On spawn counter (y=460, items at 428)
        { x: 80, y: 428, label: 'PLATE', color: '#E8E8E8' },
        { x: 140, y: 428, label: 'CUP', color: '#87CEEB' },
        { x: 200, y: 428, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 250, y: 428, label: 'SPONGE', color: '#FFD700' },
        // On dining table (y=470, items at 438)
        { x: 490, y: 388, label: 'PLATE', color: '#E8E8E8' },
        { x: 540, y: 438, label: 'CUP', color: '#F5F5DC' },
        // On stool (y=475, items at 443)
        { x: 625, y: 443, label: 'TEA_TOWEL', color: '#FF6347' },
        // On shelf (y=400, items at 368)
        { x: 770, y: 368, label: 'SPICE', color: '#8B4513' },
        { x: 810, y: 368, label: 'PAN', color: '#696969' },
        // On T2 bonus shelf (y=380, items at 348)
        { x: 430, y: 348, label: 'SPICE', color: '#D2691E' },

        // === Screen 2 (10 collectables) ===
        // On counter (y=465, items at 433)
        { x: 1010, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 1070, y: 433, label: 'CUP', color: '#87CEEB' },
        // On stepping stones
        { x: 1180, y: 443, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 1380, y: 368, label: 'POT', color: '#808080' },
        { x: 1440, y: 438, label: 'SPONGE', color: '#FFD700' },
        { x: 1580, y: 358, label: 'PAN', color: '#696969' },
        { x: 1710, y: 438, label: 'SPICE', color: '#D2691E' },
        // On landing counter (y=465)
        { x: 1840, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 1900, y: 433, label: 'TEA_TOWEL', color: '#FF6347' },
        // On T3 shelf (y=290)
        { x: 1320, y: 258, label: 'CUP', color: '#F5F5DC' },

        // === Screen 3 (10 collectables) ===
        // On counter (y=465)
        { x: 1980, y: 433, label: 'PLATE', color: '#E8E8E8' },
        // On zigzag drawers
        { x: 2145, y: 358, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 1995, y: 268, label: 'CUP', color: '#87CEEB' },
        { x: 2165, y: 228, label: 'SPICE', color: '#D2691E' },
        // On fridge top (y=180, items at 148)
        { x: 2020, y: 148, label: 'POT', color: '#808080' },
        { x: 2060, y: 148, label: 'PAN', color: '#696969' },
        // On descent shelves
        { x: 2305, y: 248, label: 'SPONGE', color: '#FFD700' },
        { x: 2445, y: 338, label: 'TEA_TOWEL', color: '#FF6347' },
        // On landing counter (y=465)
        { x: 2670, y: 433, label: 'PLATE', color: '#E8E8E8' },
        // On shelf (y=390)
        { x: 2770, y: 358, label: 'SPICE', color: '#8B4513' },

        // === Screen 4 (9 collectables) ===
        // On launch counter (y=465)
        { x: 2940, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 3000, y: 433, label: 'CUP', color: '#F5F5DC' },
        // On/near hanging pots (T3, items ~32px above pot y)
        { x: 3220, y: 258, label: 'POT', color: '#808080' },
        { x: 3380, y: 238, label: 'PAN', color: '#696969' },
        { x: 3540, y: 248, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 3700, y: 258, label: 'SPONGE', color: '#FFD700' },
        // On landing counter (y=465)
        { x: 3800, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 3860, y: 433, label: 'SPICE', color: '#D2691E' },
        // On T2 alternative shelf (y=390)
        { x: 3460, y: 368, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 5 (9 collectables) ===
        // Rest area — mostly on T1 counters
        { x: 3910, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 3970, y: 433, label: 'CUP', color: '#87CEEB' },
        { x: 4030, y: 433, label: 'UTENSIL', color: '#C0C0C0' },
        // On dining table (y=470)
        { x: 4180, y: 438, label: 'SPONGE', color: '#FFD700' },
        { x: 4240, y: 438, label: 'PAN', color: '#696969' },
        // On second counter (y=465)
        { x: 4390, y: 433, label: 'POT', color: '#808080' },
        { x: 4480, y: 433, label: 'SPICE', color: '#D2691E' },
        // On T2 shelves (y=380/370)
        { x: 4025, y: 348, label: 'TEA_TOWEL', color: '#FF6347' },
        { x: 4475, y: 338, label: 'CUP', color: '#F5F5DC' },

        // === Screen 6 (9 collectables) ===
        // On stable counter (y=465)
        { x: 4870, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 4930, y: 433, label: 'UTENSIL', color: '#C0C0C0' },
        // On crumbling plate stack 1 (y=390)
        { x: 5045, y: 358, label: 'POT', color: '#808080' },
        // On middle counter (y=465)
        { x: 5260, y: 433, label: 'CUP', color: '#87CEEB' },
        // On crumbling plate stack 2 (y=380)
        { x: 5335, y: 348, label: 'PAN', color: '#696969' },
        { x: 5365, y: 348, label: 'SPICE', color: '#D2691E' },
        // On crumbling plate stack 3 (y=290)
        { x: 5475, y: 258, label: 'SPONGE', color: '#FFD700' },
        // On landing counter (y=465)
        { x: 5730, y: 433, label: 'TEA_TOWEL', color: '#FF6347' },
        // On static shelf alternative (y=390)
        { x: 5455, y: 358, label: 'PLATE', color: '#E8E8E8' },

        // === Screen 7 (9 collectables) ===
        // On counter (y=465)
        { x: 5820, y: 433, label: 'PLATE', color: '#E8E8E8' },
        // Shelf tower climb
        { x: 6035, y: 358, label: 'CUP', color: '#87CEEB' },
        { x: 5835, y: 268, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 5985, y: 238, label: 'SPICE', color: '#D2691E' },
        { x: 5855, y: 148, label: 'POT', color: '#808080' },
        // Descent
        { x: 6120, y: 248, label: 'PAN', color: '#696969' },
        { x: 6315, y: 268, label: 'SPONGE', color: '#FFD700' },
        { x: 6445, y: 358, label: 'TEA_TOWEL', color: '#FF6347' },
        // Landing (y=465)
        { x: 6600, y: 433, label: 'PLATE', color: '#E8E8E8' },

        // === Screen 8 (9 collectables) ===
        // Lower safe path (5 items on counters, y=465)
        { x: 6780, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 6990, y: 433, label: 'CUP', color: '#F5F5DC' },
        { x: 7250, y: 433, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 7380, y: 433, label: 'SPONGE', color: '#FFD700' },
        { x: 7560, y: 433, label: 'PLATE', color: '#E8E8E8' },
        // Upper path (4 items on/near pots, T3)
        { x: 6840, y: 248, label: 'POT', color: '#808080' },
        { x: 7020, y: 228, label: 'PAN', color: '#696969' },
        { x: 7200, y: 238, label: 'SPICE', color: '#D2691E' },
        { x: 7380, y: 218, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 9 (8 collectables) ===
        // On counter (y=465)
        { x: 7810, y: 433, label: 'PLATE', color: '#E8E8E8' },
        // On crumbling plate 1 (y=390)
        { x: 7915, y: 358, label: 'CUP', color: '#87CEEB' },
        // Near hanging pot 1 (y=270)
        { x: 8050, y: 238, label: 'POT', color: '#808080' },
        // On crumbling plate 2 (y=380)
        { x: 8205, y: 348, label: 'PAN', color: '#696969' },
        // Near hanging pot 2 (y=280)
        { x: 8350, y: 248, label: 'UTENSIL', color: '#C0C0C0' },
        // On landing counter (y=465)
        { x: 8480, y: 433, label: 'SPONGE', color: '#FFD700' },
        { x: 8540, y: 433, label: 'SPICE', color: '#D2691E' },
        // On static shelf (y=300)
        { x: 7945, y: 268, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 10 (9 collectables) ===
        // On start counter (y=465)
        { x: 8770, y: 433, label: 'PLATE', color: '#E8E8E8' },
        // On crumbling plates (one per plate)
        { x: 8855, y: 358, label: 'CUP', color: '#87CEEB' },
        { x: 9005, y: 348, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 9155, y: 358, label: 'POT', color: '#808080' },
        { x: 9305, y: 348, label: 'PAN', color: '#696969' },
        { x: 9455, y: 358, label: 'SPONGE', color: '#FFD700' },
        // On static shelf mid-run (y=400)
        { x: 9080, y: 368, label: 'SPICE', color: '#D2691E' },
        // On landing counter (y=465)
        { x: 9570, y: 433, label: 'TEA_TOWEL', color: '#FF6347' },
        // On T3 bonus shelf (y=280/270)
        { x: 9120, y: 238, label: 'PLATE', color: '#E8E8E8' },

        // === Screen 11 (8 collectables) ===
        // On counter (y=465)
        { x: 9730, y: 433, label: 'PLATE', color: '#E8E8E8' },
        { x: 9710, y: 433, label: 'CUP', color: '#F5F5DC' },
        // Near hanging pot (y=270)
        { x: 9960, y: 238, label: 'POT', color: '#808080' },
        // On crumbling plate (y=385)
        { x: 10085, y: 353, label: 'PAN', color: '#696969' },
        // On static shelf (y=290)
        { x: 10275, y: 258, label: 'UTENSIL', color: '#C0C0C0' },
        // Near second pot (y=270)
        { x: 10340, y: 238, label: 'SPICE', color: '#D2691E' },
        // On landing counter (y=465)
        { x: 10490, y: 433, label: 'SPONGE', color: '#FFD700' },
        { x: 10500, y: 433, label: 'TEA_TOWEL', color: '#FF6347' },

        // === Screen 12 (0 standard collectables - boss arena) ===

        // === SPECIAL PICKUPS ===
        // +HEALTH on screen 5 rest area — easy grab on T2 shelf
        { x: 4040, y: 348, label: '+HEALTH', color: '#00FF00' },
        // +HEALTH on screen 8 upper path (risk/reward near pot)
        { x: 7110, y: 228, label: '+HEALTH', color: '#00FF00' },
        // +HEALTH on screen 10 (mid-crumble run, on static shelf)
        { x: 9085, y: 368, label: '+HEALTH', color: '#00FF00' },
        // +LIFE at the very top of screen 7 shelf tower (T4)
        { x: 5870, y: 148, label: '+LIFE', color: '#FF1493' },
    ],

    // ========== OBSTACLES ==========
    // All placed ON platform surfaces
    obstacles: [
        // === Screen 1 — WET_FLOOR on dining table (y=470) ===
        { x: 430, y: 445, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },

        // === Screen 2 — timed KNIFE on chair (y=400) ===
        { x: 1310, y: 370, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0 },

        // === Screen 3 — CABLE on counter (y=465) ===
        { x: 2600, y: 440, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // === Screen 4 — BOILING_POT on shelf (y=390) ===
        { x: 3100, y: 360, width: 35, height: 30, label: 'BOILING_POT', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },

        // === Screen 5 — WET_FLOOR on counter (y=465) ===
        { x: 4550, y: 440, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },

        // === Screen 6 — KNIFE on middle counter (y=465) + BOILING_POT on shelf ===
        { x: 5180, y: 435, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 1.8, timerOffset: 0 },
        { x: 5620, y: 350, width: 35, height: 30, label: 'BOILING_POT', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.8 },

        // === Screen 7 — KNIFE on T2 shelf (y=390) ===
        { x: 5970, y: 360, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0 },

        // === Screen 8 — CABLE on lower path counter (y=465) ===
        { x: 7180, y: 440, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // === Screen 9 — KNIFE on counter + WET_FLOOR on shelf ===
        { x: 7760, y: 435, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0 },
        { x: 8080, y: 375, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },

        // === Screen 10 — OVEN on counter (y=465) ===
        { x: 8700, y: 435, width: 40, height: 30, label: 'OVEN', color: '#333',
          timerOn: 2.5, timerOff: 2.0, timerOffset: 0 },

        // === Screen 11 — WET_FLOOR + KNIFE + CABLE ===
        { x: 9660, y: 440, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },
        { x: 10210, y: 260, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 1.8, timerOffset: 0.5 },
        { x: 10440, y: 440, width: 40, height: 25, label: 'CABLE', color: '#333' },
    ],

    // ========== ENEMIES ==========
    // All placed ON platforms
    enemies: [
        // === Screen 1 — COCKROACH on dining table (y=470) ===
        { x: 420, y: 455, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 60 },

        // === Screen 2 — BLENDER on counter (y=465) ===
        { x: 1850, y: 435, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 50 },

        // === Screen 3 — ANTS on counter (y=465) ===
        { x: 2600, y: 453, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 80 },

        // === Screen 4 — COCKROACH on T2 shelf (y=390) ===
        { x: 3270, y: 375, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 50 },

        // === Screen 5 — BLENDER on counter (y=465) ===
        { x: 4450, y: 435, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 50 },

        // === Screen 6 — COCKROACH + ANTS on platforms ===
        { x: 4900, y: 450, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 60 },
        { x: 5620, y: 368, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 50 },

        // === Screen 7 — BLENDER on shelf (y=390) ===
        { x: 6450, y: 360, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 50 },

        // === Screen 8 — COCKROACH on counter (y=465) ===
        { x: 7180, y: 450, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 60 },

        // === Screen 9 — ANTS + BLENDER on platforms ===
        { x: 8480, y: 453, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 80 },
        { x: 8220, y: 260, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 40 },

        // === Screen 10 — COCKROACH on static shelf (y=400) ===
        { x: 9080, y: 385, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 40 },

        // === Screen 11 — COCKROACH x2 + BLENDER ===
        { x: 9830, y: 375, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 50 },
        { x: 10180, y: 275, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 50 },
        { x: 10430, y: 435, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },
    ],
};
