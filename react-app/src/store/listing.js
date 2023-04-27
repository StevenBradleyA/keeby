const LOAD_LISTINGS = "listings/LOAD_LISTINGS";
const CREATE_LISTING = "listings/CREATE_LISTING";
const UPDATE_LISTING = "listings/UPDATE_LISTING";
const DELETE_LISTING = "listings/DELETE_LISTING";

// --------      Actions         --------

const loadListings = (allListingData) => ({
  type: LOAD_LISTINGS,
  payload: allListingData,
});

const createListing = (newListingData) => ({
  type: CREATE_LISTING,
  payload: newListingData,
});

const updateListing = (updatedListingData) => ({
  type: UPDATE_LISTING,
  payload: updatedListingData,
});

const deleteListing = (listingId) => ({
  type: DELETE_LISTING,
  payload: listingId,
});

// --------      Thunks         --------

export const getAllListingsThunk = () => async (dispatch) => {
  const response = await fetch(`/api/listings`);

  if (response.ok) {
    const allListingData = await response.json();
    const normalizedListingData = {};
    allListingData.forEach((e) => {
      normalizedListingData[e.id] = e;
    });
    dispatch(loadListings(normalizedListingData));
  }
};

export const getListingByIdThunk = (listingId) => async (dispatch) => {
  const response = await fetch(`/api/listings/${listingId}`);

  if (response.ok) {
    const singleListingData = await response.json();
    const normalizedListingData = {};
    normalizedListingData[singleListingData.id] = singleListingData;
    dispatch(loadListings(normalizedListingData));
  }
};

export const createListingThunk = (newListingData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/listings`, {
      method: "POST",
      body: newListingData,
    });

    const data = await response.json();
    const normalizedListingData = {};
    normalizedListingData[data.id] = data;
    dispatch(createListing(normalizedListingData));
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateListingThunk =
  (newListingData, listingId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/listings/${listingId}`, {
        method: "PUT",
        body: newListingData,
      });
      const data = await response.json();
      const normalizedListingData = {};
      normalizedListingData[data.id] = data;
      dispatch(updateListing(normalizedListingData));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteListingThunk = (listingId) => async (dispatch) => {
  const response = await fetch(`/api/listings/${listingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(deleteListing(listingId));
  }
};

const initialState = {};

const listingsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_LISTINGS:
      return { ...state, ...action.payload };
    case CREATE_LISTING:
      return { ...state, ...action.payload };
    case UPDATE_LISTING:
      return { ...state, ...action.payload };
    case DELETE_LISTING:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
};

export default listingsReducer;
