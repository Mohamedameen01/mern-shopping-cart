import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import adminReducer from './admin/adminReducer';
import cartReducer from './cart/cartReducer';
import orderReducer from './order/orderReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    cart: cartReducer,
    orders: orderReducer
})

export default rootReducer;