// Level 1: Living Room
// 11 screen widths (10,560px at 960px canvas width)
// 100 standard collectables + 3 +HEALTH + 1 +LIFE
// DEADLY FLOOR — no full-width ground platform

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 11; // 10560

export const level1 = {
    name: 'Living Room',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#D4C4A8', // warm beige
    playerStart: { x: 80, y: 460 - 72 },

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
    // ~80 static + ~10 moving + ~8 crumbling
    // Four-tier system: T1=460-490, T2=360-400, T3=250-300, T4=140-200
    platforms: [
        // Boss arena ground only (label '' = solid full collision)
        { x: CANVAS_W * 10, y: GROUND_Y, width: CANVAS_W, height: 80, label: '', color: '#8B7355' },

        // === SCREEN 1 (0-960): TEACH — Wide safe T1 islands, simple hops ===
        // Wide spawn island
        { x: 40, y: 460, width: 260, height: 24, label: 'SOFA', color: '#6B4226' },
        // Easy hop to table (~100px gap)
        { x: 400, y: 470, width: 200, height: 14, label: 'TABLE', color: '#A0522D' },
        // Hop to armchair (~80px gap)
        { x: 680, y: 460, width: 200, height: 24, label: 'ARMCHAIR', color: '#6B4226' },
        // T2 shelf above armchair (optional up-hop for bonus)
        { x: 720, y: 380, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 2 (960-1920): TEACH — More T1 islands, gentle climb, first crumble ===
        // Wide sofa island
        { x: 960, y: 470, width: 240, height: 24, label: 'SOFA', color: '#6B4226' },
        // Table hop
        { x: 1280, y: 480, width: 160, height: 14, label: 'TABLE', color: '#A0522D' },
        // Armchair landing
        { x: 1520, y: 465, width: 180, height: 22, label: 'ARMCHAIR', color: '#6B4226' },
        // First crumble tutorial — wide, long timer, safe static nearby
        { x: 1780, y: 470, width: 100, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Safe static right after crumble
        { x: 1870, y: 460, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // T2 optional shelf above sofa
        { x: 1000, y: 380, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // T2 books above table
        { x: 1320, y: 370, width: 80, height: 20, label: 'BOOKS', color: '#654321' },

        // === SCREEN 3 (1920-2880): Zigzag climb, first crumble pair, first moving ===
        // T1 landing from screen 2
        { x: 1940, y: 470, width: 160, height: 24, label: 'SOFA', color: '#6B4226' },
        // T2 shelf — start zigzag climb
        { x: 2140, y: 390, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // T3 books — zigzag left
        { x: 1980, y: 290, width: 90, height: 20, label: 'BOOKS', color: '#654321' },
        // T3 shelf — zigzag right
        { x: 2200, y: 260, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // T2 descent right
        { x: 2380, y: 370, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // T1 landing
        { x: 2540, y: 470, width: 140, height: 24, label: 'SOFA', color: '#6B4226' },
        // Two crumbling cushions bridging a gap (with static alternative below)
        { x: 2730, y: 400, width: 80, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        { x: 2850, y: 390, width: 80, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Static alternative path (lower, longer route)
        { x: 2750, y: 480, width: 80, height: 14, label: 'TABLE', color: '#A0522D' },
        // First moving frame (gentle)
        { x: 2700, y: 280, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 60, moveSpeed: 0.8 },

        // === SCREEN 4 (2880-3840): Introduce zigzag + moving platforms ===
        // T1 wide rest area
        { x: 2900, y: 470, width: 220, height: 24, label: 'SOFA', color: '#6B4226' },
        // T2 chair hop
        { x: 3180, y: 390, width: 80, height: 16, label: 'CHAIR', color: '#8B4513' },
        // T2 shelf
        { x: 3330, y: 380, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // T3 moving frame
        { x: 3300, y: 270, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 80, moveSpeed: 1.0 },
        // T2 landing shelf
        { x: 3500, y: 370, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // T1 sofa landing
        { x: 3660, y: 465, width: 180, height: 24, label: 'SOFA', color: '#6B4226' },
        // T1 table exit
        { x: 3780, y: 480, width: 80, height: 14, label: 'TABLE', color: '#A0522D' },
        // T4 bonus shelf (reachable from T3 moving frame)
        { x: 3260, y: 170, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 5 (3840-4800): Horizontal gauntlet + high path choice ===
        // T1 entry
        { x: 3860, y: 470, width: 120, height: 22, label: 'ARMCHAIR', color: '#6B4226' },
        // T2 platforms across screen — main gauntlet path
        { x: 4040, y: 390, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4220, y: 380, width: 90, height: 20, label: 'BOOKS', color: '#654321' },
        // Moving frame bridging gauntlet gap
        { x: 4380, y: 370, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 70, moveSpeed: 1.0 },
        { x: 4530, y: 390, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // T1 TV unit — wide safe landing
        { x: 4680, y: 470, width: 200, height: 20, label: 'TV UNIT', color: '#2F2F2F' },
        // High risk/reward path (T3 to T4)
        { x: 4060, y: 280, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4240, y: 200, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4420, y: 170, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4600, y: 260, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 6 (4800-5760): Horizontal gauntlet + risk/reward T3/T4 ===
        // T1 armchair entry
        { x: 4850, y: 465, width: 140, height: 22, label: 'ARMCHAIR', color: '#6B4226' },
        // T2 lower path — safe route with wider platforms
        { x: 5050, y: 390, width: 120, height: 24, label: 'SOFA', color: '#6B4226' },
        { x: 5250, y: 400, width: 100, height: 14, label: 'TABLE', color: '#A0522D' },
        { x: 5420, y: 390, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // Moving frame in lower path
        { x: 5580, y: 380, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -60, moveSpeed: 1.0 },
        // T1 wide landing
        { x: 5680, y: 470, width: 80, height: 24, label: 'SOFA', color: '#6B4226' },
        // T3 upper path — risk/reward with collectibles
        { x: 5080, y: 280, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 5260, y: 260, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 5440, y: 250, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        // T4 bonus platform
        { x: 5260, y: 160, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 7 (5760-6720): Crumbling tower + static alternatives ===
        // T1 entry
        { x: 5780, y: 470, width: 120, height: 20, label: 'SHELF', color: '#8B6914' },
        // Zigzag tower — mix of static and crumbling
        // T2 static
        { x: 5950, y: 390, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // T3 crumbling
        { x: 5810, y: 300, width: 80, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T3 static alternative (slightly harder to reach)
        { x: 5960, y: 280, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        // T4 crumbling (reward route)
        { x: 5830, y: 190, width: 80, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T4 static adjacent
        { x: 5990, y: 170, width: 70, height: 20, label: 'SHELF', color: '#8B6914' },
        // Descent — T2 platforms
        { x: 6130, y: 370, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 6300, y: 390, width: 120, height: 24, label: 'SOFA', color: '#6B4226' },
        // T1 rest
        { x: 6480, y: 470, width: 160, height: 14, label: 'TABLE', color: '#A0522D' },
        // T1 exit
        { x: 6700, y: 460, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 8 (6720-7680): Moving platform chain ===
        // T1 start
        { x: 6740, y: 470, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // T2 static — launch pad
        { x: 6900, y: 390, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        // 5 moving frames at T2/T3 — staggered heights
        { x: 7040, y: 370, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 60, moveSpeed: 0.9 },
        { x: 7180, y: 290, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -70, moveSpeed: 1.0 },
        { x: 7320, y: 360, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 80, moveSpeed: 1.2 },
        { x: 7460, y: 280, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -60, moveSpeed: 1.4 },
        { x: 7600, y: 370, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 70, moveSpeed: 1.0 },
        // T2 static rest after chain
        { x: 7550, y: 400, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // T1 landing
        { x: 7620, y: 470, width: 80, height: 24, label: 'SOFA', color: '#6B4226' },

        // === SCREEN 9 (7680-8640): Full gauntlet — crumble sprint + mixed ===
        // T1 entry
        { x: 7700, y: 465, width: 100, height: 22, label: 'ARMCHAIR', color: '#6B4226' },
        // Crumble sprint at T2 — 4 crumbling in a row
        { x: 7870, y: 400, width: 80, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        { x: 8020, y: 390, width: 80, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // Static rest mid-sprint
        { x: 8170, y: 385, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // More crumbling
        { x: 8330, y: 395, width: 80, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        { x: 8480, y: 390, width: 80, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T1 safe landing after sprint
        { x: 8600, y: 470, width: 120, height: 24, label: 'SOFA', color: '#6B4226' },
        // T3 optional bonus above sprint
        { x: 8060, y: 280, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 8300, y: 270, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 10 (8640-9600): Full gauntlet — all mechanics ===
        // T1 entry
        { x: 8660, y: 470, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // T2 shelf
        { x: 8830, y: 390, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        // T3 moving frame
        { x: 8990, y: 290, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 70, moveSpeed: 1.2 },
        // T2 crumbling
        { x: 9130, y: 380, width: 80, height: 20, label: 'CUSHION', color: '#CD853F',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T2 static
        { x: 9280, y: 390, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        // T3 moving frame
        { x: 9420, y: 280, width: 64, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -60, moveSpeed: 1.0 },
        // T1 pre-boss landing (wide for safety)
        { x: 9500, y: 470, width: 160, height: 14, label: 'TABLE', color: '#A0522D' },
        // T2 platforms for approach variety
        { x: 9080, y: 270, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        // T4 high reward
        { x: 9180, y: 170, width: 70, height: 20, label: 'SHELF', color: '#8B6914' },

        // === SCREEN 11 (9600-10560): BOSS ARENA ===
        // 3 shelf platforms for dodging boss
        { x: 9750, y: 380, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 10050, y: 300, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 10350, y: 380, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard items + 3 +HEALTH + 1 +LIFE = 104 total
    collectables: [
        // === SCREEN 1 (12 items) ===
        // On spawn sofa (y=460, items at 460-32=428)
        { x: 80, y: 428, label: 'REMOTE', color: '#333' },
        { x: 140, y: 428, label: 'MUG', color: '#8B4513' },
        { x: 200, y: 428, label: 'MAGAZINE', color: '#4682B4' },
        // On table (y=470, items at 438)
        { x: 510, y: 438, label: 'GLASSES', color: '#C0C0C0' },
        { x: 510, y: 438, label: 'COASTER', color: '#D2691E' },
        { x: 560, y: 438, label: 'PHONE', color: '#333' },
        // On armchair (y=460, items at 428)
        { x: 720, y: 428, label: 'CUSHION', color: '#CD853F' },
        { x: 780, y: 428, label: 'SOCKS', color: '#4169E1' },
        { x: 840, y: 428, label: 'BLANKET', color: '#FFB6C1' },
        // On T2 shelf (y=380, items at 348)
        { x: 740, y: 348, label: 'BOOK', color: '#8B0000' },
        { x: 790, y: 348, label: 'GLASS', color: '#87CEEB' },
        { x: 260, y: 428, label: 'KEYS', color: '#FFD700' },

        // === SCREEN 2 (12 items) ===
        // On sofa (y=470, items at 438)
        { x: 1000, y: 438, label: 'REMOTE', color: '#333' },
        { x: 1060, y: 438, label: 'MUG', color: '#8B4513' },
        { x: 1120, y: 438, label: 'MAGAZINE', color: '#4682B4' },
        // On table (y=480, items at 448)
        { x: 1320, y: 448, label: 'GLASSES', color: '#C0C0C0' },
        { x: 1400, y: 448, label: 'COASTER', color: '#D2691E' },
        // On armchair (y=465, items at 433)
        { x: 1630, y: 433, label: 'CUSHION', color: '#CD853F' },
        { x: 1640, y: 433, label: 'BLANKET', color: '#FFB6C1' },
        // On crumble/shelf at end (y=470/460)
        { x: 1800, y: 438, label: 'SOCKS', color: '#4169E1' },
        { x: 1890, y: 428, label: 'PHONE', color: '#333' },
        // On T2 shelf (y=380)
        { x: 1020, y: 348, label: 'BOOK', color: '#8B0000' },
        // On T2 books (y=370)
        { x: 1340, y: 338, label: 'HEADPHONES', color: '#333' },
        { x: 1900, y: 428, label: 'KEYS', color: '#FFD700' },

        // === SCREEN 3 (10 items) ===
        // On T1 sofa (y=470)
        { x: 1980, y: 438, label: 'BOOK', color: '#654321' },
        { x: 2040, y: 438, label: 'MUG', color: '#8B4513' },
        // On T2 shelf (y=390)
        { x: 2170, y: 358, label: 'BOOK', color: '#8B0000' },
        // On T3 books (y=290)
        { x: 2010, y: 258, label: 'GLASS', color: '#87CEEB' },
        // On T3 shelf (y=260)
        { x: 2230, y: 228, label: 'COASTER', color: '#D2691E' },
        // On crumbling cushions (y=400/390)
        { x: 2755, y: 368, label: 'PHONE', color: '#333' },
        { x: 2875, y: 358, label: 'BLANKET', color: '#FFB6C1' },
        // On T1 landing (y=470)
        { x: 2575, y: 438, label: 'MAGAZINE', color: '#4682B4' },
        { x: 2640, y: 438, label: 'SOCKS', color: '#4169E1' },
        // On T3 moving frame (y=280)
        { x: 2720, y: 248, label: 'GLASSES', color: '#C0C0C0' },

        // === SCREEN 4 (10 items) ===
        // On wide rest sofa (y=470)
        { x: 2940, y: 438, label: 'REMOTE', color: '#333' },
        { x: 3000, y: 438, label: 'CUSHION', color: '#CD853F' },
        { x: 3060, y: 438, label: 'MUG', color: '#8B4513' },
        // On T2 chair (y=390)
        { x: 3200, y: 358, label: 'KEYS', color: '#FFD700' },
        // On T2 shelf (y=380)
        { x: 3430, y: 348, label: 'BOOK', color: '#006400' },
        // On T3 moving frame (y=270)
        { x: 3320, y: 238, label: 'HEADPHONES', color: '#333' },
        // On T4 bonus shelf (y=170)
        { x: 3280, y: 138, label: 'GLASS', color: '#87CEEB' },
        // On T1 sofa (y=465)
        { x: 3700, y: 433, label: 'MAGAZINE', color: '#4682B4' },
        // On T1 table (y=480)
        { x: 3800, y: 448, label: 'SOCKS', color: '#228B22' },
        // On T2 landing (y=370)
        { x: 3530, y: 338, label: 'GLASSES', color: '#C0C0C0' },

        // === SCREEN 5 (10 items) ===
        // On T1 entry armchair (y=470)
        { x: 3895, y: 438, label: 'COASTER', color: '#D2691E' },
        // On T2 gauntlet platforms
        { x: 4070, y: 358, label: 'BOOK', color: '#8B0000' },
        { x: 4320, y: 348, label: 'REMOTE', color: '#333' },
        { x: 4560, y: 358, label: 'MUG', color: '#8B4513' },
        // On T1 TV unit (y=470)
        { x: 4720, y: 438, label: 'MAGAZINE', color: '#4682B4' },
        { x: 4870, y: 438, label: 'PHONE', color: '#333' },
        // High path items (T3/T4)
        { x: 4090, y: 248, label: 'BLANKET', color: '#FFB6C1' },
        { x: 4270, y: 168, label: 'KEYS', color: '#FFD700' },
        { x: 4450, y: 138, label: 'CUSHION', color: '#CD853F' },
        { x: 4630, y: 228, label: 'SOCKS', color: '#4169E1' },

        // === SCREEN 6 (10 items) ===
        // On T1 armchair (y=465)
        { x: 4890, y: 433, label: 'GLASSES', color: '#C0C0C0' },
        // Lower safe path
        { x: 5080, y: 358, label: 'REMOTE', color: '#333' },
        { x: 5290, y: 368, label: 'COASTER', color: '#D2691E' },
        { x: 5450, y: 358, label: 'MAGAZINE', color: '#4682B4' },
        { x: 5710, y: 438, label: 'MUG', color: '#8B4513' },
        // Upper path bonus items (T3)
        { x: 5110, y: 248, label: 'HEADPHONES', color: '#333' },
        { x: 5290, y: 228, label: 'PHONE', color: '#333' },
        { x: 5470, y: 218, label: 'GLASS', color: '#87CEEB' },
        // T4 bonus
        { x: 5290, y: 128, label: 'BOOK', color: '#006400' },
        // +HEALTH on T3 upper path (risk/reward)
        { x: 5370, y: 218, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 7 (10 items) ===
        // On T1 entry (y=470)
        { x: 5820, y: 438, label: 'BOOK', color: '#654321' },
        // Tower climb items
        { x: 5980, y: 358, label: 'BOOK', color: '#8B0000' },
        // On crumbling T3 (y=300)
        { x: 5840, y: 268, label: 'GLASS', color: '#87CEEB' },
        // On static T3 alternative (y=280)
        { x: 5990, y: 248, label: 'BLANKET', color: '#FFB6C1' },
        // On crumbling T4 (y=190)
        { x: 5860, y: 158, label: 'HEADPHONES', color: '#333' },
        // On static T4 (y=170)
        { x: 6020, y: 138, label: 'GLASSES', color: '#C0C0C0' },
        // Descent and landing
        { x: 6230, y: 338, label: 'CUSHION', color: '#CD853F' },
        { x: 6340, y: 358, label: 'REMOTE', color: '#333' },
        { x: 6590, y: 438, label: 'MUG', color: '#8B4513' },
        { x: 6730, y: 428, label: 'KEYS', color: '#FFD700' },
        // +LIFE on hardest T4 crumbling shelf
        { x: 5870, y: 158, label: '+LIFE', color: '#FF1493' },

        // === SCREEN 8 (9 items) ===
        // On T1 start (y=470)
        { x: 6770, y: 438, label: 'COASTER', color: '#D2691E' },
        { x: 6810, y: 438, label: 'BLANKET', color: '#FFB6C1' },
        // On/near moving frames
        { x: 6930, y: 358, label: 'SOCKS', color: '#4169E1' },
        { x: 7060, y: 338, label: 'PHONE', color: '#333' },
        { x: 7200, y: 258, label: 'BOOK', color: '#4682B4' },
        { x: 7340, y: 328, label: 'MAGAZINE', color: '#4682B4' },
        { x: 7480, y: 248, label: 'KEYS', color: '#FFD700' },
        { x: 7650, y: 368, label: 'GLASS', color: '#87CEEB' },
        { x: 7650, y: 438, label: 'CUSHION', color: '#CD853F' },

        // === SCREEN 9 (8 items) ===
        // On T1 entry (y=465)
        { x: 7730, y: 433, label: 'REMOTE', color: '#333' },
        // Along crumble sprint
        { x: 7895, y: 368, label: 'MUG', color: '#8B4513' },
        { x: 8045, y: 358, label: 'BLANKET', color: '#FFB6C1' },
        { x: 8270, y: 353, label: 'SOCKS', color: '#228B22' },
        { x: 8355, y: 363, label: 'BOOK', color: '#8B0000' },
        { x: 8505, y: 358, label: 'GLASSES', color: '#C0C0C0' },
        // On T1 landing (y=470)
        { x: 8640, y: 438, label: 'PHONE', color: '#333' },
        // On T3 bonus above sprint (y=280/270)
        { x: 8090, y: 248, label: 'COASTER', color: '#D2691E' },
        // +HEALTH
        { x: 8330, y: 238, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 10 (10 items) ===
        // Mixed across gauntlet platforms
        { x: 8695, y: 438, label: 'MAGAZINE', color: '#4682B4' },
        { x: 8930, y: 358, label: 'REMOTE', color: '#333' },
        { x: 9010, y: 258, label: 'HEADPHONES', color: '#333' },
        { x: 9110, y: 238, label: 'BLANKET', color: '#FFB6C1' },
        { x: 9160, y: 348, label: 'MUG', color: '#8B4513' },
        { x: 9380, y: 358, label: 'KEYS', color: '#FFD700' },
        { x: 9440, y: 248, label: 'SOCKS', color: '#4169E1' },
        { x: 9610, y: 438, label: 'GLASS', color: '#87CEEB' },
        { x: 9600, y: 438, label: 'CUSHION', color: '#CD853F' },
        { x: 9210, y: 138, label: 'BOOK', color: '#006400' },
        // +HEALTH on T4
        { x: 9200, y: 138, label: '+HEALTH', color: '#00FF00' },
    ],

    // ========== OBSTACLES ==========
    // All placed ON platform surfaces
    obstacles: [
        // Screen 1: PLUG on table (y=470, obstacle on surface)
        { x: 475, y: 450, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // Screen 2: CABLE on armchair (y=465)
        { x: 1580, y: 440, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // Screen 3: CANDLE on T2 shelf (y=390)
        { x: 2400, y: 340, width: 30, height: 30, label: 'CANDLE', color: '#FF4500' },

        // Screen 4: timed PLUG on T2 shelf (y=380)
        { x: 3360, y: 360, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.8, timerOff: 1.5, timerOffset: 0.5 },

        // Screen 5: timed CANDLE on T2 gauntlet (y=380)
        { x: 4250, y: 350, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        // CANDLE on TV unit (y=470)
        { x: 4780, y: 440, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.8 },

        // Screen 6: CABLE on lower path sofa (y=390)
        { x: 5130, y: 365, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // Screen 7: timed PLUG on T2 descent (y=370)
        { x: 6160, y: 350, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0 },
        // PLUG on T1 table (y=470)
        { x: 6520, y: 450, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.8, timerOff: 1.2, timerOffset: 0.6 },

        // Screen 8: timed CANDLE on T2 static (y=400)
        { x: 7580, y: 370, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.3 },

        // Screen 9: CABLE on static rest mid-sprint (y=385)
        { x: 8200, y: 360, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // Screen 10: mixed
        { x: 8865, y: 370, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0 },
        { x: 9310, y: 360, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.0, timerOffset: 0.5 },
        { x: 9540, y: 445, width: 40, height: 25, label: 'CABLE', color: '#333' },
    ],

    // ========== ENEMIES ==========
    // All placed ON platforms, not on non-existent ground
    enemies: [
        // Screen 1: ROOMBA on table (y=470, enemy on surface)
        { x: 470, y: 440, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 80 },

        // Screen 2: DUST on sofa (y=470)
        { x: 1050, y: 450, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 60 },

        // Screen 3: RC CAR on T1 landing sofa (y=470)
        { x: 2580, y: 445, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 80 },

        // Screen 4: ROOMBA on wide rest sofa (y=470)
        { x: 3000, y: 440, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },

        // Screen 5: DUST on T2 shelf + RC CAR on TV unit
        { x: 4080, y: 370, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 60 },
        { x: 4740, y: 445, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 80 },

        // Screen 6: ROOMBA on lower path sofa (y=390)
        { x: 5100, y: 360, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 60 },

        // Screen 7: DUST on T2 descent + RC CAR on T1 table
        { x: 6340, y: 370, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 60 },
        { x: 6530, y: 445, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 80 },

        // Screen 8: 2 DUST on T2 platforms
        { x: 6930, y: 370, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 50 },
        { x: 7580, y: 380, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 50 },

        // Screen 9: RC CAR on T1 landing (y=470)
        { x: 8640, y: 445, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 60 },

        // Screen 10: 2 ROOMBA + 1 RC CAR
        { x: 8870, y: 360, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 60 },
        { x: 9320, y: 360, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 60 },
        { x: 9550, y: 445, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 80 },
    ],
};
