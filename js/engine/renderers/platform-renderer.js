// Platform and furniture drawing — thin router
// Individual furniture renderers live in ./furniture/
import { roundRect, lighten, darken } from './shared.js';
import { getTheme, drawFurnitureShadow } from './level-themes.js';
import { getImage } from '../asset-loader.js';
import { PLATFORM_SPRITES } from '../sprite-manifest.js';

// Seating
import { drawSofa, drawArmchair, drawCushionPlatform, drawChair, drawStool } from './furniture/seating.js';
// Tables & surfaces
import { drawTable, drawTVUnit, drawCounter } from './furniture/tables.js';
// Storage
import { drawShelf, drawBookShelf, drawDrawer, drawFridge, drawToyChest, drawDresser, drawLaundryBasket, drawWardrobe } from './furniture/storage.js';
// Beds
import { drawBed, drawBunkBed } from './furniture/beds.js';
// Miscellaneous
import { drawPictureFrame, drawLampPlatform, drawHangingPot, drawBoardGames, drawBathtub, drawToilet, drawSink, drawTowelRack, drawPlantPot, drawRailing, drawClothesline } from './furniture/misc.js';

const PLATFORM_EMOJI = {
    'SOFA':      '🛋️',
    'ARMCHAIR':  '🪑',
    'TABLE':     null, // canvas-drawn
    'TV UNIT':   null, // canvas-drawn with 📺 on top
    'SHELF':     null,
    'BOOKS':     '📚',
    'FRAME':     '🖼️',
    'CUSHION':   null,
    'CHAIR':     '🪑',
    'LAMP':      '💡',
    'SOFA ARM':  null,
    'TOP SHELF': null,
};

export function drawPlatform(ctx, x, y, w, h, label, color, groundY) {
    ctx.save();
    // groundY is the screen-space Y of the floor (for drawing legs)
    const floorY = groundY !== undefined ? groundY : (y + h);
    const theme = getTheme();

    // Try sprite image first — if available, draw it and skip procedural
    if (label && PLATFORM_SPRITES[label]) {
        const img = getImage(PLATFORM_SPRITES[label]);
        if (img) {
            // Draw shadow under furniture
            drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 5, 4);
            // The platform hitbox top = y, that's where the player stands.
            // Draw the sprite so its TOP aligns with y (the landing surface)
            // and it extends DOWN to floorY (the ground).
            const aspect = img.width / img.height;
            const drawH = floorY - y;       // furniture fills from platform top to floor
            const drawW = drawH * aspect;   // maintain aspect ratio
            // Center horizontally on the platform
            const drawX = x + (w - drawW) / 2;
            // If sprite is taller than wide (bookshelf, wardrobe, fridge), clamp width to platform
            if (drawW < w * 0.5) {
                // Very narrow — use platform width as basis instead
                const altW = w;
                const altH = altW / aspect;
                const altX = x;
                const altY = floorY - altH; // anchor bottom to floor
                ctx.drawImage(img, altX, altY, altW, altH);
            } else {
                ctx.drawImage(img, drawX, y, drawW, drawH);
            }
            ctx.restore();
            return;
        }
    }

    if (!label) {
        // Ground — themed tile floor
        ctx.fillStyle = color || theme.floor.base;
        ctx.fillRect(x, y, w, h);
        // Tile pattern
        ctx.strokeStyle = theme.floor.grout;
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 40) {
            ctx.beginPath();
            ctx.moveTo(x + i, y);
            ctx.lineTo(x + i, y + h);
            ctx.stroke();
        }
        for (let j = 0; j < h; j += 20) {
            ctx.beginPath();
            ctx.moveTo(x, y + j);
            ctx.lineTo(x + w, y + j);
            ctx.stroke();
        }
        // Top edge
        ctx.fillStyle = theme.floor.tile;
        ctx.fillRect(x, y, w, 3);
        ctx.restore();
        return;
    }

    // Specific furniture drawing — routes by label
    const FURNITURE = {
        'SOFA': () => drawSofa(ctx, x, y, w, h, color, floorY),
        'SOFA ARM': () => drawSofa(ctx, x, y, w, h, color, floorY),
        'ARMCHAIR': () => drawArmchair(ctx, x, y, w, h, color, floorY),
        'TABLE': () => drawTable(ctx, x, y, w, h, color, floorY),
        'DINING_TABLE': () => drawTable(ctx, x, y, w, h, color, floorY),
        'GARDEN_TABLE': () => drawTable(ctx, x, y, w, h, color, floorY),
        'TV UNIT': () => drawTVUnit(ctx, x, y, w, h, floorY),
        'SHELF': () => drawShelf(ctx, x, y, w, h, color),
        'TOP SHELF': () => drawShelf(ctx, x, y, w, h, color),
        'SHOWER_SHELF': () => drawShelf(ctx, x, y, w, h, color),
        'BOOKS': () => drawBookShelf(ctx, x, y, w, h),
        'FRAME': () => drawPictureFrame(ctx, x, y, w, h),
        'CUSHION': () => drawCushionPlatform(ctx, x, y, w, h, color),
        'PILLOW_FORT': () => drawCushionPlatform(ctx, x, y, w, h, color),
        'CHAIR': () => drawChair(ctx, x, y, w, h, color, floorY),
        'GARDEN_CHAIR': () => drawChair(ctx, x, y, w, h, color, floorY),
        'LAMP': () => drawLampPlatform(ctx, x, y, w, h),
        // Kitchen
        'COUNTER': () => drawCounter(ctx, x, y, w, h, color, floorY),
        'DRAWER': () => drawDrawer(ctx, x, y, w, h, color),
        'FRIDGE': () => drawFridge(ctx, x, y, w, h, floorY),
        'HANGING_POT': () => drawHangingPot(ctx, x, y, w, h),
        'STOOL': () => drawStool(ctx, x, y, w, h, color, floorY),
        // Bathroom
        'BATHTUB': () => drawBathtub(ctx, x, y, w, h, floorY),
        'TOILET': () => drawToilet(ctx, x, y, w, h, floorY),
        'SINK': () => drawSink(ctx, x, y, w, h),
        'TOWEL_RACK': () => drawTowelRack(ctx, x, y, w, h),
        // Kids
        'BUNK_BED': () => drawBunkBed(ctx, x, y, w, h, color, floorY),
        'TOY_CHEST': () => drawToyChest(ctx, x, y, w, h, color, floorY),
        'DESK': () => drawTable(ctx, x, y, w, h, color, floorY),
        'BOARD_GAMES': () => drawBoardGames(ctx, x, y, w, h),
        // Parents
        'BED': () => drawBed(ctx, x, y, w, h, color, floorY),
        'BEDSIDE_TABLE': () => drawTable(ctx, x, y, w, h, color, floorY),
        'DRESSER': () => drawDresser(ctx, x, y, w, h, color, floorY),
        'LAUNDRY_BASKET': () => drawLaundryBasket(ctx, x, y, w, h, floorY),
        'WARDROBE': () => drawWardrobe(ctx, x, y, w, h, floorY),
        // Terrace
        'PLANT_POT': () => drawPlantPot(ctx, x, y, w, h, color, floorY),
        'RAILING': () => drawRailing(ctx, x, y, w, h),
        'CLOTHESLINE': () => drawClothesline(ctx, x, y, w, h),
        'BBQ_SHELF': () => drawShelf(ctx, x, y, w, h, color),
    };

    if (FURNITURE[label]) {
        FURNITURE[label]();
    } else {
        // Generic platform
        const gradient = ctx.createLinearGradient(x, y, x, y + h);
        gradient.addColorStop(0, lighten(color, 20));
        gradient.addColorStop(1, darken(color, 20));
        ctx.fillStyle = gradient;
        roundRect(ctx, x, y, w, h, 3);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(x + 2, y, w - 4, 3);
    }

    ctx.restore();
}

// Draw only the walkable surface ledge (no furniture body)
export function drawPlatformSurface(ctx, x, y, w, h, label, color) {
    if (!label) {
        // Ground platforms always draw fully (they are the floor)
        const theme = getTheme();
        ctx.fillStyle = color || theme.floor.base;
        ctx.fillRect(x, y, w, h);
        ctx.strokeStyle = theme.floor.grout;
        ctx.lineWidth = 1;
        for (let i = 0; i < w; i += 40) {
            ctx.beginPath(); ctx.moveTo(x + i, y); ctx.lineTo(x + i, y + h); ctx.stroke();
        }
        for (let j = 0; j < h; j += 20) {
            ctx.beginPath(); ctx.moveTo(x, y + j); ctx.lineTo(x + w, y + j); ctx.stroke();
        }
        ctx.fillStyle = theme.floor.tile;
        ctx.fillRect(x, y, w, 3);
        return;
    }
    ctx.save();
    const theme = getTheme();
    // Thin surface bar with subtle depth (solid fills instead of gradient for performance)
    const surfaceH = Math.min(h, 6);
    const baseColor = color || theme.wood.base;
    ctx.fillStyle = baseColor;
    roundRect(ctx, x, y, w, surfaceH, 2);
    // Top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x + 2, y, w - 4, 2);
    // Bottom shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(x, y + surfaceH - 1, w, 1);
    ctx.restore();
}
