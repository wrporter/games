import React from "react";
import {Howl} from 'howler';
import Canvas from "./Canvas";
import styles from "./TicTacToe.module.scss";
import {GameResult} from "./Model";
import {clashClash, laserHit2} from "../MusicPlayer/audio/sounds";
import {useTicTacToeContext} from "./TicTacToeContext";

const sounds = [
    new Howl({src: clashClash}),
    new Howl({src: laserHit2}),
];

type TicTacToeComponentProps = {
    onGameEnd: (result: GameResult) => void;
}

export default function CanvasComponent({onGameEnd}: TicTacToeComponentProps) {
    let turn = 0;
    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const gameRef = React.useRef<Canvas>();
    const {emitter} = useTicTacToeContext();

    function resize() {
        if (canvasRef.current && canvasContainerRef.current) {
            const height = canvasContainerRef.current.clientHeight;
            const width = canvasContainerRef.current.clientWidth;
            let length = width;
            if (height < width) {
                length = height;
            }
            canvasRef.current.style.height = `${length}px`;
            canvasRef.current.style.width = `${length}px`;

            gameRef.current?.render();
        }
    }

    React.useLayoutEffect(() => {
        if (canvasRef.current && canvasContainerRef.current) {
            resize();
            gameRef.current = new Canvas(canvasRef.current);
        }

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);

    React.useEffect(() => {
        emitter.on('new', () => {
            gameRef.current?.newGame();
        });
    }, [emitter]);

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (gameRef.current && !gameRef.current.gameOver()) {
            const moved = gameRef.current.handleClick(event.nativeEvent);
            if (moved) {
                sounds[turn].play();
                turn = (turn + 1) % 2;
            }

            if (gameRef.current.gameOver()) {
                onGameEnd(gameRef.current.getGameResult());
            }
        }
    }

    return (
        <div className={styles.gameContainer}>
            <div ref={canvasContainerRef} className={styles.canvasContainer}>
                <canvas className={styles.canvas} ref={canvasRef} onClick={handleClick}/>
            </div>
        </div>
    );
}
