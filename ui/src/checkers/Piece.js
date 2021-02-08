import {constants} from "./Constants";

export default function Piece(color) {
    var self = this;
    this.color = color;
    this.king = false;

    this.draw = function (context, row, col) {
        var x = col * constants.SQUARE_LENGTH + constants.SQUARE_LENGTH / 2;
        var y = row * constants.SQUARE_LENGTH + constants.SQUARE_LENGTH / 2 + 2;

        context.fillStyle = self.color;
        context.strokeStyle = constants.PIECE_BORDER;
        context.lineWidth = 1;

        drawCircle(context, x, y, constants.PIECE_RADIUS);
        drawCircle(context, x, y - 4, constants.PIECE_RADIUS);

        if (self.king)
            drawKing(context, x, y + 2);
    };

    var drawCircle = function (context, x, y, radius) {
        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    };

    var drawKing = function (context, x, y) {
        context.fillStyle = constants.KING_COLOR;
        context.font = "16px Arial";
        context.textAlign = "center";
        context.fillText("K", x, y);
    };
};