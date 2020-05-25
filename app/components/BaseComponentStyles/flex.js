import PropTypes from 'prop-types';

const propsToCssMapper = {
  unset: 'unset',
  center: 'center',
  end: 'flex-end',
  start: 'flex-start',
  around: 'space-around',
  between: 'space-between',
  evenly: 'space-evenly',
};

const flex = props => ({
  justifyContent: propsToCssMapper[props.justify] || '',
  justifyItems: propsToCssMapper[props.justify] || '',
  alignContent: propsToCssMapper[props.align] || '',
  alignItems: propsToCssMapper[props.align] || '',
  flexGrow: props.filled ? 1 : '',
});

flex.propTypes = {
  justify: PropTypes.oneOf([
    'center',
    'end',
    'start',
    'around',
    'between',
    'evenly',
  ]),
  align: PropTypes.oneOf([
    'center',
    'end',
    'start',
    'around',
    'between',
    'evenly',
  ]),
  filled: PropTypes.bool,
};

export { flex };
