import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InterventionStatus, InterventionType } from 'models/Intervention';
import { Session } from 'models/Session';

import {
  fetchOrganizationRequest,
  makeSelectOrganization,
  makeSelectOrganizationLoader,
} from 'global/reducers/organizations';

import Loader from 'components/Loader';

import { InviteParticipantModalView, ParticipantInvitationType } from './types';
import { ParticipantListView } from './ParticipantListView';

export type Props = {
  interventionId: string;
  organizationId: Nullable<string>;
  interventionStatus: InterventionStatus;
  interventionType: InterventionType;
  sessions: Session[];
  currentView: InviteParticipantModalView;
  setCurrentView: (view: InviteParticipantModalView) => void;
};

export const InviteParticipantsModalContent: FC<Props> = ({
  interventionId,
  organizationId,
  interventionType,
  sessions,
  currentView,
  setCurrentView,
}) => {
  const dispatch = useDispatch();

  const organization = useSelector(makeSelectOrganization());
  const organizationLoading = useSelector(
    makeSelectOrganizationLoader('fetchOrganization'),
  );

  useEffect(() => {
    if (organizationId && organizationId !== organization?.id) {
      dispatch(fetchOrganizationRequest(organizationId));
    }
  }, [organizationId]);

  const handleInvite = (invitationType: ParticipantInvitationType) => {
    if (invitationType === ParticipantInvitationType.EMAIL) {
      setCurrentView(InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS);
    } else if (invitationType === ParticipantInvitationType.PREDEFINED) {
      setCurrentView(InviteParticipantModalView.INVITE_PREDEFINED_PARTICIPANT);
    }
  };

  const isModularIntervention = interventionType !== InterventionType.DEFAULT;
  const isReportingIntervention = !!organizationId;

  return (
    <>
      {organizationLoading && <Loader type="inline" />}
      {!organizationLoading && (
        <>
          {currentView === InviteParticipantModalView.PARTICIPANT_LIST && (
            <ParticipantListView
              isModularIntervention={isModularIntervention}
              isReportingIntervention={isReportingIntervention}
              interventionId={interventionId}
              sessions={sessions}
              healthSystems={organization?.healthSystems || []}
              onInvite={handleInvite}
            />
          )}
        </>
      )}
    </>
  );
};
