import { SolidElement, type GameCanvasContext } from "./GameCanvasHelper";

export class Pipe extends SolidElement{
    ctx: GameCanvasContext;
    img: CanvasImageSource;

    gap: number;
    minHeight: number;
    maxHeight: number;
    topY: any;
    bottomY: any;
    constructor(ctx: GameCanvasContext, img: CanvasImageSource) {
        super({width: 50, height: 0, x: 0, y: 0})// TODO height
        this.ctx = ctx;
        this.img = img;
        // Fixed spacing between the top and bottom pipe
        this.gap = 200;

        this.x = ctx.width;

        // Set the minimum and maximum heights for the top pipe
        this.minHeight = 50;
        this.maxHeight = ctx.height - this.gap;

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
            this.x,
            0,
            this.width,
            this.topY
        );
        this.ctx.ctx.restore();

        // Draw bottom pipe
        this.ctx.ctx.save();
        this.ctx.ctx.scale(1, -1); // Flip vertically
        this.ctx.drawImage(
            this.img,
            this.x,
            -this.bottomY,
            this.width,
            -(this.ctx.height - this.bottomY)
        );
        this.ctx.ctx.restore();
    }

    update(deltaTime: number) {
        this.x -= 150 * deltaTime; // Increased speed
    }
}
