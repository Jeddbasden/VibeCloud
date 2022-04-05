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
  const allSongs = useSelector((state) => state.albums.songs);
  const albums = useSelector((state) => state.albums.albums);
  const users = useSelector((state) => state.albums.users)

  const album = albums?.find(album => album?.id === Number(id));
  const songs = allSongs?.filter(song => song?.albumId === album?.id)
  const albumUser = users?.find(user => user?.id === album.userId)

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
        <div className="indAlbumImgDiv">
          <img className="indAlbumImg" src={`${album?.imageUrl}`} alt="" />
        </div>
        <div className="indTitleDiv">
          <div className="username">
            <h2>Created By: {albumUser?.username}</h2>
          </div>
        </div>
        <div>
          <ul className="songList">
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
            <div className="audioPlayerDiv">
              {songUrl && (
                <ReactAudioPlayer
                  className="audioPlayer"
                  src={`${songUrl}`}
                  controls
                  autoPlay
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
