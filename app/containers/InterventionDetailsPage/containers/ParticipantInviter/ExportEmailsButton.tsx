import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
import groupBy from 'lodash/groupBy';

import CsvIcon from 'assets/svg/csv-file.svg';

import { themeColors } from 'theme';

import { InterventionInvitation } from 'models/Intervention';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';
import Dropdown, { DropdownOption } from 'components/Dropdown';

import messages from './messages';
import { NormalizedSessions } from './types';

const TEXT_BUTTON_PROPS = {
  color: themeColors.secondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  gap: 5,
  px: 12,
};

export type Props = {
  invitations: InterventionInvitation[];
  isModularIntervention: boolean;
  normalizedSessions: NormalizedSessions;
};

export const ExportEmailsButton: FC<Props> = ({
  invitations,
  isModularIntervention,
  normalizedSessions,
}) => {
  const { formatMessage } = useIntl();

  const handleExport = (targetId: string) => {
    console.log(targetId);
  };

  const invitationsGroupedByTarget = useMemo(
    () => Object.entries(groupBy(invitations, 'targetId')),
    [invitations],
  );

  const exportDropdownOptions: DropdownOption[] = useMemo(() => {
    if (isModularIntervention) return [];
    return invitationsGroupedByTarget.map(([sessionId]) => ({
      id: sessionId,
      label: normalizedSessions[sessionId]?.name,
      action: () => handleExport(sessionId),
    }));
  }, [isModularIntervention, invitationsGroupedByTarget, normalizedSessions]);

  const showDropdown = exportDropdownOptions.length > 1;

  return (
    <>
      {!showDropdown && (
        <TextButton
          onClick={() => handleExport(invitationsGroupedByTarget[0][0])}
          buttonProps={TEXT_BUTTON_PROPS}
        >
          <Icon src={CsvIcon} />
          {formatMessage(messages.exportEmailsButtonTitle)}
        </TextButton>
      )}
      {showDropdown && (
        // @ts-ignore
        <Dropdown
          id="export-invitations-emails-options"
          options={exportDropdownOptions}
          trigger="button"
          buttonTriggerTitle={
            <>
              <Icon src={CsvIcon} />
              {formatMessage(messages.exportEmailsButtonTitle)}
            </>
          }
          buttonTriggerProps={TEXT_BUTTON_PROPS}
          dropdownTitle={formatMessage(messages.exportDropdownTitle)}
        />
      )}
    </>
  );
};
