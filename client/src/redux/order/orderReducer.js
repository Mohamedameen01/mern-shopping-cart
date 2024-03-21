import { GET_ORDERS } from "./actionTypes";

const orderReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload;
    default:
      return [];
  }
};

export default orderReducer;
