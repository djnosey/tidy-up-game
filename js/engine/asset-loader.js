const imageCache = {};

export function loadImage(path) {
    if (imageCache[path]) return Promise.resolve(imageCache[path]);
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            imageCache[path] = img;
            resolve(img);
        };
        img.onerror = () => {
            // Return null — placeholder will be used
            imageCache[path] = null;
            resolve(null);
        };
        img.src = path;
    });
}

export function getImage(path) {
    return imageCache[path] || null;
}

export async function preloadAll(paths) {
    return Promise.all(paths.map(loadImage));
}

// Draw an image or a placeholder rectangle with label
export function drawSprite(ctx, img, x, y, w, h, label = '', color = '#888') {
    if (img) {
        ctx.drawImage(img, x, y, w, h);
    } else {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
        if (label) {
            ctx.fillStyle = '#fff';
            ctx.font = `${Math.min(12, h / 3)}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, x + w / 2, y + h / 2);
        }
    }
}
