import React, { useEffect } from "react";
import { Navbar, ViewProducts } from "../../components";
import { getAllProducts } from "../../redux/admin/adminActions";
import { useDispatch } from "react-redux";

function AllProducts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  });
  return (
    <div>
      <Navbar admin={true} />
      <ViewProducts />
    </div>
  );
}

export default AllProducts;
