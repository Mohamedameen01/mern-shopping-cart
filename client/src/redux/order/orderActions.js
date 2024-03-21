import { toast } from "react-toastify";
import { getOrderList } from "../../api";
import { GET_ORDERS } from "./actionTypes";

export const getUserOrderList = () => async (dispatch) => {
  try {
    const { data } = await getOrderList();
    dispatch({ type: GET_ORDERS, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};
