import styled from 'styled-components';
import { themeColors, colors } from 'theme';

export const NewInterventionFloatButton = styled.div`
  position: fixed;
  right: 115px;
  cursor: pointer;
  bottom: 20px;
  background: ${themeColors.secondary};
  color: white;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AddIcon = styled.div`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: ${colors.white};
  display: inline-block;
  color: ${themeColors.secondary};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

export const InitialRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ArchivedButton = styled.div`
  display: flex;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
  &:hover {
    cursor: pointer;
  }
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
  box-shadow: 0px 4px 20px #e3eefb;
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
