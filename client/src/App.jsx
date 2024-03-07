import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Signin, Signup } from "./components/AuthForms";
import { UserLayout, Auth, UserHome } from "./user";
import { AdminLayout, AdminAuth, AdminHome, AllProducts } from "./admin";
import { AddProduct, EditProduct } from "./components";
import AllOrders from "./admin/pages/AllOrders";
import AllUsers from "./admin/pages/AllUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* This route for user */}
        <Route element={<UserLayout />}>
          <Route element={<Auth />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route index element={<UserHome />} />
        </Route>

        {/* This Route for admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/signin" element={<AdminAuth />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route
            path="/admin/edit-product/:productId"
            element={<EditProduct />}
          />
          <Route path="/admin/all-products" element={<AllProducts />} />
          <Route path="/admin/all-orders" element={<AllOrders />} />
          <Route path="/admin/all-users" element={<AllUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
