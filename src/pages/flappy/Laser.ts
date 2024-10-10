import { SolidElement, type GameCanvasContext } from "./GameCanvasContext";

export class Laser extends SolidElement {
    ctx: GameCanvasContext;
    speed: number;
    damage: number;

    constructor(ctx: GameCanvasContext, x: number, y: number) {
        super({width: 20, height: 5, x, y})
        this.ctx = ctx;
        // this.x = x;
        // this.y = y;
        // this.width = 20;
        // this.height = 5;
        this.speed = 500; // Increased speed
        this.damage = 10;
    }

    draw() {
        this.ctx.fillStyle("red");
        this.ctx.fillRect(
            this.ctx.scale(this.x),
            this.ctx.scale(this.y),
            this.ctx.scale(this.width),
            this.ctx.scale(this.height)
        );
    }

    update(deltaTime: number) {
        this.x += this.speed * deltaTime;
    }
}
