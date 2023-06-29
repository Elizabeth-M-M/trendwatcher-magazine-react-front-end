import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
// Renders the navbar on top of every page
const Navbar = ({ user, onLogout, setThereIsUser }) => {
  const navigator = useNavigate();
  // handles logout of a user/editor
  function handleLogout() {
    // fetch("http://localhost:3000/logout", {
    //   method: "DELETE",
    // }).then(() => );

    localStorage.clear();
    // localStorage.removeItem("userId");
    onLogout();
    setThereIsUser(false);
    navigator("/");
  }
  return (
    <nav className="navbar container" id="navtitle">
      <h4 href="#" className="theme-dark-mellow-color display-4 header-font">
        TWD
      </h4>
      <div className="right-nav">
        <div className="d-flex">
          <p className="me-4">
            <Link to="/">Home</Link>
          </p>
          <p className="me-4">
            <Link to="/category">
              {!user
                ? "More News"
                : user.username !== "editor"
                ? "More News"
                : "Articles"}
            </Link>
          </p>
        </div>
        <p>
          {!user ? (
            <button
              className="btn-style"
              onClick={() => {
                navigator("/login");
              }}
            >
              Login
            </button>
          ) : (
            <button className="btn-style" onClick={handleLogout}>
              Logout
            </button>
          )}
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
