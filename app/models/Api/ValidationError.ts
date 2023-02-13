import { AxiosError } from 'axios';

export type ValidationErrorData<Details = undefined> = {
  message?: string;
  details?: Details;
};

export type ValidationError<Details = undefined> = AxiosError<
  ValidationErrorData<Details>
>;
