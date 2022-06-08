import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  sendInterventionInviteRequest,
  resendInterventionInviteRequest,
  makeSelectInterventionLoader,
  makeSelectIntervention,
} from 'global/reducers/intervention';

import { Intervention, InterventionInvite } from 'models/Intervention';
import useGet from 'utils/useGet';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import Box from 'components/Box';
import H2 from 'components/H2';

import ShareBoxModalParent from './Components/ShareBoxModalParent';
import { NormalShareBox } from './NormalShareBox';
import {
  EmailLoadingType,
  InterventionInviteApiResponse,
  ShareBoxType,
} from './types';
import OrganizationShareBox from './OrganizationShareBox';

type Props = {
  organizationId?: string;
};

const Component = ({ organizationId }: Props) => {
  // redux
  const dispatch = useDispatch();

  // selectors
  const intervention = useSelector<unknown, Intervention>(
    makeSelectIntervention(),
  );
  const sendLoading = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('sendInterventionLoading'),
  );
  const emailLoading = useSelector<unknown, EmailLoadingType>(
    makeSelectInterventionLoader('interventionEmailLoading'),
  );

  // actions
  const sendInvite = (emails: string[]): void => {
    dispatch(sendInterventionInviteRequest(emails, id));
  };
  const resendInvite = (inviteId: string): void => {
    dispatch(resendInterventionInviteRequest(inviteId, id));
  };

  const { name, id, status } = intervention || {};
  const url = `/v1/interventions/${id}/invitations`;
  const {
    data: emails,
    isFetching,
    error,
  } = useGet<InterventionInviteApiResponse, InterventionInvite[]>(url, (data) =>
    jsonApiToArray(data, 'invitation'),
  );

  if (!intervention || error) return null;

  const sharedProps = {
    emails: emails ?? [],
    exportFilename: name,
    interventionStatus: status,
    inviteUrl: `${process.env.WEB_URL}/interventions/${id}/invite`,
    resendInvite,
    sendInvite,
    emailLoading,
    listLoading: isFetching,
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
      <NormalShareBox {...sharedProps}>
        <Box display="flex" align="center">
          <H2>{name}</H2>
        </Box>
      </NormalShareBox>
    </ShareBoxModalParent>
  );
};

export const InterventionShareBox = memo(Component);
