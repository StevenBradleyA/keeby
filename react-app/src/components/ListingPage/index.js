import React, { useEffect } from "react";
import { getListingByIdThunk } from "../../store/listing";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ListingPage = () => {
  const dispatch = useDispatch();
  const { listingId } = useParams();

  useEffect(() => {
    dispatch(getListingByIdThunk(listingId));
  }, [dispatch, listingId]);

  const currentListing = useSelector((state) => state.listings)[listingId];

  //   going to need all comment info
  // going to need all photos here
  // everything doe
  return (
    <div>
      <div>{currentListing.name}</div>
      <div>{currentListing.price}</div>
      <div>{currentListing.description}</div>
      


    </div>
  );
};

export default ListingPage;
