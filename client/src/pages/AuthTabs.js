import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="container mt-5">
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
            className={`nav-link ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
        </li>
      </ul>

      <div className="mt-4">
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </div>
  );
}
