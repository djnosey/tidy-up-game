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
    }

    start() {
        this.active = true;
        this.timer = 0;
        this.scrollY = 0;
        this.fallingItems = [];
        this.messSpawnTimer = 0;
        this.fadeIn = 0;
        this.canContinue = false;
    }

    stop() {
        this.active = false;
    }

    handleInput(input) {
        if (!this.active) return false;
        if (this.canContinue && (input.wasPressed('Enter') || input.wasPressed(' '))) {
            return true;
        }
        return false;
    }

    update(dt) {
        if (!this.active) return;
        this.timer += dt;

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
        // Remove off-screen items
        this.fallingItems = this.fallingItems.filter(item => item.y < 650);

        // Calculate total credit height to know when scrolling is done
        const totalHeight = this._getTotalCreditHeight();
        if (this.scrollY > totalHeight + 100) {
            this.canContinue = true;
        }
        // Also allow continue after a generous timeout
        if (this.timer > 15) {
            this.canContinue = true;
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
                ctx.fillText('Press ENTER to return to menu', w / 2, h - 20);
                ctx.restore();
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
