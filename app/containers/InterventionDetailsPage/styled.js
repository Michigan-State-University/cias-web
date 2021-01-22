import styled from 'styled-components';
import { colors, boxShadows } from 'theme';
import { statusTypeToColorMap } from 'models/Status/StatusTypes';

export const InterventionOptions = styled.div`
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
  display: flex;
  margin-left: 5px;
  min-width: 70px;
  justify-content: center;
  align-content: center;
`;

export const DraggedTest = styled.div`
  .dragged {
    z-index: 10000;
  }
`;
