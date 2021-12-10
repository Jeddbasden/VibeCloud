import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getData } from "../../store/data"
import ReactAudioPlayer from 'react-audio-player';
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector(state => state.data.songs)
  const albums = useSelector(state => state.data.albums)
  const likedSongs = useSelector(state => state.data.likedSongs);
  const [songUrl, setSongUrl] = useState("");

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  if(!sessionUser) return <Redirect to="/"/>


  return (
    <div id="homeContent">
      <div className="ulDiv">
        <div className="title">
          <h2>Albums</h2>
        </div>
        <ul>
          {albums?.map((album) => {
            return (
              <li key={album.id}>
                  <div
                    className="albumImgDiv"
                    style={{
                      backgroundImage: `url(${album.imageUrl})`,
                      backgroundSize: "cover",
                      height: "100px",
                      width: "100px",
                      borderRadius: "15px",
                    }}
                  ></div>
                <div className="albumTitle">
                  <h3>{album.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="ulDiv">
        <div className="title">
          <h2>Liked Songs</h2>
        </div>
        <ul>
          {likedSongs?.map((likedSong) => {
            return (
              <li key={likedSong.id}>
                <div
                  className="songImgDiv"
                  style={{
                    backgroundImage: `url(${likedSong.imageUrl})`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    setSongUrl(likedSong.songUrl);
                  }}
                ></div>
                <div className="likedSongTitle">
                  <h3>{likedSong.title}</h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="ulDiv">
        <div className="title">
          <h2>Songs</h2>
        </div>
        <ul>
          {songs?.map((song) => {
            return (
              <li key={song.id}>
                <div
                  className="songImgDiv"
                  style={{
                    backgroundImage: `url(${song.imageUrl})`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    setSongUrl(song.songUrl);
                  }}
                ></div>
                <div className="songTitle">
                  <h3>{song.title}</h3>
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
  );
}

export default HomePage
