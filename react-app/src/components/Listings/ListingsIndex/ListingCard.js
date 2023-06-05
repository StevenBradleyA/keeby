import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getListingByIdThunk } from "../../../store/listing";
import {
  clearComment,
  getAllCommentsPerListingThunk,
} from "../../../store/comment";
import "./ListingIndex.css";

const ListingCard = ({ listing }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCardClick = (e) => {
    e.preventDefault();
    dispatch(getListingByIdThunk(listing.id));
    dispatch(getAllCommentsPerListingThunk(listing.id));
    history.push(`/listing/${listing.id}`);
  };
  const displayImageArr = listing.listing_images.filter(
    (e) => e.is_display_image === true
  );

  return (
    <div className="listing-card-container" onClick={handleCardClick}>
      <div className="home-page-listing-title">{listing.name}</div>
      <img
        className="home-page-display-image"
        alt="display"
        src={displayImageArr[0].image}
      />
      <div className="home-page-description">{`${listing.description.slice(
        0,
        350
      )}...`}</div>
      <div className="read-more-button-container">
        <button
          id="read-more-button"
          className="button-styling"
        >{`[ Read More ]`}</button>
      </div>
    </div>
  );
};

export default ListingCard;
