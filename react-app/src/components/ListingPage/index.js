import React, { useEffect } from "react";
import { getListingByIdThunk } from "../../store/listing";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ListingPage.css";

const ListingPage = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();

  useEffect(() => {
    dispatch(getListingByIdThunk(listingId));
  }, [dispatch, listingId]);

  const currentListing = useSelector((state) => state.listings)[listingId];

  //   going to need all comment info
  // going to need all photos here
  // everything doe
  if (!currentListing) {
    return <h1>LOADING...</h1>;
  }

  // console.log('hey current', currentListing.listing_images[0].image)
  const displayImageArr = currentListing.listing_images.filter(
    (e) => e.is_display_image === true
  );
  // `${listing.description.slice(0, 350)}...`
  return (
    <div className="single-listing-page-container">
      <div>{currentListing.name}</div>
      <div>{currentListing.price}</div>
      <img
        className="listing-page-display-image"
        alt="display"
        src={displayImageArr[0].image}
      />
      <div>{`${currentListing.description.slice(0, 250)}...`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[1].image}
      />

      <div>{`${currentListing.description.slice(250, 500)}...`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[2].image}
      />

      {/* <div>{`${currentListing.description.slice(200, 300)}...`}</div> */}
      {/* <div>{`${currentListing.description.slice(300, 400)}...`}</div> */}
      <div>{`${currentListing.description.slice(500, 750)}...`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[3].image}
      />

      <div>{`${currentListing.description.slice(750)}`}</div>

      <h2>{`Photo Gallery`}</h2>
      <div className="listing-page-photo-gallery">
        {currentListing.listing_images.map((image) => (
          <img alt="all listing" src={image.image} />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
