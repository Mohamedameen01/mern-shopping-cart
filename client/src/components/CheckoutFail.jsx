import React from "react";
import { Link } from "react-router-dom";

function CheckoutFail() {
  return (
    <div className="my-3 mx-3">
      <Link to="/" className="text-decoration-none text-black fs-3 fw-bold">
        Shopping Cart
      </Link>
      <div className="mt-4 p-3 bg-light d-grid justify-content-center">
        <div className="mx-auto">
          <img
            width={80}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM-mbja9svAZdPXDBdsLlnB9oazSFWTvJEuQ&usqp=CAU"
          />
        </div>
        <h2 className="text-center">Payment Failed!</h2>
        <p className="text-center">
          There was an error that occurred during the transaction.
        </p>
        <h4 className="text-center">Please try again!</h4>
      </div>
    </div>
  );
}

export default CheckoutFail;
