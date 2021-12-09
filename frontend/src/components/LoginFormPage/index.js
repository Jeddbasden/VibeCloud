import React, { useState } from "react";
import "./LoginForm.css";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();

    const credential = "Demo-lition";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password }));
  };

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="formDiv">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="labelInput">
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="labelInput">
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="submitBtn">
            <button className="Btn" type="submit">
              Log In
            </button>
          </div>
          <div>
            <button
              onClick={(e) => {
                handleDemoSubmit(e);
              }}
              className="Btn"
              name="demobtn"
              type="submit"
            >
              Demo User
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginFormPage;
