import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, setItemQuantity } from "../redux/cart/cartActions";
import { useState } from "react";
import { toast } from "react-toastify";

import OnConfirm from "./OnConfirm";

function Cart() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart)[0];
  console.log(cartItem);

  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState();

  const handleQuantity = async (id, info, quantity) => {
    dispatch(setItemQuantity(id, info, quantity, cartItem._id));
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
    setOpen(!open);
  };

  return (
    <section>
      {!cartItem ? (
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
              {cartItem?.items.map((obj, index) => (
                <tr key={index}>
                  <td scope="col">
                    <img
                      src={obj?.product?.image}
                      alt={obj?.product?.title}
                      style={{ width: "70px", height: "70px" }}
                    />
                  </td>
                  <td scope="col">{obj?.product?.title}</td>
                  <td scope="col">
                    <button
                      onClick={() => handleQuantity(obj.item, -1, obj.quantity)}
                      className="btn btn-danger"
                    >
                      -
                    </button>
                    <span className="m-2">{obj?.quantity}</span>
                    <button
                      onClick={() => handleQuantity(obj.item, 1, obj.quantity)}
                      className="btn btn-primary"
                    >
                      +
                    </button>
                  </td>
                  <td scope="col">{obj?.product?.price}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(obj.item, obj.product?.title)}
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
              Total: <span id="total">{cartItem?.total}</span>
            </h3>
            <a className="btn btn-success mt-3 px-5 fw-semibold">Place Order</a>
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
