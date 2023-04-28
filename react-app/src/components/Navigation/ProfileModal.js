import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import "./Navigation.css"

function UserIconModal() {
  const history = useHistory();
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  const transitionId = 1
  const handleProfileClick = (e) => {
    e.preventDefault();
    history.push(`/hackTime/${transitionId}`);
    closeModal();
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(logout())
    history.push(``);
    closeModal();
  };

  const handleManageListingsClick = (e) => {
    e.preventDefault();
    history.push(`/listings/manage`);
    closeModal();
  };

  return (
    <div id="user-icon-modal-container">
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
            {`${sessionUser.first_name} `}
            {sessionUser.last_name}
        </div>
      </div>
      <button id="manage-profile-button" className="button-styling" onClick={handleProfileClick}>
        {`[ Manage My Profile ]`}
      </button>
      <button id="manage-listings-button" className="button-styling" onClick={handleManageListingsClick}>
        {`[ Manage My Listings ]`}
      </button>
      <button
      id="log-out-button"
        className="button-styling"
        onClick={handleLogOut}
      >{`[ Log out ]`}</button>
    </div>
  );
}

export default UserIconModal;
