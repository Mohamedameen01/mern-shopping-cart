import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Navbar, ViewProducts } from "../../components";
import { getAllProducts } from "../../redux/admin/adminActions";

function UserHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  });
  return (
    <div>
      <Navbar />
      <ViewProducts />
    </div>
  );
}

export default UserHome;
