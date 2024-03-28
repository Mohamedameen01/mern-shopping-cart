import { toast } from "react-toastify";
import * as api from "../../api";
import { GET_ALL_ORDERS, GET_USER_ORDERS } from "./actionTypes";

export const getUserOrderList = () => async (dispatch) => {
  try {
    const { data } = await api.getOrderList();
    dispatch({ type: GET_USER_ORDERS, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};
export const getAllOrderList = () => async (dispatch) => {
  try {
    const { data } = await api.getEveryOrderList();
    dispatch({ type: GET_ALL_ORDERS, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};


