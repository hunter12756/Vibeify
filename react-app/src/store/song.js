const GET_SONGS = 'songs/all'
const GET_ONE_SONG = 'songs/oneSong'
const UPDATE_SONG = 'songs/update'
const CREATE_SONG = 'songs/create'
const DELETE_SONG = 'songs/delete'

// normalize data
const flatten = (arr) => {
    const obj = {}
    if (arr) {
        if (!arr.length) return {}
        for (let el of arr) {
            obj[el.id] = el
        }
    }
    return obj
}

const getAllSongs = (data) => {
    return {
        type: GET_SONGS,
        payload: data
    }
}

const getOneSong = (data) => {
    return {
        type: GET_ONE_SONG,
        payload: data
    }
}

const updateSong = (data) => {
    return {
        type: UPDATE_SONG,
        payload: data
    }
}
const createSong = (data) => {
    return {
        type: CREATE_SONG,
        payload: data
    }
}
const deleteSong = (data) => {
    return {
        type: DELETE_SONG,
        payload: data
    }
}

// thunks
export const getAllSongsThunk = () => async (dispatch) => {
    const res = await fetch('/api/songs/')

    const data = await res.json()
    if (data && !data.errors) dispatch(getAllSongs(data))

    return data

}

export const getOneSongThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`)

    const data = await res.json()
    //want to maybe add it to currentSong
    if (data && !data.errors) dispatch(getOneSong(data))
    return data
}

export const createSongThunk = (song) => async (dispatch) => {
    console.log(song)
    const formData = new FormData();

    formData.append("title", song.title);
    formData.append("artist_id",song.artist_id);
    formData.append("song_file", song.song_file);
    formData.append("cover_img", song.cover_img);
    const res = await fetch(`/api/songs/create`, {
        method: 'POST',
        body: formData
    })
    console.log("SONG RESPONS: ",res)

    const data = await res.json()
    console.log("SONG DATA: ",data)
    if (data && !data.errors) dispatch(createSong(data))

    return data
}

export const updateSongThunk = (song,songId) => async (dispatch) => {

    const formData = new FormData();
    formData.append("title", song.title);


    if (song.cover_img) {
        formData.append("cover_img", song.cover_img);
    }
    if (song.song_file) {
        formData.append("song_file",song.song_file)
    }

    const res = await fetch(`/api/songs/${songId}`, {
        method: 'PUT',
        body: formData
    })
    console.log("UPDATE SONG RESPONSE",res)
    const data = await res.json()
    console.log("UPDATE SONG DATA: ", data)
    if (data && !data.errors) dispatch(updateSong(data))

    return data
}

export const deleteSongThunk = (songId) => async (dispatch) => {
    const res = await fetch(`/api/songs/${songId}`, {
        method: 'DELETE'
    })
    const data = await res.json()

    if (data && !data.errors) dispatch(deleteSong(songId))

    return data
}

// Reducer
const initialState = { allSongs: {}, singleSong: {}}
// mess with action.payload stuff
export const songReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_SONGS:
            const songs = flatten(action.payload.songs)
            newState = { ...state, allSongs: songs }
            return newState;
        case GET_ONE_SONG:
            const song = (action.payload.song)
            newState = {...state, singleSong: song}
            return newState;
        case CREATE_SONG:
            newState = { ...state, allSongs: { ...state.allSongs, [action.payload.id]: action.payload } }
            return newState;

        case UPDATE_SONG:
            newState = { ...state, allSongs: { ...state.allSongs, [action.payload.id]: action.payload } }
            return newState;

        case DELETE_SONG:
            const songID = action.payload
            newState ={...state}
            const finalAllSongs={...newState.allSongs}
            delete finalAllSongs[songID]
            newState.allSongs.singleSong ={}

            return {...newState,allSongs:finalAllSongs};
        default:
            return state
    }
}
