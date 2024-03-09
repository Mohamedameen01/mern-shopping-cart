import { ADD_TO_CART, GET_CART } from "./actionTypes";

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.payload;
    case ADD_TO_CART:
      return [...state, action.payload];
      
    default:
      return state;
  }
};

export default cartReducer;
