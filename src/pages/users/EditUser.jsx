import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import authService from "../../services/auth.service";
import Sidebar from "../../components/Sidebar";
import config from "../../utils/config";

const EditUser = () => {
  const { auth } = authService();
  const { token } = auth();
  const { SERVER_URL } = config();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const authorization_token = token ?? "";
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/api/users/${id}`, {
          headers: { Authorization: `Bearer ${authorization_token}` },
        });
        const userData = response.data?.users?.[0];
        // console.log(response.data);
        setFormData({
          email: userData.email,
          name: userData.name,
          password: "", // Since password fields should not be prefilled,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${SERVER_URL}/api/users/${id}`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authorization_token}`,
          },
        }
      );

      if (response.data.error) {
        setMessage("");
        setErrors({ generic: response.data.error });
      } else {
        setErrors({});
        setMessage("User updated successfully!");
        // Optionally, you can reset the form data here
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const serverErrors = error.response.data.errors.reduce((acc, err) => {
          acc[err.path] = err.msg;
          return acc;
        }, {});
        setErrors(serverErrors);
      } else {
        console.error("Error updating user:", error);
        setErrors({
          generic: "An unexpected error occurred. Please try again later.",
        });
      }
      setMessage("");
    }
  };

  return (
    <div className="container-fluid bg-dark min-vh-100">
      <div className="row">
        <div className="col-2 bg-white vh-100">
          <Sidebar />
        </div>
        <div className="col-8 p-5">
          <h1 className="text-white">Edit User</h1>
          {message && <div className="alert alert-success">{message}</div>}
          {errors.generic && (
            <div className="alert alert-danger text-center">
              {errors.generic}
            </div>
          )}
          <form onSubmit={handleSubmit}>
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
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
