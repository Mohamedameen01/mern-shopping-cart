import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Signin,Signup } from "./components/AuthForms";
import { UserLayout,Auth, UserHome } from "./user";
import { AdminLayout,AdminAuth, AdminHome } from "./admin";
import { AddProduct } from "./components";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
