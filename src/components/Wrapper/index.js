// Styles
import PropTypes from 'prop-types';
import './wrapper.scss';

function Wrapper(props) {
  const { wrapperTitle, wrapperDescription } = props;
  return (
    <div className="wrapper">
      <h1 className="wrapper-h1">{wrapperTitle}</h1>
      <p className="wrapper-p">{wrapperDescription}</p>
    </div>
  );
}

Wrapper.propTypes = {
  wrapperTitle: PropTypes.string.isRequired,
  wrapperDescription: PropTypes.string.isRequired,
};

export default Wrapper;
