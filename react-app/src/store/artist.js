const GET_ARTISTS = 'artists/all'
const GET_ONE_ARTIST = 'artists/oneArtist'
const UPDATE_ARTIST = 'artists/update'
const CREATE_ARTIST = 'artists/create'
const DELETE_ARTIST = 'artists/delete'
const CHECK_ARTIST = 'artists/check'
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
const checkArtist = (data) =>{
    return {
        type: CHECK_ARTIST,
        payload: data
    }
}
const getAllArtists = (data) => {
    return {
        type: GET_ARTISTS,
        payload: data
    }
}

const getOneArtist = (data) => {
    return {
        type: GET_ONE_ARTIST,
        payload: data
    }
}

const updateArtist = (data) => {
    return {
        type: UPDATE_ARTIST,
        payload: data
    }
}
const createArtist = (data) => {
    return {
        type: CREATE_ARTIST,
        payload: data
    }
}
const deleteArtist = (data) => {
    return {
        type: DELETE_ARTIST,
        payload: data
    }
}

// thunks
export const getAllArtistsThunk = () => async (dispatch) => {
    const res = await fetch('/api/artists/')
    const data = await res.json()
    if (data && !data.errors) dispatch(getAllArtists(data))
    return data
}
export const checkArtistThunk = () => async (dispatch)=>{
    const res = await fetch('/api/artists/check-artist')
    const data = await res.json()
    if(data && !data.errors) dispatch(checkArtist(data))
    return data
}
export const getOneArtistThunk = (artistId) => async (dispatch) => {
    const res = await fetch(`/api/artists/${artistId}`)
    const data = await res.json()
    if (data && !data.errors) dispatch(getOneArtist(data))
    return data
}
// Not done yet
export const createArtistThunk = (artist) => async (dispatch) => {
    console.log("ARTIST DATA",artist)
    const formData = new FormData();

    formData.append("name", artist.name);
    formData.append("bio", artist.bio);
    formData.append("profile_picture", artist.profile_picture);
    formData.append("user_id", artist.user_id)
    const res = await fetch(`/api/artists/create`, {
        method: 'POST',
        body: formData
    })
    console.log("RESPONSE",res)
    const data = await res.json()
    console.log("DATA",data)
    if (data && !data.errors) dispatch(createArtist(data))

    return data
}
// Not Done yet
export const updateArtistThunk = (artist,artistId) => async (dispatch) => {
    const formData = new FormData();
    formData.append("name", artist.name);
    formData.append("bio", artist.bio);

    if(artist.profile_picture){
        formData.append("profile_picture", artist.profile_picture);
    }
    const res = await fetch(`/api/artists/${artistId}`, {
        method: 'PUT',
        body: formData
    })
    console.log("UPDATED ARTIST RESPONSE: ", res)
    const data = await res.json()
    console.log("UPDATED ARTIST DATA: ", data)
    if (data && !data.errors) dispatch(updateArtist(data))

    return data
}
// works well should
export const deleteArtistThunk = (artistId) => async (dispatch) => {
    const res = await fetch(`/api/artists/${artistId}`, {
        method: 'DELETE'
    })
    const data = await res.json()

    if (data && !data.errors) dispatch(deleteArtist(artistId))

    return data
}

// Reducer
const initialState = { allArtists: {}, singleArtist: {} }
// mess with action.payload stuff
export const artistReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_ARTISTS:
            const artists = flatten(action.payload.artists)
            newState = { ...state, allArtists: artists }
            return newState;

        case GET_ONE_ARTIST:
            const artist = (action.payload.artist)
            newState = {...state, singleArtist: artist}
            return newState;
        case CREATE_ARTIST:
            newState = { ...state, allArtists: { ...state.allArtists, [action.payload.id]: action.payload } }
            return newState;

        case UPDATE_ARTIST:
            newState = { ...state, allArtists: { ...state.allArtists, [action.payload.id]: action.payload } }
            return newState;

        case DELETE_ARTIST:
            const artistID = action.payload
            newState ={...state}
            const finalAllArtists={...newState.allArtists}
            delete finalAllArtists[artistID]
            newState.allArtists.singleArtist ={}

            return {...newState, allArtists:finalAllArtists};
        default:
            return state
    }
}
