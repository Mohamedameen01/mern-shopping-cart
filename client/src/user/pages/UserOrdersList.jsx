import { useEffect } from "react";
import { Navbar, ViewOrders } from "../../components";
import { useDispatch } from "react-redux";

import { getUserOrderList } from "../../redux/order/orderActions";
import { getCartItemsCount } from "../../redux/cart/cartActions";

function UserOrdersList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItemsCount());
    dispatch(getUserOrderList());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <ViewOrders />
    </div>
  );
}

export default UserOrdersList;
