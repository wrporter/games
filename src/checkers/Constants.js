export default class Constants {
    constructor() {
        this.SQUARE_COLOR = ["#9f7119", "#debf83"];
        this.PLAYER_COLOR = ["#721010", "#000000"];
        this.PIECE_BORDER = "#999999";
        this.KING_COLOR = "#60f0f5";

        this.NUM_ROWS = 8;
        this.NUM_COLS = 8;

        this.HIGHLIGHT_LINE_WIDTH = 3;
        this.HIGHLIGHT_COLOR = "#54e68a";
        this.HIGHLIGHT_MOVE_COLOR = "#ec4696";

        this.SQUARE_LENGTH = undefined;
        this.PIECE_RADIUS = undefined;
    }
}

const constants = new Constants();

export { constants };
