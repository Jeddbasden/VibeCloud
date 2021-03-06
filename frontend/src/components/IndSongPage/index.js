import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { deleteComment  } from "../../store/data";
import {
  addCommentToDatabase,
  addToAlbum,
} from "../../store/data";
import ReactAudioPlayer from "react-audio-player";
import "./IndSongPage.css";

const IndSongPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const data = useSelector(state => state.data);

  const songs = data.songs;
  const albums = data.albums;
  const allComments = data.comments;
  const user = data.user;

  const song = songs?.find(song => song?.id === Number(id))
  const album = albums?.find(album => album?.id === song?.albumId)
  const comments = allComments?.filter(comment => comment?.songId === song?.id);

  const [songUrl, setSongUrl] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [selected, setSelected] = useState(song?.albumId);

  const addToPlaylist = async (e, albumId) => {
    e.preventDefault();
    await dispatch(addToAlbum(albumId, song?.id))
  }
  
  const boolean = song?.userId === sessionUser?.id
    
  const handleComment =  async (e) => {
    e.preventDefault();
    const error = []
    if(!comment) error.push("please write your comment")
    setErrors(error)
    if (errors.length === 0) dispatch(addCommentToDatabase(comment, song.id))
    setComment("")
  } 

  const handleCommentDelete = (comment) => {
    dispatch(deleteComment(comment))
  } 

  if (!sessionUser) return <Redirect to="/" />;

  return song ? (
    <div className="indSongContent">
      <div className="indSongTitle">
        <h1>{song.title}</h1>
      </div>
      <div className="indSongContentDiv">
        <div onClick={(e) => setSongUrl(song.songUrl)} className="imgDiv">
          <img
            className="indSongimg"
            src={`${
              song.imageUrl ||
              "https://www.supercheapauto.co.nz/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw15da72ad/images/541944/SCA_541944_hi-res.jpg?sw=1000&sh=1000&sm=fit"
            }`}
            alt=""
          />
        </div>
        <div className="audioPlayerDiv">
          {songUrl && (
            <ReactAudioPlayer
              className="audioPlayer"
              src={`${songUrl}`}
              autoPlay
              controls
            />
          )}
        </div>
        <div className="indTitleDiv">
          <div className="username">
            <i className="fa-solid fa-user-music"></i>
            <h2>Created By: {user.username}</h2>
          </div>
          {album && (
            <div className="indAlbumTitle">
              <h3>Album: {album.title}</h3>
            </div>
          )}
          {boolean && (
            <div className="addToAlbum">
              <button
                className="iconBtn "
                onClick={(e) => setShowPlaylist(!showPlaylist)}
                type="button"
              >
                Add to/change Album
              </button>
              {showPlaylist && (
                <select
                  className="iconBtn"
                  value={selected}
                  onChange={(e) => {
                    setShowPlaylist(false);
                    addToPlaylist(e, e.target.value);
                    setSelected(e.target.value);
                  }}
                >
                  {albums?.map((album) => {
                    return (
                      <option key={album?.id} value={album?.id}>
                        {album?.title}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          )}
        </div>
        <div>
          <form type="submit" onSubmit={handleComment}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="addCommentDiv">
              <label className="label">Add a Comment</label>
              <div className="addCommentInputDiv">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></input>
                <button className="addBtn" type="submit">
                  add
                </button>
              </div>
            </div>
          </form>
        </div>
        <div id="commentsUlDiv">
          <ul className="commentsUl">
            {comments &&
              comments.map((comment) => {
                return (
                  <li className="commentsLi" key={comment.id}>
                    <div className="commentDiv">
                      <p>{comment.comment}</p>
                      <div>
                        <button type="submit" className="indSongBtn">
                          <i
                            className="far fa-trash-alt"
                            onClick={(e) => {
                              e.preventDefault();
                              const confirmed = window.confirm(
                                `Are you sure you want to delete this comment?`
                              );
                              if (confirmed) handleCommentDelete(comment);
                            }}
                          ></i>
                        </button>
                        <button type="submit" className="indSongBtn">
                          <i
                            className="fas fa-edit"
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(`/comments/edit/${comment.id}`);
                            }}
                          ></i>
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default IndSongPage;
