import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserData } from "../../store/data";

const UserPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const userSongs = useSelector((state) => state.data.userSongs);
  const userAlbums = useSelector((state) => state.data.userAlbums);
  const likedSongs = useSelector((state) => state.data.likedSongs);
  const user = useSelector((state) => state.data.user);
  const id = sessionUser.id
  
  useEffect(() => {
    dispatch(getUserData(id));
  }, []);

  return (
    <div className="UserContent">
      <div className="ulDiv">
        <div>
          <div>

          </div>
          <div>
            <h2>{user?.username}</h2>
          </div>
        </div>
        <ul>
          {userAlbums?.map((album) => {
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
          {likedSongs?.map((likedSong) => {
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
          {userSongs?.map((song) => {
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
  );
};

export default UserPage
