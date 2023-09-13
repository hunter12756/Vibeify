import './index.css'
import SongPlayer from '../SongPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import * as songActions from '../../store/song'

// visuzliers stuff
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers'
export default function SongDetails() {
    const { songId } = useParams()
    console.log(songId)
    const dispatch = useDispatch()
    const song = useSelector(state => state.songs.singleSong)

    useEffect(() => {
        dispatch(songActions.getOneSongThunk(songId))
    }, [dispatch,songId])
    return (
        <>
            {song &&
                <>
                    <h1>{song.title}</h1>
                    <h2>{song.artist}</h2>
                    <div className='song-details-container'>
                        <div className='cover-img-container'>
                            <img src={`${song.cover_img}`}></img>
                        </div>
                        {/* if u dont pause it and then select another song it will keep playing the older song */}
                        <div className='audo-visualizer-container'>
                            <SpectrumVisualizer
                                audio={`${song.song_file}`}
                                theme={SpectrumVisualizerTheme.radialSquaredBars}
                                colors={['#8a6be8', '#CBC3E3']}
                                iconsColor="#faffff"
                                showMainActionIcon
                                showLoaderIcon
                                highFrequency={4000} />
                        </div>
                    </div>
                </>
                // Audio Player

            }
        </>
    )
}
