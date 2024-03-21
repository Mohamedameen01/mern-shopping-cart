import { useEffect } from "react";
import { Navbar, PlaceOrder } from "../../components";
import { useDispatch } from "react-redux";
import { getTotalCartPrice } from "../../redux/cart/cartActions";
import { getCartCount } from "../../api";

function UserOrder() {
  const dispatch = useDispatch();
  useEffect(() => {
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
