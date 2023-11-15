import { FC, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { InterventionStatus, InterventionType } from 'models/Intervention';
import { Session } from 'models/Session';

import Modal, { Props as ModalComponentProps } from 'components/Modal/Modal';

import viewTitlesMessages from './viewTitlesMessages';
import {
  INVITE_PARTICIPANTS_MODAL_HEIGHT,
  INVITE_PARTICIPANTS_MODAL_WIDTH,
} from './constants';
import {
  InviteParticipantModalView,
  InviteParticipantModalViewState,
} from './types';
import { InviteParticipantsModalContent } from './InviteParticipantsModalContent';

export type Props = {
  interventionId: string;
  interventionName: string;
  organizationId: Nullable<string>;
  interventionStatus: InterventionStatus;
  interventionType: InterventionType;
  sessions: Session[];
} & Pick<ModalComponentProps, 'visible' | 'onClose'>;

export const InviteParticipantsModal: FC<Props> = ({
  visible,
  onClose,
  interventionId,
  interventionName,
  organizationId,
  interventionType,
  interventionStatus,
  sessions,
}) => {
  const { formatMessage } = useIntl();

  const [currentView, setCurrentView] =
    useState<InviteParticipantModalViewState>({
      view: InviteParticipantModalView.PARTICIPANT_LIST,
    });

  useEffect(() => {
    if (!visible) {
      setCurrentView({
        view: InviteParticipantModalView.PARTICIPANT_LIST,
      });
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={formatMessage(viewTitlesMessages[currentView.view])}
      width={INVITE_PARTICIPANTS_MODAL_WIDTH}
      height={INVITE_PARTICIPANTS_MODAL_HEIGHT}
      pt={24}
      px={24}
      pb={16}
      titleProps={{
        lineHeight: '36px',
      }}
      stretchContent
      contentContainerProps={{
        mt: 20,
      }}
    >
      <InviteParticipantsModalContent
        currentView={currentView}
        setCurrentView={setCurrentView}
        interventionId={interventionId}
        interventionName={interventionName}
        organizationId={organizationId}
        interventionType={interventionType}
        interventionStatus={interventionStatus}
        sessions={sessions}
      />
    </Modal>
  );
};
