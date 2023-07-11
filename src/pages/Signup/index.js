import './styles.scss';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [errorLengthUsername, setErrorLenghtUsername] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setErrorInput(false);
    setErrorLenghtUsername(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value.toLowerCase());
    setErrorInput(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorPassword(false);
  };

  const handlePasswordConfirmChange = (event) => {
    const { value } = event.target;
    setPasswordConfirm(value);
    setErrorConfirm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '' || email === '') {
      setErrorInput(true);
    }
    else if (username.length <= 4) {
      setErrorLenghtUsername(true);
    }
    else if (password.length < 8) {
      setErrorPassword(true);
    }
    else if (passwordConfirm !== password) {
      setErrorConfirm(true);
    }
    else {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, {
          username,
          email,
          password,
          passwordConfirm,
        });
        // console.log(response.data);
        setErrorPassword(false);
        navigate('/login');
      }
      catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <img className="login-container-img" src={logo} alt="" />
        <h2 className="login-container-h2">Créez votre compte en remplissant les champs ci-dessous</h2>

        <form className="login-container-form" onSubmit={handleSubmit}>
          {
            errorInput ? <div className="error"> Tous les champs sont obligatoires </div> : null
          }
          {
            errorLengthUsername ? <div className="error">Votre pseudo doit faire plus de 4 caractères</div> : null
          }
          <div className="login-container-input-group">
            <input type="text" name="name" placeholder="Votre Pseudo" value={username} onChange={handleUsernameChange} />
          </div>
          <div className="login-container-input-group">
            <input type="email" name="email" placeholder="Adresse mail" value={email} onChange={handleEmailChange} />
          </div>
          {
            errorPassword ? <div className="error">Le mot de passe doit contenir minimum 8 caractères</div> : null
          }
          <div className="login-container-input-group">
            <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={handlePasswordChange} />
          </div>
          <div className="login-container-input-group">
            <input type="password" name="confirm" placeholder="Confirmez le mot de passe" value={passwordConfirm} onChange={handlePasswordConfirmChange} />
          </div>
          {
            errorConfirm ? <div className="error"> Les mots de passe doivent être identiques </div> : null
          }
          <button type="submit" className="login-container-input-group-primary">S'inscrire</button>
        </form>

      </div>
    </div>
  );
}
export default Signup;
