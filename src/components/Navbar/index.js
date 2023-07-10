import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
  func, bool,
} from 'prop-types';
// Components
import Toggle from '../Toggle';

// Styles
import './styles.scss';
import logo from '../../assets/img/logo.svg';

function Navbar({ isLogged, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClose = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // MOBILE
  const handleDropdown = () => {
    const dropdownMenu = document.getElementById('mobile-nav-links');

    if (dropdownMenu.classList.contains('closed')) {
      dropdownMenu.classList.remove('closed');
      dropdownMenu.classList.add('open');
    }
    else {
      dropdownMenu.classList.remove('open');
      dropdownMenu.classList.add('closed');
    }
  };

  const desktopNav = () => (
    <div className={`nav-container ${isFixed ? 'nav-container-fixed' : ''}`}>
      <img src={logo} alt="OStretch logo" />
      <ul className="nav-container-links">
        <Link className="home" to="/">
          Accueil
        </Link>
        <Link className="stretches" to="/stretches">
          Étirements
        </Link>
        <Link className="about" to="/about">
          A propos
        </Link>
        <Link className="forum" to="/forum">
          Forum
        </Link>
        <Link className="contact" to="/contact">
          Contact
        </Link>
      </ul>
      <div className="nav-container-login">
        {isLogged ? (
          <FaRegUserCircle
            className="nav-container-login-user"
            onClick={handleClick}
          />
        ) : (
          <NavLink to="/login" className="nav-container-login-login">
            Login
          </NavLink>
        )}
      </div>
      {dropdownOpen ? <Toggle onLogout={onLogout} onClose={handleClose} /> : null}
    </div>
  );

  const mobileNav = () => (
    <div className={`mobile-dropdown ${isFixed ? 'header-fixed' : ''}`}>
      <img src={logo} alt="OStretch logo" />
      <GiHamburgerMenu className="mobile-dropdown-icon" onClick={handleDropdown} />

      <ul className="mobile-nav-links closed" id="mobile-nav-links">
        <Link className="home" to="/">
          <li>Accueil</li>
        </Link>
        <Link className="stretches" to="/stretches">
          <li>Étirements</li>
        </Link>
        {isLogged ? (
          <NavLink to="/my-space" className="user">
            Mon espace
          </NavLink>
        ) : (
          <NavLink to="/login" className="login">
            Login
          </NavLink>
        )}
      </ul>
    </div>
  );

  return (
    <div className="navbar">
      {/* Mobile */}
      <MediaQuery minWidth={320} maxWidth={480}>
        {mobileNav()}
      </MediaQuery>

      {/* Tablets */}
      <MediaQuery minWidth={481} maxWidth={768}>
        {mobileNav()}
      </MediaQuery>

      {/* Small screens */}
      <MediaQuery minWidth={769}>
        {desktopNav()}
      </MediaQuery>
    </div>
  );
}

Navbar.propTypes = {
  isLogged: bool.isRequired,
  onLogout: func.isRequired,
};

export default Navbar;
