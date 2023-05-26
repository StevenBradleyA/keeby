import React, { useState }  from "react";
import { useModal } from "../../context/Modal";






function PhotoGalleryModal({ image, images }) {
  const { closeModal } = useModal();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleClose = () => {
    closeModal()
  };





  return (
  
  <div>

    {/* <img className="gallery-preview-modal" alt="gallery-preview" src={image.image}/> */}


    <span className="close" onClick={handleClose}>&times;</span>
        <img className="gallery-preview-modal" alt="gallery-preview" src={images[currentImageIndex].image} />

    <button onClick={handlePrevious} disabled={currentImageIndex === 0}>Previous</button>
        <button onClick={handleNext} disabled={currentImageIndex === images.length - 1}>Next</button>

  </div>);
}

export default PhotoGalleryModal;
