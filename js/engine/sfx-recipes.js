// SFX Recipes — Web Audio API oscillator synthesis for chiptune sound effects
// Each recipe is a function(ctx, dest) where ctx is an AudioContext
// and dest is a gain node to connect output to.

export const SFX_RECIPES = {
    jump(ctx, dest) {
        // Rising frequency sweep — classic platformer boing
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(250, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
        osc.onended = () => { osc.disconnect(); gain.disconnect(); };
    },

    shoot(ctx, dest) {
        // Snappy, punchy "pew" — faster and tighter
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.08);
        // Noise click for punch
        const bufSize = ctx.sampleRate * 0.02;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buf;
        const nGain = ctx.createGain();
        nGain.gain.setValueAtTime(0.1, ctx.currentTime);
        nGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.03);
        noise.connect(nGain);
        nGain.connect(dest);
        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.03);
        osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        noise.onended = () => { noise.disconnect(); nGain.disconnect(); };
    },

    takeDamage(ctx, dest) {
        // Low buzzy sawtooth with wobble — "ouch"
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.25);

        lfo.type = 'sine';
        lfo.frequency.value = 20;
        lfoGain.gain.value = 40;

        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);

        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime);
        lfo.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        lfo.stop(ctx.currentTime + 0.3);
        osc.onended = () => { osc.disconnect(); gain.disconnect(); lfo.disconnect(); lfoGain.disconnect(); };
    },

    giveDamage(ctx, dest) {
        // Descending impact thud + crunch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);

        // Noise burst for crunch
        const bufferSize = ctx.sampleRate * 0.06;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.15, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);
        noise.connect(noiseGain);
        noiseGain.connect(dest);
        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.06);

        osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        noise.onended = () => { noise.disconnect(); noiseGain.disconnect(); };
    },

    enemyDefeat(ctx, dest) {
        // Meaty pop + rising confirmation tone — satisfying "splat-ding"
        // Low pop
        const pop = ctx.createOscillator();
        const popGain = ctx.createGain();
        pop.type = 'triangle';
        pop.frequency.setValueAtTime(300, ctx.currentTime);
        pop.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);
        popGain.gain.setValueAtTime(0.35, ctx.currentTime);
        popGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        pop.connect(popGain);
        popGain.connect(dest);
        pop.start(ctx.currentTime);
        pop.stop(ctx.currentTime + 0.1);

        // Noise crunch
        const bufSize = ctx.sampleRate * 0.05;
        const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buf;
        const nGain = ctx.createGain();
        nGain.gain.setValueAtTime(0.2, ctx.currentTime);
        nGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        noise.connect(nGain);
        nGain.connect(dest);
        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.05);

        // Rising confirmation tone
        const conf = ctx.createOscillator();
        const confGain = ctx.createGain();
        conf.type = 'square';
        conf.frequency.setValueAtTime(500, ctx.currentTime + 0.05);
        conf.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.12);
        confGain.gain.setValueAtTime(0.15, ctx.currentTime + 0.05);
        confGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
        conf.connect(confGain);
        confGain.connect(dest);
        conf.start(ctx.currentTime + 0.05);
        conf.stop(ctx.currentTime + 0.15);

        pop.onended = () => { pop.disconnect(); popGain.disconnect(); };
        noise.onended = () => { noise.disconnect(); nGain.disconnect(); };
        conf.onended = () => { conf.disconnect(); confGain.disconnect(); };
    },

    bounceCombo(ctx, dest) {
        // Ascending triumphant chirp — rewards chained stomps
        const notes = [880, 1175, 1397]; // A5, D6, F6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            const t = ctx.currentTime + i * 0.04;
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.08);
            osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        });
    },

    collect(ctx, dest) {
        // Snappy ascending chime — bright and quick
        const notes = [659, 880]; // E5, A5
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            const t = ctx.currentTime + i * 0.04;
            gain.gain.setValueAtTime(0.22, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.08);
            osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        });
    },

    collectCombo1(ctx, dest) {
        // 2-3 combo — higher pitch
        const notes = [784, 988]; // G5, B5
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            const t = ctx.currentTime + i * 0.035;
            gain.gain.setValueAtTime(0.22, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.07);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.07);
            osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        });
    },

    collectCombo2(ctx, dest) {
        // 3-4 combo — even higher, 3 notes
        const notes = [988, 1175, 1319]; // B5, D6, E6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            const t = ctx.currentTime + i * 0.03;
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.06);
            osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        });
    },

    collectCombo3(ctx, dest) {
        // 5+ combo — sparkling arpeggio
        const notes = [1319, 1568, 1760, 2093]; // E6, G6, A6, C7
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            const t = ctx.currentTime + i * 0.025;
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.06);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.06);
            osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        });
    },

    bossDefeated(ctx, dest) {
        // Victory fanfare — descending triumphant notes
        const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            const t = ctx.currentTime + i * 0.15;
            gain.gain.setValueAtTime(0.25, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.4);
            osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        });
    },

    playerDeath(ctx, dest) {
        // Sad descending tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.7);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.7);
        osc.onended = () => { osc.disconnect(); gain.disconnect(); };
    },

    heartbeat(ctx, dest) {
        // Double thump — "lub-dub" heartbeat
        for (let i = 0; i < 2; i++) {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            const t = ctx.currentTime + i * 0.15;
            osc.frequency.setValueAtTime(i === 0 ? 60 : 45, t);
            osc.frequency.exponentialRampToValueAtTime(30, t + 0.12);
            gain.gain.setValueAtTime(0.2, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.15);
            osc.onended = () => { osc.disconnect(); gain.disconnect(); };
        }
    },

    phaseTransition(ctx, dest) {
        // Deep rumble + rising tone — boss powers up
        const rumble = ctx.createOscillator();
        const rumbleGain = ctx.createGain();
        rumble.type = 'sawtooth';
        rumble.frequency.setValueAtTime(40, ctx.currentTime);
        rumble.frequency.linearRampToValueAtTime(80, ctx.currentTime + 0.4);
        rumbleGain.gain.setValueAtTime(0.25, ctx.currentTime);
        rumbleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        rumble.connect(rumbleGain);
        rumbleGain.connect(dest);
        rumble.start(ctx.currentTime);
        rumble.stop(ctx.currentTime + 0.5);

        const rise = ctx.createOscillator();
        const riseGain = ctx.createGain();
        rise.type = 'square';
        rise.frequency.setValueAtTime(200, ctx.currentTime + 0.1);
        rise.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.5);
        riseGain.gain.setValueAtTime(0.12, ctx.currentTime + 0.1);
        riseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.55);
        rise.connect(riseGain);
        riseGain.connect(dest);
        rise.start(ctx.currentTime + 0.1);
        rise.stop(ctx.currentTime + 0.55);

        rumble.onended = () => { rumble.disconnect(); rumbleGain.disconnect(); };
        rise.onended = () => { rise.disconnect(); riseGain.disconnect(); };
    },

    platformCrumble(ctx, dest) {
        // Short creak/crack — descending noise burst
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
        osc.onended = () => { osc.disconnect(); gain.disconnect(); };
    },

    platformBreak(ctx, dest) {
        // Crumble/collapse — low rumble with crunch
        const noise = ctx.createOscillator();
        const noiseGain = ctx.createGain();
        noise.type = 'sawtooth';
        noise.frequency.setValueAtTime(150, ctx.currentTime);
        noise.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);
        noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        noise.connect(noiseGain);
        noiseGain.connect(dest);
        noise.start(ctx.currentTime);
        noise.stop(ctx.currentTime + 0.35);
        // Crunch overlay
        const crunch = ctx.createOscillator();
        const crunchGain = ctx.createGain();
        crunch.type = 'square';
        crunch.frequency.setValueAtTime(80, ctx.currentTime);
        crunch.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 0.15);
        crunchGain.gain.setValueAtTime(0.12, ctx.currentTime);
        crunchGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
        crunch.connect(crunchGain);
        crunchGain.connect(dest);
        crunch.start(ctx.currentTime);
        crunch.stop(ctx.currentTime + 0.2);
        noise.onended = () => { noise.disconnect(); noiseGain.disconnect(); };
        crunch.onended = () => { crunch.disconnect(); crunchGain.disconnect(); };
    }
};
