import PropTypes from 'prop-types';

const margin = (props) => ({
  margin: props.margin ?? '',
  marginTop: props.my ?? props.mt ?? '',
  marginBottom: props.my ?? props.mb ?? '',
  marginRight: props.mx ?? props.mr ?? '',
  marginLeft: props.mx ?? props.ml ?? '',
});

margin.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  mr: PropTypes.number,
  ml: PropTypes.number,
  mx: PropTypes.number,
  my: PropTypes.number,
  margin: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export { margin };
