import { createSelector } from '@reduxjs/toolkit';

import { createModelSelector, declareModelStateType } from '@shared/lib/store';

import { config } from '../config';
import {
  EqualityFn,
  ModelState,
  AnyValue,
  FilterState,
  ModelStoreState,
} from '../types';
import { findFilterMeta } from '../filter-meta';

const modelSelector = createModelSelector({
  stateType: declareModelStateType<ModelState>(),
  name: config.modelName,
});

const defaultEqualityFn = (): boolean => false;

/**
 * Селектор. Фильтр
 */
const filterSelector = (
  state: ModelStoreState,
  id: string,
): FilterState<AnyValue> => {
  const filters = modelSelector(state);
  return id ? filters[id] : null;
};

/**
 * Селектор. Функция сравнения
 */
const equalityFnSelector = (_: unknown, id: string): EqualityFn<AnyValue> => {
  const { equalityFn } = findFilterMeta(id);
  return equalityFn || defaultEqualityFn;
};

/**
 * Селектор. Начальное значение
 */
const initialValueSelector = (state: ModelStoreState, id: string): AnyValue => {
  const { initialValueSelector: selector } = findFilterMeta(id);
  return selector?.(state);
};

/**
 * Селектор. Текущее значение
 */
const currentValueSelector = (state: ModelStoreState, id: string): AnyValue =>
  filterSelector(state, id)?.currentValue;

/**
 * Селектор. Примененное значение
 */
const appliedValueSelector = (state: ModelStoreState, id: string): AnyValue =>
  filterSelector(state, id)?.appliedValue;

/**
 * Селектор. Признак что фильтр не установлен
 */
const isEmptySelector = createSelector(
  initialValueSelector,
  appliedValueSelector,
  equalityFnSelector,
  (initialValue, appliedValue, equalityFn) =>
    equalityFn(initialValue, appliedValue),
);

export const selectors = {
  filter: filterSelector,
  initialValue: initialValueSelector,
  currentValue: currentValueSelector,
  appliedValue: appliedValueSelector,
  isEmpty: isEmptySelector,
};
