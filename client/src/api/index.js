import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// User Auth:
export const userSignup = (data) => API.post("/signup", data);
export const userSignin = (data) => API.post("/signin", data);

//Admin Auth:
export const adminSignin = (data) => API.post('/admin/signin', data);

//Admin Side:
export const getProducts = () => API.get('/admin');
export const addProductToDB = (data) => API.post('/admin/add-product', data);
export const updateProduct = (data) => API.patch('/admin/edit-product',data);
export const deleteProduct = (id) => API.delete(`/admin/delete-product?id=${id}`);
export const getAllUsers = () => API.get('/admin/all-users');