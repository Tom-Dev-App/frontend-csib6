import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import authService from "../../services/auth.service";
import config from "../../utils/config";

const CreateUser = () => {
  const { SERVER_URL } = config();
  const { auth } = authService();
  const { token } = auth();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const authorization_token = token ?? "";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/users`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { Authorization: `Bearer ${authorization_token}` },
        }
      );

      if (response.data.error) {
        setMessage("");
        setErrors({ generic: response.data.error });
      } else {
        setErrors({});
        setMessage("User created successfully!");
        setFormData({
          email: "",
          name: "",
          password: "",
        });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const serverErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.path] = err.msg;
          return acc;
        }, {});
        setErrors(serverErrors);
      } else {
        console.error("Error creating user:", error);
        setErrors({
          generic: "An unexpected error occurred. Please try again later.",
        });
      }
      setMessage("");
      setValidated(false);
    }
  };

  return (
    <div className="container-fluid bg-dark min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          <Sidebar />
        </div>
        <div className="col-8 p-5">
          <h1 className="text-white">Create User</h1>
          {message && <div className="alert alert-success">{message}</div>}
          {errors.generic && (
            <div className="alert alert-danger text-center">
              {errors.generic}
            </div>
          )}
          <form
            noValidate
            validated={validated.toString()}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email" className="form-label mt-4 text-white">
                Email address
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div>
              <label htmlFor="name" className="form-label mt-4 text-white">
                Name
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="form-label mt-4 text-white">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="mt-5">
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
