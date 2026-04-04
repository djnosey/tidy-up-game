// Unified color palettes per level — ensures visual coherence across all objects
// Every renderer should pull from the active theme instead of hardcoding colors

export const LEVEL_THEMES = {
    1: { // Living Room — warm, cozy Mediterranean
        name: 'living',
        wood:        { base: '#8B6B4A', dark: '#6B4B2A', light: '#A88B6A', grain: '#7A5A3A' },
        fabric:      { base: '#7B6B8A', dark: '#5B4B6A', light: '#9B8BAA', accent: '#A08090' },
        metal:       { base: '#888', dark: '#666', light: '#AAA', shine: 'rgba(255,255,255,0.25)' },
        ceramic:     { base: '#F5F0E8', dark: '#E0D8CC', light: '#FFFFF0', glaze: 'rgba(255,255,255,0.3)' },
        wall:        { base: '#D4C4A8', trim: '#C4A882', accent: '#B09878' },
        floor:       { base: '#B89878', tile: '#A88868', grout: 'rgba(0,0,0,0.08)' },
        upholstery:  { sofa: '#8B7355', cushion: '#9B8365', armchair: '#7B6345' },
        curtain:     { base: '#8B6B5B', tieback: '#6B4B3B', rod: '#8B7355' },
        glass:       { base: 'rgba(200,220,240,0.3)', shine: 'rgba(255,255,255,0.4)' },
        accent1: '#CC8844', accent2: '#668866', accent3: '#996644',
    },
    2: { // Kitchen — clean, bright, Mediterranean tiles
        name: 'kitchen',
        wood:        { base: '#9B8060', dark: '#7B6040', light: '#BB9A7A', grain: '#8A7050' },
        fabric:      { base: '#6B8B6B', dark: '#4B6B4B', light: '#8BAB8B', accent: '#7B9B7B' },
        metal:       { base: '#A0A0A0', dark: '#808080', light: '#C0C0C0', shine: 'rgba(255,255,255,0.3)' },
        ceramic:     { base: '#F0EDE8', dark: '#D8D4CC', light: '#FAFAF5', glaze: 'rgba(255,255,255,0.35)' },
        wall:        { base: '#F0E8D8', trim: '#D4C8B0', accent: '#C8B898' },
        floor:       { base: '#C8B898', tile: '#B8A888', grout: 'rgba(0,0,0,0.06)' },
        upholstery:  { sofa: '#6B8B6B', cushion: '#7B9B7B', armchair: '#5B7B5B' },
        curtain:     { base: '#A0C0A0', tieback: '#80A080', rod: '#8B7355' },
        glass:       { base: 'rgba(200,230,220,0.3)', shine: 'rgba(255,255,255,0.4)' },
        appliance:   { base: '#E8E4E0', dark: '#D0CCC8', light: '#F5F2F0', chrome: '#CCC' },
        accent1: '#CC6633', accent2: '#669966', accent3: '#CC9933',
    },
    3: { // Bathroom — cool, clean, spa-like
        name: 'bathroom',
        wood:        { base: '#A89888', dark: '#887868', light: '#C8B8A8', grain: '#988878' },
        fabric:      { base: '#88AABB', dark: '#6888AA', light: '#A8CCDD', accent: '#99BBCC' },
        metal:       { base: '#B0B0B0', dark: '#909090', light: '#D0D0D0', shine: 'rgba(255,255,255,0.35)' },
        ceramic:     { base: '#F5F5F5', dark: '#E8E8E8', light: '#FFFFFF', glaze: 'rgba(255,255,255,0.4)' },
        wall:        { base: '#E8F0F0', trim: '#D0E0E0', accent: '#C0D8D8' },
        floor:       { base: '#D0DDE0', tile: '#C0CDD0', grout: 'rgba(0,0,0,0.05)' },
        upholstery:  { sofa: '#88AABB', cushion: '#99BBCC', armchair: '#7799AA' },
        curtain:     { base: '#C0D8E0', tieback: '#A0B8C0', rod: '#B0B0B0' },
        glass:       { base: 'rgba(200,230,245,0.4)', shine: 'rgba(255,255,255,0.5)' },
        water:       { base: 'rgba(160,210,230,0.3)', deep: 'rgba(120,180,210,0.4)', foam: '#F0F8FF' },
        accent1: '#5599AA', accent2: '#77BBAA', accent3: '#88AACC',
    },
    4: { // Kids' Room — bright, fun, colorful
        name: 'kids',
        wood:        { base: '#C4A870', dark: '#A48850', light: '#E4C890', grain: '#B49860' },
        fabric:      { base: '#DD6666', dark: '#BB4444', light: '#FF8888', accent: '#EE7777' },
        metal:       { base: '#88AACC', dark: '#6688AA', light: '#AACCEE', shine: 'rgba(255,255,255,0.3)' },
        ceramic:     { base: '#FFF8F0', dark: '#F0E8E0', light: '#FFFEFA', glaze: 'rgba(255,255,255,0.3)' },
        wall:        { base: '#F5E8D0', trim: '#E0D0B8', accent: '#D4C0A8' },
        floor:       { base: '#D4C0A8', tile: '#C4B098', grout: 'rgba(0,0,0,0.06)' },
        upholstery:  { sofa: '#DD6666', cushion: '#EE7777', armchair: '#CC5555' },
        curtain:     { base: '#FF8866', tieback: '#DD6644', rod: '#C4A870' },
        glass:       { base: 'rgba(220,240,255,0.3)', shine: 'rgba(255,255,255,0.4)' },
        toy:         { red: '#DD3333', blue: '#3366DD', green: '#33AA33', yellow: '#DDAA22', purple: '#CC44CC' },
        accent1: '#FF6644', accent2: '#44AADD', accent3: '#AACC44',
    },
    5: { // Parents' Room — elegant, muted, sophisticated
        name: 'parents',
        wood:        { base: '#5A4A3A', dark: '#3A2A1A', light: '#7A6A5A', grain: '#4A3A2A' },
        fabric:      { base: '#6B5B8B', dark: '#4B3B6B', light: '#8B7BAB', accent: '#7B6B9B' },
        metal:       { base: '#999', dark: '#777', light: '#BBB', shine: 'rgba(255,255,255,0.25)' },
        ceramic:     { base: '#F0ECE8', dark: '#E0DCD8', light: '#FAF8F5', glaze: 'rgba(255,255,255,0.3)' },
        wall:        { base: '#E8E0D8', trim: '#D0C8C0', accent: '#C0B8B0' },
        floor:       { base: '#C0B098', tile: '#B0A088', grout: 'rgba(0,0,0,0.06)' },
        upholstery:  { sofa: '#6B5B8B', cushion: '#7B6B9B', armchair: '#5B4B7B' },
        curtain:     { base: '#5B4B6B', tieback: '#3B2B4B', rod: '#888' },
        glass:       { base: 'rgba(210,200,230,0.3)', shine: 'rgba(255,255,255,0.35)' },
        accent1: '#8B6B8B', accent2: '#6B8B8B', accent3: '#8B8B6B',
    },
    6: { // Terrace — bright outdoor Mediterranean
        name: 'terrace',
        wood:        { base: '#8B7355', dark: '#6B5335', light: '#AB9375', grain: '#7B6345' },
        fabric:      { base: '#CC8844', dark: '#AA6622', light: '#EEAA66', accent: '#DDAA55' },
        metal:       { base: '#555', dark: '#333', light: '#777', shine: 'rgba(255,255,255,0.2)' },
        ceramic:     { base: '#E8D8C8', dark: '#D0C0B0', light: '#F5EAE0', glaze: 'rgba(255,255,255,0.25)' },
        wall:        { base: '#87CEEB', trim: '#D4C0A8', accent: '#C0A888' },
        floor:       { base: '#C8A888', tile: '#B89878', grout: 'rgba(0,0,0,0.08)' },
        upholstery:  { sofa: '#CC8844', cushion: '#DDAA55', armchair: '#BB7733' },
        curtain:     { base: '#E0C8A0', tieback: '#C0A880', rod: '#666' },
        glass:       { base: 'rgba(200,230,255,0.3)', shine: 'rgba(255,255,255,0.4)' },
        plant:       { leaf: '#4A8B4A', dark: '#3A6B3A', light: '#6AAB6A', pot: '#CD853F' },
        accent1: '#DD6633', accent2: '#44AA66', accent3: '#DDBB44',
    },
};

// Active theme — set by the game when a level loads
let activeTheme = LEVEL_THEMES[1];

export function setActiveTheme(levelNum) {
    activeTheme = LEVEL_THEMES[levelNum] || LEVEL_THEMES[1];
}

export function getTheme() {
    return activeTheme;
}

// Material drawing helpers — use these for consistent textures across all renderers

export function drawWoodGrain(ctx, x, y, w, h, theme) {
    const t = theme || activeTheme;
    ctx.fillStyle = t.wood.base;
    ctx.fillRect(x, y, w, h);
    // Grain lines
    ctx.strokeStyle = t.wood.grain;
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 0.8;
    for (let i = 3; i < w; i += 7 + Math.sin(i) * 2) {
        ctx.beginPath();
        ctx.moveTo(x + i, y);
        ctx.bezierCurveTo(x + i + 2, y + h * 0.3, x + i - 1, y + h * 0.7, x + i + 1, y + h);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // Top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fillRect(x, y, w, 2);
    // Bottom shadow
    ctx.fillStyle = 'rgba(0,0,0,0.08)';
    ctx.fillRect(x, y + h - 1, w, 1);
}

export function drawFabricTexture(ctx, x, y, w, h, color, theme) {
    const t = theme || activeTheme;
    ctx.fillStyle = color || t.fabric.base;
    ctx.fillRect(x, y, w, h);
    // Subtle weave pattern
    ctx.strokeStyle = 'rgba(0,0,0,0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < w; i += 4) {
        ctx.beginPath();
        ctx.moveTo(x + i, y);
        ctx.lineTo(x + i, y + h);
        ctx.stroke();
    }
    for (let j = 0; j < h; j += 4) {
        ctx.beginPath();
        ctx.moveTo(x, y + j);
        ctx.lineTo(x + w, y + j);
        ctx.stroke();
    }
    // Top highlight
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(x, y, w, 2);
}

export function drawMetalSurface(ctx, x, y, w, h, theme) {
    const t = theme || activeTheme;
    const grad = ctx.createLinearGradient(x, y, x, y + h);
    grad.addColorStop(0, t.metal.light);
    grad.addColorStop(0.5, t.metal.base);
    grad.addColorStop(1, t.metal.dark);
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, w, h);
    // Shine
    ctx.fillStyle = t.metal.shine;
    ctx.fillRect(x + 2, y, w - 4, 2);
}

export function drawCeramicSurface(ctx, x, y, w, h, theme) {
    const t = theme || activeTheme;
    ctx.fillStyle = t.ceramic.base;
    ctx.fillRect(x, y, w, h);
    // Glaze highlight
    ctx.fillStyle = t.ceramic.glaze;
    ctx.fillRect(x + 2, y, w * 0.6, 2);
    // Subtle shadow at bottom
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(x, y + h - 1, w, 1);
}

export function drawTilePattern(ctx, x, y, w, h, tileSize, theme) {
    const t = theme || activeTheme;
    ctx.fillStyle = t.floor.base;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = t.floor.grout;
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x + i, y);
        ctx.lineTo(x + i, y + h);
        ctx.stroke();
    }
    for (let j = 0; j < h; j += tileSize / 2) {
        ctx.beginPath();
        ctx.moveTo(x, y + j);
        ctx.lineTo(x + w, y + j);
        ctx.stroke();
    }
}

// Consistent shadow under furniture
export function drawFurnitureShadow(ctx, cx, floorY, radiusX, radiusY) {
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.beginPath();
    ctx.ellipse(cx, floorY, radiusX, radiusY || 4, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Consistent furniture legs
export function drawLegs(ctx, x, w, topY, floorY, count, theme) {
    const t = theme || activeTheme;
    const legH = floorY - topY;
    if (legH < 3) return;
    ctx.fillStyle = t.wood.dark;
    const legW = 5;
    if (count === 2) {
        ctx.fillRect(x + 8, topY, legW, legH);
        ctx.fillRect(x + w - 8 - legW, topY, legW, legH);
    } else if (count === 3) {
        ctx.fillRect(x + 8, topY, legW, legH);
        ctx.fillRect(x + w / 2 - legW / 2, topY, legW, legH);
        ctx.fillRect(x + w - 8 - legW, topY, legW, legH);
    } else {
        ctx.fillRect(x + 6, topY, legW - 1, legH);
        ctx.fillRect(x + w - 6 - legW + 1, topY, legW - 1, legH);
    }
}
