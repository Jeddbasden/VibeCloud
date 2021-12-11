import "./SplashPage.css"
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";  

const SplashPage = () => {
  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state.session.user);
  if (sessionUser) return <Redirect to="/home" />;

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
          <button>
            <NavLink className="link" to="/login">
              Log In
            </NavLink>
          </button>
        </div>
        <div className="splashBtn">
          <button>
            <NavLink className="link" to="/signup">
              Sign Up
            </NavLink>
          </button>
        </div>
        <div className="splashBtn">
          <button
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
