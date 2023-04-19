const LOAD_LISTINGS = "listings/LOAD_LISTINGS";
const CREATE_LISTING = "listings/CREATE_LISTING";
const UPDATE_LISTING = "listings/UPDATE_LISTING";
const DELETE_LISTING = "listings/DELETE_LISTING";

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
