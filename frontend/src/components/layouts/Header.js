import './Header.css';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const { items: cartItems } = useSelector((state) => state.cartState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };

  return (
    <nav className="custom-navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img width="100px" alt="ShopEZ Logo" src="/images/logo.png" />
        </Link>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <Search />
      </div>

      {/* Right side */}
      <div className="navbar-user">
        {isAuthenticated ? (
          <div className="user-dropdown">
            <button className="user-toggle">
              <img
                width="40px"
                height="40px"
                src={user.avatar ?? './images/default_avatar.png'}
                alt="User Avatar"
                className="avatar-img"
              />
              <span>{user.name}</span>
            </button>
            <div className="dropdown-menu">
              {user.role === 'admin' && (
                <div className="dropdown-item" onClick={() => navigate('admin/dashboard')}>
                  Dashboard
                </div>
              )}
              <div className="dropdown-item" onClick={() => navigate('/myprofile')}>
                Profile
              </div>
              <div className="dropdown-item" onClick={() => navigate('/orders')}>
                Orders
              </div>
              <div className="dropdown-item logout" onClick={logoutHandler}>
                Logout
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login" className="login-btn" id="login_btn">
            Login
          </Link>
        )}

        <Link to="/cart">
          <span id="cart" className="cart-text">Cart</span>
        </Link>
        <span className="cart-count" id="cart_count">{cartItems.length}</span>
      </div>
    </nav>
  );
}
