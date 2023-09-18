import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

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
        closeModal()
    }
  };

  return (
    <>
    <div className="login-form">
      <h1 className="login-header">Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul className="login-errors">
          {errors.map((error, idx) => (
            <li className='login-error' key={idx}>{error}</li>
          ))}
        </ul>
        <label className="login-label">
          <p> Email</p>
          <input
          className="login-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="login-label">
          <p> Password</p>
          <input
          className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="otherLoginButtons" onClick={() => dispatch(login("demo@aa.io", "password")).then(() => closeModal())}>Demo Login</button>
        <button className='login-btns' type="submit">Log In</button>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
