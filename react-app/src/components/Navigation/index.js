import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import LoginFormModal from "./LoginModal";
import SignupFormModal from "./SignUpModal";
import { useModal } from "../../context/Modal";
import UserIconModal from "./ProfileModal";
import DemoLogin from "./DemoLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKeyboard } from "@fortawesome/free-solid-svg-icons";
import keebyTitle from "../../media/keebyTitle.png";

import "./Navigation.css";
import { useHistory } from "react-router-dom";
import ListingSearchResults from "../Listings/SearchListing";

function Navigation() {
  const history = useHistory();
  const { setModalContent } = useModal();
  const [name, setName] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [isResultsClicked, setIsResultsClicked] = useState(false);
  const searchContainerRef = useRef(null);

  const sessionUser = useSelector((state) => state.session.user);
  // const [listingName, setListingName] = useState('')

  const handleLogInClick = () => {
    setModalContent(<LoginFormModal />);
  };
  const handleSignUpClick = () => {
    setModalContent(<SignupFormModal />);
  };

  const handleUserIconClick = () => {
    setModalContent(<UserIconModal />);
  };

  const handleHomeClick = () => {
    history.push(`/`);
  };

  const handleListYourKeeb = () => {
    history.push(`/listings/create`);
  };
  const handleSearchInputFocus = () => {
    setIsSearchInputFocused(true);
  };

  const handleSearchInputBlur = () => {
    setIsSearchInputFocused(false);
  };

  const handleSearchClick = (e) => {
    if (
      !searchContainerRef.current?.contains(e.target) &&
      e.target.id !== "search-input"
    ) {
      setSearchResult([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleSearchClick);

    return () => {
      document.removeEventListener("click", handleSearchClick);
    };
  }, []);

  useEffect(async () => {
    if (name.length) {
      const results = await fetch(`/api/listings/${name}`);
      const data = await results.json();
      setSearchResult(data);
    } else {
      setSearchResult("");
    }
  }, [name]);

  // I want to make list your keeb redirect to log in if not session User

  return (
    <div className="nav-container">
      <div className="keeby-title-container">
        <img
          className="keeby-title"
          src={keebyTitle}
          onClick={handleHomeClick}
        />
      </div>
      <div className="nav-search-container">
        <input
          className="search-input-login"
          type="search"
          placeholder="Search for a Keyboard name ..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
        />
        {searchResult.length > 0 && (
          <div className="search-result-container" ref={searchContainerRef}>
            {searchResult.map((listing) => (
              <ListingSearchResults
                key={listing.id}
                listing={listing}
                setSearchResult={setSearchResult}
                setName={setName}
              />
            ))}
          </div>
        )}
      </div>

      <div className="nav-buttons-container">
        {sessionUser && (
          <>
            <div
              className="button-styling"
              id="list-your-keeb-nav"
              onClick={handleListYourKeeb}
            >{`[ List your Keeb ]`}</div>
            <img
              alt="profile"
              className={
                sessionUser.profile_picture === null
                  ? "profile-icon-letter"
                  : "profile-icon"
              }
              src={
                sessionUser.profile_picture === null
                  ? sessionUser.name[0]
                  : sessionUser.profile_picture
              }
              onClick={handleUserIconClick}
            />
          </>
        )}

        {!sessionUser && (
          <>
            <DemoLogin />
            <button
              onClick={handleLogInClick}
              id="logged-out-nav-buttons"
              className="button-styling"
            >{`[ Log In ]`}</button>
            <button
              onClick={handleSignUpClick}
              id="logged-out-nav-buttons"
              className="button-styling"
            >{`[ Sign Up ]`}</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navigation;
