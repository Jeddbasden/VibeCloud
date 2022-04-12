import { csrfFetch } from "./csrf";

const GET_ALBUMS = "album/get_albums"

const get_albums = (data) => ({
  type: GET_ALBUMS,
  data,
})


export const getAlbums = () => async (dispatch) => {
  const data = await csrfFetch(`/api/albums`).then((res) => res.json());
  return dispatch(get_albums(data))
}

export default function albumsReducer(state = {}, action) {
  let newState;

  switch (action.type) {
    case GET_ALBUMS:
      return action.data;
    
    default:
      return state
  }
}
