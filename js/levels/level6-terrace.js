// Level 6: Outdoor Terrace
// 13 screen widths (12,480px at 960px canvas width)
// FINAL and HARDEST level — 129 standard collectables + 3 +HEALTH + 1 +LIFE
// Difficulty: 5% easy, 20% moderate, 40% challenging, 35% expert
// DEADLY FLOOR — no full-width ground platform. Boss arena gets solid ground only.

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 13; // 12480

export const level6 = {
    name: 'Outdoor Terrace',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#87CEEB',
    playerStart: { x: 80, y: 465 - 72 },

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
    // ~90 static + ~18 moving + ~16 crumbling = ~124 total
    platforms: [
        // Boss arena ground (solid, full collision)
        { x: CANVAS_W * 12, y: GROUND_Y, width: CANVAS_W, height: 80, label: '', color: '#C4A070' },

        // =====================================================================
        // SCREEN 1 (0-960): TEACH — Garden entrance
        // Easy hops: T1 islands -> T2 table/chair -> T1
        // =====================================================================
        // T1: Spawn island
        { x: 40, y: 465, width: 120, height: 20, label: 'BENCH', color: '#8B5E3C' },
        // T1: Stepping island
        { x: 220, y: 475, width: 80, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T2: Garden table (wide, safe)
        { x: 370, y: 380, width: 130, height: 20, label: 'TABLE', color: '#8B5E3C' },
        // T1: Landing
        { x: 560, y: 470, width: 70, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T2: Chair
        { x: 690, y: 390, width: 80, height: 18, label: 'CHAIR', color: '#228B22' },
        // T1: Railing island
        { x: 830, y: 475, width: 90, height: 16, label: 'RAILING', color: '#6B4226' },
        // T1: Exit island
        { x: 930, y: 465, width: 50, height: 16, label: 'RAILING', color: '#6B4226' },

        // =====================================================================
        // SCREEN 2 (960-1920): TEST — Planter stepping
        // Narrow PLANTERs (55px!) at T1-T2, crumbling planters introduced
        // =====================================================================
        // T1: Entry railing
        { x: 970, y: 470, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Planter (narrow, crumble!)
        { x: 1120, y: 385, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T2: Static planter (alternative)
        { x: 1220, y: 395, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T1: Railing
        { x: 1340, y: 475, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Planter
        { x: 1480, y: 380, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T1: Railing
        { x: 1610, y: 470, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Planter (crumble!)
        { x: 1740, y: 390, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.8, crumbleRespawn: 3.0 },
        // T1: Exit railing
        { x: 1860, y: 475, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },

        // =====================================================================
        // SCREEN 3 (1920-2880): TEST — Clothesline section
        // 3 moving CLOTHESLINEs at T2-T3 with static railing anchors
        // =====================================================================
        // T1: Entry railing
        { x: 1940, y: 470, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Moving clothesline 1
        { x: 2080, y: 375, width: 110, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 50, moveSpeed: 0.8 },
        // T1: Mid railing
        { x: 2260, y: 480, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Moving clothesline 2 (higher)
        { x: 2380, y: 280, width: 100, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -60, moveSpeed: 1.0 },
        // T2: Static railing bridge
        { x: 2540, y: 385, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Moving clothesline 3
        { x: 2680, y: 370, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 55, moveSpeed: 0.9 },
        // T1: Exit railing
        { x: 2830, y: 470, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },

        // =====================================================================
        // SCREEN 4 (2880-3840): VERTICAL CLIMB — Railing zigzag to T4
        // Aggressive T1 -> T2 -> T3 -> T4 zigzag, max challenge
        // =====================================================================
        // T1: Entry railing
        { x: 2910, y: 475, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Right
        { x: 3050, y: 385, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Left
        { x: 2930, y: 290, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T4: Right (bonus!)
        { x: 3080, y: 190, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Descent right
        { x: 3230, y: 270, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Descent
        { x: 3380, y: 380, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Moving railing (side path)
        { x: 3400, y: 280, width: 70, height: 16, label: 'RAILING', color: '#6B4226',
          moveX: 40, moveSpeed: 0.9 },
        // T1: Landing
        { x: 3540, y: 470, width: 80, height: 18, label: 'BENCH', color: '#8B5E3C' },
        // T2: Bridge
        { x: 3680, y: 390, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T1: Exit
        { x: 3810, y: 475, width: 64, height: 18, label: 'PLANTER', color: '#A0522D' },

        // =====================================================================
        // SCREEN 5 (3840-4800): REST — Garden table rest area
        // Wide platforms, generous spacing, easy collecting
        // =====================================================================
        // T1: Wide bench (rest!)
        { x: 3870, y: 470, width: 130, height: 20, label: 'BENCH', color: '#8B5E3C' },
        // T2: Table
        { x: 4060, y: 380, width: 120, height: 20, label: 'TABLE', color: '#8B5E3C' },
        // T1: Chair
        { x: 4240, y: 470, width: 80, height: 18, label: 'CHAIR', color: '#228B22' },
        // T2: Table
        { x: 4380, y: 385, width: 110, height: 20, label: 'TABLE', color: '#8B5E3C' },
        // T1: Chair
        { x: 4550, y: 475, width: 80, height: 18, label: 'CHAIR', color: '#228B22' },
        // T2: Shelf
        { x: 4690, y: 390, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // =====================================================================
        // SCREEN 6 (4800-5760): CHALLENGE — Crumbling planter sprint
        // 6 crumbling PLANTERs at T2 with static alternatives, keep moving!
        // =====================================================================
        // T1: Entry railing
        { x: 4830, y: 475, width: 80, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Crumble planter 1
        { x: 4970, y: 380, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T2: Static railing (alternative)
        { x: 5060, y: 395, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Crumble planter 2
        { x: 5190, y: 370, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T1: Mid railing
        { x: 5310, y: 470, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Crumble planter 3
        { x: 5420, y: 385, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T2: Crumble planter 4
        { x: 5540, y: 375, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T2: Static railing
        { x: 5630, y: 390, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T1: Exit chair
        { x: 5720, y: 470, width: 70, height: 18, label: 'CHAIR', color: '#228B22' },

        // =====================================================================
        // SCREEN 7 (5760-6720): CHALLENGE — Moving clothesline gauntlet
        // 5 moving clotheslines at T2-T3, 180px gaps, aggressive speeds
        // =====================================================================
        // T1: Entry planter
        { x: 5790, y: 475, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T2: Moving clothesline 1
        { x: 5930, y: 380, width: 100, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 60, moveSpeed: 0.9 },
        // T2: Moving clothesline 2
        { x: 6120, y: 360, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -70, moveSpeed: 1.2 },
        // T3: Moving clothesline 3 (higher!)
        { x: 6300, y: 270, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 80, moveSpeed: 1.0 },
        // T2: Moving clothesline 4
        { x: 6470, y: 375, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -50, moveSpeed: 1.4 },
        // T2: Moving clothesline 5
        { x: 6620, y: 390, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 60, moveSpeed: 0.9 },
        // T1: Exit railing
        { x: 6700, y: 470, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },

        // =====================================================================
        // SCREEN 8 (6720-7680): ESCALATE — Vertical + moving combo
        // Planter climb T1-T4 with moving railings interspersed
        // =====================================================================
        // T1: Entry planter
        { x: 6760, y: 475, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T2: Moving railing right
        { x: 6890, y: 380, width: 70, height: 16, label: 'RAILING', color: '#6B4226',
          moveX: 40, moveSpeed: 0.8 },
        // T3: Planter
        { x: 7030, y: 280, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T4: Moving railing (highest!)
        { x: 7170, y: 180, width: 70, height: 16, label: 'RAILING', color: '#6B4226',
          moveX: -50, moveSpeed: 1.0 },
        // T3: Planter descent
        { x: 7310, y: 270, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T2: Moving railing
        { x: 7440, y: 385, width: 70, height: 16, label: 'RAILING', color: '#6B4226',
          moveX: 45, moveSpeed: 0.9 },
        // T4: Static bonus railing
        { x: 7200, y: 150, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T1: Exit planter
        { x: 7580, y: 470, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T2: Static shelf bridge
        { x: 7500, y: 395, width: 70, height: 16, label: 'SHELF', color: '#8B6914' },

        // =====================================================================
        // SCREEN 9 (7680-8640): RISK/REWARD — Dual path
        // Safe lower: T1-T2 table/chair chain
        // Dangerous upper: T3-T4 moving clotheslines for +HEALTH
        // =====================================================================
        // Lower safe path (T1-T2)
        { x: 7710, y: 470, width: 100, height: 20, label: 'TABLE', color: '#8B5E3C' },
        { x: 7880, y: 475, width: 70, height: 18, label: 'CHAIR', color: '#228B22' },
        { x: 8030, y: 465, width: 100, height: 20, label: 'TABLE', color: '#8B5E3C' },
        { x: 8200, y: 475, width: 70, height: 18, label: 'CHAIR', color: '#228B22' },
        { x: 8350, y: 470, width: 90, height: 20, label: 'BENCH', color: '#8B5E3C' },
        // T2: Stepping shelf up to high path
        { x: 7750, y: 385, width: 64, height: 16, label: 'SHELF', color: '#8B6914' },
        // Upper path (T3-T4)
        { x: 7870, y: 280, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 40, moveSpeed: 0.8 },
        { x: 8060, y: 200, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -50, moveSpeed: 1.0 },
        { x: 8260, y: 260, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 45, moveSpeed: 1.2 },
        { x: 8440, y: 190, width: 80, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -40, moveSpeed: 0.9 },
        // T1: Exit
        { x: 8550, y: 475, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },

        // =====================================================================
        // SCREEN 10 (8640-9600): ESCALATE — Crumble + moving gauntlet
        // Crumbling planters between moving clotheslines, 200px gaps
        // =====================================================================
        // T1: Entry railing
        { x: 8660, y: 470, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Crumble planter
        { x: 8800, y: 380, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T2: Static railing (alternative)
        { x: 8890, y: 395, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Moving clothesline
        { x: 9000, y: 280, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 60, moveSpeed: 1.0 },
        // T2: Crumble planter
        { x: 9150, y: 375, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T1: Mid railing
        { x: 9260, y: 475, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Moving clothesline
        { x: 9370, y: 270, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -55, moveSpeed: 1.2 },
        // T2: Crumble planter
        { x: 9490, y: 380, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T2: Static alternative
        { x: 9560, y: 395, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },

        // =====================================================================
        // SCREEN 11 (9600-10560): ESCALATE — BBQ area, all mechanics
        // Shelves, moving, crumbling, narrow — everything combined
        // =====================================================================
        // T1: Entry bench
        { x: 9630, y: 470, width: 80, height: 20, label: 'BENCH', color: '#8B5E3C' },
        // T2: Moving shelf
        { x: 9770, y: 380, width: 80, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 40, moveSpeed: 0.8 },
        // T1: Railing
        { x: 9920, y: 475, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Crumble planter
        { x: 10040, y: 370, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T2: Static railing
        { x: 10130, y: 390, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Moving clothesline (high)
        { x: 10050, y: 260, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -45, moveSpeed: 1.0 },
        // T1: Planter
        { x: 10260, y: 470, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        // T2: Moving shelf
        { x: 10380, y: 385, width: 70, height: 16, label: 'SHELF', color: '#8B6914',
          moveX: 50, moveSpeed: 1.1 },
        // T1: Exit railing
        { x: 10500, y: 475, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },

        // =====================================================================
        // SCREEN 12 (10560-11520): GAUNTLET — Final gauntlet, HARDEST platforming
        // 200px gaps, all platform types, maximum T4 usage
        // =====================================================================
        // T1: Entry railing
        { x: 10590, y: 470, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Crumble planter
        { x: 10730, y: 380, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T2: Static alternative
        { x: 10820, y: 395, width: 55, height: 16, label: 'RAILING', color: '#6B4226' },
        // T3: Moving clothesline
        { x: 10930, y: 280, width: 90, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: 60, moveSpeed: 1.2 },
        // T2: Narrow railing
        { x: 11090, y: 375, width: 55, height: 16, label: 'RAILING', color: '#6B4226' },
        // T4: High moving clothesline — +LIFE location!
        { x: 11020, y: 160, width: 80, height: 14, label: 'SHELF', color: '#C0C0C0',
          moveX: -50, moveSpeed: 1.4 },
        // T2: Crumble planter
        { x: 11220, y: 385, width: 55, height: 18, label: 'PLANTER', color: '#A0522D',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.0 },
        // T1: Railing
        { x: 11340, y: 470, width: 64, height: 16, label: 'RAILING', color: '#6B4226' },
        // T2: Final shelf to boss door
        { x: 11440, y: 390, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },

        // =====================================================================
        // SCREEN 13 (11520-12480): BOSS ARENA
        // 7 platforms at varying heights for dodging BBQ DRAGON + arena ground
        // =====================================================================
        { x: 11600, y: 380, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        { x: 11750, y: 280, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 11920, y: 370, width: 80, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 12080, y: 200, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
        { x: 12230, y: 370, width: 55, height: 18, label: 'PLANTER', color: '#A0522D' },
        { x: 12350, y: 280, width: 80, height: 16, label: 'SHELF', color: '#8B6914' },
        { x: 12100, y: 150, width: 70, height: 16, label: 'RAILING', color: '#6B4226' },
    ],

    // ========== COLLECTABLES ==========
    // 100 standard items + 3 +HEALTH + 1 +LIFE = 104 total
    collectables: [
        // === SCREEN 1 (9 items) ===
        // On spawn bench (T1)
        { x: 80, y: 465 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 130, y: 465 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // On stepping planter (T1)
        { x: 250, y: 475 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        // On table (T2)
        { x: 400, y: 380 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 460, y: 380 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // On planter (T1)
        { x: 650, y: 470 - 32, label: 'SHOE', color: '#8B4513' },
        // On chair (T2)
        { x: 720, y: 390 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // On railing (T1)
        { x: 860, y: 475 - 32, label: 'ROPE', color: '#D2B48C' },
        // On exit (T1)
        { x: 945, y: 465 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // Air cluster between table and chair
        { x: 520, y: 340 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 560, y: 330 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 600, y: 340 - 32, label: 'SHOE', color: '#4169E1' },

        // === SCREEN 2 (9 items) ===
        // On entry railing (T1)
        { x: 1000, y: 470 - 32, label: 'SHOE', color: '#4169E1' },
        // On crumble planter T2
        { x: 1140, y: 385 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // On static planter T2
        { x: 1240, y: 395 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        // On railing T1
        { x: 1435, y: 475 - 32, label: 'ROPE', color: '#D2B48C' },
        // On planter T2
        { x: 1500, y: 380 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // On railing T1
        { x: 1635, y: 470 - 32, label: 'SHOE', color: '#8B4513' },
        // On crumble planter T2
        { x: 1760, y: 390 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // On exit railing T1
        { x: 1885, y: 475 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        // On static planter T2
        { x: 1245, y: 395 - 32, label: 'ROPE', color: '#D2B48C' },
        // Air arc between planters
        { x: 1320, y: 350 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 1370, y: 335 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 1420, y: 350 - 32, label: 'WATERING_CAN', color: '#2E8B57' },

        // === SCREEN 3 (9 items) ===
        // On entry railing (T1)
        { x: 1965, y: 470 - 32, label: 'SHOE', color: '#4169E1' },
        // On moving clothesline 1 (T2)
        { x: 2120, y: 375 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // On mid railing (T1)
        { x: 2285, y: 480 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        // On moving clothesline 2 (T3, bonus!)
        { x: 2420, y: 280 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 2450, y: 280 - 32, label: 'ROPE', color: '#D2B48C' },
        // On static railing (T2)
        { x: 2635, y: 385 - 32, label: 'SHOE', color: '#8B4513' },
        // On moving clothesline 3 (T2)
        { x: 2720, y: 370 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // On exit railing (T1)
        { x: 2855, y: 470 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        // On bridge railing
        { x: 2640, y: 385 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // High air cluster near clothesline 2
        { x: 2470, y: 240 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 2510, y: 230 - 32, label: 'FOOTBALL', color: '#F5F5F5' },

        // === SCREEN 4 (8 items) ===
        // On ascending railings
        { x: 2935, y: 475 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 3075, y: 385 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 2955, y: 290 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // On T4 bonus!
        { x: 3105, y: 190 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // Descent
        { x: 3255, y: 270 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 3475, y: 380 - 32, label: 'SHOE', color: '#8B4513' },
        // On landing (T1)
        { x: 3570, y: 470 - 32, label: 'ROPE', color: '#D2B48C' },
        // On exit
        { x: 3830, y: 475 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // Descent air trail
        { x: 3310, y: 240 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 3370, y: 300 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 3430, y: 340 - 32, label: 'SHOE', color: '#8B4513' },

        // === SCREEN 5 (8 items + 1 +HEALTH) ===
        // Rest screen — generous, easy collecting
        { x: 3910, y: 470 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 3970, y: 470 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 4100, y: 380 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 4160, y: 380 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 4340, y: 470 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 4420, y: 385 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 4580, y: 475 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 4720, y: 390 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // +HEALTH on rest table
        { x: 4440, y: 385 - 32, label: '+HEALTH', color: '#00FF00' },
        // Rest screen bonus cluster on ground
        { x: 4030, y: 470 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 4500, y: 470 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 4650, y: 390 - 32, label: 'SHOE', color: '#4169E1' },

        // === SCREEN 6 (8 items) ===
        // On crumbling planters (must grab fast!)
        { x: 4860, y: 475 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 4990, y: 380 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 5210, y: 370 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 5335, y: 470 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 5440, y: 385 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 5560, y: 375 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 5725, y: 390 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 5745, y: 470 - 32, label: 'ROPE', color: '#D2B48C' },
        // Air arc over crumble planters
        { x: 5100, y: 340 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 5150, y: 325 - 32, label: 'WATERING_CAN', color: '#2E8B57' },

        // === SCREEN 7 (8 items) ===
        // On moving clotheslines (challenge!)
        { x: 5810, y: 475 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 5970, y: 380 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 6160, y: 360 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 6340, y: 270 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 6510, y: 375 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 6660, y: 390 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 6720, y: 470 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // On high clothesline 3 bonus
        { x: 6330, y: 270 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // Air trail between clotheslines
        { x: 6050, y: 340 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 6100, y: 320 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 6440, y: 330 - 32, label: 'SHOE', color: '#4169E1' },

        // === SCREEN 8 (8 items) ===
        // On vertical climb
        { x: 6780, y: 475 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 6920, y: 380 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 7120, y: 280 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 7200, y: 180 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 7330, y: 270 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 7470, y: 385 - 32, label: 'SHOE', color: '#8B4513' },
        // On T4 bonus railing
        { x: 7225, y: 150 - 32, label: 'ROPE', color: '#D2B48C' },
        // On bridge shelf
        { x: 7595, y: 395 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // Vertical climb air cluster
        { x: 7000, y: 340 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 7050, y: 240 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 7250, y: 220 - 32, label: 'ROPE', color: '#D2B48C' },

        // === SCREEN 9 (8 items + 1 +HEALTH) ===
        // Lower safe path (~4 items)
        { x: 7745, y: 470 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 7910, y: 475 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 8135, y: 465 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 8230, y: 475 - 32, label: 'ROPE', color: '#D2B48C' },
        // Upper path (4 items + 1 +HEALTH)
        { x: 7905, y: 280 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 8095, y: 200 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 8295, y: 260 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 8475, y: 190 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        // +HEALTH on high path
        { x: 8110, y: 200 - 32, label: '+HEALTH', color: '#00FF00' },
        // Upper path bonus arc
        { x: 8200, y: 220 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 8380, y: 210 - 32, label: 'GARDEN_TOOL', color: '#228B22' },

        // === SCREEN 10 (7 items + 1 +HEALTH) ===
        // Along crumble + moving gauntlet
        { x: 8685, y: 470 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 8825, y: 380 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 9035, y: 280 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 9175, y: 375 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 9285, y: 475 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 9405, y: 270 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 9515, y: 380 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        // +HEALTH on T3 moving clothesline
        { x: 9390, y: 270 - 32, label: '+HEALTH', color: '#00FF00' },
        // Gauntlet air trail
        { x: 8750, y: 340 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 9100, y: 240 - 32, label: 'SHOE', color: '#8B4513' },

        // === SCREEN 11 (7 items) ===
        // BBQ area
        { x: 9665, y: 470 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 9805, y: 380 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 10015, y: 475 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 10065, y: 370 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 10085, y: 260 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 10285, y: 470 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 10415, y: 385 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // BBQ area high cluster
        { x: 9870, y: 340 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 10130, y: 320 - 32, label: 'WATERING_CAN', color: '#2E8B57' },

        // === SCREEN 12 (10 items + 1 +LIFE) ===
        // Hardest section — every collectable is a challenge
        { x: 10615, y: 470 - 32, label: 'SHOE', color: '#4169E1' },
        { x: 10825, y: 380 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 10965, y: 280 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 11185, y: 375 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 11245, y: 385 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 11365, y: 470 - 32, label: 'SHOE', color: '#8B4513' },
        { x: 11465, y: 390 - 32, label: 'WATERING_CAN', color: '#2E8B57' },
        { x: 10845, y: 395 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 11185, y: 375 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        { x: 10620, y: 470 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 11300, y: 280 - 32, label: 'GARDEN_TOOL', color: '#228B22' },
        // +LIFE on T4 high moving clothesline — hardest grab in the game!
        { x: 11050, y: 160 - 32, label: '+LIFE', color: '#FF1493' },
        // Final screen air clusters — reward for pushing through
        { x: 10700, y: 340 - 32, label: 'ROPE', color: '#D2B48C' },
        { x: 10900, y: 240 - 32, label: 'FOOTBALL', color: '#F5F5F5' },
        { x: 11100, y: 330 - 32, label: 'SHOE', color: '#4169E1' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // Screen 1: 1 CACTUS on T1 planter
        { x: 580, y: 470 - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400' },

        // Screen 2: 1 WET_FLOOR on T1 railing
        { x: 1360, y: 475 - 28, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF' },

        // Screen 3: 1 CACTUS (timed) on T2 railing
        { x: 2560, y: 385 - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },

        // Screen 4: 1 PLUG on T2
        { x: 3400, y: 380 - 26, width: 26, height: 26, label: 'PLUG', color: '#333333' },

        // Screen 5: 1 WET_FLOOR on T1
        { x: 4260, y: 470 - 28, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF' },

        // Screen 6: 2 timed obstacles on T2
        { x: 5080, y: 395 - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.5, timerOff: 1.2, timerOffset: 0 },
        { x: 5650, y: 390 - 28, width: 30, height: 28, label: 'WET_FLOOR', color: '#00BFFF',
          timerOn: 1.8, timerOff: 1.0, timerOffset: 0.5 },

        // Screen 7: 1 timed HOT_SUN (overhead)
        { x: 6300, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0 },

        // Screen 8: 2 timed obstacles on platforms
        { x: 7050, y: 280 - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.8, timerOff: 1.2, timerOffset: 0.3 },
        { x: 7520, y: 395 - 26, width: 26, height: 26, label: 'PLUG', color: '#333333',
          timerOn: 1.5, timerOff: 1.5, timerOffset: 0.8 },

        // Screen 9: 1 timed BBQ_GRILL on T1 table
        { x: 8070, y: 465 - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 2.0, timerOff: 1.0, timerOffset: 0 },

        // Screen 10: 2 timed obstacles
        { x: 8910, y: 395 - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.5, timerOff: 1.0, timerOffset: 0 },
        { x: 9280, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 1.8, timerOff: 1.2, timerOffset: 0.5 },

        // Screen 11: 2 timed BBQ_GRILL + 1 HOT_SUN
        { x: 9940, y: 475 - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 1.5, timerOff: 1.2, timerOffset: 0 },
        { x: 10150, y: 390 - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 1.8, timerOff: 1.0, timerOffset: 0.6 },
        { x: 10350, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.3 },

        // Screen 12: 3 mixed obstacles — HARDEST screen
        { x: 10750, y: 380 - 35, width: 35, height: 35, label: 'BBQ_GRILL', color: '#222222',
          timerOn: 1.2, timerOff: 1.0, timerOffset: 0 },
        { x: 11110, y: 375 - 30, width: 25, height: 30, label: 'CACTUS', color: '#006400',
          timerOn: 1.5, timerOff: 0.8, timerOffset: 0.3 },
        { x: 11350, y: 100, width: 40, height: 40, label: 'HOT_SUN', color: '#FF4500',
          timerOn: 1.5, timerOff: 1.0, timerOffset: 0.6 },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // Screen 1: 1 CAT on T2 table
        { x: 420, y: 380 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 120, behavior: 'shooter' },

        // Screen 2: 1 WASP near T2
        { x: 1500, y: 370 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 120, behavior: 'charger' },

        // Screen 3: 1 PIGEON on T1 mid railing
        { x: 2280, y: 480 - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 80, behavior: 'jumper' },

        // Screen 4: 1 CAT on T1 bench + 1 WASP near T3
        { x: 3560, y: 470 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 100, behavior: 'shooter' },
        { x: 3420, y: 270 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 120, behavior: 'charger' },

        // Screen 5: 1 PIGEON on T1
        { x: 4260, y: 470 - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 100, behavior: 'jumper' },

        // Screen 6: 1 CAT on T1 + 1 WASP near T2
        { x: 5330, y: 470 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80, behavior: 'shooter' },
        { x: 5560, y: 365 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 120, behavior: 'charger' },

        // Screen 7: 1 PIGEON on T1 + 1 WASP near T3
        { x: 6715, y: 470 - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 80, behavior: 'jumper' },
        { x: 6350, y: 260 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 120, behavior: 'charger' },

        // Screen 8: 1 CAT on T1 + 1 PIGEON on T3
        { x: 6780, y: 475 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 60, behavior: 'shooter' },
        { x: 7330, y: 270 - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 60, behavior: 'jumper' },

        // Screen 9: 1 WASP near upper path
        { x: 8280, y: 250 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 160, behavior: 'charger' },

        // Screen 10: 1 CAT on T1 + 1 WASP near T3
        { x: 9280, y: 475 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80, behavior: 'shooter' },
        { x: 9020, y: 270 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 120, behavior: 'charger' },

        // Screen 11: 1 PIGEON on T1 + 1 WASP near T3 + 1 CAT on T1
        { x: 9650, y: 470 - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 100, behavior: 'jumper' },
        { x: 10070, y: 250 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 120, behavior: 'charger' },
        { x: 10280, y: 470 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 60, behavior: 'shooter' },

        // Screen 12: 2 CAT + 1 WASP + 1 PIGEON — HARDEST screen
        { x: 10610, y: 470 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80, behavior: 'shooter' },
        { x: 11360, y: 470 - 25, width: 35, height: 25, label: 'CAT', color: '#FF8800', speed: 40, patrolRange: 80, behavior: 'shooter' },
        { x: 11040, y: 270 - 20, width: 25, height: 20, label: 'WASP', color: '#FFD700', speed: 60, patrolRange: 120, behavior: 'charger' },
        { x: 11240, y: 385 - 25, width: 30, height: 25, label: 'PIGEON', color: '#808080', speed: 45, patrolRange: 60, behavior: 'jumper' },
    ],
};
