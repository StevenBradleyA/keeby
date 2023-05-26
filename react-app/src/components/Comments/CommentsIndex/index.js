import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeThunk,
  deleteCommentThunk,
  deleteLikeThunk,
} from "../../../store/comment";
import { useModal } from "../../../context/Modal";
import EditCommentModal from "../UpdateComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faPenToSquare, faDeleteLeft, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import "./CommentsIndex.css";

const CommentCard = ({ comment, currentListing }) => {
  const dispatch = useDispatch();
  const [deleteClick, setDeleteClick] = useState(false);

  const { setModalContent } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleEditComment = () => {
    setModalContent(
      <EditCommentModal comment={comment} currentListing={currentListing} />
    );
  };

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    await dispatch(deleteCommentThunk(comment.id));
  };

  if (!comment.comment_owner) {
    return <h1>LOADING...</h1>;
  }

  // ! I WANT TO HAVE MOST RECENT AT TOP EZ SORT MAYBE

  let userLiked;
  if (sessionUser) {
    userLiked = comment.liked.filter((e) => {
      return e.id === sessionUser.id;
    });
  } else {
    userLiked = comment.liked;
  }

  const handleLikeComment = async (e) => {
    e.preventDefault();
    await dispatch(createLikeThunk(comment.id, sessionUser.id));
  };

  const handleUnlikeComment = async (e) => {
    e.preventDefault();
    await dispatch(deleteLikeThunk(comment.id, sessionUser.id));
  };

  return (
    <div className="comment-card-container">
      <div className="comment-container-left">
        <img
          className={
            comment.comment_owner.profile_picture === null
              ? "comment-icon-letter"
              : "comment-icon"
          }
          src={
            comment.comment_owner.profile_picture === null
              ? comment.comment_owner.name[0]
              : comment.comment_owner.profile_picture
          }
          alt="profile"
        />
      </div>
      <div className="comment-container-right">
        <div className="username-edit-delete-container">
        <div className="comment-username">{comment.comment_owner.username}</div>
        {sessionUser && sessionUser.id === comment.owner_id && (
              <div className="edit-delete-comment-container">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  onClick={handleEditComment}
                  className="edit-comment-button-icon"
                />
                {!deleteClick && (
                  <FontAwesomeIcon
                    icon={faDeleteLeft}
                    onClick={() => setDeleteClick(true)}
                  className="delete-comment-button-icon"

                  />
                )}
                {deleteClick && (
                  <div className="delete-comment-buttons-container">
                    <FontAwesomeIcon
                      icon={faCheck}
                      onClick={handleDeleteComment}
                      className="confirm-delete-comment"
                    />
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => setDeleteClick(false)}
                      className="cancel-delete-comment"
                    />
                  </div>
                )}
              </div>
            )}


        </div>

        <div className="comment-content">
          <div>{comment.content}</div>
        </div>

        <div className="comment-like-edit-delete">
          {sessionUser && (
            <div
              className="comment-like-container"
              onClick={
                !userLiked.length ? handleLikeComment : handleUnlikeComment
              }
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                className={
                  !userLiked.length ? "comment-unlike" : "comment-liked"
                }
              />
              <div className="comment-like-total">{comment.liked.length} </div>
            </div>
          )}
          {!sessionUser && (
            <div className="comment-like-container">
              <FontAwesomeIcon icon={faThumbsUp} className="comment-unlike" />
              <div className="comment-like-total">{comment.liked.length} </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
