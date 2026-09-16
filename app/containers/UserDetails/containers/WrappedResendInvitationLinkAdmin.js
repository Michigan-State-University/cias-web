import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import {
  makeSelectUser,
  makeSelectUserLoader,
  resendInvitationLinkRequest,
  resendInvitationLinkSaga,
} from 'global/reducers/user';

import { ResendInvitationLink } from 'components/AccountSettings/ResendInvitationLink';

export const WrappedResendInvitationLinkAdmin = () => {
  const dispatch = useDispatch();
  useInjectSaga({ key: 'user', saga: resendInvitationLinkSaga });

  const user = useSelector(makeSelectUser());
  const loading = useSelector(makeSelectUserLoader('resendInvitationLink'));

  const resendInvitation = useCallback(() => {
    dispatch(resendInvitationLinkRequest(user?.id));
  }, [user?.id]);

  const activated = useMemo(() => user?.fullName?.trim(), [user?.fullName]);

  if (!user || activated) return null;

  return <ResendInvitationLink loading={loading} onResend={resendInvitation} />;
};
