import styled from 'styled-components';
import Box from 'components/Box';

export const SettingsBar = styled(Box)`
  overflow-x: auto;
`;

export const Container = styled(Box)`
  transition: width 0.4s ease;
  box-shadow: -20px 0px 20px rgba(0, 0, 0, 0.08);
  z-index: 1;
  ${({ isVisible }) => (isVisible ? 'width: 400px;' : 'width: 0;')};
  position: relative;
`;
