
const GIVE_DATA = "data/giveData"
const ADD_DATA = "data/addData"  

const giveData = (data) => {
  return {
    type: GIVE_DATA,
    payload: data,
  }
}

const addData = () => {
  return {
    type: ADD_DATA,
  }
}


export const getData = () => async (dispatch) => {
  const data = await fetch("/api/home").then(res => res.json())
  
  return dispatch(giveData(data))
}

export const getUserData = (id) => async (dispatch) => {
  const data = await fetch(`/api/users/${id}`).then(res => res.json())
  
  return dispatch(giveData(data))
}

export const addSongToDatabase = (songData) => async (dispatch) => {
  const res = await fetch("/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: {
      songTitle: songData.songtitle,
      songUrl: songData.songUrl,
      songImgUrl: songData.songImgUrl,
    }
  })

  return dispatch(addData())
}

export default function dataReducer( state = {}, action ){
  switch (action.type) {
    case GIVE_DATA:
      return action.payload
    case ADD_DATA:
      return state
    default:
      return state
  }
}
