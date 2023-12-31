/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios';
import {
  string, number,
} from 'prop-types';

// Styles
import './styles.scss';

function Post({
  id, title, link,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem('token');

  const handleFavorite = (event) => {
    event.preventDefault();

    setIsFavorite(true);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  };

  return (
    <div className="post" id={id}>
      <Link to={`/posts/${link}`} className="post-link" title={title}>
        <div className="post-content">
          <div className="post-content-footer">
            <h3>{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
}

Post.propTypes = {
  id: number.isRequired,
  link: string.isRequired,
  title: string.isRequired,
};

export default Post;
