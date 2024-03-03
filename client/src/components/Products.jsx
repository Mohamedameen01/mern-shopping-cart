import React from "react";

function Products({ admin }) {
  return (
    <div>
      <section>
        <div className="container">
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
                <tr>
                  <td>0</td>
                  <td>title</td>
                  <td>category</td>
                  <td>description</td>
                  <td>price</td>
                  <td>
                    <img
                      src=""
                      alt="title"
                      style={{ width: "50", height: "50px" }}
                    />
                  </td>
                  <td>
                    <a href="" className="btn btn-primary m-2">
                      Edit
                    </a>
                  </td>
                  <td>
                    <a href="" className="btn btn-danger">
                      Delete
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;
