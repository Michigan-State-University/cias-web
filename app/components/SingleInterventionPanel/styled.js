import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, themeColors } from 'theme';
import { statusTypeToColorMap } from 'models/Status/StatusTypes';

const sharedContainerStyles = `
  padding: 15px;
  height: 150px;
  box-shadow: 0px 4px 20px #e3eefb;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
`;

export const NewInterventionContainer = styled.div`
  ${sharedContainerStyles}
  background: ${themeColors.secondary};
  color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

export const InterventionContainer = styled.div`
  ${sharedContainerStyles}
  background: ${colors.white};
  color: ${colors.black};
  justify-content: space-between;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const Heading = styled.div`
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
`;

export const StatusIndicator = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => statusTypeToColorMap[props.status]};
  display: inline-block;
  margin-left: 5px;
`;

export const Title = styled.div`
  position: relative;
  font-weight: bold;
  font-size: 18px;
  div {
    position: absolute;
    overflow: hidden;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 20px;
  }
  &:hover {
    div {
      z-index: 1;
      background-color: white;
      overflow: visible;
      white-space: initial;
      height: auto;
      box-shadow: 0px 4px 20px #e3eefb;
    }
  }
`;

export const InterventionInfo = styled.div`
  display: flex;
  div {
    padding: 5px 10px;
    background: #e9f1fb;
    font-size: 12px;
    line-height: 16px;
    border-radius: 5px;
  }
`;

export const AddIcon = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${colors.white};
  display: inline-block;
  margin-bottom: 5px;
  color: ${themeColors.secondary};
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
