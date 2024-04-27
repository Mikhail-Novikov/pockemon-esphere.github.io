import { isPlainObject } from './is-plain-object';

const isEmptyInternal = <T>(val: T): boolean =>
  [
    val === null,
    val === undefined,
    typeof val === 'string' && val === '',
    Array.isArray(val) && val.length === 0,
    isPlainObject(val) && Object.keys(val).length === 0,
  ].some(Boolean);

/**
 * Проверяет на наличие данных
 *
 * @param value - объект
 *
 * @returns результат
 */
export const isEmpty = <T extends {} | number | string | void>(
  value: T,
): boolean => {
  if (typeof value === 'number') {
    return Number.isNaN(value);
  }

  if (typeof value === 'string') {
    return !value;
  }

  if (!value) {
    return true;
  }

  return Object.values(value).every((val) => isEmptyInternal(val));
};
