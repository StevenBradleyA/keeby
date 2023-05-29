import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { refreshUser } from "../../../store/session";

function EditProfilePictureModal({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [profilePicture, setProfilePicture] = useState(
    sessionUser.profile_picture
  );
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const userInformation = {
        username: sessionUser.username,
        email: sessionUser.email,
        password: sessionUser.password,
        first_name: sessionUser.first_name,
        last_name: sessionUser.last_name,
        profile_picture: profilePicture,
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
        <div className="modal-template-title">Update Your Profile Picture</div>
        <form
          className="modal-template-form-container"
          onSubmit={handleFormSubmit}
        >
          <div className="modal-template-form-sub-title">
            Add a new image url to modify your profile picture
          </div>
          <input
            className="modal-template-input"
            type="url"
            value={profilePicture}
            placeholder="image url here"
            onChange={(e) => setProfilePicture(e.target.value)}
          />
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

export default EditProfilePictureModal;
