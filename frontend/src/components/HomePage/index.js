import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getData } from "../../store/home"
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector(state => state.home.songs)
  const albums = useSelector(state => state.home.albums)
  const comments = useSelector(state => state.home.comments)
  const likedSongs = useSelector(state => state.home.likedSongs)
  const user = useSelector(state => state.home.user)

  useEffect(() => {
    // console.log("songs:", songs)
    dispatch(getData())
  }, [])

  if(!sessionUser) return <Redirect to="/"/>


  return songs ? (
    <div id="homeContent">
      <div className="albumUl">
        <ul>
          {albums.map((album) => {
            return (
              <li key={album.id}>
                <div>
                  <img src={album.imageUrl} alt="pic failed to load"></img>
                </div>
                <div className="albumTitle">
                  <h3>{album.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="likedUl">
        <ul>
          {likedSongs.map((likedSong) => {
            return (
              <li key={likedSong.id}>
                <div className="likedSongImg">
                  <img src={likedSong.imageUrl} alt="pic failed to load"></img>
                </div>
                <div className="likedSongTitle">
                  <h3>{likedSong.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="songUl">
        <ul>
          {songs.map((song) => {
            return (
              <li key={song.id}>
                <div className="songImg">
                  <img src={song.imageUrl} alt="pic failed to load"></img>
                </div>
                <div className="songTitle">
                  <h3>{song.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="genreUl;">
        <ul>
          {songs.map((song) => {
            return (
              <li key={song.id}>
                <div className="songImg">
                  <img src={song.imageUrl} alt="pic failed to load"></img>
                </div>
                <div className="songTitle">
                  <h3>{song.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  ) : (
    ""
  );
}

export default HomePage
