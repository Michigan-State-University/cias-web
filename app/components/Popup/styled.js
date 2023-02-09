import styled from 'styled-components';
import { ZIndex } from 'theme';

export const Container = styled.div`
  position: relative;
`;

const getHorizontalPosition = (horizontalPosition) => {
  switch (horizontalPosition) {
    case 'right':
      return '0';
    case 'center':
      return '50%';
    case 'left':
      return '100%';
    default:
      break;
  }
};

const getVerticalPosition = (verticalPosition) => {
  switch (verticalPosition) {
    case 'top':
      return 'bottom: calc(100% + 5px)';
    case 'center':
      return 'top: 0';
    case 'bottom':
      return 'top: calc(100% + 5px)';
    default:
      break;
  }
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
  ${({ verticalPosition }) => getVerticalPosition(verticalPosition)};
  right: ${({ horizontalPosition }) =>
    getHorizontalPosition(horizontalPosition)};
`;
