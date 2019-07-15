import * as Const from "./const.js"

export default class Block {
    constructor(res) {
        this.res = res;
        this.blockImage = document.createElement("canvas");
        this.blockImage.width = this.blockImage.height = Const.IMG_S;
        this.blocks = [0, 1, 2, 3];
        this.colors = [
            [this.res.images[Const.BN], this.res.images[Const.B0], this.res.images[Const.B1], this.res.images[Const.B2], this.res.images[Const.B3]],
            [this.res.images[Const.RN], this.res.images[Const.R0], this.res.images[Const.R1], this.res.images[Const.R2], this.res.images[Const.R3]],
            [this.res.images[Const.YN], this.res.images[Const.Y0], this.res.images[Const.Y1], this.res.images[Const.Y2], this.res.images[Const.Y3]],
            [this.res.images[Const.GN], this.res.images[Const.G0], this.res.images[Const.G1], this.res.images[Const.G2], this.res.images[Const.G3]]
        ];
        this.topPos = [0, Const.SEP]
        this.angle = 0;
        this.x = (Const.WIDTH >> 1) - (Const.IMG_S >> 1);
        this.y = Const.BOTTOM;
        this.state = Const.NONE;
        this.setImage();
    }

    update(dt) {
        switch (this.state) {
            case Const.CLOCKWISE:
                this.angle += dt * 12;
                if (this.angle > Const.HPI) {
                    this.state = Const.NONE;
                    this.blocks.unshift(this.blocks.pop());
                    this.setImage();
                    this.angle = 0;
                }
                break;
            case Const.ANTI_CLOCKWISE:
                this.angle -= dt * 12;
                if (this.angle < -Const.HPI) {
                    this.state = Const.NONE;
                    this.blocks.push(this.blocks.shift());
                    this.setImage();
                    this.angle = 0;
                }
                break;
            case Const.SWAP_TILES:
                this.topPos[0] += 500 * dt;
                this.topPos[1] -= 500 * dt;
                if (this.topPos[0] > Const.SEP || this.topPos[1] < 0) {
                    this.topPos[0] = 0;
                    this.topPos[1] = Const.SEP;
                    const t = this.blocks[0];
                    this.blocks[0] = this.blocks[1];
                    this.blocks[1] = t;
                    this.state = Const.NONE;
                }
                this.setImage();
                break;
        }
    }

    draw(ctx, frame) {
        if (frame) {
            this.setImage(frame);
            ctx.drawImage(this.blockImage, this.x, this.y);
            return;
        }

        const s = Const.IMG_S >> 1;
        ctx.save();
        ctx.translate(this.x + s, this.y + s)
        ctx.rotate(this.angle)
        ctx.drawImage(this.blockImage, -s, -s);
        ctx.restore();
    }

    turn(dir) {
        if (dir === Const.LEFT) {
            this.state = Const.ANTI_CLOCKWISE;
        } else {
            this.state = Const.CLOCKWISE;
        }
    }

    swap() {
        this.state = Const.SWAP_TILES;
    }

    setImage(fr = 0) {
        const ctx = this.blockImage.getContext("2d");
        ctx.clearRect(0, 0, Const.IMG_S, Const.IMG_S);
        ctx.drawImage(this.colors[this.blocks[0]][fr], this.topPos[0], 0);
        ctx.drawImage(this.colors[this.blocks[1]][fr], this.topPos[1], 0);
        ctx.drawImage(this.colors[this.blocks[3]][fr], 0, Const.SEP);
        ctx.drawImage(this.colors[this.blocks[2]][fr], Const.SEP, Const.SEP);
    }
}