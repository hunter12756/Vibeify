import './index.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as songsActions from '../../store/song';

export default function CreateSong({ song, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState(formType === 'Update Song' ? song.title : '');
    const [coverImg,setCoverImg] = useState(formType === 'Update Song' ? song.cover_img : '');

    const [songFile, setSongFile] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (title.length < 10 || title.length > 50) {
            title.name = 'Name must be between 10 and 50 characters.'
        };
        if (coverImg === null) {
            errors.cover_img = 'Please select an image to upload.'
        }
        setErrors(errors)
    }, [title,coverImg]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newSong = {
            title,
            song_file:songFile,
            cover_img:coverImg,
            artist_id: user.id
        }

        if (formType === 'Update Song') {
            dispatch(songsActions.updateSongThunk(newSong, song.id))
                .then(() => {
                    closeModal()
                })
                .catch((e) => {
                    console.error("Error making artist profile: ", e)
                })
        } else {
            dispatch(songsActions.createSongThunk(newSong))
                .then((data) => {
                    closeModal()
                })
                .catch((e) => {
                    console.error("Error making artist profile: ", e)
                })
        }
    setTitle("");
    setCoverImg("");
    setSongFile("")
    }

    return (
        <>
            <div>
                {formType === 'Update Song' ? (
                    <h1 className="form-heading">Update your Song</h1>
                ) :
                    <h1 className="form-heading">Upload your new Song</h1>
                }

                <form onSubmit={handleSubmit} encType="mulitpart/form-data">
                    <div className='form-song'>
                        {formType === 'Update Song' ? (
                            <label htmlFor="title" className='create-artist-label'>Update the Title {errors.title && <p className="errors">{errors.title}</p>}</label>
                        ) : (
                            <label htmlFor="title" className='create-artist-label'>Song Title {errors.title && <p className="errors">{errors.title}</p>}</label>
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
                            <label htmlFor="songFile" className='create-song-label'>Update the song File </label>
                        ) : (
                            <label htmlFor="songFile" className='create-song-label'>Upload a song file </label>
                        )}
                        <input
                            id="profile_picture"
                            className='create-artist-input'
                            type="file"
                            accept="audio/*"
                            onChange={(e) => { console.log(e.target.files[0]); setSongFile(e.target.files[0]) }}
                            required={!formType === 'Update Artist'}
                        />
                    </div>

                    <div className="form-song">
                        {formType === 'Update Song' ? (
                            <label htmlFor="coverImg" className='create-song-label'>Update the Cover Image </label>
                        ) : (
                            <label htmlFor="coverImg" className='create-song-label'>Upload a Cover Image </label>
                        )}
                        <input
                            id="coverImg"
                            className='create-song-input'
                            type="file"
                            accept="image/*"
                            onChange={(e) => { console.log(e.target.files[0]); setCoverImg(e.target.files[0]) }}
                            required={!formType === 'Update Artist'}
                        />
                    </div>
                    {imageLoading && <p>Loading...</p>}
                    {formType === 'Update Artist' ? (
                        <button type="submit" className="form-submit" id="updateSubmit" disabled={title.length<10}>
                            Update your Song
                        </button>
                    ) : (
                        <button type="submit" className="form-submit" id="createSubmit" disabled={title.length < 10}>
                            Create Song
                        </button>
                    )}

                </form>
            </div>
        </>
    )
}