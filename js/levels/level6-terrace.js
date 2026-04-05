// Level 6: Outdoor Terrace
// 13 screen widths (12,480px at 960px canvas width)
// FINAL and HARDEST level — 100 standard collectables + 3 +HEALTH + 1 +LIFE
// Difficulty: 5% easy, 20% moderate, 40% challenging, 35% expert

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 13; // 12480

export const level6 = {
    name: 'Outdoor Terrace',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#87CEEB',
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 12 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 12,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 12 + 700,
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
        // === SKY — sun and clouds (scattered across all screens except boss) ===
        { x: 200, y: 40, emoji: '☀️', size: 50 },
        { x: 600, y: 55, emoji: '☁️', size: 40 },
        { x: 1100, y: 35, emoji: '☁️', size: 45 },
        { x: 1750, y: 60, emoji: '☁️', size: 38 },
        { x: 2400, y: 30, emoji: '☁️', size: 50 },
        { x: 3100, y: 50, emoji: '☁️', size: 42 },
        { x: 3700, y: 40, emoji: '☁️', size: 36 },
        { x: 4300, y: 55, emoji: '☁️', size: 44 },
        { x: 4900, y: 32, emoji: '☁️', size: 40 },
        { x: 5500, y: 58, emoji: '☁️', size: 46 },
        { x: 6100, y: 38, emoji: '☁️', size: 35 },
        { x: 6700, y: 52, emoji: '☁️', size: 42 },
        { x: 7300, y: 28, emoji: '☁️', size: 48 },
        { x: 7900, y: 55, emoji: '☁️', size: 38 },
        { x: 8500, y: 42, emoji: '☁️', size: 44 },
        { x: 9100, y: 60, emoji: '☁️', size: 36 },
        { x: 9700, y: 35, emoji: '☁️', size: 50 },
        { x: 10300, y: 48, emoji: '☁️', size: 40 },
        { x: 10900, y: 30, emoji: '☁️', size: 45 },

        // === RAILING DECO along terrace edge (spans level excluding boss arena) ===
        { x: 0, y: GROUND_Y - 60, type: 'railing_deco', w: LEVEL_W - CANVAS_W, h: 6, color: '#6B4226' },

        // === SCREEN 1 (0-960): Garden entrance ===
        // String lights
        { x: 100, y: 88, emoji: '💡', size: 16 },
        { x: 200, y: 85, emoji: '💡', size: 16 },
        { x: 300, y: 90, emoji: '💡', size: 16 },
        { x: 400, y: 86, emoji: '💡', size: 16 },
        { x: 500, y: 92, emoji: '💡', size: 16 },
        { x: 600, y: 87, emoji: '💡', size: 16 },
        { x: 700, y: 90, emoji: '💡', size: 16 },
        { x: 800, y: 85, emoji: '💡', size: 16 },
        { x: 900, y: 88, emoji: '💡', size: 16 },
        // Potted plants and flowers
        { x: 30, y: GROUND_Y - 45, emoji: '🪴', size: 32 },
        { x: 880, y: GROUND_Y - 42, emoji: '🪴', size: 28 },
        { x: 150, y: GROUND_Y - 68, emoji: '🌺', size: 18 },
        { x: 450, y: GROUND_Y - 65, emoji: '🌸', size: 16 },
        { x: 750, y: GROUND_Y - 70, emoji: '🌻', size: 18 },
        // Olive tree
        { x: 50, y: GROUND_Y - 180, emoji: '🌳', size: 55 },
        // Umbrella
        { x: 500, y: GROUND_Y - 160, emoji: '⛱️', size: 45 },
        // Floor tiles
        { x: 100, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#B8A090' },
        { x: 550, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#C4B0A0' },
        // Bougainvillea climbing
        { x: 0, y: GROUND_Y - 300, emoji: '🌺', size: 22 },
        { x: 20, y: GROUND_Y - 250, emoji: '🌸', size: 20 },
        { x: 10, y: GROUND_Y - 200, emoji: '🌺', size: 18 },
        // Hanging baskets
        { x: 350, y: 118, emoji: '🌿', size: 24 },
        { x: 700, y: 125, emoji: '🌿', size: 22 },

        // === SCREEN 2 (960-1920): Plant pot stepping ===
        { x: 1060, y: 88, emoji: '💡', size: 16 },
        { x: 1160, y: 85, emoji: '💡', size: 16 },
        { x: 1260, y: 90, emoji: '💡', size: 16 },
        { x: 1360, y: 86, emoji: '💡', size: 16 },
        { x: 1460, y: 92, emoji: '💡', size: 16 },
        { x: 1560, y: 87, emoji: '💡', size: 16 },
        { x: 1660, y: 90, emoji: '💡', size: 16 },
        { x: 1760, y: 85, emoji: '💡', size: 16 },
        { x: 1860, y: 88, emoji: '💡', size: 16 },
        { x: 980, y: GROUND_Y - 40, emoji: '🪴', size: 26 },
        { x: 1200, y: GROUND_Y - 68, emoji: '🌺', size: 16 },
        { x: 1500, y: GROUND_Y - 65, emoji: '🌸', size: 18 },
        { x: 1800, y: GROUND_Y - 70, emoji: '🌻', size: 16 },
        { x: 1900, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        // Butterfly
        { x: 1350, y: GROUND_Y - 200, emoji: '🦋', size: 20 },
        { x: 1700, y: GROUND_Y - 250, emoji: '🦋', size: 18 },
        // Floor tiles
        { x: 1000, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#B8A090' },
        { x: 1500, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#C4B0A0' },
        // Hanging basket
        { x: 1150, y: 120, emoji: '🌿', size: 24 },
        { x: 1650, y: 115, emoji: '🌿', size: 22 },

        // === SCREEN 3 (1920-2880): Clothesline section ===
        { x: 1980, y: 88, emoji: '💡', size: 16 },
        { x: 2080, y: 85, emoji: '💡', size: 16 },
        { x: 2180, y: 90, emoji: '💡', size: 16 },
        { x: 2280, y: 86, emoji: '💡', size: 16 },
        { x: 2380, y: 92, emoji: '💡', size: 16 },
        { x: 2480, y: 87, emoji: '💡', size: 16 },
        { x: 2580, y: 90, emoji: '💡', size: 16 },
        { x: 2680, y: 85, emoji: '💡', size: 16 },
        { x: 2780, y: 88, emoji: '💡', size: 16 },
        { x: 1950, y: GROUND_Y - 45, emoji: '🪴', size: 28 },
        { x: 2850, y: GROUND_Y - 42, emoji: '🪴', size: 30 },
        { x: 2100, y: GROUND_Y - 66, emoji: '🌺', size: 16 },
        { x: 2400, y: GROUND_Y - 70, emoji: '🌸', size: 18 },
        { x: 2700, y: GROUND_Y - 65, emoji: '🌻', size: 16 },
        // Lemon tree
        { x: 2860, y: GROUND_Y - 170, emoji: '🌳', size: 50 },
        // Floor tiles
        { x: 1960, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#C4B0A0' },
        { x: 2500, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#B8A090' },
        // Butterfly
        { x: 2200, y: GROUND_Y - 280, emoji: '🦋', size: 22 },
        // Hanging baskets
        { x: 2050, y: 122, emoji: '🌿', size: 22 },
        { x: 2550, y: 118, emoji: '🌿', size: 24 },

        // === SCREEN 4 (2880-3840): Railing climb ===
        { x: 2940, y: 88, emoji: '💡', size: 16 },
        { x: 3040, y: 85, emoji: '💡', size: 16 },
        { x: 3140, y: 90, emoji: '💡', size: 16 },
        { x: 3240, y: 86, emoji: '💡', size: 16 },
        { x: 3340, y: 92, emoji: '💡', size: 16 },
        { x: 3440, y: 87, emoji: '💡', size: 16 },
        { x: 3540, y: 90, emoji: '💡', size: 16 },
        { x: 3640, y: 85, emoji: '💡', size: 16 },
        { x: 3740, y: 88, emoji: '💡', size: 16 },
        { x: 2920, y: GROUND_Y - 42, emoji: '🪴', size: 26 },
        { x: 3800, y: GROUND_Y - 45, emoji: '🪴', size: 28 },
        { x: 3050, y: GROUND_Y - 68, emoji: '🌺', size: 16 },
        { x: 3350, y: GROUND_Y - 65, emoji: '🌸', size: 18 },
        { x: 3650, y: GROUND_Y - 70, emoji: '🌻', size: 16 },
        // Bougainvillea climbing wall
        { x: 2890, y: GROUND_Y - 350, emoji: '🌺', size: 20 },
        { x: 2910, y: GROUND_Y - 280, emoji: '🌸', size: 18 },
        { x: 2900, y: GROUND_Y - 210, emoji: '🌺', size: 16 },
        // Floor tiles
        { x: 2920, y: GROUND_Y - 5, type: 'rug', w: 240, h: 10, color: '#B8A090' },
        { x: 3400, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#C4B0A0' },
        // Hanging baskets
        { x: 3150, y: 125, emoji: '🌿', size: 22 },
        { x: 3550, y: 120, emoji: '🌿', size: 24 },

        // === SCREEN 5 (3840-4800): Rest — garden table ===
        { x: 3900, y: 88, emoji: '💡', size: 16 },
        { x: 4000, y: 85, emoji: '💡', size: 16 },
        { x: 4100, y: 90, emoji: '💡', size: 16 },
        { x: 4200, y: 86, emoji: '💡', size: 16 },
        { x: 4300, y: 92, emoji: '💡', size: 16 },
        { x: 4400, y: 87, emoji: '💡', size: 16 },
        { x: 4500, y: 90, emoji: '💡', size: 16 },
        { x: 4600, y: 85, emoji: '💡', size: 16 },
        { x: 4700, y: 88, emoji: '💡', size: 16 },
        { x: 3860, y: GROUND_Y - 42, emoji: '🪴', size: 30 },
        { x: 4750, y: GROUND_Y - 40, emoji: '🪴', size: 28 },
        { x: 4050, y: GROUND_Y - 66, emoji: '🌺', size: 18 },
        { x: 4350, y: GROUND_Y - 70, emoji: '🌸', size: 16 },
        { x: 4650, y: GROUND_Y - 65, emoji: '🌻', size: 18 },
        // Umbrella
        { x: 4200, y: GROUND_Y - 165, emoji: '⛱️', size: 48 },
        // Olive tree
        { x: 4760, y: GROUND_Y - 175, emoji: '🌳', size: 52 },
        // Floor tiles
        { x: 3900, y: GROUND_Y - 5, type: 'rug', w: 320, h: 10, color: '#C4B0A0' },
        { x: 4450, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#B8A090' },
        // Butterfly
        { x: 4500, y: GROUND_Y - 220, emoji: '🦋', size: 20 },
        // Hanging baskets
        { x: 4100, y: 118, emoji: '🌿', size: 24 },
        { x: 4550, y: 125, emoji: '🌿', size: 22 },

        // === SCREEN 6 (4800-5760): Crumbling railing sprint ===
        { x: 4860, y: 88, emoji: '💡', size: 16 },
        { x: 4960, y: 85, emoji: '💡', size: 16 },
        { x: 5060, y: 90, emoji: '💡', size: 16 },
        { x: 5160, y: 86, emoji: '💡', size: 16 },
        { x: 5260, y: 92, emoji: '💡', size: 16 },
        { x: 5360, y: 87, emoji: '💡', size: 16 },
        { x: 5460, y: 90, emoji: '💡', size: 16 },
        { x: 5560, y: 85, emoji: '💡', size: 16 },
        { x: 5660, y: 88, emoji: '💡', size: 16 },
        { x: 4820, y: GROUND_Y - 44, emoji: '🪴', size: 26 },
        { x: 5720, y: GROUND_Y - 40, emoji: '🪴', size: 28 },
        { x: 4950, y: GROUND_Y - 68, emoji: '🌺', size: 16 },
        { x: 5250, y: GROUND_Y - 65, emoji: '🌸', size: 18 },
        { x: 5550, y: GROUND_Y - 70, emoji: '🌻', size: 16 },
        // Charcoal/rocks
        { x: 5100, y: GROUND_Y - 12, emoji: '🪨', size: 18 },
        { x: 5400, y: GROUND_Y - 10, emoji: '🪨', size: 16 },
        // Floor tiles
        { x: 4840, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#B8A090' },
        { x: 5350, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#C4B0A0' },
        // Hanging baskets
        { x: 5050, y: 122, emoji: '🌿', size: 22 },
        { x: 5450, y: 118, emoji: '🌿', size: 24 },

        // === SCREEN 7 (5760-6720): Moving clothesline gauntlet ===
        { x: 5820, y: 88, emoji: '💡', size: 16 },
        { x: 5920, y: 85, emoji: '💡', size: 16 },
        { x: 6020, y: 90, emoji: '💡', size: 16 },
        { x: 6120, y: 86, emoji: '💡', size: 16 },
        { x: 6220, y: 92, emoji: '💡', size: 16 },
        { x: 6320, y: 87, emoji: '💡', size: 16 },
        { x: 6420, y: 90, emoji: '💡', size: 16 },
        { x: 6520, y: 85, emoji: '💡', size: 16 },
        { x: 6620, y: 88, emoji: '💡', size: 16 },
        { x: 5780, y: GROUND_Y - 44, emoji: '🪴', size: 28 },
        { x: 6700, y: GROUND_Y - 42, emoji: '🪴', size: 26 },
        { x: 5900, y: GROUND_Y - 66, emoji: '🌺', size: 18 },
        { x: 6200, y: GROUND_Y - 70, emoji: '🌸', size: 16 },
        { x: 6500, y: GROUND_Y - 65, emoji: '🌻', size: 18 },
        // Butterfly
        { x: 6050, y: GROUND_Y - 300, emoji: '🦋', size: 22 },
        { x: 6400, y: GROUND_Y - 260, emoji: '🦋', size: 18 },
        // Floor tiles
        { x: 5800, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#C4B0A0' },
        { x: 6300, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#B8A090' },
        // Hanging baskets
        { x: 5950, y: 120, emoji: '🌿', size: 24 },
        { x: 6450, y: 125, emoji: '🌿', size: 22 },

        // === SCREEN 8 (6720-7680): Vertical + moving combo ===
        { x: 6780, y: 88, emoji: '💡', size: 16 },
        { x: 6880, y: 85, emoji: '💡', size: 16 },
        { x: 6980, y: 90, emoji: '💡', size: 16 },
        { x: 7080, y: 86, emoji: '💡', size: 16 },
        { x: 7180, y: 92, emoji: '💡', size: 16 },
        { x: 7280, y: 87, emoji: '💡', size: 16 },
        { x: 7380, y: 90, emoji: '💡', size: 16 },
        { x: 7480, y: 85, emoji: '💡', size: 16 },
        { x: 7580, y: 88, emoji: '💡', size: 16 },
        { x: 6740, y: GROUND_Y - 45, emoji: '🪴', size: 28 },
        { x: 7650, y: GROUND_Y - 42, emoji: '🪴', size: 26 },
        { x: 6900, y: GROUND_Y - 68, emoji: '🌺', size: 16 },
        { x: 7200, y: GROUND_Y - 65, emoji: '🌸', size: 18 },
        { x: 7500, y: GROUND_Y - 70, emoji: '🌻', size: 16 },
        // Bougainvillea
        { x: 6730, y: GROUND_Y - 340, emoji: '🌺', size: 20 },
        { x: 6750, y: GROUND_Y - 270, emoji: '🌸', size: 18 },
        { x: 6740, y: GROUND_Y - 200, emoji: '🌺', size: 16 },
        // Floor tiles
        { x: 6760, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#B8A090' },
        { x: 7250, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#C4B0A0' },
        // Hanging baskets
        { x: 6950, y: 122, emoji: '🌿', size: 24 },
        { x: 7400, y: 118, emoji: '🌿', size: 22 },

        // === SCREEN 9 (7680-8640): Risk/reward rooftop paths ===
        { x: 7740, y: 88, emoji: '💡', size: 16 },
        { x: 7840, y: 85, emoji: '💡', size: 16 },
        { x: 7940, y: 90, emoji: '💡', size: 16 },
        { x: 8040, y: 86, emoji: '💡', size: 16 },
        { x: 8140, y: 92, emoji: '💡', size: 16 },
        { x: 8240, y: 87, emoji: '💡', size: 16 },
        { x: 8340, y: 90, emoji: '💡', size: 16 },
        { x: 8440, y: 85, emoji: '💡', size: 16 },
        { x: 8540, y: 88, emoji: '💡', size: 16 },
        { x: 7700, y: GROUND_Y - 44, emoji: '🪴', size: 30 },
        { x: 8600, y: GROUND_Y - 40, emoji: '🪴', size: 28 },
        { x: 7850, y: GROUND_Y - 66, emoji: '🌺', size: 18 },
        { x: 8150, y: GROUND_Y - 70, emoji: '🌸', size: 16 },
        { x: 8450, y: GROUND_Y - 65, emoji: '🌻', size: 18 },
        // Umbrella
        { x: 8000, y: GROUND_Y - 160, emoji: '⛱️', size: 45 },
        // Floor tiles
        { x: 7720, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#C4B0A0' },
        { x: 8250, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#B8A090' },
        // Butterfly
        { x: 8300, y: GROUND_Y - 280, emoji: '🦋', size: 20 },
        // Hanging baskets
        { x: 7900, y: 120, emoji: '🌿', size: 22 },
        { x: 8400, y: 118, emoji: '🌿', size: 24 },

        // === SCREEN 10 (8640-9600): Crumble + wind gauntlet ===
        { x: 8700, y: 88, emoji: '💡', size: 16 },
        { x: 8800, y: 85, emoji: '💡', size: 16 },
        { x: 8900, y: 90, emoji: '💡', size: 16 },
        { x: 9000, y: 86, emoji: '💡', size: 16 },
        { x: 9100, y: 92, emoji: '💡', size: 16 },
        { x: 9200, y: 87, emoji: '💡', size: 16 },
        { x: 9300, y: 90, emoji: '💡', size: 16 },
        { x: 9400, y: 85, emoji: '💡', size: 16 },
        { x: 9500, y: 88, emoji: '💡', size: 16 },
        { x: 8660, y: GROUND_Y - 42, emoji: '🪴', size: 26 },
        { x: 9560, y: GROUND_Y - 44, emoji: '🪴', size: 28 },
        { x: 8800, y: GROUND_Y - 68, emoji: '🌺', size: 16 },
        { x: 9100, y: GROUND_Y - 65, emoji: '🌸', size: 18 },
        { x: 9400, y: GROUND_Y - 70, emoji: '🌻', size: 16 },
        // Charcoal/rocks
        { x: 9000, y: GROUND_Y - 12, emoji: '🪨', size: 18 },
        { x: 9300, y: GROUND_Y - 10, emoji: '🪨', size: 16 },
        // Floor tiles
        { x: 8680, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#B8A090' },
        { x: 9200, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#C4B0A0' },
        // Hanging baskets
        { x: 8900, y: 122, emoji: '🌿', size: 24 },
        { x: 9350, y: 118, emoji: '🌿', size: 22 },

        // === SCREEN 11 (9600-10560): BBQ area ===
        { x: 9660, y: 88, emoji: '💡', size: 16 },
        { x: 9760, y: 85, emoji: '💡', size: 16 },
        { x: 9860, y: 90, emoji: '💡', size: 16 },
        { x: 9960, y: 86, emoji: '💡', size: 16 },
        { x: 10060, y: 92, emoji: '💡', size: 16 },
        { x: 10160, y: 87, emoji: '💡', size: 16 },
        { x: 10260, y: 90, emoji: '💡', size: 16 },
        { x: 10360, y: 85, emoji: '💡', size: 16 },
        { x: 10460, y: 88, emoji: '💡', size: 16 },
        { x: 9620, y: GROUND_Y - 44, emoji: '🪴', size: 28 },
        { x: 10520, y: GROUND_Y - 42, emoji: '🪴', size: 26 },
        { x: 9800, y: GROUND_Y - 66, emoji: '🌺', size: 16 },
        { x: 10100, y: GROUND_Y - 70, emoji: '🌸', size: 18 },
        { x: 10400, y: GROUND_Y - 65, emoji: '🌻', size: 16 },
        // Charcoal/smoke near BBQ
        { x: 9700, y: GROUND_Y - 14, emoji: '🪨', size: 20 },
        { x: 9900, y: GROUND_Y - 12, emoji: '🪨', size: 16 },
        { x: 10200, y: GROUND_Y - 10, emoji: '🪨', size: 18 },
        // Floor tiles
        { x: 9650, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#C4B0A0' },
        { x: 10200, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#B8A090' },
        // Hanging baskets
        { x: 9850, y: 120, emoji: '🌿', size: 22 },
        { x: 10300, y: 125, emoji: '🌿', size: 24 },

        // === SCREEN 12 (10560-11520): Final gauntlet ===
        { x: 10620, y: 88, emoji: '💡', size: 16 },
        { x: 10720, y: 85, emoji: '💡', size: 16 },
        { x: 10820, y: 90, emoji: '💡', size: 16 },
        { x: 10920, y: 86, emoji: '💡', size: 16 },
        { x: 11020, y: 92, emoji: '💡', size: 16 },
        { x: 11120, y: 87, emoji: '💡', size: 16 },
        { x: 11220, y: 90, emoji: '💡', size: 16 },
        { x: 11320, y: 85, emoji: '💡', size: 16 },
        { x: 11420, y: 88, emoji: '💡', size: 16 },
        { x: 10580, y: GROUND_Y - 44, emoji: '🪴', size: 26 },
        { x: 10700, y: GROUND_Y - 68, emoji: '🌺', size: 16 },
        { x: 11000, y: GROUND_Y - 65, emoji: '🌸', size: 18 },
        { x: 11300, y: GROUND_Y - 70, emoji: '🌻', size: 16 },
        // Charcoal/rocks (scorched area)
        { x: 10800, y: GROUND_Y - 12, emoji: '🪨', size: 18 },
        { x: 11100, y: GROUND_Y - 10, emoji: '🪨', size: 16 },
        { x: 11400, y: GROUND_Y - 14, emoji: '🪨', size: 18 },
        // Floor tiles
        { x: 10600, y: GROUND_Y - 5, type: 'rug', w: 280, h: 10, color: '#B8A090' },
        { x: 11100, y: GROUND_Y - 5, type: 'rug', w: 300, h: 10, color: '#C4B0A0' },
        // Boss doorway
        { x: CANVAS_W * 12 - 80, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },
        // Bougainvillea
        { x: 11480, y: GROUND_Y - 340, emoji: '🌺', size: 20 },
        { x: 11500, y: GROUND_Y - 270, emoji: '🌸', size: 18 },
        // Hanging baskets
        { x: 10800, y: 122, emoji: '🌿', size: 22 },
        { x: 11250, y: 118, emoji: '🌿', size: 24 },

        // === SCREEN 13 (11520-12480): Boss arena ===
        // Dark stormy clouds
        { x: 11600, y: 30, emoji: '🌩️', size: 50 },
        { x: 11900, y: 45, emoji: '🌩️', size: 45 },
        { x: 12200, y: 35, emoji: '🌩️', size: 48 },
        // Scorched plants
        { x: 11560, y: GROUND_Y - 40, emoji: '🪴', size: 22 },
        { x: 12420, y: GROUND_Y - 38, emoji: '🪴', size: 20 },
        // Charcoal/smoke everywhere
        { x: 11700, y: GROUND_Y - 12, emoji: '🪨', size: 20 },
        { x: 11900, y: GROUND_Y - 10, emoji: '🪨', size: 18 },
        { x: 12100, y: GROUND_Y - 14, emoji: '🪨', size: 20 },
        { x: 12300, y: GROUND_Y - 10, emoji: '🪨', size: 16 },
        // Scorched floor
        { x: 11600, y: GROUND_Y - 5, type: 'rug', w: 800, h: 12, color: '#3A3030' },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#C4A070' },

        // === SCREEN 1 (0-960): TEACH — Garden entrance ===
        // Easy hops: chair -> table -> pot -> railing, gaps 80-100px
        { x: 160, y: GROUND_Y - 55, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        { x: 330, y: GROUND_Y - 50, width: 110, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        { x: 530, y: GROUND_Y - 65, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 680, y: GROUND_Y - 55, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 850, y: GROUND_Y - 50, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },

        // === SCREEN 2 (960-1920): TEST — Plant pot stepping ===
        // Narrow PLANT_POT (55px!) with 120px gaps — precision test
        { x: 1000, y: GROUND_Y - 55, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 1200, y: GROUND_Y - 70, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 1375, y: GROUND_Y - 85, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 1550, y: GROUND_Y - 75, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 1725, y: GROUND_Y - 65, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 1870, y: GROUND_Y - 55, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },

        // === SCREEN 3 (1920-2880): TEST — Clothesline section ===
        // 3 moving CLOTHESLINE platforms, 130-150px gaps
        { x: 1960, y: GROUND_Y - 60, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 2140, y: GROUND_Y - 100, width: 120, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 50, moveSpeed: 0.8 },
        { x: 2370, y: GROUND_Y - 130, width: 100, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: -60, moveSpeed: 1.0 },
        { x: 2580, y: GROUND_Y - 95, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 55, moveSpeed: 0.9 },
        { x: 2770, y: GROUND_Y - 60, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },

        // === SCREEN 4 (2880-3840): VERTICAL CLIMB — Railing zigzag ===
        // 7 railings zigzagging from ground up to y~200 (max 130px vertical per hop)
        { x: 2930, y: GROUND_Y - 60, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 3080, y: GROUND_Y - 140, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 2950, y: GROUND_Y - 220, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 3100, y: GROUND_Y - 290, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 3270, y: GROUND_Y - 250, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 3440, y: GROUND_Y - 200, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 3600, y: GROUND_Y - 130, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 3760, y: GROUND_Y - 55, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },

        // === SCREEN 5 (3840-4800): REST — Garden table rest ===
        // Wide platforms, easy ground collecting
        { x: 3900, y: GROUND_Y - 50, width: 110, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        { x: 4100, y: GROUND_Y - 55, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        { x: 4280, y: GROUND_Y - 50, width: 110, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        { x: 4480, y: GROUND_Y - 55, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        { x: 4650, y: GROUND_Y - 50, width: 100, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },

        // === SCREEN 6 (4800-5760): CHALLENGE — Crumbling railing sprint ===
        // 4 crumbling RAILING (crumbleDelay: 0.5!) with 170px gaps. Must keep moving!
        { x: 4830, y: GROUND_Y - 60, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 5010, y: GROUND_Y - 90, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 5200, y: GROUND_Y - 120, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 5390, y: GROUND_Y - 100, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 5570, y: GROUND_Y - 80, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 5720, y: GROUND_Y - 55, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },

        // === SCREEN 7 (5760-6720): CHALLENGE — Moving clothesline gauntlet ===
        // 5 swinging CLOTHESLINE at varying heights, moveX: 50-80, speeds 0.8-1.4, 180px gaps
        { x: 5800, y: GROUND_Y - 60, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 5980, y: GROUND_Y - 110, width: 100, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 60, moveSpeed: 0.8 },
        { x: 6180, y: GROUND_Y - 150, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: -70, moveSpeed: 1.2 },
        { x: 6380, y: GROUND_Y - 120, width: 100, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 80, moveSpeed: 1.0 },
        { x: 6560, y: GROUND_Y - 160, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: -50, moveSpeed: 1.4 },
        { x: 6700, y: GROUND_Y - 100, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 60, moveSpeed: 0.9 },

        // === SCREEN 8 (6720-7680): ESCALATE — Vertical + moving combo ===
        // PLANT_POT climb (55px!) interspersed with moving RAILING
        { x: 6760, y: GROUND_Y - 60, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 6900, y: GROUND_Y - 140, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          moveX: 40, moveSpeed: 0.8 },
        { x: 7060, y: GROUND_Y - 220, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 7210, y: GROUND_Y - 290, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          moveX: -50, moveSpeed: 1.0 },
        { x: 7370, y: GROUND_Y - 240, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 7520, y: GROUND_Y - 170, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          moveX: 45, moveSpeed: 0.9 },
        { x: 7650, y: GROUND_Y - 60, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },

        // === SCREEN 9 (7680-8640): RISK/REWARD — Rooftop paths ===
        // Safe lower path (GARDEN_TABLE/CHAIR)
        { x: 7720, y: GROUND_Y - 50, width: 110, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        { x: 7920, y: GROUND_Y - 55, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        { x: 8100, y: GROUND_Y - 50, width: 110, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        { x: 8300, y: GROUND_Y - 55, width: 70, height: 18, label: 'GARDEN_CHAIR', color: '#228B22' },
        { x: 8480, y: GROUND_Y - 50, width: 100, height: 20, label: 'GARDEN_TABLE', color: '#8B5E3C' },
        // Dangerous upper CLOTHESLINE chain path
        { x: 7780, y: GROUND_Y - 180, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 40, moveSpeed: 0.8 },
        { x: 7980, y: GROUND_Y - 250, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: -50, moveSpeed: 1.0 },
        { x: 8200, y: GROUND_Y - 280, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 45, moveSpeed: 1.2 },
        { x: 8420, y: GROUND_Y - 220, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: -40, moveSpeed: 0.9 },

        // === SCREEN 10 (8640-9600): ESCALATE — Crumble + wind gauntlet ===
        // Crumbling RAILING between moving CLOTHESLINE, 200px gaps (near max!)
        { x: 8680, y: GROUND_Y - 60, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 8880, y: GROUND_Y - 110, width: 100, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 60, moveSpeed: 1.0 },
        { x: 9100, y: GROUND_Y - 90, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 9300, y: GROUND_Y - 130, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: -55, moveSpeed: 1.2 },
        { x: 9480, y: GROUND_Y - 80, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },

        // === SCREEN 11 (9600-10560): ESCALATE — BBQ area ===
        // BBQ_SHELF platforms, mix of static + moving
        { x: 9640, y: GROUND_Y - 60, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        { x: 9830, y: GROUND_Y - 110, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444',
          moveX: 40, moveSpeed: 0.8 },
        { x: 10010, y: GROUND_Y - 80, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        { x: 10200, y: GROUND_Y - 130, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444',
          moveX: -45, moveSpeed: 1.0 },
        { x: 10380, y: GROUND_Y - 90, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        { x: 10510, y: GROUND_Y - 55, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },

        // === SCREEN 12 (10560-11520): GAUNTLET — Final gauntlet ===
        // 210px gaps — the HARDEST platforming in the ENTIRE GAME!
        // All platform types combined
        { x: 10600, y: GROUND_Y - 60, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 10810, y: GROUND_Y - 100, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 11020, y: GROUND_Y - 140, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: 60, moveSpeed: 1.2 },
        { x: 11200, y: GROUND_Y - 110, width: 80, height: 16, label: 'RAILING', color: '#6B4226',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        { x: 11380, y: GROUND_Y - 80, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        // High moving clothesline — +LIFE location
        { x: 11100, y: GROUND_Y - 280, width: 90, height: 14, label: 'CLOTHESLINE', color: '#C0C0C0',
          moveX: -50, moveSpeed: 1.4 },

        // === SCREEN 13 (11520-12480): BOSS ARENA ===
        // 7 platforms at varying heights for dodging BBQ DRAGON
        { x: 11600, y: GROUND_Y - 100, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 11750, y: GROUND_Y - 180, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 11920, y: GROUND_Y - 120, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        { x: 12080, y: GROUND_Y - 200, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        { x: 12230, y: GROUND_Y - 130, width: 55, height: 18, label: 'PLANT_POT', color: '#A0522D' },
        { x: 12350, y: GROUND_Y - 80, width: 90, height: 20, label: 'BBQ_SHELF', color: '#444444' },
        { x: 12100, y: GROUND_Y - 300, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard items + 3 +HEALTH + 1 +LIFE
    collectables: [
        // === SCREEN 1 (9 items) ===
        // On garden chair
        { x: 180, y: GROUND_Y - 88, label: 'SHOE', color: '#4169E1' },
        // On garden table
        { x: 360, y: GROUND_Y - 82, label: 'MUG', color: '#FFFFFF' },
        { x: 420, y: GROUND_Y - 82, label: 'KEYS', color: '#FFD700' },
        // On plant pot
        { x: 545, y: GROUND_Y - 98, label: 'WATERING_CAN', color: '#2E8B57' },
        // On railing
        { x: 700, y: GROUND_Y - 88, label: 'ROPE', color: '#D2B48C' },
        // On exit chair
        { x: 870, y: GROUND_Y - 83, label: 'BOOK', color: '#DC143C' },
        // Ground items
        { x: 250, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 600, y: GROUND_Y - 32, label: 'SHOE', color: '#8B4513' },
        { x: 780, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },

        // === SCREEN 2 (9 items) ===
        // On railing
        { x: 1020, y: GROUND_Y - 88, label: 'MUG', color: '#FF6347' },
        // On plant pots (precision reward)
        { x: 1215, y: GROUND_Y - 103, label: 'KEYS', color: '#FFD700' },
        { x: 1390, y: GROUND_Y - 118, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 1565, y: GROUND_Y - 108, label: 'BOOK', color: '#4682B4' },
        // On exit railing
        { x: 1745, y: GROUND_Y - 98, label: 'ROPE', color: '#D2B48C' },
        // On exit pot
        { x: 1885, y: GROUND_Y - 88, label: 'SHOE', color: '#4169E1' },
        // Ground items
        { x: 1100, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 1450, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 1800, y: GROUND_Y - 32, label: 'MUG', color: '#FFFFFF' },

        // === SCREEN 3 (9 items) ===
        // On start railing
        { x: 1980, y: GROUND_Y - 93, label: 'SHOE', color: '#8B4513' },
        // On moving clotheslines (risky!)
        { x: 2180, y: GROUND_Y - 135, label: 'KEYS', color: '#FFD700' },
        { x: 2400, y: GROUND_Y - 165, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 2610, y: GROUND_Y - 130, label: 'ROPE', color: '#D2B48C' },
        // On exit railing
        { x: 2790, y: GROUND_Y - 93, label: 'MUG', color: '#FF6347' },
        // Ground items
        { x: 2060, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 2300, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 2500, y: GROUND_Y - 32, label: 'BOOK', color: '#DC143C' },
        { x: 2700, y: GROUND_Y - 32, label: 'SHOE', color: '#4169E1' },

        // === SCREEN 4 (8 items) ===
        // On ascending railings (zigzag climb)
        { x: 2950, y: GROUND_Y - 93, label: 'ROPE', color: '#D2B48C' },
        { x: 3100, y: GROUND_Y - 173, label: 'MUG', color: '#FFFFFF' },
        { x: 2970, y: GROUND_Y - 253, label: 'KEYS', color: '#FFD700' },
        { x: 3120, y: GROUND_Y - 323, label: 'BOOK', color: '#8B0000' },
        { x: 3290, y: GROUND_Y - 283, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 3460, y: GROUND_Y - 233, label: 'GARDEN_TOOL', color: '#228B22' },
        // Ground items
        { x: 3200, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 3700, y: GROUND_Y - 32, label: 'SHOE', color: '#8B4513' },

        // === SCREEN 5 (8 items) ===
        // Easy ground/table collecting — rest screen
        { x: 3930, y: GROUND_Y - 82, label: 'MUG', color: '#FF6347' },
        { x: 3990, y: GROUND_Y - 82, label: 'KEYS', color: '#FFD700' },
        { x: 4120, y: GROUND_Y - 88, label: 'BOOK', color: '#DC143C' },
        { x: 4310, y: GROUND_Y - 82, label: 'ROPE', color: '#D2B48C' },
        { x: 4500, y: GROUND_Y - 88, label: 'SHOE', color: '#4169E1' },
        { x: 4680, y: GROUND_Y - 82, label: 'WATERING_CAN', color: '#2E8B57' },
        // Ground
        { x: 4200, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 4560, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // +HEALTH
        { x: 4370, y: GROUND_Y - 82, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 6 (8 items) ===
        // On crumbling railings (must grab fast!)
        { x: 4850, y: GROUND_Y - 93, label: 'MUG', color: '#FFFFFF' },
        { x: 5030, y: GROUND_Y - 123, label: 'KEYS', color: '#FFD700' },
        { x: 5220, y: GROUND_Y - 153, label: 'BOOK', color: '#4682B4' },
        { x: 5410, y: GROUND_Y - 133, label: 'ROPE', color: '#D2B48C' },
        { x: 5590, y: GROUND_Y - 113, label: 'SHOE', color: '#8B4513' },
        { x: 5740, y: GROUND_Y - 88, label: 'WATERING_CAN', color: '#2E8B57' },
        // Ground
        { x: 5130, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 5480, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },

        // === SCREEN 7 (8 items) ===
        // On moving clotheslines (challenge!)
        { x: 5815, y: GROUND_Y - 93, label: 'MUG', color: '#FF6347' },
        { x: 6010, y: GROUND_Y - 145, label: 'SHOE', color: '#4169E1' },
        { x: 6210, y: GROUND_Y - 185, label: 'KEYS', color: '#FFD700' },
        { x: 6410, y: GROUND_Y - 155, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 6590, y: GROUND_Y - 195, label: 'BOOK', color: '#DC143C' },
        { x: 6730, y: GROUND_Y - 135, label: 'ROPE', color: '#D2B48C' },
        // Ground
        { x: 6100, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 6450, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },

        // === SCREEN 8 (8 items) ===
        // On vertical climb platforms
        { x: 6775, y: GROUND_Y - 93, label: 'SHOE', color: '#8B4513' },
        { x: 6930, y: GROUND_Y - 175, label: 'KEYS', color: '#FFD700' },
        { x: 7075, y: GROUND_Y - 253, label: 'MUG', color: '#FFFFFF' },
        { x: 7240, y: GROUND_Y - 323, label: 'BOOK', color: '#8B0000' },
        { x: 7390, y: GROUND_Y - 273, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 7550, y: GROUND_Y - 203, label: 'ROPE', color: '#D2B48C' },
        // Ground
        { x: 7100, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 7450, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },

        // === SCREEN 9 (8 items) ===
        // Safe lower path (~4 items)
        { x: 7750, y: GROUND_Y - 82, label: 'MUG', color: '#FF6347' },
        { x: 7940, y: GROUND_Y - 88, label: 'SHOE', color: '#4169E1' },
        { x: 8130, y: GROUND_Y - 82, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 8320, y: GROUND_Y - 88, label: 'GARDEN_TOOL', color: '#228B22' },
        // Dangerous upper path (4 items + 1 +HEALTH)
        { x: 7810, y: GROUND_Y - 215, label: 'KEYS', color: '#FFD700' },
        { x: 8010, y: GROUND_Y - 285, label: 'BOOK', color: '#DC143C' },
        { x: 8230, y: GROUND_Y - 315, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 8450, y: GROUND_Y - 255, label: 'ROPE', color: '#D2B48C' },
        // +HEALTH on upper path
        { x: 8120, y: GROUND_Y - 315, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 10 (7 items) ===
        // Along crumble + wind gauntlet
        { x: 8700, y: GROUND_Y - 93, label: 'SHOE', color: '#8B4513' },
        { x: 8910, y: GROUND_Y - 145, label: 'KEYS', color: '#FFD700' },
        { x: 9120, y: GROUND_Y - 123, label: 'MUG', color: '#FFFFFF' },
        { x: 9330, y: GROUND_Y - 165, label: 'BOOK', color: '#4682B4' },
        { x: 9500, y: GROUND_Y - 113, label: 'ROPE', color: '#D2B48C' },
        // Ground
        { x: 8980, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 9400, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 9250, y: GROUND_Y - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // +HEALTH
        { x: 9200, y: GROUND_Y - 123, label: '+HEALTH', color: '#00FF00' },

        // === SCREEN 11 (7 items) ===
        // BBQ area platforms
        { x: 9660, y: GROUND_Y - 93, label: 'MUG', color: '#FF6347' },
        { x: 9860, y: GROUND_Y - 145, label: 'SHOE', color: '#4169E1' },
        { x: 10030, y: GROUND_Y - 113, label: 'KEYS', color: '#FFD700' },
        { x: 10230, y: GROUND_Y - 165, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 10400, y: GROUND_Y - 123, label: 'BOOK', color: '#DC143C' },
        // Ground
        { x: 9750, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 10300, y: GROUND_Y - 32, label: 'ROPE', color: '#D2B48C' },

        // === SCREEN 12 (10 items) ===
        // Hardest section — every collectable is a challenge to grab
        { x: 10620, y: GROUND_Y - 93, label: 'SHOE', color: '#8B4513' },
        { x: 10830, y: GROUND_Y - 133, label: 'MUG', color: '#FFFFFF' },
        { x: 11050, y: GROUND_Y - 175, label: 'KEYS', color: '#FFD700' },
        { x: 11220, y: GROUND_Y - 143, label: 'BOOK', color: '#4682B4' },
        { x: 11400, y: GROUND_Y - 113, label: 'WATERING_CAN', color: '#2E8B57' },
        // Ground items (still risky — enemies everywhere)
        { x: 10700, y: GROUND_Y - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 10900, y: GROUND_Y - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 11100, y: GROUND_Y - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 11300, y: GROUND_Y - 32, label: 'SHOE', color: '#4169E1' },
        { x: 11450, y: GROUND_Y - 32, label: 'MUG', color: '#FF6347' },
        // +LIFE on the hardest-to-reach high moving clothesline
        { x: 11130, y: GROUND_Y - 315, label: '+LIFE', color: '#FF1493' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // Screen 1: 1 CACTUS
        { x: 460, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400' },

        // Screen 2: 1 WET_FLOOR
        { x: 1300, y: GROUND_Y - 28, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF' },

        // Screen 3: 1 CACTUS (timed)
        { x: 2250, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },

        // Screen 4: 1 PLUG
        { x: 3350, y: GROUND_Y - 26, width: 26, height: 26, label: 'PLUG', color: '#333333' },

        // Screen 5: 1 WET_FLOOR
        { x: 4420, y: GROUND_Y - 28, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF' },

        // Screen 6: 2 timed obstacles
        { x: 5100, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.5, timerOff: 1.2, timerOffset: 0 },
        { x: 5450, y: GROUND_Y - 28, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF',
          timerOn: 1.8, timerOff: 1.0, timerOffset: 0.5 },

        // Screen 7: 1 timed HOT_SUN (overhead!)
        { x: 6300, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },

        // Screen 8: 2 timed obstacles
        { x: 7000, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.8, timerOff: 1.2, timerOffset: 0.3 },
        { x: 7400, y: GROUND_Y - 26, width: 26, height: 26, label: 'PLUG', color: '#333333',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0.8 },

        // Screen 9: 1 timed BBQ_GRILL
        { x: 8200, y: GROUND_Y - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 2.0, timerOff: 1.0, timerOffset: 0 },

        // Screen 10: 2 timed obstacles
        { x: 9000, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.5, timerOff: 1.0, timerOffset: 0 },
        { x: 9350, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 1.8, timerOff: 1.2, timerOffset: 0.5 },

        // Screen 11: 2 timed BBQ_GRILL + 1 HOT_SUN
        { x: 9780, y: GROUND_Y - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 1.5, timerOff: 1.2, timerOffset: 0 },
        { x: 10150, y: GROUND_Y - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 1.8, timerOff: 1.0, timerOffset: 0.6 },
        { x: 10350, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.3 },

        // Screen 12: 3 mixed obstacles — HARDEST screen
        { x: 10750, y: GROUND_Y - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 1.2, timerOff: 1.0, timerOffset: 0 },
        { x: 11050, y: GROUND_Y - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.5, timerOff: 0.8, timerOffset: 0.3 },
        { x: 11350, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 1.5, timerOff: 1.0, timerOffset: 0.6 },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // Screen 1: 1 CAT
        { x: 600, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },

        // Screen 2: 1 WASP
        { x: 1400, y: GROUND_Y - 120, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },

        // Screen 3: 1 PIGEON
        { x: 2500, y: GROUND_Y - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },

        // Screen 4: 1 CAT + 1 WASP
        { x: 3300, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
        { x: 3550, y: GROUND_Y - 150, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },

        // Screen 5: 1 PIGEON
        { x: 4400, y: GROUND_Y - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },

        // Screen 6: 1 CAT + 1 WASP
        { x: 5300, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
        { x: 5600, y: GROUND_Y - 140, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },

        // Screen 7: 1 PIGEON + 1 WASP
        { x: 6100, y: GROUND_Y - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },
        { x: 6500, y: GROUND_Y - 180, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },

        // Screen 8: 1 CAT + 1 PIGEON
        { x: 7100, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
        { x: 7500, y: GROUND_Y - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },

        // Screen 9: 1 WASP
        { x: 8200, y: GROUND_Y - 160, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },

        // Screen 10: 1 CAT + 1 WASP
        { x: 9050, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
        { x: 9400, y: GROUND_Y - 140, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },

        // Screen 11: 1 PIGEON + 1 WASP + 1 CAT
        { x: 9800, y: GROUND_Y - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },
        { x: 10100, y: GROUND_Y - 160, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },
        { x: 10400, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },

        // Screen 12: 2 CAT + 1 WASP + 1 PIGEON — HARDEST screen
        { x: 10700, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
        { x: 11000, y: GROUND_Y - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80 },
        { x: 11150, y: GROUND_Y - 180, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 100 },
        { x: 11400, y: GROUND_Y - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 120 },
    ],
};
