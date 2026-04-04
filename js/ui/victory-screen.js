// Victory / Credits screen — shown after beating the final boss (BBQ Dragon)
// Falling mess items rain down while credits scroll with ~100 roles,
// ALL credited to Derek Jarvis Payne Pozo

const CREDIT_NAME = 'Derek Jarvis Payne Pozo';

const CREDITS = [
    { type: 'title', text: 'TIDY UP!' },
    { type: 'subtitle', text: 'A Jarvis-Payne-Pozo Family Production' },
    { type: 'spacer' },

    // --- Story & Narrative ---
    { type: 'section', text: '— Story & Narrative —' },
    { type: 'role', role: 'Story & Concept', name: CREDIT_NAME },
    { type: 'role', role: 'Lead Narrative Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Screenplay', name: CREDIT_NAME },
    { type: 'role', role: 'Dialogue Writer', name: CREDIT_NAME },
    { type: 'role', role: 'Lore Master', name: CREDIT_NAME },
    { type: 'role', role: 'World Building Director', name: CREDIT_NAME },
    { type: 'role', role: 'Character Backstory Author', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Game Design ---
    { type: 'section', text: '— Game Design —' },
    { type: 'role', role: 'Creative Director', name: CREDIT_NAME },
    { type: 'role', role: 'Lead Game Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Level Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Systems Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Combat Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Boss Encounter Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Economy & Progression Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Difficulty Balancer', name: CREDIT_NAME },
    { type: 'role', role: 'Player Experience Director', name: CREDIT_NAME },
    { type: 'role', role: 'Tutorial Designer', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Art & Visual ---
    { type: 'section', text: '— Art & Visual —' },
    { type: 'role', role: 'Art Director', name: CREDIT_NAME },
    { type: 'role', role: 'Lead Character Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Character Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Boss Character Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Enemy Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Environment Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Background Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Parallax Layer Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Platform & Prop Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Visual Effects Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Particle Effects Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Lighting Designer', name: CREDIT_NAME },
    { type: 'role', role: 'UI/UX Designer', name: CREDIT_NAME },
    { type: 'role', role: 'HUD Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Menu Screen Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Concept Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Colour Palette Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Typography & Font Selection', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Animation ---
    { type: 'section', text: '— Animation —' },
    { type: 'role', role: 'Lead Animator', name: CREDIT_NAME },
    { type: 'role', role: 'Character Animator', name: CREDIT_NAME },
    { type: 'role', role: 'Boss Animation Director', name: CREDIT_NAME },
    { type: 'role', role: 'Enemy Behaviour Animator', name: CREDIT_NAME },
    { type: 'role', role: 'Environmental Animation', name: CREDIT_NAME },
    { type: 'role', role: 'Procedural Animation Engineer', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Engineering ---
    { type: 'section', text: '— Engineering —' },
    { type: 'role', role: 'Lead Engine Programmer', name: CREDIT_NAME },
    { type: 'role', role: 'Gameplay Programmer', name: CREDIT_NAME },
    { type: 'role', role: 'Physics & Collision Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Camera Systems Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Rendering Pipeline Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Canvas 2D Specialist', name: CREDIT_NAME },
    { type: 'role', role: 'Input Systems Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'AI & Pathfinding Programmer', name: CREDIT_NAME },
    { type: 'role', role: 'Boss AI Programmer', name: CREDIT_NAME },
    { type: 'role', role: 'Enemy AI Programmer', name: CREDIT_NAME },
    { type: 'role', role: 'Particle System Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Parallax Scroll Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Lighting System Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Audio Engine Programmer', name: CREDIT_NAME },
    { type: 'role', role: 'Event System Architect', name: CREDIT_NAME },
    { type: 'role', role: 'State Machine Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Performance Optimisation Lead', name: CREDIT_NAME },
    { type: 'role', role: 'Asset Pipeline Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Build & Deployment Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Tools Programmer', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Audio & Music ---
    { type: 'section', text: '— Audio & Music —' },
    { type: 'role', role: 'Music Composer', name: CREDIT_NAME },
    { type: 'role', role: 'Sound Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Sound Effects Editor', name: CREDIT_NAME },
    { type: 'role', role: 'Audio Director', name: CREDIT_NAME },
    { type: 'role', role: 'Foley Artist', name: CREDIT_NAME },
    { type: 'role', role: 'Audio Mixing Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Boss Battle Music Composer', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Production ---
    { type: 'section', text: '— Production —' },
    { type: 'role', role: 'Executive Producer', name: CREDIT_NAME },
    { type: 'role', role: 'Producer', name: CREDIT_NAME },
    { type: 'role', role: 'Associate Producer', name: CREDIT_NAME },
    { type: 'role', role: 'Project Manager', name: CREDIT_NAME },
    { type: 'role', role: 'Scrum Master', name: CREDIT_NAME },
    { type: 'role', role: 'Product Owner', name: CREDIT_NAME },
    { type: 'role', role: 'Release Manager', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- QA & Testing ---
    { type: 'section', text: '— Quality Assurance —' },
    { type: 'role', role: 'QA Lead', name: CREDIT_NAME },
    { type: 'role', role: 'Gameplay Tester', name: CREDIT_NAME },
    { type: 'role', role: 'Boss Fight Tester', name: CREDIT_NAME },
    { type: 'role', role: 'Regression Tester', name: CREDIT_NAME },
    { type: 'role', role: 'Accessibility Tester', name: CREDIT_NAME },
    { type: 'role', role: 'Performance Tester', name: CREDIT_NAME },
    { type: 'role', role: 'Bug Reporter & Fixer', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Localisation & Culture ---
    { type: 'section', text: '— Localisation & Cultural —' },
    { type: 'role', role: 'Catalan Cultural Consultant', name: CREDIT_NAME },
    { type: 'role', role: 'Barcelona Architecture Advisor', name: CREDIT_NAME },
    { type: 'role', role: 'Mediterranean Interior Design Consultant', name: CREDIT_NAME },
    { type: 'role', role: 'Spanish Household Items Researcher', name: CREDIT_NAME },
    { type: 'role', role: 'Molins de Rei Location Scout', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Marketing & Community ---
    { type: 'section', text: '— Marketing & Community —' },
    { type: 'role', role: 'Marketing Director', name: CREDIT_NAME },
    { type: 'role', role: 'Community Manager', name: CREDIT_NAME },
    { type: 'role', role: 'Social Media Manager', name: CREDIT_NAME },
    { type: 'role', role: 'Trailer Editor', name: CREDIT_NAME },
    { type: 'role', role: 'Press Kit Designer', name: CREDIT_NAME },
    { type: 'role', role: 'Brand Ambassador', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Special Roles ---
    { type: 'section', text: '— Special Roles —' },
    { type: 'role', role: 'Chief Tidying Officer', name: CREDIT_NAME },
    { type: 'role', role: 'Head of Mess Management', name: CREDIT_NAME },
    { type: 'role', role: 'Roomba Wrangler', name: CREDIT_NAME },
    { type: 'role', role: 'Cola Cao Consultant', name: CREDIT_NAME },
    { type: 'role', role: 'Paella Pan Authenticity Inspector', name: CREDIT_NAME },
    { type: 'role', role: 'Sagrada Familia Silhouette Verifier', name: CREDIT_NAME },
    { type: 'role', role: 'Bougainvillea Colour Calibrator', name: CREDIT_NAME },
    { type: 'role', role: 'Cat Nap Choreographer', name: CREDIT_NAME },
    { type: 'role', role: 'LEGO Brick Scattering Specialist', name: CREDIT_NAME },
    { type: 'role', role: 'Rubber Duck Placement Consultant', name: CREDIT_NAME },
    { type: 'role', role: 'BBQ Dragon Flame Tuner', name: CREDIT_NAME },
    { type: 'role', role: 'Estrella Damm Glass Renderer', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Infrastructure ---
    { type: 'section', text: '— Infrastructure —' },
    { type: 'role', role: 'IT Director', name: CREDIT_NAME },
    { type: 'role', role: 'DevOps Engineer', name: CREDIT_NAME },
    { type: 'role', role: 'Web Server Administrator', name: CREDIT_NAME },
    { type: 'role', role: 'Version Control Manager', name: CREDIT_NAME },
    { type: 'role', role: 'Continuous Integration Engineer', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Legal & Business ---
    { type: 'section', text: '— Legal & Business —' },
    { type: 'role', role: 'CEO', name: CREDIT_NAME },
    { type: 'role', role: 'CFO', name: CREDIT_NAME },
    { type: 'role', role: 'Legal Counsel', name: CREDIT_NAME },
    { type: 'role', role: 'Business Development', name: CREDIT_NAME },
    { type: 'role', role: 'Investor Relations', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Office & Facilities ---
    { type: 'section', text: '— Office & Facilities —' },
    { type: 'role', role: 'Office Manager', name: CREDIT_NAME },
    { type: 'role', role: 'Catering (Coffee & Snacks)', name: CREDIT_NAME },
    { type: 'role', role: 'Studio Janitor', name: CREDIT_NAME },
    { type: 'role', role: 'Office Plant Waterer', name: CREDIT_NAME },
    { type: 'role', role: 'Ergonomic Chair Tester', name: CREDIT_NAME },
    { type: 'spacer' },

    // --- Special Thanks ---
    { type: 'section', text: '— Special Thanks —' },
    { type: 'role', role: 'Emotional Support', name: CREDIT_NAME },
    { type: 'role', role: 'Late Night Debugging Partner', name: CREDIT_NAME },
    { type: 'role', role: 'Chief Playtester & Critic', name: CREDIT_NAME },
    { type: 'role', role: 'Motivational Speaker', name: CREDIT_NAME },
    { type: 'role', role: 'Rubber Duck Debugger', name: CREDIT_NAME },
    { type: 'spacer' },
    { type: 'spacer' },

    { type: 'section', text: '— Dedicated To —' },
    { type: 'dedication', text: 'The Jarvis-Payne-Pozo family' },
    { type: 'dedication', text: 'and their beautiful casa de pueblo' },
    { type: 'dedication', text: 'in Molins de Rei, Barcelona' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'title', text: 'THE HOUSE IS TIDY!' },
    { type: 'subtitle', text: '...for now.' },
    { type: 'spacer' },
    { type: 'spacer' },
    { type: 'footer', text: 'Thanks for playing!' },
    { type: 'footer', text: 'Press ENTER to return to menu' },
];

// Falling mess items — emojis that rain down during credits
const MESS_ITEMS = [
    '🧦', '👟', '🧸', '🎮', '📕', '🖍️', '🧩', '🎲', '🧹', '🪣',
    '🧴', '🧼', '🪥', '🧽', '🧶', '📰', '🗞️', '✏️', '🖊️', '📎',
    '🔑', '🧲', '🎈', '🪀', '🎯', '🧱', '🪆', '🎪', '🥾', '🧤',
    '🧣', '👒', '🪠', '🔧', '🪛', '🔨', '🪜', '🧰', '📦', '🗑️',
    '🥫', '🍋', '🍊', '☕', '🫖', '🥖', '🧈', '🧅', '🫒', '🧄',
    '🪴', '🌿', '🪻', '🌺', '🌸', '🕯️', '🖼️', '📷', '🕰️', '📻',
];

export class VictoryScreen {
    constructor() {
        this.active = false;
        this.timer = 0;
        this.scrollY = 0;
        this.fallingItems = [];
        this.messSpawnTimer = 0;
        this.fadeIn = 0;
        this.canContinue = false;
        // Stinger state
        this.phase = 'credits'; // 'credits', 'stinger_fade', 'stinger', 'stinger_done'
        this.stingerTimer = 0;
        this.stingerDoorbellPlayed = false;
    }

    start() {
        this.active = true;
        this.timer = 0;
        this.scrollY = 0;
        this.fallingItems = [];
        this.messSpawnTimer = 0;
        this.fadeIn = 0;
        this.canContinue = false;
        this.phase = 'credits';
        this.stingerTimer = 0;
        this.stingerDoorbellPlayed = false;
    }

    stop() {
        this.active = false;
    }

    handleInput(input) {
        if (!this.active) return false;
        if (this.phase === 'stinger_done' && (input.wasPressed('Enter') || input.wasPressed(' '))) {
            return true;
        }
        // During credits, allow skipping into stinger
        if (this.phase === 'credits' && this.canContinue && (input.wasPressed('Enter') || input.wasPressed(' '))) {
            this.phase = 'stinger_fade';
            this.stingerTimer = 0;
            return false;
        }
        return false;
    }

    update(dt) {
        if (!this.active) return;
        this.timer += dt;

        if (this.phase === 'credits') {
            // Fade in over first 2 seconds
            this.fadeIn = Math.min(1, this.timer / 2);

            // Start scrolling after 2 seconds
            if (this.timer > 2) {
                this.scrollY += dt * 35; // scroll speed
            }

            // Spawn falling mess items
            this.messSpawnTimer -= dt;
            if (this.messSpawnTimer <= 0 && this.timer > 1) {
                this.messSpawnTimer = 0.15 + Math.random() * 0.2;
                this.fallingItems.push({
                    emoji: MESS_ITEMS[Math.floor(Math.random() * MESS_ITEMS.length)],
                    x: Math.random() * 960,
                    y: -30,
                    vy: 40 + Math.random() * 60,
                    vx: (Math.random() - 0.5) * 30,
                    rotation: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 2,
                    size: 16 + Math.random() * 16,
                    alpha: 0.3 + Math.random() * 0.3,
                });
            }

            // Update falling items
            for (const item of this.fallingItems) {
                item.y += item.vy * dt;
                item.x += item.vx * dt;
                item.rotation += item.rotSpeed * dt;
            }
            this.fallingItems = this.fallingItems.filter(item => item.y < 650);

            // Calculate total credit height to know when scrolling is done
            const totalHeight = this._getTotalCreditHeight();
            if (this.scrollY > totalHeight + 100) {
                this.canContinue = true;
            }
            if (this.timer > 15) {
                this.canContinue = true;
            }

            // Auto-transition to stinger after credits fully scrolled + pause
            if (this.scrollY > totalHeight + 300) {
                this.phase = 'stinger_fade';
                this.stingerTimer = 0;
            }
        } else if (this.phase === 'stinger_fade') {
            // Fade to black before stinger
            this.stingerTimer += dt;
            if (this.stingerTimer >= 2) {
                this.phase = 'stinger';
                this.stingerTimer = 0;
            }
        } else if (this.phase === 'stinger') {
            this.stingerTimer += dt;
            // After full stinger sequence, allow continue
            if (this.stingerTimer >= 14) {
                this.phase = 'stinger_done';
            }
        }
    }

    _getTotalCreditHeight() {
        let y = 0;
        for (const entry of CREDITS) {
            switch (entry.type) {
                case 'title': y += 70; break;
                case 'subtitle': y += 40; break;
                case 'section': y += 50; break;
                case 'role': y += 30; break;
                case 'dedication': y += 30; break;
                case 'footer': y += 30; break;
                case 'spacer': y += 30; break;
            }
        }
        return y;
    }

    render(ctx, w, h) {
        if (!this.active) return;

        if (this.phase === 'credits') {
            this._renderCredits(ctx, w, h);
        } else if (this.phase === 'stinger_fade') {
            // Fade to full black
            const fadeAlpha = Math.min(1, this.stingerTimer / 1.5);
            this._renderCredits(ctx, w, h);
            ctx.fillStyle = `rgba(0, 0, 0, ${fadeAlpha})`;
            ctx.fillRect(0, 0, w, h);
        } else if (this.phase === 'stinger' || this.phase === 'stinger_done') {
            this._renderStinger(ctx, w, h);
        }
    }

    _renderCredits(ctx, w, h) {
        // Black background with fade-in
        ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeIn * 0.92})`;
        ctx.fillRect(0, 0, w, h);

        // Falling mess items (behind credits text)
        for (const item of this.fallingItems) {
            ctx.save();
            ctx.globalAlpha = item.alpha * this.fadeIn;
            ctx.translate(item.x, item.y);
            ctx.rotate(item.rotation);
            ctx.font = `${item.size}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.fillText(item.emoji, 0, 0);
            ctx.restore();
        }

        // Credits text — scrolling upward from the bottom
        ctx.save();
        ctx.textAlign = 'center';
        ctx.globalAlpha = this.fadeIn;

        const startY = h + 60 - this.scrollY; // start below screen, scroll up
        let y = startY;

        for (const entry of CREDITS) {
            // Skip if way off screen (performance)
            if (y > h + 60) { y += this._entryHeight(entry); continue; }
            if (y < -60) { y += this._entryHeight(entry); continue; }

            switch (entry.type) {
                case 'title':
                    ctx.font = 'bold 52px sans-serif';
                    ctx.fillStyle = '#FFD700';
                    ctx.fillText(entry.text, w / 2, y);
                    y += 70;
                    break;
                case 'subtitle':
                    ctx.font = 'italic 20px sans-serif';
                    ctx.fillStyle = '#CCCCCC';
                    ctx.fillText(entry.text, w / 2, y);
                    y += 40;
                    break;
                case 'section':
                    ctx.font = 'bold 18px monospace';
                    ctx.fillStyle = '#88CCFF';
                    ctx.fillText(entry.text, w / 2, y);
                    y += 50;
                    break;
                case 'role':
                    // Role title in grey
                    ctx.font = '13px monospace';
                    ctx.fillStyle = '#999';
                    ctx.fillText(entry.role, w / 2, y);
                    // Name in white/gold below
                    ctx.font = 'bold 15px sans-serif';
                    ctx.fillStyle = '#FFFFFF';
                    ctx.fillText(entry.name, w / 2, y + 16);
                    y += 38;
                    break;
                case 'dedication':
                    ctx.font = 'italic 18px sans-serif';
                    ctx.fillStyle = '#FFCCAA';
                    ctx.fillText(entry.text, w / 2, y);
                    y += 30;
                    break;
                case 'footer':
                    const blink = entry.text.includes('ENTER') ? (Math.sin(Date.now() / 400) > 0 ? 1 : 0) : 1;
                    ctx.font = '16px monospace';
                    ctx.fillStyle = entry.text.includes('ENTER') ? `rgba(255, 215, 0, ${blink})` : '#AAAAAA';
                    ctx.fillText(entry.text, w / 2, y);
                    y += 30;
                    break;
                case 'spacer':
                    y += 30;
                    break;
            }
        }

        ctx.restore();

        // "Press ENTER" hint at bottom once scrolling is done
        if (this.canContinue) {
            const blink = Math.sin(Date.now() / 400) > 0;
            if (blink) {
                ctx.save();
                ctx.textAlign = 'center';
                ctx.font = '14px monospace';
                ctx.fillStyle = '#FFD700';
                ctx.fillText('Press ENTER to continue', w / 2, h - 20);
                ctx.restore();
            }
        }
    }

    _renderStinger(ctx, w, h) {
        const t = this.stingerTimer;
        ctx.textAlign = 'center';

        // === Scene 1 (0-3s): Black screen, "Later that evening..." text fades in ===
        if (t < 3) {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, w, h);
            const alpha = t < 0.5 ? t / 0.5 : (t > 2.5 ? 1 - (t - 2.5) / 0.5 : 1);
            ctx.globalAlpha = Math.max(0, alpha);
            ctx.font = 'italic 22px sans-serif';
            ctx.fillStyle = '#CCCCCC';
            ctx.fillText('Later that evening...', w / 2, h / 2);
            ctx.globalAlpha = 1;
            return;
        }

        // === Scene 2 (3-6s): Family relaxing, then DING DONG! ===
        if (t < 6) {
            const st = t - 3;
            // Cozy living room background
            ctx.fillStyle = '#2A1F14';
            ctx.fillRect(0, 0, w, h);
            // Warm glow
            const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, 350);
            grad.addColorStop(0, 'rgba(255, 200, 100, 0.15)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, w, h);

            // Floor
            ctx.fillStyle = '#4A3828';
            ctx.fillRect(0, h * 0.7, w, h * 0.3);

            // Sofa
            ctx.fillStyle = '#6B4226';
            ctx.fillRect(w / 2 - 160, h * 0.52, 320, 80);
            ctx.fillStyle = '#7B5236';
            ctx.fillRect(w / 2 - 150, h * 0.48, 300, 40);
            // Sofa back
            ctx.fillStyle = '#5B3216';
            ctx.fillRect(w / 2 - 160, h * 0.38, 320, 70);

            // Family on sofa — relaxed emojis
            ctx.font = '28px sans-serif';
            ctx.fillText('😌', w / 2 - 100, h * 0.50);  // Steve relaxing
            ctx.fillText('😊', w / 2 - 30, h * 0.49);    // Hara smiling
            ctx.fillText('😴', w / 2 + 40, h * 0.50);     // Derek asleep
            ctx.fillText('🎨', w / 2 + 100, h * 0.50);    // Juno drawing

            // "Ahh, finally clean" text
            if (st > 0.5 && st < 2.5) {
                const textAlpha = st < 1 ? (st - 0.5) / 0.5 : (st > 2 ? 1 - (st - 2) / 0.5 : 1);
                ctx.globalAlpha = Math.max(0, textAlpha);
                ctx.font = 'italic 16px sans-serif';
                ctx.fillStyle = '#FFD700';
                ctx.fillText('"Ahh... finally clean."', w / 2, h * 0.3);
                ctx.globalAlpha = 1;
            }

            // DING DONG at 2s
            if (st >= 2) {
                const bellAlpha = Math.min(1, (st - 2) * 3);
                ctx.globalAlpha = bellAlpha;
                ctx.font = 'bold 36px sans-serif';
                ctx.fillStyle = '#FFD700';
                // Shake effect
                const shake = Math.sin((st - 2) * 20) * 4;
                ctx.fillText('🔔 DING DONG!', w / 2 + shake, h * 0.2);
                ctx.globalAlpha = 1;

                // Family reaction
                if (st > 2.3) {
                    ctx.font = '28px sans-serif';
                    ctx.fillText('😳', w / 2 - 100, h * 0.50);
                    ctx.fillText('😤', w / 2 - 30, h * 0.49);
                    ctx.fillText('😲', w / 2 + 40, h * 0.50);
                    ctx.fillText('😯', w / 2 + 100, h * 0.50);
                }
            }
            return;
        }

        // === Scene 3 (6-10s): Open door to reveal neighbour's trashed house ===
        if (t < 10) {
            const st = t - 6;

            // Outside scene — evening sky
            ctx.fillStyle = '#1A1A3E';
            ctx.fillRect(0, 0, w, h * 0.5);
            // Stars
            ctx.fillStyle = '#FFFFFF';
            for (let i = 0; i < 15; i++) {
                const sx = (i * 137 + 50) % w;
                const sy = (i * 97 + 20) % (h * 0.4);
                const twinkle = 0.3 + 0.7 * Math.abs(Math.sin(t * 2 + i));
                ctx.globalAlpha = twinkle;
                ctx.beginPath();
                ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;
            // Moon
            ctx.fillStyle = '#F0E8C0';
            ctx.beginPath();
            ctx.arc(w * 0.85, h * 0.12, 25, 0, Math.PI * 2);
            ctx.fill();

            // Ground
            ctx.fillStyle = '#2A3A1A';
            ctx.fillRect(0, h * 0.5, w, h * 0.5);
            ctx.fillStyle = '#3A3A2A';
            ctx.fillRect(0, h * 0.5, w, 5);

            // Neighbour's house — SUPER TRASHED
            const hx = w / 2 - 180;
            const hy = h * 0.15;
            const hw = 360;
            const hh = h * 0.35;

            // Crooked, stained walls
            ctx.save();
            ctx.translate(w / 2, hy + hh);
            ctx.rotate(0.02); // slightly crooked
            ctx.translate(-w / 2, -(hy + hh));

            ctx.fillStyle = '#8B7B68';
            ctx.fillRect(hx, hy, hw, hh);

            // Massive cracks
            ctx.strokeStyle = 'rgba(40, 30, 20, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(hx + 60, hy); ctx.lineTo(hx + 80, hy + 50); ctx.lineTo(hx + 70, hy + 100);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(hx + hw - 40, hy + 20); ctx.lineTo(hx + hw - 60, hy + 80);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(hx + 180, hy + hh - 20); ctx.lineTo(hx + 200, hy + hh);
            ctx.stroke();

            // Green mould patches
            ctx.fillStyle = 'rgba(80, 120, 60, 0.3)';
            ctx.beginPath(); ctx.arc(hx + 40, hy + hh - 30, 20, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(hx + hw - 50, hy + 40, 15, 0, Math.PI * 2); ctx.fill();

            // Broken door hanging off hinges
            ctx.fillStyle = '#4A3018';
            ctx.save();
            ctx.translate(w / 2 - 20, hy + hh * 0.4);
            ctx.rotate(0.15);
            ctx.fillRect(0, 0, 50, hh * 0.6);
            ctx.restore();

            // Windows — broken, boarded
            const nwins = [
                { x: hx + 30, y: hy + 20 },
                { x: hx + hw - 80, y: hy + 20 },
                { x: hx + 60, y: hy + hh * 0.55 },
                { x: hx + hw - 110, y: hy + hh * 0.55 },
            ];
            for (const nw of nwins) {
                ctx.fillStyle = '#2A2A40';
                ctx.fillRect(nw.x, nw.y, 50, 35);
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 1;
                ctx.strokeRect(nw.x, nw.y, 50, 35);
                // Cracked glass lines
                ctx.strokeStyle = 'rgba(200, 200, 220, 0.4)';
                ctx.beginPath();
                ctx.moveTo(nw.x + 5, nw.y + 5);
                ctx.lineTo(nw.x + 30, nw.y + 20);
                ctx.lineTo(nw.x + 45, nw.y + 10);
                ctx.stroke();
            }
            // One window boarded up
            ctx.fillStyle = '#6B5030';
            ctx.fillRect(nwins[1].x - 3, nwins[1].y + 5, 56, 8);
            ctx.fillRect(nwins[1].x + 5, nwins[1].y - 3, 8, 41);

            // Broken roof
            ctx.fillStyle = '#705030';
            ctx.beginPath();
            ctx.moveTo(hx - 20, hy);
            ctx.lineTo(w / 2 + 5, hy - h * 0.12);
            ctx.lineTo(hx + hw + 20, hy);
            ctx.fill();
            // Hole in roof
            ctx.fillStyle = '#1A1A3E';
            ctx.beginPath();
            ctx.ellipse(w / 2 + 50, hy - h * 0.04, 20, 10, 0.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore(); // undo crooked rotation

            // Massive mess around the house
            ctx.font = '16px sans-serif';
            const messPositions = [
                ['🗑️', hx - 30, h * 0.49], ['📦', hx - 10, h * 0.50],
                ['🧦', hx + hw + 10, h * 0.49], ['🥫', hx + hw + 35, h * 0.50],
                ['🧹', hx + hw + 55, h * 0.48], ['🪣', hx - 45, h * 0.48],
                ['📰', hx + 50, h * 0.51], ['🧤', hx + hw - 30, h * 0.51],
                ['🧸', hx + hw + 20, h * 0.46], ['🗞️', hx - 25, h * 0.46],
            ];
            for (const [emoji, mx, my] of messPositions) {
                ctx.fillText(emoji, mx, my);
            }

            // Cobwebs everywhere
            ctx.strokeStyle = 'rgba(200, 200, 200, 0.4)';
            ctx.fillStyle = 'rgba(200, 200, 200, 0.15)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(hx, hy); ctx.lineTo(hx + 50, hy); ctx.lineTo(hx, hy + 50); ctx.closePath();
            ctx.fill(); ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(hx + hw, hy); ctx.lineTo(hx + hw - 50, hy); ctx.lineTo(hx + hw, hy + 50); ctx.closePath();
            ctx.fill(); ctx.stroke();

            // Neighbour peeking out — worried face
            if (st > 1) {
                const peekAlpha = Math.min(1, (st - 1) / 0.5);
                ctx.globalAlpha = peekAlpha;
                ctx.font = '32px sans-serif';
                ctx.fillText('🥺', w / 2 + 5, hy + hh * 0.65);
                ctx.globalAlpha = 1;
            }

            // Speech bubble
            if (st > 1.8) {
                const bubbleAlpha = Math.min(1, (st - 1.8) / 0.5);
                ctx.globalAlpha = bubbleAlpha;
                // Bubble
                ctx.fillStyle = '#fff';
                const bx = w / 2 + 50, by = hy + hh * 0.25;
                ctx.beginPath();
                ctx.ellipse(bx + 70, by + 15, 85, 25, 0, 0, Math.PI * 2);
                ctx.fill();
                // Tail
                ctx.beginPath();
                ctx.moveTo(bx + 10, by + 25); ctx.lineTo(bx, by + 40); ctx.lineTo(bx + 25, by + 30);
                ctx.fill();
                // Text
                ctx.fillStyle = '#333';
                ctx.font = 'bold 13px sans-serif';
                ctx.fillText('Could you help us too...?', bx + 70, by + 20);
                ctx.globalAlpha = 1;
            }

            // Hara's reaction
            if (st > 2.8) {
                const haraAlpha = Math.min(1, (st - 2.8) / 0.5);
                ctx.globalAlpha = haraAlpha;
                ctx.font = '28px sans-serif';
                ctx.fillText('😱', w * 0.15, h * 0.55);
                ctx.fillText('😅', w * 0.22, h * 0.56);
                ctx.fillText('😎', w * 0.29, h * 0.55);
                ctx.fillText('🖍️', w * 0.36, h * 0.56);

                // Hara's speech bubble
                if (st > 3.3) {
                    ctx.fillStyle = '#fff';
                    const hbx = w * 0.08, hby = h * 0.38;
                    ctx.beginPath();
                    ctx.ellipse(hbx + 80, hby + 12, 90, 22, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(hbx + 100, hby + 30); ctx.lineTo(hbx + 110, hby + 48); ctx.lineTo(hbx + 120, hby + 30);
                    ctx.fill();
                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 12px sans-serif';
                    ctx.fillText('Oh no... here we go again!', hbx + 80, hby + 17);
                }
                ctx.globalAlpha = 1;
            }
            return;
        }

        // === Scene 4 (10-14s): Title card — TIDY UP 2: THE NEIGHBOURHOOD ===
        if (t >= 10) {
            const st = t - 10;
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, w, h);

            // Dramatic fade in
            const cardAlpha = Math.min(1, st / 1.5);
            ctx.globalAlpha = cardAlpha;

            // Title
            ctx.font = 'bold 48px sans-serif';
            ctx.fillStyle = '#FFD700';
            ctx.strokeStyle = '#8B6914';
            ctx.lineWidth = 3;
            const titleY = h * 0.35;
            ctx.strokeText('TIDY UP 2', w / 2, titleY);
            ctx.fillText('TIDY UP 2', w / 2, titleY);

            // Subtitle
            if (st > 1) {
                const subAlpha = Math.min(1, (st - 1) / 1);
                ctx.globalAlpha = subAlpha;
                ctx.font = 'bold 28px sans-serif';
                ctx.fillStyle = '#FF6B6B';
                ctx.strokeStyle = '#8B2020';
                ctx.lineWidth = 2;
                ctx.strokeText('THE NEIGHBOURHOOD', w / 2, titleY + 50);
                ctx.fillText('THE NEIGHBOURHOOD', w / 2, titleY + 50);
            }

            // "Coming... eventually" subtitle
            if (st > 2.5) {
                const tagAlpha = Math.min(1, (st - 2.5) / 1);
                ctx.globalAlpha = tagAlpha;
                ctx.font = 'italic 16px sans-serif';
                ctx.fillStyle = '#888888';
                ctx.fillText('Coming... eventually', w / 2, titleY + 90);
            }

            // Question mark
            if (st > 3) {
                const qAlpha = 0.3 + 0.3 * Math.sin(st * 3);
                ctx.globalAlpha = qAlpha;
                ctx.font = 'bold 120px sans-serif';
                ctx.fillStyle = '#FFD700';
                ctx.fillText('?', w / 2, h * 0.75);
            }

            ctx.globalAlpha = 1;

            // Press ENTER prompt
            if (this.phase === 'stinger_done') {
                const blink = Math.sin(Date.now() / 400) > 0;
                if (blink) {
                    ctx.font = '14px monospace';
                    ctx.fillStyle = '#FFD700';
                    ctx.fillText('Press ENTER to return to menu', w / 2, h - 30);
                }
            }
        }
    }

    _entryHeight(entry) {
        switch (entry.type) {
            case 'title': return 70;
            case 'subtitle': return 40;
            case 'section': return 50;
            case 'role': return 38;
            case 'dedication': return 30;
            case 'footer': return 30;
            case 'spacer': return 30;
            default: return 30;
        }
    }
}
