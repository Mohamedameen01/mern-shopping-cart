import { toast } from "react-toastify";

import * as api from "../../api/index";
import {
  ADD_PRODUCT,
  ALL_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "./actionTypes";

export const getAllProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: ALL_PRODUCT, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};

export const addProductToDB = (info) => async (dispatch) => {
  try {
    const { data } = await api.addProductToDB(info);
    await dispatch({ type: ADD_PRODUCT, payload: data });
    toast.success("Product Added Successfully.");
  } catch (error) {
    toast.error(error.message);
  }
};

export const updateProductData = (info, navigate) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(info);
    await dispatch({ type: UPDATE_PRODUCT, payload: data });
    navigate("/admin");
    toast.success("Updated Successfully.");
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteSelectedProduct = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteProduct(id);
    await dispatch({ type: DELETE_PRODUCT, payload: data._id });
    toast.warning("Deleted Successfully ");
  } catch (error) {
    toast.error(error.message);
  }
};
