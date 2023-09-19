import { FC, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InterventionStatus, InterventionType } from 'models/Intervention';
import { Session } from 'models/Session';
import { Organization } from 'models/Organization';

import {
  fetchOrganizationRequest,
  makeSelectOrganization,
  makeSelectOrganizationLoader,
} from 'global/reducers/organizations';

import Loader from 'components/Loader';
import { SelectOption } from 'components/Select/types';

import { InviteParticipantModalView, ParticipantInvitationType } from './types';
import { ParticipantListView } from './ParticipantListView';
import { InviteEmailParticipantsView } from './InviteEmailParticipantsView';

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

  const isModularIntervention = interventionType !== InterventionType.DEFAULT;
  const isReportingIntervention = !!organizationId;

  const organization: Nullable<Organization> = useSelector(
    makeSelectOrganization(),
  );
  const organizationLoading = useSelector(
    makeSelectOrganizationLoader('fetchOrganization'),
  );

  useEffect(() => {
    if (organizationId && organizationId !== organization?.id) {
      dispatch(fetchOrganizationRequest(organizationId));
    }
  }, [organizationId]);

  const sessionOptions: SelectOption<string>[] = useMemo(() => {
    if (isModularIntervention) return [];
    return sessions.map(({ id, name }) => ({ value: id, label: name }));
  }, [isModularIntervention, sessions]);

  const healthClinicOptions: SelectOption<string>[] = useMemo(() => {
    const options: SelectOption<string>[] = [];
    organization?.healthSystems?.forEach(
      ({ name: healthSystemName, healthClinics }) => {
        healthClinics.forEach(({ name: healthClinicName, id, deleted }) => {
          if (!deleted) {
            options.push({
              value: id,
              label: `${healthClinicName} (${healthSystemName})`,
            });
          }
        });
      },
    );
    return options;
  }, [organization]);

  const handleInvite = (invitationType: ParticipantInvitationType) => {
    if (invitationType === ParticipantInvitationType.EMAIL) {
      setCurrentView(InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS);
    } else if (invitationType === ParticipantInvitationType.PREDEFINED) {
      setCurrentView(InviteParticipantModalView.INVITE_PREDEFINED_PARTICIPANT);
    }
  };

  const handleBack = (invitationType: ParticipantInvitationType) => {
    if (invitationType === ParticipantInvitationType.EMAIL) {
      setCurrentView(InviteParticipantModalView.PARTICIPANT_LIST);
    } else if (invitationType === ParticipantInvitationType.PREDEFINED) {
      // TODO open predefined participants tab
      setCurrentView(InviteParticipantModalView.PARTICIPANT_LIST);
    }
  };

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
              sessionOptions={sessionOptions}
              healthClinicOptions={healthClinicOptions}
              onInvite={handleInvite}
            />
          )}
          {currentView ===
            InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS && (
            <InviteEmailParticipantsView
              isModularIntervention={isModularIntervention}
              isReportingIntervention={isReportingIntervention}
              interventionId={interventionId}
              sessionOptions={sessionOptions}
              healthClinicOptions={healthClinicOptions}
              onBack={handleBack}
            />
          )}
        </>
      )}
    </>
  );
};
