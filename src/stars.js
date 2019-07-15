import Vector from "./vector.js";
import * as Const from "./const.js"

const SHOW = 1,
    HIDE = 2;

class Star {
    constructor() {
        this.pos = new Vector();
        this.alpha;
        this.alphaTime;
        this.velY;
        this.color;
        this.size;
        this.state;
        this.restart();
    }

    restart() {
        this.pos.set(Math.random() * Const.WIDTH, Math.random() * Const.HEIGHT);
        this.alpha = 0;
        this.state = SHOW;
        this.size = Math.random() * 2 + 1;
        this.color = `rgb(${Math.random() * 50 +  205}, ${Math.random() * 50 +  200}, ${Math.random() * 50 +  205})`;
        this.velY = 1 + 5 * Math.random();
        this.alphaTime = Math.random();
    }

    draw(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    }

    update(dt) {
        switch (this.state) {
            case SHOW:
                if ((this.alpha += dt * this.alphaTime) > 1) {
                    this.state = HIDE;
                    this.alpha = 1;
                }
                break;
            case HIDE:
                if ((this.alpha -= dt * this.alphaTime) < 0) {
                    this.restart();
                }
                if ((this.pos.y -= dt * this.velY) < 0) {
                    this.restart();
                }
                break;
        }
    }
}

export default class Stars {
    constructor() {
        this.stars = [];
        for (let s = 0; s < 150; s++) {
            const star = new Star();
            this.stars.push(star);
        }
    }

    draw(ctx) {
        this.stars.forEach(el => {
            el.draw(ctx);
        });
        ctx.globalAlpha = 1;
    }

    update(dt) {
        this.stars.forEach(el => {
            el.update(dt);
        });
    }
}