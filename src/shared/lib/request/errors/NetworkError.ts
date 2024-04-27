/**
 * Класс описывающий ошибки с сетью
 */
export class NetworkError extends Error {
  constructor() {
    super();
    this.name = 'NetworkError';
    this.message = 'Ошибка соединения';

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}
