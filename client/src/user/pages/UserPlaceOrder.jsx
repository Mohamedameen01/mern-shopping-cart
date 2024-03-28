import { useEffect } from "react";
import { Navbar, PlaceOrder } from "../../components";
import { useDispatch } from "react-redux";
import {
  getCartItemsCount,
  getTotalCartPrice,
} from "../../redux/cart/cartActions";
import { getCartCount } from "../../api";

function UserOrder() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsCount());
    dispatch(getTotalCartPrice());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <PlaceOrder />
    </div>
  );
}

export default UserOrder;
