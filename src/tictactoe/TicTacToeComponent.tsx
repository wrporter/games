import React from "react";
import Modal from 'react-modal';
import {Howl} from 'howler';
import TicTacToeCanvas from "./TicTacToeCanvas";
import styles from "./tic-tac-toe.module.scss";
import {GameResult} from "./TicTacToe";
import * as music from './audio/music';
import {finalFantasyVictory} from './audio/victory';
import {clashClash, laserHit2} from './audio/sounds';

function random<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

const songs = Object.values(music)
    .map(song => new Howl({src: song, loop: true}));
const victory = new Howl({src: finalFantasyVictory});
const sounds = [
    new Howl({src: clashClash}),
    new Howl({src: laserHit2}),
];

export default function TicTacToeComponent() {
    const [song, setSong] = React.useState(random(songs));
    const [turn, setTurn] = React.useState(0);

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const gameRef = React.useRef<TicTacToeCanvas>();
    const [result, setResult] = React.useState(GameResult.Pending);
    const [modalIsOpen, setModalIsOpen] = React.useState(true);

    const handleRender = () => {
        gameRef.current?.render();
    };

    React.useLayoutEffect(() => {
        Modal.setAppElement(document.body);

        if (canvasRef.current) {
            gameRef.current = new TicTacToeCanvas(canvasRef.current);
        }

        window.addEventListener('resize', handleRender);
        return () => {
            window.removeEventListener('resize', handleRender);
        }
    }, []);

    const handleNewGame = () => {
        victory.stop();

        if (gameRef.current) {
            setResult(GameResult.Pending);
            gameRef.current.newGame();
            setModalIsOpen(false);

            setSong(random(songs));
            song.play();
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (gameRef.current && !gameRef.current.gameOver()) {
            const moved = gameRef.current.handleClick(event.nativeEvent);
            if (moved) {
                sounds[turn].play();
                setTurn((turn + 1) % 2);
            }

            if (gameRef.current.getGameResult() !== GameResult.Pending) {
                victory.play();
                setResult(gameRef.current.getGameResult());
                setModalIsOpen(true);
            }
        }
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
            >
                <div className={styles.modalHeader}>Tic Tac Toe</div>
                <div className={styles.modalBody}>
                    {result !== GameResult.Pending ? (
                        <div className={styles.result}>
                            {result === GameResult.Draw && 'Draw!'}
                            {result === GameResult.XWin && 'X Wins!'}
                            {result === GameResult.OWin && 'O Wins!'}
                        </div>
                    ) : <div>Let's play!</div>}
                </div>
                <div className={styles.modalFooter}>
                    <button onClick={handleNewGame}>New Game</button>
                </div>
            </Modal>

            <canvas className={styles.canvas} ref={canvasRef} onClick={handleClick}/>
        </div>
    );
}
