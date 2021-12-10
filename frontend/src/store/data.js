import { csrfFetch } from "./csrf";

const GIVE_DATA = "data/giveData";
const ADD_DATA = "data/addData";
const REMOVE_DATA = "data/removeData"

const giveData = (data) => {
  return {
    type: GIVE_DATA,
    payload: data,
  };
};

const addData = (data) => ({
  type: ADD_DATA,
  data,
});

const removeData = (data) => ({
  type: REMOVE_DATA,
  data,
})

export const getData = () => async (dispatch) => {
  const data = await fetch("/api/home").then((res) => res.json());

  return dispatch(giveData(data));
};

export const getUserData = (id) => async (dispatch) => {
  const data = await fetch(`/api/users/${id}`).then((res) => res.json());

  return dispatch(giveData(data));
};

export const addSongToDatabase = (songData) => async (dispatch) => {
  const res = await csrfFetch("/api/songs", {
    method: "POST",
    body: JSON.stringify({
      songTitle: songData.songTitle,
      songUrl: songData.songUrl,
      songImgUrl: songData.songImgUrl,
    }),
  })

  if (res.ok) return dispatch(addData(songData));
};

export const deleteSong = (song) => async (dispatch) => {
  const res = await csrfFetch()
} 


export default function dataReducer(state = {}, action) {
  console.log("state", state)
  let newState
  switch (action.type) {
    case GIVE_DATA:
      return action.payload;
    case ADD_DATA:
      const song = action.data
      const { songs } = state;
      console.log("songs", songs)
      const newSongs = [song, ...songs]
      newState = { ...state }
      newState.songs = newSongs;
      return newState;
    default:
      return state;
  }
}
