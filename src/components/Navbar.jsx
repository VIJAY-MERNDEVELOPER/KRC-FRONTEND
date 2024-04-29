/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ children }) {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const role = sessionStorage.getItem("role");
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="container-fluid ">
      <header className="nav-style ">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid">
            <Link to={"/"} className="navbar-brand nav-link">
              KITCHEN RECIPE MANAGEMENT
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
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    to={"/"}
                    className="nav-link active "
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/all"} className="nav-link active">
                    All Recipe
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/myrecipe"} className="nav-link active">
                    My Recipe
                  </Link>
                </li>
                {role === "Admin" ? (
                  <li className="nav-item">
                    <Link
                      to={"/usermanagement"}
                      className="nav-link active"
                      aria-disabled="true"
                    >
                      User Management
                    </Link>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>
          {username ? (
            <>
              <div className="fw-bold nav-link p-1">
                <span>
                  <i className="bi bi-person-circle"></i>
                </span>
                {username}
              </div>{" "}
              <div className="fw-bold border-start border-dark nav-link p-1">
                <span>
                  <i className="bi bi-person-circle "></i>
                </span>
                <span type="button" onClick={handleLogout}>
                  LogOut
                </span>
              </div>
            </>
          ) : (
            <div className="fw-bold nav-link p-1 mx-2">
              <span
                type="button"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </span>
            </div>
          )}
        </nav>
      </header>
      <div className="container text-center "> {children}</div>
    </div>
  );
}

export default Navbar;
