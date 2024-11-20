import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            User Management
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  Display Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-user">
                  Add User
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/users" element={<UserList />} />
          <Route path="/add-user" element={<UserForm />} />
          <Route path="/edit-user/:id" element={<UserForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
