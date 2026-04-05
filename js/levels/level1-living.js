// Level 1: Living Room
// 4 screen widths (~3840px at 960px canvas width)

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 4;

export const level1 = {
    name: 'Living Room',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#D4C4A8', // warm beige
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: 2870, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 3,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 3 + 700,
        y: GROUND_Y - 50, // sits on the ground (height 50)
        label: 'MEGA ROOMBA',
        color: '#555555',
        width: 96,
        height: 50,
        health: 3,
        speed: 280,
        attacks: ['charge', 'shoot', 'charge', 'suction'],
    },

    // ========== DECORATIONS (non-interactive background) ==========
    decorations: [
        // === ARCHITECTURAL (spans full level) ===
        // Cornice / crown molding at ceiling
        { x: 0, y: 8, type: 'cornice', w: LEVEL_W },
        // Dado rail across all walls
        { x: 0, y: GROUND_Y - 250, type: 'dado_rail', w: LEVEL_W },
        // Skirting board
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },

        // === SECTION 1 (0–960): Cosy sofa area ===
        // Ceiling light
        { x: 300, y: 80, type: 'ceiling_light', size: 45, color: '#F5E6C8' },
        // Window with curtains
        { x: 500, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 480, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        { x: 600, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#8B6347' },
        // Large rug under sofa/table area
        { x: 320, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#8B0000' },
        // Family photos on wall
        { x: 60, y: GROUND_Y - 320, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 120, y: GROUND_Y - 340, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        // Potted plant in corner
        { x: 30, y: GROUND_Y - 40, emoji: '🪴', size: 35 },
        // Standing lamp by sofa
        { x: 140, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D0A0' },
        // Wall art
        { x: 700, y: GROUND_Y - 340, type: 'wall_art', w: 55, h: 42, color: '#B8860B' },
        // Wall clock
        { x: 860, y: GROUND_Y - 360, emoji: '🕰️', size: 30 },
        // Radiator under window (near floor)
        { x: 495, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 35 },
        // Wall socket (decorative)
        { x: 420, y: GROUND_Y - 50, type: 'wall_socket' },
        // Power strip on floor
        { x: 630, y: GROUND_Y - 6, type: 'power_strip', w: 40 },

        // === SECTION 2 (960–1920): Bookshelf / TV corner ===
        // Ceiling light
        { x: 1400, y: 75, type: 'ceiling_light', size: 50, color: '#E8D8C0' },
        // Window
        { x: 1150, y: GROUND_Y - 380, type: 'window', w: 80, h: 70 },
        { x: 1135, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        { x: 1240, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 230, color: '#8B6347' },
        // Rug under TV area
        { x: 1630, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#3B5323' },
        // Wall art near bookshelf
        { x: 960, y: GROUND_Y - 350, type: 'wall_art', w: 40, h: 35, color: '#654321' },
        // Family photos cluster
        { x: 1350, y: GROUND_Y - 340, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 1395, y: GROUND_Y - 355, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        // Plant by TV
        { x: 1760, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        // Small shelf with ornaments (above TV)
        { x: 1550, y: GROUND_Y - 180, type: 'wall_shelf_deco', w: 60, items: ['📕', '🏆', '🕯️'] },
        // Radiator
        { x: 1145, y: GROUND_Y - 50, type: 'radiator', w: 90, h: 30 },
        // Wall socket
        { x: 1880, y: GROUND_Y - 50, type: 'wall_socket' },
        // Standing lamp
        { x: 1920, y: GROUND_Y - 170, type: 'standing_lamp', floorY: GROUND_Y, color: '#D8C8A0' },
        // Decorative shelf
        { x: 1800, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 50, items: ['🖼️', '🪴'] },

        // === SECTION 3 (1920–2880): Challenge zone ===
        // Ceiling light
        { x: 2400, y: 70, type: 'ceiling_light', size: 42, color: '#F0E0C8' },
        // Window
        { x: 2300, y: GROUND_Y - 390, type: 'window', w: 85, h: 75 },
        { x: 2282, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        { x: 2393, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 250, color: '#8B6347' },
        // Large rug
        { x: 2500, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#8B0000' },
        // Wall art
        { x: 1970, y: GROUND_Y - 400, type: 'wall_art', w: 50, h: 38, color: '#B8860B' },
        { x: 2600, y: GROUND_Y - 330, type: 'wall_art', w: 45, h: 35, color: '#654321' },
        // Family photos
        { x: 2140, y: GROUND_Y - 380, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        // Clock
        { x: 2800, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },
        // Plant in corner
        { x: 2870, y: GROUND_Y - 38, emoji: '🪴', size: 32 },
        // Radiator
        { x: 2295, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        // Power strip
        { x: 2180, y: GROUND_Y - 6, type: 'power_strip', w: 38 },
        // Wall sockets
        { x: 2050, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2750, y: GROUND_Y - 50, type: 'wall_socket' },
        // Decorative shelf
        { x: 2700, y: GROUND_Y - 280, type: 'wall_shelf_deco', w: 55, items: ['🏆', '📷', '🪴'] },
        // Doorway to next room (hint of house layout)
        { x: 2870, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SECTION 4 (2880–3840): Boss arena ===
        // Ceiling light (dramatic, bigger)
        { x: 3400, y: 60, type: 'ceiling_light', size: 55, color: '#E8D0B0' },
        // Large rug
        { x: 3400, y: GROUND_Y - 5, type: 'rug', w: 500, h: 12, color: '#4A0808' },
        // Wall art on both sides
        { x: 3000, y: GROUND_Y - 350, type: 'wall_art', w: 60, h: 45, color: '#B8860B' },
        { x: 3700, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#654321' },
        // Family photos
        { x: 3150, y: GROUND_Y - 370, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 3550, y: GROUND_Y - 380, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        // Plants in corners
        { x: 2950, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 3800, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        // Radiators
        { x: 3050, y: GROUND_Y - 50, type: 'radiator', w: 80, h: 30 },
        { x: 3650, y: GROUND_Y - 50, type: 'radiator', w: 80, h: 30 },
        // Wall sockets
        { x: 3100, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3750, y: GROUND_Y - 50, type: 'wall_socket' },
        // Clock
        { x: 3350, y: GROUND_Y - 400, emoji: '🕰️', size: 32 },
        // Ambient dust motes in light beam areas
        { x: 400, y: GROUND_Y - 250, type: 'dust_motes' },
        { x: 1200, y: GROUND_Y - 200, type: 'dust_motes' },
        { x: 2400, y: GROUND_Y - 280, type: 'dust_motes' },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#8B7355' },

        // === Section 1: Easy intro (0 - 960px) ===
        { x: 160, y: GROUND_Y - 60, width: 220, height: 24, label: 'SOFA', color: '#6B4226' },
        { x: 440, y: GROUND_Y - 40, width: 120, height: 14, label: 'TABLE', color: '#A0522D' },
        { x: 700, y: GROUND_Y - 90, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 830, y: GROUND_Y - 160, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },

        // === Section 2: Ramping up (960 - 1920px) ===
        { x: 1000, y: GROUND_Y - 70, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 1060, y: GROUND_Y - 140, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 1000, y: GROUND_Y - 210, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 1060, y: GROUND_Y - 280, width: 80, height: 20, label: 'BOOKS', color: '#654321' },
        { x: 1200, y: GROUND_Y - 200, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 60, moveSpeed: 1.0 },
        { x: 1320, y: GROUND_Y - 230, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: -50, moveSpeed: 1.2 },
        { x: 1440, y: GROUND_Y - 190, width: 50, height: 16, label: 'FRAME', color: '#B8860B',
          moveX: 55, moveSpeed: 0.8 },
        { x: 1520, y: GROUND_Y - 50, width: 220, height: 20, label: 'TV UNIT', color: '#2F2F2F' },
        { x: 1780, y: GROUND_Y - 120, width: 60, height: 20, label: 'CUSHION', color: '#CD853F',
          moveX: 80, moveSpeed: 1.4 },
        { x: 1870, y: GROUND_Y - 80, width: 60, height: 20, label: 'CUSHION', color: '#DAA520',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 2.5 },

        // === Section 3: Challenge zone (1920 - 2880px) ===
        { x: 1980, y: GROUND_Y - 60, width: 70, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 2060, y: GROUND_Y - 130, width: 70, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 1980, y: GROUND_Y - 200, width: 70, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 2060, y: GROUND_Y - 270, width: 70, height: 20, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 2060, y: GROUND_Y - 340, width: 100, height: 20, label: 'TOP SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        { x: 2230, y: GROUND_Y - 60, width: 120, height: 24, label: 'SOFA', color: '#6B4226' },
        { x: 2400, y: GROUND_Y - 120, width: 60, height: 20, label: 'LAMP', color: '#DAA520',
          moveY: -50, moveSpeed: 0.8 },
        { x: 2530, y: GROUND_Y - 50, width: 70, height: 14, label: 'CHAIR', color: '#8B4513' },
        { x: 2660, y: GROUND_Y - 55, width: 140, height: 22, label: 'ARMCHAIR', color: '#6B4226' },

        // === Section 4: Boss arena (2880 - 3840px) ===
        { x: 3050, y: GROUND_Y - 120, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 3300, y: GROUND_Y - 150, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 3550, y: GROUND_Y - 120, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // Section 1 — items you'd find on/around a sofa and coffee table
        { x: 230, y: GROUND_Y - 80, label: 'REMOTE', color: '#333' },
        { x: 280, y: GROUND_Y - 80, label: 'MUG', color: '#8B4513' },
        { x: 470, y: GROUND_Y - 65, label: 'MAGAZINE', color: '#4682B4' },
        { x: 520, y: GROUND_Y - 65, label: 'GLASSES', color: '#C0C0C0' },
        { x: 720, y: GROUND_Y - 120, label: 'BOOK', color: '#8B0000' },
        { x: 840, y: GROUND_Y - 190, label: 'GLASS', color: '#87CEEB' },

        // Section 2 — books scattered up the shelves, stuff around TV
        { x: 1020, y: GROUND_Y - 100, label: 'BOOK', color: '#006400' },
        { x: 1080, y: GROUND_Y - 170, label: 'BOOK', color: '#8B0000' },
        { x: 1020, y: GROUND_Y - 240, label: 'SOCKS', color: '#4169E1' },
        { x: 1080, y: GROUND_Y - 310, label: 'COASTER', color: '#D2691E' },
        { x: 1220, y: GROUND_Y - 230, label: 'REMOTE', color: '#333' },
        { x: 1340, y: GROUND_Y - 260, label: 'PHONE', color: '#333' },
        { x: 1600, y: GROUND_Y - 85, label: 'MAGAZINE', color: '#4682B4' },
        { x: 1660, y: GROUND_Y - 85, label: 'KEYS', color: '#FFD700' },
        { x: 1800, y: GROUND_Y - 150, label: 'CUSHION', color: '#CD853F' },

        // Section 3 — harder to reach items
        { x: 2000, y: GROUND_Y - 90, label: 'BLANKET', color: '#FFB6C1' },
        { x: 2080, y: GROUND_Y - 230, label: 'HEADPHONES', color: '#333' },
        { x: 2080, y: GROUND_Y - 370, label: 'MUG', color: '#8B4513' },
        { x: 2270, y: GROUND_Y - 130, label: 'CUSHION', color: '#DAA520' },
        { x: 2420, y: GROUND_Y - 170, label: 'GLASS', color: '#87CEEB' },
        { x: 2560, y: GROUND_Y - 130, label: 'BOOK', color: '#4682B4' },
        { x: 2700, y: GROUND_Y - 90, label: 'SOCKS', color: '#228B22' },

        // Health pickup (on the chair)
        { x: 2550, y: GROUND_Y - 85, label: '+HEALTH', color: '#00FF00' },

        // Extra life — above the crumbling top shelf, requires a well-timed jump
        { x: 2100, y: GROUND_Y - 400, label: '+LIFE', color: '#FF1493' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        { x: 380, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },
        { x: 1150, y: GROUND_Y - 30, width: 30, height: 30, label: 'CANDLE', color: '#FF4500' },
        { x: 1700, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },
        { x: 2150, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.8, timerOff: 1.5, timerOffset: 0.5 },
        { x: 2350, y: GROUND_Y - 20, width: 30, height: 20, label: 'CORNER', color: '#8B4513' },
        { x: 2620, y: GROUND_Y - 30, width: 30, height: 30, label: 'CANDLE', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 2830, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        { x: 500, y: GROUND_Y - 30, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },
        { x: 1300, y: GROUND_Y - 20, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 80 },
        { x: 1650, y: GROUND_Y - 25, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 120 },
        { x: 2200, y: GROUND_Y - 30, width: 40, height: 30, label: 'ROOMBA', color: '#555', patrolRange: 100 },
        { x: 2480, y: GROUND_Y - 20, width: 30, height: 20, label: 'DUST', color: '#C0C0C0', patrolRange: 60 },
        { x: 2750, y: GROUND_Y - 25, width: 35, height: 25, label: 'RC CAR', color: '#FF0000', patrolRange: 80 },
    ],
};
