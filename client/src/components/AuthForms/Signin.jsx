import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userSignin, adminSignin } from "../../redux/auth/authActions";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus("email");
  }, [setFocus]);

  const onSubmit = (data) => {
    if (location.pathname === "/admin/signin") {
      dispatch(adminSignin(data, navigate));
    } else {
      dispatch(userSignin(data, navigate));
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-outline mb-4">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid email address"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <small>{errors?.email?.message}</small>}
                </div>

                <div className="form-outline mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 4,
                        message: "Must be more than 4 characters.",
                      },
                      maxLength: {
                        value: 10,
                        message: "Must be less than 10 characters.",
                      },
                    })}
                  />
                  {errors.password && (
                    <small>{errors?.password?.message}</small>
                  )}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  >
                    Login
                  </button>
                  <div className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?
                    <Link to="/signup" className="text-decoration-none">
                      <span className="ps-1 text-danger">Register</span>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signin;
