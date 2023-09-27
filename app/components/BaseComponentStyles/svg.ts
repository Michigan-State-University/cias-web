import { CSSProperties } from 'react';

export type SvgProps = Pick<CSSProperties, 'fill' | 'stroke'> & {
  hoverFill?: CSSProperties['fill'];
  hoverStroke?: CSSProperties['stroke'];
};

export const svg = (props: SvgProps) => ({
  "*[fill^='#']": {
    fill: props.fill ?? '',
  },
  "*[stroke^='#']": {
    stroke: props.stroke ?? '',
  },
  '&:hover': {
    "*[fill^='#']": {
      fill: props.hoverFill ?? '',
    },
    "*[stroke^='#']": {
      stroke: props.hoverStroke ?? '',
    },
  },
});
