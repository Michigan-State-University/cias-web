import React, { FC, useState } from 'react';
import { useIntl } from 'react-intl';

import MailIcon from 'assets/svg/pink-mail.svg';

import { themeColors } from 'theme';

import { InterventionStatus, InterventionType } from 'models/Intervention';
import { Session } from 'models/Session';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';

import messages from './messages';
import { InviteParticipantsModal } from './InviteParticipantsModal';

export type Props = {
  interventionId: string;
  organizationId: Nullable<string>;
  interventionStatus: InterventionStatus;
  interventionType: InterventionType;
  sessions: Session[];
};

export const InviteParticipantsButton: FC<Props> = ({ ...props }) => {
  const { formatMessage } = useIntl();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <InviteParticipantsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        {...props}
      />
      <TextButton
        onClick={() => setModalVisible(true)}
        buttonProps={{
          color: themeColors.secondary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          gap: 5,
        }}
      >
        {formatMessage(messages.inviteParticipantsButtonTitle)}
        <Icon src={MailIcon} />
      </TextButton>
    </>
  );
};
