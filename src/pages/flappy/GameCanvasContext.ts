export class Size {
    width: number;
    height: number;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}
export class SolidElement {

    width: number;
    height: number;

    x: number;
    y: number;

    constructor(values: {width: number, height: number, x: number, y: number}) {
        this.width = values.width
        this.height = values.height
        this.x = values.x
        this.y = values.y
    }
}

export class GameCanvasContext {

    ctx: CanvasRenderingContext2D;

    baseWidth: number = 400;
    baseHeight: number = 600;

    gameRatio: number;

    scaleFactor: number;

    constructor(ctx: CanvasRenderingContext2D, canvasWidth: number) {
        this.ctx = ctx;
        this.scaleFactor = canvasWidth / this.baseWidth;
        this.gameRatio = this.baseWidth / this.baseHeight
        console.log(this.scaleFactor)
        console.log(this.gameRatio)
    }

    calculateCanvasSize() {
        const windowRatio = window.innerWidth / window.innerHeight;

        if (windowRatio < this.gameRatio) {
            return new Size(
                window.innerWidth,
                window.innerWidth / this.gameRatio
            )
        } else {
            return new Size(
                window.innerHeight,
                window.innerHeight * this.gameRatio
            )
        }

    }

    scale(value: number): number {
        return value * this.scaleFactor;
    }

    fillStyle(style: string) {
        this.ctx.fillStyle = style
    }

    fillRect(x: number, y: number, w: number, h: number) {
        this.ctx.fillRect(x, y, w, h)
    }

    drawImage(image: CanvasImageSource, dx: number, dy: number, dw: number, dh: number) {
        this.ctx.drawImage(image, dx, dy, dw, dh)
    }
}
