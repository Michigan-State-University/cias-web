import { FC } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import Column from 'components/Column';
import Text from 'components/Text';

import { ParticipantInvitationType } from './types';
import messages from './messages';
import { InviteParticipantsButton } from './InviteParticipantsButton';

export type Props = {
  invitationType: ParticipantInvitationType;
  onInvite: (invitationType: ParticipantInvitationType) => void;
  invitingPossible: boolean;
  invitingNotPossibleMessage?: string;
};

export const NoParticipantsInfo: FC<Props> = ({
  invitationType,
  onInvite,
  invitingPossible,
  invitingNotPossibleMessage,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Column flex={1} justify="center" align="center" gap={24}>
      <Text fontSize={15} fontWeight="bold" lineHeight={1.35}>
        {formatMessage(messages.noParticipantsInfo, { invitationType })}
      </Text>
      <InviteParticipantsButton
        invitationType={invitationType}
        onInvite={onInvite}
        disabled={!invitingPossible}
      />
      {!invitingPossible && invitingNotPossibleMessage && (
        <Text color={themeColors.text} textOpacity={0.7}>
          {invitingNotPossibleMessage}
        </Text>
      )}
    </Column>
  );
};
