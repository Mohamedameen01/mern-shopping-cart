import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Navbar, ViewProducts } from "../../components";
import { getAllProducts } from "../../redux/admin/adminActions";
import { getCartItems } from "../../redux/cart/cartActions";

function UserHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCartItems());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <ViewProducts />
    </div>
  );
}

export default UserHome;
