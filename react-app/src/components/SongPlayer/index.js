import './index.css'
import { useSelector } from 'react-redux';
import React, { useState } from 'react';
// import ReactPlayer from 'react-player' OLD WAY
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import * as songActions from '../../store/song'
export default function SongPlayer({ isLoaded,songId}){
    // Song slice of state that plays the passed in song
    const allsongs = useSelector(state => state.songs);
    // const currentsong = allsongs.filter((song)=>song.id === songId)

    // const songFile = currentsong.song_file
    return(
        <>
        <footer>

        {isLoaded &&
            <AudioPlayer
            style={{borderRadius:"1rem",background:"#373434",marginTop:"1rem"}}
            
            // src='/testSongs/Pixes - Where is My Mind.mp3'
            // src='/testSongs/Playboi Carti - Magnolia.mp3'
            src='/testSongs/Radiohead - Creep.mp3'
            onPlay={e=>console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}
            header={`Now Playing: `}
            />

        }
        </footer>
        </>
    )
}
