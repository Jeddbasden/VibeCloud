import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { updateComment } from "../../store/data";

const EditCommentPage = () => {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.data.comments);
  const sessionUser = useSelector((state) => state.session.user);

  id = parseInt(id);

  let oldComment;

  comments?.map((comment) => {
    if (comment.id === id) {
      oldComment = comment;
    }
  });

  const [comment, setComment] = useState(oldComment.comment);

  if (!sessionUser) return <Redirect to="/" />;

    
  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(updateComment(oldComment, comment))
    return history.push(`/songs/${comment.songId}`);
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
