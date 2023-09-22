import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { InterventionInvitation } from 'models/Intervention';
import { Session } from 'models/Session';

import { colors, themeColors } from 'theme';

import { NoMaxWidthTD, StripedTR } from 'components/Table';
import { EllipsisText } from 'components/Text';
import { TextButton } from 'components/Button';
import Row from 'components/Row';
import { Tooltip } from 'components/Tooltip';
import { CircleCounter } from 'components/CircleCounter';
import Dropdown, { DropdownOption } from 'components/Dropdown';

import messages from './messages';
import { SessionInvitationList } from './SessionInvitationList';

export type Props = {
  email: string;
  groupedInvitations: InterventionInvitation[];
  isModularIntervention: boolean;
  normalizedSessions: Record<Session['id'], Session>;
  invitingPossible: boolean;
  onResendInvitation: (invitationId: string) => void;
};

export const EmailParticipantsTableRow: FC<Props> = ({
  email,
  groupedInvitations,
  isModularIntervention,
  normalizedSessions,
  invitingPossible,
  onResendInvitation,
}) => {
  const { formatMessage } = useIntl();

  const handleResendInvitationsButtonClick = () => {
    const invitationId = groupedInvitations[0].id;
    onResendInvitation(invitationId);
  };

  const resendDropdownOptions: DropdownOption[] = useMemo(() => {
    if (isModularIntervention) return [];
    return groupedInvitations.map(({ id, targetId }) => ({
      id,
      label: normalizedSessions[targetId]?.name,
      action: () => onResendInvitation(id),
    }));
  }, [
    isModularIntervention,
    groupedInvitations,
    normalizedSessions,
    onResendInvitation,
  ]);

  const showDropdown = resendDropdownOptions.length > 1;

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
    >
      <NoMaxWidthTD padding={8} width="50%">
        <EllipsisText text={email} fontSize={15} />
      </NoMaxWidthTD>
      {!isModularIntervention && (
        <NoMaxWidthTD padding={8} width="20%">
          <Row align="center">
            <Tooltip
              id={`session-invitations-count-tooltip-${email}`}
              content={
                <SessionInvitationList
                  groupedInvitations={groupedInvitations}
                  normalizedSessions={normalizedSessions}
                />
              }
            >
              <CircleCounter
                count={groupedInvitations.length}
                size={24}
                bg={themeColors.secondary}
              />
            </Tooltip>
          </Row>
        </NoMaxWidthTD>
      )}
      <NoMaxWidthTD padding={8} width="30%">
        <Row justify="end">
          {showDropdown && (
            // @ts-ignore
            <Dropdown
              id={`resend-invitation-options-${email}`}
              disabled={!invitingPossible}
              options={resendDropdownOptions}
              trigger="button"
              buttonTriggerTitle={formatMessage(
                messages.resendInvitationButtonLabel,
              )}
              dropdownTitle={formatMessage(messages.dropdownTitle)}
            />
          )}
          {!showDropdown && (
            // TODO add loader
            <TextButton
              buttonProps={{
                color: themeColors.secondary,
              }}
              disabled={!invitingPossible}
              onClick={handleResendInvitationsButtonClick}
            >
              {formatMessage(messages.resendInvitationButtonLabel)}
            </TextButton>
          )}
        </Row>
      </NoMaxWidthTD>
    </StripedTR>
  );
};
