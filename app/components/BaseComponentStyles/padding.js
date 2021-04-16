import PropTypes from 'prop-types';

const padding = props => ({
  padding: props.padding ?? '',
  paddingTop: props.py ?? props.pt ?? '',
  paddingBottom: props.py ?? props.pb ?? '',
  paddingRight: props.px ?? props.pr ?? '',
  paddingLeft: props.px ?? props.pl ?? '',
});

padding.propTypes = {
  pt: PropTypes.number,
  pb: PropTypes.number,
  pr: PropTypes.number,
  pl: PropTypes.number,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  px: PropTypes.number,
  py: PropTypes.number,
};

export { padding };
