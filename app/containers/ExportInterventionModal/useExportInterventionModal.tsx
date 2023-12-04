import { useCallback, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import DownloadIcon from 'assets/svg/download-line.svg';

import { colors } from 'theme';

import { InterventionExportFile } from 'models/Intervention';

import {
  exportInterventionRequest,
  makeSelectInterventionLoader,
  withExportInterventionSaga,
} from 'global/reducers/intervention';

import { useExportModal } from 'components/ExportModal';

import messages from './messages';

export const useExportInterventionModal = (
  interventionId: string,
  exportedData: Nullable<InterventionExportFile>,
) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectSaga(withExportInterventionSaga);

  const handleExportIntervention = useCallback(
    (onSuccess) => {
      dispatch(exportInterventionRequest(interventionId, onSuccess));
    },
    [interventionId],
  );

  const { Modal: ExportInterventionModal, openModal } = useExportModal({
    title: formatMessage(messages.exportInterventionModalTitle),
    description: formatMessage(messages.exportInterventionModalDescription),
    fileGeneratedDescription: formatMessage(
      messages.exportInterventionModalFileGeneratedDescription,
    ),
    generateButtonTitle: formatMessage(
      messages.exportInterventionModalGenerateButtonTitle,
    ),
    file: exportedData,
    onExport: handleExportIntervention,
    exportLoaderSelector: makeSelectInterventionLoader(
      'exportInterventionLoading',
    ),
  });

  const ExportInterventionModalOption = useMemo(
    () => ({
      id: 'export-intervention',
      label: formatMessage(messages.exportInterventionModalTitle),
      icon: DownloadIcon,
      action: openModal,
      color: colors.bluewood,
    }),
    [openModal],
  );

  return {
    ExportInterventionModalOption,
    ExportInterventionModal,
  };
};
