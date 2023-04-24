import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { refreshUser } from "../../../store/session";
import { deleteListingThunk } from "../../../store/listing";

function DeleteListingModal({ listing }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteListing = async (e) => {
    e.preventDefault();
    await dispatch(deleteListingThunk(listing.id));
    dispatch(refreshUser(sessionUser.id));
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
