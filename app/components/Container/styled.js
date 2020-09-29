import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container } from 'react-grid-system';

const StyledContainer = styled(Container)`
  max-width: ${({ $maxWidth }) => $maxWidth} !important;
  width: ${({ $width }) => $width};
`;

StyledContainer.propTypes = {
  $maxWidth: PropTypes.string,
};

export default StyledContainer;
