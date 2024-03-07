import { useEffect } from "react";
import { Navbar, ProductsLists } from "../../components";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../redux/admin/adminActions";

function AdminHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div>
      <Navbar admin={true} />
      <ProductsLists />
    </div>
  );
}

export default AdminHome;
