import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteListingThunk } from "../../../store/listing";

function DeleteListingModal({ listing }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteListing = async (e) => {
    e.preventDefault();
    await dispatch(deleteListingThunk(listing.id));
    closeModal();
    history.push(`/listings/manage`);
  };

  const handleKeepListing = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div>
      <h1 className="title-text">Confirm Delete 😟</h1>
      <h3 className="title-text">
        Are you sure you want to delete this listing?{" "}
      </h3>
      <button
        // className="yes-delete-yeet"
        onClick={handleDeleteListing}
      >{`Yes 👌`}</button>

      <button
        // className="no-delete"
        onClick={handleKeepListing}
      >{`No ❌`}</button>
    </div>
  );
}

export default DeleteListingModal;
