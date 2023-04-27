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
      <h1 className="signup-modal-title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
          {errors.map((error, idx) => (
            <div className="error-text-signup" key={idx}>{error}</div>
          ))}
        <label>
          Email     
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          Username     
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          Password     
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          Confirm Password     
          <input
            type="password"
            placeholder="Must match password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          First Name     
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          Last Name     
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <p></p>
        <button  className="sign-up-submit" type="submit">{`[ Sign Up ]`}</button>
        <div className="optional-signup-container">
        <div>{` --- optional --- `} </div>
        <p></p>
        <label>
          Profile Picture     
          <input
            type="url"
            value={profilePicture}
            placeholder="Profile Picture .png/.jpg"
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          Daily Driver     
          <input
            type="text"
            placeholder="Share your daily use keeb!"
            value={dailyDriver}
            onChange={(e) => setDailyDriver(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label>
          Keycaps     
          <input
            type="text"
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
            placeholder="what switches are on it?"
            value={switches}
            onChange={(e) => setSwitches(e.target.value)}
            required
          />
        </label>
        </div>
        
      </form>
    </div>
  );
}

export default SignupFormModal;
