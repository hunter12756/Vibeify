import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink,useHistory  } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import * as artistActions from '../../store/artist'
import * as songActions from '../../store/song'
import CreateArtist from '../CreateArtistForm';
import OpenModalButton from '../OpenModalButton'
import DeleteArtistModal from '../DeleteArtist'
import DeleteSongModal from '../DeleteSong'
import CreateSong from '../CreateSong';
export default function ArtistDetails() {
    const { artistId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    if(!user){
        history.push("/")
    }
    const artist = useSelector(state => state.artists.singleArtist)
    const songs_by_artists = useSelector(state => state.songs.allSongs)
    const filteredSongs = Object.values(songs_by_artists).filter(song => song.artist_id === Number(artistId));

    console.log(filteredSongs)

    // NEW STUFF
    const [isArtistUpdated, setIsArtistUpdated] = useState(false);
    useEffect(() => {
        dispatch(artistActions.getOneArtistThunk(artistId))
        dispatch(songActions.getAllSongsThunk())
    }, [dispatch, artistId])
    useEffect(() => {
        if (isArtistUpdated) {
          dispatch(artistActions.getOneArtistThunk(artistId));
          // Reset the flag after re-fetching
          setIsArtistUpdated(false);
        }
      }, [dispatch, artistId, isArtistUpdated]);
    return (
        <>
            {artist && songs_by_artists && user &&
                <>
                    {artist.user_id === user.id ?
                        <>
                            <div className='admin-btns'>
                                <OpenModalButton
                                    modalComponent={<DeleteArtistModal artistId={artistId} />}
                                    className="delete-artist-btn"
                                    buttonText={
                                        "Delete Artist Profile"
                                    }
                                />
                                {/* Update */}
                                <OpenModalButton
                                    modalComponent={<CreateArtist artist={artist} formType={"Update Artist"} onArtistUpdated={() => setIsArtistUpdated(true)}/>}
                                    className="update-artist-btn"
                                    buttonText={"Update Artist Profile"}
                                />
                            </div>
                        </>
                        :
                        ''
                    }
                    <h1 className='artist-name'>{artist.name}</h1>
                    <div className='artist-details-container'>
                        <div className='cover-img-container'>
                            <img src={`${artist.profile_picture}`}></img>
                        </div>
                        <h1>Songs</h1>
                        {artist.user_id === user.id ?
                            <div className='admin-btns'>
                                <OpenModalButton
                                    modalComponent={<CreateSong artistId={artist.id}/>}
                                    className="update-song-btn"
                                    buttonText={"Create"}
                                />
                            </div>:
                            ''
                        }
                        <div className='songs-artists-container'>
                            {filteredSongs.map((song) => {
                                return (
                                    <>
                                        <div className='song-info'>
                                            <NavLink className='link-to-song' to={`/songs/${song.id}`}>

                                                <h3 className='song-link-title'>{song.title}</h3>
                                            </NavLink>
                                            {artist.user_id === user.id ?
                                                <>
                                                    <div className='admin-btns'>
                                                        <OpenModalButton
                                                            modalComponent={<DeleteSongModal songId={song.id} />}
                                                            className="delete-song-btn"
                                                            buttonText={
                                                                "Delete Song"
                                                            }
                                                        />
                                                        {/* Update */}
                                                        <OpenModalButton
                                                            modalComponent={<CreateSong song={song} formType={"Update Song"} />}
                                                            className="update-song-btn"
                                                            buttonText={"Update Song"}
                                                        />
                                                    </div>
                                                </>
                                                :
                                                ''
                                            }
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
