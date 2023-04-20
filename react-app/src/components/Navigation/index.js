import React, { useState } from "react";
import { useSelector } from "react-redux";
import LoginFormModal from "./LoginModal";
import SignupFormModal from "./SignUpModal";
import { useModal } from "../../context/Modal";
import UserIconModal from "./ProfileModal";
import DemoLogin from "./DemoLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";



import "./Navigation.css";
import { useHistory } from "react-router-dom";

function Navigation() {
  const history = useHistory()
  const { setModalContent } = useModal();
  const sessionUser = useSelector((state) => state.session.user);
  // const [listingName, setListingName] = useState('')

  const handleLogInClick = () => {
    setModalContent(<LoginFormModal />);
  };
  const handleSignUpClick = () => {
    setModalContent(<SignupFormModal />);
  };

  const handleUserIconClick = ()=> {
	setModalContent(<UserIconModal />)
  }

  const handleHomeClick = () => {
    history.push(`/`)
  }


  return (
    <div className="nav-bar-container">
      <input
        className="search-input-login"
        type="search"
        placeholder="Search for a Keyboard name ..."
        // value={listingName}
        // onChange={(e) => setListingName(e.target.value)}
      />
      {sessionUser && (
		<>
        <img
          alt="profile"
          className={
            sessionUser.profile_picture === null
              ? "profile-icon-letter"
              : "profile-icon"
          }
          src={
            sessionUser.profile_picture === null
              ? sessionUser.name[0]
              : sessionUser.profile_picture
          }
		  onClick={handleUserIconClick}
        />
		
		
		</>
      )}

      {!sessionUser && (
        <>
          <FontAwesomeIcon icon={faKeyboard} onClick={handleHomeClick} className="home-button"/>
          <DemoLogin/>
          <button onClick={handleLogInClick} className="log-in-button">Log In</button>
          <button onClick={handleSignUpClick} className="sign-up-button">Sign Up</button>
        </>
      )}
    </div>
  );
}

export default Navigation;
