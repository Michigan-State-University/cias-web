import styled from 'styled-components';
import { themeColors } from 'theme';

export const ErrorText = styled.div`
  color: ${themeColors.warning};
  font-size: 0.8rem;
  font-weight: bold;
`;

export const StyledLabel = styled.label`
  display: flex;
  align-items: center;
`;
