import "./SplashPage.css"
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";  

const SplashPage = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  
  if (sessionUser) history.push("/home")

  const handleDemoSubmit = (e) => {
    e.preventDefault();

    const credential = "Demo-lition";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password }));
  }

  return (
    <div id="splashContent">
      <div className="splashDiv">
        <div className="splashHead">
          <h1>Welcome!</h1>
          <h2>Let's Vibe</h2>
        </div>
        <div className="splashBtn">
          <button className="splashABtn">
            <NavLink className="link" to="/login">
              Log In
            </NavLink>
          </button>
        </div>
        <div className="splashBtn">
          <button className="splashABtn">
            <NavLink className="link" to="/signup">
              Sign Up
            </NavLink>
          </button>
        </div>
        <div className="splashBtn">
          <button
            id="demoBtn"
            className="splashABtn"
            onClick={(e) => {
              handleDemoSubmit(e);
            }}
          >
            Demo User
          </button>
        </div>
      </div>
    </div>
  );
}

export default SplashPage
