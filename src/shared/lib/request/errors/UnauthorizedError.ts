import { HttpError } from './HttpError';

/**
 * Класс описывающий ошибки неавторизованного пользователя 401
 */
export class UnauthorizedError extends HttpError {
  constructor(status: number) {
    super(status);
    this.name = 'UnauthorizedError';

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
