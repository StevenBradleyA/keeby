import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingsThunk } from "../../../store/listing";
import ManageListingCard from "./ManageListingCard";

const ManageListingsIndex = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllListingsThunk());
  }, [dispatch]);

  const allListings = useSelector((state) => Object.values(state.listings));
  const ownedListings = allListings.filter((e)=>
    e.owner_id === sessionUser.id
  )

  return (
    <div className="listing-index-container">
      <h1>Manage Your Listings</h1>
      {ownedListings.map((listing) => (
        <ManageListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ManageListingsIndex;
