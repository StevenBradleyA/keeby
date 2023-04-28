import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getListingByIdThunk } from "../../../store/listing";
import "./ManageListings.css";
import DeleteListingModal from "../DeleteListing";
import { useModal } from "../../../context/Modal";
import EditListingModal from "../UpdateListing";

const ManageListingCard = ({ listing }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { setModalContent } = useModal();

  const handleCardClick = (e) => {
    e.preventDefault();
    dispatch(getListingByIdThunk(listing.id));
    history.push(`/listing/${listing.id}`);
  };
  const displayImageArr = listing.listing_images.filter(
    (e) => e.is_display_image === true
  );

  const handleEditListing = () => {
    history.push(`/listing/${listing.id}/edit`, { listing: listing });
  };

  const handleDeleteListing = () => {
    setModalContent(<DeleteListingModal listing={listing} />);
  };

  //   todo  I want to style this page so that the cards are pretty small and the update and delete
  // are more sizeable.
  return (
    <div className="manage-listings-container">
      <div className="manage-listing-card">
        <div className="manage-listing-name">{listing.name}</div>
        <img
          onClick={handleCardClick}
          className="manage-listing-image"
          alt="display"
          src={displayImageArr[0].image}
        />

        <div className="manage-listing-button-containers">
          <button
            className="manage-listing-update-button"
            onClick={handleEditListing}
          >
            {`[ Update ]`}
          </button>
          <button
            className="manage-listing-delete-button"
            onClick={handleDeleteListing}
          >
            {`[ Delete ]`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageListingCard;
