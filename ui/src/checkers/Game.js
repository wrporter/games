import Player from "./Player";
import {constants} from "./Constants";
import Move from "./Move";
import Piece from "./Piece";
import Square from "./Square";

export default function Game(canvas) {
    var self = this;
    this.canvas = canvas;
    var context = self.canvas.getContext("2d");
    var players;
    var board;
    var selection;
    var jumping = false;
    var turn = 0;

    this.setup = function () {
        jumping = false;
        turn = 0;
        setupBoard();
        setupPieces();
        players = [new Player(constants.PLAYER_COLOR[0]), new Player(constants.PLAYER_COLOR[1])];
        drawBoard();
        // $("#turn").css("background", players[turn].color);
    };

    this.processClick = function (event) {
        var rect = self.canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var row = Math.floor(y / constants.SQUARE_LENGTH);
        var col = Math.floor(x / constants.SQUARE_LENGTH);
        var piece = board[row][col].piece;

        if (selection) {
            var fromRow = selection.row;
            var fromCol = selection.col;
            if (!jumping)
                deselect();
            var move = getValidMove(fromRow, fromCol, row, col);
            if (move) {
                move.perform(board, context);
                var jumps = getJumps(row, col, players[turn].color, board[row][col].piece.king);
                if (move.isJump() > 0 && jumps.length > 0) {
                    jumping = true;
                    select(move.toRow, move.toCol);
                } else {
                    if (producesKing(move)) {
                        king(move.toRow, move.toCol);
                    }
                    deselect();
                    jumping = false;
                    endTurn();
                }
            }
        } else if (piece) {
            select(row, col);
        }
    };

    var setupBoard = function () {
        board = new Array(constants.NUM_ROWS);
        for (var row = 0; row < constants.NUM_ROWS; row++) {
            board[row] = new Array(constants.NUM_COLS);
            for (var col = 0; col < constants.NUM_COLS; col++) {
                board[row][col] = new Square(getSquareColor(row, col));
            }
        }
    };

    var setupPieces = function () {
        setupPiecesForRows(constants.PLAYER_COLOR[0], 5, constants.NUM_ROWS);
        setupPiecesForRows(constants.PLAYER_COLOR[1], 0, 3);
    };

    var setupPiecesForRows = function (color, startRow, endRow) {
        for (var row = startRow; row < endRow; row++) {
            for (var col = 0; col < constants.NUM_COLS; col++) {
                if (isValidCheckerSquare(row, col))
                    board[row][col].piece = new Piece(color);
            }
        }
    };

    var getSquareColor = function (row, col) {
        return isValidCheckerSquare(row, col) ? constants.SQUARE_COLOR[0] : constants.SQUARE_COLOR[1];
    };

    var drawBoard = function () {
        for (var row = 0; row < constants.NUM_ROWS; row++) {
            for (var col = 0; col < constants.NUM_COLS; col++) {
                board[row][col].draw(context, row, col);
            }
        }
    };

    var isValidCheckerSquare = function (row, col) {
        return row % 2 === col % 2;

    };

    var deselect = function () {
        if (!selection)
            return;
        var row = selection.row;
        var col = selection.col;

        board[row][col].draw(context, row, col);
        dehighlightMoves(selection.moves);
        selection = undefined;
    };

    var select = function (row, col) {
        if (!board[row][col].piece)
            return;
        if (board[row][col].piece.color !== players[turn].color)
            return;
        var moves = getMoves(row, col);
        selection = {"row": row, "col": col, "moves": moves};
        board[row][col].highlight(context, row, col, constants.HIGHLIGHT_COLOR);
        highlightMoves(moves);
    };

    var dehighlightMoves = function (moves) {
        if (!moves)
            return;
        for (var i = 0; i < moves.length; i++) {
            var row = moves[i].toRow;
            var col = moves[i].toCol;
            board[row][col].draw(context, row, col);
            dehighlightMoves(moves[i].jumps);
        }
    };

    var highlightMoves = function (moves) {
        if (!moves)
            return;
        for (var i = 0; i < moves.length; i++) {
            var row = moves[i].toRow;
            var col = moves[i].toCol;
            board[row][col].highlight(context, row, col, constants.HIGHLIGHT_MOVE_COLOR);
            highlightMoves(moves[i].jumps);
        }
    };

    var endTurn = function () {
        turn = (turn + 1) % 2;
        // $("#turn").css("background", players[turn].color);
    };

    var getMoves = function (row, col) {
        var moves = [];

        // Get jumps first
        var legalMoves = getAllJumps();

        // Jumping takes precedence over all other moves
        if (legalMoves.length === 0) {
            legalMoves = getAllMoves();
        }

        for (var i = 0; i < legalMoves.length; i++) {
            if (legalMoves[i].isFrom(row, col))
                moves.push(legalMoves[i]);
        }
        return moves;
    };

    var getAllJumps = function () {
        var color = players[turn].color;
        var moves = [];

        for (var row = 0; row < constants.NUM_ROWS; row++) {
            for (var col = 0; col < constants.NUM_COLS; col++) {
                var piece = board[row][col].piece;
                if (piece && piece.color === color) {
                    moves.push.apply(moves, getJumps(row, col, color, piece.king));
                }
            }
        }
        return moves;
    };

    var getJumps = function (row, col, color, king) {
        var move;
        var moves = [];

        if (king || color === players[0].color) {
            if (inBounds(row - 1, col - 1) && board[row - 1][col - 1].isOccupied()
                && board[row - 1][col - 1].piece.color !== color
                && inBounds(row - 2, col - 2) && !board[row - 2][col - 2].isOccupied()) {
                move = new Move(row, col, row - 2, col - 2);
                // move.jumps.push.apply(move.jumps, getJumps(move.toRow, move.toCol, color, king));
                moves.push(move);
            }
            if (inBounds(row - 1, col + 1) && board[row - 1][col + 1].isOccupied()
                && board[row - 1][col + 1].piece.color !== color
                && inBounds(row - 2, col + 2) && !board[row - 2][col + 2].isOccupied()) {
                move = new Move(row, col, row - 2, col + 2);
                // move.jumps.push.apply(move.jumps, getJumps(move.toRow, move.toCol, color, king));
                moves.push(move);
            }
        }
        if (king || color === players[1].color) {
            if (inBounds(row + 1, col - 1) && board[row + 1][col - 1].isOccupied()
                && board[row + 1][col - 1].piece.color !== color
                && inBounds(row + 2, col - 2) && !board[row + 2][col - 2].isOccupied()) {
                move = new Move(row, col, row + 2, col - 2);
                // move.jumps.push.apply(move.jumps, getJumps(move.toRow, move.toCol, color, king));
                moves.push(move);
            }
            if (inBounds(row + 1, col + 1) && board[row + 1][col + 1].isOccupied()
                && board[row + 1][col + 1].piece.color !== color
                && inBounds(row + 2, col + 2) && !board[row + 2][col + 2].isOccupied()) {
                move = new Move(row, col, row + 2, col + 2);
                // move.jumps.push.apply(move.jumps, getJumps(move.toRow, move.toCol, color, king));
                moves.push(move);
            }
        }
        return moves;
    };

    var getAllMoves = function () {
        var player = players[turn];
        var moves = [];
        for (var row = 0; row < constants.NUM_ROWS; row++) {
            for (var col = 0; col < constants.NUM_COLS; col++) {
                var piece = board[row][col].piece;
                if (piece && player.color === piece.color) {
                    if (players[0].color === piece.color || piece.king) {
                        if (inBounds(row - 1, col - 1) && !board[row - 1][col - 1].isOccupied())
                            moves.push(new Move(row, col, row - 1, col - 1));
                        if (inBounds(row - 1, col + 1) && !board[row - 1][col + 1].isOccupied())
                            moves.push(new Move(row, col, row - 1, col + 1));
                    }
                    if (players[1].color === piece.color || piece.king) {
                        if (inBounds(row + 1, col - 1) && !board[row + 1][col - 1].isOccupied())
                            moves.push(new Move(row, col, row + 1, col - 1));
                        if (inBounds(row + 1, col + 1) && !board[row + 1][col + 1].isOccupied())
                            moves.push(new Move(row, col, row + 1, col + 1));
                    }
                }
            }
        }
        return moves;
    };

    var inBounds = function (row, col) {
        return row >= 0 && row < constants.NUM_ROWS && col >= 0 && col < constants.NUM_COLS;
    };

    var getValidMove = function (fromRow, fromCol, toRow, toCol) {
        var moves = getMoves(fromRow, fromCol);
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].fromRow === fromRow
                && moves[i].fromCol === fromCol
                && moves[i].toRow === toRow
                && moves[i].toCol === toCol)
                return moves[i];
        }
        return undefined;
    };

    var producesKing = function (move) {
        return (move.toRow === 0 && turn === 0) || (move.toRow === 7 && turn === 1);
    };

    var king = function (row, col) {
        var piece = board[row][col].piece;
        if (piece) {
            piece.king = true;
            board[row][col].draw(context, row, col);
        }
    };
};