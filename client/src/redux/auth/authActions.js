import { toast } from "react-toastify";

import * as api from "../../api/index";
import { ADMIN_AUTH, USER_AUTH } from "./actionTypes";

// User Auth:
export const userSignup = (info, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userSignup(info);
    await toast.success("Registation Completed");
    await dispatch({ type: USER_AUTH, payload: data });
    navigate("/");
  } catch (error) {
    toast.error(error.message);
  }
};

export const userSignin = (info, navigate) => async (dispatch) => {
  try {
    const { data } = await api.userSignin(info);
    console.log(data);
    await toast.success("Login Successfull");
    await dispatch({ type: USER_AUTH, payload: data });
    navigate("/");
  } catch (error) {
    toast.error(error.message);
  }
};

// Admin Auth:
export const adminSignin = (info, navigate) => async (dispatch) => {
  try {
    const { data } = await api.adminSignin(info);
    await toast.success("Login Successfull.");
    await dispatch({ type: ADMIN_AUTH, payload: data });
  } catch (error) {
    toast.error(error.message);
  }
};
