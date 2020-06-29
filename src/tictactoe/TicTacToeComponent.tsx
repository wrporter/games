import React from "react";
import {Howl} from 'howler';
import TicTacToeCanvas from "./TicTacToeCanvas";
import styles from "./TicTacToe.module.scss";
import {GameResult} from "./TicTacToe";
import * as music from './audio/music';
import {finalFantasyVictory} from './audio/victory';
import {clashClash, laserHit2} from './audio/sounds';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../ReactModal";

function random(size: number) {
    return Math.floor(Math.random() * size);
}

const songs = Object.values(music)
    .map(song => new Howl({src: song, loop: true}));
const victory = new Howl({src: finalFantasyVictory});
const sounds = [
    new Howl({src: clashClash}),
    new Howl({src: laserHit2}),
];

export default function TicTacToeComponent() {
    let turn = 0;

    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const gameRef = React.useRef<TicTacToeCanvas>();
    const [result, setResult] = React.useState(GameResult.Pending);
    const [modalIsOpen, setModalIsOpen] = React.useState(true);

    function resize() {
        if (canvasRef.current && canvasContainerRef.current) {
            const height = canvasContainerRef.current.clientHeight;
            const width = canvasContainerRef.current.clientWidth;
            let length = width;
            if (height < width) {
                length = height;
            }
            console.log('container', height, width)
            canvasRef.current.style.height = `${length}px`;
            canvasRef.current.style.width = `${length}px`;

            gameRef.current?.render();
        }
    }

    React.useLayoutEffect(() => {
        if (canvasRef.current && canvasContainerRef.current) {
            resize();
            gameRef.current = new TicTacToeCanvas(canvasRef.current);
        }

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);

    const handleNewGame = () => {
        victory.stop();

        if (gameRef.current) {
            setResult(GameResult.Pending);
            gameRef.current.newGame();
            setModalIsOpen(false);

            songs[random(songs.length)].play();
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (gameRef.current && !gameRef.current.gameOver()) {
            const moved = gameRef.current.handleClick(event.nativeEvent);
            if (moved) {
                sounds[turn].play();
                turn = (turn + 1) % 2;
            }

            if (gameRef.current.gameOver()) {
                songs.forEach(song => song.stop());
                victory.play();
                setResult(gameRef.current.getGameResult());
                setModalIsOpen(true);
            }
        }
    }

    return (
        <div className={styles.game}>
            <Modal isOpen={modalIsOpen}>
                <ModalHeader>Tic Tac Toe</ModalHeader>
                <ModalBody>
                    {result !== GameResult.Pending ? (
                        <div className={styles.result}>
                            {result === GameResult.Draw && 'Draw!'}
                            {result === GameResult.XWin && 'X Wins!'}
                            {result === GameResult.OWin && 'O Wins!'}
                        </div>
                    ) : <div>Let's play!</div>}
                </ModalBody>
                <ModalFooter>
                    <button onClick={handleNewGame}>New Game</button>
                </ModalFooter>
            </Modal>

            <div className={styles.gameContainer}>
                <div ref={canvasContainerRef} className={styles.canvasContainer}>
                    <canvas className={styles.canvas} ref={canvasRef} onClick={handleClick} />
                </div>
            </div>

            <div className={styles.controlPane}>
                Control pane
            </div>
        </div>
    );
}
