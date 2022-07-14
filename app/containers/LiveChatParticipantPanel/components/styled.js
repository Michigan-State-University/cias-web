import styled from 'styled-components';

import { colors } from 'theme';

import Column from 'components/Column';

export const ChatIconButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 0;
`;

export const ParticipantChatDialogContainer = styled(Column)`
  padding: 16px 16px 0 16px;
  border-radius: 16px;
  border: 1px solid ${colors.linkWater};
  box-shadow: 0 4px 20px ${colors.selago};
  background-color: ${colors.white};
  width: 100%;
  height: 550px;
  min-height: 0;
`;
