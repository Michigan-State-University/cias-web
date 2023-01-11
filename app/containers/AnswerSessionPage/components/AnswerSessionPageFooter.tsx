import React from 'react';
import { useIntl } from 'react-intl';

import GearIcon from 'assets/svg/gear-2.svg';
import AccessibeIcon from 'assets/svg/accessibe.svg';
import ChatIconActive from 'assets/svg/chat-active.svg';

import Icon from 'components/Icon';
import { TextButton } from 'components/Button';
import Text from 'components/Text';
import { ModalType, useModal } from 'components/Modal';
import { Tooltip } from 'components/Tooltip';
import Row from 'components/Row';

import { FooterContainer } from '../styled';
import { ParticipantSessionSettings } from '../types';
import messages from '../messages';
import ParticipantSessionSettingsModalUI from './ParticipantSessionSettingsModalUI';

export type Props = {
  settings: ParticipantSessionSettings;
  isMobilePreview: boolean;
  isPreview: boolean;
};

const AnswerSessionPageFooter = ({
  settings,
  isMobilePreview,
  isPreview,
}: Props) => {
  const { formatMessage } = useIntl();

  const { openModal, Modal } = useModal<ParticipantSessionSettings>({
    type: ModalType.Modal,
    props: {
      visible: true,
      title: formatMessage(messages.settings),
      titleProps: {
        fontSize: 20,
        lineHeight: 1,
      },
      maxWidth: 400,
      px: 32,
      py: 32,
    },
    modalContentRenderer: ParticipantSessionSettingsModalUI,
  });

  return (
    <>
      <FooterContainer isMobilePreview={isMobilePreview}>
        <Row gap={16} align="center">
          {isMobilePreview && (
            <Tooltip
              id="accessibe-icon-mock-tooltip"
              text={formatMessage(messages.featureUnavailable)}
            >
              <Icon
                src={AccessibeIcon}
                alt={formatMessage(messages.accessiBeIconAlt)}
                // @ts-ignore
                disabled
              />
            </Tooltip>
          )}
          <TextButton
            onClick={() => openModal(settings)}
            buttonProps={{ display: 'flex', align: ' center', gap: 8 }}
          >
            <Icon
              alt={formatMessage(messages.settingsIconAlt)}
              src={GearIcon}
            />
            <Text fontSize={15}>{formatMessage(messages.settings)}</Text>
          </TextButton>
        </Row>
        {isPreview && (
          <Tooltip
            id="live-chat-icon-mock-tooltip"
            text={formatMessage(messages.featureUnavailable)}
          >
            <Icon
              src={ChatIconActive}
              alt={formatMessage(messages.liveChatIconAlt)}
              // @ts-ignore
              disabled
            />
          </Tooltip>
        )}
      </FooterContainer>
      <Modal />
    </>
  );
};

export default AnswerSessionPageFooter;
