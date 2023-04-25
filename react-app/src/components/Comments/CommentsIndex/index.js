import React from "react";
import { useSelector } from "react-redux";

const CommentCard = ({ comment }) => {
  // const dispatch = useDispatch();
  const sessionUser = useSelector((state)=> state.sessionUser)
  console.log('card', comment);

  return (
    <div>
      <div className="message">
        <div className="message-content">
          <div className="image-container">
            {/* <img
              src={
                message.message_owner.profile_picture === null
                  ? message.message_owner.name[0]
                  : message.message_owner.profile_picture
              }
              alt="profile"
              className="message-profile-pic"
            /> */}
          </div>
          <div className="message-content">
            <p>{comment.content}</p>
          </div>
        </div>
        {/* {sessionUser.id === comment.owner_id && (
          <div className="message-buttons">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        )} */}
      </div>
    </div>
  );
};
export default CommentCard;
