import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { refreshUser } from "../../../store/session";

function EditNameModal({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [firstName, setFirstName] = useState(sessionUser.first_name);
  const [lastName, setLastName] = useState(sessionUser.last_name);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleInputErrors = () => {
    const errorsObj = {};
    if (firstName.length === 0) {
      errorsObj.firstName = "First name is required";
    }
    if (lastName.length === 0) {
      errorsObj.lastName = "Last name is required";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [firstName, lastName]);

  // --------------------------------------------------------------------

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const userInformation = {
        username: sessionUser.username,
        email: sessionUser.email,
        password: sessionUser.password,
        first_name: firstName,
        last_name: lastName,
        profile_picture: sessionUser.profile_picture,
        daily_driver: sessionUser.daily_driver,
        keycaps: sessionUser.keycaps,
        switches: sessionUser.switches,
      };

      let updatedUser = await dispatch(
        updateUserThunk(userInformation, sessionUser.id)
      );
      dispatch(refreshUser(sessionUser.id));
      history.push(`/profile/${updatedUser.id}`);
      closeModal();
    }
    setHasSubmitted(true);
  };

  return (
    <div className="modal-container-template-large">
      <div className="modal-sub-container-template-large">
        <div className="modal-template-title">
          Update Your Name
        </div>
        <form
          className="modal-template-form-container"
          onSubmit={handleFormSubmit}
        >
          <div className="modal-template-form-sub-title">First Name:</div>
          <input
            className="modal-template-input"
            type="text"
            value={firstName}
            placeholder={sessionUser.first_name}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {hasSubmitted && errors.firstName && (
            <p className="errors">{errors.firstName}</p>
          )}
          <div className="modal-template-form-sub-title">Last Name:</div>
          <input
            className="modal-template-input"
            type="text"
            value={lastName}
            placeholder={sessionUser.last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
          {hasSubmitted && errors.lastName && (
            <p className="errors">{errors.lastName}</p>
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

export default EditNameModal;
