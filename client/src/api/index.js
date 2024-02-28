import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// User Auth:
export const userSignup = (data) => API.post("/signup", data);
export const userSignin = (data) => API.post("/signin", data);

//Admin Auth:
export const adminSignin = (data) => API.post('/admin/signin', data);
