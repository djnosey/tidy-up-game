// Level 1: Living Room
// 11 screen widths (10,560px at 960px canvas width)
// 100 standard collectables + 3 +HEALTH + 1 +LIFE

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 11; // 10560

export const level1 = {
    name: 'Living Room',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#D4C4A8', // warm beige
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 10 - 90, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 10,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 10 + 700,
        y: GROUND_Y - 50,
        label: 'MEGA ROOMBA',
        color: '#555555',
        width: 96,
        height: 50,
        health: 3,
        speed: 280,
        attacks: ['charge', 'shoot', 'charge', 'suction'],
    },

    // ========== DECORATIONS ==========
    decorations: [
        // === ARCHITECTURAL (spans full level) ===
        { x: 0, y: 8, type: 'cornice', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 250, type: 'dado_rail', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },

        // === SCREEN 1 (0-960): Sofa intro ===
        { x: 300, y: 80, type: 'ceiling_light', size: 45, color: '#F5E6C8' },
        { x: 500, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 480, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        { x: 600, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        { x: 200, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#8B0000' },
        { x: 60, y: GROUND_Y - 320, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 120, y: GROUND_Y - 340, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        { x: 30, y: GROUND_Y - 40, emoji: '🪴', size: 35 },
        { x: 140, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D0A0' },
        { x: 700, y: GROUND_Y - 340, type: 'wall_art', w: 55, h: 42, color: '#B8860B' },
        { x: 860, y: GROUND_Y - 360, emoji: '🕰️', size: 30 },
        { x: 495, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 35 },
        { x: 420, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 630, y: GROUND_Y - 6, type: 'power_strip', w: 40 },
        { x: 300, y: GROUND_Y - 250, type: 'dust_motes' },

        // === SCREEN 2 (960-1920): Coffee table area ===
        { x: 1350, y: 75, type: 'ceiling_light', size: 50, color: '#E8D8C0' },
        { x: 1150, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: 1135, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 1240, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 1400, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#3B5323' },
        { x: 1000, y: GROUND_Y - 350, type: 'wall_art', w: 40, h: 35, color: '#654321' },
        { x: 1600, y: GROUND_Y - 340, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 1650, y: GROUND_Y - 355, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 1800, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        { x: 1145, y: GROUND_Y - 50, type: 'radiator', w: 90, h: 30 },
        { x: 1880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 1750, y: GROUND_Y - 6, type: 'power_strip', w: 38 },
        { x: 1200, y: GROUND_Y - 200, type: 'dust_motes' },

        // === SCREEN 3 (1920-2880): Bookshelf tower ===
        { x: 2400, y: 70, type: 'ceiling_light', size: 42, color: '#F0E0C8' },
        { x: 2500, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 2482, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        { x: 2593, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        { x: 2100, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#8B0000' },
        { x: 1970, y: GROUND_Y - 330, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 2700, y: GROUND_Y - 340, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        { x: 2760, y: GROUND_Y - 355, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 2850, y: GROUND_Y - 38, emoji: '🪴', size: 32 },
        { x: 2495, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 2050, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2750, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2300, y: GROUND_Y - 280, type: 'dust_motes' },

        // === SCREEN 4 (2880-3840): Rest then moving frames ===
        { x: 3300, y: 80, type: 'ceiling_light', size: 48, color: '#F5E6C8' },
        { x: 3100, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 3080, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        { x: 3200, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        { x: 2950, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#3B5323' },
        { x: 3500, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#654321' },
        { x: 2920, y: GROUND_Y - 320, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 3700, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 3095, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 35 },
        { x: 3400, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3750, y: GROUND_Y - 6, type: 'power_strip', w: 40 },
        { x: 3350, y: GROUND_Y - 260, type: 'dust_motes' },
        { x: 2920, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D0A0' },

        // === SCREEN 5 (3840-4800): TV unit gauntlet ===
        { x: 4300, y: 70, type: 'ceiling_light', size: 50, color: '#E8D8C0' },
        { x: 4100, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: 4085, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 4190, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 4200, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#8B0000' },
        { x: 3900, y: GROUND_Y - 340, type: 'wall_art', w: 45, h: 35, color: '#B8860B' },
        { x: 4600, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#654321' },
        { x: 4750, y: GROUND_Y - 38, emoji: '🪴', size: 28 },
        { x: 4095, y: GROUND_Y - 50, type: 'radiator', w: 90, h: 30 },
        { x: 3880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4700, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4400, y: GROUND_Y - 250, type: 'dust_motes' },
        { x: 4500, y: GROUND_Y - 180, type: 'wall_shelf_deco', w: 60, items: ['📕', '🏆', '🕯️'] },

        // === SCREEN 6 (4800-5760): High path choice ===
        { x: 5300, y: 80, type: 'ceiling_light', size: 45, color: '#F0E0C8' },
        { x: 5400, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 5382, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        { x: 5493, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        { x: 5000, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#3B5323' },
        { x: 4850, y: GROUND_Y - 340, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 5600, y: GROUND_Y - 330, type: 'family_photo', w: 32, h: 28, color: '#8B6914' },
        { x: 5700, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        { x: 5395, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 5100, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 5200, y: GROUND_Y - 6, type: 'power_strip', w: 38 },
        { x: 5300, y: GROUND_Y - 280, type: 'dust_motes' },
        { x: 4830, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#D8C8A0' },

        // === SCREEN 7 (5760-6720): Crumbling tower ===
        { x: 6200, y: 70, type: 'ceiling_light', size: 42, color: '#E8D0B0' },
        { x: 6000, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: 5985, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 6090, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 5900, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#8B0000' },
        { x: 5800, y: GROUND_Y - 340, type: 'wall_art', w: 45, h: 35, color: '#654321' },
        { x: 6400, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 6600, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 5995, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 5830, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 6500, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 6100, y: GROUND_Y - 300, type: 'dust_motes' },
        { x: 6680, y: GROUND_Y - 360, emoji: '🕰️', size: 28 },

        // === SCREEN 8 (6720-7680): Moving platform chain ===
        { x: 7200, y: 80, type: 'ceiling_light', size: 50, color: '#F5E6C8' },
        { x: 7400, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 7380, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        { x: 7500, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        { x: 6900, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#3B5323' },
        { x: 6770, y: GROUND_Y - 330, type: 'wall_art', w: 55, h: 42, color: '#654321' },
        { x: 7300, y: GROUND_Y - 340, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        { x: 7600, y: GROUND_Y - 40, emoji: '🪴', size: 28 },
        { x: 7395, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 35 },
        { x: 6800, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 7550, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 7100, y: GROUND_Y - 260, type: 'dust_motes' },
        { x: 6750, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D0A0' },

        // === SCREEN 9 (7680-8640): Crumble sprint ===
        { x: 8100, y: 70, type: 'ceiling_light', size: 45, color: '#E8D8C0' },
        { x: 8300, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 8282, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        { x: 8393, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        { x: 7850, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#8B0000' },
        { x: 7730, y: GROUND_Y - 340, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 8500, y: GROUND_Y - 350, type: 'family_photo', w: 32, h: 28, color: '#8B6914' },
        { x: 8580, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 8295, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 7750, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 8450, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 8200, y: GROUND_Y - 280, type: 'dust_motes' },

        // === SCREEN 10 (8640-9600): Pre-boss gauntlet ===
        { x: 9100, y: 80, type: 'ceiling_light', size: 48, color: '#F0E0C8' },
        { x: 8900, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: 8885, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 8990, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 8800, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#3B5323' },
        { x: 9200, y: GROUND_Y - 340, type: 'wall_art', w: 55, h: 42, color: '#B8860B' },
        { x: 9400, y: GROUND_Y - 350, type: 'wall_art', w: 45, h: 35, color: '#654321' },
        { x: 8700, y: GROUND_Y - 320, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 9550, y: GROUND_Y - 40, emoji: '🪴', size: 28 },
        { x: 8895, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 8750, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 9450, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 9000, y: GROUND_Y - 260, type: 'dust_motes' },
        { x: 8680, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#D8C8A0' },
        // Boss doorway
        { x: CANVAS_W * 10 - 90, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SCREEN 11 (9600-10560): Boss arena ===
        { x: 10100, y: 60, type: 'ceiling_light', size: 55, color: '#E8D0B0' },
        { x: 10000, y: GROUND_Y - 5, type: 'rug', w: 500, h: 12, color: '#4A0808' },
        { x: 9700, y: GROUND_Y - 350, type: 'wall_art', w: 60, h: 45, color: '#B8860B' },
        { x: 10350, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#654321' },
        { x: 9850, y: GROUND_Y - 370, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 10200, y: GROUND_Y - 380, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        { x: 9650, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 10480, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        { x: 9750, y: GROUND_Y - 50, type: 'radiator', w: 80, h: 30 },
        { x: 10350, y: GROUND_Y - 50, type: 'radiator', w: 80, h: 30 },
        { x: 9800, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 10400, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 10050, y: GROUND_Y - 400, emoji: '🕰️', size: 32 },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#8B7355' },

        // === SCREEN 1 (0-960): TEACH - Sofa intro ===
        // Easy hops: sofa -> table -> shelf, gaps ~80-100px
        { x: 160, y: GROUND_Y - 60, width: 220, height: 24, label: 'SOFA', color: '#6B4226' },
        { x: 460, y: GROUND_Y - 40, width: 120, height: 14, label: 'TABLE', color: '#A0522D' },
        { x: 680, y: GROUND_Y - 90, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 850, y: GROUND_Y - 60, width: 80, height: 24, label: 'SOFA', color: '#6B4226' },

        // === SCREEN 2 (960-1920): TEST - Coffee table area ===
        // Small gaps 100-120px, shelf climb stepping up ~70px each
        { x: 1000, y: GROUND_Y - 45, width: 120, height: 14, label: 'TABLE', color: '#A0522D' },
        { x: 1200, y: GROUND_Y - 60, width: 120, height: 24, label: 'SOFA', color: '#6B4226' },
        // Shelf climb: 3 shelves stepping up ~70px, zigzag
        { x: 1420, y: GROUND_Y - 80, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 1560, y: GROUND_Y - 150, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 1420, y: GROUND_Y - 220, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // Landing after climb
        { x: 1700, y: GROUND_Y - 60, width: 140, height: 22, label: 'ARMCHAIR', color: '#6B4226' },

        // === SCREEN 3 (1920-2880): VERTICAL CLIMB - Bookshelf tower ===
        // 4-tier bookshelf: 70px vertical steps, zigzag left-right
        { x: 2000, y: GROUND_Y - 60, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 2130, y: GROUND_Y - 130, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 2000, y: GROUND_Y - 200, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 2130, y: GROUND_Y - 270, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        // Landing platforms after tower
        { x: 2300, y: GROUND_Y - 60, width: 140, height: 24, label: 'SOFA', color: '#6B4226' },
        { x: 2520, y: GROUND_Y - 50, width: 120, height: 14, label: 'TABLE', color: '#A0522D' },
        { x: 2720, y: GROUND_Y - 60, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 4 (2880-3840): REST -> TEST - Moving frames ===
        // Rest area: wide sofa
        { x: 2920, y: GROUND_Y - 60, width: 220, height: 24, label: 'SOFA', color: '#6B4226' },
        // Transition platform
        { x: 3200, y: GROUND_Y - 50, width: 70, height: 14, label: 'CHAIR', color: '#8B4513' },
        // 3 moving FRAME platforms
        { x: 3350, y: GROUND_Y - 120, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 60, moveSpeed: 0.8 },
        { x: 3500, y: GROUND_Y - 160, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -70, moveSpeed: 1.2 },
        { x: 3650, y: GROUND_Y - 130, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 80, moveSpeed: 1.4 },
        // Landing after frames
        { x: 3780, y: GROUND_Y - 60, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 5 (3840-4800): CHALLENGE - TV unit gauntlet ===
        // Narrow platforms, 150px gaps
        { x: 3900, y: GROUND_Y - 50, width: 70, height: 14, label: 'CHAIR', color: '#8B4513' },
        // 2 crumbling cushion platforms
        { x: 4050, y: GROUND_Y - 100, width: 60, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 2.5 },
        { x: 4200, y: GROUND_Y - 80, width: 60, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 2.5 },
        // TV UNIT as main platform
        { x: 4350, y: GROUND_Y - 50, width: 220, height: 20, label: 'TV UNIT', color: '#2F2F2F' },
        // Exit platform
        { x: 4650, y: GROUND_Y - 80, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 6 (4800-5760): REST -> RISK/REWARD - High path choice ===
        // Safe ground path
        { x: 4850, y: GROUND_Y - 55, width: 140, height: 22, label: 'ARMCHAIR', color: '#6B4226' },
        { x: 5060, y: GROUND_Y - 60, width: 220, height: 24, label: 'SOFA', color: '#6B4226' },
        { x: 5360, y: GROUND_Y - 40, width: 120, height: 14, label: 'TABLE', color: '#A0522D' },
        { x: 5560, y: GROUND_Y - 55, width: 140, height: 22, label: 'ARMCHAIR', color: '#6B4226' },
        // High shelf path (bonus route)
        { x: 5050, y: GROUND_Y - 160, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 5220, y: GROUND_Y - 250, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 5400, y: GROUND_Y - 280, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 7 (5760-6720): CHALLENGE - Crumbling tower ===
        // 5-tier shelf tower, top 2 crumble
        { x: 5850, y: GROUND_Y - 60, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 5980, y: GROUND_Y - 130, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 5850, y: GROUND_Y - 200, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 5980, y: GROUND_Y - 270, width: 80, height: 20, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 5850, y: GROUND_Y - 340, width: 80, height: 20, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Landing after tower
        { x: 6150, y: GROUND_Y - 60, width: 120, height: 24, label: 'SOFA', color: '#6B4226' },
        { x: 6350, y: GROUND_Y - 50, width: 120, height: 14, label: 'TABLE', color: '#A0522D' },
        { x: 6550, y: GROUND_Y - 60, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 8 (6720-7680): ESCALATE - Moving platform chain ===
        // Start platform
        { x: 6750, y: GROUND_Y - 60, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        // 5 moving FRAME platforms, staggered
        { x: 6900, y: GROUND_Y - 120, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 60, moveSpeed: 0.8 },
        { x: 7060, y: GROUND_Y - 160, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -70, moveSpeed: 1.0 },
        { x: 7220, y: GROUND_Y - 130, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 80, moveSpeed: 1.2 },
        { x: 7380, y: GROUND_Y - 170, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -60, moveSpeed: 1.4 },
        { x: 7540, y: GROUND_Y - 140, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 70, moveSpeed: 1.0 },
        // End landing
        { x: 7620, y: GROUND_Y - 60, width: 80, height: 24, label: 'SOFA', color: '#6B4226' },

        // === SCREEN 9 (7680-8640): ESCALATE - Crumble sprint ===
        // 4 crumbling platforms in a row with 1-2 static rest points
        { x: 7750, y: GROUND_Y - 80, width: 70, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 2.5 },
        { x: 7900, y: GROUND_Y - 100, width: 70, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 2.5 },
        // Brief static rest
        { x: 8050, y: GROUND_Y - 80, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        // More crumbling
        { x: 8200, y: GROUND_Y - 100, width: 70, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 2.5 },
        { x: 8350, y: GROUND_Y - 80, width: 70, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 2.5 },
        // Final static rest
        { x: 8500, y: GROUND_Y - 60, width: 120, height: 24, label: 'SOFA', color: '#6B4226' },

        // === SCREEN 10 (8640-9600): GAUNTLET - Pre-boss ===
        // Mix of ALL mechanics: static, moving, crumbling, 200px gaps
        { x: 8700, y: GROUND_Y - 80, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 8900, y: GROUND_Y - 120, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 70, moveSpeed: 1.2 },
        { x: 9080, y: GROUND_Y - 100, width: 70, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 2.5 },
        { x: 9230, y: GROUND_Y - 80, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 9380, y: GROUND_Y - 130, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -60, moveSpeed: 1.0 },
        { x: 9500, y: GROUND_Y - 60, width: 70, height: 14, label: 'TABLE', color: '#A0522D' },

        // === SCREEN 11 (9600-10560): BOSS ARENA ===
        // 3 shelf platforms for dodging boss
        { x: 9750, y: GROUND_Y - 120, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 10050, y: GROUND_Y - 150, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 10350, y: GROUND_Y - 120, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard items + 3 +HEALTH + 1 +LIFE = 104 total
    collectables: [
        // === SCREEN 1 (12 items) ===
        // On/near sofa
        { x: 200, y: GROUND_Y - 95, label: 'REMOTE', color: '#333' },
        { x: 260, y: GROUND_Y - 95, label: 'MUG', color: '#8B4513' },
        { x: 330, y: GROUND_Y - 95, label: 'MAGAZINE', color: '#4682B4' },
        // On table
        { x: 490, y: GROUND_Y - 72, label: 'GLASSES', color: '#C0C0C0' },
        { x: 540, y: GROUND_Y - 72, label: 'COASTER', color: '#D2691E' },
        // On shelf
        { x: 700, y: GROUND_Y - 120, label: 'BOOK', color: '#8B0000' },
        { x: 740, y: GROUND_Y - 120, label: 'GLASS', color: '#87CEEB' },
        // On exit sofa
        { x: 870, y: GROUND_Y - 95, label: 'CUSHION', color: '#CD853F' },
        // On ground between platforms
        { x: 400, y: GROUND_Y - 30, label: 'SOCKS', color: '#4169E1' },
        { x: 620, y: GROUND_Y - 30, label: 'PHONE', color: '#333' },
        { x: 780, y: GROUND_Y - 30, label: 'KEYS', color: '#FFD700' },
        { x: 930, y: GROUND_Y - 30, label: 'BLANKET', color: '#FFB6C1' },

        // === SCREEN 2 (12 items) ===
        // On table
        { x: 1030, y: GROUND_Y - 77, label: 'MAGAZINE', color: '#4682B4' },
        { x: 1080, y: GROUND_Y - 77, label: 'MUG', color: '#8B4513' },
        // On sofa
        { x: 1230, y: GROUND_Y - 95, label: 'REMOTE', color: '#333' },
        { x: 1290, y: GROUND_Y - 95, label: 'CUSHION', color: '#CD853F' },
        // On shelf climb
        { x: 1450, y: GROUND_Y - 112, label: 'BOOK', color: '#8B0000' },
        { x: 1590, y: GROUND_Y - 182, label: 'BOOK', color: '#006400' },
        { x: 1450, y: GROUND_Y - 252, label: 'GLASSES', color: '#C0C0C0' },
        // On armchair
        { x: 1740, y: GROUND_Y - 95, label: 'BLANKET', color: '#FFB6C1' },
        // Ground items
        { x: 1150, y: GROUND_Y - 30, label: 'SOCKS', color: '#4169E1' },
        { x: 1350, y: GROUND_Y - 30, label: 'COASTER', color: '#D2691E' },
        { x: 1560, y: GROUND_Y - 30, label: 'HEADPHONES', color: '#333' },
        { x: 1870, y: GROUND_Y - 30, label: 'PHONE', color: '#333' },

        // === SCREEN 3 (10 items) ===
        // Bookshelf tower climb items
        { x: 2020, y: GROUND_Y - 92, label: 'BOOK', color: '#654321' },
        { x: 2150, y: GROUND_Y - 162, label: 'BOOK', color: '#8B0000' },
        { x: 2020, y: GROUND_Y - 232, label: 'SOCKS', color: '#4169E1' },
        { x: 2150, y: GROUND_Y - 302, label: 'COASTER', color: '#D2691E' },
        // Landing area items
        { x: 2340, y: GROUND_Y - 95, label: 'MAGAZINE', color: '#4682B4' },
        { x: 2400, y: GROUND_Y - 95, label: 'MUG', color: '#8B4513' },
        { x: 2550, y: GROUND_Y - 82, label: 'KEYS', color: '#FFD700' },
        { x: 2740, y: GROUND_Y - 92, label: 'GLASS', color: '#87CEEB' },
        // Ground
        { x: 2200, y: GROUND_Y - 30, label: 'BLANKET', color: '#FFB6C1' },
        { x: 2640, y: GROUND_Y - 30, label: 'PHONE', color: '#333' },

        // === SCREEN 4 (10 items) ===
        // Rest area on sofa (4-5 easy ground items)
        { x: 2960, y: GROUND_Y - 95, label: 'REMOTE', color: '#333' },
        { x: 3020, y: GROUND_Y - 95, label: 'CUSHION', color: '#CD853F' },
        { x: 3080, y: GROUND_Y - 95, label: 'MUG', color: '#8B4513' },
        { x: 2960, y: GROUND_Y - 30, label: 'SOCKS', color: '#228B22' },
        { x: 3150, y: GROUND_Y - 30, label: 'MAGAZINE', color: '#4682B4' },
        // On moving frames
        { x: 3365, y: GROUND_Y - 152, label: 'GLASSES', color: '#C0C0C0' },
        { x: 3515, y: GROUND_Y - 192, label: 'HEADPHONES', color: '#333' },
        { x: 3665, y: GROUND_Y - 162, label: 'BOOK', color: '#8B0000' },
        // Landing
        { x: 3800, y: GROUND_Y - 92, label: 'GLASS', color: '#87CEEB' },
        { x: 3750, y: GROUND_Y - 30, label: 'KEYS', color: '#FFD700' },

        // === SCREEN 5 (10 items) ===
        // On chair
        { x: 3920, y: GROUND_Y - 82, label: 'COASTER', color: '#D2691E' },
        // On crumbling cushions (reward for bravery)
        { x: 4065, y: GROUND_Y - 132, label: 'PHONE', color: '#333' },
        { x: 4215, y: GROUND_Y - 112, label: 'BLANKET', color: '#FFB6C1' },
        // On TV unit
        { x: 4400, y: GROUND_Y - 82, label: 'REMOTE', color: '#333' },
        { x: 4460, y: GROUND_Y - 82, label: 'MAGAZINE', color: '#4682B4' },
        { x: 4520, y: GROUND_Y - 82, label: 'MUG', color: '#8B4513' },
        // On exit shelf
        { x: 4670, y: GROUND_Y - 112, label: 'BOOK', color: '#006400' },
        // Ground
        { x: 3980, y: GROUND_Y - 30, label: 'SOCKS', color: '#4169E1' },
        { x: 4150, y: GROUND_Y - 30, label: 'CUSHION', color: '#CD853F' },
        { x: 4300, y: GROUND_Y - 30, label: 'KEYS', color: '#FFD700' },

        // === SCREEN 6 (10 items) ===
        // Safe ground path (7 items)
        { x: 4880, y: GROUND_Y - 87, label: 'GLASSES', color: '#C0C0C0' },
        { x: 5100, y: GROUND_Y - 95, label: 'REMOTE', color: '#333' },
        { x: 5160, y: GROUND_Y - 95, label: 'BLANKET', color: '#FFB6C1' },
        { x: 5390, y: GROUND_Y - 72, label: 'COASTER', color: '#D2691E' },
        { x: 5440, y: GROUND_Y - 72, label: 'MUG', color: '#8B4513' },
        { x: 5590, y: GROUND_Y - 87, label: 'MAGAZINE', color: '#4682B4' },
        { x: 5650, y: GROUND_Y - 87, label: 'SOCKS', color: '#228B22' },
        // High shelf path (3 bonus items)
        { x: 5080, y: GROUND_Y - 192, label: 'HEADPHONES', color: '#333' },
        { x: 5250, y: GROUND_Y - 282, label: 'PHONE', color: '#333' },
        { x: 5430, y: GROUND_Y - 312, label: 'GLASS', color: '#87CEEB' },
        // +HEALTH on high path
        { x: 5330, y: GROUND_Y - 312, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 7 (10 items) ===
        // Tower climb items
        { x: 5870, y: GROUND_Y - 92, label: 'BOOK', color: '#654321' },
        { x: 6000, y: GROUND_Y - 162, label: 'BOOK', color: '#8B0000' },
        { x: 5870, y: GROUND_Y - 232, label: 'GLASS', color: '#87CEEB' },
        // On crumbling shelves (reward)
        { x: 6000, y: GROUND_Y - 302, label: 'GLASSES', color: '#C0C0C0' },
        { x: 5870, y: GROUND_Y - 372, label: 'HEADPHONES', color: '#333' },
        // Landing items
        { x: 6190, y: GROUND_Y - 95, label: 'CUSHION', color: '#CD853F' },
        { x: 6380, y: GROUND_Y - 82, label: 'REMOTE', color: '#333' },
        { x: 6570, y: GROUND_Y - 92, label: 'MUG', color: '#8B4513' },
        // Ground
        { x: 6280, y: GROUND_Y - 30, label: 'BLANKET', color: '#FFB6C1' },
        { x: 6470, y: GROUND_Y - 30, label: 'KEYS', color: '#FFD700' },
        // +LIFE on hardest-to-reach crumbling shelf (top of tower)
        { x: 5910, y: GROUND_Y - 372, label: '+LIFE', color: '#FF1493' },

        // === SCREEN 8 (8 items) ===
        // On/near moving platforms
        { x: 6770, y: GROUND_Y - 92, label: 'COASTER', color: '#D2691E' },
        { x: 6915, y: GROUND_Y - 152, label: 'SOCKS', color: '#4169E1' },
        { x: 7075, y: GROUND_Y - 192, label: 'PHONE', color: '#333' },
        { x: 7235, y: GROUND_Y - 162, label: 'BOOK', color: '#4682B4' },
        { x: 7395, y: GROUND_Y - 202, label: 'MAGAZINE', color: '#4682B4' },
        { x: 7555, y: GROUND_Y - 172, label: 'KEYS', color: '#FFD700' },
        { x: 7640, y: GROUND_Y - 95, label: 'GLASS', color: '#87CEEB' },
        { x: 7580, y: GROUND_Y - 30, label: 'CUSHION', color: '#CD853F' },

        // === SCREEN 9 (8 items) ===
        // Along the crumble sprint route
        { x: 7770, y: GROUND_Y - 112, label: 'REMOTE', color: '#333' },
        { x: 7920, y: GROUND_Y - 132, label: 'MUG', color: '#8B4513' },
        { x: 8070, y: GROUND_Y - 112, label: 'BLANKET', color: '#FFB6C1' },
        { x: 8220, y: GROUND_Y - 132, label: 'SOCKS', color: '#228B22' },
        { x: 8370, y: GROUND_Y - 112, label: 'BOOK', color: '#8B0000' },
        { x: 8530, y: GROUND_Y - 95, label: 'GLASSES', color: '#C0C0C0' },
        { x: 8560, y: GROUND_Y - 95, label: 'PHONE', color: '#333' },
        { x: 8450, y: GROUND_Y - 30, label: 'COASTER', color: '#D2691E' },
        // +HEALTH
        { x: 8100, y: GROUND_Y - 112, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 10 (10 items) ===
        // Mixed across gauntlet platforms
        { x: 8720, y: GROUND_Y - 112, label: 'MAGAZINE', color: '#4682B4' },
        { x: 8915, y: GROUND_Y - 152, label: 'REMOTE', color: '#333' },
        { x: 9095, y: GROUND_Y - 132, label: 'HEADPHONES', color: '#333' },
        { x: 9250, y: GROUND_Y - 112, label: 'MUG', color: '#8B4513' },
        { x: 9395, y: GROUND_Y - 162, label: 'BLANKET', color: '#FFB6C1' },
        { x: 9520, y: GROUND_Y - 92, label: 'KEYS', color: '#FFD700' },
        // Ground items
        { x: 8800, y: GROUND_Y - 30, label: 'SOCKS', color: '#4169E1' },
        { x: 9000, y: GROUND_Y - 30, label: 'GLASS', color: '#87CEEB' },
        { x: 9180, y: GROUND_Y - 30, label: 'CUSHION', color: '#CD853F' },
        { x: 9350, y: GROUND_Y - 30, label: 'BOOK', color: '#006400' },
        // +HEALTH at midpoint
        { x: 9150, y: GROUND_Y - 112, label: '+HEALTH', color: '#00FF00' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // Screen 1: 1 PLUG
        { x: 410, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // Screen 2: 1 CABLE
        { x: 1480, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // Screen 3: 1 CANDLE
        { x: 2450, y: GROUND_Y - 30, width: 30, height: 30, label: 'CANDLE', color: '#FF4500' },

        // Screen 4: 1 timed PLUG
        { x: 3260, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.8, timerOff: 1.5, timerOffset: 0.5 },

        // Screen 5: 2 timed CANDLE
        { x: 4120, y: GROUND_Y - 30, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 4580, y: GROUND_Y - 30, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.8 },

        // Screen 6: 1 CABLE
        { x: 5480, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // Screen 7: 2 timed PLUG
        { x: 6100, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0 },
        { x: 6450, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.8, timerOff: 1.2, timerOffset: 0.6 },

        // Screen 8: 1 timed CANDLE
        { x: 7150, y: GROUND_Y - 30, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.3 },

        // Screen 9: 2 CABLE
        { x: 7980, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },
        { x: 8420, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // Screen 10: 3 mixed obstacles
        { x: 8780, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0 },
        { x: 9100, y: GROUND_Y - 30, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.0, timerOffset: 0.5 },
        { x: 9420, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // Screen 1: 1 ROOMBA
        { x: 550, y: GROUND_Y - 30, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },

        // Screen 2: 1 DUST
        { x: 1300, y: GROUND_Y - 20, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 80 },

        // Screen 3: 1 RC CAR
        { x: 2600, y: GROUND_Y - 25, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 120 },

        // Screen 4: 1 ROOMBA
        { x: 3450, y: GROUND_Y - 30, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },

        // Screen 5: 1 DUST + 1 RC CAR
        { x: 4000, y: GROUND_Y - 20, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 80 },
        { x: 4500, y: GROUND_Y - 25, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 120 },

        // Screen 6: 1 ROOMBA
        { x: 5300, y: GROUND_Y - 30, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },

        // Screen 7: 1 DUST + 1 RC CAR
        { x: 6250, y: GROUND_Y - 20, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 80 },
        { x: 6500, y: GROUND_Y - 25, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 120 },

        // Screen 8: 2 DUST
        { x: 7000, y: GROUND_Y - 20, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 80 },
        { x: 7400, y: GROUND_Y - 20, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 80 },

        // Screen 9: 1 RC CAR
        { x: 8300, y: GROUND_Y - 25, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 120 },

        // Screen 10: 2 ROOMBA + 1 RC CAR
        { x: 8850, y: GROUND_Y - 30, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },
        { x: 9200, y: GROUND_Y - 30, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },
        { x: 9450, y: GROUND_Y - 25, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 120 },
    ],
};
