import './index.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function LeftBar({ isLoaded }) {
    const playlists = useSelector(state => state.playlists);
    const history = useHistory()
    return (
        <>
            {/* Top part */}
            {isLoaded &&
                <div className='top-container'>
                    <div className='home-container'>
                        <NavLink exact to='/'>
                            <div>
                                <img id='icon-img' className='house-icon' src='/images/homeicon.png'></img>
                                 Home
                            </div>
                        </NavLink>
                        {/* <NavLink exact to='/search'>
                            <div>
                                <img id='icon-img' src='/images/searchicon.png'></img>
                                 Search
                            </div>
                        </NavLink> */}
                    </div>
                </div>
            }
            {/* Bottom part */}
            {isLoaded &&
                <div className='bottom-container'>
                    {!playlists ?
                        <div className='new-playlist-container'>
                            <div className='playlist'>
                                <h4>Create your first playlist</h4>
                                <p>It's easy, we'll help you</p>
                                {/* <button
                                id='create-playlist-btn'
                                // onClick={history.push('/playlist/create')}>
                                >

                                Create Playlist
                                </button> */}
                            </div>
                        </div>
                        :
                        <div className='playlist-container'>
                            <div>
                            </div>
                        </div>
                    }
                </div>
            }
        </>
    )
}
