import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSong, getUserData } from "../../store/data";
import ReactAudioPlayer from "react-audio-player";
import "./UserPage.css"
import { useHistory } from "react-router-dom";

const UserPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userSongs = useSelector((state) => state.data.userSongs);
  const userAlbums = useSelector((state) => state.data.userAlbums);
  const likedSongs = useSelector((state) => state.data.likedSongs);
  const user = useSelector((state) => state.data.user);
  const [songUrl, setSongUrl] = useState("");
  
  const handleDelete = (song) => {
    dispatch(deleteSong(song))
  }
  
  useEffect(() => {
    dispatch(getUserData(sessionUser.id));
  }, [dispatch, sessionUser.id]);
  


  return (
    <div className="userContent">
      <div className="userTitle">
        <h1>{user?.username}</h1>
      </div>
      <div className="ulDiv">
        <div className="title">
          <h2> My Playlists</h2>
        </div>
        <section className="section">
          {userAlbums?.map((album) => {
            return (
              <div className="sectionDiv" key={album.id}>
                <div
                  className="albumEffectDiv"
                  onMouseOver={(e) => {
                    e.target.className = "albumImgHover";
                  }}
                  onMouseOut={(e) => {
                    e.target.className = "albumEffectDiv";
                  }}
                >
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
                </div>
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
          <h2>My Songs</h2>
        </div>
        <section className="section">
          {userSongs?.map((song) => {
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
                <div className="titleDiv">
                  <div className="songTitle">
                    <h3>{song.title}</h3>
                  </div>
                  <div className="btnDiv">
                    <button type="submit" className="songBtn">
                      <i
                        className="far fa-trash-alt"
                        value={song}
                        onClick={(e) => {
                          e.preventDefault();
                          const confirmed = window.confirm(
                            `Are you sure you want to delete ${song.title}`
                          );
                          if (confirmed) handleDelete(song);
                        }}
                      ></i>
                    </button>
                    <button type="submit" className="songBtn">
                      <i
                        className="fas fa-edit"
                        onClick={(e) => {
                          e.preventDefault();
                          history.push(`/songs/edit/${song.id}`);
                        }}
                      ></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        history.push(`/songs/${song.id}`);
                      }}
                      class="songBtn"
                      type="submit"
                    >
                      <i class="fas fa-info-circle"></i>
                    </button>
                  </div>
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
                    backgroundImage: `url(${
                      likedSong.imageUrl ||
                      "https://www.supercheapauto.co.nz/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw15da72ad/images/541944/SCA_541944_hi-res.jpg?sw=1000&sh=1000&sm=fit"
                    })`,
                    backgroundSize: "cover",
                    height: "100px",
                    width: "100px",
                    borderRadius: "15px",
                  }}
                  onClick={() => {
                    setSongUrl(likedSong.songUrl);
                  }}
                ></div>
                <div className="songTitle">
                  <h3>{likedSong.title}</h3>
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
            );
          })}
        </section >
      </div>
      <div className="audioPlayerDiv">
        {songUrl && <ReactAudioPlayer className="audioPlayer" src={`${songUrl}`} autoPlay controls />}
      </div>
    </div>
  );
};

export default UserPage
