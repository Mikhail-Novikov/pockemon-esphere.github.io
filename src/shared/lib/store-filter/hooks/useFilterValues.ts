import { useSelector } from 'react-redux';

import { Filter } from '../types';

export type UseFilterValuesResult<T> = {
  /** состояние установлен/не установлен */
  isEmpty: boolean;
  /** текущее значение */
  currentValue: T;
  /** примененное значение */
  appliedValue: T;
};

/**
 * Хук для получения значений фильтра
 *
 * @param filter фильтр
 *
 * @returns результат
 */
export function useFilterValues<T>(
  filter: Filter<T>,
): UseFilterValuesResult<T> {
  const currentValue = useSelector(filter.selectors.currentValue);
  const appliedValue = useSelector(filter.selectors.appliedValue);
  const isEmpty = useSelector(filter.selectors.isEmpty);

  return {
    isEmpty,
    currentValue,
    appliedValue,
  };
}
