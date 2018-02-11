import {Color} from "./color";
import {Piece} from "./piece";
import {getRank} from "./rank";

export class SetupService {
    private DEFAULT_SETUP: number[][] = [
        [11, 0, 9, 0, 8, 7, 0, 9, 0, 8],
        [0, 4, 7, 4, 10, 8, 7, 6, 5, 8],
        [6, 9, 5, 3, 4, 9, 9, 8, 0, 1],
        [9, 6, 2, 5, 9, 6, 5, 3, 7, 9],
        [null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null],
        [9, 3, 5, 7, 1, 2, 5, 6, 3, 8],
        [6, 8, 8, 9, 0, 9, 5, 9, 4, 0],
        [4, 9, 0, 9, 4, 8, 7, 0, 10, 6],
        [9, 0, 11, 0, 5, 8, 9, 6, 7, 7],
    ];

    public getDefaultSetup(): Piece[][] {
        return this.toPieces(this.DEFAULT_SETUP);
    }

    private toPieces(numbers: number[][]): Piece[][] {
        const pieces: Piece[][] = [];

        this.DEFAULT_SETUP.forEach((numberRow: number[], row: number) => {
            const pieceRow: Piece[] = [null, null, null, null, null, null, null, null, null, null];
            numberRow.filter((value) => value !== null).forEach((rankValue: number, colIndex) => {
                const color = row < 4 ? Color.Blue : Color.Red;
                pieceRow[colIndex] = new Piece(getRank(rankValue), color);
            });
            pieces.push(pieceRow);
        });

        return pieces;
    }
}
