import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  string, number, func,
} from 'prop-types';
import axios from 'axios';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
// Styles
import './styles.scss';

function Card({
  id, link, title, isLogged, hover, alt, img,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem('token');

  const handleFavorite = (event) => {
    event.preventDefault();

    setIsFavorite(!isFavorite);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(config);
    axios.post(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${id}`, {}, config)
      .then(() => {
        setIsFavorite(true);
      })
      .catch((error) => {
        toast.error(error);
      }, [token]);
  };

  return (
    <div className="Card" id={id}>
      <Link to={`/stretches/${link}`} className="card" title={title}>
        <div className="card-content">
          <img src={img} alt={alt} title={hover} />
          <div className="card-footer">
            <h3>{title}</h3>
            {isLogged ? (
              <span onClick={handleFavorite} className="favorite-icon">
                {isFavorite ? <AiFillHeart className="filled-icon" /> : <AiOutlineHeart />}
              </span>
            ) : (
              <span className="favorite-icon" />
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
  isLogged: func.isRequired,
};

export default Card;
