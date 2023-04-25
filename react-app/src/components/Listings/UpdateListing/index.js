import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { updateListingThunk } from "../../../store/listing";

function EditListingPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
  const {listing} = location.state
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
    if (description.length < 750) {
      errorsObj.description =
        "Your Description must be at least 750 characters";
    }
    if (imageFiles.length < 4) {
      errorsObj.image = "Provide at least 4 Photos";
    }
    if (imageFiles.length > 50) {
      errorsObj.imageExcess = "Cannot provide more than 50 photos";
    }
    setErrors(errorsObj);
  };

  useEffect(() => {
    handleInputErrors();
  }, [name, price, description, imageFiles]);

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
      await dispatch(updateListingThunk(formData, listing.id));

      // history.push(`/listing/${listing.id}`);
      setImageLoading(false);
    }
    setHasSubmitted(true);
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
              {/* {imageLoading && <p>Loading...</p>} */}
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
              {hasSubmitted && errors.image && (
                <p className="errors">{errors.image}</p>
              )}
              {hasSubmitted && errors.imageExcess && (
                <p className="errors">{errors.imageExcess}</p>
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
