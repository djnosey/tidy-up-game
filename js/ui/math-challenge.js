export class MathChallenge {
    constructor(totalQuestions) {
        this.totalQuestions = totalQuestions;
        this.currentQuestion = 0;
        this.questions = [];
        this.typedAnswer = '';
        this.feedback = null;      // 'correct' | 'wrong' | null
        this.feedbackTimer = 0;
        this.completed = false;
        this.cancelled = false;

        for (let i = 0; i < totalQuestions; i++) {
            this.questions.push(this._generateQuestion());
        }

        this._onKeyDown = (e) => this._handleKeyDown(e);
        window.addEventListener('keydown', this._onKeyDown);
    }

    _generateQuestion() {
        const a = Math.floor(Math.random() * 99) + 1;  // 1-99
        const b = Math.floor(Math.random() * 12) + 1;  // 1-12
        // Randomly swap display order
        if (Math.random() < 0.5) {
            return { a, b, answer: a * b };
        }
        return { a: b, b: a, answer: a * b };
    }

    _handleKeyDown(e) {
        if (this.completed || this.cancelled) return;
        if (this.feedback === 'correct') return; // waiting for advance

        const key = e.key;

        if (key >= '0' && key <= '9') {
            if (this.typedAnswer.length < 5) {
                this.typedAnswer += key;
            }
            e.preventDefault();
        } else if (key === 'Backspace') {
            this.typedAnswer = this.typedAnswer.slice(0, -1);
            if (this.feedback === 'wrong') this.feedback = null;
            e.preventDefault();
        } else if (key === 'Enter') {
            this._submitAnswer();
            e.preventDefault();
        } else if (key === 'Escape') {
            this.cancelled = true;
            e.preventDefault();
        }
    }

    _submitAnswer() {
        if (this.typedAnswer === '') return;

        const q = this.questions[this.currentQuestion];
        const userAnswer = parseInt(this.typedAnswer, 10);

        if (userAnswer === q.answer) {
            this.feedback = 'correct';
            this.feedbackTimer = 0.6;
        } else {
            this.feedback = 'wrong';
            this.feedbackTimer = 0.8;
            this.typedAnswer = '';
        }
    }

    update(dt) {
        if (this.cancelled) return 'cancelled';
        if (this.completed) return 'solved';

        if (this.feedback === 'correct') {
            this.feedbackTimer -= dt;
            if (this.feedbackTimer <= 0) {
                this.currentQuestion++;
                this.typedAnswer = '';
                this.feedback = null;
                if (this.currentQuestion >= this.totalQuestions) {
                    this.completed = true;
                    return 'solved';
                }
            }
        } else if (this.feedback === 'wrong') {
            this.feedbackTimer -= dt;
            if (this.feedbackTimer <= 0) {
                this.feedback = null;
            }
        }

        return null;
    }

    render(ctx, w, h) {
        // Dark overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, w, h);

        ctx.save();
        ctx.textAlign = 'center';

        // Title
        ctx.font = 'bold 36px sans-serif';
        ctx.fillStyle = '#FF4444';
        ctx.fillText('MATH CHALLENGE', w / 2, h * 0.2);

        // Progress
        ctx.font = '16px monospace';
        ctx.fillStyle = '#aaa';
        const qNum = Math.min(this.currentQuestion + 1, this.totalQuestions);
        ctx.fillText(`Question ${qNum} of ${this.totalQuestions}`, w / 2, h * 0.28);

        // Question
        const q = this.questions[Math.min(this.currentQuestion, this.totalQuestions - 1)];
        ctx.font = 'bold 32px monospace';
        ctx.fillStyle = '#fff';
        ctx.fillText(`${q.a}  \u00D7  ${q.b}  =  ?`, w / 2, h * 0.42);

        // Answer box
        const boxW = 160;
        const boxH = 44;
        const boxX = (w - boxW) / 2;
        const boxY = h * 0.50;

        ctx.fillStyle = '#222';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = this.feedback === 'wrong' ? '#FF4444' : '#666';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        // Typed answer with blinking cursor
        ctx.font = 'bold 28px monospace';
        ctx.fillStyle = '#FFD700';
        const cursor = Math.sin(Date.now() / 300) > 0 ? '|' : '';
        ctx.fillText(this.typedAnswer + cursor, w / 2, boxY + 32);

        // Feedback
        if (this.feedback === 'correct') {
            ctx.font = 'bold 22px sans-serif';
            ctx.fillStyle = '#44FF44';
            ctx.fillText('Correct!', w / 2, h * 0.68);
        } else if (this.feedback === 'wrong') {
            ctx.font = 'bold 22px sans-serif';
            ctx.fillStyle = '#FF4444';
            ctx.fillText('Try again!', w / 2, h * 0.68);
        }

        // Footer
        ctx.font = '13px monospace';
        ctx.fillStyle = '#777';
        ctx.fillText('Press ESCAPE to restart level instead', w / 2, h * 0.82);

        ctx.restore();
    }

    destroy() {
        window.removeEventListener('keydown', this._onKeyDown);
    }
}
