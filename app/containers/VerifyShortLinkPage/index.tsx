import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { RoutePath } from 'global/constants';
import { withVerifyShortLinkSaga } from 'global/reducers/auth/sagas';
import { makeSelectErrors, verifyShortLinkRequest } from 'global/reducers/auth';

import { HttpStatusCodes } from 'utils/constants';

import Loader from 'components/Loader';
import { InterventionNotAvailableInfo } from 'components/InterventionNotAvailableInfo';

import NotFoundPage from 'containers/NotFoundPage';

import ForbiddenPage from '../ForbiddenPage';
import { VerifyShortLinkError } from './types';

const VerifyShortLinkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useInjectSaga(withVerifyShortLinkSaga);

  const { slug } = useParams<{ slug: string }>();

  const verifyError: Nullable<VerifyShortLinkError> = useSelector(
    makeSelectErrors('verifyShortLinkError'),
  );

  useEffect(() => {
    if (slug) {
      dispatch(verifyShortLinkRequest(slug));
    } else {
      history.replace(RoutePath.NOT_FOUND);
    }
  }, [slug]);

  if (verifyError) {
    switch (verifyError?.response?.status) {
      case HttpStatusCodes.FORBIDDEN: {
        return <ForbiddenPage />;
      }
      case HttpStatusCodes.UNAUTHORIZED: {
        break;
      }
      case HttpStatusCodes.BAD_REQUEST: {
        return (
          <InterventionNotAvailableInfo
            reason={verifyError.response?.data?.details?.reason}
          />
        );
      }
      case HttpStatusCodes.NOT_FOUND:
      default: {
        return <NotFoundPage />;
      }
    }
  }

  return <Loader />;
};

export default VerifyShortLinkPage;
