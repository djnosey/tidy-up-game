// Level 5: Parents' Room
// 4 screen widths (~3840px at 960px canvas width)

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 4;

export const level5 = {
    name: "Parents' Room",
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#E8E0D8',
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
        // Cornice / crown molding at ceiling
        { x: 0, y: 8, type: 'cornice', w: LEVEL_W },
        // Dado rail across all walls
        { x: 0, y: GROUND_Y - 250, type: 'dado_rail', w: LEVEL_W },
        // Skirting board
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },

        // === SECTION 1 (0-960): Bedroom entrance, bed area ===
        // Ceiling light (elegant pendant)
        { x: 480, y: 70, type: 'ceiling_light', size: 50, color: '#F5E8D0' },
        // Window with elegant curtains
        { x: 600, y: GROUND_Y - 390, type: 'window', w: 100, h: 85 },
        { x: 575, y: GROUND_Y - 395, type: 'curtain', w: 35, h: 260, color: '#4A3050' },
        { x: 710, y: GROUND_Y - 395, type: 'curtain', w: 35, h: 260, color: '#4A3050' },
        // Large rug beside bed
        { x: 250, y: GROUND_Y - 5, type: 'rug', w: 320, h: 12, color: '#7B5B6B' },
        // Family photos on wall
        { x: 60, y: GROUND_Y - 340, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 120, y: GROUND_Y - 360, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        // Standing lamp near entrance
        { x: 40, y: GROUND_Y - 180, type: 'standing_lamp', floorY: GROUND_Y, color: '#E8D8B8' },
        // Wall art (landscape painting)
        { x: 780, y: GROUND_Y - 350, type: 'wall_art', w: 60, h: 45, color: '#B8860B' },
        // Plant on bedside table
        { x: 180, y: GROUND_Y - 100, emoji: '🪴', size: 28 },
        // Clock on wall
        { x: 870, y: GROUND_Y - 370, emoji: '🕰️', size: 30 },
        // Radiator under window
        { x: 595, y: GROUND_Y - 55, type: 'radiator', w: 110, h: 35 },
        // Wall socket
        { x: 150, y: GROUND_Y - 50, type: 'wall_socket' },

        // === SECTION 2 (960-1920): Wardrobe & laundry area ===
        // Ceiling light
        { x: 1400, y: 75, type: 'ceiling_light', size: 48, color: '#F0E4D0' },
        // Window with deep curtains
        { x: 1250, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 1228, y: GROUND_Y - 385, type: 'curtain', w: 32, h: 245, color: '#2F1F3F' },
        { x: 1350, y: GROUND_Y - 385, type: 'curtain', w: 32, h: 245, color: '#2F1F3F' },
        // Rug near wardrobe
        { x: 1050, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#6B4F5F' },
        // Wall art
        { x: 970, y: GROUND_Y - 360, type: 'wall_art', w: 50, h: 38, color: '#654321' },
        { x: 1700, y: GROUND_Y - 340, type: 'wall_art', w: 45, h: 35, color: '#B8860B' },
        // Family photos
        { x: 1500, y: GROUND_Y - 350, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 1560, y: GROUND_Y - 370, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        // Flowers on shelf
        { x: 1820, y: GROUND_Y - 200, emoji: '💐', size: 26 },
        // Radiator
        { x: 1245, y: GROUND_Y - 50, type: 'radiator', w: 95, h: 32 },
        // Wall sockets
        { x: 1100, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 1880, y: GROUND_Y - 50, type: 'wall_socket' },
        // Standing lamp
        { x: 1900, y: GROUND_Y - 175, type: 'standing_lamp', floorY: GROUND_Y, color: '#D8C8A8' },

        // === SECTION 3 (1920-2880): Challenge zone ===
        // Ceiling light
        { x: 2400, y: 68, type: 'ceiling_light', size: 44, color: '#F5E6D0' },
        // Window with curtains
        { x: 2350, y: GROUND_Y - 385, type: 'window', w: 90, h: 78 },
        { x: 2330, y: GROUND_Y - 390, type: 'curtain', w: 30, h: 250, color: '#4A3050' },
        { x: 2450, y: GROUND_Y - 390, type: 'curtain', w: 30, h: 250, color: '#4A3050' },
        // Large elegant rug
        { x: 2100, y: GROUND_Y - 5, type: 'rug', w: 300, h: 12, color: '#5C3A4E' },
        // Wall art
        { x: 1960, y: GROUND_Y - 390, type: 'wall_art', w: 55, h: 42, color: '#B8860B' },
        { x: 2680, y: GROUND_Y - 340, type: 'wall_art', w: 48, h: 36, color: '#654321' },
        // Family photo
        { x: 2160, y: GROUND_Y - 370, type: 'family_photo', w: 30, h: 26, color: '#B8860B' },
        // Clock
        { x: 2800, y: GROUND_Y - 380, emoji: '🕰️', size: 28 },
        // Plant in corner
        { x: 2860, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        // Radiator
        { x: 2345, y: GROUND_Y - 55, type: 'radiator', w: 100, h: 34 },
        // Wall sockets
        { x: 2030, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2760, y: GROUND_Y - 50, type: 'wall_socket' },

        // === SECTION 4 (2880-3840): Boss arena ===
        // Dramatic ceiling light
        { x: 3400, y: 58, type: 'ceiling_light', size: 56, color: '#E8D0B0' },
        // Large rug (boss arena)
        { x: 3300, y: GROUND_Y - 5, type: 'rug', w: 480, h: 14, color: '#3D2030' },
        // Wall art flanking arena
        { x: 3000, y: GROUND_Y - 360, type: 'wall_art', w: 58, h: 44, color: '#B8860B' },
        { x: 3720, y: GROUND_Y - 350, type: 'wall_art', w: 52, h: 40, color: '#654321' },
        // Family photos
        { x: 3150, y: GROUND_Y - 380, type: 'family_photo', w: 34, h: 30, color: '#B8860B' },
        { x: 3580, y: GROUND_Y - 375, type: 'family_photo', w: 30, h: 26, color: '#8B6914' },
        // Plants
        { x: 2940, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 3810, y: GROUND_Y - 36, emoji: '💐', size: 28 },
        // Radiators
        { x: 3050, y: GROUND_Y - 52, type: 'radiator', w: 85, h: 32 },
        { x: 3680, y: GROUND_Y - 52, type: 'radiator', w: 85, h: 32 },
        // Wall sockets
        { x: 3100, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3760, y: GROUND_Y - 50, type: 'wall_socket' },
        // Clock above boss
        { x: 3380, y: GROUND_Y - 410, emoji: '🕰️', size: 32 },
        // Dust bunnies under furniture
        { x: 300, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 1100, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 2200, y: GROUND_Y - 8, type: 'dust_bunny' },
        { x: 1600, y: GROUND_Y - 250, type: 'dust_motes' },
        { x: CANVAS_W * 3 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground (wood floor)
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#A0886B' },

        // === Section 1 (0-960): Entrance, bedside table, bed, dresser ===
        // Bedside table (left side of bed)
        { x: 150, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },
        // BED — wide, bouncy (purple duvet)
        { x: 280, y: GROUND_Y - 70, width: 260, height: 24, label: 'BED', color: '#6B4470' },
        // Bedside table (right side of bed)
        { x: 590, y: GROUND_Y - 55, width: 70, height: 20, label: 'BEDSIDE_TABLE', color: '#8B6E50' },
        // Dresser (tall, stepping stone upward)
        { x: 760, y: GROUND_Y - 90, width: 110, height: 22, label: 'DRESSER', color: '#7B5B45' },
        // Shelf above dresser
        { x: 800, y: GROUND_Y - 200, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // === Section 2 (960-1920): Wardrobe, laundry basket, shelves ===
        // Wardrobe (large, solid)
        { x: 1000, y: GROUND_Y - 80, width: 140, height: 22, label: 'WARDROBE', color: '#5C3D2E' },
        // Shelf on wardrobe wall
        { x: 1030, y: GROUND_Y - 190, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 60, moveSpeed: 1.0 },
        // Shelf higher up — climbing route
        { x: 1150, y: GROUND_Y - 280, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Laundry basket
        { x: 1300, y: GROUND_Y - 50, width: 90, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // Chair near dressing area
        { x: 1480, y: GROUND_Y - 55, width: 75, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Shelf along wall
        { x: 1600, y: GROUND_Y - 120, width: 90, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 70, moveSpeed: 1.2 },
        // Dresser near end
        { x: 1770, y: GROUND_Y - 65, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // High shelf for collectables
        { x: 1820, y: GROUND_Y - 200, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          moveY: -50, moveSpeed: 0.8 },

        // === Section 3 (1920-2880): Challenge zone, tight jumps ===
        // Bedside table (guest side feel)
        { x: 1960, y: GROUND_Y - 55, width: 70, height: 18, label: 'BEDSIDE_TABLE', color: '#8B6E50' },
        // Shelf step-ups (tight sequence)
        { x: 2060, y: GROUND_Y - 130, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 2170, y: GROUND_Y - 200, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        { x: 2060, y: GROUND_Y - 270, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Laundry basket gap
        { x: 2320, y: GROUND_Y - 50, width: 80, height: 18, label: 'LAUNDRY_BASKET', color: '#C4A882' },
        // Chair hop
        { x: 2470, y: GROUND_Y - 60, width: 70, height: 18, label: 'CHAIR', color: '#6B5040' },
        // Dresser
        { x: 2600, y: GROUND_Y - 90, width: 100, height: 20, label: 'DRESSER', color: '#7B5B45' },
        // High shelf (reward route)
        { x: 2650, y: GROUND_Y - 210, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },
        // Wardrobe near end of section
        { x: 2780, y: GROUND_Y - 75, width: 90, height: 20, label: 'WARDROBE', color: '#5C3D2E' },

        // === Section 4 (2880-3840): Boss arena ===
        // Platforms for dodging boss attacks
        { x: 3020, y: GROUND_Y - 110, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 3250, y: GROUND_Y - 140, width: 90, height: 18, label: 'DRESSER', color: '#7B5B45' },
        { x: 3500, y: GROUND_Y - 110, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // Section 1 — items on bedside tables, bed, and dresser
        { x: 170, y: GROUND_Y - 80, label: 'PHONE', color: '#333333' },
        { x: 200, y: GROUND_Y - 80, label: 'GLASS', color: '#87CEEB' },
        { x: 340, y: GROUND_Y - 95, label: 'PILLOW', color: '#E8D8E0' },
        { x: 420, y: GROUND_Y - 95, label: 'CLOTHES', color: '#6B4470' },
        { x: 480, y: GROUND_Y - 95, label: 'BOOK', color: '#8B0000' },
        { x: 610, y: GROUND_Y - 80, label: 'CHARGER', color: '#333333' },
        { x: 790, y: GROUND_Y - 118, label: 'SLIPPER', color: '#D2691E' },
        { x: 830, y: GROUND_Y - 230, label: 'BOOK', color: '#4682B4' },

        // Section 2 — wardrobe and laundry items
        { x: 1040, y: GROUND_Y - 108, label: 'CLOTHES', color: '#4169E1' },
        { x: 1100, y: GROUND_Y - 108, label: 'CLOTHES', color: '#CD5C5C' },
        { x: 1060, y: GROUND_Y - 218, label: 'LAUNDRY', color: '#9370DB' },
        { x: 1180, y: GROUND_Y - 310, label: 'PILLOW', color: '#F0E0D0' },
        { x: 1330, y: GROUND_Y - 78, label: 'LAUNDRY', color: '#8FBC8F' },
        { x: 1510, y: GROUND_Y - 80, label: 'SLIPPER', color: '#D2691E' },
        { x: 1630, y: GROUND_Y - 148, label: 'BOOK', color: '#8B4513' },
        { x: 1800, y: GROUND_Y - 92, label: 'CLOTHES', color: '#556B2F' },
        { x: 1850, y: GROUND_Y - 228, label: 'GLASS', color: '#87CEEB' },

        // Section 3 — harder to reach items
        { x: 1985, y: GROUND_Y - 80, label: 'PHONE', color: '#333333' },
        { x: 2090, y: GROUND_Y - 158, label: 'CHARGER', color: '#333333' },
        { x: 2200, y: GROUND_Y - 228, label: 'PILLOW', color: '#E0D0E8' },
        { x: 2090, y: GROUND_Y - 298, label: 'BOOK', color: '#006400' },
        { x: 2350, y: GROUND_Y - 78, label: 'LAUNDRY', color: '#B0C4DE' },
        { x: 2500, y: GROUND_Y - 88, label: 'CLOTHES', color: '#8B6914' },
        { x: 2680, y: GROUND_Y - 238, label: 'BOOK', color: '#8B0000' },

        // Health pickup (reward for tricky jump)
        { x: 2640, y: GROUND_Y - 118, label: '+HEALTH', color: '#00FF00' },

        // Extra life — above the highest shelf in the dressing area, tight jump
        { x: 2080, y: GROUND_Y - 340, label: '+LIFE', color: '#FF1493' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // Section 1 — bedroom hazards
        { x: 250, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },
        { x: 680, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },

        // Section 2 — more hazards around wardrobe area
        { x: 1200, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },
        { x: 1420, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4',
          timerOn: 1.8, timerOff: 2.0, timerOffset: 0 },
        { x: 1700, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // Section 3 — challenge zone hazards
        { x: 2250, y: GROUND_Y - 20, width: 30, height: 20, label: 'CORNER', color: '#8B4513' },
        { x: 2420, y: GROUND_Y - 22, width: 30, height: 22, label: 'IRON', color: '#C0C0C0',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 2720, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333333' },
        { x: 2850, y: GROUND_Y - 20, width: 28, height: 20, label: 'HAIR_STRAIGHTENER', color: '#FF69B4' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // Section 1
        { x: 500, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },

        // Section 2
        { x: 1250, y: GROUND_Y - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90 },
        { x: 1550, y: GROUND_Y - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 60 },

        // Section 3
        { x: 2150, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },
        { x: 2380, y: GROUND_Y - 25, width: 25, height: 25, label: 'ALARM_CLOCK', color: '#B0B0B0', patrolRange: 90 },
        { x: 2560, y: GROUND_Y - 30, width: 35, height: 30, label: 'LAUNDRY_MONSTER', color: '#8B6E8B', patrolRange: 60 },
        { x: 2750, y: GROUND_Y - 20, width: 25, height: 20, label: 'MOTH', color: '#C0B090', patrolRange: 80 },
    ],
};
