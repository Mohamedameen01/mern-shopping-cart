import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <div className="my-3 mx-3">
      <Link to="/" className="text-decoration-none text-black fs-3 fw-bold">
        Shopping Cart
      </Link>
      <div className="mt-4 p-3 bg-light d-grid justify-content-center">
        <div className="mx-auto">
          <img
            width={80}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVJIWfTSaReBYY35FSUsWPqG_vzjLePJnWGA&usqp=CAU"
          />
        </div>
        <h2 className="text-center">Payment Done!</h2>
        <p className="text-center">
          Thank you for completing your secure online payment
        </p>
        <h4 className="text-center">Have a great day!</h4>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
