import styled from 'styled-components';
import { themeColors } from 'theme';
import { Link } from 'react-router-dom';
import H2 from 'components/H2';
import { ToggleableBox } from './styled';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    ${H2} {
      color: ${themeColors.secondary} !important;
    }

    ${ToggleableBox} {
      background-color: black !important;
    }
  }
`;

export default StyledLink;
