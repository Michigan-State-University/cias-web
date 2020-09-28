import Box from 'components/Box';
import styled from 'styled-components';

export const StyledPreviewButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 1400px) {
    width: 50px;
  }
`;

export const PreviewText = styled.p`
  display: inline;
  @media only screen and (max-width: 1400px) {
    display: none;
  }
`;
