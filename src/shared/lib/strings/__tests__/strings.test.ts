import { noWrap, createPrefix, stringify } from '../index';

describe('noWrap - Заменить пробелы на nbsp', () => {
  test('Пробелы и табы должны заменяться на символ nbsp', () => {
    const space = 'test string';
    const wideSpace = 'test  string';
    const tab = 'test\tstring';

    const result = 'test\u00a0string';

    expect(noWrap(space)).toEqual(result);
    expect(noWrap(wideSpace)).toEqual(result);
    expect(noWrap(tab)).toEqual(result);
  });
});

describe('createPrefix - Создает функцию с префиксом для строки', () => {
  test('Результирующая строка должна содержать префикс и разделитель', () => {
    expect(createPrefix('prefix')('value')).toEqual('prefix/value');
    expect(createPrefix('prefix', ':')('value')).toEqual('prefix:value');
    expect(createPrefix('prefix', '')('value')).toEqual('prefixvalue');
  });
});

describe('stringify - Конкатенирует строки с дополнительной оработкой', () => {
  test('Должен вернуть корректный результат', () => {
    expect(stringify(['1', '2', '3'])).toBe('1 2 3');
    expect(stringify(['1', '2', '3'], '')).toBe('123');
    expect(
      stringify([
        '1',
        '2',
        {
          value: '3',
        },
      ]),
    ).toBe('1 2 3');
    expect(
      stringify([
        '1',
        '2',
        {
          prefix: '2.5',
          value: '3',
          postfix: '3.5',
        },
      ]),
    ).toBe('1 2 2.5 3 3.5');
    expect(
      stringify([
        '1',
        '2',
        {
          when: false,
          value: '3',
        },
      ]),
    ).toBe('1 2');
    expect(
      stringify([
        '1',
        '2',
        {
          value: '3',
          postfix: '3.5',
          separator: '-',
        },
      ]),
    ).toBe('1 2 3-3.5');
    expect(
      stringify(
        [
          '1',
          '2',
          {
            value: '3',
            postfix: '3.5',
            separator: '-',
          },
        ],
        '_',
      ),
    ).toBe('1_2_3-3.5');
    expect(
      stringify([
        '1',
        '2',
        {
          value: '3',
          transform: (value: string) => `number-${value}`,
        },
      ]),
    ).toBe('1 2 number-3');
    expect(
      stringify([
        '1',
        '2',
        {
          value: null,
          transform: (value: string) => `number-${value}`,
        },
      ]),
    ).toBe('1 2');
    expect(
      stringify([
        '1',
        null,
        {
          value: '3',
        },
      ]),
    ).toBe('1 3');
    expect(stringify(['1', '', '3'])).toBe('1 3');
    expect(stringify(['1', { value: '' }, '3'])).toBe('1 3');
    expect(stringify('1')).toBe('1');
    expect(stringify('')).toBe('');
    expect(stringify(null)).toBe('');
    expect(
      stringify({
        value: '1',
      }),
    ).toBe('1');
    expect(
      stringify({
        prefix: '2',
        value: '1',
      }),
    ).toBe('2 1');
    expect(
      stringify({
        prefix: '2',
        value: '1',
        separator: '',
      }),
    ).toBe('21');
  });
});
