import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

function PhotoGalleryModal({ images }) {
  const { closeModal } = useModal();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // const handleClose = () => {
  //   closeModal();
  // };

  return (
    <div className="preview-image-modal-container">
      {/* <img className="gallery-preview-modal" alt="gallery-preview" src={image.image}/> */}
      {/* <span className="close" onClick={handleClose}>
        &times;
      </span> */}
      <img
        className="gallery-preview-modal"
        alt="gallery-preview"
        src={images[currentImageIndex].image}
      />

      {currentImageIndex !== 0 && (
        <FontAwesomeIcon
          icon={faChevronLeft}
          onClick={handlePrevious}
          className="left-arrow"
        />
      )}
      {currentImageIndex === 0 && (
        <FontAwesomeIcon icon={faChevronLeft} className="left-arrow-disabled" />
      )}

      {currentImageIndex !== images.length - 1 && (
        <FontAwesomeIcon
          icon={faChevronRight}
          onClick={handleNext}
          className="right-arrow"
        />
      )}
      {currentImageIndex === images.length - 1 && (
        <FontAwesomeIcon
          icon={faChevronRight}
          className="right-arrow-disabled"
        />
      )}
    </div>
  );
}

export default PhotoGalleryModal;
