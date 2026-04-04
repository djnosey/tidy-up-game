// AudioManager — SFX synthesis + MIDI music playback
// SFX: Web Audio API oscillators (retro chiptune style)
// Music: midi-player-js + soundfont-player (loaded via CDN)

export class AudioManager {
    constructor() {
        this.ctx = null;
        this.masterGain = null;
        this.sfxGain = null;
        this.musicGain = null;
        this.muted = false;
        this.sfxVolume = 0.15;
        this.musicVolume = 1.0;

        // MIDI playback state
        this.midiPlayer = null;
        this.instruments = {};       // soundfont instrument instances by name
        this.activeNotes = {};
        this.currentMidiFile = null;
        this.midiFiles = {};
        this.loadingMusic = false;
        this.channelPrograms = {};   // tracks program changes per channel

        // Per-file track gain (configured via MIDI Mixer)
        this.trackGains = {
            'assets/music/level1.mid': {
                1: 1.37,  // lead_1_square
                2: 2.25,  // synth_bass_2
                3: 0.69,  // pad_3_polysynth
            },
            'assets/music/level2.mid': {
                2: 1.25,  // lead_1_square
                3: 2.11,  // synth_bass_2
                4: 0.49,  // electric_piano_1
                5: 1.37,  // synth_drum
            },
            'assets/music/level3.mid': {
                1: 1.0,   // xylophone
            },
            'assets/music/level4.mid': {
                2: 1.72,  // lead_1_square
                3: 1.31,  // orchestral_harp
                4: 1.0,   // acoustic_grand_piano
                5: 1.98,  // synth_bass_2
            },
            'assets/music/level5.mid': {
                1: 1.74,  // acoustic_grand_piano
                2: 1.98,  // synth_brass_1
                3: 1.98,  // synth_drum
            },
            'assets/music/level6.mid': {
                4: 1.0,   // acoustic_grand_piano
            },
            'assets/music/boss.mid': {
                1: 1.0,   // acoustic_guitar_nylon
                2: 1.0,   // synth_drum
                3: 1.69,  // lead_1_square
                5: 1.29,  // synth_bass_2
            },
        };

        // Per-file instrument overrides (configured via MIDI Mixer)
        this.instrumentOverrides = {
            'assets/music/level1.mid': {
                1: 'lead_1_square',
                2: 'synth_bass_2',
                3: 'pad_3_polysynth',
            },
            'assets/music/level2.mid': {
                2: 'lead_1_square',
                3: 'synth_bass_2',
                4: 'electric_piano_1',
                5: 'synth_drum',
            },
            'assets/music/level3.mid': {
                1: 'xylophone',
            },
            'assets/music/level4.mid': {
                2: 'lead_1_square',
                3: 'orchestral_harp',
                4: 'acoustic_grand_piano',
                5: 'synth_bass_2',
            },
            'assets/music/level5.mid': {
                1: 'acoustic_grand_piano',
                2: 'synth_brass_1',
                3: 'synth_drum',
            },
            'assets/music/level6.mid': {
                4: 'acoustic_grand_piano',
            },
            'assets/music/boss.mid': {
                1: 'acoustic_guitar_nylon',
                2: 'synth_drum',
                3: 'lead_1_square',
                5: 'synth_bass_2',
            },
        };
    }

    init() {
        if (this.ctx) return;
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();

        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);

        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.sfxVolume;
        this.sfxGain.connect(this.masterGain);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = this.musicVolume;
        this.musicGain.connect(this.masterGain);

        // Resume if suspended (autoplay policy)
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        // Preload soundfont instruments
        this._initSoundfonts();
    }

    async _loadInstrument(name) {
        if (this.instruments[name]) return this.instruments[name];
        if (!window.Soundfont) return null;
        try {
            const inst = await Soundfont.instrument(this.ctx, name, {
                soundfont: 'MusyngKite',
                destination: this.musicGain
            });
            this.instruments[name] = inst;
            return inst;
        } catch (e) {
            console.warn('Soundfont load failed:', name, e);
            return null;
        }
    }

    async _initSoundfonts() {
        // Load core instrument set in parallel
        const needed = [
            'acoustic_grand_piano',
            'electric_bass_finger',
            'slap_bass_1',
            'synth_bass_1',
            'synth_bass_2',
            'overdriven_guitar',
            'distortion_guitar',
            'acoustic_guitar_nylon',
            'synth_brass_1',
            'brass_section',
            'trumpet',
            'lead_1_square',
            'lead_2_sawtooth',
            'pad_2_warm',
            'pad_3_polysynth',
            'choir_aahs',
            'string_ensemble_1',
            'vibraphone',
            'xylophone',
            'orchestral_harp',
            'koto',
            'electric_piano_1',
            'synth_drum',
        ];
        await Promise.all(needed.map(n => this._loadInstrument(n)));
    }

    // Map GM program numbers to soundfont instrument names
    _programToInstrument(program) {
        // General MIDI program number → soundfont name
        const map = {
            0: 'acoustic_grand_piano',
            1: 'acoustic_grand_piano',
            2: 'electric_piano_1',
            3: 'electric_piano_1',
            4: 'electric_piano_1',
            5: 'electric_piano_1',
            10: 'vibraphone',
            11: 'vibraphone',
            24: 'acoustic_guitar_nylon',
            25: 'acoustic_guitar_nylon',
            26: 'acoustic_guitar_nylon',
            27: 'acoustic_guitar_nylon',
            28: 'acoustic_guitar_nylon',
            29: 'overdriven_guitar',
            30: 'distortion_guitar',
            31: 'distortion_guitar',
            32: 'electric_bass_finger',
            33: 'electric_bass_finger',
            34: 'electric_bass_finger',
            35: 'electric_bass_finger',
            36: 'slap_bass_1',
            37: 'slap_bass_1',
            38: 'synth_bass_1',
            39: 'synth_bass_1',
            48: 'string_ensemble_1',
            49: 'string_ensemble_1',
            50: 'string_ensemble_1',
            51: 'string_ensemble_1',
            52: 'choir_aahs',
            53: 'choir_aahs',
            54: 'choir_aahs',
            56: 'trumpet',
            57: 'trumpet',
            60: 'brass_section',
            61: 'brass_section',
            62: 'synth_brass_1',
            63: 'synth_brass_1',
            80: 'lead_1_square',
            81: 'lead_2_sawtooth',
            82: 'lead_1_square',
            83: 'lead_2_sawtooth',
            88: 'pad_2_warm',
            89: 'pad_2_warm',
            90: 'pad_2_warm',
            91: 'pad_2_warm',
            107: 'koto',
            118: 'synth_drum',
        };
        return map[program] || 'acoustic_grand_piano';
    }

    _getInstrumentForEvent(event) {
        // Channel 9 (10 in 1-indexed) is always drums
        const ch = event.channel - 1; // midi-player-js uses 1-indexed channels
        if (ch === 9) return this.instruments['synth_drum'] || this.instruments['acoustic_grand_piano'];

        const program = this.channelPrograms[ch];
        if (program !== undefined) {
            const name = this._programToInstrument(program);
            if (this.instruments[name]) return this.instruments[name];
        }
        return this.instruments['acoustic_grand_piano'];
    }

    resume() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        if (this.masterGain) {
            this.masterGain.gain.value = this.muted ? 0 : 1;
        }
    }

    // ─── Sound Effects ───────────────────────────────────────

    playSFX(name) {
        if (!this.ctx) return;
        const recipe = SFX_RECIPES[name];
        if (recipe) recipe(this.ctx, this.sfxGain);
    }

    // ─── MIDI Music ──────────────────────────────────────────

    async playMusic(levelIndex) {
        if (!this.ctx) return;
        this.stopMusic();

        const fileMap = [
            'assets/music/level1.mid',
            'assets/music/level2.mid',
            'assets/music/level3.mid',
            'assets/music/level4.mid',
            'assets/music/level5.mid',
            'assets/music/level6.mid',
        ];

        const path = fileMap[levelIndex];
        if (!path) return;
        await this._playMidiFile(path);
    }

    async playBossMusic() {
        if (!this.ctx) return;
        this.stopMusic();
        await this._playMidiFile('assets/music/boss.mid');
    }

    async _playMidiFile(path) {
        const hasInstruments = Object.keys(this.instruments).length > 0;
        if (!window.MidiPlayer || !hasInstruments) {
            // Retry if instruments aren't loaded yet
            if (!hasInstruments && window.Soundfont) {
                await this._initSoundfonts();
            }
            if (!window.MidiPlayer || Object.keys(this.instruments).length === 0) return;
        }

        this.loadingMusic = true;
        this.channelPrograms = {};

        try {
            // Fetch MIDI file
            let arrayBuffer = this.midiFiles[path];
            if (!arrayBuffer) {
                const response = await fetch(path);
                if (!response.ok) {
                    console.warn('MIDI file not found:', path);
                    this.loadingMusic = false;
                    return;
                }
                arrayBuffer = await response.arrayBuffer();
                this.midiFiles[path] = arrayBuffer;
            }

            // Create player
            const player = new MidiPlayer.Player();
            this.midiPlayer = player;
            this.currentMidiFile = path;

            // Handle MIDI events
            player.on('midiEvent', (event) => {
                // Track program changes to know which instrument each channel uses
                if (event.name === 'Program Change') {
                    const ch = event.channel - 1;
                    this.channelPrograms[ch] = event.value;
                    return;
                }

                if (event.name === 'Note on' && event.velocity > 0) {
                    // Check per-file instrument override first, then fall back to program map
                    const overrides = this.instrumentOverrides ? this.instrumentOverrides[path] : null;
                    const overrideName = overrides ? overrides[event.track] : null;
                    const instrument = overrideName && this.instruments[overrideName]
                        ? this.instruments[overrideName]
                        : this._getInstrumentForEvent(event);
                    if (!instrument) return;

                    const fileGains = this.trackGains[path] || {};
                    const trackMult = fileGains[event.track] !== undefined ? fileGains[event.track] : 1.0;
                    const note = instrument.play(event.noteName, this.ctx.currentTime, {
                        gain: (event.velocity / 127) * 1.5 * trackMult,
                        duration: 2
                    });
                    if (note) {
                        const key = `${event.track}-${event.noteNumber}`;
                        this.activeNotes[key] = note;
                    }
                } else if (event.name === 'Note off' || (event.name === 'Note on' && event.velocity === 0)) {
                    const key = `${event.track}-${event.noteNumber}`;
                    if (this.activeNotes[key]) {
                        try { this.activeNotes[key].stop(); } catch (e) { /* already stopped */ }
                        delete this.activeNotes[key];
                    }
                }
            });

            // Loop when finished
            player.on('endOfFile', () => {
                player.stop();
                // Small delay before restarting to avoid glitches
                setTimeout(() => {
                    if (this.midiPlayer === player && this.currentMidiFile === path) {
                        player.loadArrayBuffer(arrayBuffer);
                        player.play();
                    }
                }, 200);
            });

            player.loadArrayBuffer(arrayBuffer);
            player.play();
        } catch (e) {
            console.warn('MIDI playback error:', e);
        }
        this.loadingMusic = false;
    }

    stopMusic(fadeOut = false) {
        // Stop all active notes
        for (const key in this.activeNotes) {
            try { this.activeNotes[key].stop(); } catch (e) { /* ok */ }
        }
        this.activeNotes = {};

        if (this.midiPlayer) {
            this.midiPlayer.stop();
            this.midiPlayer = null;
        }
        this.currentMidiFile = null;

        if (fadeOut && this.musicGain) {
            this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, this.ctx.currentTime);
            this.musicGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
            setTimeout(() => {
                if (this.musicGain) this.musicGain.gain.value = this.musicVolume;
            }, 600);
        }
    }
}

// ─── SFX Recipes ─────────────────────────────────────────────

const SFX_RECIPES = {
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
