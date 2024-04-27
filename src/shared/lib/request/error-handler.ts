import { AxiosError } from 'axios';

import {
  AccessDeniedError,
  NetworkError,
  ServiceError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
} from './errors';

/**
 * Функция для формирования ошибок api
 *
 * @param error ошибка axios
 *
 * @returns новая ошибка
 */
export const errorHandler = (
  error: AxiosError,
):
  | BadRequestError
  | UnauthorizedError
  | AccessDeniedError
  | NotFoundError
  | ServiceError
  | NetworkError => {
  const status = error?.response?.status;
  const data = error?.response?.data;

  if (status === 400) {
    return new BadRequestError(status);
  }

  if (status === 401) {
    return new UnauthorizedError(status);
  }

  if (status === 403) {
    return new AccessDeniedError(status);
  }

  if (status === 404) {
    return new NotFoundError(status);
  }

  if (status >= 400) {
    return new ServiceError(status, data);
  }

  return new NetworkError();
};
