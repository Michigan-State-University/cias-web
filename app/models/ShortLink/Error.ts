import { ValidationError } from 'models/Api';

export type ShortLinkValidationError = ValidationError<{
  taken_names: string[];
}>;
