import React, { useEffect } from "react";
import { getListingByIdThunk } from "../../store/listing";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ListingPage.css";
import PhotoGalleryModal from "./PhotoGalleryModal";

const ListingPage = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const { setModalContent } = useModal();
  useEffect(() => {
    dispatch(getListingByIdThunk(listingId));
  }, [dispatch, listingId]);

  const currentListing = useSelector((state) => state.listings)[listingId];

  if (!currentListing) {
    return <h1>LOADING...</h1>;
  }

  const displayImageArr = currentListing.listing_images.filter(
    (e) => e.is_display_image === true
  );

  // todo
  // make a modal for each preview image. the modal is just the image on click

  const handlePhotoGalleryClick = (image) => {
    return () => {
      setModalContent(<PhotoGalleryModal image={image} />);
    };
  };

  return (
    <div className="single-listing-page-container">
      <div>{currentListing.name}</div>
      <div>{currentListing.price}</div>
      <img
        className="listing-page-display-image"
        alt="display"
        src={displayImageArr[0].image}
      />
      <div className="listing-page-description">{`${currentListing.description.slice(
        0,
        250
      )}...`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[1].image}
      />

      <div className="listing-page-description">{`${currentListing.description.slice(
        250,
        500
      )}...`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[2].image}
      />

      <div className="listing-page-description">{`${currentListing.description.slice(
        500,
        750
      )}...`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[3].image}
      />

      <div className="listing-page-description">{`${currentListing.description.slice(
        750
      )}`}</div>

      <h2 className="listing-page-photo-gallery-title">{`Photo Gallery`}</h2>
      <div className="listing-page-photo-gallery-container">
        {currentListing.listing_images.map((image) => (
          <img
            className="listing-page-photo-gallery-each"
            alt="all listing"
            src={image.image}
            onClick={handlePhotoGalleryClick(image)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListingPage;
