import React from "react";

function OnConfirm({ title, onClose, onSuccess }) {
  return (
    <div className="d-grid gap-3 bg-light px-3 pt-3 border border-secondary rounded shadow z-3">
      <h6>{`Are you sure want to delete ${title} product?`}</h6>
      <div className="d-flex justify-content-end gap-3">
        <p onClick={onClose} className="btn btn-primary">
          Cancel
        </p>
        <p onClick={onSuccess} className="btn btn-danger">
          Delete
        </p>
      </div>
    </div>
  );
}

export default OnConfirm;
