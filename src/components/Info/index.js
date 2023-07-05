import { string, shape, func } from 'prop-types';

function Info({ user, handleClick }) {
  return (
    <div className="info-container">
      <p className="info-container-p">Mon pseudo :</p>
      <div className="info-container-div"> {user.username}</div>
      <p className="info-container-p">Ma bio :</p>
      <div className="info-container-div"> {user.biography}</div>
      <button className="info-container-div-modify-btn" type="button" onClick={handleClick}>Modifier</button>
    </div>
  );
}

Info.propTypes = {
  user: shape({
    username: string.isRequired,
    biography: string.isRequired,
  }).isRequired,
  handleClick: func.isRequired,
};

export default Info;
