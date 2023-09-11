import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';

import { RoutePath } from 'global/constants';
import {
  verifyUserKeyRequest,
  withVerifyUserKeySaga,
} from 'global/reducers/auth';

import Loader from 'components/Loader';
import { useInjectSaga } from 'redux-injectors';

const VerifyUserKeyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useInjectSaga(withVerifyUserKeySaga);

  const { userKey } = useParams<{ userKey: string }>();

  const redirectToNotFoundPage = () => {
    history.replace(RoutePath.NOT_FOUND);
  };

  useEffect(() => {
    if (userKey) {
      dispatch(verifyUserKeyRequest(userKey));
    } else {
      redirectToNotFoundPage();
    }
  }, [userKey]);

  return <Loader />;
};

export default VerifyUserKeyPage;
