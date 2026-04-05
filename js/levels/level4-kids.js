// Level 4: Kids' Room
// 12 screen widths (~11520px at 960px canvas width)
// Signature: BED bounce (225px!), pillow fort crumble chains, toy chaos
// Difficulty: 10% easy, 35% moderate, 40% challenging, 15% expert

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 12;

export const level4 = {
    name: "Kids' Room",
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#F5E8D0',
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

        // === SCREEN 4 (2880-3840): REST - Board game plateau ===
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

        // === SCREEN 8 (6720-7680): ESCALATE - Moving shelf gauntlet ===
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

        // === SCREEN 11 (9600-10560): GAUNTLET - Pre-boss ===
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
    platforms: [
        // Ground (carpet)
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#C4A882' },

        // === SCREEN 1 (0-960): TEACH - Toy chest intro ===
        // Easy hops, 80-100px gaps, gentle introduction
        { x: 150, y: GROUND_Y - 55, width: 130, height: 22, label: 'TOY_CHEST', color: '#CD853F' },
        { x: 370, y: GROUND_Y - 50, width: 160, height: 20, label: 'DESK', color: '#DEB887' },
        { x: 610, y: GROUND_Y - 85, width: 70, height: 16, label: 'CUSHION', color: '#FF6B6B' },
        { x: 770, y: GROUND_Y - 120, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },

        // === SCREEN 2 (960-1920): TEST - Desk & shelf climb ===
        // Desk stepping stones to 4-tier shelf tower, 100-120px gaps
        { x: 1000, y: GROUND_Y - 55, width: 160, height: 20, label: 'DESK', color: '#DEB887' },
        { x: 1230, y: GROUND_Y - 90, width: 160, height: 20, label: 'DESK', color: '#DEB887' },
        // 4-tier shelf tower (70px vertical steps)
        { x: 1460, y: GROUND_Y - 90, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 1560, y: GROUND_Y - 160, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 1460, y: GROUND_Y - 230, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 1560, y: GROUND_Y - 300, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Landing after tower
        { x: 1720, y: GROUND_Y - 60, width: 130, height: 22, label: 'TOY_CHEST', color: '#CD853F' },

        // === SCREEN 3 (1920-2880): SIGNATURE - Bunk bed section ===
        // Lower bunk - player reaches from ground (70px up from ground)
        { x: 2000, y: GROUND_Y - 70, width: 200, height: 20, label: 'BUNK_BED', color: '#8B4513' },
        // Shelf stepping stone between bunks
        { x: 2250, y: GROUND_Y - 160, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Upper bunk at y=295 (bounce from lower at y=450 gives 225px rise -> reach y=225, then jump to 295)
        // Actually: lower bunk at y=450, bounce gives vel -900 -> 225px height -> reach y=225
        // Upper bunk at y=295: from shelf at y=342 (160px up from ground), normal jump 144px -> reach y=198. Reachable.
        // Let's position: lower bunk at GROUND_Y-70=450. Bounce to y=225. Shelf at y=320 reachable from bounce.
        // Upper bunk at y=295: reachable from shelf at 320 (25px step up, easy).
        { x: 2000, y: GROUND_Y - 225, width: 200, height: 20, label: 'BUNK_BED', color: '#8B4513' },
        // Platform after bunks
        { x: 2400, y: GROUND_Y - 100, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 2580, y: GROUND_Y - 55, width: 130, height: 22, label: 'TOY_CHEST', color: '#CD853F' },
        { x: 2780, y: GROUND_Y - 90, width: 70, height: 16, label: 'CUSHION', color: '#87CEEB' },

        // === SCREEN 4 (2880-3840): REST - Board game plateau ===
        // Wide platforms, easy horizontal movement
        { x: 2950, y: GROUND_Y - 50, width: 150, height: 20, label: 'BOARD_GAMES', color: '#228B22' },
        { x: 3180, y: GROUND_Y - 50, width: 150, height: 20, label: 'BOARD_GAMES', color: '#228B22' },
        { x: 3410, y: GROUND_Y - 80, width: 80, height: 16, label: 'CUSHION', color: '#FFD700' },
        { x: 3560, y: GROUND_Y - 50, width: 150, height: 20, label: 'BOARD_GAMES', color: '#228B22' },
        { x: 3780, y: GROUND_Y - 55, width: 60, height: 16, label: 'CUSHION', color: '#4ECDC4' },

        // === SCREEN 5 (3840-4800): CHALLENGE - Moving cushion chain ===
        // Static landing zone -> moving cushion -> static -> moving -> ...
        { x: 3900, y: GROUND_Y - 70, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 4080, y: GROUND_Y - 120, width: 70, height: 16, label: 'CUSHION', color: '#FF6B6B',
          moveY: -60, moveSpeed: 1.0 },
        { x: 4260, y: GROUND_Y - 80, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 4430, y: GROUND_Y - 140, width: 70, height: 16, label: 'CUSHION', color: '#4ECDC4',
          moveY: -60, moveSpeed: 1.2 },
        { x: 4600, y: GROUND_Y - 90, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 4750, y: GROUND_Y - 55, width: 60, height: 16, label: 'CUSHION', color: '#87CEEB' },

        // === SCREEN 6 (4800-5760): CHALLENGE - Pillow fort crumble ===
        // 5 pillow forts, 3 crumbling, must chain jumps
        { x: 4860, y: GROUND_Y - 60, width: 100, height: 22, label: 'PILLOW_FORT', color: '#DDA0DD' },
        { x: 5020, y: GROUND_Y - 110, width: 90, height: 20, label: 'PILLOW_FORT', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 3.0 },
        { x: 5180, y: GROUND_Y - 70, width: 80, height: 20, label: 'PILLOW_FORT', color: '#DDA0DD' },
        { x: 5330, y: GROUND_Y - 130, width: 90, height: 22, label: 'PILLOW_FORT', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        { x: 5490, y: GROUND_Y - 80, width: 100, height: 20, label: 'PILLOW_FORT', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 2.5 },
        // Safe landing after crumble gauntlet
        { x: 5660, y: GROUND_Y - 55, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },

        // === SCREEN 7 (5760-6720): RISK/REWARD - Second bunk bed ===
        // Ground-level safe path
        { x: 5820, y: GROUND_Y - 50, width: 130, height: 22, label: 'TOY_CHEST', color: '#CD853F' },
        { x: 6020, y: GROUND_Y - 55, width: 60, height: 16, label: 'CUSHION', color: '#FFD700' },
        // Bunk bed for high path
        { x: 6180, y: GROUND_Y - 70, width: 200, height: 20, label: 'BUNK_BED', color: '#8B4513' },
        // Upper shelf reachable via bounce (bounce from y=450 gives 225px -> reach y=225)
        { x: 6180, y: GROUND_Y - 225, width: 200, height: 20, label: 'BUNK_BED', color: '#8B4513' },
        // Shelf high up for +LIFE (reachable from upper bunk bounce: y=295, bounce 225px -> reach y=70)
        { x: 6280, y: GROUND_Y - 350, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Continue rightward
        { x: 6470, y: GROUND_Y - 60, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 6630, y: GROUND_Y - 50, width: 70, height: 16, label: 'CUSHION', color: '#FF6B6B' },

        // === SCREEN 8 (6720-7680): ESCALATE - Moving shelf gauntlet ===
        // 4 moving shelves at staggered heights, 180px gaps
        { x: 6780, y: GROUND_Y - 70, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 70, moveSpeed: 1.0 },
        { x: 6980, y: GROUND_Y - 140, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 70, moveSpeed: 1.2 },
        { x: 7200, y: GROUND_Y - 90, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 70, moveSpeed: 1.4 },
        { x: 7400, y: GROUND_Y - 150, width: 80, height: 18, label: 'SHELF', color: '#D2691E',
          moveX: 70, moveSpeed: 1.0 },
        // Safe landing
        { x: 7580, y: GROUND_Y - 55, width: 90, height: 20, label: 'SHELF', color: '#D2691E' },

        // === SCREEN 9 (7680-8640): ESCALATE - Crumble + moving combo ===
        // Crumbling pillow forts leading to moving cushions
        { x: 7740, y: GROUND_Y - 70, width: 90, height: 22, label: 'PILLOW_FORT', color: '#DDA0DD',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        { x: 7910, y: GROUND_Y - 130, width: 80, height: 20, label: 'PILLOW_FORT', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.7, crumbleRespawn: 2.5 },
        { x: 8080, y: GROUND_Y - 90, width: 70, height: 16, label: 'CUSHION', color: '#4ECDC4',
          moveY: -60, moveSpeed: 1.2 },
        { x: 8240, y: GROUND_Y - 140, width: 70, height: 16, label: 'CUSHION', color: '#87CEEB',
          moveY: -60, moveSpeed: 1.0 },
        { x: 8400, y: GROUND_Y - 70, width: 100, height: 22, label: 'PILLOW_FORT', color: '#DDA0DD' },
        { x: 8560, y: GROUND_Y - 55, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },

        // === SCREEN 10 (8640-9600): ESCALATE - Vertical + horizontal gauntlet ===
        // 6-tier climb with 190px horizontal gaps, mix of static shelf and narrow cushion
        { x: 8700, y: GROUND_Y - 70, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 8880, y: GROUND_Y - 140, width: 60, height: 16, label: 'CUSHION', color: '#FFD700' },
        { x: 9060, y: GROUND_Y - 210, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 9240, y: GROUND_Y - 280, width: 60, height: 16, label: 'CUSHION', color: '#FF6B6B' },
        { x: 9060, y: GROUND_Y - 350, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        { x: 8880, y: GROUND_Y - 400, width: 60, height: 16, label: 'CUSHION', color: '#4ECDC4' },
        // Descent / landing
        { x: 9420, y: GROUND_Y - 60, width: 130, height: 22, label: 'TOY_CHEST', color: '#CD853F' },

        // === SCREEN 11 (9600-10560): GAUNTLET - Pre-boss ===
        // Everything combined: moving, crumbling, static, bed bounce
        { x: 9660, y: GROUND_Y - 70, width: 200, height: 20, label: 'BUNK_BED', color: '#8B4513' },
        // Shelf reachable from bounce
        { x: 9920, y: GROUND_Y - 200, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Crumbling fort
        { x: 10060, y: GROUND_Y - 120, width: 90, height: 22, label: 'PILLOW_FORT', color: '#FFB6C1',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Moving cushion
        { x: 10200, y: GROUND_Y - 160, width: 70, height: 16, label: 'CUSHION', color: '#87CEEB',
          moveY: -50, moveSpeed: 1.2 },
        // Static shelf
        { x: 10350, y: GROUND_Y - 90, width: 80, height: 18, label: 'SHELF', color: '#D2691E' },
        // Final landing before boss door
        { x: 10480, y: GROUND_Y - 55, width: 70, height: 16, label: 'CUSHION', color: '#FFD700' },

        // === SCREEN 12 (10560-11520): BOSS ARENA ===
        // 3 shelves for dodging during boss fight
        { x: 10700, y: GROUND_Y - 110, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 10950, y: GROUND_Y - 140, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
        { x: 11200, y: GROUND_Y - 110, width: 80, height: 20, label: 'SHELF', color: '#D2691E' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // === SCREEN 1 (0-960): 10 collectables ===
        { x: 170, y: GROUND_Y - 88, label: 'TEDDY', color: '#8B6914' },
        { x: 230, y: GROUND_Y - 88, label: 'TOY_CAR', color: '#FF0000' },
        { x: 390, y: GROUND_Y - 83, label: 'PENCIL', color: '#FFD700' },
        { x: 470, y: GROUND_Y - 83, label: 'CRAYON', color: '#FF4500' },
        { x: 630, y: GROUND_Y - 118, label: 'BLOCK', color: '#1E90FF' },
        { x: 790, y: GROUND_Y - 153, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 840, y: GROUND_Y - 153, label: 'STICKER', color: '#FF69B4' },
        { x: 300, y: GROUND_Y - 30, label: 'CRAYON', color: '#9400D3' },
        { x: 550, y: GROUND_Y - 30, label: 'BLOCK', color: '#32CD32' },
        { x: 900, y: GROUND_Y - 30, label: 'PUZZLE', color: '#4682B4' },

        // === SCREEN 2 (960-1920): 10 collectables ===
        { x: 1040, y: GROUND_Y - 88, label: 'TEDDY', color: '#CD853F' },
        { x: 1120, y: GROUND_Y - 88, label: 'TOY_CAR', color: '#FF4500' },
        { x: 1270, y: GROUND_Y - 123, label: 'PENCIL', color: '#FFD700' },
        { x: 1350, y: GROUND_Y - 123, label: 'STICKER', color: '#FF1493' },
        { x: 1480, y: GROUND_Y - 123, label: 'BLOCK', color: '#FF6347' },
        { x: 1580, y: GROUND_Y - 193, label: 'CRAYON', color: '#FF8C00' },
        { x: 1480, y: GROUND_Y - 263, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 1580, y: GROUND_Y - 333, label: 'PUZZLE', color: '#20B2AA' },
        { x: 1740, y: GROUND_Y - 93, label: 'TOY_CAR', color: '#DC143C' },
        { x: 1000, y: GROUND_Y - 30, label: 'BLOCK', color: '#1E90FF' },

        // === SCREEN 3 (1920-2880): 10 collectables ===
        // Items on lower bunk
        { x: 2040, y: GROUND_Y - 103, label: 'TEDDY', color: '#DEB887' },
        { x: 2120, y: GROUND_Y - 103, label: 'STICKER', color: '#FF69B4' },
        // Items on shelf between bunks
        { x: 2270, y: GROUND_Y - 193, label: 'CRAYON', color: '#9400D3' },
        // Items on upper bunk
        { x: 2040, y: GROUND_Y - 258, label: 'PUZZLE', color: '#4682B4' },
        { x: 2120, y: GROUND_Y - 258, label: 'ACTION_FIG', color: '#8B008B' },
        // Items after bunks
        { x: 2420, y: GROUND_Y - 133, label: 'BLOCK', color: '#32CD32' },
        { x: 2610, y: GROUND_Y - 88, label: 'TOY_CAR', color: '#FF0000' },
        { x: 2800, y: GROUND_Y - 123, label: 'PENCIL', color: '#FFD700' },
        // Ground items
        { x: 2300, y: GROUND_Y - 30, label: 'STICKER', color: '#FF1493' },
        { x: 2700, y: GROUND_Y - 30, label: 'CRAYON', color: '#FF4500' },

        // === SCREEN 4 (2880-3840): 8 collectables + 1 +HEALTH ===
        { x: 2980, y: GROUND_Y - 83, label: 'TEDDY', color: '#8B6914' },
        { x: 3060, y: GROUND_Y - 83, label: 'TOY_CAR', color: '#FF4500' },
        { x: 3210, y: GROUND_Y - 83, label: 'BLOCK', color: '#1E90FF' },
        { x: 3290, y: GROUND_Y - 83, label: 'PENCIL', color: '#FFD700' },
        { x: 3430, y: GROUND_Y - 113, label: 'CRAYON', color: '#FF8C00' },
        { x: 3590, y: GROUND_Y - 83, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 3690, y: GROUND_Y - 83, label: 'PUZZLE', color: '#20B2AA' },
        { x: 3800, y: GROUND_Y - 88, label: 'STICKER', color: '#FF69B4' },
        // +HEALTH
        { x: 3430, y: GROUND_Y - 30, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 5 (3840-4800): 9 collectables ===
        { x: 3930, y: GROUND_Y - 103, label: 'TEDDY', color: '#CD853F' },
        { x: 4100, y: GROUND_Y - 153, label: 'BLOCK', color: '#FF6347' },
        { x: 4290, y: GROUND_Y - 113, label: 'TOY_CAR', color: '#DC143C' },
        { x: 4450, y: GROUND_Y - 173, label: 'CRAYON', color: '#9400D3' },
        { x: 4620, y: GROUND_Y - 123, label: 'PENCIL', color: '#FFD700' },
        { x: 4770, y: GROUND_Y - 88, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 4200, y: GROUND_Y - 30, label: 'STICKER', color: '#FF1493' },
        { x: 4500, y: GROUND_Y - 30, label: 'PUZZLE', color: '#4682B4' },
        { x: 3870, y: GROUND_Y - 30, label: 'BLOCK', color: '#32CD32' },

        // === SCREEN 6 (4800-5760): 9 collectables ===
        { x: 4890, y: GROUND_Y - 93, label: 'TEDDY', color: '#DEB887' },
        { x: 5050, y: GROUND_Y - 143, label: 'CRAYON', color: '#FF4500' },
        { x: 5210, y: GROUND_Y - 103, label: 'TOY_CAR', color: '#FF0000' },
        { x: 5360, y: GROUND_Y - 163, label: 'BLOCK', color: '#1E90FF' },
        { x: 5520, y: GROUND_Y - 113, label: 'PENCIL', color: '#FFD700' },
        { x: 5690, y: GROUND_Y - 88, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 5100, y: GROUND_Y - 30, label: 'STICKER', color: '#FF69B4' },
        { x: 5400, y: GROUND_Y - 30, label: 'PUZZLE', color: '#20B2AA' },
        { x: 5600, y: GROUND_Y - 30, label: 'CRAYON', color: '#FF8C00' },

        // === SCREEN 7 (5760-6720): 8 collectables + 1 +HEALTH + 1 +LIFE ===
        // Ground-level safe path items (5 items)
        { x: 5850, y: GROUND_Y - 83, label: 'TEDDY', color: '#8B6914' },
        { x: 5920, y: GROUND_Y - 83, label: 'TOY_CAR', color: '#FF4500' },
        { x: 6040, y: GROUND_Y - 88, label: 'BLOCK', color: '#FF6347' },
        { x: 6490, y: GROUND_Y - 93, label: 'PENCIL', color: '#FFD700' },
        { x: 6650, y: GROUND_Y - 83, label: 'CRAYON', color: '#9400D3' },
        // Bonus items on upper bunk (3 items requiring bounce)
        { x: 6220, y: GROUND_Y - 258, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 6300, y: GROUND_Y - 258, label: 'PUZZLE', color: '#4682B4' },
        { x: 6380, y: GROUND_Y - 258, label: 'STICKER', color: '#FF1493' },
        // +HEALTH on high path (on upper bunk)
        { x: 6120, y: GROUND_Y - 258, label: '+HEALTH', color: '#00FF00' },
        // +LIFE at very top (on the high shelf, requires bounce from upper bunk)
        { x: 6310, y: GROUND_Y - 383, label: '+LIFE', color: '#FF1493' },

        // === SCREEN 8 (6720-7680): 8 collectables ===
        { x: 6810, y: GROUND_Y - 103, label: 'TEDDY', color: '#CD853F' },
        { x: 7010, y: GROUND_Y - 173, label: 'TOY_CAR', color: '#DC143C' },
        { x: 7230, y: GROUND_Y - 123, label: 'CRAYON', color: '#FF4500' },
        { x: 7430, y: GROUND_Y - 183, label: 'BLOCK', color: '#32CD32' },
        { x: 7600, y: GROUND_Y - 88, label: 'PENCIL', color: '#FFD700' },
        { x: 6900, y: GROUND_Y - 30, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 7150, y: GROUND_Y - 30, label: 'STICKER', color: '#FF69B4' },
        { x: 7500, y: GROUND_Y - 30, label: 'PUZZLE', color: '#20B2AA' },

        // === SCREEN 9 (7680-8640): 10 collectables ===
        { x: 7770, y: GROUND_Y - 103, label: 'TEDDY', color: '#DEB887' },
        { x: 7940, y: GROUND_Y - 163, label: 'TOY_CAR', color: '#FF0000' },
        { x: 8110, y: GROUND_Y - 123, label: 'CRAYON', color: '#FF8C00' },
        { x: 8270, y: GROUND_Y - 173, label: 'BLOCK', color: '#1E90FF' },
        { x: 8430, y: GROUND_Y - 103, label: 'PENCIL', color: '#FFD700' },
        { x: 8590, y: GROUND_Y - 88, label: 'ACTION_FIG', color: '#8B008B' },
        { x: 7850, y: GROUND_Y - 30, label: 'STICKER', color: '#FF1493' },
        { x: 8150, y: GROUND_Y - 30, label: 'PUZZLE', color: '#4682B4' },
        { x: 8350, y: GROUND_Y - 30, label: 'TOY_CAR', color: '#FF4500' },
        { x: 8550, y: GROUND_Y - 30, label: 'BLOCK', color: '#FF6347' },

        // === SCREEN 10 (8640-9600): 8 collectables + 1 +HEALTH ===
        { x: 8730, y: GROUND_Y - 103, label: 'TEDDY', color: '#8B6914' },
        { x: 8910, y: GROUND_Y - 173, label: 'CRAYON', color: '#9400D3' },
        { x: 9090, y: GROUND_Y - 243, label: 'TOY_CAR', color: '#DC143C' },
        { x: 9270, y: GROUND_Y - 313, label: 'ACTION_FIG', color: '#4169E1' },
        { x: 9090, y: GROUND_Y - 383, label: 'PUZZLE', color: '#20B2AA' },
        { x: 8910, y: GROUND_Y - 433, label: 'STICKER', color: '#FF69B4' },
        { x: 9450, y: GROUND_Y - 93, label: 'BLOCK', color: '#32CD32' },
        { x: 9500, y: GROUND_Y - 93, label: 'PENCIL', color: '#FFD700' },
        // +HEALTH
        { x: 9240, y: GROUND_Y - 30, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 11 (9600-10560): 10 collectables ===
        { x: 9700, y: GROUND_Y - 103, label: 'TEDDY', color: '#CD853F' },
        { x: 9780, y: GROUND_Y - 103, label: 'TOY_CAR', color: '#FF0000' },
        // High items from bounce
        { x: 9950, y: GROUND_Y - 233, label: 'CRAYON', color: '#FF4500' },
        { x: 10000, y: GROUND_Y - 233, label: 'BLOCK', color: '#1E90FF' },
        // On crumbling fort
        { x: 10090, y: GROUND_Y - 153, label: 'ACTION_FIG', color: '#8B008B' },
        // On moving cushion path
        { x: 10220, y: GROUND_Y - 193, label: 'PUZZLE', color: '#4682B4' },
        // On static shelf
        { x: 10370, y: GROUND_Y - 123, label: 'STICKER', color: '#FF1493' },
        { x: 10500, y: GROUND_Y - 88, label: 'PENCIL', color: '#FFD700' },
        // Ground
        { x: 9850, y: GROUND_Y - 30, label: 'CRAYON', color: '#FF8C00' },
        { x: 10300, y: GROUND_Y - 30, label: 'TOY_CAR', color: '#FF4500' },

        // === SCREEN 12 (10560-11520): 0 standard collectables (boss arena) ===
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // === SCREEN 1: 1 LEGO ===
        { x: 500, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#FF0000' },

        // === SCREEN 2: 1 BLIND_CORD ===
        { x: 1400, y: GROUND_Y - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },

        // === SCREEN 3: 1 LEGO timed ===
        { x: 2500, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#0000FF',
          timerOn: 2.0, timerOff: 1.8, timerOffset: 0.5 },

        // === SCREEN 4: 1 PLUG ===
        { x: 3350, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // === SCREEN 5: 2 LEGO timed ===
        { x: 4180, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#FF8C00',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.5 },
        { x: 4550, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#32CD32',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.3 },

        // === SCREEN 6: 1 BLIND_CORD + 1 PLUG ===
        { x: 5150, y: GROUND_Y - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },
        { x: 5450, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // === SCREEN 7: 1 LEGO ===
        { x: 6400, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#FF0000' },

        // === SCREEN 8: 2 timed obstacles ===
        { x: 7100, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#0000FF',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 7350, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.3 },

        // === SCREEN 9: 2 obstacles ===
        { x: 8000, y: GROUND_Y - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },
        { x: 8300, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#FF8C00',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.5 },

        // === SCREEN 10: 2 timed obstacles ===
        { x: 8800, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#32CD32',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 9150, y: GROUND_Y - 20, width: 30, height: 20, label: 'CORNER', color: '#8B4513' },

        // === SCREEN 11: 3 mixed obstacles ===
        { x: 9800, y: GROUND_Y - 20, width: 24, height: 20, label: 'LEGO', color: '#FF0000',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0.3 },
        { x: 10100, y: GROUND_Y - 25, width: 20, height: 25, label: 'BLIND_CORD', color: '#D2B48C' },
        { x: 10400, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // === SCREEN 1: 1 TOY_SOLDIER ===
        { x: 450, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },

        // === SCREEN 2: 1 BOUNCING_BALL ===
        { x: 1350, y: GROUND_Y - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', patrolRange: 100 },

        // === SCREEN 3: 1 TOY_SOLDIER ===
        { x: 2450, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },

        // === SCREEN 4: 1 BOUNCING_BALL ===
        { x: 3500, y: GROUND_Y - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', patrolRange: 100 },

        // === SCREEN 5: 1 RC_HELICOPTER + 1 TOY_SOLDIER ===
        { x: 4350, y: GROUND_Y - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', patrolRange: 120 },
        { x: 4700, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },

        // === SCREEN 6: 1 BOUNCING_BALL + 1 TOY_SOLDIER ===
        { x: 5100, y: GROUND_Y - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', patrolRange: 100 },
        { x: 5550, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },

        // === SCREEN 7: 1 RC_HELICOPTER ===
        { x: 6500, y: GROUND_Y - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', patrolRange: 120 },

        // === SCREEN 8: 1 TOY_SOLDIER + 1 BOUNCING_BALL ===
        { x: 7050, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },
        { x: 7350, y: GROUND_Y - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', patrolRange: 100 },

        // === SCREEN 9: 1 RC_HELICOPTER + 1 TOY_SOLDIER ===
        { x: 8200, y: GROUND_Y - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', patrolRange: 120 },
        { x: 8500, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },

        // === SCREEN 10: 1 BOUNCING_BALL + 1 RC_HELICOPTER ===
        { x: 9000, y: GROUND_Y - 25, width: 25, height: 25, label: 'BOUNCING_BALL', color: '#FF4500', patrolRange: 100 },
        { x: 9350, y: GROUND_Y - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', patrolRange: 120 },

        // === SCREEN 11: 2 TOY_SOLDIER + 1 RC_HELICOPTER ===
        { x: 9750, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },
        { x: 10150, y: GROUND_Y - 30, width: 25, height: 30, label: 'TOY_SOLDIER', color: '#B22222', patrolRange: 70 },
        { x: 10400, y: GROUND_Y - 20, width: 30, height: 20, label: 'RC_HELICOPTER', color: '#4682B4', patrolRange: 120 },
    ],
};
