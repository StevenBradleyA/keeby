import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { deleteUserThunk, logout } from "../../store/session";

function DeleteUserModal({ sessionUser }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    await dispatch(deleteUserThunk(sessionUser.id));
    closeModal();
    dispatch(logout());
    history.push(``);
  };

  const handleKeepUser = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="modal-container-template">
      <div className="modal-sub-container-template">
      <div className="modal-template-title">Engage deletion sequence?</div>
      <div className="modal-template-sub-title">Are you sure you want to delete your account? </div>
      <div className="modal-template-warning">
          [ can't delete demo user] 
        </div>
      <div className="modal-template-button-container">

      {sessionUser && sessionUser.id === 1 && (
        <div
        className="modal-template-yes"
        onClick={handleKeepUser}
        >{`[ Yes ]`}</div>
        )}
      {sessionUser && sessionUser.id !== 1 && (
        <div
        className="modal-template-yes"
        onClick={handleDeleteUser}
        >{`[ Yes ]`}</div>
        )}

      <div className="modal-template-no" onClick={handleKeepUser}>{`[ No ]`}</div>
        </div>
    </div>
    </div>
  );
}

export default DeleteUserModal;
