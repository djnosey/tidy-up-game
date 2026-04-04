// Level 4: Kids' Room
// 4 screen widths (~3840px at 960px canvas width)

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 4;

export const level4 = {
    name: "Kids' Room",
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#F5E8D0',
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 3 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 3,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 3 + 700,
        y: GROUND_Y - 50,
        label: 'TOY BOX TERROR',
        color: '#CD853F',
        width: 100,
        height: 50,
        health: 3,
        speed: 280,
        attacks: ['summon', 'charge', 'lidslam', 'shoot'],
    },

    // ========== DECORATIONS (non-interactive background) ==========
    decorations: [
        // === ARCHITECTURAL (spans full level) ===
        { x: 0, y: 8, type: 'cornice', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 250, type: 'dado_rail', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },

        // === SECTION 1 (0-960): Room entrance, desk area ===
        // Ceiling light
        { x: 350, y: 75, type: 'ceiling_light', size: 45, color: '#FFFACD' },
        // Window with colorful curtains
        { x: 500, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 480, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#FF6B6B' },
        { x: 600, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#4ECDC4' },
        // Colorful rugs
        { x: 120, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FF69B4' },
        { x: 600, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#7B68EE' },
        // Wall art / posters
        { x: 60, y: GROUND_Y - 350, type: 'wall_art', w: 45, h: 35, color: '#FF4500' },
        { x: 200, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#1E90FF' },
        { x: 750, y: GROUND_Y - 340, type: 'wall_art', w: 40, h: 35, color: '#32CD32' },
        // Toy emojis scattered
        { x: 100, y: GROUND_Y - 30, emoji: '🧸', size: 30 },
        { x: 700, y: GROUND_Y - 30, emoji: '🚂', size: 28 },
        { x: 870, y: GROUND_Y - 310, emoji: '⭐', size: 24 },
        // Wall socket
        { x: 420, y: GROUND_Y - 50, type: 'wall_socket' },
        // Glow-in-dark stars on ceiling area
        { x: 150, y: 40, emoji: '⭐', size: 14 },
        { x: 280, y: 55, emoji: '⭐', size: 12 },
        { x: 680, y: 35, emoji: '⭐', size: 16 },

        // === SECTION 2 (960-1920): Bunk bed section ===
        // Ceiling light
        { x: 1400, y: 70, type: 'ceiling_light', size: 50, color: '#FFE4B5' },
        // Window with bright curtains
        { x: 1200, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 1182, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#FFD700' },
        { x: 1293, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#FF8C00' },
        // Colorful rugs
        { x: 1050, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#00CED1' },
        { x: 1600, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FF6347' },
        // Posters
        { x: 980, y: GROUND_Y - 360, type: 'wall_art', w: 45, h: 38, color: '#FF1493' },
        { x: 1500, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#00BFFF' },
        { x: 1800, y: GROUND_Y - 340, type: 'wall_art', w: 42, h: 35, color: '#9370DB' },
        // Toy emojis
        { x: 1100, y: GROUND_Y - 30, emoji: '🧸', size: 26 },
        { x: 1750, y: GROUND_Y - 30, emoji: '🚂', size: 30 },
        { x: 1350, y: GROUND_Y - 400, emoji: '⭐', size: 22 },
        // Wall socket
        { x: 1880, y: GROUND_Y - 50, type: 'wall_socket' },

        // === SECTION 3 (1920-2880): Challenge zone, pillow forts ===
        // Ceiling light
        { x: 2400, y: 65, type: 'ceiling_light', size: 48, color: '#FFDAB9' },
        // Window
        { x: 2350, y: GROUND_Y - 390, type: 'window', w: 85, h: 75 },
        { x: 2332, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 250, color: '#BA55D3' },
        { x: 2443, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 250, color: '#20B2AA' },
        // Colorful rugs
        { x: 1980, y: GROUND_Y - 5, type: 'rug', w: 180, h: 10, color: '#FFD700' },
        { x: 2500, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#FF69B4' },
        // Posters
        { x: 1950, y: GROUND_Y - 380, type: 'wall_art', w: 48, h: 38, color: '#FF4500' },
        { x: 2600, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#1E90FF' },
        { x: 2800, y: GROUND_Y - 370, type: 'wall_art', w: 40, h: 35, color: '#32CD32' },
        // Toy emojis
        { x: 2050, y: GROUND_Y - 30, emoji: '🧸', size: 28 },
        { x: 2700, y: GROUND_Y - 30, emoji: '🚂', size: 26 },
        { x: 2250, y: GROUND_Y - 320, emoji: '⭐', size: 20 },
        // Wall sockets
        { x: 2100, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2780, y: GROUND_Y - 50, type: 'wall_socket' },

        // === SECTION 4 (2880-3840): Boss arena ===
        // Ceiling light (dramatic)
        { x: 3400, y: 55, type: 'ceiling_light', size: 55, color: '#FFE4B5' },
        // Large colorful rug
        { x: 3200, y: GROUND_Y - 5, type: 'rug', w: 500, h: 12, color: '#DC143C' },
        // Posters flanking arena
        { x: 2950, y: GROUND_Y - 360, type: 'wall_art', w: 55, h: 42, color: '#FF6347' },
        { x: 3700, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#4169E1' },
        // Toy emojis
        { x: 2960, y: GROUND_Y - 35, emoji: '🧸', size: 32 },
        { x: 3800, y: GROUND_Y - 30, emoji: '🚂', size: 28 },
        { x: 3350, y: GROUND_Y - 410, emoji: '⭐', size: 26 },
        // Wall sockets
        { x: 3050, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3750, y: GROUND_Y - 50, type: 'wall_socket' },
        // Scattered crayons and paper airplanes
        { x: 500, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 1800, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 900, y: GROUND_Y - 120, type: 'paper_airplane' },
        { x: 2500, y: GROUND_Y - 160, type: 'paper_airplane' },
        { x: CANVAS_W * 3 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground (carpet)
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#C4A882' },

        // === Section 1: Room entrance, desk area, toy chest (0-960) ===
        { x: 150, y: GROUND_Y - 55, width: 130, height: 22, label: 'TOY_CHEST', color: '#CD853F' },
        { x: 350, y: GROUND_Y - 50, width: 160, height: 20, label: 'DESK', color: '#DEB887' },
        { x: 600, y: GROUND_Y - 90, width: 80, height: 18, label: 'CUSHION', color: '#FF6B6B',
          moveX: 50, moveSpeed: 0.8 },
        { x: 780, y: GROUND_Y - 130, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 900, y: GROUND_Y - 60, width: 60, height: 16, label: 'CUSHION', color: '#4ECDC4' },

        // === Section 2: Bunk bed section, board games (960-1920) ===
        // Step up to lower bunk
        { x: 980, y: GROUND_Y - 30, width: 50, height: 14, label: 'BOARD_GAMES', color: '#228B22' },
        // Lower bunk (low enough to reach from step)
        { x: 1020, y: GROUND_Y - 60, width: 200, height: 20, label: 'BUNK_BED', color: '#8B4513' },
        // Stepping shelf between bunks
        { x: 1250, y: GROUND_Y - 120, width: 70, height: 18, label: 'SHELF', color: '#D2691E' },
        // Upper bunk (120px above lower = reachable from step)
        { x: 1020, y: GROUND_Y - 180, width: 200, height: 20, label: 'BUNK_BED', color: '#8B4513' },
        // Stepping platform to the right
        { x: 1260, y: GROUND_Y - 130, width: 70, height: 18, label: 'SHELF', color: '#D2691E' },
        // Board games area
        { x: 1400, y: GROUND_Y - 50, width: 150, height: 20, label: 'BOARD_GAMES', color: '#228B22' },
        { x: 1600, y: GROUND_Y - 100, width: 80, height: 18, label: 'CUSHION', color: '#FFD700',
          moveY: -60, moveSpeed: 1.0 },
        { x: 1750, y: GROUND_Y - 60, width: 100, height: 20, label: 'TOY_CHEST', color: '#CD853F' },
        { x: 1880, y: GROUND_Y - 130, width: 70, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 70, moveSpeed: 1.2 },

        // === Section 3: Pillow forts, tight platforming (1920-2880) ===
        { x: 1960, y: GROUND_Y - 55, width: 100, height: 22, label: 'PILLOW_FORT', color: '#DDA0DD' },
        { x: 2100, y: GROUND_Y - 120, width: 80, height: 20, label: 'PILLOW_FORT', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        { x: 2220, y: GROUND_Y - 60, width: 70, height: 18, label: 'CUSHION', color: '#87CEEB' },
        { x: 2340, y: GROUND_Y - 130, width: 90, height: 20, label: 'PILLOW_FORT', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 2.5 },
        { x: 2480, y: GROUND_Y - 200, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveY: -50, moveSpeed: 1.0 },
        { x: 2600, y: GROUND_Y - 80, width: 120, height: 22, label: 'DESK', color: '#DEB887' },
        { x: 2760, y: GROUND_Y - 140, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },

        // === Section 4: Boss arena with shelves (2880-3840) ===
        { x: 3000, y: GROUND_Y - 110, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 3250, y: GROUND_Y - 140, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 3500, y: GROUND_Y - 110, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // Section 1 — desk area, toy chest (6 items)
        { x: 180, y: GROUND_Y - 80, label: 'TEDDY', color: '#8B6914' },
        { x: 250, y: GROUND_Y - 80, label: 'TOY_CAR', color: '#FF0000' },
        { x: 380, y: GROUND_Y - 75, label: 'PENCIL', color: '#FFD700' },
        { x: 460, y: GROUND_Y - 75, label: 'CRAYON', color: '#FF4500' },
        { x: 620, y: GROUND_Y - 115, label: 'BLOCK', color: '#1E90FF' },
        { x: 800, y: GROUND_Y - 160, label: 'ACTION_FIG', color: '#8B008B' },

        // Section 2 — bunk beds, board games (7 items)
        { x: 1060, y: GROUND_Y - 100, label: 'TEDDY', color: '#CD853F' },
        { x: 1140, y: GROUND_Y - 100, label: 'STICKER', color: '#FF69B4' },
        { x: 1060, y: GROUND_Y - 230, label: 'PUZZLE', color: '#4682B4' },
        { x: 1140, y: GROUND_Y - 230, label: 'TOY_CAR', color: '#FF4500' },
        { x: 1280, y: GROUND_Y - 160, label: 'BLOCK', color: '#32CD32' },
        { x: 1450, y: GROUND_Y - 75, label: 'CRAYON', color: '#9400D3' },
        { x: 1620, y: GROUND_Y - 125, label: 'PENCIL', color: '#FFD700' },

        // Section 3 — pillow forts, challenge zone (8 items)
        { x: 1990, y: GROUND_Y - 80, label: 'TEDDY', color: '#DEB887' },
        { x: 2120, y: GROUND_Y - 145, label: 'STICKER', color: '#FF1493' },
        { x: 2250, y: GROUND_Y - 85, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 2370, y: GROUND_Y - 155, label: 'BLOCK', color: '#FF6347' },
        { x: 2500, y: GROUND_Y - 225, label: 'PUZZLE', color: '#20B2AA' },
        { x: 2640, y: GROUND_Y - 105, label: 'TOY_CAR', color: '#DC143C' },
        { x: 2780, y: GROUND_Y - 165, label: 'CRAYON', color: '#FF8C00' },
        { x: 2550, y: GROUND_Y - 30, label: '+HEALTH', color: '#00FF00' },

        // Section 4 — boss arena (4 items)
        { x: 3020, y: GROUND_Y - 140, label: 'STICKER', color: '#FF69B4' },
        { x: 3270, y: GROUND_Y - 170, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 3520, y: GROUND_Y - 140, label: 'BLOCK', color: '#1E90FF' },
        { x: 3150, y: GROUND_Y - 30, label: '+HEALTH', color: '#00FF00' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // Section 1
        { x: 300, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#FF0000' },
        { x: 550, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // Section 2
        { x: 1300, y: GROUND_Y - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },
        { x: 1550, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#0000FF',
          timerOn: 2.0, timerOff: 1.8, timerOffset: 0.5 },

        // Section 3
        { x: 2050, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#FF8C00',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.5 },
        { x: 2300, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.3 },
        { x: 2450, y: GROUND_Y - 20, width: 30, height: 20, label: 'CORNER', color: '#8B4513' },
        { x: 2700, y: GROUND_Y - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },

        // Section 4
        { x: 3100, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#32CD32' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // Section 1
        { x: 450, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },

        // Section 2
        { x: 1350, y: GROUND_Y - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', patrolRange: 100 },
        { x: 1700, y: GROUND_Y - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', patrolRange: 120 },

        // Section 3
        { x: 2180, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },
        { x: 2500, y: GROUND_Y - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', patrolRange: 100 },
        { x: 2750, y: GROUND_Y - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', patrolRange: 120 },

        // Section 4
        { x: 3200, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },
    ],
};
