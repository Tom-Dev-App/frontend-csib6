import React from "react";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";

const Navbar = () => {
  const { auth } = authService();
  const { user } = auth();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark sticky-top bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link className="navbar-brand fw-light" to="/">
            <span className="fas fa-brain me-1"></span>Celerates
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {user !== null ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
