import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

// 16/9 ratio
export const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  height: 100%;
  width: 95%;
`;

export const Player = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;
