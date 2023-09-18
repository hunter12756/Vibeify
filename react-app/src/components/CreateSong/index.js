import './index.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory ,useParams} from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as songsActions from '../../store/song';
import * as artistActions from '../../store/artist'
export default function CreateSong({ song, formType }) {
    const dispatch = useDispatch();

    const history = useHistory();

    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState(formType === 'Update Song' ? song.title : '');
    const [coverImg,setCoverImg] = useState(formType === 'Update Song' ? null : null);
    const artist = useSelector(state=>state.artists.singleArtist)

    const [songFile, setSongFile] = useState(formType==='Update Song' ? null:null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});
    console.log(artist.id)
    useEffect(() => {
        const errors = {};
        if(!title){
            errors.title='Title is required'
        }
        if (title.length < 10 || title.length > 50) {
            errors.title = 'Title must be between 10 and 50 characters.'
        };
        if (coverImg === null) {
            errors.cover_img = 'Please select an image to upload.'
        }
        if(songFile ===null) {
            errors.song_file='Please select a file to upload'
        }

        setErrors(errors)
    }, [title,coverImg]);
    useEffect(()=>{
        dispatch(artistActions.getOneArtistThunk(artist.id))
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSong = {
            title,
            artist_id: artist.id,
            song_file:songFile,
            cover_img:coverImg,
        }

        if (formType === 'Update Song') {
           await dispatch(songsActions.updateSongThunk(newSong, song.id))
                .then(() => {
                    closeModal()
                    history.push(`/artists/${song.artist_id}`)
                })
                .catch((e) => {
                    console.error("Error updating song: ", e)
                })
        } else {
            await dispatch(songsActions.createSongThunk(newSong))
                .then((data) => {
                    closeModal()
                })
                .catch((e) => {
                    console.error("Error making song: ", e)
                })
        }
    setTitle("");
    setCoverImg("");
    setSongFile("")
    }

    return (
        <>
            <div className='form-container'>
                {formType === 'Update Song' ? (
                    <h1 className="form-heading">Update your Song</h1>
                ) :
                    <h1 className="form-heading">Upload your new Song(mp3)</h1>
                }

                <form onSubmit={handleSubmit} encType="mulitpart/form-data">
                    <div className='form-song'>
                        {formType === 'Update Song' ? (
                            <label htmlFor="title" className='create-song-label'>Update the Title {errors.title && <p className="errors">{errors.title}</p>}</label>
                        ) : (
                            <label htmlFor="title" className='create-song-label'>Song Title {errors.title && <p className="errors">{errors.title}</p>}</label>
                        )}
                        <input
                            id="title"
                            className='create-song-input'
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            placeholder="Title"
                        />
                    </div>
                    <div className="form-song">
                        {formType === 'Update Song' ? (
                            <label htmlFor="songFile" className='create-song-label'>Update the song File {errors.song_file && <p className="errors">{errors.song_file}</p>}</label>
                        ) : (
                            <label htmlFor="songFile" className='create-song-label'>Upload a song file {errors.song_file && <p className="errors">{errors.song_file}</p>}</label>
                        )}
                        <input
                            id="songFile"
                            className='create-song-input'
                            type="file"
                            accept="audio/*"
                            onChange={(e) => { console.log(e.target.files[0]); setSongFile(e.target.files[0]) }}
                            required={!formType === 'Update Song'}
                        />
                    </div>

                    <div className="form-song">
                        {formType === 'Update Song' ? (
                            <label htmlFor="coverImg" className='create-song-label'>Update the Cover Image  {errors.cover_img && <p className="errors">{errors.cover_img}</p>}</label>
                        ) : (
                            <label htmlFor="coverImg" className='create-song-label'>Upload a Cover Image {errors.cover_img && <p className="errors">{errors.cover_img}</p>}</label>
                        )}
                        <input
                            id="coverImg"
                            className='create-song-input'
                            type="file"
                            accept="image/*"
                            onChange={(e) => { console.log(e.target.files[0]); setCoverImg(e.target.files[0]) }}
                            required={!formType === 'Update Song'}
                        />
                    </div>
                    {imageLoading && <p>Loading...</p>}
                    {formType === 'Update Song' ? (
                        <button type="submit" className="form-submit" id="updateSubmit" disabled={title.length<10 || title.length> 50 || !title || songFile===null || coverImg ===null }>
                            Update your Song
                        </button>
                    ) : (
                        <button type="submit" className="form-submit" id="createSubmit" disabled={title.length < 10 || title.length> 50 || !title || songFile===null || coverImg ===null  }>
                            Create Song
                        </button>
                    )}

                </form>
            </div>
        </>
    )
}
