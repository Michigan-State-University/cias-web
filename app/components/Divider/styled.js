import styled from 'styled-components';
import { colors } from 'theme';
import { margin, layout } from '../BaseComponentStyles';

export const StyledDivider = styled.div`
  width: 100%;
  height: 0;
  flex: 1;
  border-top: 1px solid ${({ color }) => color};
  ${margin}
  ${layout};
`;

StyledDivider.defaultProps = {
  color: colors.botticelli,
};
