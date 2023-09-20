import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApiError } from 'models/Api';

import { RoutePath } from 'global/constants';

import { parametrizeRoutePath } from 'utils/router';

import {
  sendInterventionInvitationsRequest,
  resendInterventionInvitationRequest,
  makeSelectInterventionLoader,
  makeSelectIntervention,
  fetchInterventionInvitationsRequest,
  makeSelectInterventionError,
  makeSelectInterventionInvitations,
} from 'global/reducers/intervention';

import { Intervention, InterventionInvitation } from 'models/Intervention';

import Box from 'components/Box';
import H2 from 'components/H2';

import ShareBoxModalParent from './Components/ShareBoxModalParent';
import { NormalShareBox } from './NormalShareBox';
import { EmailLoadingType, ShareBoxType } from './types';
import OrganizationShareBox from './OrganizationShareBox';

type Props = {
  organizationId: Nullable<string>;
};

const Component = ({ organizationId }: Props) => {
  // redux
  const dispatch = useDispatch();

  // selectors
  const intervention = useSelector<unknown, Nullable<Intervention>>(
    makeSelectIntervention(),
  );
  const invites = useSelector<unknown, InterventionInvitation[]>(
    makeSelectInterventionInvitations(),
  );
  const invitesLoading = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('fetchInterventionInvites'),
  );
  const invitesError = useSelector<unknown, ApiError>(
    makeSelectInterventionError('fetchInterventionInvites'),
  );
  const sendLoading = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('sendInterventionInvite'),
  );
  const emailLoading = useSelector<unknown, EmailLoadingType>(
    makeSelectInterventionLoader('interventionEmailLoading'),
  );

  const { name, id, status } = intervention || {};

  // actions
  const sendInvite = (emails: string[]): void => {
    dispatch(sendInterventionInvitationsRequest(emails, id));
  };
  const resendInvite = (inviteId: string): void => {
    dispatch(resendInterventionInvitationRequest(inviteId, id));
  };

  useEffect(() => {
    dispatch(fetchInterventionInvitationsRequest(id));
  }, [id]);

  if (!intervention || invitesError) return null;

  const sharedProps = {
    emails: invites,
    exportFilename: name,
    interventionStatus: status,
    inviteUrl: `${process.env.WEB_URL}${parametrizeRoutePath(
      RoutePath.INTERVENTION_INVITE,
      {
        interventionId: id!,
      },
    )}`,
    resendInvite,
    sendInvite,
    emailLoading,
    listLoading: invitesLoading,
    sendLoading,
    shareBoxType: ShareBoxType.INTERVENTION,
  };

  if (organizationId)
    return (
      <OrganizationShareBox organizationId={organizationId} {...sharedProps}>
        <Box display="flex" align="center">
          <H2>{name}</H2>
        </Box>
      </OrganizationShareBox>
    );

  return (
    <ShareBoxModalParent>
      {/* @ts-ignore */}
      <NormalShareBox {...sharedProps}>
        <Box display="flex" align="center">
          <H2>{name}</H2>
        </Box>
      </NormalShareBox>
    </ShareBoxModalParent>
  );
};

export const InterventionShareBox = memo(Component);
