type Class<T = unknown> = new (...args: unknown[]) => T;

/**
 * instance of для массива классов
 * @param instance объект
 * @param classes список классов
 * @returns результат
 */
export const instanceOf = (instance: unknown, classes: Class[]): boolean =>
  classes.some((Cls) => instance instanceof Cls);
