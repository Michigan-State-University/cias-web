import { ApiMessageError } from 'models/Api';

import { InterventionNotAvailableReason } from 'components/InterventionNotAvailableInfo';

export type VerifyShortLinkError =
  ApiMessageError<InterventionNotAvailableReason>;
