import { CSSProperties } from 'react';

export type MarginProps = Pick<
  CSSProperties,
  | 'margin'
  | 'marginBlock'
  | 'marginBlockStart'
  | 'marginBlockEnd'
  | 'marginInline'
  | 'marginInlineStart'
  | 'marginInlineEnd'
> & {
  mt?: CSSProperties['marginTop'];
  mb?: CSSProperties['marginBottom'];
  mr?: CSSProperties['marginRight'];
  ml?: CSSProperties['marginLeft'];
  mx?: CSSProperties['marginLeft'];
  my?: CSSProperties['marginTop'];
};

export const margin = (props: MarginProps) => ({
  margin: props.margin ?? '',
  marginTop: props.my ?? props.mt ?? '',
  marginBottom: props.my ?? props.mb ?? '',
  marginRight: props.mx ?? props.mr ?? '',
  marginLeft: props.mx ?? props.ml ?? '',
  marginBlock: props.marginBlock ?? '',
  marginBlockStart: props.marginBlockStart ?? props.marginBlock ?? '',
  marginBlockEnd: props.marginBlockEnd ?? props.marginBlock ?? '',
  marginInline: props.marginInline ?? '',
  marginInlineStart: props.marginInlineStart ?? props.marginInline ?? '',
  marginInlineEnd: props.marginInlineEnd ?? props.marginInline ?? '',
});
