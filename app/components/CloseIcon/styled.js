import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from 'theme';

const COMMONS = css`
  height: 28px;
  width: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background: ${colors.linkWater};
  margin-right: 35px;
  cursor: pointer;
`;

export const CrossLink = styled(Link)`
  ${COMMONS};
`;

export const CrossButton = styled.button`
  ${COMMONS};
  border: none;
  outline: none;
`;
