import React from "react";
import {constants} from "./Constants";
import Game from "./Game";

export default function Checkers() {
    const newGameRef = React.useRef<HTMLButtonElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    let game: Game;

    React.useLayoutEffect(() => {
        if (canvasRef.current) {
            constants.SQUARE_LENGTH = canvasRef.current.height / constants.NUM_ROWS;
            constants.PIECE_RADIUS = constants.SQUARE_LENGTH / 2 * 0.7;
        }
    }, [])

    const handleNewGame = () => {
        game = new Game(canvasRef.current);
        game.setup();
    };

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        game.processClick(event);
    }

    return (
        <div>
            <h1>Checkers</h1>
            <div><button ref={newGameRef} onClick={handleNewGame}>New Game</button></div>
            <canvas ref={canvasRef} onClick={handleClick} width={400} height={400} />
        </div>
    )
}
