import {Howl, Howler} from "howler";
import * as music from './audio/music';

function random(size: number) {
    return Math.floor(Math.random() * size);
}

export default class MusicPlayer {
    private readonly songs: Howl[];
    private song: Howl;
    private track: number;
    private _isPlaying: boolean;

    constructor() {
        this.songs = Object.values(music)
            .map(song => new Howl({
                src: song,
                onend: () => this.playNext(),
            }));
        this.track = random(this.songs.length);
        this.song = this.songs[this.track];
        this._isPlaying = false;
    }

    isPlaying(): boolean {
        return this._isPlaying;
    }

    play() {
        if (!this._isPlaying) {
            this._isPlaying = true;
            this.song.play();
        }
    }

    pause() {
        this._isPlaying = false;
        this.song.pause();
    }

    private playNext() {
        this.track = this.track + 1 % this.songs.length;
        this.song = this.songs[this.track];
        this.play();
    }
}
