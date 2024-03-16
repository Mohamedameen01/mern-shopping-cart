import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  getTotalCartPrice,
  removeCartItem,
  setItemQuantity,
} from "../redux/cart/cartActions";
import { useState } from "react";
import { toast } from "react-toastify";

import OnConfirm from "./OnConfirm";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.totalPrice);

  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState();

  const handleQuantity = async (id, info, quantity) => {
    await dispatch(setItemQuantity(id, info, quantity, carts._id));
    if (carts.products?.length !== 0 ) {
      await dispatch(getCartItems());
      dispatch(getTotalCartPrice());
    }
  };

  const handleRemove = (id, title) => {
    setOpen(!open);
    setDeleteData({ id, title });
  };

  const handleCancel = () => {
    toast.info("Delete Action Canceled");
    setOpen(!open);
  };

  const handleSuccess = async () => {
    await dispatch(removeCartItem(deleteData.id));
    if (carts.products?.length !== 0 ) {
      dispatch(getTotalCartPrice());
    }
    setOpen(!open);
  };

  return (
    <section>
      {carts.products?.length == 0 ? (
        <div className="container w-75 mt-5 p-2 border border-primary-subtle rounded shadow-lg bg-dark text-white">
          <p className="my-auto p-2">
            Looks like your cart is empty. Add some items to get started!
          </p>
        </div>
      ) : (
        <div
          className={open ? "container opacity-25" : "container opacity-100"}
        >
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Title</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>

            <tbody>
              {carts?.products?.map((obj, index) => (
                <tr key={index}>
                  <td scope="col">
                    <img
                      src={obj?.item?.image}
                      alt={obj?.item?.title}
                      style={{ width: "70px", height: "70px" }}
                    />
                  </td>
                  <td scope="col">{obj?.item?.title}</td>
                  <td scope="col">
                    <button
                      onClick={() => handleQuantity(obj._id, -1, obj.quantity)}
                      className="btn btn-danger"
                    >
                      -
                    </button>
                    <span className="m-2">{obj?.quantity}</span>
                    <button
                      onClick={() => handleQuantity(obj._id, 1, obj.quantity)}
                      className="btn btn-primary"
                    >
                      +
                    </button>
                  </td>
                  <td scope="col">{obj?.item?.price}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(obj._id, obj.item?.title)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex flex-column align-items-center align-items-md-end">
            <h3 className="fw-medium">
              Total: <span id="total">{cartTotal}</span>
            </h3>
            <Link to={`/place-order/${carts?._id}`}  className="btn btn-success mt-3 px-5 fw-semibold">Place Order</Link>
            <h3 className="hidden"></h3>
          </div>
        </div>
      )}
      {open && (
        <div className="position-absolute top-50 start-50">
          <OnConfirm
            title={deleteData?.title}
            onClose={handleCancel}
            onSuccess={handleSuccess}
          />
        </div>
      )}
    </section>
  );
}

export default Cart;
