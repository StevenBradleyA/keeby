import React, { useEffect, useState } from "react";
import { createCommentThunk } from "../../../store/comment";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import LoginFormModal from "../../Navigation/LoginModal";
import { useModal } from "../../../context/Modal";

function CreateComment({ listingId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { setModalContent } = useModal();

  const [errors, setErrors] = useState({});
  const sessionUser = useSelector((state) => state.session.user);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const currentListingId = Number(listingId);
  const handleInputErrors = () => {
    const errorsObj = {};
    if (comment.length === 0) {
      errorsObj.comment = "comment content required";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [comment]);

  // --------------------------------------------------------------------

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const commentInformation = {
        owner_id: sessionUser.id,
        listing_id: currentListingId,
        content: comment,
      };
      dispatch(createCommentThunk(currentListingId, commentInformation));
      setComment("");
    }
    setHasSubmitted(true);
  };

  const handleNeedToLogIn = async (e) => {
    e.preventDefault();
    setModalContent(<LoginFormModal />);
  };

  return (
    <div>
      {sessionUser && (
        <form onSubmit={handleFormSubmit}>
          <input
            className="comment-input-box"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button
            className="create-message-button"
            type="submit"
            disabled={hasSubmitted && Object.values(errors).length > 0}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="create-message-icon"
            />
          </button>
        </form>
      )}
      {!sessionUser && (
        <form onSubmit={handleNeedToLogIn}>
          <input
            className="comment-input-box"
            type="text"
            placeholder="Log in to send a comment!"
          />
          <button
            className="create-message-button"
            type="submit"
            // disabled={true}
          >
            <FontAwesomeIcon
              icon={faPaperPlane}
              className="create-message-icon"
            />
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateComment;
