import PropTypes from 'prop-types';

const layout = props => ({
  width: props.width || '',
  height: props.height || '',
});

layout.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export { layout };
