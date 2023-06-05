import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./SearchListing.css";

function ListingSearchResults({ listing, setSearchResult, setName }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleListingClick = (e) => {
    e.preventDefault();
    history.push(`/listing/${listing.id}`);
    setSearchResult("");
    setName("");
  };

  const previewImage = listing.listing_images.filter((e) => {
    return e.is_display_image === true;
  });
  return (
    <div
      onClick={handleListingClick}
      className="search-result-listing-card-container"
    >
      <div className="search-result-image-container">
        <img
          src={previewImage[0].image}
          className="search-result-listing-image"
        />
      </div>
      <div className="search-result-text-container">
        <div className="search-result-listing-name">{listing.name}</div>
      </div>
    </div>
  );
}

export default ListingSearchResults;
