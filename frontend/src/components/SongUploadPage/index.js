import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addSongToDatabase } from "../../store/data";

const SongUploadPage = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [songTitle, setSongTitle] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songImgUrl, setSongImgUrl] = useState("");
  const [errors, setErrors] = useState([])
  
  if(!sessionUser) return <Redirect to="/login" />

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = []

    if (!songTitle) errors.push("Please add a song Title");
    if (!songUrl) errors.push("Please add a song Url");
    // if (!(/\.mp3$/.test(songUrl))) errors.push("Please enter a valid mp3 Url");
    
    let songImgUrlStr = songImgUrl
      ? songImgUrl
      : "https://www.supercheapauto.co.nz/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw15da72ad/images/541944/SCA_541944_hi-res.jpg?sw=1000&sh=1000&sm=fit";
    
    
    setErrors(errors)
    if (errors.length === 0) {
      dispatch(addSongToDatabase({
        songTitle,
        songUrl,
        songImgUrlStr,
      }))
      return history.push(`/users/${sessionUser.id}`)
    }
    
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
