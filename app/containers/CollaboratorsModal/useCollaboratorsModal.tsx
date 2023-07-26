import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { ModalType, useModal } from 'components/Modal';
import { HelpIconTooltip } from 'components/HelpIconTooltip';

import { CollaboratorsModal } from './CollaboratorsModal';
import messages from './messages';
import { COLLABORATORS_MODAL_WIDTH } from './constants';

export const useCollaboratorsModal = (
  interventionId: string,
  isCurrentUserInterventionOwner: boolean,
  interventionOwnerId: string,
) => {
  const { formatMessage } = useIntl();

  const props = useMemo(
    () => ({
      title: formatMessage(messages.collaborate),
      description: formatMessage(messages.collaborateDescription),
      width: COLLABORATORS_MODAL_WIDTH,
      maxWidth: COLLABORATORS_MODAL_WIDTH,
      titleExtraContent: (
        <HelpIconTooltip
          id="collaborate-cdh"
          tooltipContent={formatMessage(messages.collaboratorsHelp)}
        />
      ),
    }),
    [],
  );

  return useModal({
    type: ModalType.Modal,
    modalContentRenderer: () => (
      <CollaboratorsModal
        interventionId={interventionId}
        isCurrentUserInterventionOwner={isCurrentUserInterventionOwner}
        interventionOwnerId={interventionOwnerId}
      />
    ),
    props,
  });
};
