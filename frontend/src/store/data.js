
const GIVE_DATA = "data/giveData"
  
const giveData = (data) => {
  return {
    type: GIVE_DATA,
    payload: data,
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

export default function dataReducer( state = {}, action ){
  switch (action.type) {
    case GIVE_DATA:
      return action.payload
    default:
      return state
  }
}
