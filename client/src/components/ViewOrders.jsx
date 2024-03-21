import React from "react";
import { useSelector } from "react-redux";

function ViewOrders() {
  const orderList = useSelector((state) => state.orders);
  console.log(orderList);
  return (
    <section>
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
                {orderList.map((order) => (
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
                      <a href="" className="btn btn-primary">
                        View Product
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ViewOrders;
