import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingsThunk } from "../../../store/listing";
import ManageListingCard from "./ManageListingCard";
import "./ManageListings.css"
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
    <>
      <h1 className="manage-listing-title">Manage Your Listings</h1>
    <div className="manage-listing-full-page-container">
      {ownedListings.map((listing) => (
        <ManageListingCard key={listing.id} listing={listing} />
      ))}
    </div>
    
    
    
    </>
  );
};

export default ManageListingsIndex;
