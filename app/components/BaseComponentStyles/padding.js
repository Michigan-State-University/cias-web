import PropTypes from 'prop-types';

const padding = props => ({
  paddingTop: props.pt || '',
  paddingBottom: props.pb || '',
  paddingRight: props.pr || '',
  paddingLeft: props.pl || '',
});

padding.propTypes = {
  pt: PropTypes.number,
  pb: PropTypes.number,
  pr: PropTypes.number,
  pl: PropTypes.number,
};

export { padding };
