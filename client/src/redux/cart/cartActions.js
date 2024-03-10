import { toast } from "react-toastify";
import * as api from "../../api/index";
import { ADD_TO_CART, GET_CART, ITEM_QUANTITY } from "./actionTypes";

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
      console.log(data);
      // await dispatch({ type: ITEM_QUANTITY, payload: data });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
