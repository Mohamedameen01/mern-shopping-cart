import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, getCartItemsCount } from "../redux/cart/cartActions";

function ViewProducts({ admin }) {
  const products = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const handleCart = async(id) => {
    await dispatch(addToCart(id));
    dispatch(getCartItemsCount());
  };

  return (
    <section className="container mt-5 d-flex flex-wrap ">
      {products.map((item) => (
        <div
          key={item?._id}
          className="card m-3 p-2"
          style={{ width: "18rem", height: "22rem" }}
        >
          <img
            style={{ width: "150px", height: "150px" }}
            src={item?.image}
            className="card-img-top mx-auto"
            alt={item?.title}
          />
          <div className="card-body p-2">
            <h5 className="card-title">{item?.title}</h5>
            <p className="card-text" style={{ maxHeight: "5rem" }}>
              {item?.description}
            </p>
            <div className="d-flex justify-content-between ">
              <p className="fw-bolder">
                <span>&#8377;</span>
                {item?.price}
              </p>
              {admin ? (
                <Link
                  to={`/admin/edit-product/${item._id}`}
                  className="text-decoration-none text-dark material-symbols-outlined"
                >
                  edit_square
                </Link>
              ) : (
                <span
                  onClick={() => handleCart(item._id)}
                  className="text-decoration-none text-dark material-symbols-outlined"
                  style={{ cursor: "pointer" }}
                >
                  shopping_cart
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ViewProducts;
