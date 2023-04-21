import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import ListingPage from "./components/Listings/SingleListing";
import CreateListingForm from "./components/Listings/CreateListing";

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
          <Route path="/listings/create">
            <CreateListingForm />
          </Route>
          <Route path="/listing/:listingId">
            <ListingPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
