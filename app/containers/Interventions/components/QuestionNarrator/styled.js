import styled from 'styled-components';

export const NarratorContainer = styled.div`
  position: absolute;
  width: 100px;
  width: 100px;
  margin-left: 50px;
  z-index: 1500;
  > div {
    cursor: ${props => (props.canBeDragged ? 'grab' : 'default')};
  }
`;
