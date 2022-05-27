
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { addAlbumToDatabase } from "../../store/data";

const AddAlbumPage = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumImgUrl, setAlbumImgUrl] = useState("");
  const [errors, setErrors] = useState([])
  
  if(!sessionUser) return <Redirect to="/login" />

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = []

    if (!albumTitle) errors.push("Please add a album Title");
    
    let albumImgUrlStr = albumImgUrl
      ? albumImgUrl
      : "https://www.supercheapauto.co.nz/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw15da72ad/images/541944/SCA_541944_hi-res.jpg?sw=1000&sh=1000&sm=fit";
    
    
    setErrors(errors)
    if (errors.length === 0) {
      dispatch(addAlbumToDatabase({
        albumTitle,
        albumImgUrlStr,
        sessionUser
      }))
      return history.push(`/`)
    }
    
  };
  return (
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <ul>
            {errors?.map((error) => (
              <li key={errors.indexOf(error)}>{error}</li>
            ))}
          </ul>
          <div className="labelInput">
            <label>
              Album Title
              <input
                type="text"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="labelInput">
            <label>
              Album Image Url
              <input
                type="text"
                maxlength="2"
                value={albumImgUrl}
                onChange={(e) => setAlbumImgUrl(e.target.value)}
              />
            </label>
          </div>
          <div className="submitBtn">
            <button className="Btn" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAlbumPage;
