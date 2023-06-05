import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../../context/Modal";
import EditProfilePictureModal from "./ProfilePageModals/EditProfilePictureModal";
import EditUsernameModal from "./ProfilePageModals/EditUsernameModal";
import EditEmailModal from "./ProfilePageModals/EditEmailModal";
import EditPasswordModal from "./ProfilePageModals/EditPasswordModal";
import EditNameModal from "./ProfilePageModals/EditNameModal";
import EditDailyDriverModal from "./ProfilePageModals/EditDailyDriverModal";
import DeleteUserModal from "./DeleteUser";
import "./Profile.css";
// import hackTime from "../../media/hackTime.mov"
const ProfilePage = () => {
  const history = useHistory();
  const { setModalContent } = useModal();
  const [text, setText] = useState("");

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
  const handleNameEdit = () => {
    setModalContent(<EditNameModal sessionUser={sessionUser} />);
  };
  const handlePasswordEdit = () => {
    setModalContent(<EditPasswordModal sessionUser={sessionUser} />);
  };
  const handleEmailEdit = () => {
    setModalContent(<EditEmailModal sessionUser={sessionUser} />);
  };
  const handleDailyDriverEdit = () => {
    setModalContent(<EditDailyDriverModal sessionUser={sessionUser} />);
  };

  const handleDeleteUser = () => {
    setModalContent(<DeleteUserModal sessionUser={sessionUser} />);
  };

  useEffect(() => {
    const phrases = [
      "Initializing",
      "checking systems",
      "deleting hard drive",
      "jk",
      "your profile",
    ];
    const delay = [0, 2000, 4000, 6000, 8000];

    phrases.forEach((phrase, i) =>
      setTimeout(() => {
        setText(phrase);
      }, delay[i])
    );
  }, []);

  return (
    <div className="profile-page-main-container">
      <div className="retro-scanlines"></div>

      <div className="profile-title-text">{text}</div>

      <div className="profile-page-icon-info-container">
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
            className="edit-profile-picture-button"
          />
        </div>
        <div className="profile-info-container">
          <div className="profile-info-modal-container">
            <div
              className="retro-text"
              id="profile-page-text"
            >{`[ Username ]     ${sessionUser.username}`}</div>
            <FontAwesomeIcon
              icon={faUserPen}
              onClick={handleUserNameEdit}
              id="profile-page-edit-modal"
            />
          </div>

          <div className="profile-info-modal-container">
            <div
              className="retro-text"
              id="profile-page-text"
            >{`[ Email ]    ${sessionUser.email}`}</div>
            <FontAwesomeIcon
              icon={faUserPen}
              onClick={handleEmailEdit}
              id="profile-page-edit-modal"
            />
          </div>
          <div className="profile-info-modal-container">
            <div className="retro-text" id="profile-page-text">
              {`[ First name ]  ${sessionUser.first_name}     [ Last name ]  ${sessionUser.last_name}`}
            </div>
            <FontAwesomeIcon
              icon={faUserPen}
              onClick={handleNameEdit}
              id="profile-page-edit-modal"
            />
          </div>
          <div className="profile-info-modal-container">
            <div className="retro-text" id="profile-page-text">
              {" [ Change your password ]"}
            </div>
            <FontAwesomeIcon
              icon={faUserPen}
              onClick={handlePasswordEdit}
              id="profile-page-edit-modal"
            />
          </div>
        </div>
      </div>

      <div className="profile-page-daily-container">
        <div className="daily-heading-container">
          <div className="retro-text" id="profile-page-keeb-text">
            {`What Keyboard do you main?`}
          </div>
        <FontAwesomeIcon
          icon={faUserPen}
          onClick={handleDailyDriverEdit}
          id="profile-page-edit-modal"
        />
        </div>
        <div className="daily-driver-container">
          <div className="retro-text" id="profile-page-text">
            {`[ board ] ${sessionUser.daily_driver}      [ keycaps ] ${sessionUser.keycaps}      [switches] ${sessionUser.switches}`}
          </div>
        </div>

      </div>

      <button className="delete-yeet-profile" onClick={handleDeleteUser}>
        {`[ delete my profile ]`}
      </button>
    </div>
  );
};

export default ProfilePage;
