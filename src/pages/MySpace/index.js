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
    <div className="MySpace">
      <h1>Bienvenue {user.username}</h1>
      <div className="box">

        <h2>Mes informations personelles :</h2>
        { isEditOpen ? <InfoForm user={user} setIsEditOpen={setIsEditOpen} setUser={setUser} setIsLogged={setIsLogged} /> : <Info user={user} handleClick={onEdit} />}

      </div>
      <div className="box">
        <h2>Ma liste de favoris</h2>
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
