import './index.css'
import SongPlayer from '../SongPlayer';
import LeftBar from '../LeftSideBar'
import { authenticate } from "../../store/session";
import { useDispatch,useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import React, { useState,useEffect } from 'react';
import * as songActions from '../../store/song'
export default function MainPage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    const songs = useSelector(state => state.songs.allSongs)

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
        dispatch(songActions.getAllSongsThunk())
    },[dispatch])
    return (
        <>
        <div className='main-page-container'>
            <div>
                <LeftBar isLoaded={isLoaded}/>
            </div>
            <div className='all-song-container'>
                {Object.values(songs).map((song) => {
                    return (
                        <NavLink id='link-song' to={`/songs/${song.id}`}>

                        <div key={song.id} className='single-song-container'>
                            <div className='image-container'>
                                <img id='img' src={`${song.cover_img}`}></img>
                            </div>
                            <div className='title'>
                                <h3> {song.title}  </h3>
                            </div>
                        </div>
                        </NavLink>
                    )
                })
                }
            </div>
        </div>
        <SongPlayer/>

        </>
    )
}
