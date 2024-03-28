import React, { useEffect } from "react";
import { AdminViewOrders, Navbar} from "../../components";

import { useDispatch } from "react-redux";
import { getAllOrderList } from "../../redux/order/orderActions";

function AllOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrderList());
  }, [dispatch]);

  return (
    <div>
      <Navbar admin={true} />
      <AdminViewOrders />
    </div>
  );
}

export default AllOrders;
