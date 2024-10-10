import { SolidElement, type GameCanvasContext } from "./GameCanvasHelper";

export class Laser extends SolidElement {
    ctx: GameCanvasContext;
    speed: number;
    damage: number;

    constructor(ctx: GameCanvasContext, x: number, y: number) {
        super({width: 20, height: 5, x, y})
        this.ctx = ctx;
        this.speed = 500; // Increased speed
        this.damage = 10;
    }

    draw() {
        this.ctx.fillStyle("red");
        this.ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(deltaTime: number) {
        this.x += this.speed * deltaTime;
    }
}
