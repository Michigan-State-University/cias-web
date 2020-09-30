import styled from 'styled-components';
import PropTypes from 'prop-types';

import { TH } from 'components/Table';

export const FirstTH = styled(TH)`
  ${({ isFixed, left }) =>
    isFixed && {
      position: 'absolute',
      left: `${left}px`,
      height: 'inherit',
    }};
`;

FirstTH.propTypes = {
  isFixed: PropTypes.bool,
};
