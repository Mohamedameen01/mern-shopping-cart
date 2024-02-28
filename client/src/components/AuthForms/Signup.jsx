import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { userSignup } from "../../redux/auth/authActions";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus("name");
  }, [setFocus]);

  const onSubmit = (data) => {
    dispatch(userSignup(data, navigate));
  };

  return (
    <div>
      <section className="vh-100 " style={{ backgroundColor: "#eee" }}>
        <div className="container" style={{ height: "95%" }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ bordeRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Your Name</label>
                            <input
                              type="text"
                              id="form3Example1c"
                              name="name"
                              className="form-control"
                              {...register("name", {
                                required: "This field is required",
                                minLength: {
                                  value: 3,
                                  message: "Must be more than 3 characters.",
                                },
                                maxLength: {
                                  value: 18,
                                  message: "Must be less than 18 characters.",
                                },
                              })}
                            />
                            {errors.name && (
                              <small>{errors.name?.message} </small>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Your Email</label>
                            <input
                              type="email"
                              id="form3Example3c"
                              name="email"
                              className="form-control"
                              {...register("email", {
                                required: "This field is required",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            {errors.email && (
                              <small>{errors?.email?.message}</small>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              name="password"
                              id="form3Example4c"
                              className="form-control"
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
                        </div>

                        <div className="d-flex justify-content-center mb-5">
                          <div>
                            Have already an account?
                            <Link to="/signin" className="text-decoration-none">
                              <span className="fw-bold ps-1">Login here</span>
                            </Link>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Signup;
