
const GIVE_DATA = "home/giveData"
  
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

export default function homeReducer( state = {}, action ){
  switch (action.type) {
    case GIVE_DATA:
      return action.payload
    default:
      return state
  }
}
