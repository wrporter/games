import React from 'react';
import './App.css';
import {ImageService} from "./stratego/image/images.service";
import {Game} from "./stratego/game";
import {SetupService} from "./stratego/setup.service";

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
        <div className="App">
            <h1>Stratego</h1>
            <div style={{marginBottom: 12}}>
                <button onClick={handleStart}>Start</button>
            </div>
            <canvas ref={canvasRef} />
        </div>
    );
}

export default App;
