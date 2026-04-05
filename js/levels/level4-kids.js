// Level 4: Kids' Room
// 12 screen widths (~11520px at 960px canvas width)
// Signature: BED bounce (225px!), most vertical "maze-like", dense platform grids
// 126 standard collectables + 3 +HEALTH + 3 +LIFE
// ~90 static + ~14 crumbling + ~12 moving platforms

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 12;

export const level4 = {
    name: "Kids' Room",
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#F5E8D0',
    playerStart: { x: 100, y: 470 - 72 }, // On first Tier 1 toy box

    bossDoor: { x: CANVAS_W * 11 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 11,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 11 + 700,
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

        // === SCREEN 1 (0-960): TEACH - Toy chest intro ===
        { x: 350, y: 75, type: 'ceiling_light', size: 45, color: '#FFFACD' },
        { x: 500, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 480, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#FF6B6B' },
        { x: 600, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#4ECDC4' },
        { x: 120, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FF69B4' },
        { x: 600, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#7B68EE' },
        { x: 60, y: GROUND_Y - 350, type: 'wall_art', w: 45, h: 35, color: '#FF4500' },
        { x: 200, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#1E90FF' },
        { x: 750, y: GROUND_Y - 340, type: 'wall_art', w: 40, h: 35, color: '#32CD32' },
        { x: 100, y: GROUND_Y - 30, emoji: '🧸', size: 30 },
        { x: 700, y: GROUND_Y - 30, emoji: '🚂', size: 28 },
        { x: 870, y: GROUND_Y - 310, emoji: '⭐', size: 24 },
        { x: 420, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 150, y: 40, emoji: '⭐', size: 14 },
        { x: 280, y: 55, emoji: '⭐', size: 12 },
        { x: 680, y: 35, emoji: '⭐', size: 16 },

        // === SCREEN 2 (960-1920): TEST - Desk & shelf climb ===
        { x: CANVAS_W + 400, y: 70, type: 'ceiling_light', size: 48, color: '#FFE4B5' },
        { x: CANVAS_W + 200, y: GROUND_Y - 390, type: 'window', w: 85, h: 75 },
        { x: CANVAS_W + 182, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FFD700' },
        { x: CANVAS_W + 293, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FF8C00' },
        { x: CANVAS_W + 50, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#00CED1' },
        { x: CANVAS_W + 600, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FF6347' },
        { x: CANVAS_W + 500, y: GROUND_Y - 360, type: 'wall_art', w: 45, h: 38, color: '#FF1493' },
        { x: CANVAS_W + 750, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#00BFFF' },
        { x: CANVAS_W + 100, y: GROUND_Y - 30, emoji: '🧸', size: 26 },
        { x: CANVAS_W + 800, y: GROUND_Y - 30, emoji: '🚂', size: 30 },
        { x: CANVAS_W + 450, y: 45, emoji: '⭐', size: 18 },
        { x: CANVAS_W + 620, y: 38, emoji: '⭐', size: 14 },
        { x: CANVAS_W + 880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W + 350, y: GROUND_Y - 8, type: 'scattered_crayons' },

        // === SCREEN 3 (1920-2880): SIGNATURE - Bunk bed section ===
        { x: CANVAS_W * 2 + 480, y: 65, type: 'ceiling_light', size: 50, color: '#FFDAB9' },
        { x: CANVAS_W * 2 + 600, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: CANVAS_W * 2 + 580, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#BA55D3' },
        { x: CANVAS_W * 2 + 700, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#20B2AA' },
        { x: CANVAS_W * 2 + 100, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#FFD700' },
        { x: CANVAS_W * 2 + 700, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FF69B4' },
        { x: CANVAS_W * 2 + 50, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 38, color: '#FF4500' },
        { x: CANVAS_W * 2 + 800, y: GROUND_Y - 370, type: 'wall_art', w: 55, h: 42, color: '#1E90FF' },
        { x: CANVAS_W * 2 + 200, y: GROUND_Y - 30, emoji: '🧸', size: 28 },
        { x: CANVAS_W * 2 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 26 },
        { x: CANVAS_W * 2 + 300, y: 40, emoji: '⭐', size: 20 },
        { x: CANVAS_W * 2 + 550, y: 50, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 2 + 750, y: 35, emoji: '⭐', size: 16 },
        { x: CANVAS_W * 2 + 900, y: GROUND_Y - 50, type: 'wall_socket' },

        // === SCREEN 4 (2880-3840): VERTICAL MAZE A - Multiple path choices ===
        { x: CANVAS_W * 3 + 300, y: 70, type: 'ceiling_light', size: 45, color: '#FFFACD' },
        { x: CANVAS_W * 3 + 500, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: CANVAS_W * 3 + 480, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#FF6B6B' },
        { x: CANVAS_W * 3 + 600, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#4ECDC4' },
        { x: CANVAS_W * 3 + 150, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#7B68EE' },
        { x: CANVAS_W * 3 + 650, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#FF69B4' },
        { x: CANVAS_W * 3 + 100, y: GROUND_Y - 360, type: 'wall_art', w: 45, h: 35, color: '#32CD32' },
        { x: CANVAS_W * 3 + 750, y: GROUND_Y - 340, type: 'wall_art', w: 50, h: 40, color: '#9370DB' },
        { x: CANVAS_W * 3 + 50, y: GROUND_Y - 30, emoji: '🧸', size: 30 },
        { x: CANVAS_W * 3 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 28 },
        { x: CANVAS_W * 3 + 200, y: 45, emoji: '⭐', size: 16 },
        { x: CANVAS_W * 3 + 700, y: 40, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 3 + 420, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 3 + 600, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: CANVAS_W * 3 + 250, y: GROUND_Y - 120, type: 'paper_airplane' },

        // === SCREEN 5 (3840-4800): CHALLENGE - Moving cushion chain ===
        { x: CANVAS_W * 4 + 450, y: 65, type: 'ceiling_light', size: 48, color: '#FFE4B5' },
        { x: CANVAS_W * 4 + 200, y: GROUND_Y - 390, type: 'window', w: 85, h: 75 },
        { x: CANVAS_W * 4 + 182, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FFD700' },
        { x: CANVAS_W * 4 + 293, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FF8C00' },
        { x: CANVAS_W * 4 + 50, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#00CED1' },
        { x: CANVAS_W * 4 + 650, y: GROUND_Y - 5, type: 'rug', w: 180, h: 10, color: '#FF6347' },
        { x: CANVAS_W * 4 + 600, y: GROUND_Y - 360, type: 'wall_art', w: 45, h: 38, color: '#FF1493' },
        { x: CANVAS_W * 4 + 800, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#00BFFF' },
        { x: CANVAS_W * 4 + 100, y: GROUND_Y - 30, emoji: '🧸', size: 26 },
        { x: CANVAS_W * 4 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 30 },
        { x: CANVAS_W * 4 + 300, y: 42, emoji: '⭐', size: 18 },
        { x: CANVAS_W * 4 + 700, y: 38, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 4 + 880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 4 + 400, y: GROUND_Y - 160, type: 'paper_airplane' },

        // === SCREEN 6 (4800-5760): CHALLENGE - Pillow fort crumble ===
        { x: CANVAS_W * 5 + 480, y: 70, type: 'ceiling_light', size: 50, color: '#FFDAB9' },
        { x: CANVAS_W * 5 + 700, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: CANVAS_W * 5 + 680, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#BA55D3' },
        { x: CANVAS_W * 5 + 800, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#20B2AA' },
        { x: CANVAS_W * 5 + 50, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FFD700' },
        { x: CANVAS_W * 5 + 500, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#FF69B4' },
        { x: CANVAS_W * 5 + 100, y: GROUND_Y - 380, type: 'wall_art', w: 48, h: 38, color: '#FF4500' },
        { x: CANVAS_W * 5 + 400, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#1E90FF' },
        { x: CANVAS_W * 5 + 200, y: GROUND_Y - 30, emoji: '🧸', size: 28 },
        { x: CANVAS_W * 5 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 26 },
        { x: CANVAS_W * 5 + 250, y: 45, emoji: '⭐', size: 16 },
        { x: CANVAS_W * 5 + 600, y: 40, emoji: '⭐', size: 20 },
        { x: CANVAS_W * 5 + 900, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 5 + 350, y: GROUND_Y - 8, type: 'scattered_crayons' },

        // === SCREEN 7 (5760-6720): RISK/REWARD - Second bunk bed ===
        { x: CANVAS_W * 6 + 300, y: 65, type: 'ceiling_light', size: 45, color: '#FFFACD' },
        { x: CANVAS_W * 6 + 500, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: CANVAS_W * 6 + 480, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#FF6B6B' },
        { x: CANVAS_W * 6 + 600, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#4ECDC4' },
        { x: CANVAS_W * 6 + 100, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#7B68EE' },
        { x: CANVAS_W * 6 + 650, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FF69B4' },
        { x: CANVAS_W * 6 + 50, y: GROUND_Y - 350, type: 'wall_art', w: 45, h: 35, color: '#32CD32' },
        { x: CANVAS_W * 6 + 800, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#9370DB' },
        { x: CANVAS_W * 6 + 200, y: GROUND_Y - 30, emoji: '🧸', size: 30 },
        { x: CANVAS_W * 6 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 28 },
        { x: CANVAS_W * 6 + 150, y: 40, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 6 + 400, y: 50, emoji: '⭐', size: 18 },
        { x: CANVAS_W * 6 + 750, y: 35, emoji: '⭐', size: 16 },
        { x: CANVAS_W * 6 + 420, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 6 + 700, y: GROUND_Y - 8, type: 'scattered_crayons' },

        // === SCREEN 8 (6720-7680): VERTICAL MAZE B - Dense grid ===
        { x: CANVAS_W * 7 + 450, y: 70, type: 'ceiling_light', size: 48, color: '#FFE4B5' },
        { x: CANVAS_W * 7 + 200, y: GROUND_Y - 390, type: 'window', w: 85, h: 75 },
        { x: CANVAS_W * 7 + 182, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FFD700' },
        { x: CANVAS_W * 7 + 293, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FF8C00' },
        { x: CANVAS_W * 7 + 50, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#00CED1' },
        { x: CANVAS_W * 7 + 600, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#FF6347' },
        { x: CANVAS_W * 7 + 500, y: GROUND_Y - 360, type: 'wall_art', w: 45, h: 38, color: '#FF1493' },
        { x: CANVAS_W * 7 + 800, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#00BFFF' },
        { x: CANVAS_W * 7 + 100, y: GROUND_Y - 30, emoji: '🧸', size: 26 },
        { x: CANVAS_W * 7 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 30 },
        { x: CANVAS_W * 7 + 350, y: 42, emoji: '⭐', size: 18 },
        { x: CANVAS_W * 7 + 700, y: 38, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 7 + 880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 7 + 300, y: GROUND_Y - 150, type: 'paper_airplane' },

        // === SCREEN 9 (7680-8640): ESCALATE - Crumble + moving combo ===
        { x: CANVAS_W * 8 + 480, y: 65, type: 'ceiling_light', size: 50, color: '#FFDAB9' },
        { x: CANVAS_W * 8 + 700, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: CANVAS_W * 8 + 680, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#BA55D3' },
        { x: CANVAS_W * 8 + 800, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#20B2AA' },
        { x: CANVAS_W * 8 + 50, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#FFD700' },
        { x: CANVAS_W * 8 + 600, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#FF69B4' },
        { x: CANVAS_W * 8 + 100, y: GROUND_Y - 380, type: 'wall_art', w: 48, h: 38, color: '#FF4500' },
        { x: CANVAS_W * 8 + 500, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#1E90FF' },
        { x: CANVAS_W * 8 + 200, y: GROUND_Y - 30, emoji: '🧸', size: 28 },
        { x: CANVAS_W * 8 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 26 },
        { x: CANVAS_W * 8 + 300, y: 40, emoji: '⭐', size: 20 },
        { x: CANVAS_W * 8 + 550, y: 50, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 8 + 900, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 8 + 450, y: GROUND_Y - 8, type: 'scattered_crayons' },

        // === SCREEN 10 (8640-9600): ESCALATE - Vertical + horizontal gauntlet ===
        { x: CANVAS_W * 9 + 300, y: 70, type: 'ceiling_light', size: 45, color: '#FFFACD' },
        { x: CANVAS_W * 9 + 500, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: CANVAS_W * 9 + 480, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#FF6B6B' },
        { x: CANVAS_W * 9 + 600, y: GROUND_Y - 385, type: 'curtain', w: 30, h: 240, color: '#4ECDC4' },
        { x: CANVAS_W * 9 + 100, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#7B68EE' },
        { x: CANVAS_W * 9 + 650, y: GROUND_Y - 5, type: 'rug', w: 180, h: 10, color: '#FF69B4' },
        { x: CANVAS_W * 9 + 50, y: GROUND_Y - 360, type: 'wall_art', w: 45, h: 35, color: '#32CD32' },
        { x: CANVAS_W * 9 + 750, y: GROUND_Y - 340, type: 'wall_art', w: 50, h: 40, color: '#9370DB' },
        { x: CANVAS_W * 9 + 200, y: GROUND_Y - 30, emoji: '🧸', size: 30 },
        { x: CANVAS_W * 9 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 28 },
        { x: CANVAS_W * 9 + 250, y: 45, emoji: '⭐', size: 16 },
        { x: CANVAS_W * 9 + 700, y: 38, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 9 + 880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 9 + 400, y: GROUND_Y - 170, type: 'paper_airplane' },

        // === SCREEN 11 (9600-10560): VERTICAL MAZE C + GAUNTLET - Pre-boss ===
        { x: CANVAS_W * 10 + 450, y: 65, type: 'ceiling_light', size: 48, color: '#FFE4B5' },
        { x: CANVAS_W * 10 + 200, y: GROUND_Y - 390, type: 'window', w: 85, h: 75 },
        { x: CANVAS_W * 10 + 182, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FFD700' },
        { x: CANVAS_W * 10 + 293, y: GROUND_Y - 395, type: 'curtain', w: 28, h: 240, color: '#FF8C00' },
        { x: CANVAS_W * 10 + 50, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#00CED1' },
        { x: CANVAS_W * 10 + 600, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#FF6347' },
        { x: CANVAS_W * 10 + 500, y: GROUND_Y - 360, type: 'wall_art', w: 45, h: 38, color: '#FF1493' },
        { x: CANVAS_W * 10 + 800, y: GROUND_Y - 370, type: 'wall_art', w: 50, h: 40, color: '#00BFFF' },
        { x: CANVAS_W * 10 + 100, y: GROUND_Y - 30, emoji: '🧸', size: 26 },
        { x: CANVAS_W * 10 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 30 },
        { x: CANVAS_W * 10 + 350, y: 42, emoji: '⭐', size: 18 },
        { x: CANVAS_W * 10 + 700, y: 38, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 10 + 880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 10 + 500, y: GROUND_Y - 8, type: 'scattered_crayons' },
        // Doorway to boss
        { x: CANVAS_W * 11 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SCREEN 12 (10560-11520): BOSS ARENA ===
        { x: CANVAS_W * 11 + 480, y: 55, type: 'ceiling_light', size: 55, color: '#FFE4B5' },
        { x: CANVAS_W * 11 + 300, y: GROUND_Y - 5, type: 'rug', w: 400, h: 12, color: '#DC143C' },
        { x: CANVAS_W * 11 + 50, y: GROUND_Y - 360, type: 'wall_art', w: 55, h: 42, color: '#FF6347' },
        { x: CANVAS_W * 11 + 800, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#4169E1' },
        { x: CANVAS_W * 11 + 100, y: GROUND_Y - 30, emoji: '🧸', size: 32 },
        { x: CANVAS_W * 11 + 850, y: GROUND_Y - 30, emoji: '🚂', size: 28 },
        { x: CANVAS_W * 11 + 400, y: 40, emoji: '⭐', size: 26 },
        { x: CANVAS_W * 11 + 880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: CANVAS_W * 11 + 200, y: 45, emoji: '⭐', size: 14 },
        { x: CANVAS_W * 11 + 700, y: 50, emoji: '⭐', size: 18 },

        // === AMBIENT (scattered across level) ===
        { x: 500, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 1800, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 3200, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 5500, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 7200, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 8800, y: GROUND_Y - 8, type: 'scattered_crayons' },
        { x: 900, y: GROUND_Y - 120, type: 'paper_airplane' },
        { x: 2500, y: GROUND_Y - 160, type: 'paper_airplane' },
        { x: 5000, y: GROUND_Y - 140, type: 'paper_airplane' },
        { x: 7500, y: GROUND_Y - 180, type: 'paper_airplane' },
        { x: 9500, y: GROUND_Y - 150, type: 'paper_airplane' },
    ],

    // ========== PLATFORMS ==========
    // Tier 1 (Floor): y=460-490   Tier 2 (Low): y=360-400
    // Tier 3 (Mid): y=250-300     Tier 4 (High): y=140-200
    // BED bounce: label='BED' gives -900 velocity (225px height)
    // ~90 static + ~14 crumbling + ~12 moving = ~116 total
    // Pattern D (vertical maze) on screens 4, 8, 11
    platforms: [
        // Boss arena ground (solid, full collision)
        { x: CANVAS_W * 11, y: GROUND_Y, width: CANVAS_W, height: 80, label: '', color: '#C4A882' },

        // === SCREEN 1 (0-960): TEACH - Toy chest intro ===
        // Pattern: gentle hops, wide platforms, 80-100px gaps
        // Tier 1 - toy box (player spawn)
        { x: 60, y: 470, width: 140, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 1 - desk
        { x: 280, y: 475, width: 160, height: 20, label: 'DESK', color: '#DEB887' },
        // Tier 2 - shelf stepping up
        { x: 500, y: 390, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - stool
        { x: 650, y: 480, width: 70, height: 16, label: 'STOOL', color: '#B8860B' },
        // Tier 2 - drawer
        { x: 780, y: 380, width: 100, height: 18, label: 'DRAWER', color: '#A0522D' },
        // Tier 3 - shelf high for bonus
        { x: 350, y: 280, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - toy box near exit
        { x: 880, y: 470, width: 70, height: 22, label: 'TOY_BOX', color: '#CD853F' },

        // === SCREEN 2 (960-1920): TEST - Desk & shelf climb ===
        // Pattern: zigzag climb to Tier 4 via shelf tower
        // Tier 1 - desk entry
        { x: 980, y: 470, width: 160, height: 20, label: 'DESK', color: '#DEB887' },
        // Tier 1 - desk stepping stone
        { x: 1210, y: 475, width: 130, height: 20, label: 'DESK', color: '#DEB887' },
        // Tier 2 - shelf tower base
        { x: 1410, y: 390, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - shelf right
        { x: 1550, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - shelf left
        { x: 1420, y: 280, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - shelf right
        { x: 1570, y: 270, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 4 - shelf top of tower
        { x: 1470, y: 180, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - toy box after tower
        { x: 1720, y: 470, width: 130, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - drawer for transition
        { x: 1700, y: 380, width: 100, height: 18, label: 'DRAWER', color: '#A0522D' },

        // === SCREEN 3 (1920-2880): SIGNATURE - Bunk bed section ===
        // Pattern: BED bounce to reach Tier 4, signature mechanic intro
        // Tier 1 - BED (lower bunk) - bounce gives 225px rise
        { x: 1960, y: 470, width: 200, height: 20, label: 'BED', color: '#8B4513' },
        // Tier 2 - shelf stepping stone between bunks
        { x: 2220, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - upper bunk (reachable from bounce: 470-225=245)
        { x: 1970, y: 260, width: 200, height: 20, label: 'BED', color: '#8B4513' },
        // Tier 2 - shelf for non-bounce path
        { x: 2080, y: 370, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 4 - high shelf (reachable from upper bunk bounce: 260-225=35, lands on T4)
        { x: 2050, y: 150, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - after bunks
        { x: 2400, y: 470, width: 100, height: 20, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - toy box
        { x: 2570, y: 475, width: 130, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - stool right
        { x: 2760, y: 390, width: 70, height: 16, label: 'STOOL', color: '#B8860B' },
        // Tier 1 - exit drawer
        { x: 2840, y: 470, width: 100, height: 18, label: 'DRAWER', color: '#A0522D' },

        // === SCREEN 4 (2880-3840): VERTICAL MAZE A - Multiple path choices ===
        // Pattern D: dense grid with left/right/up path choices
        // LEFT PATH (lower route)
        // Tier 1 - entry toy box
        { x: 2920, y: 470, width: 120, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - left shelf
        { x: 2940, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - center desk
        { x: 3120, y: 390, width: 100, height: 20, label: 'DESK', color: '#DEB887' },
        // Tier 2 - right shelf
        { x: 3320, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // CENTER PATH (mid route)
        // Tier 3 - left shelf
        { x: 3000, y: 280, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - center drawer
        { x: 3180, y: 270, width: 100, height: 18, label: 'DRAWER', color: '#A0522D' },
        // Tier 3 - right shelf
        { x: 3380, y: 280, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // HIGH PATH (reward route)
        // Tier 4 - left shelf
        { x: 3060, y: 180, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 4 - right shelf
        { x: 3280, y: 170, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - exit paths converge
        { x: 3500, y: 470, width: 120, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - exit transition
        { x: 3500, y: 380, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - far exit
        { x: 3700, y: 475, width: 100, height: 16, label: 'STOOL', color: '#B8860B' },
        // Tier 3 - moving shelf (horizontal, connects paths)
        { x: 3200, y: 270, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 60, moveSpeed: 0.9 },
        // Tier 2 - crumbling shortcut left-to-center
        { x: 3100, y: 390, width: 70, height: 18, label: 'DRAWER', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },

        // === SCREEN 5 (3840-4800): CHALLENGE - Moving shelf chain ===
        // Pattern: horizontal gauntlet with moving shelves at varied tiers
        // Tier 1 - entry shelf
        { x: 3870, y: 470, width: 100, height: 20, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - moving shelf 1 (horizontal)
        { x: 4020, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 70, moveSpeed: 1.0 },
        // Tier 2 - static rest shelf
        { x: 4200, y: 390, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - moving shelf 2 (vertical)
        { x: 4350, y: 280, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveY: -60, moveSpeed: 1.2 },
        // Tier 2 - static rest
        { x: 4500, y: 380, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - moving shelf 3
        { x: 4640, y: 370, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 80, moveSpeed: 1.4 },
        // Tier 1 - exit toy box
        { x: 4780, y: 470, width: 100, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 3 - static shelf bonus
        { x: 4160, y: 270, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - stool
        { x: 4700, y: 480, width: 60, height: 16, label: 'STOOL', color: '#B8860B' },

        // === SCREEN 6 (4800-5760): CHALLENGE - Crumble chain ===
        // Pattern: crumbling platforms requiring chain jumps, static alternatives
        // Tier 1 - entry toy box
        { x: 4840, y: 470, width: 120, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - crumbling 1
        { x: 5000, y: 390, width: 80, height: 18, label: 'DRAWER', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        // Tier 2 - static alternative
        { x: 4980, y: 380, width: 70, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - crumbling 2
        { x: 5160, y: 380, width: 80, height: 18, label: 'DRAWER', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 1 - safe landing mid
        { x: 5280, y: 470, width: 90, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - crumbling 3
        { x: 5400, y: 390, width: 80, height: 18, label: 'DRAWER', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 2.5 },
        // Tier 3 - crumbling 4 (risky)
        { x: 5250, y: 280, width: 70, height: 18, label: 'DRAWER', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 3 - static shelf (safe landing high)
        { x: 5420, y: 270, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - exit shelf
        { x: 5560, y: 470, width: 100, height: 20, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - crumbling 5 (exit chain)
        { x: 5560, y: 380, width: 70, height: 18, label: 'DRAWER', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        // Tier 2 - transition shelf
        { x: 5680, y: 390, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },

        // === SCREEN 7 (5760-6720): RISK/REWARD - Second bunk bed ===
        // Pattern: safe lower path + BED bounce high reward route
        // SAFE LOWER PATH
        // Tier 1 - toy box left
        { x: 5800, y: 470, width: 130, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 1 - stool
        { x: 6010, y: 480, width: 60, height: 16, label: 'STOOL', color: '#B8860B' },
        // Tier 2 - desk
        { x: 6100, y: 390, width: 120, height: 20, label: 'DESK', color: '#DEB887' },
        // BUNK BED SECTION
        // Tier 1 - BED (lower bunk)
        { x: 6280, y: 470, width: 200, height: 20, label: 'BED', color: '#8B4513' },
        // Tier 3 - upper bunk (reachable from bounce: 470-225=245)
        { x: 6290, y: 260, width: 200, height: 20, label: 'BED', color: '#8B4513' },
        // Tier 4 - high shelf for +LIFE (from upper bounce: 260-225=35)
        { x: 6350, y: 150, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - shelf after bunks
        { x: 6540, y: 380, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - exit
        { x: 6680, y: 470, width: 80, height: 18, label: 'DRAWER', color: '#A0522D' },

        // === SCREEN 8 (6720-7680): VERTICAL MAZE B - Dense grid ===
        // Pattern D: multiple paths up and across, most vertical density
        // BOTTOM ROW (Tier 1)
        { x: 6760, y: 470, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 6950, y: 475, width: 70, height: 16, label: 'STOOL', color: '#B8860B' },
        { x: 7140, y: 470, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 7330, y: 475, width: 70, height: 16, label: 'STOOL', color: '#B8860B' },
        { x: 7520, y: 470, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // LOW ROW (Tier 2) - staggered between T1
        { x: 6840, y: 390, width: 80, height: 18, label: 'DRAWER', color: '#A0522D' },
        { x: 7030, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 7220, y: 390, width: 80, height: 18, label: 'DRAWER', color: '#A0522D' },
        { x: 7410, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 7580, y: 390, width: 80, height: 18, label: 'DRAWER', color: '#A0522D' },
        // MID ROW (Tier 3) - fewer, require choice
        { x: 6900, y: 280, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 7120, y: 270, width: 100, height: 18, label: 'DESK', color: '#DEB887' },
        { x: 7360, y: 280, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // HIGH ROW (Tier 4) - reward tier
        { x: 7000, y: 180, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 7250, y: 170, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Moving shelf in maze (horizontal)
        { x: 7450, y: 270, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 60, moveSpeed: 1.0 },
        // Moving shelf (vertical)
        { x: 6780, y: 280, width: 70, height: 18, label: 'SHELF', color: '#D2691E',
          moveY: -60, moveSpeed: 0.8 },

        // === SCREEN 9 (7680-8640): ESCALATE - Crumble + moving combo ===
        // Pattern: horizontal advance with crumbling then moving
        // Tier 1 - entry shelf
        { x: 7700, y: 470, width: 90, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - crumbling 1
        { x: 7860, y: 390, width: 80, height: 18, label: 'DRAWER', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 2 - crumbling 2
        { x: 8030, y: 380, width: 80, height: 18, label: 'DRAWER', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 2.5 },
        // Tier 2 - moving shelf 1
        { x: 8180, y: 390, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveY: -60, moveSpeed: 1.2 },
        // Tier 2 - moving shelf 2
        { x: 8340, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 70, moveSpeed: 1.0 },
        // Tier 1 - safe mid landing
        { x: 8460, y: 470, width: 100, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Tier 2 - static shelf
        { x: 8560, y: 390, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - high bonus
        { x: 8100, y: 270, width: 90, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - crumbling high
        { x: 8300, y: 280, width: 70, height: 18, label: 'DRAWER', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 2 - moving shelf (connects crumble to safe)
        { x: 8400, y: 390, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 50, moveSpeed: 1.0 },
        // Tier 3 - crumbling extra
        { x: 7950, y: 270, width: 70, height: 18, label: 'DRAWER', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },

        // === SCREEN 10 (8640-9600): ESCALATE - Vertical climb + gauntlet ===
        // Pattern: 6-tier climb with tight gaps
        // Tier 1 - entry shelf
        { x: 8680, y: 470, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - stool
        { x: 8840, y: 390, width: 60, height: 16, label: 'STOOL', color: '#B8860B' },
        // Tier 3 - shelf
        { x: 8980, y: 280, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 4 - shelf
        { x: 9140, y: 180, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - shelf descent
        { x: 9280, y: 270, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - stool descent
        { x: 9140, y: 390, width: 60, height: 16, label: 'STOOL', color: '#B8860B' },
        // Tier 1 - toy box landing
        { x: 9400, y: 470, width: 130, height: 22, label: 'TOY_BOX', color: '#CD853F' },
        // Moving shelf on descent
        { x: 9200, y: 380, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 60, moveSpeed: 1.2 },
        // Crumbling alternative
        { x: 9050, y: 390, width: 70, height: 18, label: 'DRAWER', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },

        // === SCREEN 11 (9600-10560): VERTICAL MAZE C + GAUNTLET - Pre-boss ===
        // Pattern D: dense multi-path with everything combined
        // Tier 1 - BED for bounce
        { x: 9640, y: 470, width: 200, height: 20, label: 'BED', color: '#8B4513' },
        // Tier 2 - shelf from bounce landing or regular jump
        { x: 9900, y: 390, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - shelf (reachable from bounce: 470-225=245)
        { x: 9700, y: 260, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 2 - crumbling
        { x: 10060, y: 380, width: 80, height: 18, label: 'DRAWER', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Tier 3 - moving shelf
        { x: 10000, y: 270, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveY: -50, moveSpeed: 1.2 },
        // Tier 2 - static shelf
        { x: 10200, y: 390, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 1 - stool
        { x: 10340, y: 480, width: 60, height: 16, label: 'STOOL', color: '#B8860B' },
        // Tier 1 - final landing before boss door
        { x: 10440, y: 470, width: 100, height: 18, label: 'DRAWER', color: '#A0522D' },
        // Tier 4 - bonus from bounce
        { x: 9760, y: 160, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Tier 3 - crumbling high
        { x: 10100, y: 270, width: 70, height: 18, label: 'DRAWER', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },

        // === SCREEN 12 (10560-11520): BOSS ARENA ===
        // Shelves for dodging during boss fight
        { x: 10700, y: 390, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 10900, y: 280, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 11100, y: 390, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 11300, y: 280, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 10800, y: 470, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 11200, y: 470, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
    ],

    // ========== COLLECTABLES ==========
    // 98 standard + 3 +HEALTH + 3 +LIFE = 104 total
    // Labels: TEDDY, PENCIL, TOY_CAR, BLOCK, CRAYON, STICKER, ACTION_FIG, PUZZLE
    collectables: [
        // === SCREEN 1 (0-960): 10 collectables ===
        // On toy box (T1, y=470)
        { x: 100, y: 470 - 32, label: 'TEDDY', color: '#8B6914' },
        { x: 160, y: 470 - 32, label: 'TOY_CAR', color: '#FF0000' },
        // On desk (T1, y=475)
        { x: 390, y: 475 - 32, label: 'PENCIL', color: '#FFD700' },
        { x: 400, y: 475 - 32, label: 'CRAYON', color: '#FF4500' },
        // On shelf (T2, y=390)
        { x: 530, y: 390 - 32, label: 'BLOCK', color: '#1E90FF' },
        // On drawer (T2, y=380)
        { x: 810, y: 380 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 850, y: 380 - 32, label: 'STICKER', color: '#FF69B4' },
        // On stool (T1, y=480)
        { x: 675, y: 480 - 32, label: 'PUZZLE', color: '#4682B4' },
        // On high shelf (T3, y=280)
        { x: 380, y: 280 - 32, label: 'CRAYON', color: '#9400D3' },
        // On exit toy box
        { x: 900, y: 470 - 32, label: 'BLOCK', color: '#32CD32' },

        // === SCREEN 2 (960-1920): 10 collectables ===
        // On desk entry (T1, y=470)
        { x: 1020, y: 470 - 32, label: 'TEDDY', color: '#CD853F' },
        { x: 1100, y: 470 - 32, label: 'TOY_CAR', color: '#FF4500' },
        // On desk stepping (T1, y=475)
        { x: 1250, y: 475 - 32, label: 'PENCIL', color: '#FFD700' },
        { x: 1310, y: 475 - 32, label: 'STICKER', color: '#FF1493' },
        // On shelf tower climb
        { x: 1500, y: 390 - 32, label: 'BLOCK', color: '#FF6347' },
        { x: 1570, y: 380 - 32, label: 'CRAYON', color: '#FF8C00' },
        { x: 1440, y: 280 - 32, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 1590, y: 270 - 32, label: 'PUZZLE', color: '#20B2AA' },
        // On T4 top
        { x: 1495, y: 180 - 32, label: 'TOY_CAR', color: '#DC143C' },
        // On toy box after tower
        { x: 1750, y: 470 - 32, label: 'BLOCK', color: '#1E90FF' },

        // === SCREEN 3 (1920-2880): 10 collectables ===
        // On lower bunk BED (T1, y=470)
        { x: 2000, y: 470 - 32, label: 'TEDDY', color: '#DEB887' },
        { x: 2080, y: 470 - 32, label: 'STICKER', color: '#FF69B4' },
        // On shelf between bunks (T2, y=380)
        { x: 2240, y: 380 - 32, label: 'CRAYON', color: '#9400D3' },
        // On upper bunk BED (T3, y=260)
        { x: 2010, y: 260 - 32, label: 'PUZZLE', color: '#4682B4' },
        { x: 2090, y: 260 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        // On shelf after bunks (T1, y=470)
        { x: 2490, y: 470 - 32, label: 'BLOCK', color: '#32CD32' },
        // On toy box (T1, y=475)
        { x: 2600, y: 475 - 32, label: 'TOY_CAR', color: '#FF0000' },
        // On stool (T2, y=390)
        { x: 2780, y: 390 - 32, label: 'PENCIL', color: '#FFD700' },
        // On T4 high shelf (y=150)
        { x: 2080, y: 150 - 32, label: 'STICKER', color: '#FF1493' },
        // On exit drawer (T1, y=470)
        { x: 2870, y: 470 - 32, label: 'CRAYON', color: '#FF4500' },

        // === SCREEN 4 (2880-3840): 8 collectables + 1 +HEALTH ===
        // LEFT PATH items
        { x: 2960, y: 470 - 32, label: 'TEDDY', color: '#8B6914' },
        { x: 2960, y: 380 - 32, label: 'TOY_CAR', color: '#FF4500' },
        { x: 3220, y: 390 - 32, label: 'BLOCK', color: '#1E90FF' },
        { x: 3340, y: 380 - 32, label: 'PENCIL', color: '#FFD700' },
        // CENTER PATH items
        { x: 3020, y: 280 - 32, label: 'CRAYON', color: '#FF8C00' },
        { x: 3210, y: 270 - 32, label: 'ACTION_FIG', color: '#4169E1' },
        // HIGH PATH bonus
        { x: 3080, y: 180 - 32, label: 'PUZZLE', color: '#20B2AA' },
        // +LIFE on T4 right shelf — dense vertical maze reward
        { x: 3300, y: 170 - 32, label: '+LIFE', color: '#FF1493' },
        // +HEALTH on center path (T3, y=280)
        { x: 3400, y: 280 - 32, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 5 (3840-4800): 9 collectables ===
        // On entry shelf (T1, y=470)
        { x: 3900, y: 470 - 32, label: 'TEDDY', color: '#CD853F' },
        // On moving shelf 1 (T2, y=380)
        { x: 4050, y: 380 - 32, label: 'BLOCK', color: '#FF6347' },
        // On static rest shelf (T2, y=390)
        { x: 4300, y: 390 - 32, label: 'TOY_CAR', color: '#DC143C' },
        // On moving shelf 2 (T3, y=280)
        { x: 4380, y: 280 - 32, label: 'CRAYON', color: '#9400D3' },
        // On static rest (T2, y=380)
        { x: 4600, y: 380 - 32, label: 'PENCIL', color: '#FFD700' },
        // On moving shelf 3 (T2, y=370)
        { x: 4670, y: 370 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        // On exit toy box (T1, y=470)
        { x: 4810, y: 470 - 32, label: 'STICKER', color: '#FF1493' },
        // On bonus shelf (T3, y=270)
        { x: 4190, y: 270 - 32, label: 'PUZZLE', color: '#4682B4' },
        // On stool (T1, y=480)
        { x: 4720, y: 480 - 32, label: 'BLOCK', color: '#32CD32' },

        // === SCREEN 6 (4800-5760): 9 collectables ===
        // On entry toy box (T1, y=470)
        { x: 4880, y: 470 - 32, label: 'TEDDY', color: '#DEB887' },
        // On crumbling 1 (T2, y=390)
        { x: 5030, y: 390 - 32, label: 'CRAYON', color: '#FF4500' },
        // On crumbling 2 (T2, y=380)
        { x: 5190, y: 380 - 32, label: 'TOY_CAR', color: '#FF0000' },
        // On safe landing mid (T1, y=470)
        { x: 5380, y: 470 - 32, label: 'BLOCK', color: '#1E90FF' },
        // On crumbling 3 (T2, y=390)
        { x: 5430, y: 390 - 32, label: 'PENCIL', color: '#FFD700' },
        // On crumbling 4 (T3, y=280)
        { x: 5280, y: 280 - 32, label: 'ACTION_FIG', color: '#4169E1' },
        // On static shelf (T3, y=270)
        { x: 5520, y: 270 - 32, label: 'STICKER', color: '#FF69B4' },
        // On exit shelf (T1, y=470)
        { x: 5590, y: 470 - 32, label: 'PUZZLE', color: '#20B2AA' },
        // On transition shelf (T2, y=390)
        { x: 5710, y: 390 - 32, label: 'CRAYON', color: '#FF8C00' },

        // === SCREEN 7 (5760-6720): 8 collectables + 1 +HEALTH + 1 +LIFE ===
        // Safe lower path items
        { x: 5840, y: 470 - 32, label: 'TEDDY', color: '#8B6914' },
        { x: 5900, y: 470 - 32, label: 'TOY_CAR', color: '#FF4500' },
        { x: 6030, y: 480 - 32, label: 'BLOCK', color: '#FF6347' },
        { x: 6200, y: 390 - 32, label: 'PENCIL', color: '#FFD700' },
        { x: 6700, y: 470 - 32, label: 'CRAYON', color: '#9400D3' },
        // Upper bunk bonus items (T3, y=260)
        { x: 6330, y: 260 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 6410, y: 260 - 32, label: 'PUZZLE', color: '#4682B4' },
        { x: 6450, y: 260 - 32, label: 'STICKER', color: '#FF1493' },
        // +HEALTH on upper bunk (T3, y=260)
        { x: 6370, y: 260 - 32, label: '+HEALTH', color: '#00FF00' },
        // +LIFE at very top (T4, y=150)
        { x: 6380, y: 150 - 32, label: '+LIFE', color: '#FF1493' },

        // === SCREEN 8 (6720-7680): 8 collectables ===
        // Scattered across maze grid
        // T1 items
        { x: 6790, y: 470 - 32, label: 'TEDDY', color: '#CD853F' },
        // T2 items
        { x: 6870, y: 390 - 32, label: 'TOY_CAR', color: '#DC143C' },
        { x: 7130, y: 380 - 32, label: 'CRAYON', color: '#FF4500' },
        { x: 7250, y: 390 - 32, label: 'BLOCK', color: '#32CD32' },
        // T3 items
        { x: 6930, y: 280 - 32, label: 'PENCIL', color: '#FFD700' },
        { x: 7150, y: 270 - 32, label: 'ACTION_FIG', color: '#4169E1' },
        // T4 items
        { x: 7030, y: 180 - 32, label: 'STICKER', color: '#FF69B4' },
        { x: 7280, y: 170 - 32, label: 'PUZZLE', color: '#20B2AA' },

        // === SCREEN 9 (7680-8640): 10 collectables ===
        // On crumbling/moving chain
        { x: 7730, y: 470 - 32, label: 'TEDDY', color: '#DEB887' },
        { x: 7890, y: 390 - 32, label: 'TOY_CAR', color: '#FF0000' },
        { x: 8130, y: 380 - 32, label: 'CRAYON', color: '#FF8C00' },
        { x: 8210, y: 390 - 32, label: 'BLOCK', color: '#1E90FF' },
        { x: 8370, y: 380 - 32, label: 'PENCIL', color: '#FFD700' },
        { x: 8560, y: 470 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 8590, y: 390 - 32, label: 'STICKER', color: '#FF1493' },
        // High bonus (T3, y=270)
        { x: 8130, y: 270 - 32, label: 'PUZZLE', color: '#4682B4' },
        // On crumbling high (T3, y=280)
        { x: 8330, y: 280 - 32, label: 'TOY_CAR', color: '#FF4500' },
        // On safe landing
        { x: 8530, y: 470 - 32, label: 'BLOCK', color: '#FF6347' },

        // === SCREEN 10 (8640-9600): 8 collectables + 1 +HEALTH ===
        // On vertical climb
        { x: 8710, y: 470 - 32, label: 'TEDDY', color: '#8B6914' },
        { x: 8930, y: 390 - 32, label: 'CRAYON', color: '#9400D3' },
        { x: 9010, y: 280 - 32, label: 'TOY_CAR', color: '#DC143C' },
        // +LIFE on T4 peak — vertical climb gauntlet reward
        { x: 9170, y: 180 - 32, label: '+LIFE', color: '#FF1493' },
        { x: 9380, y: 270 - 32, label: 'PUZZLE', color: '#20B2AA' },
        { x: 9160, y: 390 - 32, label: 'STICKER', color: '#FF69B4' },
        { x: 9430, y: 470 - 32, label: 'BLOCK', color: '#32CD32' },
        { x: 9480, y: 470 - 32, label: 'PENCIL', color: '#FFD700' },
        // +HEALTH on descent (T2)
        { x: 9220, y: 380 - 32, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 11 (9600-10560): 10 collectables ===
        // On BED (T1, y=470)
        { x: 9670, y: 470 - 32, label: 'TEDDY', color: '#CD853F' },
        { x: 9760, y: 470 - 32, label: 'TOY_CAR', color: '#FF0000' },
        // From bounce high (T3, y=260)
        { x: 9730, y: 260 - 32, label: 'CRAYON', color: '#FF4500' },
        // On T4 bonus from bounce (y=160)
        { x: 9790, y: 160 - 32, label: 'BLOCK', color: '#1E90FF' },
        // On shelf (T2, y=390)
        { x: 9930, y: 390 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        // On crumbling (T2, y=380)
        { x: 10160, y: 380 - 32, label: 'PUZZLE', color: '#4682B4' },
        // On moving shelf path
        { x: 10030, y: 270 - 32, label: 'STICKER', color: '#FF1493' },
        // On static shelf (T2, y=390)
        { x: 10300, y: 390 - 32, label: 'PENCIL', color: '#FFD700' },
        // On stool (T1, y=480)
        { x: 10360, y: 480 - 32, label: 'CRAYON', color: '#FF8C00' },
        // On final landing (T1, y=470)
        { x: 10470, y: 470 - 32, label: 'TOY_CAR', color: '#FF4500' },

        // === EXTRA CLUSTERS: air trails, high platforms, jump paths ===

        // SCREEN 1 air trail between toy box and desk (y=440, mid-air)
        { x: 220, y: 440 - 32, label: 'CRAYON', color: '#FF4500' },
        { x: 260, y: 430 - 32, label: 'BLOCK', color: '#1E90FF' },
        { x: 300, y: 420 - 32, label: 'PENCIL', color: '#FFD700' },

        // SCREEN 2 arc above tower climb (y=230-200, between T3 and T4)
        { x: 1460, y: 230 - 32, label: 'TOY_CAR', color: '#FF0000' },
        { x: 1520, y: 210 - 32, label: 'STICKER', color: '#FF69B4' },
        { x: 1580, y: 230 - 32, label: 'TEDDY', color: '#DEB887' },

        // SCREEN 3 cluster on upper bunk path (y=240, air trail)
        { x: 2030, y: 240 - 32, label: 'BLOCK', color: '#FF6347' },
        { x: 2060, y: 230 - 32, label: 'CRAYON', color: '#FF8C00' },

        // SCREEN 4 high path bonus cluster (y=150-160, above center path)
        { x: 3140, y: 160 - 32, label: 'TOY_CAR', color: '#DC143C' },
        { x: 3200, y: 150 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 3260, y: 160 - 32, label: 'TEDDY', color: '#8B6914' },

        // SCREEN 5 air trail between moving shelves (y=330-340)
        { x: 4150, y: 330 - 32, label: 'PUZZLE', color: '#20B2AA' },
        { x: 4200, y: 340 - 32, label: 'PENCIL', color: '#FFD700' },
        { x: 4500, y: 330 - 32, label: 'STICKER', color: '#FF1493' },

        // SCREEN 6 crumbling platform risk-reward cluster (y=350, mid-air)
        { x: 5100, y: 350 - 32, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 5150, y: 340 - 32, label: 'BLOCK', color: '#32CD32' },
        { x: 5350, y: 350 - 32, label: 'TOY_CAR', color: '#FF4500' },

        // SCREEN 7 bonus high trail above bunk (y=210-220)
        { x: 6280, y: 220 - 32, label: 'CRAYON', color: '#9400D3' },
        { x: 6340, y: 210 - 32, label: 'TEDDY', color: '#CD853F' },
        { x: 6400, y: 220 - 32, label: 'PENCIL', color: '#FFD700' },

        // SCREEN 8 maze grid bonus (y=230, between T3 and T4)
        { x: 6980, y: 230 - 32, label: 'STICKER', color: '#FF1493' },
        { x: 7080, y: 230 - 32, label: 'BLOCK', color: '#1E90FF' },

        // SCREEN 9 high bonus arc (y=240-220)
        { x: 7950, y: 240 - 32, label: 'TOY_CAR', color: '#DC143C' },
        { x: 8020, y: 220 - 32, label: 'CRAYON', color: '#FF4500' },
        { x: 8090, y: 240 - 32, label: 'PUZZLE', color: '#20B2AA' },

        // SCREEN 10 vertical climb air trail (y=230-250)
        { x: 8970, y: 250 - 32, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 9060, y: 230 - 32, label: 'TEDDY', color: '#DEB887' },

        // === SCREEN 12 (10560-11520): 0 standard collectables (boss arena) ===
    ],

    // ========== OBSTACLES ==========
    // All on platform surfaces, not ground
    obstacles: [
        // === SCREEN 1: LEGO on desk ===
        { x: 350, y: 475 - 20, width: 24, height: 20, label: 'LEGO', color: '#FF0000' },

        // === SCREEN 2: BLIND_CORD on shelf tower ===
        { x: 1440, y: 390 - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },

        // === SCREEN 3: LEGO timed on shelf ===
        { x: 2430, y: 470 - 20, width: 24, height: 20, label: 'LEGO', color: '#0000FF',
          timerOn: 2.0, timerOff: 1.8, timerOffset: 0.5 },

        // === SCREEN 4: PLUG on center desk ===
        { x: 3160, y: 390 - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // === SCREEN 5: 2 LEGO timed on shelves ===
        { x: 4220, y: 390 - 20, width: 24, height: 20, label: 'LEGO', color: '#FF8C00',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.5 },
        { x: 4520, y: 380 - 20, width: 24, height: 20, label: 'LEGO', color: '#32CD32',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.3 },

        // === SCREEN 6: BLIND_CORD + PLUG on platforms ===
        { x: 5300, y: 470 - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },
        { x: 5440, y: 270 - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // === SCREEN 7: LEGO on desk ===
        { x: 6140, y: 390 - 20, width: 24, height: 20, label: 'LEGO', color: '#FF0000' },

        // === SCREEN 8: 2 timed obstacles on maze platforms ===
        { x: 7050, y: 380 - 20, width: 24, height: 20, label: 'LEGO', color: '#0000FF',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 7430, y: 380 - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.3 },

        // === SCREEN 9: BLIND_CORD + LEGO ===
        { x: 8050, y: 380 - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },
        { x: 8480, y: 470 - 20, width: 24, height: 20, label: 'LEGO', color: '#FF8C00',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.5 },

        // === SCREEN 10: LEGO + CORNER ===
        { x: 8860, y: 390 - 20, width: 24, height: 20, label: 'LEGO', color: '#32CD32',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 9300, y: 270 - 20, width: 30, height: 20, label: 'CORNER', color: '#8B4513' },

        // === SCREEN 11: LEGO + BLIND_CORD + PLUG ===
        { x: 9720, y: 470 - 20, width: 24, height: 20, label: 'LEGO', color: '#FF0000',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.3 },
        { x: 10080, y: 380 - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },
        { x: 10220, y: 390 - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },
    ],

    // ========== ENEMIES ==========
    // All on platforms, not ground
    enemies: [
        // === SCREEN 1: TOY_SOLDIER on desk ===
        { x: 340, y: 475 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 140 },

        // === SCREEN 2: BOUNCING_BALL on desk ===
        { x: 1280, y: 475 - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', behavior: 'jumper', patrolRange: 160 },

        // === SCREEN 3: TOY_SOLDIER on shelf ===
        { x: 2420, y: 470 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 140 },

        // === SCREEN 4: BOUNCING_BALL on center desk ===
        { x: 3150, y: 390 - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', behavior: 'jumper', patrolRange: 160 },

        // === SCREEN 5: RC_HELICOPTER + TOY_SOLDIER ===
        { x: 4220, y: 390 - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', behavior: 'charger', patrolRange: 200 },
        { x: 4800, y: 470 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 140 },

        // === SCREEN 6: BOUNCING_BALL + TOY_SOLDIER ===
        { x: 5300, y: 470 - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', behavior: 'jumper', patrolRange: 140 },
        { x: 5580, y: 470 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 140 },

        // === SCREEN 7: RC_HELICOPTER on desk ===
        { x: 6140, y: 390 - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', behavior: 'charger', patrolRange: 180 },

        // === SCREEN 8: TOY_SOLDIER + BOUNCING_BALL in maze ===
        { x: 7060, y: 380 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 120 },
        { x: 7340, y: 475 - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', behavior: 'jumper', patrolRange: 100 },

        // === SCREEN 9: RC_HELICOPTER + TOY_SOLDIER ===
        { x: 8200, y: 390 - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', behavior: 'charger', patrolRange: 200 },
        { x: 8480, y: 470 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 140 },

        // === SCREEN 10: BOUNCING_BALL + RC_HELICOPTER ===
        { x: 8860, y: 390 - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', behavior: 'jumper', patrolRange: 100 },
        { x: 9300, y: 270 - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', behavior: 'charger', patrolRange: 120 },

        // === SCREEN 11: 2 TOY_SOLDIER + 1 RC_HELICOPTER ===
        { x: 9920, y: 390 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 120 },
        { x: 10220, y: 390 - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', behavior: 'shooter', patrolRange: 120 },
        { x: 10360, y: 480 - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', behavior: 'charger', patrolRange: 100 },
    ],
};
