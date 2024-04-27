import { HttpError } from './HttpError';

/**
 * Класс описывающий ошибки сервиса
 */
export class ServiceError extends HttpError {
  data: unknown;

  constructor(status: number, data: unknown) {
    super(status);
    this.name = 'ServiceError';
    this.message = 'ServiceError';
    this.data = data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}
