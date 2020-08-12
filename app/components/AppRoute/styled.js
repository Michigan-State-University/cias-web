import styled from 'styled-components';

import { elements } from 'theme';

export const MainAppContainer = styled.div`
  margin-top: ${elements.navbarHeight}px;
  height: calc(100% - ${elements.navbarHeight}px);
`;
