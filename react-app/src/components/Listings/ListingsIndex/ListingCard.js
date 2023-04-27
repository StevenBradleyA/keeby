import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getListingByIdThunk } from "../../../store/listing";
import {clearComment, getAllCommentsPerListingThunk} from "../../../store/comment"
import "./ListingIndex.css";

const ListingCard = ({ listing }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const allListingImages = Object.values(listing.listing_images);
  // console.log(allListingImages[0])
  //    const displayImage = allListingImages.filter((e)=> {
  //     e.is_display_image === true
  //     })
  // not sure why this is undefined???

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
      {/* <div>{listing.price}</div> */}
      <div className="home-page-description">{`${listing.description.slice(
        0,
        350
      )}...`}</div>
      <button className="read-more-button">Read More</button>
      <p></p>
    </div>
  );
};

export default ListingCard;
