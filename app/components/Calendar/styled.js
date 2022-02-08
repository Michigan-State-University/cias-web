import styled from 'styled-components';

import { CALENDAR_HEIGHT } from './constants';

export const Container = styled.div`
  height: ${CALENDAR_HEIGHT};

  ${({ mobile }) =>
    mobile &&
    `
      height: auto;
    `}
`;
