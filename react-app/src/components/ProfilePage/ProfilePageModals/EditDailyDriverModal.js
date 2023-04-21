import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { refreshUser } from "../../../store/session";

function EditDailyDriverModal({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dailyDriver, setDailyDriver] = useState("");
  const [keycaps, setKeycaps] = useState("");
  const [switches, setSwitches] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleInputErrors = () => {
    const errorsObj = {};
    if (dailyDriver.length === 0) {
      errorsObj.dailyDriver = "To update your daily enter a name";
    }
    if (keycaps.length === 0) {
      errorsObj.keycaps = "To update your keycaps enter a name";
    }
    if (switches.length === 0) {
      errorsObj.switches = "To update your switches enter a named";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [dailyDriver, keycaps, switches]);

  // --------------------------------------------------------------------

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const userInformation = {
        username: sessionUser.username,
        email: sessionUser.email,
        password: sessionUser.password,
        first_name: sessionUser.first_name,
        last_name: sessionUser.last_name,
        profile_picture: sessionUser.profile_picture,
        daily_driver: dailyDriver,
        keycaps: keycaps,
        switches: switches,
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
    <div className="profile-edit-container">
      <h1 className="title-text">Update Your First and Last Name </h1>
      <form className="profile-edit-container" onSubmit={handleFormSubmit}>
        <label className="title-text">
          Daily Driver:
          <input
            className="text-input-login"
            type="text"
            value={dailyDriver}
            placeholder={sessionUser.daily_driver}
            onChange={(e) => setDailyDriver(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.dailyDriver && (
          <p className="errors">{errors.dailyDriver}</p>
        )}
         <label className="title-text">
          Keycaps:
          <input
            className="text-input-login"
            type="text"
            value={keycaps}
            placeholder={sessionUser.keycaps}
            onChange={(e) => setKeycaps(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.keycaps && (
          <p className="errors">{errors.keycaps}</p>
        )}
         <label className="title-text">
          Switches:
          <input
            className="text-input-login"
            type="text"
            value={switches}
            placeholder={sessionUser.switches}
            onChange={(e) => setSwitches(e.target.value)}
          />
        </label>
        {hasSubmitted && errors.switches && (
          <p className="errors">{errors.switches}</p>
        )}
        <p></p>
        <input
          className="profile-edit-submit-button"
          type="submit"
          value={"Save Changes"}
          disabled={hasSubmitted && Object.values(errors).length > 0}
        />
      </form>
    </div>
  );
}

export default EditDailyDriverModal;
