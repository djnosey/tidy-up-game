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

export function updateCrumblingPlatforms(platforms, player, particles, dt, camera, audio) {
    for (const plat of platforms) {
        if (!plat.crumble) continue;
        if (plat._crumbleState === undefined) plat._crumbleState = 'solid';

        if (plat._crumbleState === 'solid') {
            // Check if player is standing on it
            if (player.onGround &&
                player.x + player.width > plat.x && player.x < plat.x + plat.width &&
                Math.abs((player.y + player.height) - plat.y) < 4) {
                plat._crumbleState = 'shaking';
                plat._crumbleTimer = plat.crumbleDelay || 0.8;
                plat._crumbleDelay = plat.crumbleDelay || 0.8;
                // Camera micro-shake + SFX on trigger
                if (camera) camera.shake(3, 0.3);
                if (audio) audio.playSFX('platformCrumble');
            }
        } else if (plat._crumbleState === 'shaking') {
            plat._crumbleTimer -= dt;
            // Track progress for visual escalation (0.0 = just triggered, 1.0 = about to break)
            plat._crumbleProgress = 1 - (plat._crumbleTimer / plat._crumbleDelay);
            if (plat._crumbleTimer <= 0) {
                plat._crumbleState = 'gone';
                plat._crumbleTimer = plat.crumbleRespawn || 3.0;
                plat._disabled = true;
                plat._crumbleProgress = 0;
                // Break particles — larger burst
                particles.emit({
                    x: plat.x + plat.width / 2, y: plat.y,
                    count: 12, speedX: 80, speedY: 60, life: 0.7,
                    colors: [plat.color, '#AAA', '#888'],
                });
                if (audio) audio.playSFX('platformBreak');
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
