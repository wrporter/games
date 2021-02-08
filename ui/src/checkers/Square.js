import {constants} from "./Constants";

export default function Square(color) {
    var self = this;
    this.color = color;
    this.piece = undefined;

    this.isOccupied = function () {
        return self.piece !== undefined;
    };

    this.draw = function (context, row, col) {
        var x = col * constants.SQUARE_LENGTH;
        var y = row * constants.SQUARE_LENGTH;
        context.fillStyle = self.color;
        context.fillRect(x, y, constants.SQUARE_LENGTH, constants.SQUARE_LENGTH);
        if (self.piece)
            self.piece.draw(context, row, col);
    };

    this.highlight = function (context, row, col, highlightColor) {
        var x = col * constants.SQUARE_LENGTH;
        var y = row * constants.SQUARE_LENGTH;
        context.globalAlpha = 0.5;
        context.fillStyle = highlightColor;
        context.fillRect(x, y, constants.SQUARE_LENGTH, constants.SQUARE_LENGTH);
        context.globalAlpha = 1;
    };
};
