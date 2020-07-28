import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

const aspectRatio = 9 / 16;

export const PlayerWrapper = styled.div`
  position: relative;
  padding-top: ${aspectRatio * 100}%;
  height: 100%;
  width: 100%;
`;

export const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;
