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
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <div>{`*optional* `} </div>
        <label>
          Profile Picture
          <input
            type="text"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
            required
          />
        </label>
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

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
