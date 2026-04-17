// components/Navbar.jsx
import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUser = localStorage.getItem("currentUser");
  const isLoggedIn = !!(storedUser && currentUser);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setTimeout(() => (window.location.href = "login.html"), 1000);
  };

  const checkLogin = (page) => {
    localStorage.getItem("currentUser")
      ? (window.location.href = page)
      : (window.location.href = "login.html");
  };

  return (
    <header className="fixed-top">
      <div className="main-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container d-flex justify-content-between align-items-center">

            {/* Logo */}
            <a className="navbar-brand" href="HomePage.html">
              <h1 className="logo">Speak2hire</h1>
            </a>

            {/* Nav Links */}
            <div className="collapse navbar-collapse justify-content-center">
              <ul className="navbar-nav align-items-center gap-5 main-links">
                <li className="nav-item">
                  <a className="nav-link text-white" href="HomePage.html">
                    <i className="fa-solid fa-house" /> Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={(e) => { e.preventDefault(); checkLogin("landingscape.html"); }}
                  >
                    <i className="fa-brands fa-rocketchat" /> Mock Interview
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link text-white"
                    href="#"
                    onClick={(e) => { e.preventDefault(); checkLogin("analysis.html"); }}
                  >
                    <i className="fa-solid fa-chart-line" /> Analysis
                  </a>
                </li>
              </ul>
            </div>

            {/* Right Side */}
            <div className="d-flex align-items-center gap-3">
              {isLoggedIn ? (
                <ul className="navbar-nav align-items-center gap-3">
                  <li>
                    <a href="profile.html">
                      <i className="fa-solid fa-user" /> {storedUser.fname}
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={handleLogout}>Log Out</a>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav align-items-center gap-2">
                  <li><a href="login.html" className="login">Login</a></li>
                  <li><a href="register.html" className="register">Register</a></li>
                </ul>
              )}

              {/* Dark Mode Toggle */}
              <div
                className="ms-3"
                onClick={() => setDarkMode((d) => !d)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"} text-white`}
                  style={{ fontSize: "1.5rem" }}
                />
              </div>
            </div>

          </div>
        </nav>
      </div>
    </header>
  );
}
