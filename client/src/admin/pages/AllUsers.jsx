import React, { useEffect } from "react";
import { Navbar, ViewUsers } from "../../components";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/admin/adminActions";

function AllUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  });
  return (
    <div>
      <Navbar admin={true} />
      <ViewUsers />
    </div>
  );
}

export default AllUsers;
