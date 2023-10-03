import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { InterventionStatus, InterventionType } from 'models/Intervention';
import { Session } from 'models/Session';
import { Organization } from 'models/Organization';
import { canInviteParticipants } from 'models/Status/statusPermissions';

import { normalizeArrayToObject } from 'utils/normalizeArrayToObject';

import {
  fetchOrganizationRequest,
  makeSelectOrganization,
  makeSelectOrganizationLoader,
} from 'global/reducers/organizations';

import Loader from 'components/Loader';
import { SelectOption } from 'components/Select/types';

import {
  InviteParticipantModalView,
  InviteParticipantModalViewState,
  NormalizedHealthClinicsInfos,
  NormalizedSessions,
  ParticipantInvitationType,
} from './types';
import { ParticipantListView } from './ParticipantListView';
import { InviteEmailParticipantsView } from './InviteEmailParticipantsView';
import { UploadEmailsView } from './UploadEmailsView';
import messages from './messages';
import { CreatePredefinedParticipantView } from './CreatePredefinedParticipantView';
import { ManagePredefinedParticipantView } from './ManagePredefinedParticipantView';

export type Props = {
  interventionId: string;
  interventionName: string;
  organizationId: Nullable<string>;
  interventionStatus: InterventionStatus;
  interventionType: InterventionType;
  sessions: Session[];
  currentView: InviteParticipantModalViewState;
  setCurrentView: (view: InviteParticipantModalViewState) => void;
};

export const InviteParticipantsModalContent: FC<Props> = ({
  interventionId,
  interventionName,
  organizationId,
  interventionStatus,
  interventionType,
  sessions,
  currentView,
  setCurrentView,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const [activeParticipantListViewTab, setActiveParticipantListViewTab] =
    useState(formatMessage(messages.emailParticipantsTab));

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

  const normalizedSessions: NormalizedSessions = useMemo(() => {
    if (isModularIntervention) return {};
    return normalizeArrayToObject(sessions, 'id');
  }, [isModularIntervention, sessions]);

  const healthClinicOptions: SelectOption<string>[] = useMemo(() => {
    const options: SelectOption<string>[] = [];
    if (!organization) return options;

    organization.healthSystems.forEach(
      ({
        name: healthSystemName,
        healthClinics,
        deleted: healthSystemDeleted,
      }) => {
        if (healthSystemDeleted) return;
        healthClinics.forEach(
          ({
            name: healthClinicName,
            id: healthClinicId,
            deleted: healthClinicDeleted,
          }) => {
            if (healthClinicDeleted) return;
            options.push({
              value: healthClinicId,
              label: `${healthClinicName} (${healthSystemName})`,
            });
          },
        );
      },
    );
    return options;
  }, [organization]);

  const normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos =
    useMemo(() => {
      const infos: NormalizedHealthClinicsInfos = {};
      if (!organization) return infos;

      organization.healthSystems.forEach(
        ({ name: healthSystemName, healthClinics }) => {
          healthClinics.forEach(
            ({ name: healthClinicName, id: healthClinicId, deleted }) => {
              infos[healthClinicId] = {
                healthClinicName,
                healthSystemName,
                deleted,
              };
            },
          );
        },
      );
      return infos;
    }, [healthClinicOptions]);

  const handleInvite = (invitationType: ParticipantInvitationType) => {
    if (invitationType === ParticipantInvitationType.EMAIL) {
      setCurrentView({
        view: InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS,
      });
    } else if (invitationType === ParticipantInvitationType.PREDEFINED) {
      setCurrentView({
        view: InviteParticipantModalView.INVITE_PREDEFINED_PARTICIPANT,
      });
    }
  };

  const handleUploadEmails = () => {
    setCurrentView({
      view: InviteParticipantModalView.UPLOAD_EMAILS,
    });
  };

  const handleManage = (participantId: string) => {
    setCurrentView({
      view: InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT,
      participantId,
    });
  };

  const handleBack = (view?: InviteParticipantModalViewState) => {
    setCurrentView(
      view ?? {
        view: InviteParticipantModalView.PARTICIPANT_LIST,
      },
    );
  };

  const invitingPossible = canInviteParticipants(interventionStatus);

  const showLoader =
    organizationLoading ||
    (isReportingIntervention && organizationId !== organization?.id);

  const { view } = currentView;

  return (
    <>
      {showLoader && <Loader type="inline" />}
      {!showLoader && (
        <>
          {view === InviteParticipantModalView.PARTICIPANT_LIST && (
            <ParticipantListView
              isModularIntervention={isModularIntervention}
              isReportingIntervention={isReportingIntervention}
              interventionId={interventionId}
              interventionName={interventionName}
              invitingPossible={invitingPossible}
              sessionOptions={sessionOptions}
              healthClinicOptions={healthClinicOptions}
              normalizedSessions={normalizedSessions}
              normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
              onInvite={handleInvite}
              onUploadEmails={handleUploadEmails}
              onManage={handleManage}
              activeTab={activeParticipantListViewTab}
              setActiveTab={setActiveParticipantListViewTab}
            />
          )}
          {view === InviteParticipantModalView.INVITE_EMAIL_PARTICIPANTS && (
            <InviteEmailParticipantsView
              isModularIntervention={isModularIntervention}
              isReportingIntervention={isReportingIntervention}
              interventionId={interventionId}
              sessionOptions={sessionOptions}
              healthClinicOptions={healthClinicOptions}
              onBack={handleBack}
              normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
            />
          )}
          {view === InviteParticipantModalView.UPLOAD_EMAILS && (
            <UploadEmailsView
              interventionName={interventionName}
              isModularIntervention={isModularIntervention}
              isReportingIntervention={isReportingIntervention}
              interventionId={interventionId}
              sessionOptions={sessionOptions}
              healthClinicOptions={healthClinicOptions}
              normalizedHealthClinicsInfos={normalizedHealthClinicsInfos}
              onBack={handleBack}
            />
          )}
          {view ===
            InviteParticipantModalView.INVITE_PREDEFINED_PARTICIPANT && (
            <CreatePredefinedParticipantView
              isReportingIntervention={isReportingIntervention}
              interventionId={interventionId}
              healthClinicOptions={healthClinicOptions}
              onBack={handleBack}
            />
          )}
          {view ===
            InviteParticipantModalView.MANAGE_PREDEFINED_PARTICIPANT && (
            <ManagePredefinedParticipantView
              participantId={currentView.participantId}
              isReportingIntervention={isReportingIntervention}
              interventionId={interventionId}
              healthClinicOptions={healthClinicOptions}
              onBack={handleBack}
              invitingPossible={invitingPossible}
            />
          )}
        </>
      )}
    </>
  );
};
