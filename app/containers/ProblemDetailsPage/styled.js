import styled from 'styled-components';
import { colors, boxShadows } from 'theme';
import { statusTypeToColorMap } from 'models/Status/StatusTypes';

export const InterventionOptions = styled.div`
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.white};
  border-radius: 5px;
  box-shadow: ${boxShadows.selago};
`;

export const StatusLabel = styled.div`
  color: white;
  padding: 7px 10px;
  border-radius: 5px;
  background: ${props => statusTypeToColorMap[props.status]};
  display: inline-block;
  margin-left: 5px;
`;
