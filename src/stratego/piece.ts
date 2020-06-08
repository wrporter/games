import {Color} from "./color";
import {ImageService} from "./image/images.service";
import {Direction, Position} from "./position";
import {getRankKey, getRankValue, Rank} from "./rank";

export enum AttackResult {
    Tie = "Tie",
    Win = "Win",
    Lose = "Lose",
}

export class Piece {
    constructor(private rank: Rank,
                private color: Color) {
    }

    public draw(context: CanvasRenderingContext2D, x: number, y: number) {
        this.drawColor(context, x, y);
        this.drawRank(context, x, y);
    }

    public drawColor(context: CanvasRenderingContext2D, x: number, y: number): void {
        context.drawImage(ImageService.getInstance().getColorImage(this.color), x + 1, y + 1, 78, 78);
    }

    public drawRank(context: CanvasRenderingContext2D, x: number, y: number): void {
        context.drawImage(ImageService.getInstance().getRankImage(this.rank), x + 15, y + 20, 50, 50);
        context.textAlign = "start";
        context.textBaseline = "alphabetic";
        context.fillStyle = "#ccc";
        context.font = "bold 16px 'Courier New'";
        context.fillText(getRankKey(this.rank), x + 18, y + 25);
    }

    public getRank(): Rank {
        return this.rank;
    }

    public getColor(): Color {
        return this.color;
    }

    public compare(defender: Piece): AttackResult {
        if (this.rank === defender.getRank()) {
            return AttackResult.Tie;
        } else if (
            (this.rank === Rank.Miner && defender.getRank() === Rank.Bomb) ||
            (this.rank === Rank.Spy && defender.getRank() === Rank.Marshal) ||
            (getRankValue(this.rank) < getRankValue(defender.getRank()))
        ) {
            return AttackResult.Win;
        } else {
            return AttackResult.Lose;
        }
    }

    public getValidMovePositions(board: (Piece | undefined)[][], position: Position): Position[] {
        const positions: Position[] = [];
        if (this.rank === Rank.Bomb || this.rank === Rank.Flag) {
            return positions;
        }

        this.pushPositionIfValid(board, positions, Direction.Above, position);
        this.pushPositionIfValid(board, positions, Direction.Right, position);
        this.pushPositionIfValid(board, positions, Direction.Below, position);
        this.pushPositionIfValid(board, positions, Direction.Left, position);

        return positions;
    }

    private pushPositionIfValid(board: (Piece | undefined)[][], positions: Position[], direction: Direction,
                                position: Position): void {
        if (this.rank === Rank.Scout) {
            let newPosition = position;
            while (this.isValidMovePosition(board, newPosition.getPosition(direction))) {
                positions.push(newPosition.getPosition(direction));
                newPosition = newPosition.getPosition(direction);
                if (board[newPosition.getRow()][newPosition.getCol()] !== undefined) {
                    break;
                }
            }
        } else if (this.isValidMovePosition.apply(this, [board, position.getPosition(direction)])) {
            positions.push(position.getPosition(direction));
        }
    }

    private isValidMovePosition(board: (Piece | undefined)[][], position: Position): boolean {
        return position && position.isInBounds() && !position.isWater() &&
            board[position.getRow()][position.getCol()]?.getColor() !== this.color;
    }
}
