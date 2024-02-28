import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "./user/UserLayout";
import AdminLayout from "./admin/AdminLayout";
import Auth from "./user/pages/Auth";
import Signin from "./components/AuthForms/Signin";
import Signup from "./components/AuthForms/Signup";
import Home from "./user/pages/Home";
import AdminAuth from "./admin/pages/AdminAuth";

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
          <Route index element={<Home />} />
        </Route>

        {/* This Route for admin */}
        <Route element={<AdminLayout />}>
            <Route path="/admin/signin" element={<AdminAuth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
