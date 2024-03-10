import { useDispatch, useSelector } from "react-redux";
import { setItemQuantity } from "../redux/cart/cartActions";

function Cart() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart)[0];
  
  const handleQuantity = async (id,info, quantity) => {
    dispatch(setItemQuantity( id,info, quantity,cartItem._id));
  };

  return (
    <section>
      <div className="container">
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
                    onClick={() => handleQuantity(obj.item,-1, obj.quantity)}
                    className="btn btn-danger"
                  >
                    -
                  </button>
                  <span className="m-2">{obj?.quantity}</span>
                  <button
                    onClick={() => handleQuantity(obj.item,1, obj.quantity)}
                    className="btn btn-primary"
                  >
                    +
                  </button>
                </td>
                <td scope="col">{obj?.product?.price}</td>
                <td>
                  <button className="btn btn-danger">Remove</button>
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
    </section>
  );
}

export default Cart;
