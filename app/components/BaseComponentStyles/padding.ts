import { CSSProperties } from 'react';

export type PaddingProps = Pick<
  CSSProperties,
  | 'padding'
  | 'paddingBlock'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
  | 'paddingInline'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
> & {
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
  paddingBlock: props.paddingBlock ?? '',
  paddingBlockStart: props.paddingBlockStart ?? props.paddingBlock ?? '',
  paddingBlockEnd: props.paddingBlockEnd ?? props.paddingBlock ?? '',
  paddingInline: props.paddingInline ?? '',
  paddingInlineStart: props.paddingInlineStart ?? props.paddingInline ?? '',
  paddingInlineEnd: props.paddingInlineEnd ?? props.paddingInline ?? '',
});
