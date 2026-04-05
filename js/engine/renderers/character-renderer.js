// Character drawing — high-fidelity procedural player avatar rendering
import { roundRect, darken, lighten } from './shared.js';

// --- OFFSCREEN CANVAS CACHE ---
const _charCache = new Map();
const WALK_QUANTA = 8;
const CACHE_MAX = 200;
const CACHE_PAD_TOP = 16; // room for name tag + hair above y=0

function getCacheKey(character, facing, animState) {
    const state = animState.isShooting ? 'S' :
                  animState.isLanding ? 'L' :
                  animState.isCrouching ? 'C' :
                  animState.isJumping ? 'J' :
                  animState.isFalling ? 'F' :
                  animState.isWalking ? 'W' : 'N';
    const walkQ = state === 'W' ? Math.floor(animState.walkPhase * 4) % WALK_QUANTA : 0;
    const blink = animState.blinkDuration > 0 ? 1 : 0;
    // Quantize eye tracking to 3 directions: left(-1), center(0), right(1)
    const trackDir = animState.velocityX > 50 ? 1 : animState.velocityX < -50 ? -1 : 0;
    // Quantize idle time to phases (not active / 5s+ / per-second after)
    const idleQ = animState.idleTime < 5 ? 0 : Math.floor(animState.idleTime * 4) % 60;
    return `${character.name}_${facing}_${state}${walkQ}_${blink}_${trackDir}_${idleQ}`;
}

export function clearCharacterCache() {
    _charCache.clear();
}

// Default animation state for static rendering (menus, previews)
function createDefaultAnimState() {
    return {
        walkPhase: 0, isWalking: false, isJumping: false, isFalling: false,
        isCrouching: false, isLanding: false, isShooting: false,
        landTimer: 0, shootTimer: 0,
        blinkTimer: 99, blinkDuration: 0,
        breathPhase: 0, expression: 'neutral',
        velocityX: 0, velocityY: 0, idleTime: 0,
    };
}

// Compute body part proportions from character data
function computeProportions(w, h, character) {
    const isKid = character.heightModifier < 1.0;
    const hm = character.heightModifier || 1.0;

    // Kids get bigger heads proportionally
    const headRatio = isKid ? 0.32 : 0.26;
    const bodyRatio = isKid ? 0.34 : 0.38;
    const legRatio = 1 - headRatio - bodyRatio;

    // Apply height modifier — character draws shorter/taller within the box
    const drawH = h * hm;
    const yOff = h - drawH; // offset to keep feet at bottom

    const headH = drawH * headRatio;
    const bodyH = drawH * bodyRatio;
    const legH = drawH * legRatio;
    const headW = w * (isKid ? 0.6 : 0.52);
    const bodyW = w * (isKid ? 0.48 : 0.5);
    const neckH = drawH * 0.03;

    return {
        isKid, hm, drawH, yOff,
        headH, bodyH, legH, headW, bodyW, neckH,
        armW: w * 0.11,
        legW: w * 0.14,
        legGap: w * 0.06,
        w, h,
    };
}

// --- SUB-RENDERERS ---

function drawShadow(ctx, cx, footY, w) {
    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(cx, footY + 2, w * 0.38, 4, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawLegs(ctx, cx, props, character, animState) {
    const { legW, legGap, legH, bodyH, bodyW, yOff, headH, neckH, w } = props;
    const legY = yOff + headH + neckH + bodyH;
    const thighH = legH * 0.5;
    const shinH = legH * 0.5;
    const shoeH = Math.max(4, legH * 0.14);

    // Walk cycle offsets
    const walkAmt = animState.isWalking ? Math.sin(animState.walkPhase) : 0;
    const walkAmt2 = animState.isWalking ? Math.sin(animState.walkPhase + Math.PI) : 0;

    // Jump: tuck legs up
    const jumpTuck = animState.isJumping ? legH * 0.15 : 0;

    // Landing: extra knee bend
    const landBend = animState.isLanding ? Math.max(0, animState.landTimer) * 15 : 0;

    // Crouch: bend knees
    const crouchBend = animState.isCrouching ? legH * 0.2 : 0;

    const pantsColor = character.clothingColors?.pants || darken(character.color, 40);
    const shoeColor = character.clothingColors?.shoes || '#333';

    // Draw each leg
    for (let side = -1; side <= 1; side += 2) {
        const swing = side === -1 ? walkAmt : walkAmt2;
        const hipX = cx + side * (legGap + legW / 2);

        // Thigh offset from walk
        const thighAngle = swing * 0.4;
        const kneeX = hipX + Math.sin(thighAngle) * thighH;
        const kneeY = legY + Math.cos(thighAngle) * thighH - jumpTuck + crouchBend;

        // Shin
        const shinAngle = swing * -0.2 - (crouchBend + landBend) * 0.015;
        const footX = kneeX + Math.sin(shinAngle) * shinH * 0.3;
        const footY = legY + legH - shoeH - jumpTuck;

        // Thigh
        ctx.fillStyle = pantsColor;
        ctx.beginPath();
        ctx.moveTo(hipX - legW / 2, legY);
        ctx.quadraticCurveTo(kneeX - legW / 2 - 1, kneeY, kneeX - legW / 2, kneeY);
        ctx.lineTo(kneeX + legW / 2, kneeY);
        ctx.quadraticCurveTo(hipX + legW / 2 + 1, legY, hipX + legW / 2, legY);
        ctx.fill();

        // Shin
        ctx.beginPath();
        ctx.moveTo(kneeX - legW / 2, kneeY);
        ctx.quadraticCurveTo(footX - legW / 2, footY, footX - legW / 2, footY);
        ctx.lineTo(footX + legW / 2, footY);
        ctx.quadraticCurveTo(kneeX + legW / 2, kneeY, kneeX + legW / 2, kneeY);
        ctx.fill();

        // Trouser cuff line
        ctx.strokeStyle = darken(pantsColor, 20);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(footX - legW / 2, footY);
        ctx.lineTo(footX + legW / 2, footY);
        ctx.stroke();

        // Shoe
        ctx.fillStyle = shoeColor;
        const shoeExtraW = 2;
        ctx.beginPath();
        ctx.moveTo(footX - legW / 2 - shoeExtraW, footY + shoeH);
        ctx.lineTo(footX - legW / 2, footY);
        ctx.lineTo(footX + legW / 2, footY);
        ctx.lineTo(footX + legW / 2 + shoeExtraW, footY + shoeH);
        ctx.quadraticCurveTo(footX, footY + shoeH + 1, footX - legW / 2 - shoeExtraW, footY + shoeH);
        ctx.fill();

        // Shoe sole line
        ctx.strokeStyle = darken(shoeColor, 30);
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(footX - legW / 2 - shoeExtraW, footY + shoeH);
        ctx.lineTo(footX + legW / 2 + shoeExtraW, footY + shoeH);
        ctx.stroke();
    }
}

function drawBody(ctx, cx, props, character, animState) {
    const { bodyW, bodyH, yOff, headH, neckH, w } = props;
    const bodyY = yOff + headH + neckH;
    const shirtColor = character.clothingColors?.shirt || character.color;

    // Breathing: subtle chest expansion
    const breathOffset = Math.sin(animState.breathPhase) * 0.5;

    // Walk bob
    const walkBob = animState.isWalking ? Math.abs(Math.sin(animState.walkPhase * 2)) * 1.5 : 0;
    const bodyTop = bodyY - walkBob;

    // Torso — tapered shape (shoulders wider than waist)
    const shoulderW = bodyW / 2 + 1 + breathOffset;
    const waistW = bodyW / 2 - 1;

    ctx.fillStyle = shirtColor;
    ctx.beginPath();
    ctx.moveTo(cx - waistW, bodyTop + bodyH);
    ctx.quadraticCurveTo(cx - shoulderW - 1, bodyTop + bodyH * 0.3, cx - shoulderW, bodyTop + 3);
    ctx.quadraticCurveTo(cx, bodyTop - 1, cx + shoulderW, bodyTop + 3);
    ctx.quadraticCurveTo(cx + shoulderW + 1, bodyTop + bodyH * 0.3, cx + waistW, bodyTop + bodyH);
    ctx.fill();

    // Collar line
    ctx.strokeStyle = darken(shirtColor, 25);
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, bodyTop + 3, bodyW * 0.2, 0, Math.PI);
    ctx.stroke();

    // Shirt hem
    ctx.beginPath();
    ctx.moveTo(cx - waistW, bodyTop + bodyH);
    ctx.lineTo(cx + waistW, bodyTop + bodyH);
    ctx.stroke();

    // Character initial on shirt
    if (character.initial) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = `bold ${Math.round(bodyH * 0.32)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(character.initial, cx, bodyTop + bodyH * 0.5);
    }

    return { bodyTop, shoulderW };
}

function drawArms(ctx, cx, props, character, animState, bodyTop, shoulderW) {
    const { armW, bodyH, yOff, headH, neckH } = props;
    const skinColor = character.skinTone || '#FDCEB5';
    const shirtColor = character.clothingColors?.shirt || character.color;
    const upperArmH = bodyH * 0.45;
    const forearmH = bodyH * 0.38;
    const handR = armW * 0.55;

    // Arm swing from walk
    const walkSwing = animState.isWalking ? Math.sin(animState.walkPhase) * 0.5 : 0;

    // Shooting pose
    const shootFactor = animState.isShooting ? Math.min(1, animState.shootTimer * 5) : 0;

    // Jump: arms slightly raised
    const jumpLift = animState.isJumping ? -bodyH * 0.1 : 0;

    for (let side = -1; side <= 1; side += 2) {
        const isFrontArm = side === 1; // right arm is front when facing right
        const swing = isFrontArm ? walkSwing : -walkSwing;

        // Shoulder attachment point
        const shoulderX = cx + side * shoulderW;
        const shoulderY = bodyTop + 5;

        let elbowX, elbowY, handX, handY;

        if (shootFactor > 0 && isFrontArm) {
            // Front arm extends forward when shooting
            const ext = shootFactor;
            elbowX = shoulderX + side * upperArmH * 0.6 * ext;
            elbowY = shoulderY + upperArmH * (1 - ext * 0.4);
            handX = elbowX + side * forearmH * 0.8 * ext;
            handY = elbowY - forearmH * 0.1 * ext;
        } else if (shootFactor > 0 && !isFrontArm) {
            // Back arm braces
            elbowX = shoulderX + side * 2;
            elbowY = shoulderY + upperArmH * 0.8;
            handX = elbowX - side * 2;
            handY = elbowY + forearmH * 0.4;
        } else {
            // Normal/walking pose
            const armAngle = swing * 0.6;
            elbowX = shoulderX + Math.sin(armAngle) * upperArmH * 0.3;
            elbowY = shoulderY + upperArmH + jumpLift;
            handX = elbowX + Math.sin(-armAngle * 0.5) * forearmH * 0.2;
            handY = elbowY + forearmH * 0.7 + jumpLift;
        }

        // Upper arm (shirt-colored)
        ctx.strokeStyle = shirtColor;
        ctx.lineWidth = armW;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(shoulderX, shoulderY);
        ctx.quadraticCurveTo(shoulderX + side * 1, shoulderY + upperArmH * 0.5, elbowX, elbowY);
        ctx.stroke();

        // Forearm (skin)
        ctx.strokeStyle = skinColor;
        ctx.lineWidth = armW * 0.85;
        ctx.beginPath();
        ctx.moveTo(elbowX, elbowY);
        ctx.quadraticCurveTo(elbowX + side * 1, (elbowY + handY) / 2, handX, handY);
        ctx.stroke();

        // Hand
        ctx.fillStyle = skinColor;
        ctx.beginPath();
        ctx.arc(handX, handY, handR, 0, Math.PI * 2);
        ctx.fill();

        // Accessories on wrist
        if (character.accessories) {
            if (character.accessories.includes('goldBracelet') && side === 1) {
                ctx.strokeStyle = '#DAA520';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(handX, handY - handR - 1, handR + 1, 0, Math.PI * 2);
                ctx.stroke();
            }
            if (character.accessories.includes('colorfulBracelet') && side === 1) {
                ctx.strokeStyle = '#FF69B4';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(handX, handY - handR - 1, handR + 1, 0, Math.PI);
                ctx.stroke();
                ctx.strokeStyle = '#44CCFF';
                ctx.beginPath();
                ctx.arc(handX, handY - handR - 1, handR + 1, Math.PI, Math.PI * 2);
                ctx.stroke();
            }
        }
    }
}

function drawNeck(ctx, cx, props, character) {
    const { yOff, headH, neckH } = props;
    const skinColor = character.skinTone || '#FDCEB5';
    const neckW = props.w * 0.1;

    ctx.fillStyle = skinColor;
    ctx.fillRect(cx - neckW, yOff + headH, neckW * 2, neckH + 2);
}

function drawHead(ctx, cx, props, character, animState) {
    const { headH, headW, yOff, isKid } = props;
    const skinColor = character.skinTone || '#FDCEB5';
    const headCY = yOff + headH * 0.55;

    // Slightly rounder heads for kids
    const headRX = headW / 2;
    const headRY = headH * (isKid ? 0.55 : 0.52);

    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.ellipse(cx, headCY, headRX, headRY, 0, 0, Math.PI * 2);
    ctx.fill();

    // Subtle chin definition
    ctx.strokeStyle = darken(skinColor, 15);
    ctx.lineWidth = 0.4;
    ctx.beginPath();
    ctx.arc(cx, headCY + headRY * 0.6, headRX * 0.5, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Steve's stubble
    if (character.distinguishingFeatures?.includes('stubble')) {
        ctx.fillStyle = 'rgba(100,80,60,0.15)';
        const stubbleY = headCY + headRY * 0.3;
        for (let i = 0; i < 12; i++) {
            const sx = cx + (Math.random() - 0.5) * headRX * 1.2;
            const sy = stubbleY + Math.random() * headRY * 0.5;
            ctx.beginPath();
            ctx.arc(sx, sy, 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Hara's mole
    if (character.distinguishingFeatures?.includes('mole')) {
        ctx.fillStyle = '#5A3A2A';
        ctx.beginPath();
        ctx.arc(cx + headRX * 0.45, headCY + headRY * 0.2, 0.8, 0, Math.PI * 2);
        ctx.fill();
    }

    // Ears
    ctx.fillStyle = skinColor;
    for (let side = -1; side <= 1; side += 2) {
        ctx.beginPath();
        ctx.ellipse(cx + side * headRX * 0.92, headCY, headRX * 0.12, headRY * 0.18, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Earrings
    if (character.accessories?.includes('goldEarrings')) {
        ctx.fillStyle = '#DAA520';
        for (let side = -1; side <= 1; side += 2) {
            ctx.beginPath();
            ctx.arc(cx + side * headRX * 0.95, headCY + headRY * 0.12, 1.2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    return { headCY, headRX, headRY };
}

function drawHair(ctx, cx, props, character, animState) {
    const { headH, headW, yOff, isKid } = props;
    const hairColor = character.hairColor || '#3a2a0a';
    const headCY = yOff + headH * 0.55;
    const headRX = headW / 2;
    const headRY = headH * (isKid ? 0.55 : 0.52);

    // Hair bounce from walking
    const hairBounce = animState.isWalking ? Math.sin(animState.walkPhase * 2) * 1.5 : 0;

    // Hair flow from jumping (hair goes down/back)
    const hairFlow = animState.isJumping ? 3 : animState.isFalling ? -2 : 0;

    ctx.fillStyle = hairColor;

    if (character.hairStyle === 'long') {
        // Long flowing hair (Hara, Juno)
        // Full hair cap covering entire top of head
        ctx.beginPath();
        ctx.ellipse(cx, headCY - headRY * 0.05, headRX + 3, headRY * 0.75, 0, Math.PI, Math.PI * 2);
        ctx.fill();

        // Side hair flowing down
        for (let side = -1; side <= 1; side += 2) {
            const sideX = cx + side * (headRX + 1);
            const flowOff = hairBounce * side * 0.3 + hairFlow;

            ctx.beginPath();
            ctx.moveTo(sideX, headCY - headRY * 0.3);
            ctx.quadraticCurveTo(
                sideX + side * 2, headCY + headRY * 0.8 + flowOff,
                sideX - side * 1, headCY + headRY * 1.3 + flowOff + hairBounce
            );
            ctx.lineTo(sideX - side * 3, headCY + headRY * 1.3 + flowOff + hairBounce);
            ctx.quadraticCurveTo(
                sideX - side * 1, headCY + headRY * 0.5 + flowOff,
                cx + side * headRX * 0.4, headCY - headRY * 0.3
            );
            ctx.fill();
        }

        // Fringe/bangs
        ctx.beginPath();
        ctx.moveTo(cx - headRX * 0.7, headCY - headRY * 0.5);
        ctx.quadraticCurveTo(cx, headCY - headRY * 0.8, cx + headRX * 0.7, headCY - headRY * 0.5);
        ctx.quadraticCurveTo(cx + headRX * 0.3, headCY - headRY * 0.25, cx - headRX * 0.3, headCY - headRY * 0.25);
        ctx.quadraticCurveTo(cx - headRX * 0.5, headCY - headRY * 0.35, cx - headRX * 0.7, headCY - headRY * 0.5);
        ctx.fill();

        // Hair highlight
        ctx.fillStyle = lighten(hairColor, 20);
        ctx.beginPath();
        ctx.ellipse(cx + headRX * 0.15, headCY - headRY * 0.55, headRX * 0.2, headRY * 0.1, -0.2, 0, Math.PI * 2);
        ctx.fill();

    } else if (character.hairStyle === 'short') {
        // Short hair (Steve, Derek)
        // Main hair cap
        ctx.beginPath();
        ctx.ellipse(cx, headCY - headRY * 0.15, headRX + 1, headRY * 0.55, 0, Math.PI, Math.PI * 2);
        ctx.fill();

        if (character.name === 'Steve') {
            // Steve: slightly receding, neat top
            ctx.beginPath();
            ctx.moveTo(cx - headRX * 0.8, headCY - headRY * 0.1);
            ctx.quadraticCurveTo(cx, headCY - headRY * 0.85, cx + headRX * 0.8, headCY - headRY * 0.1);
            ctx.quadraticCurveTo(cx, headCY - headRY * 0.7, cx - headRX * 0.8, headCY - headRY * 0.1);
            ctx.fill();

            // Slight side hair
            for (let side = -1; side <= 1; side += 2) {
                ctx.fillRect(cx + side * headRX * 0.85, headCY - headRY * 0.2, side * 2, headRY * 0.5);
            }
        } else {
            // Derek: neat with slight fringe
            ctx.beginPath();
            ctx.moveTo(cx - headRX * 0.6, headCY - headRY * 0.35);
            ctx.quadraticCurveTo(cx - headRX * 0.2, headCY - headRY * 0.2, cx + headRX * 0.4, headCY - headRY * 0.4);
            ctx.quadraticCurveTo(cx + headRX * 0.6, headCY - headRY * 0.55, cx + headRX * 0.3, headCY - headRY * 0.6);
            ctx.quadraticCurveTo(cx, headCY - headRY * 0.85, cx - headRX * 0.6, headCY - headRY * 0.55);
            ctx.fill();
        }

        // Hair highlight
        ctx.fillStyle = lighten(hairColor, 25);
        ctx.beginPath();
        ctx.ellipse(cx + headRX * 0.1, headCY - headRY * 0.55, headRX * 0.18, headRY * 0.08, -0.3, 0, Math.PI * 2);
        ctx.fill();
    }
}

function drawFace(ctx, cx, props, character, animState, facing) {
    const { headH, headW, yOff, isKid } = props;
    const headCY = yOff + headH * 0.55;
    const headRX = headW / 2;
    const headRY = headH * (isKid ? 0.55 : 0.52);

    const eyeColor = character.eyeColor || '#4488CC';
    const hairColor = character.hairColor || '#3a2a0a';
    const skinColor = character.skinTone || '#FDCEB5';

    const eyeY = headCY + headRY * 0.0;
    const eyeSpread = headRX * 0.38;
    const eyeDir = facing * 1.5;

    // --- EYEBROWS ---
    const browY = eyeY - headRY * 0.28;
    const browLen = headRX * 0.22;
    ctx.strokeStyle = darken(hairColor, 10);
    ctx.lineWidth = 1.0;
    ctx.lineCap = 'round';

    for (let side = -1; side <= 1; side += 2) {
        const browX = cx + side * eyeSpread + eyeDir * 0.3;
        let innerY = browY;
        let outerY = browY;

        if (animState.expression === 'surprised' || animState.isJumping) {
            // Raised eyebrows
            innerY -= 2;
            outerY -= 2.5;
        } else if (animState.expression === 'determined' || animState.isShooting) {
            // Furrowed — inner end goes down
            innerY += 1;
            outerY -= 1;
        } else if (animState.isLanding) {
            // Bounce
            innerY += Math.sin(animState.landTimer * 30) * 1;
        }

        ctx.beginPath();
        ctx.moveTo(browX - side * browLen, innerY);
        ctx.quadraticCurveTo(browX, Math.min(innerY, outerY) - 0.5, browX + side * browLen, outerY);
        ctx.stroke();
    }

    // --- EYES ---
    const blinking = animState.blinkDuration > 0;
    const frontEyeIdx = facing === 1 ? 1 : 0;

    // Eye tracking — pupils follow velocity
    const trackX = Math.min(1, Math.max(-1, animState.velocityX / 200)) * 1.2;
    const trackY = Math.min(1, Math.max(-1, animState.velocityY / 400)) * 0.8;

    for (let i = 0; i < 2; i++) {
        const side = i === 0 ? -1 : 1;
        const eyeX = cx + side * eyeSpread + eyeDir * 0.3;
        const isFront = i === frontEyeIdx;
        const eyeW = isFront ? 4.0 : 3.2;
        const eyeH = isFront ? 3.5 : 2.8;

        if (blinking) {
            // Blink — squashed line
            ctx.strokeStyle = darken(skinColor, 30);
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(eyeX - eyeW, eyeY);
            ctx.lineTo(eyeX + eyeW, eyeY);
            ctx.stroke();
        } else {
            // Modify eye shape based on expression
            let eyeScaleY = 1.0;
            if (animState.isJumping) eyeScaleY = 1.3; // wide eyes
            if (animState.isShooting) eyeScaleY = 0.7; // squint
            if (animState.isLanding && animState.landTimer > 0.1) eyeScaleY = 0.6; // squeeze

            const finalEyeH = eyeH * eyeScaleY;

            // Sclera (white)
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.ellipse(eyeX, eyeY, eyeW, finalEyeH, 0, 0, Math.PI * 2);
            ctx.fill();

            // Eye outline
            ctx.strokeStyle = 'rgba(0,0,0,0.15)';
            ctx.lineWidth = 0.4;
            ctx.stroke();

            // Iris (colored)
            const irisR = Math.min(eyeW, finalEyeH) * 0.6;
            const pupilX = eyeX + eyeDir * 0.5 + trackX;
            const pupilY = eyeY + trackY;
            ctx.fillStyle = eyeColor;
            ctx.beginPath();
            ctx.arc(pupilX, pupilY, irisR, 0, Math.PI * 2);
            ctx.fill();

            // Pupil (black)
            ctx.fillStyle = '#111';
            ctx.beginPath();
            ctx.arc(pupilX, pupilY, irisR * 0.5, 0, Math.PI * 2);
            ctx.fill();

            // Eye highlight
            ctx.fillStyle = 'rgba(255,255,255,0.7)';
            ctx.beginPath();
            ctx.arc(pupilX - irisR * 0.25, pupilY - irisR * 0.3, irisR * 0.25, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // --- NOSE ---
    const noseX = cx + facing * (headRX * 0.12);
    const noseY = eyeY + headRY * 0.3;
    const noseSize = character.distinguishingFeatures?.includes('bigNose') ? 1.6 : 1.0;

    ctx.fillStyle = darken(skinColor, 12);
    ctx.beginPath();
    ctx.moveTo(noseX, noseY - 2 * noseSize);
    ctx.quadraticCurveTo(noseX + facing * 3.5 * noseSize, noseY + 1, noseX, noseY + 2.5 * noseSize);
    ctx.fill();

    // Nostril hint
    ctx.fillStyle = darken(skinColor, 25);
    ctx.beginPath();
    ctx.arc(noseX + facing * 1 * noseSize, noseY + 1 * noseSize, 0.6 * noseSize, 0, Math.PI * 2);
    ctx.fill();

    // --- MOUTH ---
    const mouthY = noseY + headRY * 0.25;
    const mouthX = cx + eyeDir * 0.4;
    ctx.lineCap = 'round';

    if (animState.isJumping) {
        // Open "o" mouth
        ctx.fillStyle = '#8B4040';
        ctx.beginPath();
        ctx.ellipse(mouthX, mouthY, 2.5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
    } else if (animState.isShooting) {
        // Determined grit
        ctx.strokeStyle = '#8B5050';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(mouthX - 3, mouthY);
        ctx.lineTo(mouthX + 3, mouthY);
        ctx.stroke();
        // Slight teeth hint
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(mouthX - 2, mouthY);
        ctx.lineTo(mouthX + 2, mouthY);
        ctx.stroke();
    } else {
        // Relaxed smile
        ctx.strokeStyle = '#a0604a';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mouthX, mouthY - 1, 3, 0.15, Math.PI - 0.15);
        ctx.stroke();
    }
}

function drawIdleAnimation(ctx, cx, props, character, animState, facing) {
    const { bodyW, bodyH, armW, legW, legGap, legH, yOff, headH, neckH, w, h } = props;
    const skinColor = character.skinTone || '#FDCEB5';
    const hairColor = character.hairColor || '#3a2a0a';
    const bodyY = yOff + headH + neckH;
    const legY = bodyY + bodyH;
    const footY = legY + legH;

    if (!animState.idleTime || animState.idleTime < 5) return;
    const t = animState.idleTime - 5;
    const bob = Math.sin(t * 3) * 0.5;

    const eyeY = yOff + headH * 0.55;
    const headW2 = props.headW;
    const eyeSpread = headW2 * 0.22;
    const eyeDir = facing * 2.5;

    if (character.name === 'Steve') {
        // Steve checks his phone
        const handX = cx + facing * (bodyW / 2 + armW * 0.3);
        const handY = bodyY + bodyH * 0.45 + bob;
        ctx.fillStyle = '#222';
        roundRect(ctx, handX - 5, handY - 8, 10, 16, 2);
        ctx.fillStyle = `rgba(100, 180, 255, ${0.6 + Math.sin(t * 2) * 0.2})`;
        ctx.fillRect(handX - 4, handY - 6, 8, 12);
        ctx.fillStyle = `rgba(100, 180, 255, ${0.08 + Math.sin(t * 2) * 0.04})`;
        ctx.beginPath();
        ctx.ellipse(cx, yOff + headH * 0.55, headW2 / 2, headH * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
    } else if (character.name === 'Hara') {
        // Hara taps her foot impatiently
        const tapPhase = Math.floor(t * 4) % 2;
        if (tapPhase === 0) {
            ctx.fillStyle = character.clothingColors?.shoes || '#333';
            ctx.fillRect(cx + legGap - 2, footY - 6, legW + 4, 5);
        }
        if (tapPhase === 1) {
            ctx.strokeStyle = 'rgba(0,0,0,0.3)';
            ctx.lineWidth = 1;
            for (let i = 0; i < 3; i++) {
                const lx = cx + legGap + legW / 2 + 8 + i * 5;
                ctx.beginPath();
                ctx.moveTo(lx, footY - 2);
                ctx.lineTo(lx, footY + 1 + i);
                ctx.stroke();
            }
        }
        // Impatient eyebrows
        ctx.strokeStyle = hairColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx - eyeSpread - 4, eyeY - 6 - Math.sin(t * 3) * 1);
        ctx.lineTo(cx - eyeSpread + 4, eyeY - 5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx + eyeSpread - 4, eyeY - 5);
        ctx.lineTo(cx + eyeSpread + 4, eyeY - 6 - Math.sin(t * 3) * 1);
        ctx.stroke();
    } else if (character.name === 'Derek') {
        // Derek plays with a toy car
        const toyX = cx + facing * (w * 0.4);
        const toyY = yOff + h - 4;
        const spin = t * 4;
        ctx.save();
        ctx.translate(toyX, toyY);
        ctx.rotate(Math.sin(spin) * 0.3);
        ctx.font = `${10 + Math.sin(t * 2)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('\u{1F697}', 0, 0);
        ctx.restore();
        ctx.strokeStyle = skinColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + facing * bodyW / 2, bodyY + bodyH * 0.5);
        ctx.lineTo(toyX, toyY - 6);
        ctx.stroke();
        if (Math.floor(t * 2) % 3 === 0) {
            ctx.font = '7px monospace';
            ctx.fillStyle = 'rgba(0,0,0,0.4)';
            ctx.textAlign = 'center';
            ctx.fillText('vroom', toyX + facing * 12, toyY - 8);
        }
    } else if (character.name === 'Juno') {
        // Juno draws on the floor with a crayon
        const crayonX = cx + facing * (w * 0.35) + Math.sin(t * 3) * 5;
        const crayonY = yOff + h - 2;
        ctx.fillStyle = character.projectileColor || '#FF69B4';
        ctx.save();
        ctx.translate(crayonX, crayonY - 4);
        ctx.rotate(facing * 0.4);
        ctx.fillRect(-2, -8, 4, 12);
        ctx.fillStyle = darken(character.projectileColor || '#FF69B4', 30);
        ctx.beginPath();
        ctx.moveTo(-2, -8); ctx.lineTo(0, -12); ctx.lineTo(2, -8);
        ctx.fill();
        ctx.restore();
        const scribbleLen = Math.min(t * 4, 20);
        ctx.strokeStyle = character.projectileColor || '#FF69B4';
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.6;
        ctx.beginPath();
        ctx.moveTo(crayonX - scribbleLen, crayonY + 1);
        for (let s = 0; s < scribbleLen; s += 3) {
            ctx.lineTo(crayonX - scribbleLen + s, crayonY + 1 + Math.sin(s * 0.8) * 3);
        }
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = skinColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx + facing * bodyW / 2, bodyY + bodyH * 0.5);
        ctx.lineTo(crayonX, crayonY - 8);
        ctx.stroke();
    }
}

// --- MAIN ENTRY POINT ---

export function drawCharacter(ctx, x, y, w, h, character, facing, animState) {
    if (!animState || typeof animState !== 'object') {
        animState = createDefaultAnimState();
    }

    const key = getCacheKey(character, facing, animState);
    let cached = _charCache.get(key);

    if (!cached) {
        // Evict oldest if cache too large
        if (_charCache.size >= CACHE_MAX) {
            const firstKey = _charCache.keys().next().value;
            _charCache.delete(firstKey);
        }

        const offCanvas = document.createElement('canvas');
        offCanvas.width = w + 4;  // +4 for slight overflow from accessories
        offCanvas.height = h + CACHE_PAD_TOP + 4;
        const offCtx = offCanvas.getContext('2d');

        // Render full character to offscreen canvas
        offCtx.translate(2, CACHE_PAD_TOP);  // offset for padding
        _renderCharacterFull(offCtx, w, h, character, facing, animState);

        cached = offCanvas;
        _charCache.set(key, cached);
    }

    // Blit cached canvas — offset by padding
    ctx.drawImage(cached, x - 2, y - CACHE_PAD_TOP);
}

function _renderCharacterFull(ctx, w, h, character, facing, animState) {
    const props = computeProportions(w, h, character);
    const localCx = w / 2;

    // Shadow
    drawShadow(ctx, localCx, props.yOff + props.drawH, w);

    // Legs
    drawLegs(ctx, localCx, props, character, animState);

    // Body
    const { bodyTop, shoulderW } = drawBody(ctx, localCx, props, character, animState);

    // Neck
    drawNeck(ctx, localCx, props, character);

    // Arms (behind + in front handled by draw order)
    drawArms(ctx, localCx, props, character, animState, bodyTop, shoulderW);

    // Head
    drawHead(ctx, localCx, props, character, animState);

    // Hair
    drawHair(ctx, localCx, props, character, animState);

    // Face (eyes, eyebrows, nose, mouth)
    drawFace(ctx, localCx, props, character, animState, facing);

    // Idle animations
    drawIdleAnimation(ctx, localCx, props, character, animState, facing);

    // Name tag
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    if (character.name) ctx.fillText(character.name.toUpperCase(), localCx, -4);
}
