import { ADD_PRODUCT, ALL_PRODUCT, UPDATE_PRODUCT } from "./actionTypes";

const adminReducer = (state = [], action) => {
  switch (action.type) {
    case ALL_PRODUCT:
      return action.payload;
    case ADD_PRODUCT:
      return [...state, action.payload];
    case UPDATE_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default adminReducer;
