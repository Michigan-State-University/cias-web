import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';

import {
  ShortLinkType,
  VerifyShortLinkData,
  VerifyShortLinkDataDTO,
} from 'models/ShortLink';

import useGet from 'utils/useGet';
import objectToCamelCase from 'utils/objectToCamelCase';

import Loader from 'components/Loader';

const VerifyShortLinkPage = () => {
  const history = useHistory();
  const { name } = useParams<{ name: string }>();

  const redirectToNotFoundPage = () => {
    history.push('/not-found-page');
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

  if (error) {
    redirectToNotFoundPage();
  }

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
        link = `/interventions/${interventionId}/sessions/${firstSessionId}/fill`;

        break;
      }
      case ShortLinkType.FLEXIBLE_ORDER:
      case ShortLinkType.FIXED_ORDER: {
        link = `/interventions/${interventionId}/invite`;
        break;
      }
      default: {
        return;
      }
    }

    if (healthClinicId) {
      link += `?cid=${healthClinicId}`;
    }

    history.push(link);
  }, [verifyShortLinkData]);

  return <>{isFetching && <Loader />}</>;
};

export default VerifyShortLinkPage;
