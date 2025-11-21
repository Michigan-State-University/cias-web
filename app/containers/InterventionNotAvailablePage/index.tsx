import React from 'react';
import { Redirect } from 'react-router-dom';

import { RoutePath } from 'global/constants';

import useQuery from 'utils/useQuery';

import {
  InterventionNotAvailableInfo,
  InterventionNotAvailableReason,
  isValidInterventionNotAvailableReason,
} from 'components/InterventionNotAvailableInfo';

export const InterventionNotAvailablePage = () => {
  const reason = useQuery('reason');

  const isValidReason = isValidInterventionNotAvailableReason(reason);

  if (reason && !isValidReason) {
    return <Redirect to={RoutePath.INTERVENTION_NOT_AVAILABLE} />;
  }

  return (
    <InterventionNotAvailableInfo
      reason={reason as InterventionNotAvailableReason}
    />
  );
};

export default InterventionNotAvailablePage;
