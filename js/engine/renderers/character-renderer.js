// Character drawing — player avatar rendering
import { roundRect, darken } from './shared.js';

export function drawCharacter(ctx, x, y, w, h, character, facing, crouching) {
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

    ctx.restore();
}
