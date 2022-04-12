import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getData } from "../../store/data"
import ReactAudioPlayer from 'react-audio-player';
import "./HomePage.css";

function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const data = useSelector(state => state.data);
  const songs = data.songs;
  const albums = data.albums;
  const likedSongs = data.likedSongs;
  const [songUrl, setSongUrl] = useState("");

  useEffect(() => {
    dispatch(getData())
  }, [dispatch])

  if(!sessionUser) return <Redirect to="/"/>

  return (
    <div id="homeContent">
      <div className="ulDiv">
        <div className="title">
          <div className="PlaylistTitle">
            <h2>Albums</h2>
          </div>
          <div className="addDiv">
            <h3 onClick={(e) => history.push("/albums/add")} className="add">Add</h3>
          </div>
        </div>
        <section className="section">
          {albums?.map((album) => {
            return (
              <div className="sectionDiv" key={album.id}>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    history.push(`/albums/${album.id}`);
                  }}
                  className="albumImgDiv"
                  style={{
                    backgroundImage: `url(${album.imageUrl})`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "15px",
                    contain: "content",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
                <div className="albumTitle">
                  <h3>{album.title}</h3>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <div className="ulDiv">
        <div className="title">
          <h2>Liked Songs</h2>
        </div>
        <section className="section">
          {likedSongs?.map((likedSong) => {
            return (
              <div className="sectionDiv" key={likedSong.id}>
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
                <div className="songTitleDiv">
                  <div>
                    <p>{likedSong.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/songs/${likedSong.id}`);
                    }}
                    className="iconBtn"
                    type="submit"
                  >
                    <i class="fas fa-info-circle"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <div className="ulDiv">
        <div className="title">
          <h2>Songs</h2>
        </div>
        <section className="section">
          {songs?.map((song) => {
            return (
              <div className="sectionDiv" key={song.id}>
                <div
                  className="songImgDiv"
                  style={{
                    backgroundImage: `url(${
                      song.imageUrl ||
                      "https://www.supercheapauto.co.nz/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw15da72ad/images/541944/SCA_541944_hi-res.jpg?sw=1000&sh=1000&sm=fit"
                    })`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    setSongUrl(song.songUrl);
                  }}
                ></div>
                <div className="songTitleDiv">
                  <div>
                    <p>{song.title}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      history.push(`/songs/${song.id}`);
                    }}
                    className="iconBtn"
                    type="submit"
                  >
                    <i class="fas fa-info-circle"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </section>
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
  );
}

export default HomePage
