import { stringify } from '@shared/lib/strings';

/**
 * Метод создает URL
 *
 * @param serviceName - название сервиса
 * @param apiVersion - версия API
 * @param url - URL
 *
 * @returns Сформированный URL
 */
export const constructUrl = (
  serviceName: string,
  apiVersion: string,
  url: string,
): string =>
  serviceName
    ? stringify(
        [
          serviceName,
          {
            prefix: '/api/',
            value: apiVersion,
          },
          {
            prefix: '/',
            value: url,
          },
        ],
        '',
      )
    : url;

/**
 * Метод парсит имя файла из заголовка запроса
 *
 * @param headers - заголовоки
 *
 * @returns имя файла
 */
export const getFileNameFromHeaders = (
  headers: Record<string, string>,
): string => {
  let result = '';

  if (headers && headers['content-disposition']) {
    result = headers['content-disposition'];
  }

  const isEncoded = !!result.match(/filename\*=utf-8/i);

  if (result) {
    result = isEncoded
      ? decodeURIComponent(result.split(/filename\*=utf-8''/i)[1]) || ''
      : result.split('filename=')[1] || '';
  }

  if (result) {
    result = result.split(';')[0] || '';
  }
  if (result) {
    result = result.replace(/^"(.*)"$/, '$1') || '';
  }

  return result;
};
