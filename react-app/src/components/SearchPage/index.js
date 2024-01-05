import './index.css'

import { authenticate } from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import * as songActions from '../../store/song'
export default function Search() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false);
    let songs = useSelector(state => state.songs.allSongs)

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([])

    useEffect(() => {
        dispatch(authenticate()).then(() => setIsLoaded(true));
        dispatch(songActions.getAllSongsThunk())
    }, [dispatch, searchTerm])

    //search part
    const filterSearch = () => {
        const filterData = Object.values(songs).filter((song) => song.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredSongs(filterData)

    }
    //press enter to search as well
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          filterSearch();
        }
      };

    return (
        <div className="search-container">
            <div className="search-bar">
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="search-input"
                />
                <button onClick={filterSearch} className="search-button">
                    Search
                </button>
            </div>

            <div id='filterSong'>
                {filteredSongs.map((song) => (
                    <NavLink id='link-song' to={`/songs/${song.id}`}>
                        <div id='indivdualSong' key={song.id}>
                            <div className='image-container'>
                                <img id='img' src={`${song.cover_img}`}></img>
                            </div>
                            <p id='filterSongTitle'>Title: {song.title}</p>

                        </div>
                    </NavLink>
                ))}
            </div>

        </div>
    )

}
