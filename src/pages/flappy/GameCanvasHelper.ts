 export class SolidElement {
    width: number;
    height: number;

    x: number;
    y: number;

    constructor(values: {
        width: number;
        height: number;
        x: number;
        y: number;
    }) {
        this.width = values.width;
        this.height = values.height;
        this.x = values.x;
        this.y = values.y;
    }
}

export class GameCanvasContext {
    ctx: CanvasRenderingContext2D;
    $canvas: HTMLCanvasElement;

    width: number;
    height: number;

    constructor($canvas) {
        this.$canvas = $canvas;
        this.ctx = $canvas.getContext("2d");
    }

    resizeCanvas() {
        this.$canvas.width = window.innerWidth,
        this.$canvas.height = window.innerHeight;
        this.width = this.$canvas.width
        this.height = this.$canvas.height
    }
    clear() {
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    }

    fillStyle(style: string) {
        this.ctx.fillStyle = style;
    }

    fillRect(x: number, y: number, w: number, h: number) {
        this.ctx.fillRect(x, y, w, h);
    }

    drawImage(
        image: CanvasImageSource,
        dx: number,
        dy: number,
        dw: number,
        dh: number
    ) {
        this.ctx.drawImage(image, dx, dy, dw, dh);
    }
}
