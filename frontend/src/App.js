import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import UserPage from "./components/UserPage";
import SongUploadPage from "./components/SongUploadPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import "./index.css";
import { getData } from "./store/data";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getData())
  }, [sessionUser]);

  return (
    <div className="bg">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/users/:id">
            <UserPage />
          </Route>
          <Route path="/songUpload">
            <SongUploadPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
