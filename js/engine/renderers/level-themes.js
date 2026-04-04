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

// Per-level particle theme palettes — indexed by level number (0-5)
// Also keyed by name for backwards compatibility
export const PARTICLE_THEMES = {
    0: null, // assigned below
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    'Living Room': {
        jumpDust:    { colors: ['#D4C4A8', '#C4B498', '#B8A888'], speedX: 60, speedY: 40, gravity: 200, sizeMin: 2, sizeMax: 4, life: 0.4, count: 6 },
        landImpact:  { colors: ['#8B6914', '#A07828', '#C4A050'], speedX: 80, speedY: 60, gravity: 250, sizeMin: 2, sizeMax: 5, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#FFFFFF', '#F0F0F0', '#E8E8E8'], speedX: 100, speedY: 80, gravity: 150, sizeMin: 2, sizeMax: 4, life: 0.5, count: 8 },
        collect:     { colors: ['#FFD700', '#FFC800', '#FFE44D'], speedX: 80, speedY: 100, gravity: 80, sizeMin: 2, sizeMax: 4, life: 0.6, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    'Kitchen': {
        jumpDust:    { colors: ['#FFFFFF', '#F8F8F0', '#E8E0D0'], speedX: 50, speedY: 35, gravity: 180, sizeMin: 2, sizeMax: 4, life: 0.5, count: 6 },
        landImpact:  { colors: ['#B8D0D8', '#A0C0C8', '#90B0B8'], speedX: 70, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 4, life: 0.4, count: 8 },
        enemyHit:    { colors: ['#C8A050', '#D4B060', '#B09040'], speedX: 90, speedY: 70, gravity: 200, sizeMin: 2, sizeMax: 5, life: 0.5, count: 8 },
        collect:     { colors: ['#F0E0C0', '#E8D8B0', '#FFFFFF'], speedX: 60, speedY: 80, gravity: 40, sizeMin: 2, sizeMax: 4, life: 0.7, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FF8844'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    'Bathroom': {
        jumpDust:    { colors: ['#A0D0E0', '#80C0D0', '#B0E0F0'], speedX: 50, speedY: 30, gravity: 100, sizeMin: 2, sizeMax: 4, life: 0.6, count: 6 },
        landImpact:  { colors: ['#A0D0E0', '#90C8D8', '#80B8C8'], speedX: 80, speedY: 60, gravity: 150, sizeMin: 3, sizeMax: 5, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#FFFFFF', '#E0F0FF', '#D0E8FF'], speedX: 80, speedY: 70, gravity: 50, sizeMin: 3, sizeMax: 6, life: 0.6, count: 8 },
        collect:     { colors: ['#E0F0FF', '#C0E0F0', '#FFFFFF'], speedX: 60, speedY: 70, gravity: 30, sizeMin: 3, sizeMax: 5, life: 0.8, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FF8844'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    "Kids' Room": {
        jumpDust:    { colors: ['#FF88AA', '#88CCFF', '#AAFFAA', '#FFFF88', '#CC88FF'], speedX: 70, speedY: 50, gravity: 150, sizeMin: 2, sizeMax: 4, life: 0.5, count: 6 },
        landImpact:  { colors: ['#FF6688', '#6699FF', '#66CC66', '#FFCC33', '#CC66FF'], speedX: 90, speedY: 70, gravity: 200, sizeMin: 2, sizeMax: 5, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#FFB0C8', '#B0D8FF', '#B0FFB0', '#FFF0B0'], speedX: 100, speedY: 80, gravity: 120, sizeMin: 2, sizeMax: 5, life: 0.6, count: 8 },
        collect:     { colors: ['#FFD700', '#FF69B4', '#00CED1', '#7FFF00'], speedX: 90, speedY: 110, gravity: 60, sizeMin: 2, sizeMax: 4, life: 0.7, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF66AA', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    "Parents' Room": {
        jumpDust:    { colors: ['#E8D8C8', '#D8C8B8', '#F0E0D0'], speedX: 40, speedY: 30, gravity: 80, sizeMin: 2, sizeMax: 4, life: 0.6, count: 6 },
        landImpact:  { colors: ['#B0A090', '#A09080', '#C0B0A0'], speedX: 60, speedY: 40, gravity: 150, sizeMin: 2, sizeMax: 4, life: 0.5, count: 8 },
        enemyHit:    { colors: ['#D0D0D0', '#C0C0C0', '#E0E0E0'], speedX: 70, speedY: 50, gravity: 60, sizeMin: 2, sizeMax: 4, life: 0.6, count: 8 },
        collect:     { colors: ['#FFD080', '#FFC060', '#FFE0A0'], speedX: 70, speedY: 90, gravity: 60, sizeMin: 2, sizeMax: 4, life: 0.7, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
    'Terrace': {
        jumpDust:    { colors: ['#66AA44', '#88CC66', '#448833'], speedX: 60, speedY: 40, gravity: 120, sizeMin: 2, sizeMax: 4, life: 0.5, count: 6 },
        landImpact:  { colors: ['#8B7355', '#A08060', '#7A6248'], speedX: 80, speedY: 60, gravity: 250, sizeMin: 2, sizeMax: 5, life: 0.4, count: 8 },
        enemyHit:    { colors: ['#FFEE44', '#FFD700', '#DDCC22'], speedX: 90, speedY: 70, gravity: 100, sizeMin: 2, sizeMax: 4, life: 0.5, count: 8 },
        collect:     { colors: ['#FFFFAA', '#FFE888', '#FFF0CC'], speedX: 50, speedY: 60, gravity: 20, sizeMin: 2, sizeMax: 4, life: 0.9, count: 10 },
        obstacleHit: { colors: ['#FF4444', '#FF6644', '#FFAA00'], speedX: 60, speedY: 50, gravity: 200, sizeMin: 2, sizeMax: 3, life: 0.3, count: 4 },
    },
};

// Index-based access (safer than string keys)
PARTICLE_THEMES[0] = PARTICLE_THEMES['Living Room'];
PARTICLE_THEMES[1] = PARTICLE_THEMES['Kitchen'];
PARTICLE_THEMES[2] = PARTICLE_THEMES['Bathroom'];
PARTICLE_THEMES[3] = PARTICLE_THEMES["Kids' Room"];
PARTICLE_THEMES[4] = PARTICLE_THEMES["Parents' Room"];
PARTICLE_THEMES[5] = PARTICLE_THEMES['Terrace'];

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
