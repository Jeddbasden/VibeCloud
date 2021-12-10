import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getData } from "../../store/data"
import UserPage from "../UserPage";
import SongUploadPage from "../SongUploadPage";
import ReactAudioPlayer from 'react-audio-player';
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector(state => state.data.songs)
  const albums = useSelector(state => state.data.albums)
  const likedSongs = useSelector(state => state.data.likedSongs)
  
  console.log(likedSongs)

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  if(!sessionUser) return <Redirect to="/"/>


  return (
    <div id="homeContent">
      <div className="ulDiv">
        <ul>
          {albums?.map((album) => {
            return (
              <li key={album.id}>
                <div>
                  <div className="albumImgDiv" 
                    style={{
                      backgroundImage: `url(${album.imageUrl})`,
                      backgroundSize: "cover",
                      height: "100px",
                      width: "100px",
                      borderRadius: "15px"
                    }}
                    onMouseOver={(e) => {
                      e.target.className = "albumImgHover";
                    }}
                    onMouseOut={(e) => {
                      const img = e.target;
                      img.className = "albumImgDiv"
                    }}
                  ></div>
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
                  onMouseOver={(e) => {
                    e.target.className = "albumImgHover";
                  }}
                  onMouseOut={(e) => {
                    const img = e.target;
                    img.className = "songImgDiv";
                  }}
                  onClick={
                    
                      <ReactAudioPlayer
                        src={`${likedSong.songUrl}`}
                        autoPlay
                        controls
                      />
                  }
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
        <ul>
          {songs?.map((song) => {
            return (
              <li key={song.id}>
                <div className="songImg"
                  style=
                  {{
                    backgroundImage: `url(${song.imageUrl})`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "15px",
                  }}
                  onMouseOver=
                  {(e) => {
                    e.target.className = "songImgHover";
                  }}
                  onMouseOut=
                  {(e) => {
                    const img = e.target;
                    img.className = "songImgDiv";
                  }}
                  >
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
          {songs?.map((song) => {
            return (
              <li key={song.id}>
                <div className="songImg"
                  style=
                  {{
                    backgroundImage: `url(${song.imageUrl})`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "15px",
                  }}
                  onMouseOver=
                  {(e) => {
                    e.target.className = "songImgHover";
                  }}
                  onMouseOut=
                  {(e) => {
                    const img = e.target;
                    img.className = "songImgDiv";
                  }}
                  >
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
  );
}

export default HomePage
