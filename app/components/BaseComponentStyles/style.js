import PropTypes from 'prop-types';

const style = props => ({
  backgroundColor: props.bg || '',
  color: props.color || '',
  opacity: props.opacity || '',
  cursor: props.clickable ? 'pointer;' : '',
  '&:hover': {
    backgroundColor: props.hoverColor || '',
  },
  borderRadius: props.borderRadius || '',
});

style.propTypes = {
  bg: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  clickable: PropTypes.bool,
  hoverColor: PropTypes.string,
  borderRadius: PropTypes.string,
};

export { style };
