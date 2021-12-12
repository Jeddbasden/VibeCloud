import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { updateComment } from "../../store/data";

const EditCommentPage = () => {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const oldComment = useSelector((state) =>
    state.data.comments?.find(comment => comment.id === +id)
  );
  const sessionUser = useSelector((state) => state.session.user);


  const [comment, setComment] = useState(oldComment.comment);

  if (!sessionUser) return <Redirect to="/" />;

    
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateComment(oldComment, comment))
    return history.push(`/songs/${oldComment.songId}`);
  };

  return (
    <div>
      <form onSubmit={handleEdit}>
        <div className="formDiv">
          <div className="labelInput">
            <label>
              Write:
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </label>
            <button type="submit">Done</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCommentPage;
