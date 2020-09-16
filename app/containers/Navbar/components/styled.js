import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { themeColors } from 'theme';
import { margin } from 'components/BaseComponentStyles';

export const StyledLink = styled(Link)`
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

export const SaveInfoContainer = styled.div`
  width: 110px;
`;

export const SavingContainer = styled.div`
  display: flex;
  align-items: center;
  div {
    margin: 0 5px;
  }
`;

export const CheckBackground = styled.div`
  background-color: ${themeColors.primary};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 5px;
`;

export const NavbarTabLink = styled(Link)`
  text-decoration: none;
  ${props =>
    props.active &&
    `
      border-bottom: 2px solid ${themeColors.secondary};
    `}
  span {
    ${props =>
      !props.active &&
      `
        opacity: 0.6  ;
      `}
  }
  ${margin};
`;
