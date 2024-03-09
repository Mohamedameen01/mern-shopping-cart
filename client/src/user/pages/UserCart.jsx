import React, { useEffect } from "react";
import { Cart, Navbar } from "../../components";
import { useDispatch } from "react-redux";
import { getCartItems } from "../../redux/cart/cartActions";

function UserCart() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <Cart />
    </div>
  );
}

export default UserCart;
