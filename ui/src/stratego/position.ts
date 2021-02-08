export enum Direction {
    Above = "Above",
    Below = "Below",
    Left = "Left",
    Right = "Right",
}

export class Position {
    constructor(private row: number, private col: number) {
    }

    public isInBounds() {
        return this.row >= 0 && this.row <= 9
            && this.col >= 0 && this.col <= 9;
    }

    public isWater() {
        return (this.row === 4 || this.row === 5)
            && (this.col === 2 || this.col === 3 || this.col === 6 || this.col === 7);
    }

    public above(): Position {
        return new Position(this.row - 1, this.col);
    }

    public below(): Position {
        return new Position(this.row + 1, this.col);
    }

    public right(): Position {
        return new Position(this.row, this.col + 1);
    }

    public left(): Position {
        return new Position(this.row, this.col - 1);
    }

    public getPosition(direction: Direction): Position {
        if (direction === Direction.Above) {
            return this.above();
        } else if (direction === Direction.Below) {
            return this.below();
        } else if (direction === Direction.Left) {
            return this.left();
        } else if (direction === Direction.Right) {
            return this.right();
        } else {
            throw new Error(`Invalid direction: ${direction}`);
        }
    }

    public getRow() {
        return this.row;
    }

    public getCol() {
        return this.col;
    }

    public equals(position: Position): boolean {
        return this.row === position.getRow() && this.col === position.getCol();
    }
}
