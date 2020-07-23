import styled from 'styled-components';

import Text from 'components/Text';
import { colors } from 'theme';

export const Divider = styled.div`
  height: 0;
  flex: 1;
  border: 1px solid ${colors.botticelli};
  margin-top: 40px;
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '')};
  margin-left: ${({ ml }) => (ml ? `${ml}px` : '')};
`;

export const Or = styled(Text)`
  align-self: flex-end;
  line-height: 17px;
`;
