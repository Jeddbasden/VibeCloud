import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addSongToDatabase, getUserData } from "../../store/data";

const SongUploadPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [songTitle, setSongTitle] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songImgUrl, setSongImgUrl] = useState("https://wallup.net/wp-content/uploads/2019/09/09/324216-abstract-music-record-vinyl-sound-digital-art.jpg");
  const [errors, setErrors] = useState([])
  
  if(!sessionUser) return <Redirect to="/login" />

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = []
    if (!songTitle) errors.push("Please add a song Title");
    if (!songUrl) errors.push("Please add a song Url");
    if (/[.mp3]$/.check(songUrl)) errors.push("Please enter a valid mp3 Url");

    setErrors(errors)

    if (errors.length === 0) return dispatch(addSongToDatabase({
      songTitle,
      songUrl,
      songImgUrl,
    })) 
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <ul>
            {errors?.map(error => (
              <li key={errors.indexOf(error)}>{error}</li>
            ))}
          </ul>
          <div className="labelInput">
            <label>
              Song Title
              <input
                type="text"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="labelInput">
            <label>
              Song Image Url
              <input
                type="text"
                value={songImgUrl}
                onChange={(e) => setSongImgUrl(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="labelInput">
            <label>
              Song Url
              <input
                type="text"
                value={songUrl}
                onChange={(e) => setSongUrl(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="submitBtn">
            <button className="Btn" type="submit">
              Upload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SongUploadPage;
