/* eslint-disable jsx-a11y/control-has-associated-label */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import plus from '../../assets/img/add-icon.png';
import Card from '../Card';

import './styles.scss';

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get(`${process.env.REACT_APP_BASE_URL}/user/me/stretches`, config)
      .then((response) => {
        setBookmarks(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [token]);

  const handleDelete = (id) => {
    // console.log(id);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.delete(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${id}`, config)
      // eslint-disable-next-line no-unused-vars
      .then((response) => {
        setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="bookmarks-container">
      <div className="bookmarks-cards">
        {
          bookmarks.map((stretch) => (
            <div key={stretch.id} className="card-container">
              <Card
                title={stretch.title}
                description={stretch.description}
                img={stretch.main_image}
                alt={stretch.title}
                hover={stretch.title}
                key={stretch.id}
                link={stretch.id}
              />
              <button type="button" className="delete-btn" onClick={() => handleDelete(stretch.id)}><AiOutlineDelete /></button>
            </div>
          ))
        }
        <Card title="Ajouter un favoris" img={plus} link="" />
      </div>

    </div>
  );
}

export default Bookmarks;
