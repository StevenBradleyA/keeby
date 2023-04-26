import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./CommentsIndex.css";
import { deleteCommentThunk } from "../../../store/comment";
import { useModal } from "../../../context/Modal";
const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const {setModalContent} = useModal()
  const sessionUser = useSelector((state) => state.session.user);

  // console.log("card", comment);

  // console.log(sessionUser.id)

  const handleEditComment = () => {
    // setModalContent(<EditProfilePictureModal sessionUser={sessionUser} />);
  }

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    // await dispatch(deleteCommentThunk(comment.id));
  };


  if(!comment.comment_owner){
    return <h1>LOADING...</h1>
  }

  return (
    <div className="comment-card-container">
      <img
        className="comment-image-container"
        src={
          comment.comment_owner.profile_picture === null
            ? comment.comment_owner.name[0]
            : comment.comment_owner.profile_picture
        }
        alt="profile"
      />
      <div>
        {comment.comment_owner.username}
      </div>
      {sessionUser.id === comment.owner_id && (
          <div className="comment-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )}
      <div className="comment-content">
        <p>{comment.content}</p>
      </div>

    </div>
  );
};
export default CommentCard;
