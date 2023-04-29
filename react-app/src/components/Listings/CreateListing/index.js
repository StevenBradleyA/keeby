import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createListingThunk } from "../../../store/listing";
import "./CreateListing.css";

function CreateListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const transitionId = 2;

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
    if (description.length < 10) {
      errorsObj.description =
        "Your Description must be at least 750 characters";
    }
    if (imageFiles.length < 4) {
      errorsObj.image = "Provide at least 4 Photos";
    }
    if (imageFiles.length > 50) {
      errorsObj.imageExcess = "Cannot provide more than 50 photos";
    }
    if (previewImage.length === 0) {
      errorsObj.previewImage = "Select a preview image";
    }

    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [name, price, description, imageFiles, previewImage]);

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
    setImageLoading(true);

    const listingInformation = {
      owner_id: sessionUser.id,
      name,
      price: Number(price),
      description,
    };
    formData.append("listing", JSON.stringify(listingInformation));

    if (!Object.values(errors).length) {
      let newListing = await dispatch(createListingThunk(formData));
      history.push(`/hackTime/${transitionId}`, { listingId: newListing.id });

      // history.push(`/listing/${newListing.id}`);
      setImageLoading(false);
    }
    setHasSubmitted(true);
  };

  useEffect(() => {
    const phrases = [
      "Please Stand By",
      "Scanning for Thock",
      "ಠ_ಠ none found",
      "Create a Listing",
    ];
    const delay = [0, 2000, 4000, 6000];

    phrases.forEach((phrase, i) =>
      setTimeout(() => {
        setText(phrase);
      }, delay[i])
    );
  }, []);

  return (
    <div className="create-listing-page-container">
      {sessionUser && (
        <>
          <div>
            <h1 className="create-listing-title">{text}</h1>
            <form
              onSubmit={handleFormSubmit}
              encType="multipart/form-data"
              className="create-listing-form-container"
            >
              <label>
                Name of Listing   
                <input
                  className="create-listing-input"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              {hasSubmitted && errors.name && (
                <p className="create-listing-errors">{errors.name}</p>
              )}
              {hasSubmitted && errors.nameTwoWord && (
                <p className="create-listing-errors">{errors.nameTwoWord}</p>
              )}
              <label>
                Price   
                <input
                  className="create-listing-input"
                  type="text"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>

              {hasSubmitted && errors.price && (
                <p className="create-listing-errors">{errors.price}</p>
              )}
              <p>
                Write a detailed description about your Product. The longer the
                better! What your build consists of? What is it like to type on?
                How is the sound profile? What do you like about it?
              </p>

              <textarea
                className="create-listing-input"
                id="create-listing-description-input"
                placeholder="Must be greater than 750 characters"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {hasSubmitted && errors.description && (
                <p className="create-listing-errors">{errors.description}</p>
              )}
              <div className="create-listing-upload-title">
                Upload Images of your keyboard!
              </div>
              <div className="create-listing-upload-tips">
                <div className="create-listing-upload-tips-color">
                  {" "}
                  {`[ Upload at least 4 images ]`}{" "}
                </div>
                <div className="create-listing-upload-tips-color">{`[ Click an image to set as display image ]`}</div>
              </div>
              {hasSubmitted && errors.image && (
                <p className="create-listing-errors">{errors.image}</p>
              )}
              {hasSubmitted && errors.imageExcess && (
                <p className="create-listing-errors">{errors.imageExcess}</p>
              )}
              {hasSubmitted && errors.previewImage && (
                <p className="create-listing-errors">{errors.previewImage}</p>
              )}

              <input
                className="create-listing-choose-files-input"
                type="file"
                multiple
                // accept="image/png, image/jpg, image/jpeg"
                // gifs are kinda fun tho
                accept="image/*"
                onChange={(e) => {
                  setImageFiles([...imageFiles, ...e.target.files]);
                }}
              />
              {/* {imageLoading && <p>Loading...</p>} */}
              <div className="create-listing-image-upload-container">
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
                className="create-listing-submit-input"
                type="submit"
                value={`[ Create Listing ]`}
                disabled={hasSubmitted && Object.values(errors).length > 0}
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateListingForm;
