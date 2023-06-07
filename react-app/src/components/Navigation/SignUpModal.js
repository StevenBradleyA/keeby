import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [dailyDriver, setDailyDriver] = useState("");
  const [keycaps, setKeycaps] = useState("");
  const [switches, setSwitches] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(
          username,
          email,
          password,
          firstName,
          lastName,
          profilePicture,
          dailyDriver,
          keycaps,
          switches
        )
      );
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <div className="signup-modal-container">
      <div className="signup-modal-title">Sign Up</div>
        {errors.map((error, idx) => (
          <div className="error-text-signup" key={idx}>
            {error}
          </div>
        ))}
      <form onSubmit={handleSubmit} className="signup-modal-form-container">

        <div className="signup-modal-main-form">
          <div className="left-signup-container">
            <label>
              Email     
              <input
                type="email"
                className="sign-up-modal-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password     
              <input
                type="password"
                className="sign-up-modal-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password   
              <input
                type="password"
                className="sign-up-modal-input"
                placeholder="Must match password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <label>
              First Name     
              <input
                type="text"
                className="sign-up-modal-input"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name     
              <input
                type="text"
                className="sign-up-modal-input"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>

          <div className="right-signup-container">
            <label>
              Username     
              <input
                type="text"
                className="sign-up-modal-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <label>
              Profile Picture     
              <input
                type="url"
                className="sign-up-modal-input"
                value={profilePicture}
                placeholder="Profile picture url"
                onChange={(e) => setProfilePicture(e.target.value)}
                required
              />
            </label>
            <label>
              Daily Driver     
              <input
                type="text"
                className="sign-up-modal-input"
                placeholder="Share your daily use keeb!"
                value={dailyDriver}
                onChange={(e) => setDailyDriver(e.target.value)}
                required
              />
            </label>
            <label>
              Keycaps     
              <input
                type="text"
                className="sign-up-modal-input"
                placeholder="what caps are on it?"
                value={keycaps}
                onChange={(e) => setKeycaps(e.target.value)}
                required
              />
            </label>
            <label>
              Switches     
              <input
                type="text"
                className="sign-up-modal-input"
                placeholder="what switches are on it?"
                value={switches}
                onChange={(e) => setSwitches(e.target.value)}
                required
              />
            </label>
          </div>
        </div>
        <button
          className="sign-up-submit"
          type="submit"
        >{`[ Sign Up ]`}</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
