import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Navbar, SelectedOrder } from "../../components";
import { getCartItemsCount } from "../../redux/cart/cartActions";

function UserSelectedOrder() {
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(getCartItemsCount());  
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <SelectedOrder />
    </div>
  );
}

export default UserSelectedOrder;
