import styled from 'styled-components';

import { colors, themeColors } from 'theme';

import Box from 'components/Box';
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

export const LinkPrimaryUnderline = styled.a`
  text-decoration-color: ${themeColors.primary};
`;

export const BoxWithUnderShadow = styled(Box)`
  position: absolute;
  background-color: ${colors.white};
  width: calc(100% - 32px);
  margin-top: 42px;
  padding: 0 16px;
  border-bottom: 1px solid ${colors.linkWater};
  border-radius: 0;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 140px;

    background: linear-gradient(
      0deg,
      ${colors.white} -67.02%,
      transparent 91.49%
    );

    transform: matrix(1, 0, 0, -1, 0, 0);
  }
`;
