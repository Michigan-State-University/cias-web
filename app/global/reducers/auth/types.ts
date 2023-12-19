import { UserResponse } from 'models/User';
import { Data } from 'models/Api';

import { CamelToSnake } from 'global/types/camelToSnake';

export type RedirectData = {
  userInterventionId: string;
  interventionId: string;
  sessionId: Nullable<string>;
  healthClinicId: Nullable<string>;
  multipleFillSessionAvailable: boolean;
};

export type RedirectDataDTO = CamelToSnake<RedirectData>;

export type VerifyUserKeyResponseDTO = {
  redirect_data: RedirectDataDTO;
  user: Data<CamelToSnake<UserResponse>>;
};
