import React, { useEffect } from "react";
import { Cart, Navbar } from "../../components";
import { useDispatch } from "react-redux";
import {
  getCartItems,
  getCartItemsCount,
  getTotalCartPrice,
} from "../../redux/cart/cartActions";

function UserCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsCount());
    dispatch(getCartItems());
    dispatch(getTotalCartPrice());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Cart />
    </div>
  );
}

export default UserCart;
