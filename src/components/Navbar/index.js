import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import MediaQuery from 'react-responsive';
import { func } from 'prop-types';
// Components
import { FaRegUserCircle } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Toggle from '../Toggle';

// Styles
import './styles.scss';
import logo from '../../assets/img/logo.svg';

function Navbar({ isLogged, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleClick = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleClose = () => {
    setDropdownOpen(false);
  };

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
    <div className="desktopnav">
      <img src={logo} alt="OStretch logo" />
      <ul className="desktopnav-nav-links">
        <Link className="desktopnav-nav-links-home" to="/">
          Accueil
        </Link>
        <Link className="desktopnav-nav-links-stretches" to="/stretches">
          Étirements
        </Link>
        <Link className="desktopnav-nav-links-about" to="/about">
          A propos
        </Link>
        <Link className="desktopnav-nav-links-contact" to="/contact">
          Contact
        </Link>
        <Link className="desktopnav-nav-links-forum" to="/forum">
          Forum
        </Link>
      </ul>
      <div className="desktopnav-profile">
        {
                        isLogged ? <FaRegUserCircle className="desktopnav-profile-user" onClick={handleClick} /> : <NavLink to="/login" className="desktopnav-profile-login">Login</NavLink>
                    }
      </div>
      {
                    dropdownOpen ? <Toggle onLogout={onLogout} onClose={handleClose} /> : null
                }
    </div>
  );

  const mobileNav = () => (
    <div className="mobile-dropdown">
      <img src={logo} alt="OStretch logo" />
      <GiHamburgerMenu
        className="mobile-dropdown-icon"
        onClick={handleDropdown}
      />

      <ul className="mobile-nav-links closed" id="mobile-nav-links">
        <Link className="home" to="/">
          <li>
            Accueil
          </li>
        </Link>
        <Link className="stretches" to="/stretches">
          <li>
            Étirements
          </li>
        </Link>
        {
                        isLogged ? <NavLink to="/my-space" className="user">Mon espace</NavLink> : <NavLink to="/login" className="login">Login</NavLink>
                    }
      </ul>
    </div>
  );

  return (
    <div className="Navbar">
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
  isLogged: func.isRequired,
  onLogout: func.isRequired,
};

export default Navbar;
