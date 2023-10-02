import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import TriangleBackIcon from 'assets/svg/triangle-back.svg';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';
import Row from 'components/Row';

import { ParticipantInvitationType } from './types';
import messages from './messages';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  invitationType: ParticipantInvitationType;
  onBack: () => void;
};

export const BackButton: FC<Props> = ({ invitationType, onBack }) => {
  const { formatMessage } = useIntl();

  return (
    <Row>
      <TextButton onClick={() => onBack()} buttonProps={TEXT_BUTTON_PROPS}>
        <Icon src={TriangleBackIcon} />
        {formatMessage(messages.backButtonTitle, { invitationType })}
      </TextButton>
    </Row>
  );
};
