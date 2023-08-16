import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';

import { InterventionStatus } from 'models/Intervention';
import { canClearInterventionData } from 'models/Status/statusPermissions';

import globalMessages from 'global/i18n/globalMessages';
import { clearInterventionDataRequest } from 'global/reducers/intervention';

import { ConfirmationModalProps, ModalType, useModal } from 'components/Modal';
import Column from 'components/Column';
import Text from 'components/Text';

import messages from './messages';
import { CLEAR_COLLECTED_DATA_MODAL_WIDTH } from './constants';

export const useClearInterventionData = (
  interventionStatus: InterventionStatus,
  interventionId: string,
) => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();

  const clearPersonalData = useCallback(() => {
    dispatch(clearInterventionDataRequest(interventionId));
  }, [interventionId]);

  const clearDataConfirmationModalProps: ConfirmationModalProps['props'] =
    useMemo(
      () => ({
        title: formatMessage(messages.clearCollectedData),
        description: null,
        content: (
          <Column>
            <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
              {formatMessage(globalMessages.areYouSure)}
            </Text>
            <Text mt={16} fontSize={15} lineHeight={1.5}>
              {formatMessage(messages.clearDataConfirmationContent)}
            </Text>
            <Text mt={32} fontSize={15} lineHeight={1.5} opacity={0.7}>
              {formatMessage(messages.clearDataConfirmationNote)}
            </Text>
          </Column>
        ),
        contentStyles: { mt: 48 },
        confirmationButtonText: formatMessage(
          messages.clearDataConfirmationButtonTitle,
        ),
        confirmAction: clearPersonalData,
        closeOnConfirm: false,
        width: CLEAR_COLLECTED_DATA_MODAL_WIDTH,
        isMobile: true,
      }),
      [clearPersonalData],
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
      disabled: !canClearInterventionData(interventionStatus),
    }),
    [openClearDataConfirmationModal, interventionStatus],
  );

  return {
    ClearInterventionDataOption,
    ClearInterventionDataModals: [
      <ClearDataConfirmationModal key="clearIntervetionDataConfirmationModal" />,
    ],
  };
};
