export enum Mark {
    Empty = '.',
    X = 'X',
    O = 'O',
}

export enum GameResult {
    Pending = 'Pending',
    XWin = 'X',
    OWin = 'O',
    Draw = 'Draw',
}

export default class TicTacToe {
    private readonly board: Mark[][];
    private turn: Mark.X | Mark.O;
    private moveCount: number;
    private gameResult: GameResult;

    constructor() {
        this.board = [
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
        ];
        this.turn = Mark.X;
        this.moveCount = 0;
        this.gameResult = GameResult.Pending;
    }

    move(row: number, column: number): boolean {
        if (!this.isAlreadyMarked(row, column)) {
            this.moveCount++;
            this.board[row][column] = this.turn;
            this.gameResult = this.getGameResultForMove(row, column);
            this.switchTurns();
            return true;
        }
        return false;
    }

    getGameResult(): GameResult {
        return this.gameResult;
    }

    getBoard(): Mark[][] {
        return this.board;
    }

    private getGameResultForMove(row: number, column: number): GameResult {
        if (this.isWinRow(column) || this.isWinColumn(row) || this.isWinForwardDiagonal() || this.isWinBackwardDiagonal()) {
            if (this.turn === Mark.X) {
                return GameResult.XWin;
            } else {
                return GameResult.OWin;
            }
        }

        if (this.isDraw()) {
            return GameResult.Draw;
        }

        return GameResult.Pending;
    }

    private isWinRow(column: number) {
        let win = true;

        for (let row = 0; row < this.board.length; row++) {
            if (this.board[row][column] !== this.turn) {
                win = false;
            }
        }

        return win;
    }

    private isWinColumn(row: number) {
        let win = true;

        for (let column = 0; column < this.board[row].length; column++) {
            if (this.board[row][column] !== this.turn) {
                win = false;
            }
        }

        return win;
    }

    private isWinForwardDiagonal(): boolean {
        let win = true;

        for (let rowCol = 0; rowCol < this.board.length; rowCol++) {
            if (this.board[rowCol][rowCol] !== this.turn) {
                win = false;
            }
        }

        return win;
    }

    private isWinBackwardDiagonal(): boolean {
        let win = true;

        for (let rowCol = 0; rowCol < this.board.length; rowCol++) {
            if (this.board[rowCol][this.board.length - rowCol - 1] !== this.turn) {
                win = false;
            }
        }

        return win;
    }

    private isDraw(): boolean {
        return this.moveCount === this.board.length * this.board[0].length;
    }

    private isAlreadyMarked(row: number, column: number): boolean {
        return this.board[row][column] !== Mark.Empty;
    }

    private switchTurns() {
        if (this.turn === Mark.X) {
            this.turn = Mark.O;
        } else {
            this.turn = Mark.X;
        }
    }
}
