import { HttpError } from './HttpError';

/**
 * Класс описывающий ошибки отсутствия данных 404
 */
export class NotFoundError extends HttpError {
  constructor(status: number) {
    super(status);
    this.name = 'NotFoundError';
    this.message = 'Не найден';

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
