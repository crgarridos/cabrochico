import { SolidElement, type GameCanvasContext } from "./GameCanvasHelper";
import { Laser } from "./Laser";

export class Bird extends SolidElement {

    ctx: GameCanvasContext;
    img: CanvasImageSource;

    velocity:number = 0;
    gravity:number = 0.3;
    jumpStrength:number = -7;

    constructor(ctx: GameCanvasContext, img: CanvasImageSource) {
        super({width: 20, height: 15, x: 50, y: 300})
        this.ctx = ctx;
        this.img = img;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x ,
            this.y,
            this.width,
            this.height
        );
    }

    update(deltaTime: any) {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    jump() {
        this.velocity = this.jumpStrength;
    }

    shoot(): Laser {
        // laserMusic.play(); TODO
        return new Laser(
            this.ctx,
            this.x + this.width,
            this.y + this.height / 2
        )
    }
};
