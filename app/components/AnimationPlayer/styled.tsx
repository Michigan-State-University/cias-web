// @ts-ignore
import styled from 'styled-components';

import { CharacterConfig } from 'models/Character';

import { ZIndex, colors } from 'theme';

export type AnimationBorderProps = Pick<CharacterConfig, 'size' | 'border'>;

// @ts-ignore
export const AnimationBorder = styled.div`
  position: absolute;
  z-index: ${ZIndex.ANIMATION_BORDER};
  width: ${({ size }: AnimationBorderProps) => size.width}px;
  height: ${({ size }: AnimationBorderProps) => size.height}px;
  border-color: ${colors.azureishWhite};
  border-style: solid;
  border-width: ${({ border }: AnimationBorderProps) => border?.width}px;
  border-radius: ${({ border }: AnimationBorderProps) => border?.radius}px;
`;
