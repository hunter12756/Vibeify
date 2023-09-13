import './index.css'
import SongPlayer from '../SongPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import * as artistActions from '../../store/artist'
import * as songActions from '../../store/song'
export default function ArtistDetails() {
    const { artistId } = useParams()
    const dispatch = useDispatch()
    const artist = useSelector(state => state.artists.singleArtist)
    const songs_by_artists = useSelector(state => state.songs.allSongs)
    const filteredSongs = Object.values(songs_by_artists).filter(song => song.artist_id === Number(artistId));
    console.log(filteredSongs)
    useEffect(() => {
        dispatch(artistActions.getOneArtistThunk(artistId))
        dispatch(songActions.getAllSongsThunk())
    }, [dispatch, artistId])
    return (
        <>
            {artist && songs_by_artists &&
                <>
                    <h1>{artist.name}</h1>

                    <div className='artist-details-container'>
                        <div className='cover-img-container'>
                            <img src={`${artist.profile_picture}`}></img>
                        </div>
                        <h1>Songs</h1>
                        <div className='songs-artists-container'>
                            {filteredSongs.map((song) => {
                                return (
                                    <>
                                        <div className='song-info'>
                                            <h3>{song.title}</h3>
                                            <img id='song-img' src={song.cover_img}></img>
                                        </div>
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </>
                // Audio Player

            }
        </>
    )
}
