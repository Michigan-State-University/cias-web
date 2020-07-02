import PropTypes from 'prop-types';
import { hexToRgb } from 'theme';

const propsToCssMapper = {
  regular: 400,
  medium: 500,
  bold: 700,
};

const text = props => ({
  fontSize: props.fontSize || '',
  fontWeight: propsToCssMapper[props.fontWeight] || '',
  fontStyle: props.fontStyle || '',
  color:
    props.color && `rgba(${hexToRgb(props.color)}, ${props.textOpacity || 1})`,
  whiteSpace: props.whiteSpace || '',
  textOverflow: props.textOverflow || '',
});

text.propTypes = {
  fontSize: PropTypes.string,
  fontWeight: PropTypes.oneOf(['regular', 'medium', 'bold']),
  fontStyle: PropTypes.string,
  color: PropTypes.string,
  textOpacity: PropTypes.number,
  whiteSpace: PropTypes.string,
  textOverflow: PropTypes.string,
};

export { text };
