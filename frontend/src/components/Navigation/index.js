import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='navLinks'>
        <NavLink className="link" exact to="/home">
          Discover
        </NavLink>
        <NavLink className="link" to="/songUpload">
          Upload a Song
        </NavLink>
        <NavLink className="link" to={`/users/${sessionUser.id}`}>
          My Page
        </NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );

  } else {
    sessionLinks = (
      <div>
        <NavLink className='link' to="/login">Log In</NavLink>
        <NavLink className='link' to="/signup">Sign Up</NavLink>
      </div>
    );
  }

  return (
    <div className="navbar">
      <ul>
        <li>
          <div className='top'>
            <div className='nav'>
              {isLoaded && sessionLinks}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
