import { csrfFetch } from "./csrf";

const GIVE_DATA = "data/giveData";
const GIVE_SONG_DATA = "data/giveSongData";
const ADD_DATA = "data/addData";
const REMOVE_DATA = "data/removeData"
const UPDATE_DATA = "data/updateData"
const REMOVE_COMMENT = "data/removeComment"
const ADD_COMMENT = "data/addComment"
const EDIT_COMMENT = "data/editComment"
const ADD_TO_PLAYLIST = "data/add_to_playlist"
const ADD_ALBUM = "data/add_album";

const giveData = (data) => {
  return {
    type: GIVE_DATA,
    payload: data,
  };
};

const giveSongData = (data) => ({
  type: GIVE_SONG_DATA,
  data,
});

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

const removeComment = (comment) => ({
  type: REMOVE_COMMENT,
  comment,
});

const addComment = (comment) => ({
  type: ADD_COMMENT,
  comment
})

const editComment = (oldComment, newComment) => ({
  type: EDIT_COMMENT,
  oldComment,
  newComment,
})

const add_to_playlist = (updatedSong) => ({
  type: ADD_TO_PLAYLIST,
  updatedSong,
})

const add_album = (data) => ({
  type: ADD_ALBUM,
  data,
})



export const getData = () => async (dispatch) => {
  const data = await fetch("/api/home").then((res) => res.json());
  
  dispatch(giveData(data));
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

export const addCommentToDatabase = ( comment, songId) => async (dispatch) => {
  const res = await csrfFetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ comment, songId }),
  });

  const newComment = await res.json()
  return dispatch(addComment(newComment))
}

export const getSongData = (id) => async (dispatch) => {
  const data = await csrfFetch(`/api/songs/${id}`).then(res => res.json());

  dispatch(giveSongData(data));
}

export const addAlbumToDatabase = (albumInfo) => async (dispatch) => {
  const data = await csrfFetch("/api/albums/add", {
    method: "POST",
    body: JSON.stringify({
      title: albumInfo.albumTitle,
      imageUrl: albumInfo.albumImgUrlStr,
      userId: albumInfo.sessionUser.id,
    }),
  }).then((res) => res.json());

  return dispatch(add_album(data));
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
  if (res.ok) return dispatch(updateData(oldSong, updatedSong));
}

export const updateComment = (oldComment, newComment) => async (dispatch) => {
  const res = await csrfFetch(`/api/comments/edit/${oldComment.id}`, {
    method: "PATCH",
    body: JSON.stringify({ newComment })
  })
  const updatedComment = await res.json();
  if(res.ok) return dispatch(editComment(oldComment, updatedComment))
}

export const deleteComment = (comment) => async(dispatch) => {
  const res = await csrfFetch(`/api/comments/${comment.id}`, {
    method: "DELETE",
  })

  if(res.ok) return dispatch(removeComment(comment))
}

export const deleteSong = (song) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${song.id}`, {
    method: "DELETE",
  })

  if(res.ok) return dispatch(removeData(song))
} 

export const addToAlbum = (albumId, songId) => async (dispatch) => {
  let song = await csrfFetch(`/api/albums/${albumId}/${songId}`, {
    method: "PATCH",
  }).then((res) => res.json());
  song = song.song
  
  return dispatch(add_to_playlist(song));
};


export default function dataReducer(state = {}, action) {
  let newState;

  switch (action.type) {
    case GIVE_DATA:
      return action.payload;

    case GIVE_SONG_DATA:
      return action.data;

    case ADD_DATA:
      const song = action.data;
      const { songs } = state;
      const newSongs = [song, ...songs];
      newState = { ...state };
      newState.songs = newSongs;
      return newState;

    case REMOVE_DATA:
      const oldSongs = state.userSongs;
      newState = { ...state };
      newState.userSongs = oldSongs.filter((song) => {
        return song.id !== action.data.id;
      });
      return newState;

    case UPDATE_DATA:
      const index = state.songs.indexOf(action.oldData);
      newState = { ...state };
      newState.songs[index] = action.newData;
      return newState;

    case REMOVE_COMMENT:
      const oldComments = state.comments;
      newState = { ...state };
      newState.comments = oldComments.filter((comment) => {
        return comment.id !== action.comment.id;
      });
      return newState;

    case ADD_COMMENT:
      const prevComments = state.comments;
      newState = { ...state };
      newState.comments = [...prevComments, action.comment];
      return newState;

    case EDIT_COMMENT:
      const cIndex = state.comments.indexOf(action.oldComment);
      newState = { ...state };
      newState.comments[cIndex] = action.newComment;
      return newState;

    case ADD_TO_PLAYLIST:
      const updatedSong = action.updatedSong;
      newState = { ...state };
      const foundSong = newState.songs.find(
        (song) => song.id === updatedSong.id
      );
      const fSongIndex = newState.songs.indexOf(foundSong);
      newState.songs[fSongIndex] = updatedSong;
      return newState;

    case ADD_ALBUM:
      newState = { ...state };
      console.log("!!!! NEW STATE !!!", newState)
      newState.data.albums = action.data
      return newState;
    
    default:
      return state;
  }
}
