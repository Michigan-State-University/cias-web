import React from 'react';

import {
  PlayerWrapper,
  PlayerWrapperProps,
  StyledReactPlayer,
  Blocker,
} from './styled';

export type Props = {
  videoUrl: string;
  disabled: boolean;
} & PlayerWrapperProps;

const Player = ({ videoUrl, disabled = false, ...props }: Props) => (
  <PlayerWrapper {...props}>
    <StyledReactPlayer
      url={videoUrl}
      controls
      width="100%"
      height="100%"
      playsinline
    />
    {/* Blocks the player clicking when the player is disabled */}
    {disabled && <Blocker />}
  </PlayerWrapper>
);

export default Player;
