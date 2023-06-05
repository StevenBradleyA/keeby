import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { refreshUser } from "../../../store/session";

function EditPasswordModal({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confirmPassword, setCofirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleInputErrors = () => {
    const errorsObj = {};
    if (password.length === 0) {
      errorsObj.password = "password is required";
    }
    if (password !== confirmPassword) {
      errorsObj.confirmPassword = "Password must match confirm password!";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [password, confirmPassword]);

  // --------------------------------------------------------------------

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const userInformation = {
        username: sessionUser.username,
        email: sessionUser.email,
        password,
        first_name: sessionUser.first_name,
        last_name: sessionUser.last_name,
        profile_picture: sessionUser.profile_picture,
        daily_driver: sessionUser.daily_driver,
        keycaps: sessionUser.keycaps,
        switches: sessionUser.switches,
      };

      let updatedUser = await dispatch(
        updateUserThunk(userInformation, sessionUser.id)
      );
      dispatch(refreshUser(sessionUser.id));
      closeModal();
      history.push(`/profile/${updatedUser.id}`);
    }
    setHasSubmitted(true);
  };

  return (
    <div className="modal-container-template-large">
      <div className="modal-sub-container-template-large">
        <div className="modal-template-title">Update Your Password</div>
        <form
          className="modal-template-form-container"
          onSubmit={handleFormSubmit}
        >
          <div id="password" className="modal-template-form-sub-title">
            Password:
          </div>
          <input
            className="modal-template-input"
            type="text"
            value={password}
            placeholder="enter a new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {hasSubmitted && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
          <div className="modal-template-form-sub-title">Confirm Password:</div>
          <input
            className="modal-template-input"
            type="text"
            value={confirmPassword}
            placeholder="must match password"
            onChange={(e) => setCofirmPassword(e.target.value)}
          />
          {hasSubmitted && errors.confirmPassword && (
            <p className="errors">{errors.confirmPassword}</p>
          )}
          <input
            className="modal-template-update-button"
            type="submit"
            value={"Save Changes"}
            disabled={hasSubmitted && Object.values(errors).length > 0}
          />
        </form>
      </div>
    </div>
  );
}

export default EditPasswordModal;
