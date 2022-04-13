import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteAlbum } from "../../store/data";

const Buttons = ({ album }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleAlbumDelete = (album) => {
    return dispatch(deleteAlbum(album.id))
  }
  return (
    <div>
      <button type="submit" className="indSongBtn">
        <i
          className="far fa-trash-alt"
          onClick={(e) => {
            e.preventDefault();
            const confirmed = window.confirm(
              `Are you sure you want to delete ${album?.title}?`
            );
            if (confirmed) handleAlbumDelete(album);
          }}
        ></i>
      </button>
      {/* <button type="submit" className="indSongBtn">
        <i
          className="fas fa-edit"
          onClick={(e) => {
            e.preventDefault();
            history.push(`/albums/edit/${album.id}`);
          }}
        ></i>
      </button> */}
    </div>
  );
}

export default Buttons;
