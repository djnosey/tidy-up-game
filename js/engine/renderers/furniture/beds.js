// Bed furniture: bed, bunk bed
import { roundRect, lighten, darken } from '../shared.js';
import { getTheme, drawWoodGrain, drawFabricTexture, drawFurnitureShadow, drawAmbientOcclusion, drawTopHighlight } from '../level-themes.js';

export function drawBed(ctx, x, y, w, h, color, floorY) {
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
    drawTopHighlight(ctx, x, y, w);
    drawAmbientOcclusion(ctx, x, floorY, w);
}

export function drawBunkBed(ctx, x, y, w, h, color, floorY) {
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
