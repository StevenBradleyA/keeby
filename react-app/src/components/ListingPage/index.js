import React, { useEffect } from "react";
import { getListingByIdThunk } from "../../store/listing";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ListingPage.css";
import PhotoGalleryModal from "./PhotoGalleryModal";
import { getAllCommentsPerListingThunk } from "../../store/comment";
import CommentCard from "../Comments/CommentsIndex";
import CreateComment from "../Comments/CreateComment";

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
      setModalContent(<PhotoGalleryModal image={image} />);
    };
  };

  // currently this would not catch exclamation marks or question marks...

  const sentenceArr = currentListing.description.split(". ");
  const endSentence = sentenceArr.slice(6);
  const finalSentenceStr = endSentence.join(". ").replace(/\.$/, "") + ".";

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
      <div className="listing-page-description">{`${sentenceArr[0]}. ${sentenceArr[1]}.`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[1].image}
      />

      <div className="listing-page-description">{`${sentenceArr[2]}. ${sentenceArr[3]}.`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[2].image}
      />

      <div className="listing-page-description">{`${sentenceArr[4]}. ${sentenceArr[5]}.`}</div>
      <img
        className="listing-page-additional-image"
        alt="listing"
        src={currentListing.listing_images[3].image}
      />

      <div className="listing-page-description">{finalSentenceStr}</div>

      <h2 className="listing-page-photo-gallery-title">{`PHOTO GALLERY`}</h2>
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
      <p></p>
      <div className="comments-container">
        <div className="create-comment-container">
          {`${allComments.length} COMMENTS`}
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
    </div>
  );
};

export default ListingPage;
