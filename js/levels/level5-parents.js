// Level 5: Parents' Room
// 12 screen widths (~11520px at 960px canvas width)
// HARD level: precision platforming, narrow furniture, mandatory bed bounce, aggressive timed obstacles
// DEADLY FLOOR — no full-width ground platform. Boss arena gets solid ground only.

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 12;

export const level5 = {
    name: "Parents' Room",
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#E8E0D8',
    playerStart: { x: 80, y: 460 - 72 },

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
    // ~85 static + ~14 moving + ~12 crumbling = ~111 total
    platforms: [
        // Boss arena ground (solid, full collision)
        { x: CANVAS_W * 11, y: GROUND_Y, width: CANVAS_W, height: 80, label: '', color: '#A0886B' },

        // =====================================================================
        // SCREEN 1 (0-960): TEACH — Bedroom entrance, easy hops
        // Zigzag Climb: T1 islands -> T2 dresser -> T1 landing
        // =====================================================================
        // T1: Spawn island
        { x: 40, y: 470, width: 130, height: 22, label: 'DRESSER', color: '#7B5B45' },
        // T1: Stepping island
        { x: 230, y: 480, width: 90, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: BED — wide, bouncy (purple duvet)
        { x: 380, y: 390, width: 220, height: 24, label: 'BED', color: '#6B4470' },
        // T1: Landing after bed
        { x: 660, y: 475, width: 80, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Dresser stepping stone
        { x: 800, y: 380, width: 100, height: 22, label: 'DRESSER', color: '#7B5B45' },
        // T1: Exit island
        { x: 900, y: 465, width: 70, height: 20, label: 'LAUNDRY_BASKET', color: '#C4A882' },

        // =====================================================================
        // SCREEN 2 (960-1920): TEST — Bed bounce teaching
        // Must bounce on BED to reach T3 shelf, then descend
        // =====================================================================
        // T1: Entry island
        { x: 970, y: 470, width: 80, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: BED for bounce
        { x: 1100, y: 385, width: 200, height: 24, label: 'BED', color: '#6B4470' },
        // T3: Reached via bed bounce (bounce from 385 -> ~160 player bottom, can reach 280)
        { x: 1380, y: 280, width: 90, height: 18, label: 'SHELF', color: '#8B6914' },
        // T2: Landing shelf
        { x: 1540, y: 370, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // T3: High shelf — reachable from T3 shelf with lateral jump
        { x: 1250, y: 260, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Right island
        { x: 1680, y: 475, width: 90, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // T2: Bridge to next screen
        { x: 1830, y: 380, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // =====================================================================
        // SCREEN 3 (1920-2880): VERTICAL CLIMB — Wardrobe zigzag
        // T1 -> T2 -> T3 -> T4 zigzag up wardrobe shelves
        // =====================================================================
        // T1: Wardrobe base
        { x: 1940, y: 475, width: 100, height: 22, label: 'WARDROBE', color: '#5C3D2E' },
        // T2: Shelf right
        { x: 2100, y: 380, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T3: Shelf left
        { x: 1960, y: 290, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T4: Shelf right (high reward)
        { x: 2120, y: 200, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T3: Descent shelf
        { x: 2280, y: 280, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T2: Wardrobe right platform
        { x: 2400, y: 370, width: 90, height: 22, label: 'WARDROBE', color: '#5C3D2E' },
        // T1: Landing
        { x: 2560, y: 465, width: 80, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Bridge shelf
        { x: 2700, y: 390, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Exit
        { x: 2830, y: 470, width: 80, height: 20, label: 'LAUNDRY_BASKET', color: '#C4A882' },

        // =====================================================================
        // SCREEN 4 (2880-3840): Laundry basket stepping — narrow platforms
        // Horizontal Gauntlet at T1-T2, 64px platforms, ~150px gaps
        // =====================================================================
        // T1: Entry basket
        { x: 2900, y: 480, width: 70, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Chair hop
        { x: 3030, y: 390, width: 64, height: 18, label: 'DRAWER', color: '#8B6E50' },
        // T1: Basket
        { x: 3160, y: 475, width: 70, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Dresser
        { x: 3300, y: 380, width: 80, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // T1: Basket
        { x: 3440, y: 470, width: 70, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Shelf
        { x: 3580, y: 385, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T3: Optional high reward
        { x: 3340, y: 270, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Exit
        { x: 3720, y: 475, width: 80, height: 20, label: 'DRESSER', color: '#7B5B45' },

        // =====================================================================
        // SCREEN 5 (3840-4800): CHALLENGE — Moving shelf chain
        // 4 moving shelves at T2-T3, static landings between
        // =====================================================================
        // T1: Entry basket
        { x: 3860, y: 480, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Moving shelf 1
        { x: 4000, y: 380, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 60, moveSpeed: 1.0 },
        // T1: Static landing
        { x: 4170, y: 470, width: 70, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Moving shelf 2
        { x: 4310, y: 370, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: -70, moveSpeed: 1.2 },
        // T1: Static landing
        { x: 4480, y: 475, width: 64, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T3: Moving shelf 3 (higher)
        { x: 4580, y: 280, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 65, moveSpeed: 1.0 },
        // T3: Moving shelf 4 (bonus access)
        { x: 4400, y: 260, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: -55, moveSpeed: 1.3 },
        // T2: Static shelf for descent
        { x: 4700, y: 390, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // =====================================================================
        // SCREEN 6 (4800-5760): CHALLENGE — Crumbling shelf tower
        // Vertical crumble sprint from T1 to T4, +LIFE at top
        // Static alternatives alongside
        // =====================================================================
        // T1: Entry basket
        { x: 4830, y: 475, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Solid shelf (base)
        { x: 4960, y: 385, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // T2: Crumble shelf (parallel path)
        { x: 5100, y: 370, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T3: Solid shelf
        { x: 4940, y: 280, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T3: Crumble shelf
        { x: 5120, y: 270, width: 64, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T4: Top shelf — +LIFE here (crumble!)
        { x: 4970, y: 170, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T4: Solid alternative top shelf
        { x: 5150, y: 190, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T2: Descent shelf right
        { x: 5300, y: 380, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Wardrobe safe landing
        { x: 5440, y: 465, width: 100, height: 22, label: 'WARDROBE', color: '#5C3D2E' },
        // T1: Exit
        { x: 5620, y: 475, width: 70, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },

        // =====================================================================
        // SCREEN 7 (5760-6720): RISK/REWARD — Dual-height wardrobe
        // Low safe path: T1-T2 wardrobe/dresser chain
        // High path: T3-T4 shelf climb for +HEALTH
        // =====================================================================
        // Lower safe path (T1-T2) — with moving drawers
        { x: 5790, y: 465, width: 110, height: 22, label: 'WARDROBE', color: '#5C3D2E' },
        { x: 5960, y: 390, width: 70, height: 18, label: 'DRAWER', color: '#8B6E50',
          moveX: 40, moveSpeed: 0.9 },
        { x: 6100, y: 470, width: 90, height: 20, label: 'DRESSER', color: '#7B5B45' },
        { x: 6260, y: 385, width: 64, height: 18, label: 'DRAWER', color: '#8B6E50',
          moveX: -45, moveSpeed: 1.0 },
        { x: 6400, y: 470, width: 90, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // High reward path (T3-T4 from wardrobe)
        { x: 5820, y: 290, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        { x: 5980, y: 200, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        { x: 6150, y: 280, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // T4: BED bounce platform for extreme height
        { x: 6300, y: 290, width: 100, height: 24, label: 'BED', color: '#6B4470' },
        // T1: Exit island
        { x: 6570, y: 475, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },

        // =====================================================================
        // SCREEN 8 (6720-7680): ESCALATE — Timed obstacle corridor
        // Narrow T2 platforms with timed obstacles, 170px gaps
        // =====================================================================
        // T1: Entry
        { x: 6740, y: 470, width: 70, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Platform with iron (crumbling!)
        { x: 6870, y: 380, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T2: Static alternative next to crumble
        { x: 6960, y: 395, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Landing
        { x: 7020, y: 475, width: 64, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Platform with hair straightener (crumbling!)
        { x: 7150, y: 370, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T2: Static alternative
        { x: 7240, y: 385, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Landing
        { x: 7300, y: 470, width: 64, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Platform with iron (moving!)
        { x: 7430, y: 385, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 45, moveSpeed: 1.0 },
        // T1: Safe exit
        { x: 7580, y: 465, width: 80, height: 20, label: 'DRESSER', color: '#7B5B45' },

        // =====================================================================
        // SCREEN 9 (7680-8640): ESCALATE — Moving + crumble combo
        // Crumbling T2, moving T3, must choose path quickly
        // =====================================================================
        // T1: Entry
        { x: 7700, y: 475, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Crumble shelf 1
        { x: 7850, y: 380, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T3: Moving shelf above crumble 1
        { x: 7840, y: 270, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 60, moveSpeed: 1.0 },
        // T2: Static shelf (alternative to crumble)
        { x: 7990, y: 390, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Landing
        { x: 8100, y: 470, width: 70, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Crumble shelf 2
        { x: 8240, y: 375, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T3: Moving shelf above crumble 2
        { x: 8230, y: 260, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: -65, moveSpeed: 1.2 },
        // T2: Static alternative
        { x: 8380, y: 385, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Safe dresser
        { x: 8500, y: 465, width: 90, height: 20, label: 'DRESSER', color: '#7B5B45' },

        // =====================================================================
        // SCREEN 10 (8640-9600): ESCALATE — Precision gauntlet
        // 64px platforms, 180-200px gaps, T1-T2 only
        // =====================================================================
        // T1: Entry
        { x: 8660, y: 475, width: 64, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Narrow shelf (crumbling!)
        { x: 8810, y: 380, width: 64, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T2: Static alternative
        { x: 8890, y: 395, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Tiny island
        { x: 8970, y: 470, width: 64, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Narrow shelf (moving!)
        { x: 9130, y: 375, width: 64, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: -50, moveSpeed: 1.2 },
        // T1: Tiny island
        { x: 9290, y: 480, width: 64, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Narrow shelf (moving!)
        { x: 9420, y: 370, width: 64, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 50, moveSpeed: 1.1 },
        // T1: Exit
        { x: 9550, y: 470, width: 70, height: 20, label: 'DRESSER', color: '#7B5B45' },

        // =====================================================================
        // SCREEN 11 (9600-10560): GAUNTLET — Pre-boss, all mechanics
        // Moving + crumbling + narrow + obstacles + enemies
        // =====================================================================
        // T1: Entry
        { x: 9620, y: 475, width: 70, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // T2: Moving shelf
        { x: 9760, y: 375, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 55, moveSpeed: 1.1 },
        // T1: Narrow drawer
        { x: 9920, y: 470, width: 64, height: 20, label: 'DRAWER', color: '#8B6E50' },
        // T2: Crumble shelf
        { x: 10060, y: 380, width: 64, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T2: Static alternative
        { x: 10140, y: 395, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // T1: Platform with obstacle
        { x: 10250, y: 465, width: 80, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // T2: Moving shelf (fast)
        { x: 10380, y: 370, width: 64, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: -60, moveSpeed: 1.3 },
        // T1: Final landing before boss door
        { x: 10470, y: 475, width: 80, height: 20, label: 'DRAWER', color: '#8B6E50' },

        // =====================================================================
        // SCREEN 12 (10560-11520): BOSS ARENA
        // 3 platforms for dodging boss attacks + arena ground
        // =====================================================================
        { x: 10700, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 10940, y: 300, width: 100, height: 22, label: 'DRESSER', color: '#7B5B45' },
        { x: 11200, y: 380, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard collectables + 3 +HEALTH + 1 +LIFE = 104 total
    collectables: [
        // =====================================================================
        // SCREEN 1 (0-960): 10 collectables
        // =====================================================================
        // On spawn dresser (T1)
        { x: 70, y: 470 - 32, label: 'CLOTHES', color: '#6B4470' },
        { x: 120, y: 470 - 32, label: 'PILLOW', color: '#E8D8E0' },
        // On stepping drawer (T1)
        { x: 330, y: 480 - 32, label: 'CHARGER', color: '#333333' },
        // On BED (T2)
        { x: 420, y: 390 - 32, label: 'PILLOW', color: '#F0E0D0' },
        { x: 500, y: 390 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        { x: 560, y: 390 - 32, label: 'LAUNDRY', color: '#9370DB' },
        // On landing drawer (T1)
        { x: 685, y: 475 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On dresser (T2)
        { x: 830, y: 380 - 32, label: 'CHARGER', color: '#333333' },
        { x: 870, y: 380 - 32, label: 'CLOTHES', color: '#4169E1' },
        // On exit basket (T1)
        { x: 925, y: 465 - 32, label: 'LAUNDRY', color: '#8FBC8F' },

        // =====================================================================
        // SCREEN 2 (960-1920): 10 collectables
        // =====================================================================
        // On entry drawer (T1)
        { x: 995, y: 470 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On BED (T2, before bounce)
        { x: 1150, y: 385 - 32, label: 'PILLOW', color: '#E0D0E8' },
        { x: 1220, y: 385 - 32, label: 'CLOTHES', color: '#556B2F' },
        // On T3 shelf (reached via bed bounce)
        { x: 1410, y: 280 - 32, label: 'CHARGER', color: '#333333' },
        // On high shelf T3
        { x: 1275, y: 260 - 32, label: 'PILLOW', color: '#F0E0D0' },
        // On T2 landing shelf
        { x: 1565, y: 370 - 32, label: 'LAUNDRY', color: '#B0C4DE' },
        // On right island (T1)
        { x: 1780, y: 475 - 32, label: 'CLOTHES', color: '#8B6914' },
        { x: 1810, y: 475 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On bridge shelf (T2)
        { x: 1860, y: 380 - 32, label: 'CHARGER', color: '#333333' },
        // On BED surface
        { x: 1270, y: 385 - 32, label: 'LAUNDRY', color: '#9370DB' },

        // =====================================================================
        // SCREEN 3 (1920-2880): 10 collectables
        // =====================================================================
        // On wardrobe base (T1)
        { x: 1970, y: 475 - 32, label: 'CLOTHES', color: '#556B2F' },
        { x: 2010, y: 475 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        // On T2 shelf right
        { x: 2125, y: 380 - 32, label: 'PILLOW', color: '#E8D8E0' },
        // On T3 shelf left
        { x: 1985, y: 290 - 32, label: 'CHARGER', color: '#333333' },
        // On T4 shelf right (high reward!)
        { x: 2145, y: 200 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        // On descent shelf (T3)
        { x: 2305, y: 280 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On wardrobe right (T2)
        { x: 2500, y: 370 - 32, label: 'LAUNDRY', color: '#B0C4DE' },
        // On landing (T1)
        { x: 2590, y: 465 - 32, label: 'PILLOW', color: '#F0E0D0' },
        // On bridge shelf (T2)
        { x: 2725, y: 390 - 32, label: 'CLOTHES', color: '#4169E1' },
        // On exit (T1)
        { x: 2855, y: 470 - 32, label: 'CHARGER', color: '#333333' },

        // =====================================================================
        // SCREEN 4 (2880-3840): 9 collectables + 1 +HEALTH
        // =====================================================================
        // On basket 1 (T1)
        { x: 2925, y: 480 - 32, label: 'LAUNDRY', color: '#9370DB' },
        // On T2 drawer
        { x: 3055, y: 390 - 32, label: 'PILLOW', color: '#E0D0E8' },
        // On basket 2 (T1)
        { x: 3185, y: 475 - 32, label: 'CLOTHES', color: '#6B4470' },
        // On T2 dresser
        { x: 3400, y: 380 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On basket 3 (T1)
        { x: 3465, y: 470 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        // On T2 shelf
        { x: 3605, y: 385 - 32, label: 'CHARGER', color: '#333333' },
        // On T3 optional high shelf
        { x: 3365, y: 270 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        // On exit dresser (T1)
        { x: 3750, y: 475 - 32, label: 'PILLOW', color: '#E8D8E0' },
        // On T2 dresser
        { x: 3420, y: 380 - 32, label: 'SLIPPER', color: '#D2691E' },
        // +HEALTH on T3 high shelf (reward for risky jump)
        { x: 3370, y: 270 - 32, label: '+HEALTH', color: '#00FF00' },

        // =====================================================================
        // SCREEN 5 (3840-4800): 9 collectables
        // =====================================================================
        // On entry basket (T1)
        { x: 3890, y: 480 - 32, label: 'LAUNDRY', color: '#B0C4DE' },
        // On moving shelf 1 (T2)
        { x: 4100, y: 380 - 32, label: 'CLOTHES', color: '#556B2F' },
        // On T1 landing
        { x: 4195, y: 470 - 32, label: 'PILLOW', color: '#F0E0D0' },
        // On moving shelf 2 (T2)
        { x: 4415, y: 370 - 32, label: 'CHARGER', color: '#333333' },
        // On T1 landing
        { x: 4500, y: 475 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On moving shelf 3 (T3)
        { x: 4610, y: 280 - 32, label: 'CLOTHES', color: '#8B6914' },
        // On moving shelf 4 (T3 bonus)
        { x: 4430, y: 260 - 32, label: 'LAUNDRY', color: '#9370DB' },
        // On static descent shelf (T2)
        { x: 4730, y: 390 - 32, label: 'PILLOW', color: '#E8D8E0' },
        // On T1 landing
        { x: 4510, y: 475 - 32, label: 'CHARGER', color: '#333333' },

        // =====================================================================
        // SCREEN 6 (4800-5760): 8 collectables + 1 +LIFE
        // =====================================================================
        // On entry basket (T1)
        { x: 4860, y: 475 - 32, label: 'CLOTHES', color: '#4169E1' },
        // On solid shelf T2
        { x: 5060, y: 385 - 32, label: 'PILLOW', color: '#E0D0E8' },
        // On crumble T2
        { x: 5115, y: 370 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        // On solid T3
        { x: 4965, y: 280 - 32, label: 'CHARGER', color: '#333333' },
        // On descent shelf T2
        { x: 5330, y: 380 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On wardrobe landing T1
        { x: 5475, y: 465 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        // On exit T1
        { x: 5645, y: 475 - 32, label: 'LAUNDRY', color: '#B0C4DE' },
        // On solid T4 alternative
        { x: 5175, y: 190 - 32, label: 'PILLOW', color: '#F0E0D0' },
        // +LIFE at T4 crumble top!
        { x: 4995, y: 170 - 32, label: '+LIFE', color: '#FF1493' },

        // =====================================================================
        // SCREEN 7 (5760-6720): 9 collectables (5 low path, 3 high + 1 +HEALTH)
        // =====================================================================
        // Lower safe path (5)
        { x: 5830, y: 465 - 32, label: 'CLOTHES', color: '#556B2F' },
        { x: 5985, y: 390 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        { x: 6200, y: 470 - 32, label: 'PILLOW', color: '#E8D8E0' },
        { x: 6285, y: 385 - 32, label: 'SLIPPER', color: '#D2691E' },
        { x: 6430, y: 470 - 32, label: 'CHARGER', color: '#333333' },
        // High reward path (3 bonus + +HEALTH)
        { x: 5845, y: 290 - 32, label: 'CLOTHES', color: '#8B6914' },
        { x: 6005, y: 200 - 32, label: 'LAUNDRY', color: '#9370DB' },
        { x: 6175, y: 280 - 32, label: 'PILLOW', color: '#F0E0D0' },
        // +HEALTH on high T4 shelf
        { x: 6020, y: 200 - 32, label: '+HEALTH', color: '#00FF00' },
        // Exit
        { x: 6595, y: 475 - 32, label: 'SLIPPER', color: '#D2691E' },

        // =====================================================================
        // SCREEN 8 (6720-7680): 8 collectables
        // =====================================================================
        // On T1 entry
        { x: 6765, y: 470 - 32, label: 'LAUNDRY', color: '#B0C4DE' },
        // On T2 platforms (between timed obstacles)
        { x: 6970, y: 380 - 32, label: 'PILLOW', color: '#E0D0E8' },
        // On T1 landing
        { x: 7045, y: 475 - 32, label: 'CLOTHES', color: '#4169E1' },
        // On T2 platform
        { x: 7250, y: 370 - 32, label: 'CHARGER', color: '#333333' },
        // On T1 landing
        { x: 7325, y: 470 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On T2 platform
        { x: 7530, y: 385 - 32, label: 'LAUNDRY', color: '#9370DB' },
        // On T1 safe exit
        { x: 7610, y: 465 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        // On T2 platform
        { x: 7250, y: 370 - 32, label: 'PILLOW', color: '#F0E0D0' },

        // =====================================================================
        // SCREEN 9 (7680-8640): 9 collectables + 1 +HEALTH
        // =====================================================================
        // On T1 entry
        { x: 7730, y: 475 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        // On crumble shelf T2
        { x: 7880, y: 380 - 32, label: 'CLOTHES', color: '#6B4470' },
        // On moving shelf T3
        { x: 7870, y: 270 - 32, label: 'PILLOW', color: '#E8D8E0' },
        // On static T2
        { x: 8085, y: 390 - 32, label: 'CHARGER', color: '#333333' },
        // On T1 landing
        { x: 8125, y: 470 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On crumble shelf T2
        { x: 8270, y: 375 - 32, label: 'LAUNDRY', color: '#B0C4DE' },
        // On moving shelf T3
        { x: 8260, y: 260 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        // On safe dresser T1
        { x: 8535, y: 465 - 32, label: 'PILLOW', color: '#F0E0D0' },
        // On static T2
        { x: 8475, y: 385 - 32, label: 'CHARGER', color: '#333333' },
        // +HEALTH on T3 moving shelf (tricky)
        { x: 8250, y: 260 - 32, label: '+HEALTH', color: '#00FF00' },

        // =====================================================================
        // SCREEN 10 (8640-9600): 8 collectables
        // =====================================================================
        // On T1 entry
        { x: 8685, y: 475 - 32, label: 'CLOTHES', color: '#8B6914' },
        // On T2 shelf
        { x: 8905, y: 380 - 32, label: 'LAUNDRY', color: '#9370DB' },
        // On T1 island
        { x: 8995, y: 470 - 32, label: 'PILLOW', color: '#E0D0E8' },
        // On T2 shelf
        { x: 9225, y: 375 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On T1 island
        { x: 9315, y: 480 - 32, label: 'CHARGER', color: '#333333' },
        // On moving T2 shelf
        { x: 9445, y: 370 - 32, label: 'CLOTHES', color: '#4169E1' },
        // On T1 exit
        { x: 9575, y: 470 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        // On T2 shelf
        { x: 9225, y: 375 - 32, label: 'PILLOW', color: '#E8D8E0' },

        // =====================================================================
        // SCREEN 11 (9600-10560): 10 collectables
        // =====================================================================
        // On T1 entry
        { x: 9645, y: 475 - 32, label: 'LAUNDRY', color: '#B0C4DE' },
        // On moving shelf T2
        { x: 9790, y: 375 - 32, label: 'CLOTHES', color: '#556B2F' },
        // On T1 drawer
        { x: 10015, y: 470 - 32, label: 'PILLOW', color: '#F0E0D0' },
        // On crumble T2
        { x: 10085, y: 380 - 32, label: 'SLIPPER', color: '#D2691E' },
        // On static T2
        { x: 10235, y: 395 - 32, label: 'CHARGER', color: '#333333' },
        // On T1 dresser
        { x: 10350, y: 465 - 32, label: 'LAUNDRY', color: '#9370DB' },
        // On moving T2
        { x: 10405, y: 370 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        // On T1 final landing
        { x: 10500, y: 475 - 32, label: 'PILLOW', color: '#E8D8E0' },
        // On static T2
        { x: 10235, y: 395 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        // On T1 dresser
        { x: 10370, y: 465 - 32, label: 'SLIPPER', color: '#D2691E' },

        // =====================================================================
        // ADDITIONAL COLLECTABLES — air trails, jump arcs, high platform clusters
        // =====================================================================

        // SCREEN 1: Air trail between spawn dresser and BED
        { x: 200, y: 440 - 32, label: 'CLOTHES', color: '#556B2F' },
        { x: 260, y: 420 - 32, label: 'PILLOW', color: '#E0D0E8' },
        { x: 320, y: 400 - 32, label: 'LAUNDRY', color: '#9370DB' },

        // SCREEN 2: Arc from BED bounce to T3 shelf
        { x: 1310, y: 330 - 32, label: 'SLIPPER', color: '#D2691E' },
        { x: 1350, y: 300 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        { x: 1460, y: 260 - 32, label: 'LAUNDRY', color: '#B0C4DE' },

        // SCREEN 3: Vertical cluster up wardrobe shelves
        { x: 2060, y: 340 - 32, label: 'CHARGER', color: '#333333' },
        { x: 2060, y: 250 - 32, label: 'PILLOW', color: '#F0E0D0' },
        { x: 2200, y: 230 - 32, label: 'SLIPPER', color: '#D2691E' },

        // SCREEN 4: Air trail between baskets
        { x: 3050, y: 440 - 32, label: 'LAUNDRY', color: '#8FBC8F' },
        { x: 3100, y: 430 - 32, label: 'CLOTHES', color: '#4169E1' },
        { x: 3300, y: 440 - 32, label: 'PILLOW', color: '#E8D8E0' },

        // SCREEN 5: Arc above moving shelves
        { x: 4250, y: 330 - 32, label: 'CHARGER', color: '#333333' },
        { x: 4350, y: 310 - 32, label: 'LAUNDRY', color: '#9370DB' },
        { x: 4550, y: 320 - 32, label: 'CLOTHES', color: '#8B6914' },

        // SCREEN 6: High risk cluster near T4
        { x: 5100, y: 220 - 32, label: 'SLIPPER', color: '#D2691E' },
        { x: 5140, y: 200 - 32, label: 'PILLOW', color: '#E0D0E8' },

        // SCREEN 7: Air trail on high reward path
        { x: 5920, y: 250 - 32, label: 'CHARGER', color: '#333333' },
        { x: 6080, y: 230 - 32, label: 'CLOTHES', color: '#6B4470' },
        { x: 6250, y: 250 - 32, label: 'LAUNDRY', color: '#B0C4DE' },

        // SCREEN 8: Between T2 platforms (jump arc)
        { x: 7100, y: 340 - 32, label: 'PILLOW', color: '#E8D8E0' },
        { x: 7180, y: 330 - 32, label: 'SLIPPER', color: '#D2691E' },
        { x: 7400, y: 340 - 32, label: 'LAUNDRY', color: '#8FBC8F' },

        // SCREEN 9: Air trail near moving T3 shelves
        { x: 7950, y: 310 - 32, label: 'CLOTHES', color: '#CD5C5C' },
        { x: 8150, y: 300 - 32, label: 'CHARGER', color: '#333333' },
        { x: 8350, y: 310 - 32, label: 'PILLOW', color: '#F0E0D0' },

        // SCREEN 10: Cluster on T2 jump paths
        { x: 9050, y: 340 - 32, label: 'LAUNDRY', color: '#9370DB' },
        { x: 9380, y: 330 - 32, label: 'CLOTHES', color: '#556B2F' },

        // SCREEN 12 (10560-11520): BOSS ARENA — 0 standard collectables
        // =====================================================================
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // === SCREEN 1: 1 PLUG on T1 stepping drawer ===
        { x: 280, y: 480 - 22, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // === SCREEN 2: 1 CABLE on T1 right island ===
        { x: 1720, y: 475 - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },

        // === SCREEN 3: 1 IRON (timed) on T2 shelf ===
        { x: 2440, y: 370 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },

        // === SCREEN 4: 1 HAIR_STRAIGHTENER on T2 dresser ===
        { x: 3340, y: 380 - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0 },

        // === SCREEN 5: 2 timed obstacles on T2 shelves ===
        { x: 4050, y: 380 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 4360, y: 370 - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 1.0 },

        // === SCREEN 6: 2 timed obstacles on T2 shelves ===
        { x: 5010, y: 385 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 5160, y: 370 - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.8 },

        // === SCREEN 7: 1 CABLE on T1 dresser ===
        { x: 6140, y: 470 - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },

        // === SCREEN 8: 3 timed obstacles ON T2 platforms ===
        { x: 6910, y: 380 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 7190, y: 370 - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },
        { x: 7470, y: 385 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 1.0 },

        // === SCREEN 9: 2 timed obstacles on T2 ===
        { x: 8030, y: 390 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 8420, y: 385 - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },

        // === SCREEN 10: 2 timed obstacles on T2 ===
        { x: 8855, y: 380 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 9175, y: 375 - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.8 },

        // === SCREEN 11: 3 mixed obstacles ===
        { x: 9960, y: 470 - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 10185, y: 395 - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0.5 },
        { x: 10290, y: 465 - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // === SCREEN 1: 1 MOTH on BED (T2) ===
        { x: 450, y: 390 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 120, behavior: 'jumper' },

        // === SCREEN 2: 1 ALARM_CLOCK on T2 landing shelf ===
        { x: 1560, y: 370 - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 100, behavior: 'charger' },

        // === SCREEN 3: 1 LAUNDRY_MONSTER on T2 wardrobe right ===
        { x: 2430, y: 370 - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 100, behavior: 'shooter' },

        // === SCREEN 4: 1 MOTH on T1 basket + 1 ALARM_CLOCK on T2 ===
        { x: 3180, y: 475 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80, behavior: 'jumper' },
        { x: 3420, y: 380 - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90, behavior: 'charger' },

        // === SCREEN 5: 1 ALARM_CLOCK on T1 + 1 MOTH on T2 moving ===
        { x: 4190, y: 470 - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 80, behavior: 'charger' },
        { x: 4720, y: 390 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 100, behavior: 'jumper' },

        // === SCREEN 6: 1 LAUNDRY_MONSTER on T2 + 1 MOTH on T1 ===
        { x: 5320, y: 380 - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 100, behavior: 'shooter' },
        { x: 5500, y: 465 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 90, behavior: 'jumper' },

        // === SCREEN 7: 1 MOTH on T1 dresser + 1 ALARM_CLOCK on T2 ===
        { x: 6420, y: 470 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 100, behavior: 'jumper' },
        { x: 6290, y: 385 - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 80, behavior: 'charger' },

        // === SCREEN 8: 1 ALARM_CLOCK on T1 + 1 LAUNDRY_MONSTER on T2 ===
        { x: 7040, y: 475 - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 80, behavior: 'charger' },
        { x: 7460, y: 385 - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 100, behavior: 'shooter' },

        // === SCREEN 9: 1 MOTH on T1 + 1 SPIDER on T2 + 1 LAUNDRY_MONSTER on T2 ===
        { x: 8120, y: 470 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80, behavior: 'jumper' },
        { x: 8400, y: 385 - 22, width: 22, height: 22, label: 'SPIDER', color: '#333333', patrolRange: 80 },
        { x: 8200, y: 390 - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 80, behavior: 'shooter' },

        // === SCREEN 10: 1 LAUNDRY_MONSTER on T2 + 1 MOTH on T1 + 1 ALARM_CLOCK on T2 ===
        { x: 8830, y: 380 - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 80, behavior: 'shooter' },
        { x: 9310, y: 480 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80, behavior: 'jumper' },
        { x: 9150, y: 375 - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90, behavior: 'charger' },

        // === SCREEN 11: 2 MOTH on T1 + 1 LAUNDRY_MONSTER on T2 + 1 ALARM_CLOCK on T1 ===
        { x: 9940, y: 470 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80, behavior: 'jumper' },
        { x: 10490, y: 475 - 25, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80, behavior: 'jumper' },
        { x: 10270, y: 465 - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 100, behavior: 'shooter' },
        { x: 10120, y: 470 - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 80, behavior: 'charger' },
    ],
};
