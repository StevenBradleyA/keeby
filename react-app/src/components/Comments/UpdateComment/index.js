import React, { useEffect, useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentThunk } from "../../../store/comment";
import "./UpdateComment.css";
function EditCommentModal({ comment, currentListing }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(comment.content);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const sessionUser = useSelector((state) => state.session.user);

  const handleInputErrors = () => {
    const errorsObj = {};
    if (content.length === 0) {
      errorsObj.content = "comment content required";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [content]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const commentInformation = {
        owner_id: sessionUser.id,
        listing_id: currentListing.id,
        content: content,
      };
      await dispatch(updateCommentThunk(comment.id, commentInformation));
      closeModal();
      setContent("");
    }
    setHasSubmitted(true);
  };

  return (
    <div className="edit-comment-container">
      <form onSubmit={handleFormSubmit} className="edit-comment-form-container">
        <textarea
          className="edit-comment-input-box"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
        />
        <input
          className="edit-comment-submit-button"
          type="submit"
          value={"Update Comment"}
          disabled={hasSubmitted && Object.values(errors).length > 0}
        />
      </form>
    </div>
  );
}

export default EditCommentModal;
