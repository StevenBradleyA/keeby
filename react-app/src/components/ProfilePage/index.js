import React from "react";
import DeleteUserModal from "../DeleteUser";
import OpenModalButton from "../../OpenModalButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../../context/Modal";
import EditProfilePictureModal from "./ProfilePictureModal";

import EditUsernameModal from "./UsernameModal";
import EditNameModal from "./NameModal";
import EditPasswordModal from "./PasswordModal";
import EditEmailModal from "./EmailModal";
import EditTitleModal from "./TitleModal";
import EditAboutMeModal from "./AboutMeModal";
import "./Profile.css";

const ProfilePage = () => {
  const history = useHistory();
  const { setModalContent } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) {
    history.push(`/home`);
  }

  const handleProfilePictureEdit = () => {
    setModalContent(<EditProfilePictureModal sessionUser={sessionUser} />);
  };
  const handleUserNameEdit = () => {
    setModalContent(<EditUsernameModal sessionUser={sessionUser} />);
  };
    const handleFirstNameEdit = () => {
      setModalContent(<EditNameModal sessionUser={sessionUser} />);
    };
    const handlePasswordEdit = () => {
      setModalContent(<EditPasswordModal sessionUser={sessionUser} />);
    };
    const handleEmailEdit = () => {
      setModalContent(<EditEmailModal sessionUser={sessionUser} />);
    };
  //   const handleDailyDriverEdit = () => {
  //     setModalContent(<EditDailyDriverModal sessionUser={sessionUser} />);
  //   };


  //   const isDemoUser = sessionUser && sessionUser.id === 1;
  //   const deleteButton = isDemoUser ? (
  //     <div>
  //       <p>You can't delete your account as a demo user</p>
  //     </div>
  //   ) : (
  //     <div className="delete-user-container">
  //       <OpenModalButton
  //         buttonText="Delete My Account"
  //         modalComponent={<DeleteUserModal />}
  //         className="delete-user-account-button"
  //       />
  //     </div>
  //   );

  return (
    <div className="profile-page-container">
      <h1 className="profile-title-text">Your Profile</h1>
      <div className="profile-picture-container">
        <img
          src={
            sessionUser.profile_picture === null
              ? sessionUser.first_name[0]
              : sessionUser.profile_picture
          }
          alt="Profile"
          className={
            sessionUser.profile_picture === null
              ? "profile-page-icon-letter"
              : "profile-page-icon"
          }
        />
        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handleProfilePictureEdit}
          className="edit-profile-picture"
        />
      </div>
      <div className="edit-section-container">
        <div
          id="profile-titles"
          className="title-text"
        >{`Username:  ${sessionUser.username}`}</div>
        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handleUserNameEdit}
          className="edit-profile-buttons"
        />
      </div>

      <div className="edit-section-container">
        <div
          id="profile-titles"
          className="title-text"
        >{`Email:  ${sessionUser.email}`}</div>
        <FontAwesomeIcon
          icon={faUserPen}
          //   onClick={handleEmailEdit}
          className="edit-profile-buttons"
        />
      </div>

      <div className="edit-section-container">
        <div id="profile-titles" className="title-text">
          {`First name:  ${sessionUser.first_name}`}
          <br />
          {`Last name:  ${sessionUser.last_name}`}
        </div>
        <FontAwesomeIcon
          icon={faUserPen}
          //   onClick={handleFirstNameEdit}
          className="edit-profile-buttons"
        />
      </div>
      <div className="edit-section-container">
        <div id="profile-titles" className="title-text">
          {"Change your password"}
        </div>
        <FontAwesomeIcon
          icon={faUserPen}
          //   onClick={handlePasswordEdit}
          className="edit-profile-buttons"
        />
      </div>

      <div className="edit-section-container">
        <div id="profile-titles" className="title-text">
          {`Daily-Driver-Keeb:  ${sessionUser.daily_driver} ${sessionUser.keycaps} ${sessionUser.switches}`}
        </div>
        <FontAwesomeIcon
          icon={faUserPen}
          //   onClick={handleTitleEdit}
          className="edit-profile-buttons"
        />
      </div>
      <div className="delete-user-container">
        <div className="no-delete-button">{deleteButton}</div>
      </div>
    </div>
  );
};

export default ProfilePage;
