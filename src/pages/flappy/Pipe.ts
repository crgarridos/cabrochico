import { SolidElement, type GameCanvasContext } from "./GameCanvasContext";

export class Pipe extends SolidElement{
    ctx: GameCanvasContext;
    img: CanvasImageSource;

    gap: number;
    // x: number;
    // width: number;
    minHeight: number;
    maxHeight: number;
    topY: any;
    bottomY: any;
    constructor(ctx: GameCanvasContext, img: CanvasImageSource) {
        super({width: 50, height: 0, x: 0, y: 0})// TODO height
        // this.width = 50;
        this.ctx = ctx;
        this.img = img;
        // Fixed spacing between the top and bottom pipe
        this.gap = 200;

        this.x = ctx.baseWidth;

        // Set the minimum and maximum heights for the top pipe
        this.minHeight = 50;
        this.maxHeight = ctx.baseHeight - this.gap;

        // Random height for the top pipe
        this.topY =
            Math.random() * (this.maxHeight - this.minHeight) + this.minHeight;

        // Bottom pipe starts after the gap
        this.bottomY = this.topY + this.gap;
    }
    draw() {
        // Draw top pipe
        this.ctx.ctx.save();
        this.ctx.drawImage(
            this.img,
            this.ctx.scale(this.x),
            0,
            this.ctx.scale(this.width),
            this.ctx.scale(this.topY)
        );
        this.ctx.ctx.restore();

        // Draw bottom pipe
        this.ctx.ctx.save();
        this.ctx.ctx.scale(1, -1); // Flip vertically
        this.ctx.drawImage(
            this.img,
            this.ctx.scale(this.x),
            this.ctx.scale(-this.bottomY),
            this.ctx.scale(this.width),
            this.ctx.scale(-(this.ctx.baseHeight - this.bottomY))
        );
        this.ctx.ctx.restore();
    }

    update(deltaTime: number) {
        this.x -= 150 * deltaTime; // Increased speed
    }
}
