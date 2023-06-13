import { CSSProperties } from 'react';

export type PositioningProps = Pick<
  CSSProperties,
  'left' | 'top' | 'right' | 'bottom'
>;

export const positioning = (props: PositioningProps) => ({
  left: props.left ?? '',
  top: props.top ?? '',
  right: props.right ?? '',
  bottom: props.bottom ?? '',
});

export type LayoutProps = Pick<
  CSSProperties,
  | 'width'
  | 'height'
  | 'maxWidth'
  | 'maxHeight'
  | 'minWidth'
  | 'minHeight'
  | 'position'
  | 'display'
  | 'visibility'
  | 'overflow'
  | 'overflowX'
  | 'overflowY'
  | 'zIndex'
  | 'boxSizing'
> & {
  hidden?: boolean;
};

export const layout = (props: LayoutProps) => ({
  width: props.width || '',
  height: props.height || '',
  maxWidth: props.maxWidth || '',
  maxHeight: props.maxHeight || '',
  minWidth: props.minWidth || '',
  minHeight: props.minHeight || '',
  position: props.position || '',
  display: props.hidden ? 'none' : props.display || '',
  visibility: props.visibility || '',
  overflow: props.overflow || '',
  overflowX: props.overflowX || '',
  overflowY: props.overflowY || '',
  zIndex: props.zIndex || '',
  boxSizing: props.boxSizing || '',
});
