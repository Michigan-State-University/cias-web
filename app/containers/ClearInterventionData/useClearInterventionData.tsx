import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';

import { InterventionStatus, SensitiveDataState } from 'models/Intervention';
import { canClearInterventionData } from 'models/Status/statusPermissions';

import { ModalProps, ModalType, useModal } from 'components/Modal';

import messages from './messages';
import { CLEAR_COLLECTED_DATA_MODAL_WIDTH } from './constants';
import { ClearInterventionDataModalContent } from './ClearInterventionDataModalContent';
import { ClearInterventionDataModalState } from './types';

export const useClearInterventionData = (
  interventionStatus: InterventionStatus,
  interventionId: string,
  hasCollaborators: boolean,
  isCurrentUserEditor: boolean,
  sensitiveDataState: SensitiveDataState,
  clearSensitiveDataScheduledAt: Nullable<string>,
) => {
  const { formatMessage } = useIntl();

  const clearDataModalProps: ModalProps<ClearInterventionDataModalState>['props'] =
    useMemo(
      () => ({
        title: formatMessage(messages.clearCollectedData),
        width: CLEAR_COLLECTED_DATA_MODAL_WIDTH,
      }),
      [],
    );

  const { openModal: openClearDataModal, Modal: ClearInterventionDataModal } =
    useModal<ClearInterventionDataModalState>({
      type: ModalType.Modal,
      props: clearDataModalProps,
      modalContentRenderer: ClearInterventionDataModalContent,
    });

  const ClearInterventionDataOption = useMemo(
    () => ({
      id: 'clearInterventionData',
      label: formatMessage(messages.clearCollectedData),
      icon: BinIcon,
      action: () =>
        openClearDataModal({
          interventionId,
          initialSensitiveDataState: sensitiveDataState,
          initialClearSensitiveDataScheduledAt: clearSensitiveDataScheduledAt,
        }),
      color: colors.bluewood,
      disabled:
        !canClearInterventionData(interventionStatus) ||
        (hasCollaborators && !isCurrentUserEditor),
    }),
    [
      openClearDataModal,
      sensitiveDataState,
      clearSensitiveDataScheduledAt,
      interventionStatus,
      hasCollaborators,
      isCurrentUserEditor,
    ],
  );

  return {
    ClearInterventionDataOption,
    ClearInterventionDataModal,
  };
};
