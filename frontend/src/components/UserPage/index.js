import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../store/data";
import ReactAudioPlayer from "react-audio-player";

const UserPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userSongs = useSelector((state) => state.data.userSongs);
  const userAlbums = useSelector((state) => state.data.userAlbums);
  const likedSongs = useSelector((state) => state.data.likedSongs);
  const user = useSelector((state) => state.data.user);
  const [songUrl, setSongUrl] = useState("");

  useEffect(() => {
    dispatch(getUserData(sessionUser.id));
  }, [dispatch]);

  return (
    <div className="userContent">
      <div className="title">
        <h1>{user?.username}</h1>
      </div>
      <div className="ulDiv">
        <ul>
          {userAlbums?.map((album) => {
            return (
              <li key={album.id}>
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
        <ul>
          {userSongs?.map((song) => {
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
};

export default UserPage
