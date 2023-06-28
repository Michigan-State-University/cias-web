import React from 'react';
import { useIntl } from 'react-intl';

import { useModal, ModalType } from 'components/Modal';
import SelectResearchers, {
  Props as SelectResearchersProps,
} from 'containers/SelectResearchers';

import messages from './messages';
import { SHARE_EXTERNALLY_MODAL_WIDTH } from './constants';

export const useShareExternallyModal = (
  onResearchersSelected: SelectResearchersProps['onResearchersSelected'],
) => {
  const { formatMessage } = useIntl();
  return useModal({
    type: ModalType.Modal,
    modalContentRenderer: () => (
      <SelectResearchers
        onResearchersSelected={onResearchersSelected}
        actionName={formatMessage(messages.share)}
      />
    ),
    props: {
      title: formatMessage(messages.shareExternally),
      width: SHARE_EXTERNALLY_MODAL_WIDTH,
      maxWidth: SHARE_EXTERNALLY_MODAL_WIDTH,
    },
  });
};
