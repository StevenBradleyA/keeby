import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllListingsThunk } from "../../../store/listing";
import ManageListingCard from "./ManageListingCard";
import "./ManageListings.css";
const ManageListingsIndex = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getAllListingsThunk());
  }, [dispatch]);

  const allListings = useSelector((state) => Object.values(state.listings));
  const ownedListings = allListings.filter(
    (e) => e.owner_id === sessionUser.id
  );

  useEffect(() => {
    const phrases = [
      "Please Stand By",
      "analyzing group buys",
      "bad financial decisions acquired",
      "jk",
      "Manage Your Listings",
    ];
    const delay = [0, 2000, 4000, 6000, 8000];

    phrases.forEach((phrase, i) =>
      setTimeout(() => {
        setText(phrase);
      }, delay[i])
    );
  }, []);

  return (
    <>
      <h1 className="manage-listing-title">{text}</h1>
      <div className="manage-listing-full-page-container">
        {ownedListings.map((listing) => (
          <ManageListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </>
  );
};

export default ManageListingsIndex;
