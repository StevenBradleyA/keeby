import React from "react";
import { createListingThunk } from "../../../store/listing";

function CreateListingForm({ workspaceId }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleInputErrors = () => {
    const errorsObj = {};
    if (name.length === 0) {
      errorsObj.name = "Name is required";
    }
    if (str(price).length === 0) {
      errorsObj.price = "Price is required";
    }
    if (description.length < 400) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push("/images");
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("error");
    }
  };

  useEffect(() => {
    handleInputErrors();
  }, [name, price, description, image]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {
      const listingInformation = {
        owner_id: sessionUser.id,
        name,
        price,
        description,
        image,
      };
      let newListing = await dispatch(createListingThunk(listingInformation));
      //   push to new Listing id
      history.push(`/`);
    }
    setHasSubmitted(true);
  };

  return (
    <div className="channel-form-container">
      {sessionUser && (
        <>
          <div>
            <h1>Create a Listing for your Keyboard</h1>
            <form onSubmit={handleFormSubmit}>
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
                  value={images}
                  accept="image/png, image/jpeg"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
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
