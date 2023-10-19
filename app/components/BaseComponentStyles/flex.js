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

const flex = (props) => ({
  justifyContent: propsToCssMapper[props.justify] || '',
  justifyItems: propsToCssMapper[props.justify] || '',
  alignContent: propsToCssMapper[props.align] || '',
  alignItems: propsToCssMapper[props.align] || '',
  flexGrow: props.filled ? 1 : '',
  flexDirection: props.direction || '',
  flexWrap: props.flexWrap || '',
  alignSelf: propsToCssMapper[props.alignSelf] || '',
  gap: props.gap || '',
  flex: props.flex || '',
  flexShrink: props.flexShrink ?? '',
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
  direction: PropTypes.oneOf([
    'row',
    'column',
    'row-reverse',
    'column-reverse',
  ]),
  flexWrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse']),
  alignSelf: PropTypes.oneOf(['start', 'end', 'center']),
  gap: PropTypes.number,
  flex: PropTypes.number,
  flexShrink: PropTypes.number,
};

export { flex };
