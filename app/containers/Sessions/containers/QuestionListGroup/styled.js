import styled from 'styled-components';
import { colors, paddings } from 'theme';

export const DraggableContainer = styled.div`
  width: 100%;
`;

export const Spacer = styled.div`
  height: 1px;
  width: calc(100% + ${paddings.regular} * 2);
  margin-left: -${paddings.regular};
  background-color: ${colors.linkWater};
`;
