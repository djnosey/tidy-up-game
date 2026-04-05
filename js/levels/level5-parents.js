// Level 5: Parents' Room
// 12 screen widths (~11520px at 960px canvas width)
// HARD level: precision platforming, narrow furniture, mandatory bed bounce, aggressive timed obstacles

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 12;

export const level5 = {
    name: "Parents' Room",
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#E8E0D8',
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 11 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 11,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 11 + 700,
        y: GROUND_Y - 60,
        label: 'WARDROBE MONSTER',
        color: '#654321',
        width: 100,
        height: 60,
        health: 3,
        speed: 220,
        attacks: ['shoot', 'charge', 'teleport', 'shoot'],
    },

    // ========== DECORATIONS (non-interactive background) ==========
    decorations: [
        // === ARCHITECTURAL (spans full level) ===
        { x: 0, y: 8, type: 'cornice', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 250, type: 'dado_rail', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },

        // === SCREEN 1 (0-960): Bedroom entrance ===
        { x: 480, y: 70, type: 'ceiling_light', size: 50, color: '#F5E8D0' },
        { x: 600, y: GROUND_Y - 390, type: 'window', w: 100, h: 85 },
        { x: 575, y: GROUND_Y - 395, type: 'curtain', w: 35, h: 260, color: '#4A3050' },
        { x: 710, y: GROUND_Y - 395, type: 'curtain', w: 35, h: 260, color: '#4A3050' },
        { x: 250, y: GROUND_Y - 5, type: 'rug', w: 320, h: 12, color: '#7B5B6B' },
        { x: 60, y: GROUND_Y - 340, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 120, y: GROUND_Y - 360, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        { x: 40, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D8B8' },
        { x: 780, y: GROUND_Y - 350, type: 'wall_art', w: 60, h: 45, color: '#B8860B' },
        { x: 180, y: GROUND_Y - 100, emoji: '🪴', size: 28 },
        { x: 870, y: GROUND_Y - 370, emoji: '🕰️', size: 30 },
        { x: 595, y: GROUND_Y - 55, type: 'radiator', w: 110, h: 35 },
        { x: 150, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 300, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 750, y: GROUND_Y - 8, type: 'dust_bunny' },

        // === SCREEN 2 (960-1920): Bed bounce teaching ===
        { x: 1400, y: 75, type: 'ceiling_light', size: 48, color: '#F0E4D0' },
        { x: 1250, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 1228, y: GROUND_Y - 385, type: 'curtain', w: 32, h: 245, color: '#2F1F3F' },
        { x: 1350, y: GROUND_Y - 385, type: 'curtain', w: 32, h: 245, color: '#2F1F3F' },
        { x: 1050, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#6B4F5F' },
        { x: 970, y: GROUND_Y - 360, type: 'wall_art', w: 50, h: 38, color: '#654321' },
        { x: 1700, y: GROUND_Y - 340, type: 'wall_art', w: 45, h: 35, color: '#B8860B' },
        { x: 1500, y: GROUND_Y - 350, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 1820, y: GROUND_Y - 200, emoji: '💐', size: 26 },
        { x: 1245, y: GROUND_Y - 50, type: 'radiator', w: 95, h: 32 },
        { x: 1100, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 1880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 1900, y: GROUND_Y - 175, type: 'standing_lamp', floorY: GROUND_Y, color: '#D8C8A8' },
        { x: 1150, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 1600, y: GROUND_Y - 250, type: 'dust_motes' },

        // === SCREEN 3 (1920-2880): Wardrobe climb ===
        { x: 2400, y: 68, type: 'ceiling_light', size: 44, color: '#F5E6D0' },
        { x: 2350, y: GROUND_Y - 385, type: 'window', w: 90, h: 78 },
        { x: 2330, y: GROUND_Y - 390, type: 'curtain', w: 30, h: 250, color: '#4A3050' },
        { x: 2450, y: GROUND_Y - 390, type: 'curtain', w: 30, h: 250, color: '#4A3050' },
        { x: 2100, y: GROUND_Y - 5, type: 'rug', w: 300, h: 12, color: '#5C3A4E' },
        { x: 1960, y: GROUND_Y - 390, type: 'wall_art', w: 55, h: 42, color: '#B8860B' },
        { x: 2680, y: GROUND_Y - 340, type: 'wall_art', w: 48, h: 36, color: '#654321' },
        { x: 2160, y: GROUND_Y - 370, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        { x: 2800, y: GROUND_Y - 380, emoji: '🕰️', size: 28 },
        { x: 2860, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        { x: 2345, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 34 },
        { x: 2030, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2760, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2200, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 2500, y: GROUND_Y - 200, type: 'dust_motes' },

        // === SCREEN 4 (2880-3840): Laundry basket stepping ===
        { x: 3360, y: 72, type: 'ceiling_light', size: 46, color: '#F5E8D0' },
        { x: 3200, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 3178, y: GROUND_Y - 385, type: 'curtain', w: 32, h: 250, color: '#2F1F3F' },
        { x: 3300, y: GROUND_Y - 385, type: 'curtain', w: 32, h: 250, color: '#2F1F3F' },
        { x: 2950, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#7B5B6B' },
        { x: 3500, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#6B4F5F' },
        { x: 2920, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 36, color: '#B8860B' },
        { x: 3600, y: GROUND_Y - 360, type: 'wall_art', w: 52, h: 40, color: '#654321' },
        { x: 3100, y: GROUND_Y - 370, type: 'family_photo', w: 30, h: 26, color: '#8B6914' },
        { x: 3750, y: GROUND_Y - 340, emoji: '💐', size: 24 },
        { x: 3195, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 2960, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3700, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3050, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 3400, y: GROUND_Y - 180, type: 'dust_motes' },

        // === SCREEN 5 (3840-4800): Moving shelf chain ===
        { x: 4320, y: 65, type: 'ceiling_light', size: 50, color: '#F0E4D0' },
        { x: 4150, y: GROUND_Y - 385, type: 'window', w: 95, h: 82 },
        { x: 4128, y: GROUND_Y - 390, type: 'curtain', w: 33, h: 255, color: '#4A3050' },
        { x: 4255, y: GROUND_Y - 390, type: 'curtain', w: 33, h: 255, color: '#4A3050' },
        { x: 3900, y: GROUND_Y - 5, type: 'rug', w: 300, h: 12, color: '#5C3A4E' },
        { x: 4500, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#7B5B6B' },
        { x: 3870, y: GROUND_Y - 360, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 4550, y: GROUND_Y - 350, type: 'wall_art', w: 46, h: 36, color: '#654321' },
        { x: 4000, y: GROUND_Y - 375, type: 'family_photo', w: 32, h: 28, color: '#8B6914' },
        { x: 4700, y: GROUND_Y - 365, type: 'family_photo', w: 28, h: 24, color: '#B8860B' },
        { x: 4780, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 4145, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 34 },
        { x: 3900, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4650, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4300, y: GROUND_Y - 250, type: 'dust_motes' },

        // === SCREEN 6 (4800-5760): Crumbling shelf tower ===
        { x: 5280, y: 70, type: 'ceiling_light', size: 48, color: '#F5E8D0' },
        { x: 5100, y: GROUND_Y - 388, type: 'window', w: 90, h: 80 },
        { x: 5078, y: GROUND_Y - 393, type: 'curtain', w: 32, h: 250, color: '#2F1F3F' },
        { x: 5200, y: GROUND_Y - 393, type: 'curtain', w: 32, h: 250, color: '#2F1F3F' },
        { x: 4880, y: GROUND_Y - 5, type: 'rug', w: 280, h: 12, color: '#6B4F5F' },
        { x: 5400, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#5C3A4E' },
        { x: 4830, y: GROUND_Y - 355, type: 'wall_art', w: 52, h: 40, color: '#654321' },
        { x: 5500, y: GROUND_Y - 370, type: 'wall_art', w: 48, h: 36, color: '#B8860B' },
        { x: 5050, y: GROUND_Y - 360, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        { x: 5680, y: GROUND_Y - 380, emoji: '🕰️', size: 28 },
        { x: 5095, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 4900, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 5600, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 5720, y: GROUND_Y - 175, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D8B8' },
        { x: 5350, y: GROUND_Y - 8, type: 'dust_bunny' },

        // === SCREEN 7 (5760-6720): Dual-height wardrobe ===
        { x: 6240, y: 68, type: 'ceiling_light', size: 46, color: '#F0E4D0' },
        { x: 6050, y: GROUND_Y - 385, type: 'window', w: 92, h: 80 },
        { x: 6028, y: GROUND_Y - 390, type: 'curtain', w: 32, h: 252, color: '#4A3050' },
        { x: 6152, y: GROUND_Y - 390, type: 'curtain', w: 32, h: 252, color: '#4A3050' },
        { x: 5840, y: GROUND_Y - 5, type: 'rug', w: 300, h: 12, color: '#7B5B6B' },
        { x: 6400, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#5C3A4E' },
        { x: 5790, y: GROUND_Y - 365, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 6500, y: GROUND_Y - 345, type: 'wall_art', w: 46, h: 35, color: '#654321' },
        { x: 5950, y: GROUND_Y - 375, type: 'family_photo', w: 32, h: 28, color: '#8B6914' },
        { x: 6350, y: GROUND_Y - 355, type: 'family_photo', w: 28, h: 24, color: '#B8860B' },
        { x: 6680, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 5800, y: GROUND_Y - 40, emoji: '💐', size: 26 },
        { x: 6045, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 34 },
        { x: 5830, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 6580, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 6100, y: GROUND_Y - 8, type: 'dust_bunny' },

        // === SCREEN 8 (6720-7680): Timed obstacle corridor ===
        { x: 7200, y: 72, type: 'ceiling_light', size: 48, color: '#F5E6D0' },
        { x: 7000, y: GROUND_Y - 382, type: 'window', w: 90, h: 78 },
        { x: 6978, y: GROUND_Y - 387, type: 'curtain', w: 30, h: 248, color: '#2F1F3F' },
        { x: 7100, y: GROUND_Y - 387, type: 'curtain', w: 30, h: 248, color: '#2F1F3F' },
        { x: 6800, y: GROUND_Y - 5, type: 'rug', w: 280, h: 12, color: '#6B4F5F' },
        { x: 7350, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#7B5B6B' },
        { x: 6750, y: GROUND_Y - 358, type: 'wall_art', w: 50, h: 38, color: '#654321' },
        { x: 7450, y: GROUND_Y - 348, type: 'wall_art', w: 46, h: 35, color: '#B8860B' },
        { x: 6900, y: GROUND_Y - 370, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        { x: 7550, y: GROUND_Y - 375, emoji: '🕰️', size: 28 },
        { x: 6995, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 6780, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 7500, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 7600, y: GROUND_Y - 175, type: 'standing_lamp', floorY: GROUND_Y, color: '#D8C8A8' },
        { x: 7100, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 7300, y: GROUND_Y - 200, type: 'dust_motes' },

        // === SCREEN 9 (7680-8640): Moving + crumble ===
        { x: 8160, y: 65, type: 'ceiling_light', size: 50, color: '#F5E8D0' },
        { x: 7950, y: GROUND_Y - 388, type: 'window', w: 90, h: 80 },
        { x: 7928, y: GROUND_Y - 393, type: 'curtain', w: 32, h: 252, color: '#4A3050' },
        { x: 8050, y: GROUND_Y - 393, type: 'curtain', w: 32, h: 252, color: '#4A3050' },
        { x: 7750, y: GROUND_Y - 5, type: 'rug', w: 300, h: 12, color: '#5C3A4E' },
        { x: 8300, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#7B5B6B' },
        { x: 7710, y: GROUND_Y - 360, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 8400, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 36, color: '#654321' },
        { x: 8100, y: GROUND_Y - 372, type: 'family_photo', w: 30, h: 26, color: '#8B6914' },
        { x: 8560, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 7945, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 34 },
        { x: 7750, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 8500, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 8200, y: GROUND_Y - 250, type: 'dust_motes' },
        { x: 7900, y: GROUND_Y - 8, type: 'dust_bunny' },

        // === SCREEN 10 (8640-9600): Precision gauntlet ===
        { x: 9120, y: 70, type: 'ceiling_light', size: 46, color: '#F0E4D0' },
        { x: 8900, y: GROUND_Y - 385, type: 'window', w: 90, h: 80 },
        { x: 8878, y: GROUND_Y - 390, type: 'curtain', w: 32, h: 250, color: '#2F1F3F' },
        { x: 9000, y: GROUND_Y - 390, type: 'curtain', w: 32, h: 250, color: '#2F1F3F' },
        { x: 8700, y: GROUND_Y - 5, type: 'rug', w: 280, h: 12, color: '#7B5B6B' },
        { x: 9250, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#6B4F5F' },
        { x: 8670, y: GROUND_Y - 360, type: 'wall_art', w: 48, h: 36, color: '#654321' },
        { x: 9400, y: GROUND_Y - 355, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 9050, y: GROUND_Y - 370, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 9500, y: GROUND_Y - 380, emoji: '🕰️', size: 28 },
        { x: 8895, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 8700, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 9450, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 9560, y: GROUND_Y - 175, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D8B8' },
        { x: 9100, y: GROUND_Y - 8, type: 'dust_bunny' },

        // === SCREEN 11 (9600-10560): Pre-boss gauntlet ===
        { x: 10080, y: 65, type: 'ceiling_light', size: 50, color: '#F5E6D0' },
        { x: 9850, y: GROUND_Y - 388, type: 'window', w: 92, h: 82 },
        { x: 9828, y: GROUND_Y - 393, type: 'curtain', w: 33, h: 255, color: '#4A3050' },
        { x: 9952, y: GROUND_Y - 393, type: 'curtain', w: 33, h: 255, color: '#4A3050' },
        { x: 9680, y: GROUND_Y - 5, type: 'rug', w: 300, h: 12, color: '#5C3A4E' },
        { x: 10200, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#7B5B6B' },
        { x: 9630, y: GROUND_Y - 362, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 10350, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 36, color: '#654321' },
        { x: 9780, y: GROUND_Y - 375, type: 'family_photo', w: 30, h: 26, color: '#8B6914' },
        { x: 10100, y: GROUND_Y - 368, type: 'family_photo', w: 28, h: 24, color: '#B8860B' },
        { x: 10500, y: GROUND_Y - 40, emoji: '💐', size: 26 },
        { x: 9845, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 34 },
        { x: 9650, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 10400, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 10000, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 10300, y: GROUND_Y - 220, type: 'dust_motes' },
        // Boss arena doorway
        { x: CANVAS_W * 11 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SCREEN 12 (10560-11520): Boss arena ===
        { x: 11040, y: 58, type: 'ceiling_light', size: 56, color: '#E8D0B0' },
        { x: 10900, y: GROUND_Y - 5, type: 'rug', w: 480, h: 14, color: '#3D2030' },
        { x: 10620, y: GROUND_Y - 360, type: 'wall_art', w: 58, h: 44, color: '#B8860B' },
        { x: 11360, y: GROUND_Y - 350, type: 'wall_art', w: 52, h: 40, color: '#654321' },
        { x: 10780, y: GROUND_Y - 380, type: 'family_photo', w: 34, h: 30, color: '#B8860B' },
        { x: 11200, y: GROUND_Y - 375, type: 'family_photo', w: 30, h: 26, color: '#8B6914' },
        { x: 10580, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 11450, y: GROUND_Y - 36, emoji: '💐', size: 28 },
        { x: 10680, y: GROUND_Y - 52, type: 'radiator', w: 85, h: 32 },
        { x: 11320, y: GROUND_Y - 52, type: 'radiator', w: 85, h: 32 },
        { x: 10740, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 11400, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 11020, y: GROUND_Y - 410, emoji: '🕰️', size: 32 },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground (wood floor)
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#A0886B' },

        // =====================================================================
        // SCREEN 1 (0-960): TEACH — Bedroom entrance
        // Easy hops: bedside table → bed → bedside table → dresser
        // =====================================================================
        // Left bedside table
        { x: 150, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },
        // BED — wide, bouncy (purple duvet)
        { x: 300, y: GROUND_Y - 70, width: 260, height: 24, label: 'BED', color: '#6B4470' },
        // Right bedside table
        { x: 610, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },
        // Dresser — stepping stone upward
        { x: 780, y: GROUND_Y - 90, width: 110, height: 22, label: 'DRESSER', color: '#7B5B45' },

        // =====================================================================
        // SCREEN 2 (960-1920): TEST — Bed bounce → dresser top → shelf above
        // Mandatory bed bounce taught here
        // =====================================================================
        // Landing shelf from screen 1
        { x: 970, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },
        // BED — must bounce to reach dresser top
        { x: 1120, y: GROUND_Y - 70, width: 260, height: 24, label: 'BED', color: '#6B4470' },
        // Dresser top — reached via bed bounce (y=320, bed bounce from y=70 → max y≈70-225=-155 → player bottom at ~295, can reach 320)
        { x: 1460, y: GROUND_Y - 200, width: 110, height: 22, label: 'DRESSER', color: '#7B5B45' },
        // Shelf above dresser — reachable from dresser with normal jump (gap = 120px)
        { x: 1490, y: GROUND_Y - 330, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Landing platform to continue right
        { x: 1680, y: GROUND_Y - 55, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // Shelf step to next screen
        { x: 1830, y: GROUND_Y - 120, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // =====================================================================
        // SCREEN 3 (1920-2880): VERTICAL CLIMB — Wardrobe climb
        // Wardrobe base → 6 shelves zigzagging up to y≈200
        // =====================================================================
        // Wardrobe base
        { x: 1960, y: GROUND_Y - 80, width: 140, height: 22, label: 'WARDROBE', color: '#5C3D2E' },
        // Shelf 1 — right side (gap: 100px vertical from wardrobe top)
        { x: 2140, y: GROUND_Y - 190, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Shelf 2 — left side
        { x: 1990, y: GROUND_Y - 280, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Shelf 3 — right side
        { x: 2170, y: GROUND_Y - 370, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Shelf 4 — left (near top, y≈200 from top of canvas)
        { x: 2010, y: GROUND_Y - 320, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // Landing wardrobe right side
        { x: 2350, y: GROUND_Y - 80, width: 90, height: 20, label: 'WARDROBE', color: '#5C3D2E' },
        // Bridge shelf
        { x: 2520, y: GROUND_Y - 130, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Exit dresser
        { x: 2700, y: GROUND_Y - 65, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },

        // =====================================================================
        // SCREEN 4 (2880-3840): REST → TEST — Laundry basket stepping
        // Narrow platforms (70-90px), 120px gaps
        // =====================================================================
        // Laundry basket chain
        { x: 2920, y: GROUND_Y - 55, width: 90, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        { x: 3060, y: GROUND_Y - 100, width: 75, height: 18, label: 'CHAIR', color: '#6B5040' },
        { x: 3200, y: GROUND_Y - 55, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        { x: 3340, y: GROUND_Y - 110, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        { x: 3480, y: GROUND_Y - 60, width: 90, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // Shelf step up
        { x: 3620, y: GROUND_Y - 120, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Exit dresser
        { x: 3760, y: GROUND_Y - 65, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },

        // =====================================================================
        // SCREEN 5 (3840-4800): CHALLENGE — Moving shelf chain
        // 4 moving shelves, 170px gaps between static zones
        // =====================================================================
        // Entry platform
        { x: 3870, y: GROUND_Y - 55, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // Moving shelf 1
        { x: 4020, y: GROUND_Y - 120, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 60, moveSpeed: 1.0 },
        // Static landing 1
        { x: 4200, y: GROUND_Y - 65, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Moving shelf 2
        { x: 4340, y: GROUND_Y - 140, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 70, moveSpeed: 1.2 },
        // Static landing 2
        { x: 4530, y: GROUND_Y - 60, width: 75, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Moving shelf 3
        { x: 4650, y: GROUND_Y - 130, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 65, moveSpeed: 1.3 },
        // Moving shelf 4 (highest)
        { x: 4480, y: GROUND_Y - 240, width: 75, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 60, moveSpeed: 1.4 },

        // =====================================================================
        // SCREEN 6 (4800-5760): CHALLENGE — Crumbling shelf tower
        // 5 stacked shelves, 3 crumble (delay: 0.5s), must climb fast
        // +LIFE at top (y≈140)
        // =====================================================================
        // Entry platform
        { x: 4840, y: GROUND_Y - 55, width: 90, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // Shelf 1 (solid base)
        { x: 4980, y: GROUND_Y - 110, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Shelf 2 (crumble!)
        { x: 5100, y: GROUND_Y - 190, width: 75, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Shelf 3 (solid)
        { x: 4960, y: GROUND_Y - 260, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Shelf 4 (crumble!)
        { x: 5110, y: GROUND_Y - 330, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Shelf 5 (crumble! — top, +LIFE here)
        { x: 4980, y: GROUND_Y - 380, width: 75, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Right side descent
        { x: 5280, y: GROUND_Y - 120, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Wardrobe safe landing
        { x: 5440, y: GROUND_Y - 65, width: 100, height: 20, label: 'WARDROBE', color: '#5C3D2E' },
        // Exit platform
        { x: 5620, y: GROUND_Y - 55, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },

        // =====================================================================
        // SCREEN 7 (5760-6720): RISK/REWARD — Dual-height wardrobe
        // Safe lower path: wardrobe → chair → dresser (~5 items)
        // High path: shelf climb to wardrobe top (3 bonus items + 1 +HEALTH)
        // =====================================================================
        // Lower safe path
        { x: 5800, y: GROUND_Y - 75, width: 120, height: 22, label: 'WARDROBE', color: '#5C3D2E' },
        { x: 5980, y: GROUND_Y - 55, width: 75, height: 18, label: 'CHAIR', color: '#6B5040' },
        { x: 6120, y: GROUND_Y - 70, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },
        { x: 6290, y: GROUND_Y - 55, width: 75, height: 18, label: 'CHAIR', color: '#6B5040' },
        { x: 6430, y: GROUND_Y - 65, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // High reward path — shelf climb from wardrobe
        { x: 5830, y: GROUND_Y - 190, width: 75, height: 16, label: 'SHELF', color: '#8B6914' },
        { x: 5980, y: GROUND_Y - 280, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        { x: 6140, y: GROUND_Y - 200, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Exit to screen 8
        { x: 6600, y: GROUND_Y - 55, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },

        // =====================================================================
        // SCREEN 8 (6720-7680): ESCALATE — Timed obstacle corridor
        // Iron and hair straightener ON narrow platforms, 180px gaps
        // =====================================================================
        // Platform 1 with iron
        { x: 6760, y: GROUND_Y - 80, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Platform 2
        { x: 6950, y: GROUND_Y - 120, width: 75, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Platform 3 with hair straightener
        { x: 7140, y: GROUND_Y - 80, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Platform 4
        { x: 7320, y: GROUND_Y - 130, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Platform 5 with iron
        { x: 7500, y: GROUND_Y - 75, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Safe landing
        { x: 7620, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },

        // =====================================================================
        // SCREEN 9 (7680-8640): ESCALATE — Moving + crumble combo
        // Crumbling shelves below, moving shelves above
        // =====================================================================
        // Entry platform
        { x: 7720, y: GROUND_Y - 55, width: 90, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // Crumble shelf 1
        { x: 7870, y: GROUND_Y - 120, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Moving shelf above crumble 1
        { x: 7860, y: GROUND_Y - 230, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 60, moveSpeed: 1.0 },
        // Static landing
        { x: 8050, y: GROUND_Y - 65, width: 75, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Crumble shelf 2
        { x: 8190, y: GROUND_Y - 130, width: 75, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Moving shelf above crumble 2
        { x: 8180, y: GROUND_Y - 240, width: 75, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 65, moveSpeed: 1.2 },
        // Safe dresser
        { x: 8370, y: GROUND_Y - 60, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // Exit shelf
        { x: 8530, y: GROUND_Y - 110, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // =====================================================================
        // SCREEN 10 (8640-9600): ESCALATE — Precision gauntlet
        // 200px gaps, 70px wide platforms
        // =====================================================================
        // Platform chain — expert precision
        { x: 8680, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },
        { x: 8890, y: GROUND_Y - 100, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        { x: 9090, y: GROUND_Y - 60, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        { x: 9280, y: GROUND_Y - 110, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        { x: 9470, y: GROUND_Y - 65, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },

        // =====================================================================
        // SCREEN 11 (9600-10560): GAUNTLET — Pre-boss, all mechanics
        // Moving, crumbling, narrow, timed obstacles, moths at platform height
        // =====================================================================
        // Entry from screen 10
        { x: 9640, y: GROUND_Y - 55, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // Moving shelf
        { x: 9770, y: GROUND_Y - 130, width: 75, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 60, moveSpeed: 1.1 },
        // Narrow chair
        { x: 9940, y: GROUND_Y - 60, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Crumble shelf
        { x: 10080, y: GROUND_Y - 130, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Static shelf (with timed obstacle)
        { x: 10220, y: GROUND_Y - 80, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Chair hop
        { x: 10370, y: GROUND_Y - 120, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Final landing before boss door
        { x: 10480, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },

        // =====================================================================
        // SCREEN 12 (10560-11520): BOSS ARENA
        // 3 platforms for dodging boss attacks
        // =====================================================================
        { x: 10700, y: GROUND_Y - 110, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 10940, y: GROUND_Y - 140, width: 100, height: 22, label: 'DRESSER', color: '#7B5B45' },
        { x: 11200, y: GROUND_Y - 110, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard collectables + 3 +HEALTH + 1 +LIFE = 104 total
    collectables: [
        // =====================================================================
        // SCREEN 1 (0-960): 10 collectables
        // =====================================================================
        // On left bedside table
        { x: 170, y: GROUND_Y - 88, label: 'PHONE', color: '#333333' },
        { x: 200, y: GROUND_Y - 88, label: 'GLASS', color: '#87CEEB' },
        // On bed
        { x: 350, y: GROUND_Y - 105, label: 'PILLOW', color: '#E8D8E0' },
        { x: 420, y: GROUND_Y - 105, label: 'CLOTHES', color: '#6B4470' },
        { x: 490, y: GROUND_Y - 105, label: 'BOOK', color: '#8B0000' },
        // On right bedside table
        { x: 630, y: GROUND_Y - 88, label: 'CHARGER', color: '#333333' },
        { x: 660, y: GROUND_Y - 88, label: 'PHONE', color: '#333333' },
        // On dresser
        { x: 800, y: GROUND_Y - 125, label: 'SLIPPER', color: '#D2691E' },
        { x: 840, y: GROUND_Y - 125, label: 'CLOTHES', color: '#4169E1' },
        // Ground near exit
        { x: 920, y: GROUND_Y - 30, label: 'LAUNDRY', color: '#9370DB' },

        // =====================================================================
        // SCREEN 2 (960-1920): 10 collectables
        // =====================================================================
        // On bedside table
        { x: 990, y: GROUND_Y - 88, label: 'GLASS', color: '#87CEEB' },
        // On bed (before bounce)
        { x: 1180, y: GROUND_Y - 105, label: 'PILLOW', color: '#F0E0D0' },
        { x: 1250, y: GROUND_Y - 105, label: 'CLOTHES', color: '#CD5C5C' },
        { x: 1320, y: GROUND_Y - 105, label: 'LAUNDRY', color: '#8FBC8F' },
        // On dresser top (reached via bed bounce)
        { x: 1480, y: GROUND_Y - 235, label: 'BOOK', color: '#4682B4' },
        { x: 1530, y: GROUND_Y - 235, label: 'CHARGER', color: '#333333' },
        // On high shelf (reached from dresser top)
        { x: 1510, y: GROUND_Y - 365, label: 'PHONE', color: '#333333' },
        // On landing dresser
        { x: 1710, y: GROUND_Y - 90, label: 'SLIPPER', color: '#D2691E' },
        // On shelf step
        { x: 1855, y: GROUND_Y - 155, label: 'BOOK', color: '#8B4513' },
        // Ground
        { x: 1600, y: GROUND_Y - 30, label: 'LAUNDRY', color: '#B0C4DE' },

        // =====================================================================
        // SCREEN 3 (1920-2880): 10 collectables
        // =====================================================================
        // On wardrobe base
        { x: 2000, y: GROUND_Y - 115, label: 'CLOTHES', color: '#556B2F' },
        { x: 2060, y: GROUND_Y - 115, label: 'CLOTHES', color: '#8B6914' },
        // On shelf 1 (right)
        { x: 2165, y: GROUND_Y - 225, label: 'BOOK', color: '#006400' },
        // On shelf 2 (left)
        { x: 2015, y: GROUND_Y - 315, label: 'PILLOW', color: '#E0D0E8' },
        // On shelf 3 (right, high)
        { x: 2195, y: GROUND_Y - 405, label: 'CHARGER', color: '#333333' },
        // On right wardrobe
        { x: 2380, y: GROUND_Y - 115, label: 'LAUNDRY', color: '#9370DB' },
        // On bridge shelf
        { x: 2545, y: GROUND_Y - 165, label: 'GLASS', color: '#87CEEB' },
        // On exit dresser
        { x: 2730, y: GROUND_Y - 100, label: 'SLIPPER', color: '#D2691E' },
        // Ground items
        { x: 2250, y: GROUND_Y - 30, label: 'LAUNDRY', color: '#8FBC8F' },
        { x: 2600, y: GROUND_Y - 30, label: 'CLOTHES', color: '#CD5C5C' },

        // =====================================================================
        // SCREEN 4 (2880-3840): 9 collectables + 1 +HEALTH
        // =====================================================================
        // On laundry basket 1
        { x: 2945, y: GROUND_Y - 88, label: 'LAUNDRY', color: '#B0C4DE' },
        // On chair 1
        { x: 3080, y: GROUND_Y - 133, label: 'PILLOW', color: '#E8D8E0' },
        // On laundry basket 2
        { x: 3225, y: GROUND_Y - 88, label: 'CLOTHES', color: '#4169E1' },
        // On chair 2
        { x: 3360, y: GROUND_Y - 143, label: 'BOOK', color: '#8B0000' },
        // On laundry basket 3
        { x: 3510, y: GROUND_Y - 93, label: 'LAUNDRY', color: '#9370DB' },
        // On shelf step
        { x: 3645, y: GROUND_Y - 155, label: 'PHONE', color: '#333333' },
        // On exit dresser
        { x: 3790, y: GROUND_Y - 100, label: 'GLASS', color: '#87CEEB' },
        // Ground items
        { x: 3150, y: GROUND_Y - 30, label: 'SLIPPER', color: '#D2691E' },
        { x: 3550, y: GROUND_Y - 30, label: 'CHARGER', color: '#333333' },
        // +HEALTH on chair 2 (tricky jump)
        { x: 3380, y: GROUND_Y - 143, label: '+HEALTH', color: '#00FF00' },

        // =====================================================================
        // SCREEN 5 (3840-4800): 9 collectables
        // =====================================================================
        // On entry platform
        { x: 3895, y: GROUND_Y - 88, label: 'LAUNDRY', color: '#8FBC8F' },
        // On moving shelf 1
        { x: 4045, y: GROUND_Y - 155, label: 'BOOK', color: '#4682B4' },
        // On static landing 1
        { x: 4220, y: GROUND_Y - 98, label: 'CLOTHES', color: '#6B4470' },
        // On moving shelf 2
        { x: 4365, y: GROUND_Y - 175, label: 'PILLOW', color: '#F0E0D0' },
        // On static landing 2
        { x: 4550, y: GROUND_Y - 93, label: 'PHONE', color: '#333333' },
        // On moving shelf 3
        { x: 4670, y: GROUND_Y - 165, label: 'CHARGER', color: '#333333' },
        // On moving shelf 4 (high, bonus)
        { x: 4500, y: GROUND_Y - 275, label: 'GLASS', color: '#87CEEB' },
        // Ground items
        { x: 4100, y: GROUND_Y - 30, label: 'SLIPPER', color: '#D2691E' },
        { x: 4400, y: GROUND_Y - 30, label: 'LAUNDRY', color: '#B0C4DE' },

        // =====================================================================
        // SCREEN 6 (4800-5760): 8 collectables + 1 +LIFE
        // =====================================================================
        // On entry platform
        { x: 4870, y: GROUND_Y - 88, label: 'CLOTHES', color: '#CD5C5C' },
        // On shelf 1 (solid base)
        { x: 5005, y: GROUND_Y - 145, label: 'BOOK', color: '#8B4513' },
        // On crumble shelf 2
        { x: 5120, y: GROUND_Y - 225, label: 'PILLOW', color: '#E0D0E8' },
        // On shelf 3 (solid)
        { x: 4985, y: GROUND_Y - 295, label: 'CHARGER', color: '#333333' },
        // On right descent shelf
        { x: 5305, y: GROUND_Y - 155, label: 'PHONE', color: '#333333' },
        // On wardrobe landing
        { x: 5470, y: GROUND_Y - 100, label: 'LAUNDRY', color: '#9370DB' },
        // On exit platform
        { x: 5645, y: GROUND_Y - 88, label: 'GLASS', color: '#87CEEB' },
        // Ground
        { x: 5200, y: GROUND_Y - 30, label: 'SLIPPER', color: '#D2691E' },
        // +LIFE at the very top (crumble shelf 5, y≈140)
        { x: 5005, y: GROUND_Y - 415, label: '+LIFE', color: '#FF1493' },

        // =====================================================================
        // SCREEN 7 (5760-6720): 9 collectables (5 low path, 3 high + 1 +HEALTH high)
        // =====================================================================
        // Lower safe path items (5)
        { x: 5840, y: GROUND_Y - 110, label: 'CLOTHES', color: '#556B2F' },
        { x: 6000, y: GROUND_Y - 88, label: 'LAUNDRY', color: '#8FBC8F' },
        { x: 6150, y: GROUND_Y - 105, label: 'BOOK', color: '#006400' },
        { x: 6310, y: GROUND_Y - 88, label: 'PILLOW', color: '#E8D8E0' },
        { x: 6460, y: GROUND_Y - 100, label: 'PHONE', color: '#333333' },
        // High reward path items (3 bonus + +HEALTH)
        { x: 5855, y: GROUND_Y - 225, label: 'CLOTHES', color: '#8B6914' },
        { x: 6005, y: GROUND_Y - 315, label: 'CHARGER', color: '#333333' },
        { x: 6165, y: GROUND_Y - 235, label: 'GLASS', color: '#87CEEB' },
        // +HEALTH on high shelf (reward for taking risk)
        { x: 6020, y: GROUND_Y - 315, label: '+HEALTH', color: '#00FF00' },
        // Exit
        { x: 6625, y: GROUND_Y - 88, label: 'SLIPPER', color: '#D2691E' },

        // =====================================================================
        // SCREEN 8 (6720-7680): 8 collectables
        // =====================================================================
        // On platforms (between timed obstacles)
        { x: 6785, y: GROUND_Y - 115, label: 'LAUNDRY', color: '#B0C4DE' },
        { x: 6970, y: GROUND_Y - 153, label: 'BOOK', color: '#8B0000' },
        { x: 7165, y: GROUND_Y - 115, label: 'PILLOW', color: '#F0E0D0' },
        { x: 7340, y: GROUND_Y - 163, label: 'CLOTHES', color: '#4169E1' },
        { x: 7525, y: GROUND_Y - 110, label: 'PHONE', color: '#333333' },
        // On safe landing
        { x: 7640, y: GROUND_Y - 88, label: 'CHARGER', color: '#333333' },
        // Ground items
        { x: 6850, y: GROUND_Y - 30, label: 'SLIPPER', color: '#D2691E' },
        { x: 7250, y: GROUND_Y - 30, label: 'GLASS', color: '#87CEEB' },

        // =====================================================================
        // SCREEN 9 (7680-8640): 9 collectables + 1 +HEALTH
        // =====================================================================
        // On entry
        { x: 7745, y: GROUND_Y - 88, label: 'LAUNDRY', color: '#9370DB' },
        // On crumble shelf 1
        { x: 7895, y: GROUND_Y - 155, label: 'CLOTHES', color: '#CD5C5C' },
        // On moving shelf above 1
        { x: 7885, y: GROUND_Y - 265, label: 'BOOK', color: '#4682B4' },
        // On static landing
        { x: 8070, y: GROUND_Y - 98, label: 'PILLOW', color: '#E8D8E0' },
        // On crumble shelf 2
        { x: 8210, y: GROUND_Y - 165, label: 'PHONE', color: '#333333' },
        // On moving shelf above 2
        { x: 8200, y: GROUND_Y - 275, label: 'GLASS', color: '#87CEEB' },
        // On safe dresser
        { x: 8400, y: GROUND_Y - 95, label: 'CHARGER', color: '#333333' },
        // On exit shelf
        { x: 8555, y: GROUND_Y - 145, label: 'SLIPPER', color: '#D2691E' },
        // Ground
        { x: 8300, y: GROUND_Y - 30, label: 'LAUNDRY', color: '#8FBC8F' },
        // +HEALTH on moving shelf 2 (tricky)
        { x: 8220, y: GROUND_Y - 275, label: '+HEALTH', color: '#00FF00' },

        // =====================================================================
        // SCREEN 10 (8640-9600): 8 collectables
        // =====================================================================
        // On precision platforms
        { x: 8700, y: GROUND_Y - 88, label: 'CLOTHES', color: '#6B4470' },
        { x: 8910, y: GROUND_Y - 133, label: 'BOOK', color: '#8B4513' },
        { x: 9110, y: GROUND_Y - 93, label: 'LAUNDRY', color: '#B0C4DE' },
        { x: 9300, y: GROUND_Y - 143, label: 'PILLOW', color: '#E0D0E8' },
        { x: 9490, y: GROUND_Y - 98, label: 'PHONE', color: '#333333' },
        // Ground items (risky to grab — on ground between expert gaps)
        { x: 8800, y: GROUND_Y - 30, label: 'SLIPPER', color: '#D2691E' },
        { x: 9200, y: GROUND_Y - 30, label: 'GLASS', color: '#87CEEB' },
        { x: 9400, y: GROUND_Y - 30, label: 'CHARGER', color: '#333333' },

        // =====================================================================
        // SCREEN 11 (9600-10560): 10 collectables
        // =====================================================================
        // On entry
        { x: 9665, y: GROUND_Y - 88, label: 'LAUNDRY', color: '#9370DB' },
        // On moving shelf
        { x: 9795, y: GROUND_Y - 165, label: 'CLOTHES', color: '#CD5C5C' },
        // On narrow chair
        { x: 9960, y: GROUND_Y - 93, label: 'BOOK', color: '#8B0000' },
        // On crumble shelf
        { x: 10100, y: GROUND_Y - 165, label: 'PILLOW', color: '#F0E0D0' },
        // On static shelf (with obstacle)
        { x: 10245, y: GROUND_Y - 115, label: 'PHONE', color: '#333333' },
        // On chair hop
        { x: 10390, y: GROUND_Y - 153, label: 'GLASS', color: '#87CEEB' },
        // On final landing
        { x: 10500, y: GROUND_Y - 88, label: 'CHARGER', color: '#333333' },
        // Ground items
        { x: 9850, y: GROUND_Y - 30, label: 'SLIPPER', color: '#D2691E' },
        { x: 10150, y: GROUND_Y - 30, label: 'LAUNDRY', color: '#8FBC8F' },
        { x: 10350, y: GROUND_Y - 30, label: 'CLOTHES', color: '#556B2F' },

        // =====================================================================
        // SCREEN 12 (10560-11520): BOSS ARENA — 0 standard collectables
        // =====================================================================
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // === SCREEN 1: 1 PLUG ===
        { x: 260, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // === SCREEN 2: 1 CABLE ===
        { x: 1440, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },

        // === SCREEN 3: 1 IRON (timed) ===
        { x: 2480, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },

        // === SCREEN 4: 1 HAIR_STRAIGHTENER (timed) ===
        { x: 3420, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0 },

        // === SCREEN 5: 2 timed obstacles ===
        { x: 4150, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 4600, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 1.0 },

        // === SCREEN 6: 2 timed obstacles ===
        { x: 5050, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 5350, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.8 },

        // === SCREEN 7: 1 CABLE ===
        { x: 6250, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },

        // === SCREEN 8: 3 timed obstacles ON platforms ===
        // Iron on shelf platform 1
        { x: 6800, y: GROUND_Y - 102, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        // Hair straightener on shelf platform 3
        { x: 7180, y: GROUND_Y - 102, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },
        // Iron on shelf platform 5
        { x: 7540, y: GROUND_Y - 97, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 1.0 },

        // === SCREEN 9: 2 timed obstacles ===
        { x: 7950, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 8280, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },

        // === SCREEN 10: 2 timed obstacles ===
        { x: 8980, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 9360, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.8 },

        // === SCREEN 11: 3 mixed obstacles ===
        { x: 9880, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 10160, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },
        { x: 10300, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // === SCREEN 1: 1 MOTH ===
        { x: 500, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },

        // === SCREEN 2: 1 ALARM_CLOCK ===
        { x: 1350, y: GROUND_Y - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90 },

        // === SCREEN 3: 1 LAUNDRY_MONSTER ===
        { x: 2450, y: GROUND_Y - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 60 },

        // === SCREEN 4: 1 MOTH ===
        { x: 3300, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },

        // === SCREEN 5: 1 ALARM_CLOCK + 1 MOTH ===
        { x: 4100, y: GROUND_Y - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90 },
        { x: 4450, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },

        // === SCREEN 6: 1 LAUNDRY_MONSTER ===
        { x: 5250, y: GROUND_Y - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 60 },

        // === SCREEN 7: 1 MOTH ===
        { x: 6350, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },

        // === SCREEN 8: 1 ALARM_CLOCK + 1 LAUNDRY_MONSTER ===
        { x: 7050, y: GROUND_Y - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90 },
        { x: 7400, y: GROUND_Y - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 60 },

        // === SCREEN 9: 1 MOTH + 1 ALARM_CLOCK ===
        { x: 7980, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },
        { x: 8350, y: GROUND_Y - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90 },

        // === SCREEN 10: 1 LAUNDRY_MONSTER + 1 MOTH ===
        { x: 9000, y: GROUND_Y - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 60 },
        { x: 9350, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },

        // === SCREEN 11: 2 MOTH + 1 LAUNDRY_MONSTER ===
        { x: 9800, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },
        { x: 10100, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },
        { x: 10400, y: GROUND_Y - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 60 },
    ],
};
