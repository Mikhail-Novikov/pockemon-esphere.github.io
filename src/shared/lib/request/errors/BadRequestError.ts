import { HttpError } from './HttpError';

/**
 * Класс описывающий ошибки 400
 */
export class BadRequestError extends HttpError {
  constructor(status: number) {
    super(status);
    this.name = 'BadRequestError';
    this.message = 'BadRequestError';

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
