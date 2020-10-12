import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TH } from 'components/Table';

export const FirstTH = styled(TH)`
  ${({ isFixed }) =>
    isFixed && {
      position: 'sticky',
      left: 0,
      backgroundColor: 'inherit',
    }};
`;

FirstTH.propTypes = {
  isFixed: PropTypes.bool,
};
