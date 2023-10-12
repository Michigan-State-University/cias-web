import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import BackButton from 'components/BackButton';
import Row from 'components/Row';

import { ParticipantInvitationType } from './types';
import messages from './messages';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  invitationType: ParticipantInvitationType;
  onBack: () => void;
};

export const InviteParticipantsModalBackButton: FC<Props> = ({
  invitationType,
  onBack,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Row>
      <BackButton onClick={() => onBack()} {...TEXT_BUTTON_PROPS}>
        {formatMessage(messages.backButtonTitle, { invitationType })}
      </BackButton>
    </Row>
  );
};
