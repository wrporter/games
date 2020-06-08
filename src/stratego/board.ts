import "./board.less";
import {ImageName, ImageService} from "./image/images.service";

export class Board {
    public readonly BOARD_LENGTH: number = 800;
    public readonly SQUARE_LENGTH: number = 80;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.canvas.width = this.BOARD_LENGTH;
        this.canvas.height = this.BOARD_LENGTH;
        this.context = this.canvas.getContext("2d")!;
    }

    public draw() {
        this.context.drawImage(ImageService.getInstance().getImage(ImageName.Board), 0, 0,
            this.BOARD_LENGTH, this.BOARD_LENGTH);
        this.drawLines();
    }

    private drawLines() {
        for (let x = 0; x <= this.BOARD_LENGTH; x += this.SQUARE_LENGTH) {
            if (x === 3 * this.SQUARE_LENGTH) {
                this.drawLine(x, 0, x, 4 * this.SQUARE_LENGTH);
                this.drawLine(x, 6 * this.SQUARE_LENGTH, x, this.BOARD_LENGTH);
            } else if (x === 7 * this.SQUARE_LENGTH) {
                this.drawLine(x, 0, x, 4 * this.SQUARE_LENGTH);
                this.drawLine(x, 6 * this.SQUARE_LENGTH, x, this.BOARD_LENGTH);
            } else {
                this.drawLine(x, 0, x, this.BOARD_LENGTH);
            }
        }

        for (let y = 0; y <= this.BOARD_LENGTH; y += this.SQUARE_LENGTH) {
            if (y === 5 * this.SQUARE_LENGTH) {
                this.drawLine(0, y, 2 * this.SQUARE_LENGTH, y);
                this.drawLine(4 * this.SQUARE_LENGTH, y, 6 * this.SQUARE_LENGTH, y);
                this.drawLine(8 * this.SQUARE_LENGTH, y, this.BOARD_LENGTH, y);
            } else {
                this.drawLine(0, y, this.BOARD_LENGTH, y);
            }
        }
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineWidth = 3;
        this.context.strokeStyle = "#1A4A12";
        this.context.stroke();
    }
}
