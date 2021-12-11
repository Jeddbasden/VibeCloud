import { csrfFetch } from "./csrf";

const GIVE_DATA = "data/giveData";
const ADD_DATA = "data/addData";
const REMOVE_DATA = "data/removeData"
const UPDATE_DATA = "data/updateData"

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

const updateData = (oldData, newData) => ({
  type: UPDATE_DATA,
  oldData,
  newData,
})

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

export const updateSong = (oldSong, newSong) => async(dispatch) => {
  const res = await csrfFetch(`/api/songs/edit/${newSong.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      songTitle: newSong.songTitle,
      songUrl: newSong.songUrl,
      songImgUrl: newSong.songImgUrl,
    })
  })

  const updatedSong = await res.json()
  console.log("updatedSong:",updatedSong)
  if (res.ok) return dispatch(updateData(oldSong, updatedSong));
}

export const deleteSong = (song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "DELETE",
  })

  if(res.ok) return dispatch(removeData(song))
} 


export default function dataReducer(state = {}, action) {
  let newState;

  switch (action.type) {
    case GIVE_DATA:
      
      return action.payload;
    
    case ADD_DATA:
      const song = action.data;
      const { songs } = state;
      const newSongs = [song, ...songs];
      newState = { ...state };
      newState.songs = newSongs;
      return newState;
    
    case REMOVE_DATA:
      const oldSongs = state.userSongs
      newState = { ...state };
      newState.userSongs = oldSongs.filter(song => {
        return song.id !== action.data.id
      })     
      return newState
    
    case UPDATE_DATA:
      newState = { ...state };
      console.log("newState", newState.songs, "actionOld", action.oldData,"action.newData",action.newData);
      const index = newState.songs.indexOf(action.oldData);
      console.log(index)
      newState.songs[index] = action.newData;
      return newState
    
    default:
      return state;
  }
}
