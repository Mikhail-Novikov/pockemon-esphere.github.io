import { useCallback } from 'react';

import { useActions } from '@shared/lib/use-it';

import { Filter } from '../types';
import { actions } from '../model';

export type UseFilterActionsResult<T> = {
  set: (value: T) => ReturnType<typeof actions.setFilter>;
  apply: () => ReturnType<typeof actions.applyFilter>;
  restore: () => ReturnType<typeof actions.restoreFilter>;
  reset: () => ReturnType<typeof actions.resetFilter>;
};

/**
 * Хук для получения экшенов фильтра
 *
 * @param filter фильтр
 *
 * @returns результат
 */
export function useFilterActions<T>(
  filter: Filter<T>,
): UseFilterActionsResult<T> {
  const { id } = filter;

  const { setFilter, applyFilter, restoreFilter, resetFilter } = useActions(
    actions,
  );

  const set = useCallback((value: T) => setFilter({ id, value }), [id]);
  const apply = useCallback(() => applyFilter(id), [id]);
  const restore = useCallback(() => restoreFilter(id), [id]);
  const reset = useCallback(() => resetFilter(id), [id]);

  return { set, apply, restore, reset };
}
