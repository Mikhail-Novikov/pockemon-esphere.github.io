import { getFileNameFromHeaders } from '../lib';

describe('getFileNameFromHeaders - Парсит имя файла из заголовка запроса', () => {
  test('Должен вернуть корректное имя файла', () => {
    expect(getFileNameFromHeaders(null)).toBe('');
    expect(getFileNameFromHeaders({})).toBe('');
    expect(
      getFileNameFromHeaders({ 'content-disposition': 'something goes wrong' }),
    ).toBe('');
    expect(
      getFileNameFromHeaders({
        'content-disposition': 'attachment; filename=PRINT_FORM_UPD_EDO2.pdf',
      }),
    ).toBe('PRINT_FORM_UPD_EDO2.pdf');
    expect(
      getFileNameFromHeaders({
        'content-disposition': "attachment; filename*=UTF-8''форма печати.pdf",
      }),
    ).toBe('форма печати.pdf');
    expect(
      getFileNameFromHeaders({
        'content-disposition': "attachment; FILENAME*=utf-8''форма печати.pdf",
      }),
    ).toBe('форма печати.pdf');
  });
});
