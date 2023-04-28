import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLikeThunk,
  deleteCommentThunk,
  deleteLikeThunk,
} from "../../../store/comment";
import { useModal } from "../../../context/Modal";
import EditCommentModal from "../UpdateComment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./CommentsIndex.css";

const CommentCard = ({ comment, currentListing }) => {
  const dispatch = useDispatch();

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

  //todo if user not logged in they can see the likes
  //todo  but clicking like asks them to log in or redirects etc...
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
        
          <div className="comment-username">
            {comment.comment_owner.username}
          </div>
        
        <div className="comment-content">
          <p>{comment.content}</p>
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
              className={!userLiked.length ? "comment-unlike" : "comment-liked"}
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
        {sessionUser && sessionUser.id === comment.owner_id && (
          <div>
            <button
            className="button-styling"
              id="comment-edit-button"
              onClick={handleEditComment}
            >{`[ Edit ]`}</button>
            <button
            className="button-styling"
              id="comment-delete-button"
              onClick={handleDeleteComment}
            >{`[ Delete ]`}</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};
export default CommentCard;
