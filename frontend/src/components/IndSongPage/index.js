import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { deleteComment  } from "../../store/data";
import { getSongData } from "../../store/data";
import ReactAudioPlayer from "react-audio-player";
import "./IndSongPage.css";

const IndSongPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 

  const sessionUser = useSelector(state => state.session.user);
  const song = useSelector(state =>state.data.song);
  const album = useSelector(state => state.data.album);
  const comments = useSelector(state => state.data.comments);
  const user = useSelector(state => state.data.user);

  const [songUrl, setSongUrl] = useState("");
  
  useEffect(() => {
    dispatch(getSongData(id))
  }, [dispatch])

  const handleCommentDelete = (comment) => {
    dispatch(deleteComment(comment))
  } 

  if (!sessionUser) return <Redirect to="/" />;

  return song ? (
    <div className="indSongContent">
      <div className="indSongContentDiv">
        <div className="imgDiv">
          <img src={`${song.imgUrl}`} alt="" />
        </div>
        <div className="titleDiv">
          <div className="title">
            <h1>{song.title}</h1>
          </div>
          <div className="albumTitle">
            <h3>{album.title}</h3>
          </div>
          <div className="username">
            <h2>By {user.username}</h2>
          </div>
        </div>
        <div className="">
          <ul>
            {comments.map((comment) => {
              return (
                <li key={comment.id}>
                  <div className="commentDiv">
                    <p>{comment.comment}</p>
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
                      <i className="fas fa-edit"></i>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="audioPlayerDiv">
          {songUrl && <ReactAudioPlayer src={`${songUrl}`} autoPlay controls />}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default IndSongPage
