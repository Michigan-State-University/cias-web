import styled from 'styled-components';
import Box from 'components/Box';

export const SettingsBar = styled(Box)``;

export const Container = styled(Box)`
  transition: width 0.4s ease;
  box-shadow: -20px 0px 20px rgba(0, 0, 0, 0.08);
  z-index: 1;
  ${({ isVisible }) => (isVisible ? 'width: 300px;' : 'width: 0;')};
`;
