import styled from 'styled-components';
import Box from 'components/Box';

export const StyledBox = styled(Box)`
  box-shadow: -20px 0px 20px rgba(0, 0, 0, 0.08);
  z-index: 1;
  transition: all 0.4s ease;
  ${({ isVisible }) =>
    isVisible ? {} : { width: 0, '& > *': { display: 'none' } }};
`;
