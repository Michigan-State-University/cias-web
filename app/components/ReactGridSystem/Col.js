import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col as GCol } from 'react-grid-system';

const mapFlexProperties = property => {
  switch (property) {
    case 'start':
      return 'flex-start';
    case 'end':
      return 'flex-end';

    default:
      return property;
  }
};

export const Col = styled(GCol)`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => mapFlexProperties(align ?? 'flex-start')};
`;

Col.propTypes = {
  align: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'start',
    'flex-end',
    'end',
    'baseline',
    'initial',
    'inherit',
  ]),
};

Col.defaultProps = {
  align: 'flex-start',
};
