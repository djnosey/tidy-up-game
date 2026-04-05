export class GameLoop {
    constructor(updateFn, renderFn) {
        this.update = updateFn;
        this.render = renderFn;
        this.lastTime = 0;
        this.accumulator = 0;
        this.fixedDt = 1 / 60; // 60fps fixed timestep
        this.running = false;
        this.rafId = null;
        this._boundLoop = this.loop.bind(this); // avoid per-frame allocation

        // Hitstop — freezes game updates for N frames for impact feel
        this.hitstopFrames = 0;
    }

    start() {
        this.running = true;
        this.lastTime = performance.now();
        this.accumulator = 0;
        this.rafId = requestAnimationFrame(this._boundLoop);
    }

    stop() {
        this.running = false;
        if (this.rafId) cancelAnimationFrame(this.rafId);
    }

    hitstop(frames = 3) {
        this.hitstopFrames = Math.max(this.hitstopFrames, frames);
    }

    loop(now) {
        if (!this.running) return;

        const elapsed = Math.min((now - this.lastTime) / 1000, 0.1); // cap at 100ms
        this.lastTime = now;

        // Hitstop: skip update ticks while frozen, still render
        if (this.hitstopFrames > 0) {
            this.hitstopFrames--;
            this.render();
            this.rafId = requestAnimationFrame(this._boundLoop);
            return;
        }

        this.accumulator += elapsed;

        while (this.accumulator >= this.fixedDt) {
            this.update(this.fixedDt);
            this.accumulator -= this.fixedDt;
        }

        this.render();
        this.rafId = requestAnimationFrame(this._boundLoop);
    }
}
