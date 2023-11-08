import React, { FC, useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import groupBy from 'lodash/groupBy';
import { unparse } from 'papaparse';

import CsvIcon from 'assets/svg/csv-file.svg';

import { InterventionInvitation } from 'models/Intervention';

import { FileDownloaderFactory } from 'utils/fileDownloader';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';
import Dropdown, { DropdownOption } from 'components/Dropdown';

import messages from './messages';
import {
  EmailsCsvRow,
  NormalizedHealthClinicsInfos,
  NormalizedSessions,
} from './types';
import { CSV_BUTTON_PROPS } from './constants';

export type Props = {
  invitations: InterventionInvitation[];
  isModularIntervention: boolean;
  normalizedSessions: NormalizedSessions;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
  interventionName: string;
};

export const ExportEmailsButton: FC<Props> = ({
  invitations,
  isModularIntervention,
  normalizedSessions,
  normalizedHealthClinicsInfos,
  interventionName,
}) => {
  const { formatMessage } = useIntl();

  const invitationsGroupedByTarget = useMemo(
    () => Object.entries(groupBy(invitations, 'targetId')),
    [invitations],
  );

  const handleExport = useCallback(
    (targetId: string) => {
      const targetInvitations =
        invitationsGroupedByTarget.find(([id]) => id === targetId)?.[1] ?? [];

      const exportData = targetInvitations.map(({ email, healthClinicId }) => {
        const row: EmailsCsvRow = { email };
        if (healthClinicId) {
          const { healthClinicName } =
            normalizedHealthClinicsInfos[healthClinicId];
          row.healthClinicId = healthClinicId;
          row.healthClinicName = healthClinicName;
        }
        return row;
      });

      const fileContent = unparse(exportData);
      const fileName = formatMessage(messages.emailsCsvFileName, {
        name: isModularIntervention
          ? interventionName
          : normalizedSessions[targetId]?.name,
      });
      const fileDownloader = FileDownloaderFactory.stringFileDownloader();
      fileDownloader.download(fileContent, `${fileName}.csv`, 'text/csv');
    },
    [
      invitationsGroupedByTarget,
      isModularIntervention,
      interventionName,
      normalizedSessions,
    ],
  );

  const exportDropdownOptions: DropdownOption[] = useMemo(() => {
    if (isModularIntervention) return [];
    return invitationsGroupedByTarget.map(([sessionId]) => ({
      id: sessionId,
      label: normalizedSessions[sessionId]?.name,
      action: () => handleExport(sessionId),
    }));
  }, [
    isModularIntervention,
    invitationsGroupedByTarget,
    normalizedSessions,
    handleExport,
  ]);

  const showDropdown = exportDropdownOptions.length > 1;

  return (
    <>
      {!showDropdown && (
        <TextButton
          onClick={() => handleExport(invitationsGroupedByTarget[0][0])}
          buttonProps={CSV_BUTTON_PROPS}
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
          trigger="text-button"
          buttonTriggerTitle={
            <>
              <Icon src={CsvIcon} />
              {formatMessage(messages.exportEmailsButtonTitle)}
            </>
          }
          buttonTriggerProps={CSV_BUTTON_PROPS}
          dropdownTitle={formatMessage(messages.exportDropdownTitle)}
        />
      )}
    </>
  );
};
