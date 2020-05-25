import PropTypes from 'prop-types';

const layout = props => ({
  width: props.width || '',
  height: props.height || '',
  position: props.position || '',
  display: props.hidden ? 'none' : props.display || '',
});

layout.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  position: PropTypes.string,
  display: PropTypes.string,
  hidden: PropTypes.bool,
};

export { layout };
