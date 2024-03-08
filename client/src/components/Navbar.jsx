import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ADMIN_LOGOUT, USER_LOGOUT } from "../redux/auth/actionTypes";

function Navbar({ admin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [info, setInfo] = useState();

  useEffect(() => {
    if (admin) {
      const admin = JSON.parse(localStorage.getItem("ADMIN_LOCAL"));
      setInfo(admin?.data);
    } else {
      const user = JSON.parse(localStorage.getItem("USER_LOCAL"));
      setInfo(user?.data);
    }
  }, []);

  const handleLogout = () => {
    if (admin) {
      dispatch({ type: ADMIN_LOGOUT });
      navigate("/admin/signin");
    } else {
      dispatch({ type: USER_LOGOUT });
      navigate("/signin");
    }
  };

  return (
    <div>
      <header>
        <div className="container mt-2">
          <div className=" d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href={admin ? '/admin' : '/'} className="navbar-brand fs-5 fw-bold">
              Shopping Cart
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto ms-4 mb-2 justify-content-center mb-md-0">
              <li>
                <a href={admin ? '/admin/all-products' : ''} className="nav-link px-2 link-secondary">
                  {admin ? "All Products" : "Products"}
                </a>
              </li>
              <li>
                <a
                  href={admin ? '/admin/all-users' : '/cart'}
                  className="nav-link px-2 link-body-emphasis position:relative me-3"
                >
                  {admin ? "All Users" : "Cart"}
                  {!admin && (
                    <span
                      className="position-absolute rounded-circle  badge bg-success"
                      id="cart-counts"
                    >
                      0
                    </span>
                  )}
                </a>
              </li>

              <li>
                <a
                  href={admin ? '/admin/all-orders' : ''}
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
                {info?.name ? info?.name : "Account"}
              </button>
              <ul className="dropdown-menu bg-dark ">
                {info?.name ? (
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
                      href={admin ? "admin/signin" : '/signin'}
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
