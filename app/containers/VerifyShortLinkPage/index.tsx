import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import {
  ShortLinkType,
  VerifyShortLinkData,
  VerifyShortLinkDataDTO,
} from 'models/ShortLink';

import { RoutePath } from 'global/constants';

import useGet from 'utils/useGet';
import objectToCamelCase from 'utils/objectToCamelCase';
import { parametrizeRoutePath } from 'utils/router';

import Loader from 'components/Loader';

import NotFoundPage from 'containers/NotFoundPage';

const VerifyShortLinkPage = () => {
  const history = useHistory();
  const { name } = useParams<{ name: string }>();

  const redirectToNotFoundPage = () => {
    history.replace(RoutePath.NOT_FOUND);
  };

  if (!name) {
    redirectToNotFoundPage();
  }

  const url = `/v1/verify_short_link?name=${name}`;
  const {
    error,
    data: verifyShortLinkData,
    isFetching,
  } = useGet<{ data: VerifyShortLinkDataDTO }, VerifyShortLinkData>(
    url,
    ({ data }) => objectToCamelCase(data),
  );

  useEffect(() => {
    if (!verifyShortLinkData) return;
    const { type, interventionId, healthClinicId, firstSessionId } =
      verifyShortLinkData;

    let link = '';

    switch (type) {
      case ShortLinkType.SEQUENTIAL: {
        if (!firstSessionId) {
          redirectToNotFoundPage();
          return;
        }
        link = parametrizeRoutePath(RoutePath.ANSWER_SESSION, {
          interventionId,
          sessionId: firstSessionId,
        });
        break;
      }
      case ShortLinkType.FLEXIBLE_ORDER:
      case ShortLinkType.FIXED_ORDER: {
        link = parametrizeRoutePath(RoutePath.INTERVENTION_INVITE, {
          interventionId,
        });
        break;
      }
      default: {
        redirectToNotFoundPage();
        return;
      }
    }

    if (healthClinicId) {
      link += `?cid=${healthClinicId}`;
    }

    history.push(link);
  }, [verifyShortLinkData]);

  if (error) {
    return <NotFoundPage />;
  }

  return <>{isFetching && <Loader />}</>;
};

export default VerifyShortLinkPage;
