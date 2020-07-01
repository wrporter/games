import React from "react";
import {Howl} from 'howler';
import TicTacToeCanvas from "./TicTacToeCanvas";
import styles from "./TicTacToe.module.scss";
import {GameResult} from "./TicTacToe";
import {finalFantasyVictory} from "../MusicPlayer/audio/victory";
import {clashClash, laserHit2} from "../MusicPlayer/audio/sounds";
import {MusicPlayer} from "../MusicPlayer";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    useMediaQuery,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import {makeStyles} from "@material-ui/core/styles";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../ReactModal";

const victory = new Howl({src: finalFantasyVictory});
const sounds = [
    new Howl({src: clashClash}),
    new Howl({src: laserHit2}),
];

const useStyles = makeStyles(() => ({
    list: {
        width: '100%',
        maxWidth: 300,
    },
}));

export default function TicTacToeComponent() {
    const classes = useStyles();
    const [playingMusic, setPlayingMusic] = React.useState(false);
    let turn = 0;

    const canvasContainerRef = React.useRef<HTMLDivElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const gameRef = React.useRef<TicTacToeCanvas>();
    const [result, setResult] = React.useState(GameResult.Pending);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);

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
            gameRef.current = new TicTacToeCanvas(canvasRef.current);
        }

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
        }
    }, []);

    const handleNewGame = () => {
        if (gameRef.current) {
            setResult(GameResult.Pending);
            gameRef.current.newGame();
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
                victory.play();
                setResult(gameRef.current.getGameResult());
                setModalIsOpen(true);
            }
        }
    }

    const handleCloseModal = () => {
        victory.stop();
        setModalIsOpen(false);
    }

    return (
        <div className={styles.game}>
            <Modal isOpen={modalIsOpen}>
                <ModalHeader>Tic Tac Toe</ModalHeader>
                <ModalBody>
                    {
                        result !== GameResult.Pending && (
                            <div className={styles.result}>
                                {result === GameResult.Draw && 'Draw!'}
                                {result === GameResult.XWin && 'X Wins!'}
                                {result === GameResult.OWin && 'O Wins!'}
                            </div>
                        )
                    }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleCloseModal}>Okay!</Button>
                </ModalFooter>
            </Modal>

            <div className={styles.gameContainer}>
                <div ref={canvasContainerRef} className={styles.canvasContainer}>
                    <canvas className={styles.canvas} ref={canvasRef} onClick={handleClick}/>
                </div>
            </div>

            <MusicPlayer playing={playingMusic}/>

            <Box className={styles.bottomBar}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="New Game" icon={<AddIcon/>} onClick={handleNewGame}/>
                    <BottomNavigationAction
                        label={playingMusic ? "Stop Music" : "Play Music"}
                        icon={playingMusic ? <MusicNoteIcon/> : <MusicOffIcon/>}
                        onClick={() => setPlayingMusic(!playingMusic)}
                    />
                </BottomNavigation>
            </Box>

            <Box bgcolor="background.paper" className={styles.sideBar}>
                <List className={classes.list}>
                    <ListItem button onClick={handleNewGame}>
                        <ListItemIcon>
                            <AddIcon/>
                        </ListItemIcon>
                        <ListItemText primary="New Game"/>
                    </ListItem>
                    <ListItem button onClick={() => setPlayingMusic(!playingMusic)}>
                        <ListItemIcon>
                            {playingMusic ? <MusicNoteIcon/> : <MusicOffIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={playingMusic ? "Stop Music" : "Play Music"}/>
                    </ListItem>
                </List>
            </Box>
        </div>
    );
}
