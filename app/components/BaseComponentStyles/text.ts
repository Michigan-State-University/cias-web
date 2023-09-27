import { CSSProperties } from 'react';
import PropTypes from 'prop-types';

import { hexToRgb, themeColors } from 'theme';

const propsToCssMapper = {
  regular: 400,
  medium: 500,
  bold: 700,
};

const text = (props: TextProps) => ({
  fontSize: props.fontSize || '',
  fontWeight: (props.fontWeight && propsToCssMapper[props.fontWeight]) || '',
  fontStyle: props.fontStyle || '',
  color: props.color
    ? `rgba(${hexToRgb(props.color)}, ${props.textOpacity || 1})`
    : props.defaultColor ?? `${themeColors.text}`,
  whiteSpace: props.whiteSpace || '',
  textOverflow: props.textOverflow || '',
  cursor: props.clickable ? 'pointer;' : '',
  textDecoration: props.textDecoration || '',
  '&:hover': {
    textDecoration: props.hoverDecoration || '',
  },
  lineHeight: props.lineHeight || '',
  textAlign: props.textAlign || '',
  wordBreak: props.wordBreak || '',
});

export type TextProps = Pick<
  CSSProperties,
  | 'fontSize'
  | 'fontStyle'
  | 'color'
  | 'whiteSpace'
  | 'textOverflow'
  | 'textDecoration'
  | 'lineHeight'
  | 'textAlign'
  | 'wordBreak'
> & {
  fontWeight?: keyof typeof propsToCssMapper;
  textOpacity?: CSSProperties['opacity'];
  defaultColor?: CSSProperties['color'];
  clickable?: boolean;
  hoverDecoration?: CSSProperties['textDecoration'];
};

text.propTypes = {
  defaultColor: PropTypes.string,
  fontSize: PropTypes.string,
  fontWeight: PropTypes.oneOf(['regular', 'medium', 'bold']),
  fontStyle: PropTypes.string,
  color: PropTypes.string,
  textOpacity: PropTypes.number,
  whiteSpace: PropTypes.string,
  textOverflow: PropTypes.string,
  clickable: PropTypes.bool,
  hoverDecoration: PropTypes.oneOf(['underline', 'overline', 'line-through']),
  textDecoration: PropTypes.oneOf([
    'underline',
    'overline',
    'line-through',
    'none',
  ]),
  lineHeight: PropTypes.string,
  textAlign: PropTypes.oneOf(['left', 'right', 'center', 'justify']),
  wordBreak: PropTypes.oneOf(['normal', 'break-all', 'keep-all', 'break-word']),
};

export { text };
