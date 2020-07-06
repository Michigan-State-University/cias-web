import PropTypes from 'prop-types';
import { hexToRgb } from 'theme';

const style = props => ({
  backgroundColor:
    props.bg && `rgba(${hexToRgb(props.bg)}, ${props.opacity || 1})`,
  color:
    props.color && `rgba(${hexToRgb(props.color)}, ${props.textOpacity || 1})`,
  cursor: props.clickable ? 'pointer;' : '',
  '&:hover': {
    backgroundColor: props.hoverColor || '',
  },
  borderRadius: props.borderRadius || '',
  boxShadow: props.shadow || '',
  transform: props.transform || '',
  transition: props.transition || '',
});

style.propTypes = {
  bg: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  clickable: PropTypes.bool,
  hoverColor: PropTypes.string,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  transform: PropTypes.string,
  transition: PropTypes.string,
};

export { style };
