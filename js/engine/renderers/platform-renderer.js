// Platform and furniture drawing
import { roundRect, lighten, darken } from './shared.js';
import { getTheme, drawWoodGrain, drawFabricTexture, drawMetalSurface, drawCeramicSurface, drawFurnitureShadow, drawLegs } from './level-themes.js';
import { getImage } from '../asset-loader.js';
import { PLATFORM_SPRITES } from '../sprite-manifest.js';

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

function drawSofa(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const sofaColor = color || theme.upholstery.sofa;
    const legH = floorY - (y + h);
    const seatTop = y;

    // Shadow on floor
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 5, 5);

    // Legs
    drawLegs(ctx, x, w, y + h, floorY, w > 150 ? 3 : 2);

    // Back rest
    ctx.fillStyle = darken(sofaColor, 15);
    roundRect(ctx, x + 6, seatTop - 28, w - 12, 30, 6);

    // Seat body
    drawFabricTexture(ctx, x, seatTop, w, h, sofaColor);
    roundRect(ctx, x, seatTop, w, h, 5);

    // Cushion divisions
    const cushions = Math.max(2, Math.floor(w / 65));
    const cw = (w - 10) / cushions;
    for (let i = 0; i < cushions; i++) {
        ctx.fillStyle = i % 2 === 0 ? lighten(sofaColor, 15) : darken(sofaColor, 5);
        roundRect(ctx, x + 5 + i * cw, seatTop + 3, cw - 2, h - 6, 4);
    }

    // Armrests
    ctx.fillStyle = darken(sofaColor, 25);
    const armH = h + 12;
    roundRect(ctx, x - 8, seatTop - 10, 14, armH, 5);
    roundRect(ctx, x + w - 6, seatTop - 10, 14, armH, 5);

    // Highlight on seat
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(x + 10, seatTop + 2, w - 20, 2);
}

function drawArmchair(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const chairColor = color || theme.upholstery.armchair;
    const legH = floorY - (y + h);

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 3, 4);

    drawLegs(ctx, x, w, y + h, floorY, 2);

    ctx.fillStyle = darken(chairColor, 15);
    roundRect(ctx, x + 14, y - 30, w - 28, 34, 6);
    drawFabricTexture(ctx, x, y, w, h, chairColor);
    roundRect(ctx, x, y, w, h, 5);
    ctx.fillStyle = lighten(chairColor, 14);
    roundRect(ctx, x + 12, y + 3, w - 24, h - 6, 5);
    ctx.fillStyle = darken(chairColor, 25);
    const armH = h + 15;
    roundRect(ctx, x - 6, y - 14, 18, armH, 6);
    roundRect(ctx, x + w - 12, y - 14, 18, armH, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(x + 16, y + 2, w - 32, 2);
}

function drawTable(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const tableColor = color || theme.wood.base;
    const legH = floorY - (y + h);

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);

    ctx.fillStyle = theme.wood.dark;
    if (legH > 2) {
        ctx.fillRect(x + 6, y + h, 4, legH);
        ctx.fillRect(x + w - 10, y + h, 4, legH);
        const barY = y + h + legH * 0.6;
        ctx.fillRect(x + 10, barY, w - 20, 3);
    }

    // Table top with wood grain
    drawWoodGrain(ctx, x - 5, y, w + 10, h);
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(x - 3, y, w + 6, 2);
}

function drawTVUnit(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    const cabinetH = 35;

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);

    ctx.fillStyle = theme.wood.dark;
    if (legH > 2) {
        ctx.fillRect(x + 8, y + h, 5, legH);
        ctx.fillRect(x + w - 13, y + h, 5, legH);
    }

    ctx.fillStyle = '#2F2F2F';
    const cabTop = y;
    roundRect(ctx, x, cabTop, w, Math.min(cabinetH, legH + h), 3);

    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    if (cabinetH > 15) {
        ctx.beginPath();
        ctx.moveTo(x + 5, cabTop + 15);
        ctx.lineTo(x + w - 5, cabTop + 15);
        ctx.stroke();
    }
    drawMetalSurface(ctx, x + w / 2 - 10, cabTop + 6, 20, 3);
    if (cabinetH > 20) drawMetalSurface(ctx, x + w / 2 - 10, cabTop + 22, 20, 3);

    ctx.font = `${Math.min(w * 0.35, 55)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillText('📺', x + w / 2, y - 3);

    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(x + 2, y, w - 4, 2);
}

function drawShelf(ctx, x, y, w, h, color) {
    const theme = getTheme();
    // Use wood grain for shelf surface
    drawWoodGrain(ctx, x, y, w, h);
    // Brackets
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(x + 5, y + h, 4, 10);
    ctx.fillRect(x + w - 9, y + h, 4, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.fillRect(x, y, w, 2);
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(x, y + h - 1, w, 1);
}

function drawBookShelf(ctx, x, y, w, h) {
    const theme = getTheme();
    // Shelf board in themed wood
    drawWoodGrain(ctx, x, y, w, h);
    const bookColors = ['#8B0000', '#006400', '#00008B', '#8B8000', '#4B0082', '#8B4513'];
    const bookW = 8;
    let bx = x + 3;
    let colorIdx = 0;
    while (bx + bookW < x + w - 3) {
        const bh = 12 + Math.sin(colorIdx * 2.3) * 4;
        ctx.fillStyle = bookColors[colorIdx % bookColors.length];
        ctx.fillRect(bx, y - bh, bookW - 1, bh);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(bx + bookW / 2 - 0.5, y - bh + 2, 1, bh - 4);
        bx += bookW;
        colorIdx++;
    }
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(x, y, w, 2);
}

function drawPictureFrame(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.fillStyle = theme.wood.light;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(x + 3, y + 3, w - 6, (h - 6) * 0.5);
    ctx.fillStyle = '#228B22';
    ctx.fillRect(x + 3, y + 3 + (h - 6) * 0.5, w - 6, (h - 6) * 0.5);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x, y, w, 2);
    ctx.fillRect(x, y, 2, h);
}

function drawCushionPlatform(ctx, x, y, w, h, color) {
    const theme = getTheme();
    const cushionColor = color || theme.upholstery.cushion;
    drawFabricTexture(ctx, x, y, w, h, cushionColor);
    roundRect(ctx, x, y, w, h, 8);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(x + 5, y + 3, w - 10, h - 6);
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    roundRect(ctx, x + 4, y + 2, w - 8, h * 0.4, 4);
}

function drawChair(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const chairColor = color || theme.wood.base;
    const legH = floorY - (y + h);

    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 3);

    ctx.fillStyle = theme.wood.dark;
    const backTopY = y - 28;
    ctx.fillRect(x + 4, backTopY, 4, (y + h) - backTopY + legH);
    ctx.fillRect(x + w - 8, backTopY, 4, (y + h) - backTopY + legH);

    ctx.fillRect(x + 1, y + h, 4, legH);
    ctx.fillRect(x + w - 5, y + h, 4, legH);

    ctx.fillStyle = darken(chairColor, 10);
    roundRect(ctx, x + 2, backTopY, w - 4, 8, 3);
    ctx.fillStyle = darken(chairColor, 18);
    const slats = Math.max(2, Math.floor(w / 20));
    for (let i = 1; i < slats; i++) {
        const sx = x + (w / slats) * i - 1.5;
        ctx.fillRect(sx, backTopY + 8, 3, y - backTopY - 8);
    }

    // Seat with wood grain
    drawWoodGrain(ctx, x - 3, y, w + 6, h);
    ctx.fillStyle = 'rgba(255,255,255,0.15)';
    ctx.fillRect(x - 1, y, w + 2, 2);
}

function drawLampPlatform(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.fillStyle = '#DAA520';
    ctx.beginPath();
    ctx.moveTo(x + 5, y);
    ctx.lineTo(x + w - 5, y);
    ctx.lineTo(x + w + 5, y + h * 0.6);
    ctx.lineTo(x - 5, y + h * 0.6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'rgba(255, 220, 100, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h * 0.7, w * 0.8, h * 0.5, 0, 0, Math.PI * 2);
    ctx.fill();
    // Metal pole
    drawMetalSurface(ctx, x + w / 2 - 2, y + h * 0.6, 4, h * 0.4);
}

function drawCounter(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const counterColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    ctx.fillStyle = darken(counterColor, 10);
    if (legH > 0) roundRect(ctx, x + 2, y + h, w - 4, Math.min(legH, 40), 2);
    // Countertop surface — ceramic/stone
    drawCeramicSurface(ctx, x - 4, y, w + 8, h);
    ctx.strokeStyle = theme.floor.grout;
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 20) { ctx.beginPath(); ctx.moveTo(x+2+i, y+h); ctx.lineTo(x+2+i, y+h+40); ctx.stroke(); }
}

function drawDrawer(ctx, x, y, w, h, color) {
    const theme = getTheme();
    const drawerColor = color || theme.wood.base;
    ctx.fillStyle = drawerColor; roundRect(ctx, x, y, w, h + 15, 2);
    ctx.fillStyle = lighten(drawerColor, 15); ctx.fillRect(x + 2, y + 2, w - 4, h - 2);
    // Metal handle
    drawMetalSurface(ctx, x + w/2 - 8, y + h + 4, 16, 4);
    ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(x + 2, y, w - 4, 2);
}

function drawFridge(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    // Fridge body — metal surface
    drawMetalSurface(ctx, x, y, w, Math.min(h + legH, 80));
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + w/2, y + 3); ctx.lineTo(x + w/2, y + 60); ctx.stroke();
    // Metal handle
    drawMetalSurface(ctx, x + w/2 + 4, y + 12, 3, 20);
    ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🧲', x + 15, y + 25); ctx.fillText('📝', x + w - 15, y + 20);
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(x + 2, y, w - 4, 2);
}

function drawHangingPot(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x + w/2, 0); ctx.lineTo(x + w/2, y); ctx.stroke();
    ctx.fillStyle = theme.metal.base; ctx.beginPath();
    ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = theme.metal.light; ctx.beginPath();
    ctx.ellipse(x + w/2, y + 2, w/2, h/4, 0, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x + w/2, y - 4, w/3, Math.PI, 0); ctx.stroke();
}

function drawStool(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const stoolColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(x + 4, y + h, 3, legH); ctx.fillRect(x + w - 7, y + h, 3, legH);
    if (legH > 15) ctx.fillRect(x + 7, y + h + legH * 0.6, w - 14, 3);
    ctx.fillStyle = stoolColor; roundRect(ctx, x - 2, y, w + 4, h, 10);
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(x, y, w, 2);
}

function drawBathtub(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 5, 4);
    // Ceramic feet
    ctx.fillStyle = theme.metal.base;
    if (legH > 4) { ctx.beginPath(); ctx.arc(x+8, floorY-2, 5, 0, Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.arc(x+w-8, floorY-2, 5, 0, Math.PI*2); ctx.fill(); }
    // Tub body — ceramic
    drawCeramicSurface(ctx, x, y, w, h + Math.min(legH, 30));
    // Inner basin
    ctx.fillStyle = '#E8F4F8'; roundRect(ctx, x + 4, y + 4, w - 8, h - 2, 4);
    ctx.fillStyle = theme.ceramic.light; ctx.fillRect(x + 2, y, w - 4, 3);
    // Faucet knobs — metal
    drawMetalSurface(ctx, x + 10, y - 10, 10, 10);
    drawMetalSurface(ctx, x + 25, y - 10, 10, 10);
}

function drawToilet(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    // Pedestal — ceramic
    if (legH > 0) drawCeramicSurface(ctx, x + 5, y + h, w - 10, Math.min(legH, 25));
    // Bowl — ceramic
    drawCeramicSurface(ctx, x, y, w, h);
    ctx.fillStyle = theme.ceramic.dark; roundRect(ctx, x + 3, y + 2, w - 6, h - 4, 6);
    // Tank — ceramic
    drawCeramicSurface(ctx, x + w*0.15, y - 18, w*0.7, 20);
    // Flush handle — metal
    drawMetalSurface(ctx, x + w*0.7, y - 14, 8, 3);
}

function drawSink(ctx, x, y, w, h) {
    const theme = getTheme();
    // Basin — ceramic
    drawCeramicSurface(ctx, x, y, w, h + 10);
    ctx.fillStyle = '#E0E8F0'; roundRect(ctx, x + 4, y + 3, w - 8, h, 3);
    // Drain pipes — metal
    drawMetalSurface(ctx, x + 5, y + h + 10, 4, 8);
    drawMetalSurface(ctx, x + w - 9, y + h + 10, 4, 8);
    // Faucet knobs — metal
    ctx.fillStyle = theme.metal.base;
    ctx.beginPath(); ctx.arc(x + w/2 - 8, y - 3, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w/2 + 8, y - 3, 4, 0, Math.PI*2); ctx.fill();
}

function drawTowelRack(ctx, x, y, w, h) {
    const theme = getTheme();
    // Rack bar — metal
    drawMetalSurface(ctx, x, y + h/2 - 2, w, 4);
    ctx.fillStyle = theme.metal.base;
    ctx.fillRect(x + 3, y, 4, h/2); ctx.fillRect(x + w - 7, y, 4, h/2);
    // Towel — fabric
    drawFabricTexture(ctx, x + 8, y + h/2 + 2, w - 16, h/2 - 2, theme.fabric.base);
}

function drawBunkBed(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const frameColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    // Frame posts — wood
    ctx.fillStyle = theme.wood.dark;
    ctx.fillRect(x, y - 30, 5, h + legH + 30); ctx.fillRect(x + w - 5, y - 30, 5, h + legH + 30);
    // Guard rail
    ctx.fillStyle = theme.wood.grain;
    ctx.fillRect(x + 5, y - 28, w - 10, 4);
    ctx.fillRect(x + w/3, y - 24, 3, 12); ctx.fillRect(x + w*2/3, y - 24, 3, 12);
    // Mattress base
    ctx.fillStyle = theme.ceramic.base; roundRect(ctx, x + 5, y, w - 10, h, 3);
    // Bedding — upholstery
    ctx.fillStyle = color || theme.upholstery.cushion; roundRect(ctx, x + 7, y + 2, w - 14, h - 4, 2);
    // Pillow
    ctx.fillStyle = '#FFF'; roundRect(ctx, x + 8, y + 3, 20, h - 6, 4);
}

function drawToyChest(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const chestColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 3);
    // Chest body — wood
    drawWoodGrain(ctx, x, y, w, h + Math.min(legH, 25));
    // Lid
    ctx.fillStyle = lighten(chestColor, 15);
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w - 5, y - 15); ctx.lineTo(x + 5, y - 15); ctx.fill();
    ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('🧸', x + 12, y - 2); ctx.fillText('🚗', x + w - 12, y - 2);
    ctx.fillStyle = 'rgba(255,255,255,0.15)'; ctx.fillRect(x + 2, y, w - 4, 2);
}

function drawBoardGames(ctx, x, y, w, h) {
    const colors = ['#CC3333', '#3333CC', '#33CC33', '#CCCC33'];
    const boxH = h / 3;
    for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i]; roundRect(ctx, x + i*2, y + i*boxH, w - i*4, boxH + 1, 2);
        ctx.fillStyle = 'rgba(255,255,255,0.2)'; ctx.fillRect(x + i*2 + 2, y + i*boxH, w - i*4 - 4, 2);
    }
}

function drawBed(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const bedColor = color || theme.upholstery.sofa;
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 5, 5);
    // Legs — wood
    ctx.fillStyle = theme.wood.dark;
    if (legH > 2) { ctx.fillRect(x+8, y+h, 6, legH); ctx.fillRect(x+w-14, y+h, 6, legH); }
    // Headboard — wood
    ctx.fillStyle = theme.wood.base; roundRect(ctx, x, y - 30, 8, 34, 3);
    // Footboard — wood
    ctx.fillStyle = theme.wood.base; roundRect(ctx, x + w - 8, y - 15, 8, 19, 3);
    // Mattress base
    ctx.fillStyle = theme.ceramic.base; roundRect(ctx, x + 2, y, w - 4, h, 4);
    // Bedding — upholstery/fabric
    drawFabricTexture(ctx, x + 4, y + 2, w - 8, h - 4, bedColor);
    // Pillow
    ctx.fillStyle = '#FFFFF0'; roundRect(ctx, x + 6, y + 3, w*0.2, h - 6, 5);
    ctx.fillStyle = 'rgba(255,200,0,0.3)'; ctx.font = '9px monospace'; ctx.textAlign = 'center';
    ctx.fillText('↕ BOUNCY', x + w/2, y - 5);
}

function drawDresser(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const dresserColor = color || theme.wood.base;
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 4);
    // Legs
    drawLegs(ctx, x, w, y + h, floorY, 2);
    // Dresser body — wood grain
    drawWoodGrain(ctx, x, y, w, h + Math.min(legH-5, 35));
    ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 1;
    const drawers = 3; const dh = Math.min(legH-5, 35) + h;
    for (let i = 1; i < drawers; i++) { ctx.beginPath(); ctx.moveTo(x+3, y + (dh/drawers)*i); ctx.lineTo(x+w-3, y + (dh/drawers)*i); ctx.stroke(); }
    // Drawer handles — metal
    for (let i = 0; i < drawers; i++) drawMetalSurface(ctx, x+w/2-6, y + (dh/drawers)*i + dh/drawers/2 - 2, 12, 3);
    // Mirror
    ctx.fillStyle = '#C0D0E0'; roundRect(ctx, x + w/2 - 12, y - 20, 24, 18, 3);
    ctx.strokeStyle = theme.metal.dark; ctx.lineWidth = 1; ctx.strokeRect(x + w/2 - 12, y - 20, 24, 18);
}

function drawLaundryBasket(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2, 3);
    ctx.fillStyle = theme.fabric.base; roundRect(ctx, x, y, w, h + Math.min(legH, 30), 4);
    ctx.strokeStyle = 'rgba(0,0,0,0.08)'; ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 6) { ctx.beginPath(); ctx.moveTo(x+i, y); ctx.lineTo(x+i, y+h+20); ctx.stroke(); }
    ctx.font = '10px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('👔', x + w/2, y - 2);
}

function drawWardrobe(ctx, x, y, w, h, floorY) {
    const theme = getTheme();
    const legH = floorY - (y + h);
    drawFurnitureShadow(ctx, x + w / 2, floorY, w / 2 + 3, 4);
    // Wardrobe body — wood
    drawWoodGrain(ctx, x, y - 40, w, h + legH + 40);
    // Center divider
    ctx.strokeStyle = theme.wood.dark; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x + w/2, y - 37); ctx.lineTo(x + w/2, y + h + legH - 3); ctx.stroke();
    // Door handles — metal
    ctx.fillStyle = theme.metal.base;
    ctx.beginPath(); ctx.arc(x + w/2 - 8, y + 10, 3, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x + w/2 + 8, y + 10, 3, 0, Math.PI*2); ctx.fill();
    // Crown molding — wood dark
    ctx.fillStyle = theme.wood.dark; ctx.fillRect(x - 3, y - 43, w + 6, 6);
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(x, y - 43, w, 2);
}

function drawPlantPot(ctx, x, y, w, h, color, floorY) {
    const theme = getTheme();
    const potColor = color || (theme.plant ? theme.plant.pot : theme.ceramic.dark);
    const legH = floorY - (y + h);
    ctx.fillStyle = potColor;
    ctx.beginPath();
    ctx.moveTo(x + 4, y); ctx.lineTo(x + w - 4, y);
    ctx.lineTo(x + w + 2, y + h + Math.min(legH, 20));
    ctx.lineTo(x - 2, y + h + Math.min(legH, 20));
    ctx.fill();
    ctx.fillStyle = darken(potColor, 15); ctx.fillRect(x + 2, y, w - 4, 4);
    ctx.font = `${Math.min(w, 24)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
    ctx.fillText('🌿', x + w/2, y - 1);
}

function drawRailing(ctx, x, y, w, h) {
    const theme = getTheme();
    // Rail bar — metal
    drawMetalSurface(ctx, x, y, w, 4);
    ctx.fillStyle = theme.metal.dark;
    for (let i = 0; i < w; i += 12) { ctx.fillRect(x + i + 4, y + 4, 3, 40); }
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fillRect(x, y, w, 2);
}

function drawClothesline(ctx, x, y, w, h) {
    const theme = getTheme();
    ctx.strokeStyle = theme.fabric.dark; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(x, y + h/2);
    ctx.quadraticCurveTo(x + w/2, y + h/2 + 6, x + w, y + h/2);
    ctx.stroke();
    const items = ['👕', '🩳', '🧦', '👔'];
    const gap = w / (items.length + 1);
    ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    for (let i = 0; i < items.length; i++) {
        const ix = x + gap * (i + 1);
        ctx.fillText(items[i], ix, y + h/2 + 16);
        ctx.fillStyle = theme.fabric.accent; ctx.fillRect(ix - 2, y + h/2 - 2, 4, 6);
    }
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
    // Thin surface bar with subtle depth
    const surfaceH = Math.min(h, 6);
    const baseColor = color || theme.wood.base;
    const grad = ctx.createLinearGradient(x, y, x, y + surfaceH);
    grad.addColorStop(0, lighten(baseColor, 25));
    grad.addColorStop(0.4, baseColor);
    grad.addColorStop(1, darken(baseColor, 20));
    ctx.fillStyle = grad;
    roundRect(ctx, x, y, w, surfaceH, 2);
    // Top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(x + 2, y, w - 4, 1);
    // Bottom shadow
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(x, y + surfaceH - 1, w, 1);
    ctx.restore();
}
