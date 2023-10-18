import { CSSProperties } from 'react';
import PropTypes from 'prop-types';

export type PaddingProps = Pick<CSSProperties, 'padding'> & {
  pt?: CSSProperties['paddingTop'];
  pb?: CSSProperties['paddingBottom'];
  pr?: CSSProperties['paddingRight'];
  pl?: CSSProperties['paddingLeft'];
  px?: CSSProperties['paddingLeft'];
  py?: CSSProperties['paddingTop'];
};

export const padding = (props: PaddingProps) => ({
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
