import React from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";
import LoginFormModal from "./LoginModal";
import SignupFormModal from "./SignUpModal";
import { useModal } from "../../context/Modal";
import UserIconModal from "./ProfileModal";
import DemoLogin from "./DemoLogin";

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
	setModalContent(<UserIconModal />)
  }




  return (
    <div className="nav-bar-container">
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
          <DemoLogin/>
          <button onClick={handleLogInClick}>Log In</button>
          <button onClick={handleSignUpClick}>Sign Up</button>
        </>
      )}
    </div>
  );
}

export default Navigation;
