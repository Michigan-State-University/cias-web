import { ApiError } from 'models/Api';

import { InterventionNotAvailableReason } from 'components/InterventionNotAvailableInfo';

export type VerifyShortLinkError = ApiError<{
  message: string;
  details?: {
    reason?: InterventionNotAvailableReason;
  };
}>;
