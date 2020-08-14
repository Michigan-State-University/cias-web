import styled from 'styled-components';
import { themeColors, colors, boxShadows } from 'theme';

export const StatusLabel = styled.button`
  border: none;
  display: flex;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  border-radius: 5px;
  background: ${props =>
    props.active ? themeColors.primary : props.color || themeColors.highlight};
  color: ${props => props.active && colors.white};
  box-shadow: ${boxShadows.selago};
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    background: ${themeColors.primary};
    color: ${colors.white};
  }
  &:focus {
    outline: none;
    outline-offset: 0px;
  }
`;
