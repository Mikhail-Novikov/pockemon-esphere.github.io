import { isPlainObject } from '../is-plain-object';

describe('isPlainObject - Проверяет что значения, является простым javascript объектом', () => {
  class Test {}
  const truthy = [{ x: 1, y: 2 }, Object.create(null)];
  const falsy = [
    null,
    undefined,
    true,
    1,
    0,
    [1, 2, 3],
    new Function(),
    new Test(),
    new Date(),
  ];

  test('Должен вернуть true', () => {
    truthy.forEach((val) => {
      expect(isPlainObject(val)).toBeTruthy();
    });
  });

  test('Должен вернуть false', () => {
    falsy.forEach((val) => {
      expect(isPlainObject(val)).toBeFalsy();
    });
  });
});
