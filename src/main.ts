import "./main.less";
import {Game} from "./stratego/game";
import {ImageService} from "./stratego/image/images.service";
import {SetupService} from "./stratego/setup.service";

const imageService = ImageService.getInstance();

const game = new Game(document.getElementsByClassName("board")[0] as HTMLCanvasElement,
    new SetupService().getDefaultSetup());

imageService.getPromisifiedImages().then(() => {
    game.draw();
});
