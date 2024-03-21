import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { ADMIN_LOGOUT, USER_LOGOUT } from "../redux/auth/actionTypes";
// import { getCartItemsCount } from "../redux/cart/cartActions";

function Navbar({ admin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItem = useSelector((state) => state.cart);

  const [info, setInfo] = useState({
    user: JSON.parse(localStorage.getItem("USER_LOCAL")),
    owner: JSON.parse(localStorage.getItem("ADMIN_LOCAL")),
  });

  const handleLogout = async () => {
    if (admin) {
      await dispatch({ type: ADMIN_LOGOUT });
      navigate("/admin/signin");
    } else {
      await dispatch({ type: USER_LOGOUT });
      navigate("/signin");
    }
  };

  useEffect(() => {
    const { user, owner } = info;

    if (admin) {
      const adminToken = owner?.token;

      if (adminToken) {
        const adminDecoded = jwtDecode(adminToken);

        if (adminDecoded.exp * 1000 < new Date().getTime()) {
          handleLogout();
        }
      }
      setInfo({
        user: JSON.parse(localStorage.getItem("USER_LOCAL")),
        admin: JSON.parse(localStorage.getItem("ADMIN_LOCAL")),
      });
    } else {
      const userToken = user?.token;

      if (userToken) {
        const userDecoded = jwtDecode(userToken);
        if (userDecoded.exp * 1000 < new Date().getTime()) {
          handleLogout();
        }
      }
      setInfo({
        user: JSON.parse(localStorage.getItem("USER_LOCAL")),
        admin: JSON.parse(localStorage.getItem("ADMIN_LOCAL")),
      });
    }
  }, [location]);

  return (
    <div>
      <header>
        <div className="container mt-2">
          <div className=" d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a
              href={admin ? "/admin" : "/"}
              className="navbar-brand fs-5 fw-bold"
            >
              Shopping Cart
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto ms-4 mb-2 justify-content-center mb-md-0">
              <li>
                <a
                  href={admin ? "/admin/all-products" : ""}
                  className="nav-link px-2 link-secondary"
                >
                  {admin ? "All Products" : "Products"}
                </a>
              </li>
              <li>
                <a
                  href={admin ? "/admin/all-users" : "/cart"}
                  className="nav-link px-2 link-body-emphasis position:relative me-3"
                >
                  {admin ? "All Users" : "Cart"}
                  {!admin && (
                    <span
                      className="position-absolute rounded-circle  badge bg-success"
                      id="cart-counts"
                    >
                      {cartItem?.count || 0}
                    </span>
                  )}
                </a>
              </li>

              <li>
                <a
                  href={admin ? "/admin/all-orders" : "/orders"}
                  className="nav-link px-2 link-body-emphasis"
                >
                  {admin ? "All Orders" : "Orders"}
                </a>
              </li>
            </ul>

            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {admin
                  ? info.admin
                    ? info.admin.data?.name
                    : "Account"
                  : info.user
                  ? info.user.data?.name
                  : "Account"}
              </button>
              <ul className="dropdown-menu bg-dark ">
                {info?.user?.data?.name || admin?.data?.name ? (
                  <li>
                    <a
                      className="dropdown-item text-light fs-6 fw-medium bg-dark"
                      style={{ cursor: "pointer" }}
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                ) : (
                  <li>
                    <a
                      className="dropdown-item text-light fs-6 fw-medium bg-dark"
                      href={admin ? "admin/signin" : "/signin"}
                    >
                      Login
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
