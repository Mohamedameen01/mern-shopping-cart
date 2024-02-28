import { ADMIN_AUTH, ADMIN_LOGOUT, USER_AUTH, USER_LOGOUT } from "./actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case USER_AUTH:
      localStorage.setItem(
        'USER_LOCAL',
        JSON.stringify({ ...action?.payload })
      );
      return { ...state, authData: action?.payload };
    case USER_LOGOUT:
      localStorage.removeItem('USER_LOCAL');
      return { ...state, authData: null };
    case ADMIN_AUTH:
      localStorage.setItem('ADMIN_LOCAL', JSON.stringify({...action?.payload}));
      return {...state, authData: action?.payload};
    case ADMIN_LOGOUT:
      localStorage.removeItem('ADMIN_LOCAL');
      return {...state, authData:null};
    default:
      return state;
  }
};

export default authReducer;
