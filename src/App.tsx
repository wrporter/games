import React from 'react';
import styles from './App.module.scss';
import {ImageService} from "./stratego/image/images.service";
import {Game} from "./stratego/game";
import {SetupService} from "./stratego/setup.service";
import Checkers from "./checkers/Checkers";
import TicTacToe from "./tictactoe/Game";
import {AppBar, Box, IconButton, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    bar: {
        backgroundColor: '#333333',
        color: theme.palette.text.primary,
    },
}));

function App() {
    const classes = useStyles();
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
        <Box className={styles.App}>
            {/*<div className="stars"/>*/}
            {/*<div className="twinkling"/>*/}
            {/*<div className="clouds"/>*/}

            <AppBar position="static" className={classes.bar} color="primary">
                <Toolbar>
                    <Typography variant="h6">
                        Tic Tac Toe
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box className={styles.content}>
                <TicTacToe />

                {/*<h1>Stratego</h1>*/}
                {/*<div style={{marginBottom: 12}}>*/}
                {/*    <button onClick={handleStart}>Start</button>*/}
                {/*</div>*/}
                {/*<canvas className={styles.board} ref={canvasRef} />*/}

                {/*<Checkers />*/}
            </Box>
        </Box>
    );
}

export default App;
