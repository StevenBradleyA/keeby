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
	setModalContent(<LoginFormModal/>)
  };
  const handleSignUpClick = () => {
	setModalContent(<SignupFormModal/>)
  };

  
  return (
    <div className="nav-bar-container">
      {sessionUser && <></>}

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
