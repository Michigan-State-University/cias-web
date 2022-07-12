import styled from 'styled-components';
import { ZIndex } from 'theme';

export const Container = styled.div`
  position: relative;
`;

const getVerticalPosition = (right, center) => {
  if (right) return '0';
  if (center) return '50%';
  return '';
};

export const PopupElement = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 8px 10px;
  border-radius: 5px;
  color: white;
  font-size: 12px;
  white-space: nowrap;
  z-index: ${ZIndex.POPUP};
  ${(props) =>
    props.top ? 'bottom: calc(100% + 5px)' : 'top: calc(100% + 5px)'};
  right: ${({ right, center }) => getVerticalPosition(right, center)};
`;
