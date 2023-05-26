import React, { useCallback, useEffect, useState } from "react";
import { getListingByIdThunk } from "../../store/listing";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ListingPage.css";
import PhotoGalleryModal from "./PhotoGalleryModal";
import { getAllCommentsPerListingThunk } from "../../store/comment";
import CommentCard from "../Comments/CommentsIndex";
import CreateComment from "../Comments/CreateComment";
import githubIcon from "../../media/square-github.svg";
import linkedIn from "../../media/linkedin.svg";

const ListingPage = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const currentListingId = Number(listingId);
  const { setModalContent } = useModal();
  useEffect(() => {
    dispatch(getListingByIdThunk(listingId));
  }, [dispatch, listingId]);

  useEffect(() => {
    dispatch(getAllCommentsPerListingThunk(listingId));
  }, [dispatch, listingId]);

  const currentListing = useSelector((state) => state.listings)[listingId];

  const allComments = useSelector((state) =>
    Object.values(state.comments).filter(
      (e) => e.listing_id === currentListingId
    )
  );

  if (!currentListing) {
    return <h1>LOADING...</h1>;
  }

  if (!currentListing.listing_images) {
    return <h1>LOADING...</h1>;
  }

  const displayImageArr = currentListing.listing_images.filter(
    (e) => e.is_display_image === true
  );

  const handlePhotoGalleryClick = (image) => {
    return () => {
      setModalContent(<PhotoGalleryModal image={image} images={currentListing.listing_images}/>);
    };
  };

  // currently this would not catch exclamation marks or question marks...

  const sentenceArr = currentListing.description.split(". ");
  const splitOn = Math.floor(sentenceArr.length / 4);

  const currentListingNameArr = currentListing.name.split(" ");
  const smallTitle = currentListingNameArr.pop();
  const bigTitle = currentListingNameArr.join(" ");

  return (
    <div className="single-listing-page-container">
      <div className="listing-page-tile-container">
        <h1 className="listing-page-title-big">{bigTitle}</h1>
        <h1 className="listing-page-title-small">{smallTitle}</h1>
      </div>

      <div className="listing-price-comments-header-container">
        <div id="price-header">{`Listing Price $ ${currentListing.price}`}</div>
        <div className="gradient-blue-purple" id="comment-count-header">
          {`${allComments.length} Comments 💬`}
        </div>
      </div>
      <img
        className="listing-page-display-image"
        alt="display"
        src={displayImageArr[0].image}
      />
      <div className="listing-page-description">{`${sentenceArr
        .slice(0, splitOn)
        .join(". ")}.`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[1].image}
      />

      <div className="listing-page-description">{`${sentenceArr
        .slice(splitOn, splitOn * 2)
        .join(". ")}.`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[2].image}
      />

      <div className="listing-page-description">{`${sentenceArr
        .slice(splitOn * 2, splitOn * 3)
        .join(". ")}.`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[3].image}
      />

      <div className="listing-page-description">{`${sentenceArr
        .slice(splitOn * 3)
        .join(". ")}`}</div>

      <div className="listing-page-photo-gallery-title">{`PHOTO GALLERY`}</div>
      <div className="listing-page-photo-gallery-container">
        {currentListing.listing_images.map((image) => (
          <img
            className="listing-page-photo-gallery-each"
            alt="all listing"
            key={image.id}
            src={image.image}
            onClick={handlePhotoGalleryClick(image)}
          />
        ))}

      </div>
      <div className="comments-container">
        <div className="create-comment-container">
          <div className="comments-title">{`${allComments.length} COMMENTS`}</div>
          <CreateComment listingId={listingId} />
        </div>
        {allComments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            currentListing={currentListing}
          />
        ))}
      </div>
      <div className="footer-container">
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

export default ListingPage;
