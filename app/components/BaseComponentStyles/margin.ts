import { CSSProperties } from 'react';

export type MarginProps = Pick<CSSProperties, 'margin'> & {
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
});
