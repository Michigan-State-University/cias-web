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
  maxWidth: props.maxWidth || '',
  maxHeight: props.maxHeight || '',
  position: props.position || '',
  display: props.hidden ? 'none' : props.display || '',
  visibility: props.visibility || '',
  overflow: props.overflow || '',
  zIndex: props.zIndex || '',
});

layout.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
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
  zIndex: PropTypes.number,
};

export { layout, positioning };
