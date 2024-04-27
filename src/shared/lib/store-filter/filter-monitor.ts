import { Dispatch } from '@reduxjs/toolkit';

import { AnyValue, FilterCreateParams } from './types';
import { addFilterMeta, findFilterMeta, removeFilterMeta } from './filter-meta';
import { actions } from './model';

type Context = {
  dispatch: Dispatch;
  getState: () => AnyValue;
};

let filters: FilterCreateParams<AnyValue>[] = [];

const context: Context = {
  dispatch: null,
  getState: () => null,
};

const addFilterToStore = (
  {
    id,
    applyMode,
    debounceMs,
  }: Pick<FilterCreateParams<AnyValue>, 'id' | 'applyMode' | 'debounceMs'>,
  state: AnyValue,
) => {
  const { dispatch } = context;

  const { initialValueSelector } = findFilterMeta(id);
  const initialValue = initialValueSelector(state);
  dispatch(actions.add({ id, initialValue, applyMode, debounceMs }));
};

export const setContext = (
  dispatch: Dispatch,
  getState: () => AnyValue,
): void => {
  context.dispatch = dispatch;
  context.getState = getState;

  const state = context.getState();

  filters.forEach(({ id, applyMode, debounceMs }) => {
    addFilterToStore({ id, applyMode, debounceMs }, state);
  });

  filters = [];
};

export const addFilter = (
  filterCreateParams: FilterCreateParams<AnyValue>,
): void => {
  const {
    id,
    initialValue,
    applyMode,
    debounceMs,
    equalityFn,
  } = filterCreateParams;

  const initialValueSelector =
    typeof initialValue === 'function' ? initialValue : () => initialValue;

  addFilterMeta(id, { initialValueSelector, equalityFn });

  if (context.dispatch) {
    addFilterToStore({ id, applyMode, debounceMs }, context.getState());
  } else {
    filters.push(filterCreateParams);
  }
};

export const removeFilter = (id: string): void => {
  context.dispatch(actions.remove(id));
  removeFilterMeta(id);
};
