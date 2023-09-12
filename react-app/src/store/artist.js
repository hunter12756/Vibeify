const GET_SONGS = 'songs/all'
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
        payload:data
    }
}

const updateSong = (data) => {
    return {
        type: UPDATE_SONG,
        payload:data
    }
}
const createSong = (data) => {
    return {
        type: CREATE_SONG,
        payload:data
    }
}
const deleteSong = (data) => {
    return {
        type: DELETE_SONG,
        payload:data
    }
}

// thunks
export const getAllSongsThunk = () => async (dispatch) =>{
    const res = await fetch('/api/songs')

    const data = await res.json()
    if (data && !data.errors) dispatch(getAllSongs())

    return data

}

export const createSongThunk = (song) => async (dispatch) =>{
    const res = await fetch('/api/songs/create')
}
