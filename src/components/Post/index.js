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

function Post({
  id, title, isLogged, alt, img, link,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem('token');

  const handleFavorite = (event) => {
    event.preventDefault();

    if (isFavorite) {
      toast.warning('Ce post est déjà marqué comme favori.');
      return;
    }

    setIsFavorite(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.post(`${process.env.REACT_APP_BASE_URL}/user/me/post/${id}`, {}, config)
      .then((response) => {
        setIsFavorite(true);
      })
      .catch((error) => {
        setIsFavorite(false);
        toast.error(error);
      });
  };

  return (
    <div className="post" id={id}>
      <Link to={`/post/${link}`} className="post-link" title={title}>
        <div className="post-content">
          <img className="post-content-img" src={img} alt={alt} title={title} />
          <div className="post-content-footer">
            <h3>{title}</h3>
            {isLogged ? (
              <span onClick={handleFavorite} className="post-content-footer-favorite-icon">
                {isFavorite ? <AiFillHeart className="post-content-footer-filled-icon" /> : <AiOutlineHeart />}
              </span>
            ) : (
              <span className="post-content-footer-favorite-icon" />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

Post.propTypes = {
  id: number.isRequired,
  img: string.isRequired,
  alt: string.isRequired,
  link: string.isRequired,
  title: string.isRequired,
  isLogged: bool.isRequired,
};

export default Post;
