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
    if (description.length < 4) {
      errorsObj.description =
        "Your Description must be at least 400 characters";
    }
    // if (image.length < 4) {
    //   errorsObj.image = "Provide at least 4 Photos";
    // }
    // if (image.length > 50) {
    //   errorsObj.imageExcess = "Cannot provide more than 50 photos";
    // }
    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [name, price, description, imageFiles]);

  console.log(imageFiles.name);

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
      const listingInformation = {
        owner_id: sessionUser.id,
        name,
        price,
        description,
      };
      let newListing = await dispatch(createListingThunk(formData));

      //   push to new Listing id
      // history.push(`/listings/${newListing.id}`);
      setImageLoading(false);
    }
    setHasSubmitted(true);
  };

  console.log(previewImage);

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
                <input
                  type="text"
                  placeholder="Must be greater than 400 characters"
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
                  accept="image/*"
                  onChange={(e) => {
                    setImageFiles([...imageFiles, ...e.target.files]);
                  }}
                />
              </label>
              {imageLoading && <p>Loading...</p>}
              {imageFiles.map((e, i) => {
                return (
                  <>
                    <img
                      onClick={() => setPreviewImage(e.name)}
                      className="view-uploaded-image"
                      alt={`listing-${i}`}
                      src={URL.createObjectURL(e)}
                      key={i}
                    />
                  </>
                );
              })}
              <p></p>
              {/* {hasSubmitted && errors.image && (
                <p className="errors">{errors.image}</p>
              )}
              {hasSubmitted && errors.imageExcess && (
                <p className="errors">{errors.imageExcess}</p>
              )} */}
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
