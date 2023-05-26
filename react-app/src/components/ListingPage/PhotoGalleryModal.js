import React  from "react";


function PhotoGalleryModal({ image }) {
  
  return (<div>

    <img className="gallery-preview-modal" alt="gallery-preview" src={image.image}/>

  </div>);
}

export default PhotoGalleryModal;
