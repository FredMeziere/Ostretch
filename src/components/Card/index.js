/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios';
import {
  string, number, bool,
} from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Styles
import './styles.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function Card({
  id, link, title, isLogged, hover, alt, img,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem('token');

  const handleFavorite = (event) => {
    event.preventDefault();

    if (isFavorite) {
      toast.warning('Cette carte est déjà marquée comme favorite.');
      return;
    }

    setIsFavorite(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${id}`, {}, config)
      .then((response) => {
        setIsFavorite(true);
      })
      .catch((error) => {
        setIsFavorite(false);
        toast.error(error);
      });
  };

  return (
    <div className="Card" id={id}>
      <Link to={`/stretches/${link}`} className="card" title={title}>
        <div className="card-content">
          <img className="card-content-img" src={img} alt={alt} title={hover} />
          <div className="card-content-footer">
            <h3>{title}</h3>
            {isLogged ? (
              <span onClick={handleFavorite} className="card-content-footer-favorite-icon">
                {isFavorite ? <AiFillHeart className="card-content-footer-filled-icon" /> : <AiOutlineHeart />}
              </span>
            ) : (
              <span className="card-content-footer-favorite-icon" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

Card.propTypes = {
  id: number.isRequired,
  link: string.isRequired,
  img: string.isRequired,
  alt: string.isRequired,
  hover: string.isRequired,
  title: string.isRequired,
  isLogged: bool.isRequired,
};

export default Card;
