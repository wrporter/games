import React from "react";
import {Howl} from 'howler';
import styles from "./TicTacToe.module.scss";
import {GameResult} from "./Model";
import {finalFantasyVictory} from "../MusicPlayer/audio/victory";
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
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import {Modal, ModalBody, ModalFooter, ModalHeader} from "../ReactModal";
import CanvasComponent from "./CanvasComponent";
import {TicTacToeContextProvider} from "./TicTacToeContext";
import EventEmitter from "./EventEmitter";

const victory = new Howl({src: finalFantasyVictory});

export default function Game() {
    const [playingMusic, setPlayingMusic] = React.useState(true);
    const [result, setResult] = React.useState(GameResult.Pending);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const musicPlayer = React.useMemo(() => new MusicPlayer(), []);
    const emitter = React.useMemo(() => new EventEmitter(), []);

    const handleCloseModal = () => {
        victory.stop();
        setModalIsOpen(false);

        if (playingMusic) {
            musicPlayer.play();
        }
    }

    const handleGameEnd = (result: GameResult) => {
        musicPlayer.pause();
        victory.play();
        setResult(result);
        setModalIsOpen(true);
    }

    const handleNewGame = () => {
        emitter.emit('new');
        setResult(GameResult.Pending);
    };

    React.useEffect(() => {
        if (playingMusic) {
            musicPlayer.play();
        } else {
            musicPlayer.pause();
        }
    }, [playingMusic, musicPlayer]);

    return (
        <TicTacToeContextProvider emitter={emitter}>
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

                <CanvasComponent onGameEnd={handleGameEnd}/>

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
                    <List className={styles.list}>
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
        </TicTacToeContextProvider>
    );
}
