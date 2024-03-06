import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import adminReducer from './admin/adminReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer
})

export default rootReducer;