import styled from 'styled-components';
import { colors } from 'theme';

import Row from 'components/Row';

export const QuestionsRow = styled(Row)`
  transition: left 0.4s ease;
  @media only screen and (max-width: 1400px) {
    position: fixed;
    z-index: 2;
    height: calc(100% - 70px);
    left: -350px;
    ${({ isVisible }) => isVisible && 'left: 0;'}
  }
`;

export const ShowListButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border-width: 0;
  background-color: ${colors.white};
  border-radius: 0 5px 5px 0;
  box-shadow: -20px 0 20px rgba(0, 0, 0, 0.08);
  width: 60px;
  height: 28px;
  position: relative;
  top: 10px;
  transform: rotate(180deg);
  @media only screen and (min-width: 1400px) {
    display: none;
  }
`;
