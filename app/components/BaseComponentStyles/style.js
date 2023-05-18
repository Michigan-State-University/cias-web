import PropTypes from 'prop-types';
import { hexToRgb } from 'theme';
import { ternary } from 'utils/ternary';
import isNullOrUndefined from 'utils/isNullOrUndefined';

const style = (props) => ({
  backgroundColor:
    props.bg &&
    `rgba(${hexToRgb(props.bg)}, ${
      !isNullOrUndefined(props.bgOpacity) ? props.bgOpacity : 1
    })`,
  color:
    props.color && `rgba(${hexToRgb(props.color)}, ${props.textOpacity || 1})`,
  cursor:
    props.cursor ||
    (props.clickable
      ? ternary(props.disabled, 'not-allowed !important;', 'pointer;')
      : ''),
  '&:hover': {
    backgroundColor: props.hoverColor || '',
  },
  '&:disabled': {
    color: props.disabledColor || '',
  },
  background: props.background || '',
  borderRadius: props.borderRadius || '',
  boxShadow: props.shadow || '',
  transform: props.transform || '',
  '-webkit-transform': props.transform || '',
  transition: props.transition || '',
  opacity:
    props.opacity ||
    (props.disabledColor ? '' : ternary(props.disabled, 0.5, '')),
});

style.propTypes = {
  bg: PropTypes.string,
  background: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.number,
  bgOpacity: PropTypes.number,
  clickable: PropTypes.bool,
  disabled: PropTypes.bool,
  hoverColor: PropTypes.string,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  transform: PropTypes.string,
  transition: PropTypes.string,
};

export { style };
