import React from 'react';
import { useSelector } from 'react-redux';

import { makeSelectUser } from 'global/reducers/user';

import { ResendInvitationLink } from 'components/AccountSettings/ResendInvitationLink';

export const WrappedResendInvitationLinkAdmin = () => {
  const { user } = useSelector(makeSelectUser());

  const loading = false;

  const resendInvitation = () => {
    console.log(user);
  };

  return <ResendInvitationLink loading={loading} onResend={resendInvitation} />;
};
