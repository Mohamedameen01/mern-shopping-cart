import { useSelector } from "react-redux";

function SelectedOrder() {
  const { oneOrder } = useSelector((state) => state.orders);

  return (
    <section className="container mt-5 d-flex flex-wrap ">
      {oneOrder.map((item) => (
        <div
          className="card m-3 p-2"
          style={{ width: "18rem", height: "22rem" }}
        >
          <img
            style={{ width: "100px", height: "120px" }}
            src={item.image}
            className="card-img-top mx-auto"
            alt={item.title}
          />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <p className="fw-bolder ">
              <span>&#8377;</span>
              {item.price}{" "}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default SelectedOrder;
