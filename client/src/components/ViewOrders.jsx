import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SELECTED_ORDER } from "../redux/order/actionTypes";
import { useNavigate } from "react-router-dom";

function ViewOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userOrders } = useSelector((state) => state.orders);

  const handleViewOrder = async (products) => {
    dispatch({ type: SELECTED_ORDER, payload: products });
    navigate("/view-order");
  };

  return (
    <section>
      {userOrders.length !== 0 ? (
        <div className="container mt-5">
          <div
            className="border mx-auto"
            style={{
              minHeight: "50%",
              maxHeight: "fitContent",
              minWidth: "50%",
              maxWidth: "fit-content",
            }}
          >
            <div className="m-3 table-responsive">
              <table className="table align-middle table-hover">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Order Id</th>
                    <th scope="col">Address</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{new Date(order.date).toLocaleString()}</td>
                      <td>{order._id}</td>
                      <td className="col">
                        {order.deliveryDetails?.address},
                        {order.deliveryDetails?.pincode},
                        {order.deliveryDetails?.mobile}
                      </td>
                      <td>{order.total}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.status}</td>
                      <td>
                        <p
                          onClick={() => handleViewOrder(order.products)}
                          className="btn btn-primary"
                        >
                          View Product
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="container w-75 mt-5 p-2 border border-primary-subtle rounded shadow-lg bg-dark text-white">
          <h3>No Orders Placed Yet</h3>
          <p className="my-auto p-2">
            It looks like you haven't placed any orders yet. Don't worry,
            there's still plenty to explore! Take your time to browse our
            collection and find something that catches your eye.Happy shopping!
          </p>
        </div>
      )}
    </section>
  );
}

export default ViewOrders;
