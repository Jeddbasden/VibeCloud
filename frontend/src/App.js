import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SplashPage from "./components/SplashPage";
import UserPage from "./components/UserPage";
import SongUploadPage from "./components/SongUploadPage";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import HomePage from "./components/HomePage";
import SongEditpage from "./components/SongEditPage";
import AddAlbumPage from "./components/AddAlbumPage";
import IndAlbumPage from "./components/IndAlbumPage";
import Navigation from "./components/Navigation";
import EditCommentPage from "./components/EditCommentPage";
import IndSongPage from "./components/IndSongPage";
import * as sessionActions from "./store/session";
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
  }, [sessionUser, dispatch]);

  return (
    <div className="bg">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route path="/users/:id">
            <UserPage />
          </Route>
          <Route path="/songUpload">
            <SongUploadPage />
          </Route>
          <Route path="/songs/:id">
            <IndSongPage />
          </Route>
          <Route exact path="/albums/add">
            <AddAlbumPage />
          </Route>
          <Route exact path="/albums/:id">
            <IndAlbumPage />
          </Route>
          <Route path="/songs/edit/:id">
            <SongEditpage />
          </Route>
          <Route path="/comments/edit/:id">
            <EditCommentPage />
          </Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
