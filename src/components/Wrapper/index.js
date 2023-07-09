import {
  string,
} from 'prop-types';

// Styles
import './wrapper.scss';

function Wrapper({ wrapperTitle, wrapperDescription }) {
  return (
    <div className="wrapper">
      <h1 className="wrapper-h1">{wrapperTitle}</h1>
      <p className="wrapper-p">{wrapperDescription}</p>
    </div>
  );
}
Wrapper.propTypes = {
  wrapperTitle: string.isRequired,
  wrapperDescription: string.isRequired,
};

export default Wrapper;
