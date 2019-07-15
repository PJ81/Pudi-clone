export default class Drop {
    constructor(bottom, x) {
        this.x = x;
        this.y = -40;
        this.speed = 110;
        this.bottom = bottom;
        this.image;
        this.index;
    }

    update(dt) {
        this.y += dt * this.speed;
        if (this.y >= this.bottom) {
            this.y = this.bottom;
            return true;
        }
        return false;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
    }
}