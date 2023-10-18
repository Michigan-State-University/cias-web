import React, { FC, memo, useMemo } from 'react';
import { useIntl } from 'react-intl';
import uniqBy from 'lodash/uniqBy';

import { InterventionInvitation } from 'models/Intervention';

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
import { NormalizedSessions } from './types';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  healthClinicId: Nullable<string>;
  email: string;
  groupedInvitations: InterventionInvitation[];
  isModularIntervention: boolean;
  normalizedSessions: NormalizedSessions;
  invitingPossible: boolean;
  onResendInvitation: (invitationId: string) => void;
  resendLoading: boolean;
};

const EmailParticipantsTableRowComponent: FC<Props> = ({
  healthClinicId,
  email,
  groupedInvitations,
  isModularIntervention,
  normalizedSessions,
  invitingPossible,
  onResendInvitation,
  resendLoading,
}) => {
  const { formatMessage } = useIntl();

  const uniqueInvitations = useMemo(
    () => uniqBy(groupedInvitations, 'targetId'),
    [groupedInvitations],
  );

  const handleResendInvitationsButtonClick = () => {
    const invitationId = uniqueInvitations[0].id;
    onResendInvitation(invitationId);
  };

  const resendDropdownOptions: DropdownOption[] = useMemo(
    () =>
      uniqueInvitations.map(({ id, targetId }) => ({
        id,
        label: normalizedSessions[targetId]?.name,
        action: () => onResendInvitation(id),
      })),
    [uniqueInvitations, normalizedSessions, onResendInvitation],
  );

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
              id={`session-invitations-count-tooltip-${email}-${
                healthClinicId ?? ''
              }`}
              content={
                <SessionInvitationList
                  groupedInvitations={uniqueInvitations}
                  normalizedSessions={normalizedSessions}
                />
              }
            >
              <CircleCounter
                count={uniqueInvitations.length}
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
              id={`resend-invitation-options-${email}-${healthClinicId ?? ''}`}
              disabled={!invitingPossible}
              options={resendDropdownOptions}
              trigger="button"
              buttonTriggerTitle={formatMessage(
                messages.resendInvitationButtonLabel,
              )}
              dropdownTitle={formatMessage(messages.resendDropdownTitle)}
              loading={resendLoading}
            />
          )}
          {!showDropdown && (
            <TextButton
              buttonProps={TEXT_BUTTON_PROPS}
              disabled={!invitingPossible}
              loading={resendLoading}
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

export const EmailParticipantsTableRow = memo(
  EmailParticipantsTableRowComponent,
);
