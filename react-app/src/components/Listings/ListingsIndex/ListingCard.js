import React from "react";
import { useHistory } from "react-router-dom";
import "./ListingIndex.css";

const ListingCard = ({ listing }) => {
    const history = useHistory()
  const allListingImages = Object.values(listing.listing_images);
  // console.log(allListingImages[0])
  //    const displayImage = allListingImages.filter((e)=> {
  //     e.is_display_image === true
  //     })
  // not sure why this is undefined???

    const handleCardClick = (e) => {
        e.preventDefault()
        history.push(`/listing/${listing.id}`)
    }


  return (
    <div className="listing-card-container" onClick={handleCardClick}>
      <div>{listing.name}</div>
      <div>{listing.price}</div>
      <div>{`${listing.description.slice(0, 350)}...`}</div>
      {/* <img alt="listing" src={} /> */}
      <p></p>
    </div>
  );
};

export default ListingCard;
