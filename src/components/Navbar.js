import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import logo from "../Images/JoinPathV3.png";

export default function Navbar(props) {
  return (
    <div>
      <nav
        className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src={`${logo}`}
              alt="JoinPath"
              style={{ height: "80px", marginLeft: "-10px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link mt-3" aria-current="page" to="/">
                  <h3>Home</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mt-3" to="/about">
                  <h3>{props.aboutText}</h3>
                </Link>
              </li>
            </ul>
            <form className="d-flex">
              {/* <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button> */}
              <div
                className={`form-check form-switch text-${
                  props.mode === "light" ? "dark" : "light"
                }`}
              >
                <input
                  onClick={props.toggleMode}
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Enable DarkMode
                </label>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
};

Navbar.defaultProps = {
  title: "default title",
  aboutText: "default text",
};
