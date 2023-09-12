import './index.css'
import SongPlayer from '../SongPlayer';
import { useSelector } from 'react-redux';
export default function MainPage(){
    const song = useSelector(state=>state.song)
    return (
        <>
        {/* FOOTER PART */}
        {/* <Footer songId={song.id}/> FOR WHEN THIS WORKS*/}
        </>
    )
}
