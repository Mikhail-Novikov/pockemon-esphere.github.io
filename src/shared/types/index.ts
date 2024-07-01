/** Фильтр для пагинации */
export type Pagination = {
  /** «смещение» для перехода на следующую страницу */
  offset?: number;
  /** Размер страницы(строк) */
  size?: number;
  /** Текущая страница */
  current?: number;
};
