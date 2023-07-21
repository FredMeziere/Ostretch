import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  func, shape, string,
} from 'prop-types';

function StretchForm({
  stretch, setStretch, id, setOnEdit,
}) {
  const [userValue, setUserValue] = useState({
    title: '',
    description_content: '',
  });
  // console.log(userValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(userValue);
    const updatedData = {};
    if (userValue.title !== '') {
      updatedData.title = userValue.title;
    }

    if (userValue.description_content !== '') {
      updatedData.description_content = userValue.description_content;
    }

    const token = localStorage.getItem('token'); // Récupérer le jeton d'authentification stocké dans le stockage local

    axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`, // Ajouter le jeton d'authentification à l'en-tête de la demande
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            const postFound = response.data;
            setStretch(postFound);
            // console.log(response.data);
          })
          .catch((error) => {
            toast.error(error);
          });
      })
      .catch((error) => {
        toast.error(error);
      });
    setOnEdit(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
  };
  return (
    <form className="infos-container" onSubmit={handleSubmit}>
      <p>
        Nom du post:
      </p>
      <input type="text" name="title" value={userValue.title} className="infos" placeholder={stretch.title} onChange={handleChange} />
      <p>
        Description:
      </p>
      <textarea rows="5" cols="45" type="text" name="description_content" value={userValue.description_content} className="infos" placeholder={stretch.description_content} onChange={handleChange} />

      <button type="submit" className="modify-btn">Enregistrer</button>
    </form>
  );
}

StretchForm.propTypes = {
  stretch: shape({
    title: string,
    main_image: string,
    description_content: string,
  }).isRequired,
  setStretch: func.isRequired,
  id: string.isRequired,
  setOnEdit: func.isRequired,
};

export default StretchForm;
