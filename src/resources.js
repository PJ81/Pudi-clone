import * as Const from "./const.js"

export default class Resources {
    constructor(cb) {
        this.images = new Array(24);

        Promise.all([
            (this.loadImage("./img/b.png")).then((i) => {
                this.images[Const.BN] = i;
            }),
            (this.loadImage("./img/b0.png")).then((i) => {
                this.images[Const.B0] = i;
            }),
            (this.loadImage("./img/b1.png")).then((i) => {
                this.images[Const.B1] = i;
            }),
            (this.loadImage("./img/b2.png")).then((i) => {
                this.images[Const.B2] = i;
            }),
            (this.loadImage("./img/b3.png")).then((i) => {
                this.images[Const.B3] = i;
            }),
            (this.loadImage("./img/bs.png")).then((i) => {
                this.images[Const.BS] = i;
            }),
            (this.loadImage("./img/g.png")).then((i) => {
                this.images[Const.GN] = i;
            }),
            (this.loadImage("./img/g0.png")).then((i) => {
                this.images[Const.G0] = i;
            }),
            (this.loadImage("./img/g1.png")).then((i) => {
                this.images[Const.G1] = i;
            }),
            (this.loadImage("./img/g2.png")).then((i) => {
                this.images[Const.G2] = i;
            }),
            (this.loadImage("./img/g3.png")).then((i) => {
                this.images[Const.G3] = i;
            }),
            (this.loadImage("./img/gs.png")).then((i) => {
                this.images[Const.GS] = i;
            }),
            (this.loadImage("./img/r.png")).then((i) => {
                this.images[Const.RN] = i;
            }),
            (this.loadImage("./img/r0.png")).then((i) => {
                this.images[Const.R0] = i;
            }),
            (this.loadImage("./img/r1.png")).then((i) => {
                this.images[Const.R1] = i;
            }),
            (this.loadImage("./img/r2.png")).then((i) => {
                this.images[Const.R2] = i;
            }),
            (this.loadImage("./img/r3.png")).then((i) => {
                this.images[Const.R3] = i;
            }),
            (this.loadImage("./img/rs.png")).then((i) => {
                this.images[Const.RS] = i;
            }),
            (this.loadImage("./img/y.png")).then((i) => {
                this.images[Const.YN] = i;
            }),
            (this.loadImage("./img/y0.png")).then((i) => {
                this.images[Const.Y0] = i;
            }),
            (this.loadImage("./img/y1.png")).then((i) => {
                this.images[Const.Y1] = i;
            }),
            (this.loadImage("./img/y2.png")).then((i) => {
                this.images[Const.Y2] = i;
            }),
            (this.loadImage("./img/y3.png")).then((i) => {
                this.images[Const.Y3] = i;
            }),
            (this.loadImage("./img/ys.png")).then((i) => {
                this.images[Const.YS] = i;
            })
        ]).then(() => {
            cb();
        });
    }

    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = url;
        });
    }

    image(index) {
        if (index < this.images.length) {
            return this.images[index];
        }
        return null;
    }
}