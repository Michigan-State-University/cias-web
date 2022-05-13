import styled from 'styled-components';
import { colors, paddings } from 'theme';

import Row from 'components/Row';
import { ShowHiddenContentButton } from 'components/ShowHiddenContentButton';

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

export const ShowListButton = styled(ShowHiddenContentButton)`
  position: relative;
  top: 16px;
  transform: rotate(180deg);
  box-shadow: -20px 0 20px rgba(0, 0, 0, 0.08);
  @media only screen and (min-width: 1400px) {
    display: none;
  }
`;

export const StyledQuestionTypeChooser = styled.div`
  padding: 10px;
  width: 100%;
`;

export const Spacer = styled.div`
  height: 1px;
  width: calc(100% + ${paddings.regular} * 2);
  margin-left: -${paddings.regular};
  background-color: ${colors.linkWater};
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 8px;
`;
