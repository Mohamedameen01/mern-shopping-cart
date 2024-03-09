import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import adminReducer from './admin/adminReducer';
import cartReducer from './cart/cartReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    cart: cartReducer
})

export default rootReducer;