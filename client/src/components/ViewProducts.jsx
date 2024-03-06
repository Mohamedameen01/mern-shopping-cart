import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ViewProducts() {
  const products = useSelector((state) => state.admin);

  const handleDelete = (id, title) => {
    console.log(id);
  };

  return (
    <div>
      <section>
        <div className="container mb-5">
          <div className="d-flex justify-content-end m-4">
            <a href="/admin/add-product" className="btn btn-success">
              Add Product
            </a>
          </div>
          <div className="table-responsive border border-dark p-3">
            <table
              className="table table-striped mt-5 align-middle"
              style={{ width: "100%" }}
              id="myTable"
            >
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Title</th>
                  <th scope="col">Category</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th>Image</th>
                  <th scope="col">Option</th>
                  <th scope="col">Option</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>
                      <img
                        src={item.image}
                        alt="title"
                        style={{ width: "50", height: "50px" }}
                      />
                    </td>
                    <td>
                      <Link
                        className="btn btn-primary m-2 text-white text-decoration-none"
                        to={`/admin/edit-product/${item._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <a
                        onClick={handleDelete(item._id, item.title)}
                        className="btn btn-danger"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ViewProducts;
