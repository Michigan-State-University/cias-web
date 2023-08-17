import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';

import { InterventionStatus, SensitiveDataState } from 'models/Intervention';
import { canClearInterventionData } from 'models/Status/statusPermissions';

import globalMessages from 'global/i18n/globalMessages';
import {
  clearInterventionDataRequest,
  makeSelectInterventionLoader,
  withClearInterventionDataSaga,
} from 'global/reducers/intervention';

import { ConfirmationModalProps, ModalType, useModal } from 'components/Modal';

import messages from './messages';
import { CLEAR_COLLECTED_DATA_MODAL_WIDTH } from './constants';
import { ClearInterventionDataModalContent } from './ClearInterventionDataModalContent';

export const useClearInterventionData = (
  interventionStatus: InterventionStatus,
  interventionId: string,
  hasCollaborators: boolean,
  isCurrentUserEditor: boolean,
  sensitiveDataState: SensitiveDataState,
  clearSensitiveDataScheduledAt: Nullable<string>,
) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectSaga(withClearInterventionDataSaga);

  const clearInterventionDataLoading = useSelector(
    makeSelectInterventionLoader('clearInterventionData'),
  );

  const clearInterventionData = useCallback(() => {
    if (sensitiveDataState === SensitiveDataState.COLLECTED) {
      dispatch(clearInterventionDataRequest(interventionId));
    }
  }, [interventionId, sensitiveDataState]);

  const clearDataConfirmationModalProps: ConfirmationModalProps['props'] =
    useMemo(
      () => ({
        title: formatMessage(messages.clearCollectedData),
        description: null,
        content: (
          <ClearInterventionDataModalContent
            sensitiveDataState={sensitiveDataState}
            clearSensitiveDataScheduledAt={clearSensitiveDataScheduledAt}
          />
        ),
        contentStyles: { mt: 48 },
        confirmationButtonText: formatMessage(
          sensitiveDataState === SensitiveDataState.COLLECTED
            ? messages.clearData
            : globalMessages.iUnderstand,
        ),
        confirmationButtonColor:
          sensitiveDataState === SensitiveDataState.COLLECTED
            ? 'warning'
            : 'primary',
        hideCancelButton: sensitiveDataState !== SensitiveDataState.COLLECTED,
        confirmAction: clearInterventionData,
        loading: clearInterventionDataLoading,
        closeOnConfirm: sensitiveDataState !== SensitiveDataState.COLLECTED,
        width: CLEAR_COLLECTED_DATA_MODAL_WIDTH,
        isMobile: true,
      }),
      [
        clearInterventionData,
        clearInterventionDataLoading,
        sensitiveDataState,
        clearSensitiveDataScheduledAt,
      ],
    );

  const {
    openModal: openClearDataConfirmationModal,
    Modal: ClearDataConfirmationModal,
  } = useModal({
    type: ModalType.ConfirmationModal,
    props: clearDataConfirmationModalProps,
  });

  const ClearInterventionDataOption = useMemo(
    () => ({
      id: 'clearInterventionData',
      label: formatMessage(messages.clearCollectedData),
      icon: BinIcon,
      action: openClearDataConfirmationModal,
      color: colors.bluewood,
      disabled:
        !canClearInterventionData(interventionStatus) ||
        (hasCollaborators && !isCurrentUserEditor),
    }),
    [
      openClearDataConfirmationModal,
      sensitiveDataState,
      interventionStatus,
      hasCollaborators,
      isCurrentUserEditor,
    ],
  );

  return {
    ClearInterventionDataOption,
    ClearInterventionDataModals: [
      <ClearDataConfirmationModal key="clearIntervetionDataConfirmationModal" />,
    ],
  };
};
