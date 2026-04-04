// Level 2: Kitchen
// 5 screen widths (~4800px at 960px canvas width)

const GROUND_Y = 520;
const CANVAS_W = 960;
const LEVEL_W = CANVAS_W * 5;

export const level2 = {
    name: 'Kitchen',
    width: LEVEL_W,
    groundY: GROUND_Y,
    backgroundColor: '#F0E8D8',
    playerStart: { x: 80, y: GROUND_Y - 72 },

    bossDoor: { x: CANVAS_W * 4 - 80, y: GROUND_Y - 120 },

    bossArena: {
        x: CANVAS_W * 4,
        y: 0,
        width: CANVAS_W,
        height: 600,
    },

    boss: {
        x: CANVAS_W * 4 + 600,
        y: GROUND_Y - 90,
        label: 'FRIDGE BEAST',
        color: '#4477AA',
        width: 130,
        height: 90,
        health: 3,
        speed: 240,
        attacks: ['charge', 'shoot', 'charge', 'spin'],
    },

    // ========== DECORATIONS (non-interactive background) ==========
    decorations: [
        // === ARCHITECTURAL (spans full level) ===
        { x: 0, y: 8, type: 'cornice', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 250, type: 'dado_rail', w: LEVEL_W },
        { x: 0, y: GROUND_Y - 6, type: 'skirting', w: LEVEL_W },

        // === SECTION 1 (0–960): Kitchen entrance ===
        { x: 350, y: 75, type: 'ceiling_light', size: 48, color: '#FFF8E0' },
        { x: 520, y: GROUND_Y - 380, type: 'window', w: 90, h: 80 },
        { x: 500, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 618, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 250, y: GROUND_Y - 5, type: 'rug', w: 260, h: 10, color: '#6B8E23' },
        { x: 40, y: GROUND_Y - 340, type: 'family_photo', w: 35, h: 30, color: '#B8860B' },
        { x: 110, y: GROUND_Y - 320, type: 'family_photo', w: 30, h: 25, color: '#8B6914' },
        { x: 20, y: GROUND_Y - 40, emoji: '🪴', size: 32 },
        { x: 700, y: GROUND_Y - 350, type: 'wall_art', w: 55, h: 42, color: '#E8D8C0' },
        { x: 870, y: GROUND_Y - 360, emoji: '🕰️', size: 28 },
        { x: 515, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 420, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 800, y: GROUND_Y - 50, type: 'wall_socket' },
        // Kitchen-specific: tiled backsplash behind counter
        { x: 100, y: GROUND_Y - 180, type: 'wall_art', w: 240, h: 60, color: '#D0D8E0' },
        // Shelf emojis for kitchen items
        { x: 720, y: GROUND_Y - 280, type: 'wall_shelf_deco', w: 60, items: ['🫙', '🧂', '🫒'] },
        { x: 50, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SECTION 2 (960–1920): Fridge area ===
        { x: 1400, y: 70, type: 'ceiling_light', size: 50, color: '#FFF8E0' },
        { x: 1200, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 1182, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 1293, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 235, color: '#CC9966' },
        { x: 1500, y: GROUND_Y - 5, type: 'rug', w: 220, h: 10, color: '#8B4513' },
        { x: 980, y: GROUND_Y - 350, type: 'wall_art', w: 48, h: 38, color: '#E8D8C0' },
        { x: 1350, y: GROUND_Y - 340, type: 'family_photo', w: 32, h: 28, color: '#B8860B' },
        { x: 1395, y: GROUND_Y - 360, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 1800, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 960, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        { x: 1195, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 1880, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 1100, y: GROUND_Y - 50, type: 'wall_socket' },
        // Kitchen shelf decor
        { x: 1700, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 55, items: ['🍶', '🫖', '🪴'] },
        { x: 1550, y: GROUND_Y - 180, type: 'wall_art', w: 200, h: 50, color: '#D0D8E0' },

        // === SECTION 3 (1920–2880): Upper cabinets / tight platforming ===
        { x: 2400, y: 68, type: 'ceiling_light', size: 45, color: '#FFF8E0' },
        { x: 2350, y: GROUND_Y - 385, type: 'window', w: 90, h: 80 },
        { x: 2332, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 2448, y: GROUND_Y - 390, type: 'curtain', w: 28, h: 245, color: '#CC9966' },
        { x: 2550, y: GROUND_Y - 5, type: 'rug', w: 200, h: 10, color: '#6B8E23' },
        { x: 1960, y: GROUND_Y - 400, type: 'wall_art', w: 52, h: 40, color: '#E8D8C0' },
        { x: 2650, y: GROUND_Y - 340, type: 'wall_art', w: 46, h: 36, color: '#B8860B' },
        { x: 2150, y: GROUND_Y - 375, type: 'family_photo', w: 32, h: 26, color: '#B8860B' },
        { x: 2820, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },
        { x: 2860, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 1930, y: GROUND_Y - 35, emoji: '🪴', size: 28 },
        { x: 2345, y: GROUND_Y - 55, type: 'radiator', w: 95, h: 32 },
        { x: 2050, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2780, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 2100, y: GROUND_Y - 280, type: 'wall_shelf_deco', w: 55, items: ['🥫', '🫙', '🍯'] },
        { x: 2700, y: GROUND_Y - 290, type: 'wall_shelf_deco', w: 50, items: ['🧴', '🪴'] },
        // Tiled backsplash
        { x: 1960, y: GROUND_Y - 180, type: 'wall_art', w: 220, h: 55, color: '#D0D8E0' },

        // === SECTION 4 (2880–3840): Winding path upward ===
        { x: 3350, y: 65, type: 'ceiling_light', size: 52, color: '#FFF8E0' },
        { x: 3100, y: GROUND_Y - 380, type: 'window', w: 85, h: 75 },
        { x: 3082, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 3193, y: GROUND_Y - 385, type: 'curtain', w: 28, h: 240, color: '#CC9966' },
        { x: 3400, y: GROUND_Y - 5, type: 'rug', w: 250, h: 10, color: '#8B4513' },
        { x: 2920, y: GROUND_Y - 350, type: 'wall_art', w: 50, h: 40, color: '#B8860B' },
        { x: 3600, y: GROUND_Y - 360, type: 'wall_art', w: 48, h: 38, color: '#E8D8C0' },
        { x: 3250, y: GROUND_Y - 370, type: 'family_photo', w: 34, h: 28, color: '#B8860B' },
        { x: 3300, y: GROUND_Y - 390, type: 'family_photo', w: 28, h: 24, color: '#8B6914' },
        { x: 2900, y: GROUND_Y - 38, emoji: '🪴', size: 30 },
        { x: 3800, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 3095, y: GROUND_Y - 55, type: 'radiator', w: 90, h: 30 },
        { x: 3000, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3750, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 3500, y: GROUND_Y - 300, type: 'wall_shelf_deco', w: 55, items: ['🫙', '🍶', '🕯️'] },
        { x: 3780, y: GROUND_Y - 370, emoji: '🕰️', size: 28 },
        { x: 2880, y: GROUND_Y - 120, type: 'doorway', w: 70, h: 120 },

        // === SECTION 5 (3840–4800): Boss arena ===
        { x: 4300, y: 60, type: 'ceiling_light', size: 58, color: '#FFE8C0' },
        { x: 4400, y: GROUND_Y - 5, type: 'rug', w: 400, h: 12, color: '#4A0808' },
        { x: 3960, y: GROUND_Y - 355, type: 'wall_art', w: 58, h: 44, color: '#B8860B' },
        { x: 4600, y: GROUND_Y - 345, type: 'wall_art', w: 52, h: 40, color: '#E8D8C0' },
        { x: 4100, y: GROUND_Y - 375, type: 'family_photo', w: 34, h: 30, color: '#B8860B' },
        { x: 4500, y: GROUND_Y - 380, type: 'family_photo', w: 30, h: 26, color: '#8B6914' },
        { x: 3880, y: GROUND_Y - 40, emoji: '🪴', size: 30 },
        { x: 4750, y: GROUND_Y - 36, emoji: '🪴', size: 28 },
        { x: 3960, y: GROUND_Y - 55, type: 'radiator', w: 85, h: 30 },
        { x: 4650, y: GROUND_Y - 55, type: 'radiator', w: 85, h: 30 },
        { x: 4000, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4700, y: GROUND_Y - 50, type: 'wall_socket' },
        { x: 4300, y: GROUND_Y - 400, emoji: '🕰️', size: 32 },
        // Steam from stove area and dripping tap
        { x: 800, y: GROUND_Y - 200, type: 'steam_wisps' },
        { x: 2200, y: GROUND_Y - 180, type: 'steam_wisps' },
        { x: 1500, y: GROUND_Y - 250, type: 'dripping_tap' },
    ],

    // ========== PLATFORMS ==========
    platforms: [
        // Ground
        { x: 0, y: GROUND_Y, width: LEVEL_W, height: 80, label: '', color: '#E8E0D0' },

        // === Section 1: Kitchen entrance — easy intro (0–960) ===
        { x: 150, y: GROUND_Y - 55, width: 240, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 450, y: GROUND_Y - 45, width: 130, height: 18, label: 'DINING_TABLE', color: '#A0522D' },
        { x: 650, y: GROUND_Y - 40, width: 70, height: 16, label: 'STOOL', color: '#8B6914' },
        { x: 800, y: GROUND_Y - 90, width: 100, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 880, y: GROUND_Y - 50, width: 65, height: 16, label: 'CHAIR', color: '#8B4513' },

        // === Section 2: Fridge area, drawers as stepping stones (960–1920) ===
        { x: 980, y: GROUND_Y - 50, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 1080, y: GROUND_Y - 120, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.6, crumbleRespawn: 3.0 },
        { x: 980, y: GROUND_Y - 190, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 1100, y: GROUND_Y - 250, width: 100, height: 20, label: 'FRIDGE', color: '#C0C8D0' },
        { x: 1260, y: GROUND_Y - 200, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 80, moveSpeed: 1.2 },
        { x: 1380, y: GROUND_Y - 230, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -70, moveSpeed: 1.0 },
        { x: 1500, y: GROUND_Y - 180, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 60, moveSpeed: 1.4 },
        { x: 1620, y: GROUND_Y - 60, width: 200, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 1850, y: GROUND_Y - 80, width: 60, height: 16, label: 'STOOL', color: '#8B6914',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.5 },

        // === Section 3: Upper cabinets, tight platforming (1920–2880) ===
        { x: 1960, y: GROUND_Y - 55, width: 180, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 2070, y: GROUND_Y - 130, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 1970, y: GROUND_Y - 200, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 2100, y: GROUND_Y - 270, width: 90, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 2000, y: GROUND_Y - 340, width: 110, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 2250, y: GROUND_Y - 60, width: 130, height: 20, label: 'DINING_TABLE', color: '#A0522D' },
        { x: 2440, y: GROUND_Y - 120, width: 65, height: 16, label: 'STOOL', color: '#8B6914' },
        { x: 2560, y: GROUND_Y - 55, width: 70, height: 16, label: 'CHAIR', color: '#8B4513' },
        { x: 2700, y: GROUND_Y - 50, width: 140, height: 22, label: 'COUNTER', color: '#A0896C' },

        // === Section 4: Winding path upward (2880–3840) ===
        { x: 2920, y: GROUND_Y - 60, width: 80, height: 18, label: 'DRAWER', color: '#B0A090' },
        { x: 3040, y: GROUND_Y - 130, width: 80, height: 18, label: 'DRAWER', color: '#B0A090',
          crumble: true, crumbleDelay: 0.5, crumbleRespawn: 3.5 },
        { x: 2940, y: GROUND_Y - 200, width: 80, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 3080, y: GROUND_Y - 270, width: 90, height: 18, label: 'SHELF', color: '#8B6914' },
        { x: 3200, y: GROUND_Y - 200, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: 70, moveSpeed: 1.2 },
        { x: 3340, y: GROUND_Y - 130, width: 55, height: 16, label: 'HANGING_POT', color: '#8B4513',
          moveX: -60, moveSpeed: 1.0 },
        { x: 3450, y: GROUND_Y - 55, width: 200, height: 22, label: 'COUNTER', color: '#A0896C' },
        { x: 3700, y: GROUND_Y - 80, width: 100, height: 20, label: 'FRIDGE', color: '#C0C8D0' },

        // === Section 5: Boss arena — shelves to escape tall fridge (3840–4800) ===
        { x: 3920, y: GROUND_Y - 100, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4100, y: GROUND_Y - 160, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4300, y: GROUND_Y - 120, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4500, y: GROUND_Y - 170, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
        { x: 4700, y: GROUND_Y - 110, width: 90, height: 20, label: 'SHELF', color: '#8B6914' },
    ],

    // ========== COLLECTABLES ==========
    collectables: [
        // Section 1 — plates and cups on the counter and table
        { x: 200, y: GROUND_Y - 80, label: 'PLATE', color: '#E8E8E8' },
        { x: 260, y: GROUND_Y - 80, label: 'CUP', color: '#F5F5DC' },
        { x: 330, y: GROUND_Y - 80, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 480, y: GROUND_Y - 70, label: 'PLATE', color: '#E8E8E8' },
        { x: 540, y: GROUND_Y - 70, label: 'SPONGE', color: '#FFD700' },
        { x: 670, y: GROUND_Y - 65, label: 'CUP', color: '#87CEEB' },
        { x: 830, y: GROUND_Y - 120, label: 'SPICE', color: '#D2691E' },

        // Section 2 — items around the fridge and hanging pots
        { x: 1000, y: GROUND_Y - 80, label: 'TEA_TOWEL', color: '#FF6347' },
        { x: 1100, y: GROUND_Y - 150, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 1000, y: GROUND_Y - 220, label: 'PAN', color: '#696969' },
        { x: 1130, y: GROUND_Y - 280, label: 'POT', color: '#808080' },
        { x: 1280, y: GROUND_Y - 230, label: 'POT', color: '#808080' },
        { x: 1400, y: GROUND_Y - 260, label: 'PAN', color: '#696969' },
        { x: 1650, y: GROUND_Y - 90, label: 'PLATE', color: '#E8E8E8' },
        { x: 1720, y: GROUND_Y - 90, label: 'SPICE', color: '#8B4513' },

        // Section 3 — harder to reach items on upper shelves
        { x: 2000, y: GROUND_Y - 80, label: 'SPONGE', color: '#FFD700' },
        { x: 2090, y: GROUND_Y - 160, label: 'CUP', color: '#87CEEB' },
        { x: 1990, y: GROUND_Y - 230, label: 'SPICE', color: '#D2691E' },
        { x: 2120, y: GROUND_Y - 300, label: 'TEA_TOWEL', color: '#FF6347' },
        { x: 2020, y: GROUND_Y - 370, label: 'UTENSIL', color: '#C0C0C0' },
        { x: 2290, y: GROUND_Y - 90, label: 'PLATE', color: '#E8E8E8' },
        { x: 2460, y: GROUND_Y - 150, label: 'CUP', color: '#F5F5DC' },

        // Section 4 — scattered along the winding path
        { x: 2940, y: GROUND_Y - 90, label: 'PAN', color: '#696969' },
        { x: 3060, y: GROUND_Y - 160, label: 'POT', color: '#808080' },
        { x: 2960, y: GROUND_Y - 230, label: 'SPICE', color: '#D2691E' },
        { x: 3500, y: GROUND_Y - 80, label: 'PLATE', color: '#E8E8E8' },

        // Health pickup
        { x: 3100, y: GROUND_Y - 300, label: '+HEALTH', color: '#00FF00' },
    ],

    // ========== OBSTACLES ==========
    obstacles: [
        // Section 1
        { x: 400, y: GROUND_Y - 25, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },
        { x: 750, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // Section 2
        { x: 1180, y: GROUND_Y - 30, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0',
          timerOn: 1.5, timerOff: 2.0, timerOffset: 0 },
        { x: 1550, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },

        // Section 3
        { x: 2200, y: GROUND_Y - 30, width: 40, height: 30, label: 'OVEN', color: '#333',
          timerOn: 2.5, timerOff: 2.0, timerOffset: 0 },
        { x: 2500, y: GROUND_Y - 30, width: 35, height: 30, label: 'BOILING_POT', color: '#FF4500',
          timerOn: 2.0, timerOff: 1.5, timerOffset: 0.8 },
        { x: 2780, y: GROUND_Y - 20, width: 24, height: 20, label: 'PLUG', color: '#FFD700' },

        // Section 4
        { x: 3160, y: GROUND_Y - 30, width: 30, height: 30, label: 'KNIFE', color: '#C0C0C0' },
        { x: 3380, y: GROUND_Y - 25, width: 40, height: 25, label: 'WET_FLOOR', color: '#87CEEB' },
        { x: 3650, y: GROUND_Y - 25, width: 40, height: 25, label: 'CABLE', color: '#333' },
    ],

    // ========== ENEMIES ==========
    enemies: [
        // Section 1
        { x: 550, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },

        // Section 2
        { x: 1300, y: GROUND_Y - 30, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },
        { x: 1750, y: GROUND_Y - 12, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 100 },

        // Section 3
        { x: 2350, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },
        { x: 2650, y: GROUND_Y - 30, width: 30, height: 30, label: 'BLENDER', color: '#A0A0A0', patrolRange: 60 },

        // Section 4
        { x: 3250, y: GROUND_Y - 12, width: 40, height: 12, label: 'ANTS', color: '#2F1F0F', patrolRange: 100 },
        { x: 3550, y: GROUND_Y - 15, width: 30, height: 15, label: 'COCKROACH', color: '#4A3728', patrolRange: 80 },
    ],
};
