import styled from 'styled-components';

export const TableLoadingContainer = styled.div`
  position: relative;
`;

export const TableLoader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;
