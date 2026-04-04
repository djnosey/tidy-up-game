export const GRAVITY = 1800; // pixels per second squared
export const TERMINAL_VELOCITY = 900;

export function aabb(a, b) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}

// Check if 'a' is landing on top of 'b' (for stomping enemies)
export function landingOn(a, b, prevAY) {
    const aBottom = a.y + a.height;
    const prevABottom = prevAY + a.height;
    return (
        aBottom >= b.y &&
        prevABottom <= b.y + 4 && // was above last frame (small tolerance)
        a.x + a.width > b.x + 4 &&
        a.x < b.x + b.width - 4 &&
        a.vy >= 0
    );
}

// Resolve platform collision — push entity up on top of platform
export function resolvePlatformCollision(entity, platform) {
    const entityBottom = entity.y + entity.height;
    const entityRight = entity.x + entity.width;

    // Only resolve if overlapping
    if (!aabb(entity, platform)) return false;

    const overlapTop = entityBottom - platform.y;
    const overlapBottom = (platform.y + platform.height) - entity.y;
    const overlapLeft = entityRight - platform.x;
    const overlapRight = (platform.x + platform.width) - entity.x;

    const minOverlap = Math.min(overlapTop, overlapBottom, overlapLeft, overlapRight);

    if (minOverlap === overlapTop && entity.vy >= 0) {
        // Landing on top
        entity.y = platform.y - entity.height;
        entity.vy = 0;
        entity.onGround = true;
        return 'top';
    } else if (minOverlap === overlapBottom && entity.vy < 0) {
        // Hit head on bottom
        entity.y = platform.y + platform.height;
        entity.vy = 0;
        return 'bottom';
    } else if (minOverlap === overlapLeft) {
        // Hit right side of entity on left side of platform
        entity.x = platform.x - entity.width;
        return 'left';
    } else if (minOverlap === overlapRight) {
        // Hit left side of entity on right side of platform
        entity.x = platform.x + platform.width;
        return 'right';
    }

    return false;
}

// One-way platform collision — only land on top, can jump through from below/sides
export function resolveOneWayPlatform(entity, platform) {
    if (!aabb(entity, platform)) return false;

    // Only resolve if falling downward and was above the platform last frame
    const prevEntityBottom = entity.prevY + entity.height;
    if (entity.vy >= 0 && prevEntityBottom <= platform.y + 4) {
        entity.y = platform.y - entity.height;
        entity.vy = 0;
        entity.onGround = true;
        entity._onOneWayPlatform = platform;
        return 'top';
    }

    return false;
}
