// import './index.css'
// import SongPlayer from '../SongPlayer';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams,NavLink } from 'react-router-dom'
// import React, { useState, useEffect } from 'react';
// import * as songActions from '../../store/song'

// // visuzliers stuff
// import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers'
// export default function SongDetails() {
//     const { songId } = useParams()

//     const dispatch = useDispatch()

//     const song = useSelector(state => state.songs.singleSong)
//     useEffect(() => {
//         dispatch(songActions.getOneSongThunk(songId))
//     }, [dispatch,songId])
//     return (
//         <>
//             {song &&
//                 <>
//                     <h1 className='song-title'>{song.title}</h1>
//                     <NavLink to={`/artists/${song.artist_id}`}>

//                     <h2 className='artist-song-name'>{song.artist}</h2>
//                     </NavLink>
//                     <div className='song-details-container'>
//                         <div className='cover-img-container'>
//                             <img src={`${song.cover_img}`}></img>
//                         </div>
//                         {/* if u dont pause it and then select another song it will keep playing the older song */}
//                         <div className='audo-visualizer-container'>
//                             <SpectrumVisualizer
//                                 audio={`${song.song_file}`}
//                                 theme={SpectrumVisualizerTheme.radialSquaredBars}
//                                 colors={['#8a6be8', '#CBC3E3']}
//                                 iconsColor="#faffff"
//                                 showMainActionIcon
//                                 showLoaderIcon
//                                 highFrequency={15000} />
//                         </div>
//                     </div>
//                 </>
//             }
//         </>
//     )
// }
import './index.css';
import SongPlayer from '../SongPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import * as songActions from '../../store/song';

// visualizers stuff
import { SpectrumVisualizer, SpectrumVisualizerTheme } from 'react-audio-visualizers';

export default function SongDetails() {
  const { songId } = useParams();
  console.log(songId);
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs.singleSong);


  useEffect(() => {
    // Load the song
    dispatch(songActions.getOneSongThunk(songId));

  }, [dispatch,songId ]);

  return (
    <>
      {song && (
        <>
          <h1 className="song-title">{song.title}</h1>
          <NavLink to={`/artists/${song.artist_id}`}>
            <h2 className="artist-song-name">{song.artist}</h2>
          </NavLink>
          <div className="song-details-container">
            <div className="cover-img-container">
              <img src={`${song.cover_img}`} alt="Song Cover" />
            </div>
            <div className="audio-visualizer-container">
              {/* separate into modal or another page so i can use songplayer to maintain consistency */}
              <SpectrumVisualizer
                audio={`${song.song_file}`}
                theme={SpectrumVisualizerTheme.radialSquaredBars}
                colors={['#8a6be8', '#CBC3E3']}
                iconsColor="#faffff"
                showMainActionIcon
                showLoaderIcon
                highFrequency={15000}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
