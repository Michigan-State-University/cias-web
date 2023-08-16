import { AxiosError } from 'axios';

export interface ApiErrorTraceItem {
  id: number;
  exception_object_id: number;
  trace: string;
}

export interface ApiErrorTraces {
  'Application Trace': ApiErrorTraceItem[];
  'Framework Trace': ApiErrorTraceItem[];
  'Full Trace': ApiErrorTraceItem[];
}

export interface ApiErrorResponse {
  error: string;
  exception: string;
  status: number;
  traces: ApiErrorTraces;
}

export type ApiError<T = ApiErrorResponse> = AxiosError<T>;

export type ApiMessageError = ApiError<{ message: string }>;
