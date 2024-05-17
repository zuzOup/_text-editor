import PropTypes from "prop-types";
import { useState } from "react";

import { logIn } from "../firebase/firebaseHelpers";

import "./Login.css";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    logIn(setAuth, email, password);
  };

  return (
    <div className="loginPolaroid">
      <div className="frame">
        <form onSubmit={handleSubmit}>
          <div className="input">
            <div className="label">Email:</div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <div className="label">Password:</div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <div className="tape"></div>
        <div className="tape"></div>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = { setAuth: PropTypes.func };
