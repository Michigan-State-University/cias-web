import styled from 'styled-components';

export const NarratorContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: 1500;
  > div {
    cursor: ${props => (props.canBeDragged ? 'grab' : 'default')};
  }
`;
