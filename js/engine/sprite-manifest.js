// Sprite manifest — maps game object labels to image file paths
// Renderers check this manifest; if an image is loaded, they draw it instead of procedural shapes.
// Falls back gracefully — if the image fails to load, the procedural renderer still works.

// Platform/furniture sprites — keyed by platform label
export const PLATFORM_SPRITES = {
    // Living Room (level 1)
    'SOFA':          'assets/platforms/living/sofa-front.png',
    'SOFA ARM':      'assets/platforms/living/sofa.png',
    'ARMCHAIR':      'assets/platforms/living/armchair-front.png',
    'TABLE':         'assets/platforms/living/table-front.png',
    'TV UNIT':       'assets/platforms/living/tvstand-front.png',
    'BOOKS':         'assets/platforms/living/bookshelf.png',

    // Kitchen (level 2)
    'COUNTER':       'assets/platforms/kitchen/counter.png',
    'DRAWER':        'assets/platforms/kitchen/drawer.png',
    'FRIDGE':        'assets/platforms/kitchen/fridge.png',
    'STOOL':         'assets/platforms/kitchen/stool.png',

    // Bathroom (level 3)
    'BATHTUB':       'assets/platforms/bathroom/bathtub.png',
    'TOILET':        'assets/platforms/bathroom/toilet.png',
    'SINK':          'assets/platforms/bathroom/sink.png',

    // Kids Room (level 4)
    'BUNK_BED':      'assets/platforms/kids/bunk-bed.png',
    'TOY_CHEST':     'assets/platforms/kids/toy-chest.png',
    'DESK':          'assets/platforms/kids/desk-front.png',

    // Parents Room (level 5)
    'BED':           'assets/platforms/parents/bed.png',
    'BEDSIDE_TABLE': 'assets/platforms/parents/bedside-table.png',
    'WARDROBE':      'assets/platforms/parents/wardrobe.png',
    'DRESSER':       'assets/platforms/parents/dresser.png',

    // Terrace (level 6)
    'GARDEN_CHAIR':  'assets/platforms/terrace/garden-chair.png',
    'GARDEN_TABLE':  'assets/platforms/terrace/garden-table.png',
    'PLANT_POT':     'assets/platforms/terrace/plant-pot.png',

    // Shared
    'CHAIR':         'assets/platforms/shared/chair-front.png',
    'SHELF':         'assets/platforms/shared/shelf-front.png',
    'TOP SHELF':     'assets/platforms/shared/shelf-front.png',
    'SHOWER_SHELF':  'assets/platforms/bathroom/metal-shelf.png',
    'LAMP':          'assets/platforms/shared/lamp-floor.png',
};

// Enemy sprites — keyed by enemy label
export const ENEMY_SPRITES = {
    'CAT': {
        frames: [
            'assets/enemies/cat/walk-1.png',
            'assets/enemies/cat/walk-2.png',
            'assets/enemies/cat/walk-3.png',
            'assets/enemies/cat/walk-4.png',
            'assets/enemies/cat/walk-5.png',
            'assets/enemies/cat/walk-6.png',
            'assets/enemies/cat/walk-7.png',
            'assets/enemies/cat/walk-8.png',
            'assets/enemies/cat/walk-9.png',
            'assets/enemies/cat/walk-10.png',
        ],
        idle: 'assets/enemies/cat/idle.png',
        frameRate: 8, // fps
    },
    'SPIDER': {
        spritesheet: 'assets/enemies/shared/spider-sheet.png',
        frameCount: 6,
        frameRate: 8,
    },
    'PIGEON': {
        frames: [
            'assets/enemies/shared/pigeon-1.png',
            'assets/enemies/shared/pigeon-2.png',
        ],
        frameRate: 4,
    },
};

// Decoration sprites — keyed by decoration type
export const DECORATION_SPRITES = {
    'doorway':       'assets/platforms/shared/doorway.png',
    'rug':           'assets/platforms/living/rug.png',
};

// Collect ALL paths for preloading
export function getAllSpritePaths() {
    const paths = new Set();

    // Platform sprites
    for (const path of Object.values(PLATFORM_SPRITES)) {
        paths.add(path);
    }

    // Enemy sprites
    for (const data of Object.values(ENEMY_SPRITES)) {
        if (data.frames) data.frames.forEach(p => paths.add(p));
        if (data.idle) paths.add(data.idle);
        if (data.spritesheet) paths.add(data.spritesheet);
    }

    // Decoration sprites
    for (const path of Object.values(DECORATION_SPRITES)) {
        paths.add(path);
    }

    return [...paths];
}
