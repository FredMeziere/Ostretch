
import './styles.scss';
import logo from '../../assets/img/logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';


const Login = ({onSubmitLoginForm}) => {
const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword]= useState('');
// const [token, setToken] = useState('')
const [error, setError] = useState(null);


const handleEmailChange = (event) => {
    setEmail(event.target.value)
}
const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

const handleSubmit = async (e) =>{
    e.preventDefault();
    try {

        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {         
        email: email,
        password: password });
  
        // Stocke le token dans le stockage local du navigateur
        localStorage.setItem('token', response.data.token);
  
        // Effectue une requête Axios authentifiée ultérieure en incluant le token dans le header Authorization
        const authenticatedRequest = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/me`, {
          headers: { 'Authorization': 'Bearer ' + response.data.token }
        });
      
        const userFound = authenticatedRequest.data.filtredUserInfo;
        onSubmitLoginForm(userFound);
        navigate("/");
        
        // Traite la réponse de la requête authentifiée
      } catch (error) {
        console.error(error);
        setError(true);
      }
}


    return (
<div className="login">
        <div className="box-container">
            <img src={logo} alt="" />
            <h2>Se connecter</h2>
            {
            error ? <div className='error'> Mauvaise adresse email et/ou mot de passe </div> : null
            }
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
            <input type="email" name="email" placeholder="Email"value={email} onChange={handleEmailChange}/>
            </div>

          <div className="input-group">
            <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={handlePasswordChange}/>
          </div>
          <button className="primary">Connexion</button>
          <p>Pas encore inscrit ?</p>
          <NavLink to="/signup" className="signup">Créer un compte</NavLink>
        </form>
        </div>
    </div>
    )
}

export default Login;
