/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios';
import {
  string, number, bool,
} from 'prop-types';

// Styles
import './styles.scss';

function Post({
  id, title, alt, img, link,
}) {
  const token = localStorage.getItem('token');

  const handleFavorite = (event) => {
    event.preventDefault();
  };

  return (
    <div className="post" id={id}>
      <Link to={`/post/${link}`} className="post-link" title={title}>
        <div className="post-content">
          <img className="post-content-img" src={img} alt={alt} title={title} />
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
  img: string.isRequired,
  alt: string.isRequired,
  link: string.isRequired,
  title: string.isRequired,
};

export default Post;
