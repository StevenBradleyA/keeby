import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getListingByIdThunk } from "../../../store/listing";
import "./ManageListings.css";

const ManageListingCard = ({ listing }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleCardClick = (e) => {
    e.preventDefault();
    dispatch(getListingByIdThunk(listing.id));
    history.push(`/listing/${listing.id}`);
  };
  const displayImageArr = listing.listing_images.filter(
    (e) => e.is_display_image === true
  );

  const handleEditListing = () => {
    // setModalContent(<EditDailyDriverModal sessionUser={sessionUser} />);
  };

  const handleDeleteListing = () => {
    // setModalContent(<DeleteUserModal sessionUser={sessionUser}/>)
  };

  return (
    <div className="manage-listings-container">
      <h1>Manage Your Listings</h1>
      <div className="manage-listing-button-containers">
        <button className="manage-listing-update-button">Update</button>
        <button className="manage-listing-delete-button">Delete</button>
      </div>
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
        <button className="read-more-button">Read More</button>
        <p></p>
      </div>
    </div>
  );
};

export default ManageListingCard;
