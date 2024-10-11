import { ATTACK_THRESHOLD_STEP } from "./config";
import { SolidElement, type GameCanvasContext } from "./GameCanvasHelper";

export class Boss extends SolidElement {

    ctx: GameCanvasContext;
    img: CanvasImageSource;
    toastySound: HTMLAudioElement;

    health:number = 2000;
    maxHealth:number = this.health;
    moveAmplitude:number = 250;
    moveSpeed:number = 0.01;
    moveAngle:number = 0;
    initialX:number = 0;
    initialY:number = 0;
    attackSpeed:number = 300;// Speed of the boss during the attack
    attackPhase:string;// 'idle', 'attacking', 'returning'
    nextHealthThreshold:number;// Track health thresholds for attack

    constructor(ctx: GameCanvasContext, img: CanvasImageSource, toastySound: HTMLAudioElement) {
        super({width: 75, height: 100, x: 0, y: 0})
        this.ctx = ctx
        this.img = img
        this.toastySound = toastySound

        this.x = this.ctx.width;
        this.y = this.ctx.height / 2 - 50;
        this.health = this.maxHealth;
        this.moveAngle = 0;
        this.initialX = this.ctx.width - this.width -  30;
        this.initialY = this.y;
        this.attackPhase = "idle";
        this.nextHealthThreshold = this.maxHealth - ATTACK_THRESHOLD_STEP ;
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Draw health bar
        this.ctx.fillStyle("green");
        const healthBarWidth =
            (this.width * this.health) / this.maxHealth;
            this.ctx.fillRect(
                this.x,
                this.y - 20,
                healthBarWidth,
                10
        );
    }

    update(deltaTime: number) {
        // Check if health has crossed a threshold
        if (this.attackPhase === "idle") {
            // Regular movement
            if (this.x > this.initialX) {
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
                this.toastySound.play();
            }
        }
        if (this.attackPhase === "attacking") {
            // Move horizontally towards x = 0
            if (this.x > 0) {
                this.x -= this.attackSpeed * deltaTime;
            } else {
                this.attackPhase = "returning";
                this.nextHealthThreshold -= ATTACK_THRESHOLD_STEP; // Track health after attack
                this.moveSpeed += 0.003
                this.attackSpeed += 25
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

};
