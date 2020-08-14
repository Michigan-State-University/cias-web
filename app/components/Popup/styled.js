import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const PopupElement = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 10px;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  white-space: nowrap;
  z-index: 1;
  ${props =>
    props.top ? 'bottom: calc(100% + 5px)' : 'top: calc(100% + 5px)'};
  ${({ right }) => (right ? 'right: 0' : '')};
  ${({ center }) => (center ? 'right: 50%' : '')};
`;
