import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import MainPage from "./components/MainPage";
import SongDetails from "./components/SongDetail";
import ArtistDetails from "./components/ArtistDetails";
import SongPlayer from "./components/SongPlayer";
import AboutLinks from "./components/AboutLinks";
import Search from './components/SearchPage'
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />

      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <MainPage />
            <SongPlayer/>
          </Route>
          <Route exact path='/songs/:songId'>
            <SongDetails/>
            <SongPlayer/>
          </Route>
          <Route exact path='/artists/:artistId'>
            <ArtistDetails/>
            <SongPlayer/>
          </Route>
          <Route exact path='/search'>
            <Search/>
            <SongPlayer/>
          </Route>

        </Switch>
      )}
      <AboutLinks/>
    </>
  );
}

export default App;
