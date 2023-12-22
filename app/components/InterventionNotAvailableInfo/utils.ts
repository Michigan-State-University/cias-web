import { RoutePath } from 'global/constants';

import { InterventionNotAvailableReason } from './types';

export const isValidInterventionNotAvailableReason = (
  reason: Nullable<string>,
) =>
  Object.values(InterventionNotAvailableReason).includes(
    reason as InterventionNotAvailableReason,
  );

export const getInterventionNotAvailablePagePathFromReason = (
  reason: InterventionNotAvailableReason,
) => {
  const searchParams = new URLSearchParams({ reason });
  return `${RoutePath.INTERVENTION_NOT_AVAILABLE}?${searchParams}`;
};

export const getInterventionNotAvailablePagePathFromApiError = (error: any) => {
  const isValidReason = isValidInterventionNotAvailableReason(
    error?.response?.data?.details?.reason,
  );

  if (!isValidReason) {
    return null;
  }

  const reason = error.response.data.details
    .reason as InterventionNotAvailableReason;

  const searchParams = new URLSearchParams({ reason });
  return `${RoutePath.INTERVENTION_NOT_AVAILABLE}?${searchParams}`;
};
