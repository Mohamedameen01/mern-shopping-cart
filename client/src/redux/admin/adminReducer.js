import {
  ADD_PRODUCT,
  ALL_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from "./actionTypes";

const adminReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_PRODUCT:
      return action.payload;
    case ADD_PRODUCT:
      return [...state, action.payload];
    case UPDATE_PRODUCT:
      return [...state, action.payload];
    case DELETE_PRODUCT:
      return state.filter((product) => product._id !== action.payload);
    default:
      return state;
  }
};

export default adminReducer;
