import React, { FC, useState } from 'react';
import { useIntl } from 'react-intl';

import MailIcon from 'assets/svg/pink-mail.svg';

import { InterventionStatus, InterventionType } from 'models/Intervention';
import { Session } from 'models/Session';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';

import messages from './messages';
import { InviteParticipantsModal } from './InviteParticipantsModal';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  interventionId: string;
  interventionName: string;
  organizationId: Nullable<string>;
  interventionStatus: InterventionStatus;
  interventionType: InterventionType;
  sessions: Session[];
};

export const ParticipantsInviter: FC<Props> = ({ ...props }) => {
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
        buttonProps={TEXT_BUTTON_PROPS}
      >
        {formatMessage(messages.participantsInviterButtonTitle)}
        <Icon src={MailIcon} />
      </TextButton>
    </>
  );
};
