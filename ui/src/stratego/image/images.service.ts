import {Color} from "../color";
import {Rank} from "../rank";
import boardImageSrc from "./board/board.jpg";
import paperImageSrc from "./board/paper.jpg";
import blueImageSrc from "./piece/blue.png";
import bombImageSrc from "./piece/bomb.png";
import captainImageSrc from "./piece/captain.png";
import colonelImageSrc from "./piece/colonel.png";
import flagImageSrc from "./piece/flag.png";
import generalImageSrc from "./piece/general.png";
import lieutenantImageSrc from "./piece/lieutenant.png";
import majorImageSrc from "./piece/major.png";
import marshalImageSrc from "./piece/marshal.png";
import minerImageSrc from "./piece/miner.png";
import redImageSrc from "./piece/red.png";
import scoutImageSrc from "./piece/scout.png";
import sergeantImageSrc from "./piece/sergeant.png";
import spyImageSrc from "./piece/spy.png";

export enum ImageName {
    Board = "Board",
    Paper = "Paper",
}

export class ImageService {
    public static getInstance() {
        return this.instance || (this.instance = new this());
    }

    private static instance: ImageService;

    private images: { [key: string]: HTMLImageElement } = {};
    private deferreds: Array<Promise<void>> = [];

    private constructor() {
        this.preloadImage(ImageName.Board, boardImageSrc);
        this.preloadImage(ImageName.Paper, paperImageSrc);

        this.preloadImage(Color.Red, redImageSrc);
        this.preloadImage(Color.Blue, blueImageSrc);
        // this.preloadImage(ImageName.Neutral, neutralImageSrc);

        this.preloadImage(Rank.Bomb, bombImageSrc);
        this.preloadImage(Rank.Marshal, marshalImageSrc);
        this.preloadImage(Rank.General, generalImageSrc);
        this.preloadImage(Rank.Colonel, colonelImageSrc);
        this.preloadImage(Rank.Major, majorImageSrc);
        this.preloadImage(Rank.Captain, captainImageSrc);
        this.preloadImage(Rank.Lieutenant, lieutenantImageSrc);
        this.preloadImage(Rank.Sergeant, sergeantImageSrc);
        this.preloadImage(Rank.Miner, minerImageSrc);
        this.preloadImage(Rank.Scout, scoutImageSrc);
        this.preloadImage(Rank.Spy, spyImageSrc);
        this.preloadImage(Rank.Flag, flagImageSrc);
    }

    public getPromisifiedImages(): Promise<void[]> {
        return Promise.all(this.deferreds);
    }

    public getImage(imageName: ImageName) {
        return this.images[imageName];
    }

    public getColorImage(color: Color) {
        return this.images[color];
    }

    public getRankImage(rank: Rank) {
        return this.images[rank];
    }

    private preloadImage(name: string, url: string): void {
        this.deferreds.push(new Promise((resolve) => {
            this.images[name] = new Image();
            this.images[name].onload = () => {
                resolve();
            };
            this.images[name].src = url;
        }));
    }
}
