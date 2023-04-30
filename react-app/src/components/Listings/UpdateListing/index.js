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
  const [text, setText] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const transitionId = 3;

  const handleInputErrors = () => {
    const errorsObj = {};
    if (name.length === 0) {
      errorsObj.name = "Name is required";
    }
    if (name.split(" ").length <= 1) {
      errorsObj.nameTwoWord = "Name must be at least two words";
    }
    if (price.toString().length === 0) {
      errorsObj.price = "Price is required";
    }
    if (description.length < 750) {
      errorsObj.description =
        "Your Description must be at least 750 characters";
    }

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
      // history.push(`/hackTime/${transitionId}`, { updateId: listing.id });

      history.push(`/listing/${listing.id}`);
      setImageLoading(false);
    }
    setHasSubmitted(true);
  };

  useEffect(() => {
    const phrases = [
      "Please Stand By",
      "Scanning for Thock",
      "ಠ_ಠ none found",
      "Edit Your Listing",
    ];
    const delay = [0, 2000, 4000, 6000];

    phrases.forEach((phrase, i) =>
      setTimeout(() => {
        setText(phrase);
      }, delay[i])
    );
  }, []);

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
            <h1 className="update-listing-title">{text}</h1>
            <form
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
              className="update-listing-form-container"
            >
              <label>
                Name of Listing   
                <input
                  className="update-listing-input"
                  id="update-listing-name"
                  type="text"
                  placeholder={listing.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {hasSubmitted && errors.name && (
                <p className="update-listing-errors">{errors.name}</p>
              )}
              {hasSubmitted && errors.nameTwoWord && (
                <p className="create-listing-errors">{errors.nameTwoWord}</p>
              )}
              <label>
                Price   
                <input
                  className="update-listing-input"
                  type="text"
                  placeholder={listing.price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              {hasSubmitted && errors.price && (
                <p className="update-listing-errors">{errors.price}</p>
              )}
              <p>
                Write a detailed description about your Product. The longer the
                better! What your build consists of? What is it like to type on?
                How is the sound profile? What do you like about it?
              </p>
              <textarea
                className="update-listing-input"
                id="update-listing-description-input"
                placeholder={listing.description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {hasSubmitted && errors.description && (
                <p className="update-listing-errors">{errors.description}</p>
              )}
              <div className="update-listing-upload-title">
                Current Images of your keyboard!
              </div>
              <div className="update-listing-upload-tips">
                <div className="update-listing-upload-tips-color">
                  {" "}
                  {`[ Maintain a total of least 4 images ]`}{" "}
                </div>
                <div className="update-listing-upload-tips-color">{`[ Click an image to set as display image ]`}</div>
              </div>
              {hasSubmitted && errors.image && (
                <p className="update-listing-errors">{errors.image}</p>
              )}
              {hasSubmitted && errors.imageExcess && (
                <p className="update-listing-errors">{errors.imageExcess}</p>
              )}
              {hasSubmitted && errors.previewImage && (
                <p className="update-listing-errors">{errors.previewImage}</p>
              )}
              {hasSubmitted && errors.imageLow && (
                <p className="update-listing-errors">{errors.imageLow}</p>
              )}
              <div className="update-listing-image-upload-container">
                {listing.listing_images.map((e) => {
                  return (
                    <>
                      <img
                        src={e.image}
                        alt="current"
                        className="each-uploaded-image"
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
                        className="x-marks-the-spot"
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
              </div>
              <div className="update-listing-upload-title">
                Upload More Images of your keyboard!
              </div>

              <input
                className="update-listing-choose-files-input"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  setImageFiles([...imageFiles, ...e.target.files]);
                }}
              />
              {/* {imageLoading && <p>Loading...</p>} */}
              <div className="update-listing-image-upload-container">
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
                        className="each-uploaded-image"
                        alt={`listing-${i}`}
                        src={URL.createObjectURL(e)}
                        key={i}
                      />
                    </>
                  );
                })}
              </div>

              <input
                className="update-listing-submit-input"
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
