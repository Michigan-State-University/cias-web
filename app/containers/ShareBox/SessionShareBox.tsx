import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  sendSessionInviteRequest,
  resendSessionInviteRequest,
  makeSelectInterventionLoader,
  makeSelectInterventionStatus,
} from 'global/reducers/intervention';

import { Session } from 'models/Session';

import objectToCamelCase from 'utils/objectToCamelCase';

import Box from 'components/Box';
import H2 from 'components/H2';

import ShareBoxModalParent from './Components/ShareBoxModalParent';
import { NormalShareBox } from './NormalShareBox';
import OrganizationShareBox from './OrganizationShareBox';
import { makeSelectCurrentSession } from './selectors';
import { EmailLoadingType, ShareBoxType } from './types';
import { SessionIndex } from './styled';

type Props = {
  organizationId?: string;
};

export const Component = ({ organizationId }: Props): JSX.Element => {
  // redux
  const dispatch = useDispatch();

  // selectors
  const session = useSelector<unknown, Session>(makeSelectCurrentSession());
  const sendLoading = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('sendSessionLoading'),
  );
  const listLoading = useSelector<unknown, boolean>(
    makeSelectInterventionLoader('fetchSessionEmailsLoading'),
  );
  const emailLoading = useSelector<unknown, EmailLoadingType>(
    makeSelectInterventionLoader('sessionEmailLoading'),
  );
  const interventionStatus = useSelector<unknown, string>(
    makeSelectInterventionStatus(),
  );

  // actions
  const sendInvite = (
    emails: string[],
    shouldNotUpdateStore: boolean = false,
  ): void => {
    dispatch(
      sendSessionInviteRequest(emails, session.id, shouldNotUpdateStore),
    );
  };
  const resendInvite = (inviteId: string): void => {
    dispatch(resendSessionInviteRequest(inviteId, session.id));
  };

  const { name, interventionId, emails, position } =
    objectToCamelCase(session) || {};

  if (!session) return <></>;

  const sharedProps = {
    emails: emails ?? [],
    exportFilename: name,
    interventionStatus,
    inviteUrl: `${process.env.WEB_URL}/interventions/${interventionId}/sessions/${session.id}/fill`,
    resendInvite,
    sendInvite,
    emailLoading,
    listLoading,
    sendLoading,
    shareBoxType: ShareBoxType.SESSION,
  };

  if (organizationId)
    return (
      <OrganizationShareBox organizationId={organizationId} {...sharedProps}>
        <Box display="flex" align="center">
          <SessionIndex>{position}</SessionIndex>
          <H2 ml={15}>{name}</H2>
        </Box>
      </OrganizationShareBox>
    );

  return (
    <ShareBoxModalParent>
      <NormalShareBox {...sharedProps}>
        <Box display="flex" align="center">
          <SessionIndex>{position}</SessionIndex>
          <H2 ml={15}>{name}</H2>
        </Box>
      </NormalShareBox>
    </ShareBoxModalParent>
  );
};

export const SessionShareBox = memo(Component);
