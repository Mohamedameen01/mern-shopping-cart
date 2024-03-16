import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPlaceOrder } from "../redux/cart/cartActions";

function PlaceOrder() {
  const dispatch = useDispatch();
  const { cartId } = useParams();
  const total = useSelector((state) => state.cart.totalPrice);
  const [orderInfo, setOrderInfo] = useState({
    cartId,
    address: "",
    pincode: "",
    mobile: "",
    paymentMethod: "",
    total,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(setPlaceOrder(orderInfo));
    setOrderInfo({
      address: "",
      pincode: "",
      mobile: "",
      paymentMethod: "",
    });
  };

  return (
    <section className="container">
      <form onSubmit={handleSubmit} autoComplete="off" autoCorrect="off">
        <div className="row mt-5">
          <h1 className="text-center text-md-start">Enter Delivery Details</h1>
          <div className="col-md-6 ">
            <div className="form-group my-3">
              <label className="mb-2">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                id="exampleInputAddress"
                placeholder="Enter your address"
                onChange={(e) =>
                  setOrderInfo({
                    ...orderInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                value={orderInfo?.address}
                required
              />
            </div>
            <div className="form-group my-3">
              <label className="mb-2">Pin Code</label>
              <input
                type="number"
                className="form-control"
                name="pincode"
                id="exampleInputPincode"
                placeholder="Pincode"
                onChange={(e) =>
                  setOrderInfo({
                    ...orderInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                value={orderInfo?.pincode}
                required
              />
            </div>
            <div className="form-group my-3">
              <label className="mb-2">Mobile No</label>
              <input
                type="number"
                className="form-control"
                name="mobile"
                id="exampleInputMobileNo"
                placeholder="Mobile No"
                onChange={(e) =>
                  setOrderInfo({
                    ...orderInfo,
                    [e.target.name]: e.target.value,
                  })
                }
                value={orderInfo?.mobile}
                required
              />
            </div>
          </div>
          <div className="col-md-6 ">
            <div
              className="border border-primary mx-auto my-4"
              style={{ height: "280px", width: "400px" }}
            >
              <div className="m-4">
                <h4 className="fw-normal">Total Amount : Rs.{total}</h4>
                <hr />
                <fieldset className="mt-4">
                  <legend>Payment Method</legend>
                  <label className="d-block">
                    <input
                      type="radio"
                      name="payment-method"
                      id="codPay"
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: e.target.value,
                        })
                      }
                      value="COD"
                      checked={orderInfo.paymentMethod === "COD"}
                    />
                    COD
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      id="codPay"
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: e.target.value,
                        })
                      }
                      value="Online-Payment"
                    />
                    Online Payment
                  </label>
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-primary float-end mt-4"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default PlaceOrder;
