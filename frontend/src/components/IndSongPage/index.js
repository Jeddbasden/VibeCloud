import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { deleteComment  } from "../../store/data";
import { getSongData, addCommentToDatabase } from "../../store/data";
import ReactAudioPlayer from "react-audio-player";
import "./IndSongPage.css";

const IndSongPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state =>state.data.song);
  const album = useSelector(state => state.data.album);
  const comments = useSelector(state => state.data.comments);
  const user = useSelector(state => state.data.user);

  const [songUrl, setSongUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState([]);
  
  useEffect(() => {
    dispatch(getSongData(id))
  }, [dispatch, id])


  const handleComment = (e) => {
    e.preventDefault();
    const error = []
    if(!comment) error.push("please write your comment")
    setErrors(error)
    if(errors.length === 0) dispatch(addCommentToDatabase(comment, song.id))
  } 

  const handleCommentDelete = (comment) => {
    dispatch(deleteComment(comment))
  } 

  if (!sessionUser) return <Redirect to="/" />;

  return song ? (
    <div className="indSongContent">
      <div className="indSongContentDiv">
        <div className="imgDiv">
          <img
            src={`${song.imgUrl}`}
            alt=""
            onClick={(e) => {
              setSongUrl(song.url);
            }}
          />
        </div>
        <div className="titleDiv">
          <div className="title">
            <h1>{song.title}</h1>
          </div>
          {album && (
            <div className="albumTitle">
              <h3>{album.title}</h3>
            </div>
          )}
          <div className="username">
            <h2>By {user.username}</h2>
          </div>
        </div>
        <div>
          <form type="submit" onSubmit={handleComment}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label className="label">Add a Comment</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></input>
            <button type="submit">add</button>
          </form>
        </div>
        <div className="commentsUlDiv">
          <ul className="commentsUl">
            {comments &&
              comments.map((comment) => {
                return (
                  <li className="commentsLi" key={comment.id}>
                    <div className="commentDiv">
                      <p>{comment.comment}</p>
                      <div>
                        <button type="submit" className="songDeleteBtn">
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
                        <button type="submit" className="songEditBtn">
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
      </div>
    </div>
  ) : (
    ""
  );
}

export default IndSongPage
