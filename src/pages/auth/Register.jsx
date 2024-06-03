import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import authService from "../../services/auth.service";
import Swal from "sweetalert2";

const Register = () => {
  const { register } = authService();

  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    try {
      await register({ name, email, password });

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response) {
        if (error.response.data.errors) {
          const serverErrors = error.response.data.errors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
          }, {});
          setErrors(serverErrors);
          setValidated(false);
        } else if (error.response.data.error) {
          setErrors({ generic: error.response.data.error });
          setValidated(false);
        }
      } else {
        console.error("Registration failed:", error);
        setErrors({
          generic: "An unexpected error occurred. Please try again later.",
        });
        setValidated(false);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-8 col-md-6">
          <form
            className="form mt-5"
            noValidate
            validated={validated.toString()}
            onSubmit={handleSubmit}
          >
            <h3 className="text-center text-dark">Register</h3>
            <div className="form-group">
              <label htmlFor="name" className="text-dark">
                Name:
              </label>
              <br />
              <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email" className="text-dark">
                Email:
              </label>
              <br />
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password" className="text-dark">
                Password:
              </label>
              <br />
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </div>
            <div className="form-group mt-3">
              <br />
              <input
                type="submit"
                name="submit"
                className="btn btn-dark btn-md"
                value="Submit"
              />
            </div>
            {errors.generic && (
              <div className="text-danger text-center mt-3">
                {errors.generic}
              </div>
            )}
            <div className="text-right mt-2">
              <a href="/login" className="text-dark">
                Login here
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
