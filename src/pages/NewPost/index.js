import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import './styles.scss';

function NewPost() {
  const navigate = useNavigate();
  const [errorInput, setErrorInput] = useState(false);
  const [userValue, setUserValue] = useState({
    title: '',
    description_content: '',
    category_post_id: '',
  });

  const [/* categoryPosts */, setCategoryPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${process.env.REACT_APP_BASE_URL}/postscategories`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setCategoryPosts(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(userValue);
    const token = localStorage.getItem('token');
    if (userValue.title === '' || userValue.description_content === '') {
      setErrorInput(true);
    }
    else {
      axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, userValue, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          setErrorInput(true);
          navigate('/posts');
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
  };
  return (
    <form className="new-stretch-container" onSubmit={handleSubmit}>
      <h2>Ajouter votre nouveau post au forum</h2>
      {
          errorInput ? <div className="error"> Tous les champs sont obligatoires </div> : null
      }
      <p>
        Titre de votre post:
      </p>
      <input type="text" name="title" value={userValue.title} className="infos" placeholder="Ecrivez le nom de votre post" onChange={handleChange} />
      <p>
        Description:
      </p>
      <textarea rows="5" cols="40" type="text" name="description_content" value={userValue.description_content} className="infos" placeholder="Pour étirer ce muscle..." onChange={handleChange} />

      <p>Catégorie:</p>

      <select name="category_post_id" className="custom-select" onChange={handleChange} value={userValue.category_post_id}>
        <option value="">--Merci de sélectionner une catégorie--</option>
        <option value="1">Etirements</option>
        <option value="2">Aide et astuces</option>
        <option value="3">Discussions générales</option>
        <option value="4">Autre</option>
      </select>
      {/* <select name="category_post_id" className="custom-select" onChange={handleChange} value={userValue.category_post_id}>
        <option value="">--Merci de sélectionner une catégorie--</option>
        {categoryPosts.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select> */}

      <button type="submit" className="save-btn">Enregistrer</button>
    </form>
  );
}

export default NewPost;
