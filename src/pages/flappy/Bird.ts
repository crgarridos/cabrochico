import { SolidElement, type GameCanvasContext } from "./GameCanvasContext";
import { Laser } from "./Laser";

export class Bird extends SolidElement {

    ctx: GameCanvasContext;
    img: CanvasImageSource;

    // x: number = 50
    // y: number =  300;
    // width: number =  20;
    // height:number = 15;
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
            this.ctx.scale(this.x ),
            this.ctx.scale(this.y),
            this.ctx.scale(this.width),
            this.ctx.scale(this.height)
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
