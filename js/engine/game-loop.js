export class GameLoop {
    constructor(updateFn, renderFn) {
        this.update = updateFn;
        this.render = renderFn;
        this.lastTime = 0;
        this.accumulator = 0;
        this.fixedDt = 1 / 60; // 60fps fixed timestep
        this.running = false;
        this.rafId = null;
    }

    start() {
        this.running = true;
        this.lastTime = performance.now();
        this.accumulator = 0;
        this.rafId = requestAnimationFrame((t) => this.loop(t));
    }

    stop() {
        this.running = false;
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }

    loop(now) {
        if (!this.running) return;

        const elapsed = Math.min((now - this.lastTime) / 1000, 0.1); // cap at 100ms
        this.lastTime = now;
        this.accumulator += elapsed;

        while (this.accumulator >= this.fixedDt) {
            this.update(this.fixedDt);
            this.accumulator -= this.fixedDt;
        }

        this.render();
        this.rafId = requestAnimationFrame((t) => this.loop(t));
    }
}
