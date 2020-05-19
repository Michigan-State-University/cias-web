import PropTypes from 'prop-types';

const propsToCssMapper = {
  unset: 'unset',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
};

const align = props => ({
  justifyContent: propsToCssMapper[props.justify] || '',
  justifyItems: propsToCssMapper[props.justify] || '',
  alignContent: propsToCssMapper[props.align] || '',
  alignItems: propsToCssMapper[props.align] || '',
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
