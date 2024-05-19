import PropTypes from "prop-types";
import { useState } from "react";

import { logIn } from "../firebase/firebaseHelpers";

import "./Login.css";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage) {
      const loginButton = document.getElementById("login-button");
      loginButton.classList.remove("buttonError");
      loginButton.offsetWidth;
      loginButton.classList.add("buttonError");
    }
    logIn(setAuth, email, password, setErrorMessage);
  };

  const handleInput = (e, inputSetter) => {
    inputSetter(e.target.value);
    setErrorMessage(false);
  };

  return (
    <div className="loginPolaroid">
      <div className="frame">
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="label">Email:</div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleInput(e, setEmail)}
              required
            />
          </div>
          <div className="inputs">
            <div className="label">Password:</div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInput(e, setPassword)}
              required
            />
          </div>
          <button
            id="login-button"
            type="submit"
            className={errorMessage ? "buttonError" : undefined}
          >
            Log In
          </button>
          {errorMessage && <div className="errorMessage">Špatné heslo nebo email!</div>}
        </form>
        <div className="tape"></div>
        <div className="tape"></div>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = { setAuth: PropTypes.func };
