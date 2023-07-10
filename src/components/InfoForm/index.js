/* eslint-disable react/require-default-props */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  string, func, shape,
} from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';

function InfoForm({
  user, setUser, setIsEditOpen, setIsLogged,
}) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const [userValue, setUserValue] = useState({
    username: '',
    biography: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
  };
  //

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedData = {};

    if (userValue.username !== '') {
      updatedData.username = userValue.username;
    }

    if (userValue.biography !== '') {
      updatedData.biography = userValue.biography;
    }

    axios.patch(`${process.env.REACT_APP_BASE_URL}/user/me`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le jeton d'authentification à l'en-tête de la demande
        'Content-Type': 'application/json',
      },
    })
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          // eslint-disable-next-line no-shadow
          .then((response) => {
            const userFound = response.data.filtredUserInfo;
            setUser(userFound);
            // console.log(user);
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        toast.error(error);
      });
    setIsEditOpen(false);
  };

  const handleDelete = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.delete(`${process.env.REACT_APP_BASE_URL}/user/me`, config)
      .then(() => {
        setUser('');
        setIsLogged(false);
        localStorage.clear();
        navigate('/signup');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (

    <form className="infos-container" onSubmit={handleSubmit}>
      <p>
        Mon pseudo:
      </p>
      <input type="text" name="username" value={userValue.username} className="infos" placeholder={user.username} onChange={handleChange} />

      <p>
        Ma bio:
      </p>
      <textarea rows="5" cols="33" type="text" name="biography" value={userValue.biography} className="infos" placeholder={user.biography} onChange={handleChange} />

      <button type="submit" className="modify-btn">Enregistrer</button>
      <p>Vous souhaitez supprimer définivement votre compte?</p>
      <div className="delete-account-btn" onClick={handleDelete}>Supprimer</div>
    </form>
  );
}

InfoForm.propTypes = {
  user: shape({
    username: string.isRequired,
    biography: string.isRequired,
  }).isRequired,
  setUser: func.isRequired,
  setIsEditOpen: func.isRequired,
  setIsLogged: func.isRequired,
};

export default InfoForm;
