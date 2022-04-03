import { csrfFetch } from "./csrf";

const GET_ALBUMS = "album/getAlbums"

const get_albums = (data) => ({
  type: GET_ALBUMS,
  data,
})


export const getAlbums = () => async (dispatch) => {
  const data = await csrfFetch(`/api/albums`).then((res) => res.json());
  return dispatch(get_albums(data))
}

export const addToAlbum = (albumId, songId) => async (dispatch) => {
  const data = await csrfFetch(`/api/albums/${albumId}/${songId}`, {
    method: "PATCH"
  })
  console.log("!!!!!!!!!!! DATA !!!!!", data)

  return dispatch(get_albums(data))
}

export default function albumsReducer(state = {}, action) {

  switch (action.type) {
    case GET_ALBUMS:
      return action.data;
    
    default:
      return state
  }
}
