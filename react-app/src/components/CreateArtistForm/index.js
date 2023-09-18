import './index.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as artistsActions from '../../store/artist';

export default function CreateArtist({ artist, formType,onArtistUpdated}) {
    const dispatch = useDispatch();

    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    console.log("USERID BEING LOADED:",user.id)
    const [name, setName] = useState(formType === 'Update Artist' ? artist.name : '');
    const [bio, setBio] = useState(formType === 'Update Artist' ? artist.bio : '');

    const [profile_picture, setProfilePicture] = useState(formType==='Update Artist' ? null : null);
    const [imageLoading, setImageLoading] = useState(false);

    const [errors, setErrors] = useState({});
    const [isUnmounted, setIsUnmounted] = useState(false);

    useEffect(() => {
        const errors = {};
        if(!bio){
            errors.bio='Bio is required'
        }
        if (bio.length < 10 || bio.length > 255) {
            errors.bio = 'Bio must be between 10 and 255 characters.'
        };
        if(!name){
            errors.name='Name is required'
        }
        if (name.length < 10 || name.length > 50) {
            errors.name = 'Name must be between 10 and 50 characters.'
        };

        if (profile_picture === null) {
            errors.profile_picture = 'Please select an image to upload.'
        }
        setErrors(errors)
    }, [bio, name, profile_picture]);
    useEffect(() => {
        // Cleanup function to set the flag when the component unmounts
        return () => {
          setIsUnmounted(true);
        };
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newArtist = {
            name,
            bio,
            profile_picture,
            user_id: user.id
        }

        if (formType === 'Update Artist') {
            await dispatch(artistsActions.updateArtistThunk(newArtist, artist.id))
                .then(() => {
                    if (!isUnmounted) {
                        closeModal();
                        history.push(`/artists/${artist.id}`);
                        onArtistUpdated();
                      }
                    })
                .catch((e) => {
                    console.error("Error updating artist profile: ", e)
                })
        } else {
            await dispatch(artistsActions.createArtistThunk(newArtist))
                .then((data) => {
                    if (!isUnmounted) {
                        closeModal();
                        console.log('artistID REDIRECT',data.id)
                        console.log("********* maybe bad data,",data)
                        history.push(`/artists/${data.id}`)
                      }
                })
                .catch((e) => {
                    console.error("Error making artist profile: ", e)
                })
        }
    setName("");
    setBio("");
    setProfilePicture("")
    }

    return (
        <>
            <div className='form-container'>
                {formType === 'Update Artist' ? (
                    <h1 className="form-heading">Update your Artist Profile</h1>
                ) :
                    <h1 className="form-heading">Create your Artist Profile</h1>
                }

                <form onSubmit={handleSubmit} encType="mulitpart/form-data">
                    <div className='form-artist'>
                        {formType === 'Update Artist' ? (
                            <label htmlFor="name" className='create-artist-label'>Update the Name {errors.name && <p className="errors">{errors.name}</p>}</label>
                        ) : (
                            <label htmlFor="name" className='create-artist-label'>Artist Name {errors.name && <p className="errors">{errors.name}</p>}</label>
                        )}
                        <input
                            id="name"
                            className='create-artist-input'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name"
                        />
                    </div>

                    <div className="form-artist">
                        <label htmlFor="bio" className='create-artist-label'>
                            Artist bio {errors.bio && <p className="errors">{errors.bio}</p>}
                            <textarea
                                className='create-artist-input'
                                id="bio"
                                onChange={(e) => setBio(e.target.value)}
                                value={bio}
                                placeholder="Bio"
                            />
                        </label>
                    </div>
                    <div className="form-artist">
                        {formType === 'Update Artist' ? (
                            <label htmlFor="profile_picture" className='create-artist-label'>Update the Image {errors.profile_picture && <p className="errors">{errors.profile_picture}</p>}</label>
                        ) : (
                            <label htmlFor="profile_picture" className='create-artist-label'>Upload an Image {errors.profile_picture && <p className="errors">{errors.profile_picture}</p>}</label>
                        )}
                        <input
                            id="profile_picture"
                            className='create-artist-input'
                            type="file"
                            accept="image/*"
                            onChange={(e) => { console.log(e.target.files[0]); setProfilePicture(e.target.files[0]) }}
                            required={!formType}
                        />
                    </div>
                    {imageLoading && <p>Loading...</p>}
                    {formType === 'Update Artist' ? (
                        <button type="submit" className="form-submit" id="updateSubmit" disabled={bio.length < 10 || bio.length > 255 || name.length < 10 || name.length > 50 || !bio || !name || profile_picture===null}>
                            Update your Artist Profile
                        </button>
                    ) : (
                        <button type="submit" className="form-submit" id="createSubmit" disabled={bio.length < 10 || bio.length > 255 || name.length < 10 || name.length > 50 || !bio || !name || profile_picture === null}>
                            Create Artist Profile
                        </button>
                    )}

                </form>
            </div>
        </>
    )
}
