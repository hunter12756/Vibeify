import './index.css'
import { useDispatch,useSelector } from 'react-redux';
import React, { useState,useEffect } from 'react';
// import ReactPlayer from 'react-player' OLD WAY
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import * as songActions from '../../store/song'
export default function SongPlayer({ songId}){
    const dispatch = useDispatch()
    // Song slice of state that plays the passed in song
    const currentSong = useSelector(state => state.songs.singleSong);



    // const currentsong = allsongs.filter((song)=>song.id === songId)
    // const songFile = currentsong.song_file
    // useeffect to look for change of currentSong variable
    // in dependenacy array put songID or song attribute
    useEffect(() => {
        dispatch(songActions.getOneSongThunk(songId))
    },[dispatch])
    return(
        <>
        <footer>
            {currentSong &&
            <AudioPlayer
            style={{borderRadius:"1rem",background:"#373434",marginTop:"1rem"}}
            autoPlay={false}

            src={`${currentSong.song_file}`}

            // src={`/testSongs/${test}.mp3`}
            onPlay={e=>console.log("onPlay")}
            showSkipControls={true}
            showJumpControls={false}

            preload='none'
            timeFormat='auto'
            header={`Now Playing: `}
            />
            }
        </footer>
        </>
    )
}
