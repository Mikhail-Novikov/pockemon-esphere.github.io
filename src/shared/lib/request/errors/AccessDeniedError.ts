import { HttpError } from './HttpError';

/**
 * Класс описывающий ошибки доступа к ресурсам 403
 */
export class AccessDeniedError extends HttpError {
  constructor(status: number) {
    super(status);
    this.name = 'AccessDeniedError';
    this.message = 'В доступе отказано';

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AccessDeniedError.prototype);
  }
}
