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
import {
  InterventionNotAvailableInfo,
  InterventionNotAvailableReason,
} from 'components/InterventionNotAvailableInfo';

import ForbiddenPage from 'containers/ForbiddenPage';
import NotFoundPage from 'containers/NotFoundPage';

const VerifyUserKeyPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useInjectSaga(withVerifyUserKeySaga);

  const { userKey } = useParams<{ userKey: string }>();

  const verifyError: Nullable<ApiError> = useSelector(
    makeSelectErrors('verifyUserKeyError'),
  );

  useEffect(() => {
    if (userKey) {
      dispatch(verifyUserKeyRequest(userKey));
    } else {
      history.replace(RoutePath.NOT_FOUND);
    }
  }, [userKey]);

  if (verifyError) {
    switch (verifyError?.response?.status) {
      case HttpStatusCodes.UNAUTHORIZED: {
        return <ForbiddenPage />;
      }
      case HttpStatusCodes.FORBIDDEN: {
        return (
          <InterventionNotAvailableInfo
            reason={InterventionNotAvailableReason.INTERVENTION_DRAFT}
          />
        );
      }
      default: {
        return <NotFoundPage />;
      }
    }
  }

  return <Loader />;
};

export default VerifyUserKeyPage;
