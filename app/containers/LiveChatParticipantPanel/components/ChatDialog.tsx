import React, { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';

import minimizeIcon from 'assets/svg/minimize.svg';

import Row from 'components/Row';
import ActionIcon from 'components/ActionIcon';

import i18nMessages from '../messages';
import { ParticipantChatDialogContainer } from './styled';

export type Props = PropsWithChildren<{
  header: React.ReactNode;
  onMinimize: () => void;
}>;

const ChatDialog = ({ header, children, onMinimize }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <ParticipantChatDialogContainer>
      <Row align="center" justify="between" gap={12}>
        {header}
        {/* @ts-ignore */}
        <ActionIcon
          iconSrc={minimizeIcon}
          onClick={onMinimize}
          ariaText={formatMessage(i18nMessages.minimizePanelTitle)}
          height={24}
          width={24}
          mr={0}
        />
      </Row>
      {children}
    </ParticipantChatDialogContainer>
  );
};

export default ChatDialog;
