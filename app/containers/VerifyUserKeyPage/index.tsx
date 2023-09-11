import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { ApiError } from 'models/Api';

import { HttpStatusCodes } from 'utils/constants';

import { RoutePath } from 'global/constants';
import {
  makeSelectErrors,
  verifyUserKeyRequest,
  withVerifyUserKeySaga,
} from 'global/reducers/auth';

import Loader from 'components/Loader';

import ForbiddenPage from 'containers/ForbiddenPage';

import { StudyNotAvailableInfo } from './StudyNotAvailableInfo';

const VerifyUserKeyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useInjectSaga(withVerifyUserKeySaga);

  const { userKey } = useParams<{ userKey: string }>();

  const verifyUserKeyError: Nullable<ApiError> = useSelector(
    makeSelectErrors('verifyUserKeyError'),
  );

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

  if (verifyUserKeyError) {
    switch (verifyUserKeyError?.response?.status) {
      case HttpStatusCodes.UNAUTHORIZED: {
        return <ForbiddenPage />;
      }
      case HttpStatusCodes.FORBIDDEN: {
        return <StudyNotAvailableInfo />;
      }
      default: {
        redirectToNotFoundPage();
      }
    }
  }

  return <Loader />;
};

export default VerifyUserKeyPage;
