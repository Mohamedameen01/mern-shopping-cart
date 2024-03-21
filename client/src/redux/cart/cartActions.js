import { toast } from "react-toastify";
import * as api from "../../api/index";
import {
  ADD_TO_CART,
  CART_ITEM_COUNT,
  CART_TOTAL_AMOUNT,
  GET_CART,
  ITEM_QUANTITY,
  REMOVE_CART_ITEM,
} from "./actionTypes";

export const addToCart = (id) => async (dispatch) => {
  try {
    const { data } = await api.addCart(id);

    await dispatch({ type: ADD_TO_CART, payload: data });
    toast.success("Product Added to Cart");
  } catch (error) {
    toast.error(error.message);
  }
};

export const getCartItems = () => async (dispatch) => {
  try {
    const { data } = await api.getCart();
    dispatch({ type: GET_CART, payload: data });
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const setItemQuantity =
  (id, info, quantity, cartId) => async (dispatch) => {
    try {
      const { data } = await api.setQuantity({
        id,
        info,
        quantity,
        cartId,
      });

      await dispatch({ type: ITEM_QUANTITY, payload: data });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

export const removeCartItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.removeCart(id);
    await dispatch({ type: REMOVE_CART_ITEM, payload: data });
    toast.warning("Product Removed From Cart.");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};

export const getCartItemsCount = () => async (dispatch) => {
  try {
    const { data } = await api.getCartCount();
    dispatch({ type: CART_ITEM_COUNT, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};

export const getTotalCartPrice = () => async (dispatch) => {
  try {
    const { data } = await api.getCartPrice();
    dispatch({ type: CART_TOTAL_AMOUNT, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};

export const setPlaceOrder = (info) => async (dispatch) => {
  try {
    const { data } = await api.placeOrdering(info);
    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    toast.error(error.message);
  }
};
