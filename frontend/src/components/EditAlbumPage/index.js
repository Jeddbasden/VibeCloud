import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { updateComment } from "../../store/data";
import "./EditCommentPage.css";

const EditAlbumPage = () => {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const oldAlbum = useSelector((state) =>
    state.data.albums?.find((album) => album.id === +id)
  );
  const sessionUser = useSelector((state) => state.session.user);

  const [albumTitle, setAlbumTitle] = useState(oldAlbum.title);

  if (!sessionUser) return <Redirect to="/" />;

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateAlbum(oldAlbum.id, albumTitle));
    return history.push(`albums/${album.id}`);
  };

  return (
    <div className="editCommentContent">
      <form onSubmit={handleEdit}>
        <div className="formDiv">
          <div className="labelInput">
            <label>
              Write:
              <input
                type="text"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="commentEditSubmit">
            <button className="Btn" type="submit">
              Done
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditAlbumPage;
