import { NavLink } from 'react-router-dom';
import {
  func,
} from 'prop-types';

function Toggle({ onLogout, onClose }) {
  const handleClick = () => {
    onLogout();
    onClose();
  };
  return (

    <div className="menu">
      <NavLink to="/my-space" className="space">Mon espace </NavLink>
      <NavLink to="/" className="space" onClick={handleClick}>Déconnexion </NavLink>
    </div>
  );
}

Toggle.propTypes = {
  onLogout: func.isRequired,
  onClose: func.isRequired,
};

export default Toggle;
