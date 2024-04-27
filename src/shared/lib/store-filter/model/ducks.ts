import {
  createSlice,
  PayloadAction,
  PayloadActionCreator,
} from '@reduxjs/toolkit';

import { createActionCreatorWithPrefix } from '@shared/lib/store';

import {
  AddFilterPayload,
  ModelState,
  ResetFilterPayload,
  SetFilterFieldValuePayload,
  SetFilterPayload,
} from '../types';
import { config } from '../config';

const createAction = createActionCreatorWithPrefix(config.modelName);

/**
 * Начальное состояние модели
 */
const initialState: ModelState = {};

/**
 * Экшен установки фильтра
 */
const setFilter = createAction<SetFilterPayload>('setFilter');

/**
 * Экшен очистки фильтра
 */
const resetFilter = createAction<string>('resetFilter');

/**
 * Экшен подтверждения фильтра
 */
const applyFilter = createAction<string>('applyFilter');

/**
 * Экшен восстановления фильтра
 */
const restoreFilter = createAction<string>('restoreFilter');

/**
 * Создать экшен для события
 * @param id - id фильтра
 * @param kind - тип события
 * @returns Экшен
 */
const createEventAction = (
  id: string,
  kind:
    | 'appliedValueChanged'
    | 'setFilterCompleted'
    | 'resetFilterCompleted'
    | 'applyFilterCompleted'
    | 'restoreFilterCompleted',
): PayloadActionCreator<void> => createAction(`${kind}_${id}`);

/**
 * Cлайс модели
 */
const filterSlice = createSlice({
  name: config.modelName,
  initialState,
  reducers: {
    add(
      state,
      {
        payload: { id, initialValue, applyMode, debounceMs },
      }: PayloadAction<AddFilterPayload>,
    ) {
      state[id] = {
        applyMode,
        debounceMs,
        currentValue: initialValue,
        appliedValue: initialValue,
      };
    },

    remove(state, { payload: id }: PayloadAction<string>) {
      delete state[id];
    },

    reset(
      state,
      { payload: { id, initialValue } }: PayloadAction<ResetFilterPayload>,
    ) {
      if (!state[id]) {
        return;
      }

      const { debounceMs, applyMode } = state[id];

      state[id] = {
        applyMode,
        debounceMs,
        currentValue: initialValue,
        appliedValue: initialValue,
      };
    },

    apply(state, { payload: id }: PayloadAction<string>) {
      if (!state[id]) {
        return;
      }
      state[id].appliedValue = state[id].currentValue;
    },

    setFieldValue(
      state,
      {
        payload: { id, field, value },
      }: PayloadAction<SetFilterFieldValuePayload>,
    ) {
      if (!state[id]) {
        return;
      }
      state[id][field] = value;
    },
  },
});

export const { reducer } = filterSlice;

export const actions = {
  ...filterSlice.actions,
  setFilter,
  resetFilter,
  applyFilter,
  restoreFilter,
  createEventAction,
};
