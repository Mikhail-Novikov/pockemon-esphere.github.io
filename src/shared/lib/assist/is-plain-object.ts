/**
 * Проверяет что значения, является простым javascript объектом
 *
 * @param obj - значение
 *
 * @returns результат
 */
export const isPlainObject = (obj: unknown): boolean => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return true;
  }

  let baseProto = proto;
  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
};
