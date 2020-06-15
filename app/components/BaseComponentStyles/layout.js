import PropTypes from 'prop-types';

const positioning = props => ({
  left: props.left || '',
  top: props.top || '',
  right: props.right || '',
  bottom: props.bottom || '',
});

positioning.propTypes = {
  left: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
};

const layout = props => ({
  width: props.width || '',
  height: props.height || '',
  position: props.position || '',
  display: props.hidden ? 'none' : props.display || '',
  overflow: props.overflow || '',
  visibility: props.visibility || '',
});

layout.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  position: PropTypes.string,
  display: PropTypes.string,
  hidden: PropTypes.bool,
  overflow: PropTypes.string,
  visibility: PropTypes.oneOf([
    'hidden',
    'visible',
    'collapse',
    'initial',
    'inherit',
  ]),
};

export { layout, positioning };
