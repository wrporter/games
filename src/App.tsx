import React from 'react';
import styles from './App.module.scss';
import {ImageService} from "./stratego/image/images.service";
import {Game} from "./stratego/game";
import {SetupService} from "./stratego/setup.service";
import Checkers from "./checkers/Checkers";
import TicTacToeComponent from "./tictactoe/TicTacToeComponent";

function App() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const game = React.useRef<Game>();

    React.useLayoutEffect(() => {
        if (canvasRef.current) {
            const imageService = ImageService.getInstance();
            game.current = new Game(canvasRef.current!, new SetupService().getDefaultSetup());
            imageService.getPromisifiedImages().then(() => {
                game.current?.draw();
            });
        }
    }, [game])

    const handleStart = () => {
        game.current?.start();
    };

    return (
        <div className={styles.App}>
            {/*<div className="stars"/>*/}
            {/*<div className="twinkling"/>*/}
            {/*<div className="clouds"/>*/}

            <div className={styles.header}>
                Tic Tac Toe
            </div>

            <div className={styles.content}>
                <TicTacToeComponent/>

                {/*<h1>Stratego</h1>*/}
                {/*<div style={{marginBottom: 12}}>*/}
                {/*    <button onClick={handleStart}>Start</button>*/}
                {/*</div>*/}
                {/*<canvas className={styles.board} ref={canvasRef} />*/}

                {/*<Checkers />*/}
            </div>
        </div>
    );
}

export default App;
