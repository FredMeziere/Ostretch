/* eslint-disable react/require-default-props */
import { useState } from 'react';
import {
  func, shape, string,
} from 'prop-types';
import Bookmarks from '../../components/Bookmarks';

// Styles
import Info from '../../components/Info';
import InfoForm from '../../components/InfoForm';
import './styles.scss';

function MySpace({ user, setUser, setIsLogged }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const onEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  return (
    <div className="myspace">
      <h1 className="myspace-h1">Bienvenue {user.username}</h1>
      <div className="myspace-box">

        <h2 className="myspace-h2">Mes informations personelles :</h2>
        { isEditOpen ? <InfoForm user={user} setIsEditOpen={setIsEditOpen} setUser={setUser} setIsLogged={setIsLogged} /> : <Info user={user} handleClick={onEdit} />}

      </div>
      <div className="myspace-bookmarks">
        <h2 className="myspace-h2">Ma liste de favoris</h2>
        <p className="myspace-p">Ici vous pouvez retrouver vos favoris :</p>
        <Bookmarks />
      </div>
    </div>
  );
}

MySpace.propTypes = {
  user: shape({
    username: string,
    biography: string,
  }).isRequired,
  setUser: func.isRequired,
  setIsLogged: func.isRequired,
};

export default MySpace;
