import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { updateListingThunk } from "../../../store/listing";
import "./UpdateListing.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

function EditListingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { listing } = location.state;
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState(listing.name);
  const [price, setPrice] = useState(listing.price);
  const [description, setDescription] = useState(listing.description);
  const [imageFiles, setImageFiles] = useState([]);
  const [deleteImages, setDeleteImages] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // console.log("hellooooooo", listing.listing_images);
  // console.log("howdy", deleteImages);

  const handleInputErrors = () => {
    const errorsObj = {};
    if (name.length === 0) {
      errorsObj.name = "Name is required";
    }
    if (price.toString().length === 0) {
      errorsObj.price = "Price is required";
    }
    if (description.length < 750) {
      errorsObj.description =
        "Your Description must be at least 750 characters";
    }
    // if (imageFiles.length < 4) {
    //   errorsObj.image = "Provide at least 4 Photos";
    // }
    if (imageFiles.length > 50) {
      errorsObj.imageExcess = "Cannot provide more than 50 photos";
    }
    if (!previewImage) {
      errorsObj.previewImage = "Select a preview image";
    }
    if (
      imageFiles.length + listing.listing_images.length - deleteImages.length <
      4
    ) {
      errorsObj.imageLow = "Need to have a total of 4 listing Images";
    }
    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [name, price, description, imageFiles, previewImage, deleteImages]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    imageFiles.forEach((e) => {
      if (e.name === previewImage) {
        formData.append("preview", e);
      } else {
        formData.append("image", e);
      }
    });

    if (typeof previewImage === "number") {
      formData.append("preview", previewImage);
    }
    console.log('test', deleteImages)
    deleteImages.forEach((e) => {
      formData.append("delete", e);
    });
    setImageLoading(true);

    const listingInformation = {
      owner_id: sessionUser.id,
      name,
      price: Number(price),
      description,
    };
    formData.append("listing", JSON.stringify(listingInformation));

    if (!Object.values(errors).length) {
      await dispatch(updateListingThunk(formData, listing.id));

      history.push(`/listing/${listing.id}`);
      setImageLoading(false);
    }
    setHasSubmitted(true);
  };

  const handleDeletePreviousImage = () => {
    // keep track of things they want to delete
    // if it goes below 4 don't let them
    // keep track of imageFiles length and subtract from the delete files length
    // keep track of current listing images
    // if that count is below 4 throw an error
    // otherwise going to need to delete select files from db and s3.
    // previous images length + imageFiles length - delete arr length
  };

  return (
    <div className="update-listing-page-container">
      {sessionUser && (
        <>
          <div>
            <h1>Update Your Listing</h1>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <label>
                Name of Listing:
                <input
                  type="text"
                  placeholder={listing.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <p></p>
              {hasSubmitted && errors.name && (
                <p className="errors">{errors.name}</p>
              )}
              <label>
                Price:
                <input
                  type="text"
                  placeholder={listing.price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <p></p>
              {hasSubmitted && errors.price && (
                <p className="errors">{errors.price}</p>
              )}
              <p>
                Write a detailed description about your Product. The longer the
                better! What your build consists of? What is it like to type on?
                How is the sound profile? What do you like about it?
              </p>
              <label>
                Description:
                <textarea
                  placeholder={listing.description}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <p></p>
              {hasSubmitted && errors.description && (
                <p className="errors">{errors.description}</p>
              )}
              <div>{`Current Listing Images`}</div>
              <div>{`[ Choose a preview image by clicking an image ]      [ must have a total of 4 images]`}</div>

              {listing.listing_images.map((e) => {
                return (
                  <>
                    <img
                      src={e.image}
                      alt="current"
                      className="current-listing-images"
                      style={
                        deleteImages.includes(e.id)
                          ? { border: "5px solid red" }
                          : previewImage === e.id
                          ? { border: "5px solid green" }
                          : null
                      }
                      onClick={() => {
                        return deleteImages.includes(e.id)
                          ? null
                          : setPreviewImage(e.id);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faSquareXmark}
                      onClick={() => {
                        if (deleteImages.includes(e.id)) {
                          const selected = deleteImages.filter(
                            (eachImage) => eachImage !== e.id
                          );
                          setDeleteImages(selected);
                        } else {
                          setDeleteImages([...deleteImages, e.id]);
                        }
                      }}
                    />
                  </>
                );
              })}
              <p>Add more Images to your listing!</p>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  setImageFiles([...imageFiles, ...e.target.files]);
                }}
              />
              {/* {imageLoading && <p>Loading...</p>} */}
              {imageFiles.map((e, i) => {
                return (
                  <>
                    <img
                      onClick={() => setPreviewImage(e.name)}
                      style={
                        previewImage === e.name
                          ? { border: "5px solid green" }
                          : null
                      }
                      className="view-uploaded-image"
                      alt={`listing-${i}`}
                      src={URL.createObjectURL(e)}
                      key={i}
                    />
                  </>
                );
              })}
              <p></p>
              {hasSubmitted && errors.image && (
                <p className="errors">{errors.image}</p>
              )}
              {hasSubmitted && errors.imageExcess && (
                <p className="errors">{errors.imageExcess}</p>
              )}
              {hasSubmitted && errors.previewImage && (
                <p className="errors">{errors.previewImage}</p>
              )}
              {hasSubmitted && errors.imageLow && (
                <p className="errors">{errors.imageLow}</p>
              )}
              <input
                type="submit"
                value={"Update Listing"}
                disabled={hasSubmitted && Object.values(errors).length > 0}
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default EditListingPage;
