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

import { InviteParticipantModalView } from './types';
import { ParticipantListView } from './ParticipantListView';

export type Props = {
  interventionId: string;
  organizationId: Nullable<string>;
  interventionStatus: InterventionStatus;
  interventionType: InterventionType;
  sessions: Session[];
  currentView: InviteParticipantModalView;
};

export const InviteParticipantsModalContent: FC<Props> = ({
  interventionId,
  organizationId,
  interventionType,
  sessions,
  currentView,
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
            />
          )}
        </>
      )}
    </>
  );
};
