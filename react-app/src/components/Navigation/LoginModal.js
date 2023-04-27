import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="log-in-modal-container">
      <h1 className="log-in-modal-title">Log In</h1>
      <form onSubmit={handleSubmit}>
      {errors.map((error, idx) => (
          <div className="error-text-login" key={idx}>
            {error}
          </div>
        ))}
        <label className="email-field-container">
          Email    
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p></p>
        <label className="password-field-container">
          Password    
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
       <p></p>
        <button
          type="submit"
          id="log-in-button-modal"
          className="button-styling"
        >{`[ Log In ]`}</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
