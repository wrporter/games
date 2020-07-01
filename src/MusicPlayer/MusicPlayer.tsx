import React from "react";
import * as music from './audio/music';
import ReactPlayer from "react-player";

export default function MusicPlayer({...rest}) {
    const [track, setTrack] = React.useState(0);
    const songs = Object.values(music).map(song => `${song}`);

    const handleOnEnded = () => {
        setTrack(track + 1 % songs.length);
    };

    return (
        <ReactPlayer
            onEnded={handleOnEnded}
            url={songs[track]}
            height={0}
            width={0}
            {...rest}
        />
    )
}
