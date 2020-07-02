import {Howl} from "howler";
import * as music from './audio/music';

function random(size: number) {
    return Math.floor(Math.random() * size);
}

export default class MusicPlayer {
    private track: number;
    private songs: Howl[];
    private _isPlaying: boolean;

    constructor() {
        this.songs = Object.values(music)
            .map(song => new Howl({src: song, onend: () => this.playNext()}));
        this.track = random(this.songs.length);
        this._isPlaying = false;
    }

    isPlaying(): boolean {
        return this._isPlaying;
    }

    play() {
        if (!this._isPlaying) {
            this._isPlaying = true;
            this.songs[this.track].play();
        }
    }

    pause() {
        this._isPlaying = false;
        this.songs[this.track].pause();
    }

    private playNext() {
        this.track = this.track + 1 % this.songs.length;
        this.play();
    }
}
