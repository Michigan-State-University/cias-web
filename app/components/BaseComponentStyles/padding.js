import PropTypes from 'prop-types';

const padding = props => ({
  paddingTop: props.py || props.pt || '',
  paddingBottom: props.py || props.pb || '',
  paddingRight: props.px || props.pr || '',
  paddingLeft: props.px || props.pl || '',
  padding: props.padding || '',
});

padding.propTypes = {
  pt: PropTypes.number,
  pb: PropTypes.number,
  pr: PropTypes.number,
  pl: PropTypes.number,
  padding: PropTypes.number,
  px: PropTypes.number,
  py: PropTypes.number,
};

export { padding };
