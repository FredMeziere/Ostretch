import { NavLink } from 'react-router-dom';


const Toggle = ({onLogout, onClose}) => {


  const handleClick = () => {
    onLogout();
    onClose(); 
  }
  return (

    <div className="menu">
        <NavLink to="/my-space" className="space">Mon espace </NavLink>
        <NavLink to="/" className="space" onClick={handleClick}>Déconnexion </NavLink>
  </div>  
  );
}

    export default Toggle;