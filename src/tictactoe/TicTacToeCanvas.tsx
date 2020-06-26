import TicTacToe, {GameResult, Mark} from "./TicTacToe";

interface ColorHSL {
    h: number,
    s: number,
    l: number
}

const BOARD_SIZE = 3;

export default class TicTacToeCanvas {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private ticTacToe: TicTacToe = new TicTacToe();
    private boardLength: number = 0;
    private squareLength: number = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d')!;
        this.resize();
        this.newGame();
    }

    newGame() {
        this.ticTacToe = new TicTacToe();
        this.render();
    }

    handleClick(event: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const row = Math.floor(y / this.squareLength);
        const col = Math.floor(x / this.squareLength);

        if (this.ticTacToe.move(row, col)) {
            this.render();
            return true;
        }
        return false;
    }

    gameOver() {
        return this.ticTacToe.getGameResult() !== GameResult.Pending
    }

    getGameResult() {
        return this.ticTacToe.getGameResult();
    }

    render() {
        this.resize()
        this.clearScreen();
        this.renderSquares();
        this.renderMoves();
    }

    private resize() {
        const displayWidth = window.innerWidth;
        const displayHeight = window.innerHeight;
        const length = (displayHeight < displayWidth ? displayHeight : displayWidth) * 0.9;

        if (this.canvas.width !== length) {
            this.canvas.width = length;
            this.canvas.height = length;

            this.boardLength = length;
            this.squareLength = this.boardLength / BOARD_SIZE;
        }
    }

    private renderSquares() {
        this.context.strokeStyle = '#39ff14';
        this.context.lineWidth = 1;
        this.context.shadowColor = '#39ff14';
        this.context.shadowBlur = 10;

        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                let x = col * this.squareLength;
                let y = row * this.squareLength;

                this.context.beginPath();
                this.context.rect(x, y, this.squareLength, this.squareLength);
                this.context.stroke();
            }
        }

        this.context.beginPath();
        this.context.rect(0, 0, this.boardLength-1, this.boardLength-1);
        this.context.stroke();
    }

    private renderMoves() {
        const board = this.ticTacToe.getBoard();

        board.forEach((_, row) => {
            board[row].forEach((value, column) => {
                const x = column * this.squareLength;
                const y = row * this.squareLength;

                if (value === Mark.X) {
                    this.drawX(x, y);
                } else if (value === Mark.O) {
                    this.drawO(x, y);
                }
            });
        });
    }

    private drawX(x: number, y: number) {
        const color = {h: 348, s: 100, l: 51.4};
        const edge = this.squareLength / 10;
        const width = this.squareLength * 0.08;

        this.drawNeonLine(color, width, x + edge, y + edge, x + this.squareLength - edge, y + this.squareLength - edge);
        this.drawNeonLine(color, width, x + this.squareLength - edge, y + edge, x + edge, y + this.squareLength - edge);
    }

    private drawO(x: number, y: number) {
        const color = {h: 229.62, s: 100, l: 63.73};
        const center = this.squareLength / 2;
        const width = this.squareLength * 0.08;

        this.drawNeonCircle(color, width, x + center, y + center, center - this.squareLength / 10);
    }

    private drawNeonCircle(color: ColorHSL, width: number, x: number, y: number, radius: number) {
        const {h, s, l} = color;
        this.context.shadowColor = `hsl(${h}, ${s}%, ${l}%)`;
        this.context.shadowBlur = 10;

        this.context.strokeStyle = `hsl(${h}, ${s}%, ${l}%)`;
        this.context.lineWidth = width;
        this.drawCircle(x, y, radius);

        this.context.strokeStyle = `hsl(${h}, ${s}%, ${l + ((100 - l) * 0.2)}%)`;
        this.context.lineWidth = width * 0.8;
        this.drawCircle(x, y, radius);

        this.context.strokeStyle = `hsl(${h}, ${s}%, ${l + ((100 - l) * 0.4)}%)`;
        this.context.lineWidth = width * 0.6;
        this.drawCircle(x, y, radius);

        this.context.strokeStyle = `hsl(${h}, ${s}%, ${l + ((100 - l) * 0.6)}%)`;
        this.context.lineWidth = width * 0.4;
        this.drawCircle(x, y, radius);

        this.context.strokeStyle = `hsl(${h}, ${s}%, ${l + ((100 - l) * 0.8)}%)`;
        this.context.lineWidth = width * 0.15;
        this.drawCircle(x, y, radius);
    }

    private drawCircle(x: number, y: number, radius: number) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI);
        this.context.stroke();
    }

    private drawNeonLine(color: ColorHSL, width: number, x1: number, y1: number, x2: number, y2: number) {
        const {h, s, l} = color;
        this.context.lineCap = 'round';
        this.context.shadowColor = `hsl(${h}, ${s}%, ${l}%)`;
        this.context.shadowBlur = 10;

        this.context.strokeStyle = `hsla(${h}, ${s}%, ${l}%)`;
        this.context.lineWidth = width;
        this.drawLine(x1, y1, x2, y2);

        this.context.strokeStyle = `hsla(${h}, ${s}%, ${l + ((100 - l) * 0.2)}%)`;
        this.context.lineWidth = width * 0.8;
        this.drawLine(x1, y1, x2, y2);

        this.context.strokeStyle = `hsla(${h}, ${s}%, ${l + ((100 - l) * 0.4)}%)`;
        this.context.lineWidth = width * 0.6;
        this.drawLine(x1, y1, x2, y2);

        this.context.strokeStyle = `hsla(${h}, ${s}%, ${l + ((100 - l) * 0.6)}%)`;
        this.context.lineWidth = width * 0.4;
        this.drawLine(x1, y1, x2, y2);

        this.context.strokeStyle = `hsla(${h}, ${s}%, ${l + ((100 - l) * 0.8)}%)`;
        this.context.lineWidth = width * 0.1;
        this.drawLine(x1, y1, x2, y2);
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    private clearScreen() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
