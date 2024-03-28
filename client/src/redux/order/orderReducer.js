import { GET_ALL_ORDERS, GET_USER_ORDERS, SELECTED_ORDER } from "./actionTypes";

const initialState = {
  allOrders: [],
  userOrders: [],
  oneOrder: []
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_ORDERS:
      return {...state,userOrders:action.payload};
    case GET_ALL_ORDERS:
      return {...state,allOrders:action.payload};
    case SELECTED_ORDER:
      return {...state, oneOrder: action.payload};
    default:
      return state;
  }
};

export default orderReducer;
