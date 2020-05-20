import PropTypes from 'prop-types';

const padding = props => ({
  paddingTop: props.pt || '',
  paddingBottom: props.pb || '',
  paddingRight: props.pr || '',
  paddingLeft: props.pl || '',
  padding: props.padding || '',
});

padding.propTypes = {
  pt: PropTypes.number,
  pb: PropTypes.number,
  pr: PropTypes.number,
  pl: PropTypes.number,
  padding: PropTypes.number,
};

export { padding };
