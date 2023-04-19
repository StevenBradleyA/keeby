const LOAD_LISTINGS = "listings/LOAD_LISTINGS"
const CREATE_LISTING = "listings/CREATE_LISTING"
const UPDATE_LISTING = "listings/UPDATE_LISTING"
const DELETE_LISTING = "listings/DELETE_LISTING"

const loadListings = (allListingData) => ({
    type: LOAD_LISTINGS,
    payload: allListingData,
  });
