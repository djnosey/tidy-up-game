// ─── Platform Physics ───────────────────────────────────────────────
// Moving platforms, crumbling platforms, and BED bounce mechanics.

export function updateMovingPlatforms(platforms, dt) {
    for (const plat of platforms) {
        if (!plat.moveX && !plat.moveY) continue;
        // Initialize runtime state on first tick
        if (plat._originX === undefined) {
            plat._originX = plat.x;
            plat._originY = plat.y;
            plat._moveTimer = 0;
        }
        plat._prevX = plat.x;
        plat._prevY = plat.y;
        plat._moveTimer += dt;
        const t = Math.sin(plat._moveTimer * (plat.moveSpeed || 1.0));
        if (plat.moveX) plat.x = plat._originX + t * plat.moveX;
        if (plat.moveY) plat.y = plat._originY + t * plat.moveY;
    }
}

export function carryPlayerOnPlatforms(player, platforms, dt) {
    if (!player.onGround) return;
    for (const plat of platforms) {
        if ((plat.moveX || plat.moveY) && plat._prevX !== undefined &&
            player.x + player.width > plat.x && player.x < plat.x + plat.width &&
            Math.abs((player.y + player.height) - plat.y) < 4) {
            player.x += plat.x - plat._prevX;
            player.y += plat.y - plat._prevY;
            break;
        }
    }
}

export function updateCrumblingPlatforms(platforms, player, particles, dt) {
    for (const plat of platforms) {
        if (!plat.crumble) continue;
        if (plat._crumbleState === undefined) plat._crumbleState = 'solid';

        if (plat._crumbleState === 'solid') {
            // Check if player is standing on it
            if (player.onGround &&
                player.x + player.width > plat.x && player.x < plat.x + plat.width &&
                Math.abs((player.y + player.height) - plat.y) < 4) {
                plat._crumbleState = 'shaking';
                plat._crumbleTimer = plat.crumbleDelay || 0.6;
            }
        } else if (plat._crumbleState === 'shaking') {
            plat._crumbleTimer -= dt;
            if (plat._crumbleTimer <= 0) {
                plat._crumbleState = 'gone';
                plat._crumbleTimer = plat.crumbleRespawn || 3.0;
                plat._disabled = true;
                // Crumble particles
                particles.emit({
                    x: plat.x + plat.width / 2, y: plat.y,
                    count: 8, speedX: 60, speedY: 40, life: 0.6,
                    colors: [plat.color, '#AAA', '#888'],
                });
            }
        } else if (plat._crumbleState === 'gone') {
            plat._crumbleTimer -= dt;
            if (plat._crumbleTimer <= 0) {
                plat._crumbleState = 'solid';
                plat._disabled = false;
            }
        }
    }
}

export function checkBedBounce(player, platforms, input) {
    if (!player.onGround) return;
    for (const plat of platforms) {
        if (plat.label === 'BED' &&
            player.x + player.width > plat.x && player.x < plat.x + plat.width &&
            Math.abs((player.y + player.height) - plat.y) < 4) {
            if (input.jumpPressed) {
                player.vy = -900; // super bounce!
                player.onGround = false;
            }
        }
    }
}
