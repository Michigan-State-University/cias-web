import React from 'react';

import { PlayerWrapper, PlayerWrapperProps, StyledReactPlayer } from './styled';

export type Props = {
  videoUrl: string;
} & PlayerWrapperProps;

const Player = ({ videoUrl, ...props }: Props) => (
  <PlayerWrapper {...props}>
    <StyledReactPlayer
      url={videoUrl}
      controls
      width="100%"
      height="100%"
      playsinline
    />
  </PlayerWrapper>
);

export default Player;
