import {
  ADD_TO_CART,
  CART_ITEM_COUNT,
  CART_TOTAL_AMOUNT,
  GET_CART,
  ITEM_QUANTITY,
} from "./actionTypes";

const initialState = {
  count: null,
  cartItems: [],
  totalPrice:null
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {...state, cartItems: action.payload};
    case ADD_TO_CART:
      return { ...state, cartItems: action.payload };
    case ITEM_QUANTITY:
      return {...state, cartItems: action.payload};
    case CART_ITEM_COUNT:
      return {...state, count: action.payload};
    case CART_TOTAL_AMOUNT:
      return {...state, totalPrice: action.payload};
    default:
      return state;
  }
};

export default cartReducer;
