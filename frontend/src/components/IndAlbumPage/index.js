import React, { useEffect, useState } from "react";
import { getAlbums } from "../../store/albums";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useHistory } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import "./IndAlbumPage.css"

const IndAlbumPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams(); 
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.albums.songs);
  const albums = useSelector((state) => state.albums.albums);

  const album = albums?.find(album => album?.id === Number(id));
  console.log("!!!!!! ALBUM !!!!!!!!", album)
  const albumUser = useSelector((state) => state.albums.user)

  const [songUrl, setSongUrl] = useState("");
  
  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch]);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div className="indSongContent">
      <div className="indSongTitle">
        <h1>{album?.title}</h1>
      </div>
      <div className="indSongContentDiv">
        <div className="imgDiv">
          <img className="indSongImg" src={`${album?.imageUrl}`} alt="" />
        </div>
        <div className="indTitleDiv">
          <div className="username">
            <h2>Created By: {albumUser?.username}</h2>
          </div>
        </div>
        <div className="songList">
          <ul>
            {songs &&
              songs.map((song) => {
                return (
                  <li className="songLi" key={song.id}>
                    <div className="songLiDiv">
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
                    </div>
                  </li>
                );
              })}
            <div className="audioPlayerDiv">
              {songUrl && (
                <ReactAudioPlayer
                  className="audioPlayer"
                  src={`${songUrl}`}
                  controls
                />
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IndAlbumPage;
