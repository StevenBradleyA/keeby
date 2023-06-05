import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteListingThunk } from "../../../store/listing";
import "./DeleteListing.css";

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
    <div className="modal-container-template-delete">
      <div className="modal-sub-container-template-delete">
        <div className="modal-template-title">Engage deletion sequence?</div>
        <div className="modal-template-sub-title">
          Are you sure you want to delete this listing?
        </div>

        <div className="modal-template-button-container">
          <div className="modal-template-yes" onClick={handleDeleteListing}>
            {`[ Yes ]`}
          </div>

          <div className="modal-template-no" onClick={handleKeepListing}>
            {`[ No ]`}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteListingModal;
