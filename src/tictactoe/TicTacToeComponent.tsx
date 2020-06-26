import React from "react";
import Modal from 'react-modal';
import useSound from 'use-sound';
import TicTacToeCanvas from "./TicTacToeCanvas";
import styles from "./tic-tac-toe.module.scss";
import {GameResult} from "./TicTacToe";
import * as music from './audio/music';
import {finalFantasyVictory} from './audio/victory';
import {clashClash, laserHit2} from './audio/sounds';

Modal.setAppElement(document.body);

function randomProperty(obj: { [key: string]: string; }) {
    const keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
}

export default function TicTacToeComponent() {
    const [song, setSong] = React.useState(randomProperty(music));
    const options: any = {loop: true};
    const [playSong, {stop: stopSong}] = useSound(song, options);
    const [playVictory, {stop: stopVictory}] = useSound(finalFantasyVictory);

    const [sound, setSound] = React.useState(clashClash);
    const [playSound] = useSound(sound);

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const gameRef = React.useRef<TicTacToeCanvas>();
    const [result, setResult] = React.useState(GameResult.Pending);
    const [modalIsOpen, setModalIsOpen] = React.useState(true);

    const handleRender = () => {
        gameRef.current?.render();
    };

    React.useLayoutEffect(() => {
        if (canvasRef.current) {
            gameRef.current = new TicTacToeCanvas(canvasRef.current);
        }

        window.addEventListener('resize', handleRender);
        return () => {
            window.removeEventListener('resize', handleRender);
        }
    }, []);

    const handleNewGame = () => {
        stopVictory();

        if (gameRef.current) {
            setResult(GameResult.Pending);
            gameRef.current.newGame();
            setModalIsOpen(false);

            setSong(randomProperty(music));
            playSong();
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (gameRef.current && !gameRef.current.gameOver()) {
            const moved = gameRef.current.handleClick(event.nativeEvent);
            if (moved) {
                playSound();
            }

            if (gameRef.current.getGameResult() !== GameResult.Pending) {
                stopSong();
                playVictory();
                setResult(gameRef.current.getGameResult());
                setModalIsOpen(true);
            }

            if (moved) {
                if (sound === clashClash) {
                    setSound(laserHit2);
                } else {
                    setSound(clashClash);
                }
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
