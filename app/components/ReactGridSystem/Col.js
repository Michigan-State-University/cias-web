import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col as GCol } from 'react-grid-system';

import { margin, layout, flex } from 'components/BaseComponentStyles';

export const Col = styled(GCol)`
  display: flex;
  flex-direction: column;
  ${layout};
  ${margin};
  ${flex};
`;

Col.propTypes = {
  align: PropTypes.oneOf([
    'stretch',
    'center',
    'start',
    'end',
    'baseline',
    'initial',
    'inherit',
  ]),
};

Col.defaultProps = {
  align: 'start',
};
