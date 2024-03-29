import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Signin, Signup } from "./components/AuthForms";
import {
  UserLayout,
  Auth,
  UserHome,
  UserCart,
  UserPlaceOrder,
  UserOrdersList,
  UserSelectedOrder,
} from "./user";
import {
  AdminLayout,
  AdminAuth,
  AdminHome,
  AllProducts,
  AllUsers,
  AllOrders,
  AdminSelectedOrder,
} from "./admin";
import {
  AddProduct,
  CheckoutFail,
  CheckoutSuccess,
  EditProduct,
} from "./components";

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
          <Route path="/cart" element={<UserCart />} />
          <Route path="/orders" element={<UserOrdersList />} />
          <Route path="/place-order/:cartId" element={<UserPlaceOrder />} />
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/checkout-failure" element={<CheckoutFail />} />
          <Route
            path="/view-order"
            element={<UserSelectedOrder />}
          />
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
          <Route path="/admin/view-order" element={<AdminSelectedOrder />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
