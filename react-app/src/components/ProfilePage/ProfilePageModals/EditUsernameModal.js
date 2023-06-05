import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { refreshUser } from "../../../store/session";

function EditUsernameModal({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState(sessionUser.username);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleInputErrors = () => {
    const errorsObj = {};
    if (username.length === 0) {
      errorsObj.username = "username is required";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [username]);

  // --------------------------------------------------------------------

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const userInformation = {
        username,
        email: sessionUser.email,
        password: sessionUser.password,
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
    <div className="modal-container-template">
      <div className="modal-sub-container-template">
        <div className="modal-template-title">Update Your Username</div>
        <form
          className="modal-template-form-container"
          onSubmit={handleFormSubmit}
        >
          <div className="modal-template-form-sub-title">Username:</div>
          <input
            className="modal-template-input"
            type="text"
            value={username}
            placeholder={sessionUser.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {hasSubmitted && errors.username && (
            <p className="errors">{errors.username}</p>
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

export default EditUsernameModal;
