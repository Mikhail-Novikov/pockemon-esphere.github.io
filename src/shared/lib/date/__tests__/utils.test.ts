import { convertDate, convertDateFromIsoToUi, ServerDate, UiDate } from '../';

describe('convertDateFromIsoToUi - Конвертирует дату из ISO в UI', () => {
  test('Возвращает дату в UI формате', () => {
    expect(convertDateFromIsoToUi('2020-07-11T07:11:57+00Z', UiDate.Date)).toBe(
      '11.07.2020',
    );
    expect(convertDateFromIsoToUi('2020-07-11', UiDate.Date)).toBe(
      '11.07.2020',
    );
    expect(convertDateFromIsoToUi('2020-07-11', UiDate.WideDate)).toBe(
      '11 июля 2020',
    );
  });
});

describe('convertDate - Конвертирует дату из одного формата в другой', () => {
  test('Конвертирует объект Date в строку в нужном формате', () => {
    const date = new Date(2010, 0, 1);
    expect(convertDate(date, { to: UiDate.Date })).toBe('01.01.2010');
  });

  test('Конвертирует объект Date, который после преобразования не соответствует формату', () => {
    const date = new Date(9999, 99, 99);
    expect(convertDate(date, { to: UiDate.Date })).toBe('31.12.9999');
  });

  test('Возвращает дату в UI формате', () => {
    expect(
      convertDate('2020-07-11', { from: ServerDate.Date, to: UiDate.Date }),
    ).toBe('11.07.2020');
    expect(
      convertDate('2020-07-11', { from: ServerDate.Date, to: UiDate.WideDate }),
    ).toBe('11 июля 2020');
  });

  test('Возвращает дату в серверном формате', () => {
    expect(
      convertDate('11.07.2020', { from: UiDate.Date, to: ServerDate.Date }),
    ).toBe('2020-07-11');
    expect(
      convertDate('11 июля 2020', {
        from: UiDate.WideDate,
        to: ServerDate.Date,
      }),
    ).toBe('2020-07-11');
  });

  test('Конвертирует даты, учитывая минимальные и максимальные значения', () => {
    const date = new Date(2100, 0, 1);
    const min = new Date(1900, 0, 1);
    const max = new Date(2099, 0, 1);

    expect(
      convertDate('1899-01-01', {
        from: ServerDate.Date,
        to: UiDate.Date,
        min,
      }),
    ).toBe('01.01.1900');

    expect(
      convertDate(date, {
        to: UiDate.Date,
        max,
      }),
    ).toBe('01.01.2099');

    expect(
      convertDate(date, {
        to: UiDate.Date,
        min,
        max,
      }),
    ).toBe('01.01.2099');
  });
});
