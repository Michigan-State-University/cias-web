import PropTypes from 'prop-types';

const border = (props) => ({
  borderTop: props.borderTop || '',
  borderBottom: props.borderBottom || '',
  borderRight: props.borderRight || '',
  borderLeft: props.borderLeft || '',
  border: props.border || '',
  borderRadius: props.borderRadius || '',
  borderColor: props.borderColor || '',
});

border.propTypes = {
  borderTop: PropTypes.string,
  borderBottom: PropTypes.string,
  borderRight: PropTypes.string,
  borderLeft: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
};

export { border };
