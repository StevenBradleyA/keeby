import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserThunk } from "../../../store/session";
import { useModal } from "../../../context/Modal";
import { refreshUser } from "../../../store/session";

function EditDailyDriverModal({ sessionUser }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dailyDriver, setDailyDriver] = useState(sessionUser.daily_driver);
  const [keycaps, setKeycaps] = useState(sessionUser.keycaps);
  const [switches, setSwitches] = useState(sessionUser.switches);
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
    <div className="modal-container-template-xl">
      <div className="modal-sub-container-template-xl">
        <div className="modal-template-title">Update Your Daily Driver </div>
        <form
          className="modal-template-form-container"
          onSubmit={handleFormSubmit}
        >
          <div className="modal-template-form-sub-title">Daily Driver:</div>
          <input
            className="modal-template-input"
            type="text"
            value={dailyDriver}
            placeholder={sessionUser.daily_driver}
            onChange={(e) => setDailyDriver(e.target.value)}
          />
          {hasSubmitted && errors.dailyDriver && (
            <p className="errors">{errors.dailyDriver}</p>
          )}
          <div className="modal-template-form-sub-title">
            Keycaps:
            </div>
            <input
              className="modal-template-input"
              type="text"
              value={keycaps}
              placeholder={sessionUser.keycaps}
              onChange={(e) => setKeycaps(e.target.value)}
            />
          {hasSubmitted && errors.keycaps && (
            <p className="errors">{errors.keycaps}</p>
          )}
          <div className="modal-template-form-sub-title">
            Switches:
            </div>
            <input
              className="modal-template-input"
              type="text"
              value={switches}
              placeholder={sessionUser.switches}
              onChange={(e) => setSwitches(e.target.value)}
            />
          {hasSubmitted && errors.switches && (
            <p className="errors">{errors.switches}</p>
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

export default EditDailyDriverModal;
