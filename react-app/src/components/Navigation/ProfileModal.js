import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

function UserIconModal() {
  const history = useHistory();
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleProfileClick = (e) => {
    e.preventDefault();
    history.push(`/profile/${sessionUser.id}`);
    closeModal();
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout())
    history.push(``);
    closeModal();
  };

  return (
    <div className="user-icon-modal-container">
      <div className="user-image-container-modal">
        <div className="image-container-2">
          <img
            src={
              sessionUser.profile_picture === null
                ? sessionUser.name[0]
                : sessionUser.profile_picture
            }
            alt="User"
            className={
              sessionUser.profile_picture === null
                ? "profile-icon-letter-modal"
                : "profile-icon-modal"
            }
          />
        </div>
        <div className="user-modal-name-status-container">
          <div id="profile-names" className="title-text">
            {sessionUser.first_name}
            {sessionUser.last_name}
          </div>
        </div>
      </div>
      <button className="user-icon-modal-button" onClick={handleProfileClick}>
        Manage My Profile
      </button>
      <button className="user-icon-modal-button">
        Manage My Listings
      </button>
      <button
        className="user-icon-modal-button"
        onClick={handleLogOut}
      >{`Log out`}</button>
    </div>
  );
}

export default UserIconModal;
