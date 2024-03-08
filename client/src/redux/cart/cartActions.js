import { toast } from "react-toastify";
import * as api from "../../api/index";

export const addToCart = (id) => async (dispatch) => {
  try {
    const { data } = await api.addCart(id);
    console.log(data);
  } catch (error) {
    toast.error(error.message);
  }
};
