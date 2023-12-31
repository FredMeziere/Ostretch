import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  bool,
} from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  AiOutlineHeart, AiFillHeart, AiOutlineDelete, AiOutlineEdit,
} from 'react-icons/ai';
// Styles
import './styles.scss';
import StretchForm from '../../components/StretchForm';

function Stretch({ isLogged, isAdmin }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [stretch, setStretch] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const token = localStorage.getItem('token');
  // console.log(stretch);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/stretches/${id}`)
      .then((response) => {
        setStretch(response.data);
      });
  }, [id]);

  const handleFavorite = (event) => {
    event.preventDefault();

    setIsFavorite(!isFavorite);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.post(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${id}`, {}, config)
      .then(() => {
        setIsFavorite(true);
      })
      .catch((error) => {
        toast.error(error);
      }, [token]);
  };
  const handleDelete = () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.delete(`${process.env.REACT_APP_BASE_URL}/stretches/${id}`, config)
      .then(() => {
        navigate('/stretches');
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleEdit = () => {
    setOnEdit(!onEdit);
  };

  return (
    <div className="Stretch">
      <div className="stretch-container">
        <div className="stretch-image-container">
          <img
            src={stretch.main_image}
            alt={stretch.title}
            title={stretch.title}
            className="stretch-image"
          />
          {isLogged ? (
            <span onClick={handleFavorite} className="fav-icon">
              { isFavorite ? <AiFillHeart className="filled-icon" /> : <AiOutlineHeart />}
            </span>
          ) : null}

        </div>
        {onEdit
          ? <StretchForm stretch={stretch} setStretch={setStretch} id={id} setOnEdit={setOnEdit} />
          : (
            <div className="stretch-infos">
              <h1>{stretch.title}</h1>
              <p>{stretch.description_content}</p>
              {isAdmin ? (
                <div className="icon-box">
                  <AiOutlineEdit onClick={handleEdit} />
                  <AiOutlineDelete onClick={handleDelete} />
                </div>
              ) : null }
            </div>
          )}
      </div>
    </div>
  );
}

Stretch.propTypes = {
  isLogged: bool.isRequired,
  isAdmin: bool.isRequired,
};

export default Stretch;
