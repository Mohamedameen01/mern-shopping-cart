import { useEffect, useRef, useState } from "react";
import Filebase64 from "react-file-base64";

import { useDispatch } from "react-redux";
import { addProductToDB } from "../redux/admin/adminActions";

function AddProduct() {
  const dispatch = useDispatch();
  const [prodData, setProdData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const inputFocus = useRef();

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addProductToDB(prodData));
    setProdData({
      title: "",
      description: "",
      category: "",
      price: "",
      image: "",
    });
  };

  return (
    <div>
      <section>
        <div className="container mt-5 ">
          <h2 className="text-center">Add Product</h2>
          <form onSubmit={handleSubmit} noValidate className="w-50 mx-auto">
            <div className="form-group m-3">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={prodData.title}
                ref={inputFocus}
                onChange={(e) =>
                  setProdData({ ...prodData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group m-3">
              <label>Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                maxLength="100"
                name="description"
                value={prodData.description}
                onChange={(e) =>
                  setProdData({ ...prodData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group m-3">
              <label>Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={prodData.category}
                onChange={(e) =>
                  setProdData({ ...prodData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group m-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={prodData.price}
                onChange={(e) =>
                  setProdData({ ...prodData, [e.target.name]: e.target.value })
                }
                min="0"
                required
              />
            </div>

            <div className="form-group m-3">
              <Filebase64
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setProdData({ ...prodData, image: base64 })
                }
              />
            </div>

            <button type="submit" className="btn btn-primary m-3">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default AddProduct;
