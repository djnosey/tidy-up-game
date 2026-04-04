// Multi-layered parallax backgrounds — 3 procedural layers per level
// Each layer uses ONE wide repeat unit (~1800px = 2 screens) for maximum variety
// Vertical zones: FAR=full wall, MID=wall-mounted (y:3-72%), NEAR=floor (y:ground level)
import { livingRoomLayers } from './parallax-layers/living-room.js';
import { kitchenLayers } from './parallax-layers/kitchen.js';
import { bathroomLayers } from './parallax-layers/bathroom.js';
import { kidsRoomLayers } from './parallax-layers/kids-room.js';
import { parentsRoomLayers } from './parallax-layers/parents-room.js';
import { terraceLayers } from './parallax-layers/terrace.js';

export class ParallaxRenderer {
    render(ctx, cameraX, canvasW, canvasH, levelName, levelColor) {
        const layers = PARALLAX_LAYERS[levelName];
        if (!layers) return;
        for (const layer of layers) {
            const offset = cameraX * layer.speed;
            ctx.save();
            layer.draw(ctx, offset, canvasW, canvasH, levelColor);
            ctx.restore();
        }
    }
}

const PARALLAX_LAYERS = {
    'Living Room': livingRoomLayers,
    'Kitchen': kitchenLayers,
    'Bathroom': bathroomLayers,
    "Kids' Room": kidsRoomLayers,
    "Parents' Room": parentsRoomLayers,
    'Terrace': terraceLayers,
};
