import { QueryParams } from '../types';
import { parseSearchString, isQueryParamsEquals } from '../lib';

describe('parseSearchString - Парсинг query параметров из строки в объект', () => {
  test('Должен вернуть пустой объект', () => {
    const cases = ['', '   ', null, undefined];

    cases.forEach((val) => expect(parseSearchString(val)).toEqual({}));
  });
  test('Должен парсить строку в объект', () => {
    const search = '?username=codejockie&name=Kennedy';
    const result = parseSearchString(search);

    expect(Object.keys(result)).toHaveLength(2);
    expect(result.username).toBe('codejockie');
    expect(result.name).toBe('Kennedy');
  });
});

describe('isQueryParamsEquals - Функция сравнения query-параметров', () => {
  test('Должен вернуть false', () => {
    const cases: [QueryParams, QueryParams][] = [
      [{}, {}],
      [{ a: 'a' }, { a: 'a' }],
      [
        { a: 'a', b: 'b' },
        { b: 'b', a: 'a' },
      ],
    ];

    cases.forEach(([a, b]) => expect(isQueryParamsEquals(a, b)).toBeTruthy());
  });
  test('Должен вернуть true', () => {
    const cases: [QueryParams, QueryParams][] = [
      [{ a: 'a' }, { a: 'b' }],
      [{ a: 'a' }, { a: 'a', b: '' }],
    ];

    cases.forEach(([a, b]) => expect(isQueryParamsEquals(a, b)).toBeFalsy());
  });
});
