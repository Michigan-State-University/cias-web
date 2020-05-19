import PropTypes from 'prop-types';

const align = props => ({
  justifyContent: props.justify || '',
  justifyItems: props.justify || '',
  alignContent: props.align || '',
  alignItems: props.align || '',
});

align.propTypes = {
  justify: PropTypes.oneOf(['unset', 'center', 'end', 'start']),
  align: PropTypes.oneOf(['unset', 'center', 'end', 'start']),
};

align.defaultProps = {
  justify: 'unset',
  align: 'unset',
};

export { align };
