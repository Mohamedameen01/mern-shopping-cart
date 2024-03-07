import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewProducts() {
  const products = useSelector((state) => state.admin);
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
            <div className="d-flex justify-content-between align-items-end">
              <p className="fw-bolder ">
                <span>&#8377;</span>
                {item?.price}
              </p>
              <Link
                to={`/admin/edit-product/${item._id}`}
                className="text-decoration-none text-dark material-symbols-outlined"
              >
                edit_square
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default ViewProducts;
