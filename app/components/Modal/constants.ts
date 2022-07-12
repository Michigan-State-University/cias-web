import { CSSProperties } from 'react';

import { ZIndex } from 'theme';

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
  zIndex: ZIndex.POPOVER_MODAL,
  position: 'relative',
};
