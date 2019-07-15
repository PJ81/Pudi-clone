import * as Const from "./const.js"
import Resource from "./resources.js"
import Game from "./game.js"
import Stars from "./stars.js";
import Block from "./block.js";
import Input from "./input.js";
import Drop from "./drop.js";
import Particles from "./particles.js";

class Pudi extends Game {
  constructor(res) {
    super();
    this.state = Const.PLAYING;
    this.score = 0;
    this.scoreFlash = false;
    this.flashTime = 1;
    this.animTimer = .035;
    this.drops = [new Drop(Const.BOTTOM - 40, 157), new Drop(Const.BOTTOM - 40, 234)];
    this.particles = new Particles();
    this.colors = ["#002ae2", "#d4000b", "#f4c000", "#0fcd00"];
    this.block;
    this.input;
    this.stars;
    this.partTimer = 0;
    this.frame = 0;
    this.alpha = .1;
    this.counter = 0;
    this.dropSpeed = null;

    this.res = new Resource(() => {
      this.load();
      this.loop(0);
    });

    this.ctx.fillStyle = "#444";
    this.ctx.textAlign = "center";
  }

  load() {
    this.block = new Block(this.res);
    this.stars = new Stars();
    this.input = new Input((what, kState) => {
      if (kState === Const.RELEASED) {
        switch (what) {
          case Const.LEFT:
            this.block.turn(Const.LEFT);
            break;
          case Const.RIGHT:
            this.block.turn(Const.RIGHT);
            break;
          case Const.DOWN:
            this.down();
            break;
          case Const.SWAP:
            this.block.swap()
            break;
        }
      }
    });
    this.startDrop();
  }

  down() {
    this.dropSpeed = this.drops[0].speed;
    this.drops[0].speed = this.drops[1].speed = 1500;
  }

  update(dt) {
    if (this.alpha > .1) {
      if ((this.alpha -= dt * .2) < .1) this.alpha = .1;
    }

    this.stars.update(dt);
    this.particles.update(dt);
    switch (this.state) {
      case Const.PLAYING:
        this.block.update(dt);

        if ((this.partTimer -= dt) < 0) {
          this.startParticle(this.drops[0].x + 20, this.drops[0].y, this.drops[0].index);
          this.startParticle(this.drops[1].x + 20, this.drops[1].y, this.drops[1].index);
          this.partTimer = .07;
        }

        if (this.drops[0].update(dt) || this.drops[1].update(dt)) {
          if (this.block.blocks[0] === this.drops[0].index && this.block.blocks[1] === this.drops[1].index) {
            this.state = Const.FLASH;
            this.frame = 1;
          } else {
            this.state = Const.GAME_OVER;
          }
          this.drops[0].y = this.drops[1].y = Const.BOTTOM - 40;
        }
        break;
      case Const.FLASH:
        if ((this.animTimer -= dt) < 0) {
          this.animTimer = .035;
          if (++this.frame > 4) {
            this.block.setImage();
            this.startDrop();
            this.score++;
            if (++this.counter > 10) {
              this.counter = 0;
              this.drops[0].speed += 4;
              this.drops[1].speed += 4;
            }
            this.alpha = .9;
            this.frame = 0;
            this.state = Const.PLAYING;
          }
        }
        break;
    }
  }

  draw() {
    this.stars.draw(this.ctx);
    this.block.draw(this.ctx, this.frame);

    if (this.state === Const.GAME_OVER) {
      this.ctx.fillStyle = "#ccc";
      this.ctx.textAlign = "center";
      this.ctx.font = "68px 'Fascinate Inline'";
      this.ctx.fillText("GAME OVER", Const.WIDTH >> 1, Const.HEIGHT * .35);
      this.ctx.font = "50px 'Fascinate Inline'";
      this.ctx.fillText("SCORE", Const.WIDTH >> 1, Const.HEIGHT * .45);
      this.ctx.fillText(`${(this.score)}`, Const.WIDTH >> 1, Const.HEIGHT * .53);
    } else {
      this.drawScore(this.scoreFlash);
    }

    this.particles.draw(this.ctx);
    this.drops[0].draw(this.ctx);
    this.drops[1].draw(this.ctx);
  }

  startParticle(x, y, i) {
    x += (Math.random() * 4 + 3) * (Math.random() < .5 ? 1 : -1);
    const vx = (Math.random() * 3 + 1) * (Math.random() < .5 ? -1 : 1),
      vy = -Math.random() * 2 + 1,
      gx = 5,
      gy = 5,
      sx = Math.random() * 2 + 1,
      clr = this.colors[i];
    this.particles.start(x, y, vx, vy, gx, gy, sx, sx, clr);
  }

  startDrop() {
    this.drops[0].y = this.drops[1].y = -40;
    this.drops[0].index = Math.floor(Math.random() * 4);
    while (true) {
      this.drops[1].index = Math.floor(Math.random() * 4);
      if (this.drops[1].index !== this.drops[0].index) break;
    }
    this.drops[0].image = this.res.images[5 + this.drops[0].index * 6];
    this.drops[1].image = this.res.images[5 + this.drops[1].index * 6];

    if (this.dropSpeed) {
      this.drops[0].speed = this.drops[1].speed = this.dropSpeed;
      this.dropSpeed = null;
    }
  }

  drawScore() {
    this.ctx.globalAlpha = this.alpha;
    this.ctx.font = "210px 'Fascinate Inline'";
    this.ctx.fillText(`${(this.score)}`, Const.WIDTH >> 1, Const.HEIGHT >> 1);
    this.ctx.globalAlpha = 1;
  }
}

new Pudi();