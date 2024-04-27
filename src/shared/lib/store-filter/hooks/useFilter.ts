import { Filter } from '../types';

import { useFilterValues, UseFilterValuesResult } from './useFilterValues';
import { useFilterActions, UseFilterActionsResult } from './useFilterActions';

export type UseFilterResult<T> = UseFilterValuesResult<T> &
  UseFilterActionsResult<T>;

/**
 * Хук для работы с фильтром
 *
 * @param filter фильтр
 *
 * @returns результат
 */
export function useFilter<T>(filter: Filter<T>): UseFilterResult<T> {
  const values = useFilterValues(filter);
  const actions = useFilterActions(filter);

  return {
    ...values,
    ...actions,
  };
}
