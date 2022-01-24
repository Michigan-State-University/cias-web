import styled from 'styled-components';

import { animationDuration } from 'utils/animationsHelpers/constants';

export const NarratorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  > div {
    transition: all ${animationDuration}ms cubic-bezier(0.65, 0.05, 0.36, 1);
  }
`;

export const TlfbContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
