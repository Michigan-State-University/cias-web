import styled from 'styled-components';
import { Container } from 'react-grid-system';

import { boxShadows, colors, themeColors } from 'theme';

import Notification from 'components/Notification';

export const InitialRow = styled(Container)`
  padding: 0 !important;
  margin-top: 10px;
  width: 100%;
`;

export const StatusLabel = styled.button`
  border: none;
  width: max-content;
  display: flex;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  border-radius: 5px;
  background: ${(props) =>
    props.active ? props.color || themeColors.highlight : colors.heather};
  color: ${(props) => props.active && colors.white};
  box-shadow: ${boxShadows.selago};
  transition: 0.3s;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    outline-offset: 0px;
  }
`;

export const FilterText = styled.p`
  color: ${(props) => (props.active ? colors.white : props.color)};
  white-space: pre;
`;

export const StyledLink = styled.a`
  color: ${themeColors.secondary};
`;

export const StyledNotification = styled(Notification)`
  position: absolute;
  right: 16px;
  top: 16px;
`;
