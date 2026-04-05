// Level 6: Outdoor Terrace
// 5 screen widths (~4800px at 960px canvas width)

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 5;

export const level6 = {
    name: 'Outdoor Terrace',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#87CEEB', // Sky blue!
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 4 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 4,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 4 + 700,
        y: GROUND_Y - 50,
        label: 'BBQ DRAGON',
        color: '#8B2500',
        width: 160,
        height: 80,
        health: 5,
        speed: 320,
        attacks: ['charge', 'shoot', 'coalrain', 'charge', 'flight'],
    },

    // ========== DECORATIONS (non-interactive background) ==========
    decorations: [
        // === SKY — sun and clouds ===
        { x: 200, y: 40, emoji: '☀️', size: 50 },
        { x: 600, y: 55, emoji: '☁️', size: 40 },
        { x: 1100, y: 35, emoji: '☁️', size: 45 },
        { x: 1750, y: 60, emoji: '☁️', size: 38 },
        { x: 2400, y: 30, emoji: '☁️', size: 50 },
        { x: 3100, y: 50, emoji: '☁️', size: 42 },
        { x: 3700, y: 40, emoji: '☁️', size: 36 },
        { x: 4300, y: 55, emoji: '☁️', size: 44 },

        // === RAILING along terrace edge (spans most of level) ===
        { x: 0, y: GROUND_Y - 60, type: 'railing_deco', w: LEVEL_W - CANVAS_W, h: 6, color: '#6B4226' },

        // === SECTION 1 (0–960): Terrace entrance — lush Mediterranean ===
        // String lights
        { x: 50, y: 90, emoji: '💡', size: 18 }, { x: 150, y: 85, emoji: '💡', size: 18 },
        { x: 250, y: 90, emoji: '💡', size: 18 }, { x: 350, y: 85, emoji: '💡', size: 18 },
        { x: 450, y: 90, emoji: '💡', size: 18 }, { x: 550, y: 85, emoji: '💡', size: 18 },
        { x: 650, y: 90, emoji: '💡', size: 18 }, { x: 750, y: 85, emoji: '💡', size: 18 },
        { x: 850, y: 90, emoji: '💡', size: 18 },
        // Potted plants — terracotta pots everywhere
        { x: 10, y: GROUND_Y - 45, emoji: '🪴', size: 38 },
        { x: 60, y: GROUND_Y - 35, emoji: '🌿', size: 28 },
        { x: 480, y: GROUND_Y - 38, emoji: '🪴', size: 32 },
        { x: 900, y: GROUND_Y - 42, emoji: '🪴', size: 36 },
        // Big olive tree
        { x: 120, y: GROUND_Y - 120, emoji: '🌳', size: 55 },
        // Flower boxes on railing
        { x: 180, y: GROUND_Y - 78, emoji: '🌺', size: 24 },
        { x: 250, y: GROUND_Y - 80, emoji: '🌸', size: 22 },
        { x: 400, y: GROUND_Y - 78, emoji: '🌻', size: 24 },
        { x: 550, y: GROUND_Y - 80, emoji: '🌺', size: 22 },
        { x: 700, y: GROUND_Y - 78, emoji: '🌸', size: 24 },
        { x: 830, y: GROUND_Y - 80, emoji: '🌺', size: 22 },
        // Bougainvillea climbing wall (left side)
        { x: 30, y: GROUND_Y - 200, emoji: '🌺', size: 20 },
        { x: 45, y: GROUND_Y - 250, emoji: '🌺', size: 18 },
        { x: 25, y: GROUND_Y - 300, emoji: '🌺', size: 22 },
        { x: 50, y: GROUND_Y - 350, emoji: '🌸', size: 18 },
        // Hanging baskets
        { x: 300, y: 120, emoji: '🌿', size: 30 },
        { x: 700, y: 130, emoji: '🌿', size: 28 },
        // Tile floor
        { x: 40, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#A0522D' },
        // Garden umbrella
        { x: 550, y: GROUND_Y - 200, emoji: '⛱️', size: 45 },
        // Watering can
        { x: 850, y: GROUND_Y - 20, emoji: '🚿', size: 18 },

        // === SECTION 2 (960–1920): Clothesline section ===
        { x: 1000, y: 88, emoji: '💡', size: 18 }, { x: 1200, y: 92, emoji: '💡', size: 18 },
        { x: 1400, y: 88, emoji: '💡', size: 18 }, { x: 1600, y: 92, emoji: '💡', size: 18 },
        { x: 1800, y: 88, emoji: '💡', size: 18 },
        // Dense plants
        { x: 960, y: GROUND_Y - 42, emoji: '🪴', size: 34 },
        { x: 1100, y: GROUND_Y - 35, emoji: '🌿', size: 28 },
        { x: 1350, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        { x: 1500, y: GROUND_Y - 38, emoji: '🌿', size: 30 },
        { x: 1700, y: GROUND_Y - 42, emoji: '🪴', size: 35 },
        { x: 1880, y: GROUND_Y - 36, emoji: '🌿', size: 28 },
        // Flowers on railing
        { x: 1050, y: GROUND_Y - 78, emoji: '🌻', size: 24 },
        { x: 1250, y: GROUND_Y - 80, emoji: '🌺', size: 22 },
        { x: 1450, y: GROUND_Y - 78, emoji: '🌸', size: 24 },
        { x: 1650, y: GROUND_Y - 80, emoji: '🌻', size: 22 },
        { x: 1850, y: GROUND_Y - 78, emoji: '🌺', size: 22 },
        // Hanging baskets
        { x: 1150, y: 125, emoji: '🌿', size: 28 },
        { x: 1600, y: 120, emoji: '🌿', size: 30 },
        // Tile floor
        { x: 1050, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#B8860B' },
        // Lemon tree
        { x: 1900, y: GROUND_Y - 110, emoji: '🍋', size: 20 },
        { x: 1890, y: GROUND_Y - 130, emoji: '🌳', size: 40 },

        // === SECTION 3 (1920–2880): Upper terrace ===
        { x: 2000, y: 85, emoji: '💡', size: 18 }, { x: 2200, y: 90, emoji: '💡', size: 18 },
        { x: 2400, y: 85, emoji: '💡', size: 18 }, { x: 2600, y: 90, emoji: '💡', size: 18 },
        { x: 2800, y: 85, emoji: '💡', size: 18 },
        // Dense Mediterranean garden
        { x: 1950, y: GROUND_Y - 45, emoji: '🌿', size: 35 },
        { x: 2050, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 2200, y: GROUND_Y - 42, emoji: '🪴', size: 34 },
        { x: 2400, y: GROUND_Y - 40, emoji: '🌿', size: 32 },
        { x: 2550, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 2700, y: GROUND_Y - 45, emoji: '🌿', size: 35 },
        { x: 2850, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        // Flowers galore
        { x: 2100, y: GROUND_Y - 78, emoji: '🌻', size: 24 },
        { x: 2300, y: GROUND_Y - 80, emoji: '🌺', size: 24 },
        { x: 2500, y: GROUND_Y - 78, emoji: '🌸', size: 24 },
        { x: 2750, y: GROUND_Y - 80, emoji: '🌺', size: 22 },
        // Olive tree
        { x: 2600, y: GROUND_Y - 130, emoji: '🌳', size: 50 },
        // Hanging basket
        { x: 2350, y: 115, emoji: '🌿', size: 30 },
        // Floor tiles
        { x: 2200, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#A0522D' },
        // Bougainvillea on wall
        { x: 2850, y: GROUND_Y - 220, emoji: '🌺', size: 20 },
        { x: 2840, y: GROUND_Y - 280, emoji: '🌸', size: 18 },
        { x: 2860, y: GROUND_Y - 340, emoji: '🌺', size: 22 },

        // === SECTION 4 (2880–3840): BBQ area ===
        { x: 2950, y: 88, emoji: '💡', size: 18 }, { x: 3150, y: 92, emoji: '💡', size: 18 },
        { x: 3350, y: 88, emoji: '💡', size: 18 }, { x: 3550, y: 92, emoji: '💡', size: 18 },
        { x: 3750, y: 88, emoji: '💡', size: 18 },
        // Dense plants around BBQ area
        { x: 2900, y: GROUND_Y - 45, emoji: '🪴', size: 38 },
        { x: 3050, y: GROUND_Y - 35, emoji: '🌿', size: 28 },
        { x: 3200, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        { x: 3400, y: GROUND_Y - 38, emoji: '🌿', size: 30 },
        { x: 3600, y: GROUND_Y - 42, emoji: '🪴', size: 35 },
        { x: 3800, y: GROUND_Y - 45, emoji: '🪴', size: 38 },
        // Flowers on railing
        { x: 3000, y: GROUND_Y - 78, emoji: '🌺', size: 24 },
        { x: 3200, y: GROUND_Y - 80, emoji: '🌻', size: 22 },
        { x: 3450, y: GROUND_Y - 78, emoji: '🌸', size: 24 },
        { x: 3700, y: GROUND_Y - 80, emoji: '🌺', size: 22 },
        // Charcoal bag emoji
        { x: 3300, y: GROUND_Y - 20, emoji: '🪨', size: 18 },
        // Floor tiles
        { x: 3100, y: GROUND_Y - 5, type: 'rug', w: 350, h: 10, color: '#8B4513' },
        // Garden umbrella
        { x: 3500, y: GROUND_Y - 190, emoji: '⛱️', size: 40 },

        // === SECTION 5 (3840–4800): FINAL BOSS ARENA ===
        // Dramatic sky — dark clouds rolling in
        { x: 3900, y: 35, emoji: '☁️', size: 60 },
        { x: 4200, y: 25, emoji: '☁️', size: 55 },
        { x: 4500, y: 40, emoji: '☁️', size: 50 },
        { x: 4700, y: 20, emoji: '☁️', size: 55 },
        // Plants at arena edges — scorched
        { x: 3860, y: GROUND_Y - 42, emoji: '🪴', size: 35 },
        { x: 3920, y: GROUND_Y - 35, emoji: '🌿', size: 28 },
        { x: 4680, y: GROUND_Y - 42, emoji: '🪴', size: 35 },
        { x: 4750, y: GROUND_Y - 35, emoji: '🌿', size: 28 },
        // Charcoal and smoke hints
        { x: 4100, y: GROUND_Y - 15, emoji: '🪨', size: 16 },
        { x: 4400, y: GROUND_Y - 15, emoji: '🪨', size: 14 },
        // Floor tiles
        { x: 4000, y: GROUND_Y - 5, type: 'rug', w: 600, h: 12, color: '#8B3A00' },
        // Grass tufts and butterflies
        { x: 400, y: GROUND_Y - 2, type: 'grass_tuft' },
        { x: 1200, y: GROUND_Y - 2, type: 'grass_tuft' },
        { x: 2600, y: GROUND_Y - 2, type: 'grass_tuft' },
        { x: 3800, y: GROUND_Y - 2, type: 'grass_tuft' },
        { x: 700, y: GROUND_Y - 140, type: 'butterfly', color: 'rgba(200, 100, 180, 0.4)' },
        { x: 2000, y: GROUND_Y - 200, type: 'butterfly', color: 'rgba(100, 150, 220, 0.4)' },
        { x: 3200, y: GROUND_Y - 160, type: 'butterfly', color: 'rgba(220, 180, 80, 0.4)' },
        { x: CANVAS_W * 4 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#C4A070' },

        // === SECTION 1 (0–960): Terrace entrance ===
        // Garden chair near start
        { x: 160, y: GROUND_Y - 60, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        // Garden table
        { x: 340, y: GROUND_Y - 90, width: 110, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        // Plant pot step
        { x: 520, y: GROUND_Y - 55, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        // Railing hop — moves vertically
        { x: 650, y: GROUND_Y - 120, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          moveY: -40, moveSpeed: 0.8 },
        // Another chair
        { x: 830, y: GROUND_Y - 65, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },

        // === SECTION 2 (960–1920): Clothesline section ===
        // Shelf near start
        { x: 990, y: GROUND_Y - 70, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        // Clothesline platform (long, high)
        { x: 1120, y: GROUND_Y - 130, width: 120, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0' },
        // Railing underneath
        { x: 1080, y: GROUND_Y - 55, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // Mid clothesline — sways horizontally
        { x: 1310, y: GROUND_Y - 120, width: 100, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 60, moveSpeed: 0.8 },
        // Plant pot step
        { x: 1470, y: GROUND_Y - 60, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        // Railing high — crumbles
        { x: 1570, y: GROUND_Y - 130, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        // Garden chair at end
        { x: 1730, y: GROUND_Y - 65, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        // Clothesline high — sways
        { x: 1830, y: GROUND_Y - 125, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 50, moveSpeed: 1.0 },

        // === SECTION 3 (1920–2880): Upper terrace, more vertical ===
        // Plant pot low
        { x: 1960, y: GROUND_Y - 55, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        // Railing step up
        { x: 2060, y: GROUND_Y - 120, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        // Plant pot mid — moves vertically
        { x: 2190, y: GROUND_Y - 70, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D',
          moveY: -60, moveSpeed: 1.0 },
        // Shelf high
        { x: 2280, y: GROUND_Y - 140, width: 90, height: 16, label: 'SHELF', color: '#8B6914' },
        // Garden table mid
        { x: 2420, y: GROUND_Y - 85, width: 100, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        // Railing high — crumbles!
        { x: 2560, y: GROUND_Y - 130, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // Plant pot
        { x: 2680, y: GROUND_Y - 60, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        // Shelf
        { x: 2790, y: GROUND_Y - 125, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // === SECTION 4 (2880–3840): Dense BBQ area ===
        // BBQ shelf low
        { x: 2920, y: GROUND_Y - 65, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        // Railing step
        { x: 3040, y: GROUND_Y - 120, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        // Garden chair
        { x: 3170, y: GROUND_Y - 60, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        // BBQ shelf high — moves horizontally
        { x: 3290, y: GROUND_Y - 130, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444',
          moveX: 60, moveSpeed: 1.0 },
        // Plant pot
        { x: 3420, y: GROUND_Y - 55, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        // Railing high
        { x: 3530, y: GROUND_Y - 125, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        // Garden table
        { x: 3660, y: GROUND_Y - 80, width: 100, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },

        // === SECTION 5 (3840–4800): FINAL BOSS ARENA — lots of platforms to reach tall BBQ Dragon ===
        { x: 3880, y: GROUND_Y - 70, width: 80, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 4020, y: GROUND_Y - 130, width: 90, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 4180, y: GROUND_Y - 80, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 4320, y: GROUND_Y - 150, width: 100, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 4480, y: GROUND_Y - 90, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        { x: 4620, y: GROUND_Y - 140, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 4750, y: GROUND_Y - 70, width: 70, height: 18, label: 'PLANT_POT', color: '#A0522D' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // === SECTION 1 (0–960) ===
        { x: 100, y: GROUND_Y - 30, label: 'SHOE', color: '#4169E1', width: 22, height: 16 },
        { x: 195, y: GROUND_Y - 85, label: 'MUG', color: '#FFFFFF', width: 18, height: 18 },
        { x: 370, y: GROUND_Y - 120, label: 'BOOK', color: '#DC143C', width: 20, height: 16 },
        { x: 540, y: GROUND_Y - 80, label: 'WATERING_CAN', color: '#2E8B57', width: 24, height: 20 },
        { x: 680, y: GROUND_Y - 145, label: 'KEYS', color: '#FFD700', width: 18, height: 14 },
        { x: 860, y: GROUND_Y - 90, label: 'FOOTBALL', color: '#F5F5F5', width: 22, height: 22 },

        // === SECTION 2 (960–1920) ===
        { x: 1020, y: GROUND_Y - 95, label: 'ROPE', color: '#D2B48C', width: 20, height: 18 },
        { x: 1160, y: GROUND_Y - 155, label: 'SHOE', color: '#8B4513', width: 22, height: 16 },
        { x: 1340, y: GROUND_Y - 145, label: 'MUG', color: '#FF6347', width: 18, height: 18 },
        { x: 1490, y: GROUND_Y - 85, label: 'GARDEN_TOOL', color: '#228B22', width: 22, height: 18 },
        { x: 1600, y: GROUND_Y - 155, label: 'BOOK', color: '#4682B4', width: 20, height: 16 },
        { x: 1760, y: GROUND_Y - 90, label: 'KEYS', color: '#FFD700', width: 18, height: 14 },
        { x: 1860, y: GROUND_Y - 150, label: '+HEALTH', color: '#FF0000', width: 20, height: 20 },

        // === SECTION 3 (1920–2880) ===
        { x: 1980, y: GROUND_Y - 80, label: 'WATERING_CAN', color: '#2E8B57', width: 24, height: 20 },
        { x: 2090, y: GROUND_Y - 145, label: 'FOOTBALL', color: '#F5F5F5', width: 22, height: 22 },
        { x: 2210, y: GROUND_Y - 95, label: 'ROPE', color: '#D2B48C', width: 20, height: 18 },
        { x: 2310, y: GROUND_Y - 165, label: 'GARDEN_TOOL', color: '#228B22', width: 22, height: 18 },
        { x: 2450, y: GROUND_Y - 115, label: 'MUG', color: '#FFFFFF', width: 18, height: 18 },
        { x: 2590, y: GROUND_Y - 155, label: 'SHOE', color: '#4169E1', width: 22, height: 16 },
        { x: 2710, y: GROUND_Y - 85, label: 'BOOK', color: '#8B0000', width: 20, height: 16 },

        // === SECTION 4 (2880–3840) ===
        { x: 2950, y: GROUND_Y - 90, label: 'GARDEN_TOOL', color: '#228B22', width: 22, height: 18 },
        { x: 3070, y: GROUND_Y - 145, label: 'KEYS', color: '#FFD700', width: 18, height: 14 },
        { x: 3200, y: GROUND_Y - 85, label: 'WATERING_CAN', color: '#2E8B57', width: 24, height: 20 },
        { x: 3320, y: GROUND_Y - 155, label: 'ROPE', color: '#D2B48C', width: 20, height: 18 },
        { x: 3450, y: GROUND_Y - 80, label: 'FOOTBALL', color: '#F5F5F5', width: 22, height: 22 },
        { x: 3560, y: GROUND_Y - 150, label: '+HEALTH', color: '#FF0000', width: 20, height: 20 },
        { x: 3690, y: GROUND_Y - 105, label: 'MUG', color: '#FF6347', width: 18, height: 18 },

        // === SECTION 5 (3840–4800): Boss arena ===
        { x: 3930, y: GROUND_Y - 95, label: '+HEALTH', color: '#FF0000', width: 20, height: 20 },
        { x: 4140, y: GROUND_Y - 155, label: 'SHOE', color: '#8B4513', width: 22, height: 16 },

        // Extra life — high above the tallest railing, requires a perfect jump
        { x: 4350, y: GROUND_Y - 220, label: '+LIFE', color: '#FF1493', width: 20, height: 20 },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // === SECTION 1 ===
        { x: 280, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400' },
        { x: 760, y: GROUND_Y - 30, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF' },

        // === SECTION 2 ===
        { x: 1250, y: GROUND_Y - 30, width: 28, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.5 },
        { x: 1650, y: GROUND_Y - 28, width: 26, height: 26, label: 'PLUG', color: '#333333' },

        // === SECTION 3 ===
        { x: 2150, y: GROUND_Y - 30, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF' },
        { x: 2480, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 3.0, timerOff: 2.0, timerOffset: 0 },
        { x: 2750, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400' },

        // === SECTION 4 ===
        { x: 3100, y: GROUND_Y - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 2.5, timerOff: 2.0, timerOffset: 0 },
        { x: 3350, y: GROUND_Y - 30, width: 26, height: 26, label: 'PLUG', color: '#333333' },
        { x: 3580, y: 110, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500' },

        // === SECTION 5 (boss arena) ===
        { x: 4250, y: GROUND_Y - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // === SECTION 1 ===
        { x: 450, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
        { x: 800, y: GROUND_Y - 200, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },

        // === SECTION 2 ===
        { x: 1200, y: GROUND_Y - 180, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },
        { x: 1550, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },

        // === SECTION 3 ===
        { x: 2250, y: GROUND_Y - 190, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },
        { x: 2600, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },

        // === SECTION 4 ===
        { x: 3050, y: GROUND_Y - 190, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },
        { x: 3400, y: GROUND_Y - 200, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },
        { x: 3700, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
    ],
};
