import React, { FC, useState } from 'react';
import { useIntl } from 'react-intl';

import MailIcon from 'assets/svg/pink-mail.svg';

import { themeColors } from 'theme';

import { InterventionStatus } from 'models/Intervention';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';

import messages from './messages';
import { InviteParticipantsModal } from './InviteParticipantsModal';

export type Props = {
  organizationId: Nullable<string>;
  interventionStatus: InterventionStatus;
};

export const InviteParticipantsButton: FC<Props> = ({ organizationId }) => {
  const { formatMessage } = useIntl();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <InviteParticipantsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        organizationId={organizationId}
      />
      <TextButton
        onClick={() => setModalVisible(true)}
        buttonProps={{
          color: themeColors.secondary,
          minWidth: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {formatMessage(messages.inviteParticipantsButtonTitle)}
        <Icon ml={5} src={MailIcon} />
      </TextButton>
    </>
  );
};
