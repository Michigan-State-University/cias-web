import PropTypes from 'prop-types';

const border = (props) => ({
  borderTop: props.borderTop ?? '',
  borderBottom: props.borderBottom ?? '',
  borderRight: props.borderRight ?? '',
  borderLeft: props.borderLeft ?? '',
  border: props.border ?? '',
  borderRadius: props.borderRadius ?? '',
  borderColor: props.borderColor ?? '',
  borderStyle: props.borderStyle ?? '',
  borderWidth: props.borderWidth ?? '',
});

border.propTypes = {
  borderTop: PropTypes.string,
  borderBottom: PropTypes.string,
  borderRight: PropTypes.string,
  borderLeft: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  borderStyle: PropTypes.string,
  borderWidth: PropTypes.string,
};

export { border };
