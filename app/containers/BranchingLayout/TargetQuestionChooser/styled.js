import styled from 'styled-components';
import Row from 'components/Row';
import { colors, themeColors } from 'theme';

export const FinishGroupItemStyled = styled(Row)`
  border-radius: 5px;
  background-color: ${({ selected }) =>
    selected ? themeColors.primary : colors.grey};
  transition: 0.2s;
  &:hover {
    background-color: ${themeColors.primary};
  }
`;
