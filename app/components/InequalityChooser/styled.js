import styled from 'styled-components';
import { StyledInput } from 'components/Input/StyledInput';

export const CaseInput = styled(StyledInput)`
  width: ${({ width }) => (width ? `${width}px` : '50px')};
`;
