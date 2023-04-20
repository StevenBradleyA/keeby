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

  const handleListYourKeeb = () => {
    // yo

  }
  
  // I want to make list your keeb redirect to log in if not session User
  return (
    <div className="nav-bar-container">
      <FontAwesomeIcon icon={faKeyboard} onClick={handleHomeClick} className="home-button"/>
      <input
        className="search-input-login"
        type="search"
        placeholder="Search for a Keyboard name ..."
        // value={listingName}
        // onChange={(e) => setListingName(e.target.value)}
      />

      {sessionUser && (
		<>
      <div className="list-a-keeb-button" onClick={handleListYourKeeb}>List your Keeb</div>
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
          <DemoLogin/>
          <button onClick={handleLogInClick} className="log-in-button">Log In</button>
          <button onClick={handleSignUpClick} className="sign-up-button">Sign Up</button>
        </>
      )}
    </div>
  );
}

export default Navigation;
