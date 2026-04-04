// Character drawing — player avatar rendering
import { roundRect, darken } from './shared.js';

export function drawCharacter(ctx, x, y, w, h, character, facing, crouching, idleTime) {
    ctx.save();
    const cx = x + w / 2;
    const skinColor = '#FDCEB5';
    const shirtColor = character.color;
    const pantsColor = darken(character.color, 40);
    const hairColor = character.name === 'Hara' ? '#1a0a00' :
                      character.name === 'Steve' ? '#5a3a1a' :
                      character.name === 'Derek' ? '#3a2a0a' : '#2a1a0a';

    const headH = h * 0.28;
    const bodyH = h * 0.38;
    const legH = h * 0.34;
    const headY = y;
    const bodyY = y + headH;
    const legY = bodyY + bodyH;
    const headW = w * 0.55;
    const bodyW = w * 0.5;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(cx, y + h + 2, w * 0.4, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    const legW = w * 0.16;
    const legGap = w * 0.08;
    ctx.fillStyle = pantsColor;
    ctx.fillRect(cx - legGap - legW, legY, legW, legH);
    ctx.fillRect(cx + legGap, legY, legW, legH);
    ctx.fillStyle = '#333';
    ctx.fillRect(cx - legGap - legW - 2, legY + legH - 6, legW + 4, 6);
    ctx.fillRect(cx + legGap - 2, legY + legH - 6, legW + 4, 6);

    // Body
    ctx.fillStyle = shirtColor;
    roundRect(ctx, cx - bodyW / 2, bodyY, bodyW, bodyH, 4);

    // Arms
    const armW = w * 0.12;
    const armH = bodyH * 0.75;
    ctx.fillStyle = shirtColor;
    ctx.fillRect(cx - bodyW / 2 - armW, bodyY + 4, armW, armH);
    ctx.fillRect(cx + bodyW / 2, bodyY + 4, armW, armH);
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(cx - bodyW / 2 - armW / 2, bodyY + 4 + armH, armW * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + bodyW / 2 + armW / 2, bodyY + 4 + armH, armW * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.ellipse(cx, headY + headH * 0.55, headW / 2, headH * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = hairColor;
    if (character.name === 'Hara') {
        ctx.beginPath();
        ctx.ellipse(cx, headY + headH * 0.35, headW / 2 + 2, headH * 0.45, 0, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(cx - headW / 2 - 2, headY + headH * 0.35, 4, headH * 0.6);
        ctx.fillRect(cx + headW / 2 - 2, headY + headH * 0.35, 4, headH * 0.6);
    } else if (character.name === 'Steve') {
        ctx.beginPath();
        ctx.ellipse(cx, headY + headH * 0.35, headW / 2 + 1, headH * 0.35, 0, Math.PI, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.ellipse(cx, headY + headH * 0.35, headW / 2 + 1, headH * 0.4, 0, Math.PI, Math.PI * 2);
        ctx.fill();
        for (let i = -2; i <= 2; i++) {
            ctx.fillRect(cx + i * 5 - 2, headY, 4, 5);
        }
    }

    // Eyes — bigger offset so facing is clear
    const eyeY = headY + headH * 0.5;
    const eyeSpread = headW * 0.22;
    const eyeDir = facing * 2.5;
    // Front eye is slightly bigger
    const frontEyeIdx = facing === 1 ? 1 : 0; // 0=left, 1=right
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.ellipse(cx - eyeSpread + eyeDir * 0.3, eyeY, frontEyeIdx === 0 ? 4.5 : 3.5, frontEyeIdx === 0 ? 4 : 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(cx + eyeSpread + eyeDir * 0.3, eyeY, frontEyeIdx === 1 ? 4.5 : 3.5, frontEyeIdx === 1 ? 4 : 3, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#222';
    ctx.beginPath(); ctx.arc(cx - eyeSpread + eyeDir, eyeY, 2.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cx + eyeSpread + eyeDir, eyeY, 2.2, 0, Math.PI * 2); ctx.fill();

    // Nose — small triangle pointing in facing direction
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    const noseX = cx + facing * (headW * 0.15);
    const noseY = eyeY + 4;
    ctx.moveTo(noseX, noseY - 2);
    ctx.lineTo(noseX + facing * 3, noseY + 1);
    ctx.lineTo(noseX, noseY + 3);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Mouth
    ctx.strokeStyle = '#a0604a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx + eyeDir * 0.6, eyeY + 8, 4, 0, Math.PI);
    ctx.stroke();

    // Name tag
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(character.name.toUpperCase(), cx, y - 4);

    // Idle animations — triggered after 5 seconds of no input
    if (idleTime && idleTime >= 5) {
        const t = idleTime - 5; // time since idle started
        const bob = Math.sin(t * 3) * 0.5; // gentle bob

        if (character.name === 'Steve') {
            // Steve checks his phone
            const handX = cx + facing * (bodyW / 2 + armW * 0.3);
            const handY = bodyY + bodyH * 0.45 + bob;
            // Phone body
            ctx.fillStyle = '#222';
            roundRect(ctx, handX - 5, handY - 8, 10, 16, 2);
            // Phone screen glow
            ctx.fillStyle = `rgba(100, 180, 255, ${0.6 + Math.sin(t * 2) * 0.2})`;
            ctx.fillRect(handX - 4, handY - 6, 8, 12);
            // Screen glare reflects on face
            ctx.fillStyle = `rgba(100, 180, 255, ${0.08 + Math.sin(t * 2) * 0.04})`;
            ctx.beginPath();
            ctx.ellipse(cx, headY + headH * 0.55, headW / 2, headH * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (character.name === 'Hara') {
            // Hara taps her foot impatiently
            const tapPhase = Math.floor(t * 4) % 2;
            const footY = legY + legH - 6;
            const footX = cx + legGap + legW / 2;
            // Redraw right foot with tap motion
            if (tapPhase === 0) {
                ctx.fillStyle = '#333';
                ctx.fillRect(cx + legGap - 2, footY - 3, legW + 4, 6);
            }
            // Tap lines
            if (tapPhase === 1) {
                ctx.strokeStyle = 'rgba(0,0,0,0.3)';
                ctx.lineWidth = 1;
                for (let i = 0; i < 3; i++) {
                    const lx = footX + 8 + i * 5;
                    ctx.beginPath();
                    ctx.moveTo(lx, footY + 2);
                    ctx.lineTo(lx, footY + 5 + i);
                    ctx.stroke();
                }
            }
            // Impatient expression — eyebrows
            ctx.strokeStyle = hairColor;
            ctx.lineWidth = 1.5;
            // Left eyebrow (raised)
            ctx.beginPath();
            ctx.moveTo(cx - eyeSpread - 4, eyeY - 6 - Math.sin(t * 3) * 1);
            ctx.lineTo(cx - eyeSpread + 4, eyeY - 5);
            ctx.stroke();
            // Right eyebrow
            ctx.beginPath();
            ctx.moveTo(cx + eyeSpread - 4, eyeY - 5);
            ctx.lineTo(cx + eyeSpread + 4, eyeY - 6 - Math.sin(t * 3) * 1);
            ctx.stroke();
        } else if (character.name === 'Derek') {
            // Derek plays with a toy (spins a toy on the ground)
            const toyX = cx + facing * (w * 0.4);
            const toyY = y + h - 4;
            const spin = t * 4;
            // Toy car
            ctx.save();
            ctx.translate(toyX, toyY);
            ctx.rotate(Math.sin(spin) * 0.3);
            ctx.font = `${10 + Math.sin(t * 2)}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText('🚗', 0, 0);
            ctx.restore();
            // Arm reaching down
            ctx.strokeStyle = skinColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx + facing * bodyW / 2, bodyY + bodyH * 0.5);
            ctx.lineTo(toyX, toyY - 6);
            ctx.stroke();
            // Vroom vroom text
            if (Math.floor(t * 2) % 3 === 0) {
                ctx.font = '7px monospace';
                ctx.fillStyle = 'rgba(0,0,0,0.4)';
                ctx.textAlign = 'center';
                ctx.fillText('vroom', toyX + facing * 12, toyY - 8);
            }
        } else if (character.name === 'Juno') {
            // Juno draws on the floor with a crayon
            const crayonX = cx + facing * (w * 0.35) + Math.sin(t * 3) * 5;
            const crayonY = y + h - 2;
            // Crayon
            ctx.fillStyle = character.projectileColor || '#FF69B4';
            ctx.save();
            ctx.translate(crayonX, crayonY - 4);
            ctx.rotate(facing * 0.4);
            ctx.fillRect(-2, -8, 4, 12);
            // Crayon tip
            ctx.fillStyle = darken(character.projectileColor || '#FF69B4', 30);
            ctx.beginPath();
            ctx.moveTo(-2, -8); ctx.lineTo(0, -12); ctx.lineTo(2, -8);
            ctx.fill();
            ctx.restore();
            // Drawing on ground — colorful scribble that grows
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
            // Arm reaching down
            ctx.strokeStyle = skinColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx + facing * bodyW / 2, bodyY + bodyH * 0.5);
            ctx.lineTo(crayonX, crayonY - 8);
            ctx.stroke();
        }
    }

    ctx.restore();
}
