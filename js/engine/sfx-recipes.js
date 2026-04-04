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
        // Quick descending "pew" — square wave
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(900, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
        osc.connect(gain);
        gain.connect(dest);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
        osc.onended = () => { osc.disconnect(); gain.disconnect(); };
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

    collect(ctx, dest) {
        // Quick ascending arpeggio — happy "ding-ding-ding"
        const notes = [523, 659, 784]; // C5, E5, G5
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'square';
            osc.frequency.value = freq;
            const t = ctx.currentTime + i * 0.06;
            gain.gain.setValueAtTime(0.18, t);
            gain.gain.exponentialRampToValueAtTime(0.01, t + 0.1);
            osc.connect(gain);
            gain.connect(dest);
            osc.start(t);
            osc.stop(t + 0.1);
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
    }
};
