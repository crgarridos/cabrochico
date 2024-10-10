import { SolidElement, type GameCanvasContext } from "./GameCanvasContext";

// Boss object
export class Boss extends SolidElement {

    ctx: GameCanvasContext;
    img: CanvasImageSource;

    // x: number;
    // y: number;
    // width: number = 75;
    // height: number = 100;

    health:number = 2000;
    maxHealth:number = this.health;
    moveAmplitude:number = 100;
    moveSpeed:number = 0.02;
    moveAngle:number = 0;
    initialX:number = 0;
    initialY:number = 0;
    attackSpeed:number = 200;// Speed of the boss during the attack
    attackPhase:string = "idle";// 'idle', 'attacking', 'returning'
    nextHealthThreshold:number = 200;// Track health thresholds for attack


        // x: baseWidth,
    // y: baseHeight / 2 - 50,
    // width: 75,
    // height: 100,
    // health: 200,
    // maxHealth: 2000,
    // moveAmplitude: 100,
    // moveSpeed: 0.02,
    // moveAngle: 0,
    // initialY: 0,
    // attackPhase: "idle",
    // attackSpeed: 200,
    // initialX: baseWidth,
    // nextHealthThreshold: 200;

    constructor(ctx: GameCanvasContext, img: CanvasImageSource) {
        super({width: 75, height: 100, x: 0, y: 0})
        this.ctx = ctx
        this.img = img
        this.reset()
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.ctx.scale(this.x),
            this.ctx.scale(this.y),
            this.ctx.scale(this.width),
            this.ctx.scale(this.height)
        );

        // Draw health bar
        this.ctx.fillStyle("green");
        const healthBarWidth =
            (this.width * this.health) / this.maxHealth;
            this.ctx.fillRect(
                this.ctx.scale(this.x),
                this.ctx.scale(this.y - 20),
                this.ctx.scale(healthBarWidth),
                this.ctx.scale(10)
        );
    }

    update(deltaTime: number) {
        // Check if health has crossed a threshold
        if (this.attackPhase === "idle") {
            // Regular movement
            if (this.x > this.ctx.baseWidth - 150) {
                this.x -= 100 * deltaTime; // Move boss towards center
            } else {
                this.moveAngle += this.moveSpeed;
                this.y =
                    this.initialY +
                    Math.sin(this.moveAngle) *
                        this.moveAmplitude;
            }

            // Check if it's time to attack based on health
            if (this.health <= this.nextHealthThreshold) {
                this.attackPhase = "attacking";
                // toastySound.play(); TODO
            }
        }
        if (this.attackPhase === "attacking") {
            // Move horizontally towards x = 0
            if (this.x > 0) {
                this.x -= this.attackSpeed * deltaTime;
            } else {
                this.attackPhase = "returning";
                this.nextHealthThreshold -= 50; // Track health after attack
            }
        }
        if (this.attackPhase === "returning") {
            // Move back to original position
            if (this.x < this.initialX) {
                this.x += this.attackSpeed * deltaTime;
            } else {
                this.attackPhase = "idle";
            }
        }
    }

    reset() {
        this.x = this.ctx.baseWidth;
        this.y = this.ctx.baseHeight / 2 - 50;
        this.health = this.maxHealth;
        this.moveAngle = 0;
        this.initialX = this.ctx.baseWidth;
        this.initialY = this.y;
        this.attackPhase = "idle";
        this.nextHealthThreshold = this.maxHealth - 50;
    }

};
