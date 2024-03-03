import { toast } from "react-toastify";

import * as api from "../../api/index";
import { ADD_PRODUCT } from "./actionTypes";

export const addProductToDB = (info) => async (dispatch) => {
  try {
    const { data } = api.addProductToDB(info);
  } catch (error) {
    toast.error(error.message);
  }
};
