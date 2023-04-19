import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";
import LoginFormModal from "./LoginModal";
import SignupFormModal from "./SignUpModal";
import { useModal } from "../../context/Modal";

function Navigation() {
  const { setModalContent } = useModal();
  const sessionUser = useSelector((state) => state.session.user);

  const handleLogInClick = () => {
    setModalContent(<LoginFormModal />);
  };
  const handleSignUpClick = () => {
    setModalContent(<SignupFormModal />);
  };

  const handleUserIconClick = ()=> {
	
  }
  return (
    <div className="nav-bar-container">
      {sessionUser && (
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
      )}

      {!sessionUser && (
        <>
          <button onClick={handleLogInClick}>Log In</button>
          <button onClick={handleSignUpClick}>Sign Up</button>
        </>
      )}
    </div>
  );
}

export default Navigation;
