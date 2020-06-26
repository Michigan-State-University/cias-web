import PropTypes from 'prop-types';

const propsToCssMapper = {
  regular: 400,
  medium: 500,
  bold: 700,
};

const text = props => ({
  fontSize: props.fontSize || '',
  fontWeight: propsToCssMapper[props.fontWeight] || '',
  fontStyle: props.fontStyle || '',
  color: props.color || '',
  opacity: props.opacity || '',
});

text.propTypes = {
  fontSize: PropTypes.string,
  fontWeight: PropTypes.oneOf(['regular', 'medium', 'bold']),
  fontStyle: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
};

export { text };
