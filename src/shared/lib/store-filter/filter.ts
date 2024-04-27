import { shallowEqual } from 'react-redux';
import { put, take } from 'redux-saga/effects';

import {
  FilterCreateParams,
  FilterState,
  FilterApplyMode,
  Filter,
  ModelStoreState,
} from './types';
import {
  actions as filterActions,
  selectors as filterSelectors,
} from './model';
import { addFilter, removeFilter } from './filter-monitor';

/**
 * Сравнить 2 значения
 * @param val1 значение 1
 * @param val2 значение 2
 *
 * @returns результат
 */
function defaultEqualityFn<T>(val1: T, val2: T) {
  return shallowEqual(val1, val2);
}

/**
 * Создать фильтр
 *
 * @param filterCreateParams - входные параметры
 *
 * @returns фильтр
 */
export function createFilter<T>(
  filterCreateParams: FilterCreateParams<T>,
): Filter<T> {
  const {
    id,
    title,
    initialValue,
    applyMode = FilterApplyMode.Auto,
    equalityFn = defaultEqualityFn,
    debounceMs,
  } = filterCreateParams;

  addFilter({ id, title, initialValue, applyMode, equalityFn, debounceMs });

  const actions = {
    appliedValueChanged: filterActions.createEventAction(
      id,
      'appliedValueChanged',
    ),
  };

  const sagas = {
    *set(value: T) {
      yield put(filterActions.setFilter({ id, value }));
      yield take(filterActions.createEventAction(id, 'setFilterCompleted'));
    },
    *apply() {
      yield put(filterActions.applyFilter(id));
      yield take(filterActions.createEventAction(id, 'applyFilterCompleted'));
    },
    *restore() {
      yield put(filterActions.restoreFilter(id));
      yield take(filterActions.createEventAction(id, 'restoreFilterCompleted'));
    },
    *reset() {
      yield put(filterActions.resetFilter(id));
      yield take(filterActions.createEventAction(id, 'resetFilterCompleted'));
    },
  };

  const selectors = {
    filter: (state: unknown): FilterState<T> =>
      filterSelectors.filter(state as ModelStoreState, id) as FilterState<T>,
    initialValue: (state: unknown): T =>
      filterSelectors.initialValue(state as ModelStoreState, id) as T,
    currentValue: (state: unknown): T =>
      filterSelectors.currentValue(state as ModelStoreState, id) as T,
    appliedValue: (state: unknown): T =>
      filterSelectors.appliedValue(state as ModelStoreState, id) as T,
    isEmpty: (state: unknown) =>
      filterSelectors.isEmpty(state as ModelStoreState, id),
  };

  return { id, title, actions, selectors, sagas, applyMode };
}

/**
 * Удалить фильтр
 *
 * @param filter - фильтр
 *
 * @returns {void}
 */
export function deleteFilter<T>(filter: Filter<T>): void {
  removeFilter(filter.id);
}
