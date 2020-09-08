import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { margin, layout, padding, flex } from 'components/BaseComponentStyles';
import { themeColors } from 'theme';
export const StyledLink = styled(Link)`
  outline: none;
  border: none;
  background: transparent;
  font-weight: bold;
  font-size: 13px;
  line-height: 17px;
  color: ${themeColors.secondary};
  cursor: pointer;
  text-decoration: none;
`;

export const LinkContainer = styled.div`
  ${margin};
  ${padding};
  ${flex};
  ${layout};
`;
