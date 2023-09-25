import styled from 'styled-components';

import { padding } from 'components/BaseComponentStyles';

const TD = styled.td`
  ${padding};
`;

const NoMaxWidthTD = styled(TD)`
  max-width: 0;
`;

export { TD, NoMaxWidthTD };
