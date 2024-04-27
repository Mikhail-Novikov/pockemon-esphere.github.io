/**
 * Класс описывающий ошибки с http кодом
 */
export class HttpError extends Error {
  /** http статус */
  status: number;

  constructor(status: number) {
    super();
    this.name = 'HttpError';
    this.message = 'HttpError';
    this.status = status;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
