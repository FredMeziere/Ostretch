import './styles.scss';
import logo from '../../assets/img/logo.svg';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
const navigate = useNavigate();

const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [passwordConfirm, setPasswordConfirm] = useState('');
const [errorPassword, setErrorPassword] = useState(false);
const [errorConfirm, setErrorConfirm] = useState(false)
const [errorInput, setErrorInput] = useState(false)

const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    setErrorInput(false)
}

const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase())
    setErrorInput(false)
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrorPassword(false)
  };

  const handlePasswordConfirmChange = (event) => {
    const value = event.target.value;
    setPasswordConfirm(value);
    setErrorConfirm(false);
  };

const handleSubmit = async (e) =>{
    e.preventDefault();
        if (username === '' || email === '') {
        setErrorInput(true)
        } else if ( password.length < 8) {
        setErrorPassword(true);
        } else if (passwordConfirm !== password){
        setErrorConfirm(true);
        } else {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user`, {         
        username,    
        email,
        password,
        passwordConfirm});
        console.log(response.data);
        setErrorPassword(false);
        navigate('/login');
      } catch (error) {
        console.error(error);
      }

}}

    return (
<div className="login">
        <div className="box-container">
            <img src={logo} alt="" />
            <h2>Créer un compte</h2>

            <form className="form" onSubmit={handleSubmit}>
                {
                errorInput ? <div className='error'> Tous les champs sont obligatoires </div> : null
                }
                <div className="input-group">
                    <input type="text" name="name" placeholder="Name" value={username} onChange={handleUsernameChange}/>
                </div>
                <div className="input-group">
                    <input type="email" name="email" placeholder="Adresse mail" value={email} onChange={handleEmailChange}/>
                </div>
                {
                errorPassword ? <div className='error'> Le mot de passe doit contenir min 8 caractères </div> : null
                }
                <div className="input-group">
                    <input type="password" name="password" placeholder="Mot de passe" value={password} onChange={handlePasswordChange}/>
                </div>
                {
                errorConfirm ? <div className='error'> Les mots de passe doivent être identiques </div> : null
                }
                <div className="input-group">
                    <input type="password" name="confirm" placeholder="Confirmez le mot de passe" value={passwordConfirm} onChange={handlePasswordConfirmChange}/>
                </div>
                <button className="primary">S'inscrire</button>
            </form>
        

        </div>
    </div>
    )
}
export default Signup;
