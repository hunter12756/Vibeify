import './index.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as artistsActions from '../../store/artist';

export default function CreateArtist({ artist, formType }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState(formType === 'Update Artist' ? artist.name : '');
    const [bio, setBio] = useState(formType === 'Update Artist' ? artist.bio : '');

    const [profile_picture, setProfilePicture] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const errors = {};

        if (bio.length < 10 || bio.length > 255) {
            errors.bio = 'Bio must be between 10 and 255 characters.'
        };
        if (name.length < 10 || name.length > 50) {
            errors.name = 'Name must be between 10 and 50 characters.'
        };
        if (profile_picture === null) {
            errors.profile_picturege = 'Please select an image to upload.'
        }
        setErrors(errors)
    }, [bio, name, profile_picture]);


    return (
        <>
        <div>
            {formType==='Update Artist'? (
                <h1 className="form-heading">Update your Artist</h1>
            ):
                <h1 className="form-heading">Update your Artist</h1>
            }

            <form onSubmit={handleSubmit} encType="mulitpart/form-data">
                <div className='form-artist'>
                {formType === 'Update Restaurant' ? (
                            <label htmlFor="name" className='create-artist-label'>Update the Name {errors.name && <p className="errors">{errors.name}</p>}</label>
                        ) : (
                            <label htmlFor="name" className='create-artist-label'>Artist Name {errors.name && <p className="errors">{errors.name}</p>}</label>
                        )}
                        <input
                            id="name"
                            className='create-resturant-input'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            placeholder="Name"
                        />
                </div>
            </form>
        </div>
        </>
    )
}
