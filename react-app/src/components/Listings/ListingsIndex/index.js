import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingsThunk } from "../../../store/listing";
import ListingCard from "./ListingCard";
import githubIcon from "../../../media/square-github.svg"
import linkedIn from "../../../media/linkedin.svg"
import "./ListingIndex.css"

const ListingsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListingsThunk());
  }, [dispatch]);

  const allListings = useSelector((state) => Object.values(state.listings));

  return (
    <div className="listing-index-container">
      {allListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
      <div className="footer-home-container">
        <div className="footer-sticky-container">
          <div className="footer-text">@ 2023 Steven Anderson</div>
          {`·`}
          <img
            alt="github"
            src={githubIcon}
            className="footer-icons"
            onClick={() =>
              window.open("https://github.com/StevenBradleyA", "_blank")
            }
          />
          {`·`}
          <img
            alt="linkedIn"
            src={linkedIn}
            className="footer-icons"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/stevenanderson-dev/",
                "_blank"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ListingsIndex;
