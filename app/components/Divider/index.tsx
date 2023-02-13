import { CSSProperties, FC } from 'react';
// @ts-ignore
import styled, { css } from 'styled-components';

import { colors } from 'theme';

import {
  margin,
  layout,
  LayoutProps,
  MarginProps,
} from 'components/BaseComponentStyles';

export enum Orientation {
  HORIZONTAL,
  VERTICAL,
}

export type DividerProps = {
  color?: CSSProperties['borderColor'];
  orientation?: Orientation;
} & MarginProps &
  LayoutProps &
  JSX.IntrinsicElements['div'];

// @ts-ignore
const Divider: FC<DividerProps> = styled.div`
  flex: 1;
  ${({ orientation = Orientation.HORIZONTAL }: DividerProps) =>
    orientation === Orientation.HORIZONTAL
      ? css`
          border-top: 1px solid;
          width: 100%;
          height: 0;
        `
      : css`
          border-right: 1px solid;
        `}
  border-color: ${({ color = colors.botticelli }: DividerProps) => color};
  ${margin}
  ${layout};
`;

export default Divider;
