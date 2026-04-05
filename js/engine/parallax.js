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
    constructor() {
        this._cache = {};       // levelName -> array of { canvas, lastOffset }
        this._currentLevel = null;
        this._threshold = 3;    // pixels of camera-space movement before redraw
    }

    invalidate() {
        this._cache = {};
        this._currentLevel = null;
    }

    render(ctx, cameraX, canvasW, canvasH, levelName, levelColor) {
        const layers = PARALLAX_LAYERS[levelName];
        if (!layers) return;

        // Invalidate cache on level change
        if (this._currentLevel !== levelName) {
            this._currentLevel = levelName;
            this._cache[levelName] = null;
        }

        // Lazy-init offscreen canvases per layer
        if (!this._cache[levelName]) {
            this._cache[levelName] = layers.map(() => ({
                canvas: null,
                lastOffset: -Infinity,
            }));
        }
        const entries = this._cache[levelName];

        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            const offset = cameraX * layer.speed;
            const entry = entries[i];

            // Only re-render if offset changed enough
            if (!entry.canvas || Math.abs(offset - entry.lastOffset) > this._threshold) {
                if (!entry.canvas) {
                    entry.canvas = document.createElement('canvas');
                    entry.canvas.width = canvasW;
                    entry.canvas.height = canvasH;
                }
                const offCtx = entry.canvas.getContext('2d');
                offCtx.clearRect(0, 0, canvasW, canvasH);
                offCtx.save();
                layer.draw(offCtx, offset, canvasW, canvasH, levelColor);
                offCtx.restore();
                entry.lastOffset = offset;
            }

            ctx.drawImage(entry.canvas, 0, 0);
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
