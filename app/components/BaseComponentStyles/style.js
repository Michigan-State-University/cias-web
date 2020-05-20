import PropTypes from 'prop-types';

const style = props => ({
  backgroundColor: props.bg || '',
  color: props.color || '',
  opacity: props.opacity || '',
});

style.propTypes = {
  bg: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
};

export { style };
