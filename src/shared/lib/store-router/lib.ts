import { QueryParams } from './types';

/**
 * Парсинг query параметров из строки в объект
 *
 * @description Реализация взята из библиотеки connected-react-router {@link https://github.com/supasate/connected-react-router/blob/master/src/reducer.js#L7}
 *
 * @param searchQuery Query-params в виде строки
 * @returns Query-params в виде объекта
 */
export const parseSearchString = (searchQuery: string): QueryParams => {
  if (!searchQuery) {
    return {};
  }

  // Ignore the `?` part of the search string e.g. ?username=codejockie
  const search = searchQuery.substring(1);
  // Split the query string on `&` e.g. ?username=codejockie&name=Kennedy
  const queries = search.split('&');
  // Contruct query
  const query = queries.reduce((acc, currentQuery) => {
    // Split on `=`, to get key and value
    const [queryKey, queryValue] = currentQuery.split('=');
    return {
      ...acc,
      [queryKey]: queryValue,
    };
  }, {});

  return query;
};

/**
 * Функция сравнения query-параметров
 * @param prev Query-params в виде объекта
 * @param next Query-params в виде объекта
 * @returns результат
 */
export const isQueryParamsEquals = (
  prev: QueryParams,
  next: QueryParams,
): boolean => {
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);

  if (prevKeys.length !== nextKeys.length) {
    return false;
  }

  for (const key of prevKeys) {
    if (next[key] !== prev[key]) {
      return false;
    }
  }

  return true;
};
