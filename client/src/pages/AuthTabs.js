import { useState, useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setActiveTab("");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
    setActiveTab("login");
    localStorage.removeItem("token");
  };

  return (
    <div className="container mt-5">
      {!isLoggedIn && (
        <>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "login" ? "active" : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Login
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "register" ? "active" : ""
                }`}
                onClick={() => setActiveTab("register")}
              >
                Register
              </button>
            </li>
          </ul>
          <div className="mt-4">
            {activeTab === "login" ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Register />
            )}
          </div>
        </>
      )}

      {isLoggedIn && (
        <div className="mt-4">
          <h3>Welcome! You are logged in page</h3>
          <button className="btn btn-primary mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
