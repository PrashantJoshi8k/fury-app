import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';
import sunIcon from '../assets/sun.png';
import moonIcon from '../assets/moon.png';

export default function Navbar(props) {
  const isDark = props.mode === 'dark'; // ✅ Use global mode instead of local state

  return (
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">{props.title}</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link active" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/TextEditor">TextEditor</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/SpenTrackr">SpenTrackr</Link></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle active" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Categories
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/">Chocolates</Link></li>
                <li><Link className="dropdown-item" to="/">Gummies</Link></li>
                <li><Link className="dropdown-item" to="/">Lollipops</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/">Something Sweet</Link></li>
              </ul>
            </li>

            <li className="nav-item"><Link className="nav-link active" to="/contact">Contact</Link></li>
            <li className="nav-item"><Link className="nav-link active" to="/resume">Resume</Link></li>
            <li className="nav-item">
              <Link className="cart-button" to="/cart">
                <i style={{ marginTop: 11.2 }} className="fas fa-shopping-cart active"></i> Cart
              </Link>
            </li>
            <li className="nav-item"><Link className="nav-link active" to="/about">{props.AboutUs}</Link></li>
          </ul>

          {/* ✅ Modern switch (only one, clean and working) */}
          <div className="switch mx-2" onClick={props.toggleMode}>
            <div className={`switch-handle ${isDark ? 'dark' : 'light'}`}>
              <img
                src={isDark ? moonIcon : sunIcon}
                alt="mode icon"
                className="switch-icon"
              />
            </div>
          </div>

          {/* ❌ Removed: duplicate switch block and local dkMode state
              ❌ Removed: useEffect modifying document.body
              ❌ Removed: incorrect onClick={props.toggleMode, toggleDkMode} */}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  AboutUs: PropTypes.string,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

// Navbar.defaultProps = {
//       title: 'Guest'
//     };

