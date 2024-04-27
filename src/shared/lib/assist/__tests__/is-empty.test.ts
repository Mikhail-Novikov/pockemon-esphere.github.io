import { isEmpty } from '../is-empty';

describe('isEmpty - Проверяет на наличие данных', () => {
  const empty = [
    '',
    null,
    undefined,
    [],
    {},
    { prop: '' },
    { prop: null },
    { prop: undefined },
    { prop: {} },
    { prop: [] },
    ['', [], {}],
  ];
  const notEmpty = [
    0,
    'string',
    { prop: ' ' },
    { prop: '', prop2: 'prop2' },
    { prop: 0 },
    { prop: false },
  ];

  test('Должен вернуть true', () => {
    empty.forEach((val) => {
      expect(isEmpty(val)).toBeTruthy();
    });
  });

  test('Должен вернуть false', () => {
    notEmpty.forEach((val) => {
      expect(isEmpty(val)).toBeFalsy();
    });
  });
});
