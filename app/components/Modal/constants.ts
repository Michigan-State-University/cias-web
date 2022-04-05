import { CSSProperties } from 'react';

export const DIM_Z_INDEX = 10;
export const POPOVER_Z_INDEX = 11;

export const MODAL_TITLE_ID = 'modal-title';
export const MODAL_DESCRIPTION_ID = 'modal-description';

export const popoverMainAxisPlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export const popoverCrossAxisPlacement = {
  top: 'right',
  bottom: 'left',
  left: 'top',
  right: 'bottom',
};

export const DIM_ELEMENT_STYLE: Partial<CSSProperties> = {
  zIndex: POPOVER_Z_INDEX,
  position: 'relative',
};
