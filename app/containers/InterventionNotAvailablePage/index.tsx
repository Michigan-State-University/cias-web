import React from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { Redirect } from 'react-router-dom';

import { RoutePath } from 'global/constants';

import useQuery from 'utils/useQuery';

import {
  InterventionNotAvailableInfo,
  InterventionNotAvailableReason,
  isValidInterventionNotAvailableReason,
} from 'components/InterventionNotAvailableInfo';

import messages from './messages';

export const InterventionNotAvailablePage = () => {
  const { formatMessage } = useIntl();
  const reason = useQuery('reason');

  const isValidReason = isValidInterventionNotAvailableReason(reason);

  if (reason && !isValidReason) {
    return <Redirect to={RoutePath.INTERVENTION_NOT_AVAILABLE} />;
  }

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <InterventionNotAvailableInfo
        reason={reason as InterventionNotAvailableReason}
      />
    </>
  );
};

export default InterventionNotAvailablePage;
