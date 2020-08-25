import styled from 'styled-components';
import { boxShadows, colors, themeColors } from 'theme';

export const InitialRow = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

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

export const ArchiveFilter = styled.button`
  border: none;
  background-color: transparent;
  font-weight: bold;
  outline: none;
  font-size: 13px;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    outline-offset: 0px;
  }
`;
