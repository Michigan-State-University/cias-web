import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, themeColors, boxShadows } from 'theme';
import { statusTypeToColorMap } from 'models/Status/StatusTypes';

const sharedContainerStyles = `
  padding: 15px;
  height: 150px;
  box-shadow: ${boxShadows.selago};
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  color: ${themeColors.text};
`;

export const TileContainer = styled.div`
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
  span {
    color: ${themeColors.text};
  }
`;

export const StatusIndicator = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => statusTypeToColorMap[props.status]};
  display: inline-block;
  margin-left: 5px;
`;

export const TileInfo = styled.div`
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
