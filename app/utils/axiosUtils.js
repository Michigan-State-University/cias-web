/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';

/**
 * Checks if axios response `method` equals to the given one
 * @param  {AxiosResponse} response Axios response
 * @param  {HttpMethods} method
 */
export const responseMethodEquals = (response, method) =>
  response && response.config.method.toUpperCase() === method.toUpperCase();

/**
 * Checks if axios response `status` equals to the given one
 * @param  {AxiosResponse} response Axios response
 * @param  {HttpStatusCodes} status
 */
export const responseStatusEquals = (response, status) =>
  response && response.status === status;
