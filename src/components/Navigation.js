import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAuthenticatedUser, logoutUser } from '../api';
import { Dropdown } from 'react-bootstrap';

const Navigation = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await fetchAuthenticatedUser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const success = await logoutUser();
    if (success) {
      setUser(null);
      navigate('/login');
    } else {
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
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
          <div className="d-flex justify-content-between w-100">
            <ul className="navbar-nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Products</Link>
                </li>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/view-cart">Cart</Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/add-product">Stock In</Link>
                </li>
              )}
            </ul>
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item dropdown">
                  <Dropdown>
                    <Dropdown.Toggle variant="dark" id="dropdown-basic" style={{ color: 'white' }}>
                      {user.name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
