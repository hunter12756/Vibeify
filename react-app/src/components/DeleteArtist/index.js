import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as artistActions from '../../store/artist';
import { useHistory } from 'react-router-dom';
import './index.css';

export default function DeleteArtistModal({ artistId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const history = useHistory()
    const artistDelete = (e, artistId) => {
        e.preventDefault();
        dispatch(artistActions.deleteArtistThunk(artistId));
        closeModal();
        history.push('/')
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to delete your artist profile?</h2>
            <button onClick={(e) => artistDelete(e, artistId)} id='deleteButton'>Yes (Delete Artist Profile)</button>
            <button onClick={closeModal} id='dontDeleteButton'>No (Keep Aritst Profile)</button>
        </>
    )
}
