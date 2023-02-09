import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ApiError } from 'models/Api';

import {
  sendInterventionInviteRequest,
  resendInterventionInviteRequest,
  makeSelectInterventionLoader,
  makeSelectIntervention,
  fetchInterventionInvitesRequest,
  makeSelectInterventionError,
  makeSelectInterventionInvites,
} from 'global/reducers/intervention';

import { Intervention } from 'models/Intervention';
import { InterventionInvite } from 'models/InterventionInvite';

import Box from 'components/Box';
import H2 from 'components/H2';

import ShareBoxModalParent from './Components/ShareBoxModalParent';
import { NormalShareBox } from './NormalShareBox';
import { EmailLoadingType, ShareBoxType } from './types';
import OrganizationShareBox from './OrganizationShareBox';

type Props = {
  organizationId?: string;
};

const Component = ({ organizationId }: Props) => {
  // redux
  const dispatch = useDispatch();

  // selectors
  const intervention = useSelector<unknown, Nullable<Intervention>>(
    makeSelectIntervention(),
  );
  const invites = useSelector<unknown, InterventionInvite[]>(
    makeSelectInterventionInvites(),
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
    dispatch(sendInterventionInviteRequest(emails, id));
  };
  const resendInvite = (inviteId: string): void => {
    dispatch(resendInterventionInviteRequest(inviteId, id));
  };

  useEffect(() => {
    dispatch(fetchInterventionInvitesRequest(id));
  }, [id]);

  if (!intervention || invitesError) return null;

  const sharedProps = {
    emails: invites,
    exportFilename: name,
    interventionStatus: status,
    inviteUrl: `${process.env.WEB_URL}/interventions/${id}/invite`,
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
