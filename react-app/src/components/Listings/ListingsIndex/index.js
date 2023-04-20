import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingsThunk } from "../../../store/listing";
import ListingCard from "./ListingCard";
import "./ListingIndex.css"

const ListingsIndex = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllListingsThunk());
  }, [dispatch]);

  const allListings = useSelector((state) => Object.values(state.listings));

  // console.log("hello", allListings);

  return (
    <div className="listing-index-container">
      {allListings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

export default ListingsIndex;
