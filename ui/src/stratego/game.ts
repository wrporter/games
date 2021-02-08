import {Modal} from "../modal/modal";
import {Board} from "./board";
import {Color} from "./color";
import {AttackResult, Piece} from "./piece";
import {Position} from "./position";

export class Game {
    private readonly BORDER_LENGTH = 15;
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private board: Board;
    private setup: (Piece | undefined)[][];
    private selected?: Position;
    private turn: (Color | undefined);

    constructor(canvas: HTMLCanvasElement, setup: (Piece | undefined)[][]) {
        this.canvas = canvas;
        // this.turn = Color.Blue;
        this.context = canvas.getContext("2d")!;
        this.board = new Board(canvas);
        this.setup = setup;
        this.draw();

        this.canvas.onclick = (event: MouseEvent) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = event.clientX - rect.left - this.BORDER_LENGTH;
            const y = event.clientY - rect.top - this.BORDER_LENGTH;
            const row = Math.floor(y / this.board.SQUARE_LENGTH);
            const col = Math.floor(x / this.board.SQUARE_LENGTH);
            this.handleClick(new Position(row, col));
        };
    }

    public start() {
        this.turn = Color.Blue;
        const modal = new Modal();
        modal.afterClose(() => {
            this.draw();
        });
        modal.show(`The game has begun! It is now ${this.turn}'s turn.`);
    }

    public draw(): void {
        this.board.draw();
        this.drawPieces();
    }

    private drawPieces(): void {
        this.setup.forEach((row, rowIndex) => {
            row.forEach((piece, colIndex) => {
                if (piece) {
                    const x = colIndex * this.board.SQUARE_LENGTH;
                    const y = rowIndex * this.board.SQUARE_LENGTH;

                    if (this.turn === piece.getColor()) {
                        piece.draw(this.context, x, y);
                    } else {
                        piece.drawColor(this.context, x, y);
                    }
                }
            });
        });
    }

    private handleClick(position: Position): void {
        if (this.selected) {
            if (this.isValidMovePosition(position)) {
                this.movePiece(this.selected, position);
                this.deselect();
                this.draw();
                this.endTurn();
            } else if (this.getPiece(position) && this.getPiece(position).getColor() === this.turn) {
                this.deselect();
                this.draw();
                this.select(position);
            }
        } else if (this.getPiece(position) && this.getPiece(position).getColor() === this.turn) {
            this.select(position);
        }
    }

    private endTurn() {
        const previousTurn = this.turn;
        delete this.turn;
        this.draw();
        this.turn = previousTurn;
        this.turn = this.turn === Color.Blue ? Color.Red : Color.Blue;

        const modal = new Modal();
        modal.afterClose(() => {
            this.draw();
        });
        modal.show(`It is now ${this.turn}'s turn.`);
    }

    private getPiece(position: Position): Piece {
        return this.setup[position.getRow()][position.getCol()]!;
    }

    private isValidMovePosition(position: Position): boolean {
        return this.getPiece(this.selected!).getValidMovePositions(this.setup, this.selected!)
            .find((validMovePosition: Position) => position.equals(validMovePosition)) !== undefined;
    }

    private movePiece(from: Position, to: Position) {
        const attacker = this.getPiece(from);
        const defender = this.getPiece(to);

        if (defender && defender.getColor() !== attacker.getColor()) {

            const attackResult = attacker.compare(defender);

            if (attackResult === AttackResult.Tie) {
                this.removePiece(to);
                this.removePiece(from);
            } else if (attackResult === AttackResult.Win) {
                this.removePiece(to);
                this.removePiece(from);
                this.setup[to.getRow()][to.getCol()] = attacker;
            } else if (attackResult === AttackResult.Lose) {
                this.removePiece(from);
            }
        } else {
            this.setup[to.getRow()][to.getCol()] = attacker;
            this.removePiece(from);
        }
    }

    private select(position: Position): void {
        this.selected = position;
        this.highlightSelectedPiece(position);
        this.getPiece(position).getValidMovePositions(this.setup, position)
            .forEach((movePosition: Position) => {
                this.highlightValidMovePosition(movePosition);
            });
    }

    private removePiece(position: Position) {
        this.setup[position.getRow()][position.getCol()] = undefined;
    }

    private deselect(): void {
        delete this.selected;
    }

    private highlightSelectedPiece(position: Position): void {
        this.highlight(position, "#00ddff");
    }

    private highlightValidMovePosition(position: Position): void {
        this.highlight(position, "#ffd200");
    }

    private highlight(position: Position, color: string): void {
        const x = position.getCol() * this.board.SQUARE_LENGTH;
        const y = position.getRow() * this.board.SQUARE_LENGTH;
        this.context.globalAlpha = 0.4;
        this.context.fillStyle = color;
        this.context.fillRect(x + 1, y + 1, this.board.SQUARE_LENGTH - 2, this.board.SQUARE_LENGTH - 2);
        this.context.globalAlpha = 1;
    }
}
