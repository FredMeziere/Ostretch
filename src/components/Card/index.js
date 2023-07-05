import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios';

// Styles
import './styles.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const Card = (props) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const token = localStorage.getItem('token');

    const handleFavorite = (event) => {
        event.preventDefault();

        setIsFavorite(!isFavorite);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          console.log(config);
          axios.post(`${process.env.REACT_APP_BASE_URL}/user/me/stretches/${props.id}`,{}, config)
            .then(response => {
              setIsFavorite(true);
            })
            .catch(error => {
              console.log(error);
            }, [token]);
    };

    return (
        <div className="Card" id={props.id}>
            <Link to={`/stretches/${props.link}`} className="card" title={props.title}>
                <div className='card-content'>
                    <img src={props.img} alt={props.alt} title={props.hover} />
                    <div className="card-footer">
                        <h3>{props.title}</h3>
                        {props.isLogged ? (
                            <span onClick={handleFavorite} className="favorite-icon">
                                {isFavorite ? <AiFillHeart className='filled-icon' /> : <AiOutlineHeart />}
                            </span>
                        ) : (
                            <span className="favorite-icon" />
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;
