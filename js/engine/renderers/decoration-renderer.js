// Decoration drawing — thin router dispatching to per-category modules
import { drawEmojiScaled } from './shared.js';

import { drawWindow, drawCurtain } from './decorations/windows.js';
import {
    drawRug, drawWallArt, drawFamilyPhoto, drawStandingLamp,
    drawCeilingLight, drawWallShelfDeco, drawScatteredCrayons,
    drawPaperAirplane, drawDustBunny
} from './decorations/furnishings.js';
import {
    drawRadiator, drawPowerStrip, drawDadoRail, drawCornice,
    drawSkirting, drawWallSocket, drawDoorway, drawDustMotes,
    drawSteamWisps, drawWaterPuddle, drawFloatingBubbles,
    drawGrassTuft, drawButterfly, drawDrippingTap
} from './decorations/features.js';

export function drawDecoration(ctx, dec, cameraX, cameraY = 0) {
    ctx.save();
    const sx = dec.x - cameraX;
    const y = dec.y - cameraY;

    if (dec.emoji) {
        drawEmojiScaled(ctx, dec.emoji, sx, y, dec.size);

    } else if (dec.type === 'rug') {
        drawRug(ctx, dec, sx, y);

    } else if (dec.type === 'curtain') {
        drawCurtain(ctx, dec, sx, y);

    } else if (dec.type === 'window') {
        drawWindow(ctx, dec, sx, y);

    } else if (dec.type === 'ceiling_light') {
        drawCeilingLight(ctx, dec, sx, y);

    } else if (dec.type === 'wall_art') {
        drawWallArt(ctx, dec, sx, y);

    } else if (dec.type === 'family_photo') {
        drawFamilyPhoto(ctx, dec, sx, y);

    } else if (dec.type === 'standing_lamp') {
        drawStandingLamp(ctx, dec, sx, y, cameraY);

    } else if (dec.type === 'radiator') {
        drawRadiator(ctx, dec, sx, y);

    } else if (dec.type === 'power_strip') {
        drawPowerStrip(ctx, dec, sx, y);

    } else if (dec.type === 'wall_shelf_deco') {
        drawWallShelfDeco(ctx, dec, sx, y);

    } else if (dec.type === 'dado_rail') {
        drawDadoRail(ctx, dec, sx, y);

    } else if (dec.type === 'cornice') {
        drawCornice(ctx, dec, sx, y);

    } else if (dec.type === 'skirting') {
        drawSkirting(ctx, dec, sx, y);

    } else if (dec.type === 'wall_socket') {
        drawWallSocket(ctx, dec, sx, y);

    } else if (dec.type === 'doorway') {
        drawDoorway(ctx, dec, sx, y);

    } else if (dec.type === 'dust_motes') {
        drawDustMotes(ctx, dec, sx, y);

    } else if (dec.type === 'steam_wisps') {
        drawSteamWisps(ctx, dec, sx, y);

    } else if (dec.type === 'water_puddle') {
        drawWaterPuddle(ctx, dec, sx, y);

    } else if (dec.type === 'floating_bubbles') {
        drawFloatingBubbles(ctx, dec, sx, y);

    } else if (dec.type === 'scattered_crayons') {
        drawScatteredCrayons(ctx, dec, sx, y);

    } else if (dec.type === 'paper_airplane') {
        drawPaperAirplane(ctx, dec, sx, y);

    } else if (dec.type === 'dust_bunny') {
        drawDustBunny(ctx, dec, sx, y);

    } else if (dec.type === 'grass_tuft') {
        drawGrassTuft(ctx, dec, sx, y);

    } else if (dec.type === 'butterfly') {
        drawButterfly(ctx, dec, sx, y);

    } else if (dec.type === 'dripping_tap') {
        drawDrippingTap(ctx, dec, sx, y);
    }

    ctx.restore();
}
