import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createListingThunk } from "../../../store/listing";
import "./CreateListing.css";

function CreateListingForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewImage, setPreviewImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleInputErrors = () => {
    const errorsObj = {};
    if (name.length === 0) {
      errorsObj.name = "Name is required";
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
      // todo I want to push to a loading component or a video since it takes some time to go to aws and back...
      // if !newListing then load component and pass newlisting as a prop
      // if (!newListing.id) {
      //   return <h1>LOADING...</h1>;
      // }
      history.push(`/listing/${newListing.id}`);
      setImageLoading(false);
    }
    setHasSubmitted(true);
  };

  return (
    <div className="create-listing-page-container">
      {sessionUser && (
        <>
          <div>
            <h1>Create a Listing for your Keyboard</h1>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <label>
                Name of Listing:
                <input
                  type="text"
                  placeholder="Name"
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
                  placeholder="Price"
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
                  placeholder="Must be greater than 750 characters"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <p></p>
              {hasSubmitted && errors.description && (
                <p className="errors">{errors.description}</p>
              )}
              <p>Upload Images of your keyboard!</p>
              <label>
                Upload at least 4 images:
                <input
                  type="file"
                  multiple
                  // accept="image/png, image/jpg, image/jpeg"
                  // gifs are kinda fun tho
                  accept="image/*"
                  onChange={(e) => {
                    setImageFiles([...imageFiles, ...e.target.files]);
                  }}
                />
              </label>
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
              <input
                type="submit"
                value={"Create Listing"}
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
