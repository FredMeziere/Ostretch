import './styles.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import logo from '../../assets/img/logo.svg';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
function Login({ onSubmitLoginForm }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        email: email,
        password: password,
      });

      // Stocke le token dans le stockage local du navigateur
      localStorage.setItem('token', response.data.token);

      // Effectue une requête Axios authentifiée ultérieure en incluant le token dans le header Authorization
      const authenticatedRequest = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/me`, {
        headers: { Authorization: `Bearer ${response.data.token}` },
      });

      const userFound = authenticatedRequest.data.filtredUserInfo;
      onSubmitLoginForm(userFound);
      navigate('/');

      // Traite la réponse de la requête authentifiée
    }
    // eslint-disable-next-line no-shadow
    catch (error) {
      setError(true);
      toast.error(error);
    }
  };

  return (
    <div className="login">
      <div className="login-box-container">
        <img src={logo} alt="" />
        <h2 className="login-h2">Remplissez tous les champs pour vous connecter</h2>
        {
            error ? <div className="error"> Mauvaise adresse email et/ou mot de passe </div> : null
            }
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-input-group">
            <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          </div>

          <div className="login-input-group">
            <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit" className="primary">Connexion</button>
          <p className="login-p">Pas encore inscrit ?</p>
          <NavLink to="/signup" className="signup">Créer un compte</NavLink>
        </form>
      </div>
    </div>
  );
}

export default Login;
