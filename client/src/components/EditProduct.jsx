import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updateProductData } from "../redux/admin/adminActions";

function EditProduct() {
  const products = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const inputFocus = useRef();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [prodData, setProdData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });
  const [img, setImg] = useState();

  const filterProducts = async () => {
    const filteredProduct = await products.filter(
      (product) => product._id === productId
    );
    setProdData(filteredProduct[0]);
  };

  const handleImageUpload = (e) => {
    const imgFile = e.target.value;
    setImg(imgFile);

    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setProdData({ ...prodData, image: fileReader.result });
      };
    }
  };

  useEffect(() => {
    filterProducts();
    inputFocus.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductData(prodData, navigate));
  };

  return (
    <div>
      <section>
        <div className="container mt-5 ">
          <h2 className="text-center">Edit Product</h2>
          <form onSubmit={handleSubmit} noValidate className="w-50 mx-auto">
            <div className="form-group m-3">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={prodData?.title}
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
                value={prodData?.description}
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
                value={prodData?.category}
                onChange={(e) =>
                  setProdData({ ...prodData, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group m-3">
              <label>Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={prodData?.price}
                onChange={(e) =>
                  setProdData({ ...prodData, [e.target.name]: e.target.value })
                }
                min="0"
                required
              />
            </div>

            <div className="form-group m-3">
              <input
                type="file"
                name="image"
                value={img}
                onChange={handleImageUpload}
                required
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

export default EditProduct;
