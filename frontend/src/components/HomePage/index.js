import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getData } from "../../store/data"
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector(state => state.data.songs)
  const albums = useSelector(state => state.data.albums)
  const likedSongs = useSelector(state => state.data.likedSongs)
  const user = useSelector(state => state.data.user)

  useEffect(() => {
    dispatch(getData())
  }, [])

  if(!sessionUser) return <Redirect to="/"/>


  return songs ? (
    <div id="homeContent">
      <div className="ulDiv">
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
      <div className="ulDiv">
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
      <div className="ulDiv">
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
      <div className="ulDiv">
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
