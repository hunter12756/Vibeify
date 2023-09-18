import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as songActions from '../../store/song';
import './index.css';

export default function DeleteSongModal({ songId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const songDelete = (e, songId) => {
        e.preventDefault();
        dispatch(songActions.deleteSongThunk(songId));
        closeModal();
    };

    return (
        <>
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to delete your song?</h2>
            <button onClick={(e) => songDelete(e, artistId)} id='deleteButton'>Yes (Delete Song)</button>
            <button onClick={closeModal} id='dontDeleteButton'>No (Keep Song)</button>
        </>
    )
}
