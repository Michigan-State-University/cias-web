import PropTypes from 'prop-types';

const margin = props => ({
  marginTop: props.mt || '',
  marginBottom: props.mb || '',
  marginRight: props.mr || '',
  marginLeft: props.ml || '',
});

margin.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
  mr: PropTypes.number,
  ml: PropTypes.number,
};

export { margin };
