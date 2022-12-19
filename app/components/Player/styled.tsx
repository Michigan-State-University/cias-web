import { ComponentProps, FC } from 'react';
// @ts-ignore
import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

import { margin, MarginProps } from 'components/BaseComponentStyles';

import { ASPECT_RATIO } from './constants';

export type PlayerWrapperProps = MarginProps;

// @ts-ignore
export const PlayerWrapper: FC<PlayerWrapperProps> = styled.div`
  position: relative;
  padding-top: ${ASPECT_RATIO * 100}%;
  height: 100%;
  width: 100%;
  ${margin};
`;

// @ts-ignore
export const StyledReactPlayer: FC<ComponentProps<typeof ReactPlayer>> = styled(
  ReactPlayer,
)`
  position: absolute;
  top: 0;
  left: 0;
`;

export const Blocker = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: not-allowed;
`;
